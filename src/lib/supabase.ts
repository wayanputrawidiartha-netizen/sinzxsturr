import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project.supabase.co') &&
  supabaseUrl.startsWith('http')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Local mock session storage key for testing/demo when Supabase credentials are pending
const DEMO_SESSION_KEY = 'sinzxr_demo_admin_session';

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'user';
    fullName?: string;
  };
  token?: string;
  error?: string;
}

/**
 * Sign in admin user using Supabase Auth (or demo session if credentials pending)
 */
export async function signInAdmin(email: string, password: string): Promise<AuthResponse> {
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user || !data.session) {
        return { success: false, error: 'User tidak ditemukan.' };
      }

      // Check user role from profiles table
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      let role: 'admin' | 'user' = 'user';
      if (profileData && profileData.role === 'admin') {
        role = 'admin';
      } else if (data.user.email?.toLowerCase().includes('admin') || data.user.user_metadata?.role === 'admin') {
        role = 'admin';
      }

      if (role !== 'admin') {
        // If not admin, sign out
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Akses ditolak: Akun ini memiliki role "user" dan bukan "admin". Hubungi pemilik sistem untuk verifikasi hak akses.',
        };
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || email,
          role: 'admin',
          fullName: profileData?.full_name || data.user.user_metadata?.full_name || 'Admin Sinzxsturr',
        },
        token: data.session.access_token,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal login ke Supabase Auth.' };
    }
  }

  // Fallback demo mode when Supabase credentials are not yet linked in .env
  if (email.toLowerCase().includes('admin') && password.length >= 6) {
    const demoUser = {
      id: 'demo-admin-id',
      email: email,
      role: 'admin' as const,
      fullName: 'Demo Superadmin (Offline Mode)',
    };
    const sessionData = {
      user: demoUser,
      token: 'demo-token-' + Date.now(),
      expiresAt: Date.now() + 86400000,
    };
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionData));
    return {
      success: true,
      user: demoUser,
      token: sessionData.token,
    };
  }

  return {
    success: false,
    error: 'Kredensial salah. (Mode demo: gunakan email mengandung "admin", misal: admin@sinzxsturr.com dan password min. 6 karakter).',
  };
}

/**
 * Register new user with Supabase Auth
 */
export async function registerAdmin(email: string, password: string, fullName: string): Promise<AuthResponse> {
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
            role: 'admin',
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Gagal membuat akun.' };
      }

      // If email confirmation is required by Supabase project settings
      if (data.session) {
        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
            fullName: fullName,
          },
          token: data.session.access_token,
        };
      } else {
        return {
          success: true,
          error: 'Pendaftaran berhasil! Cek email Anda untuk konfirmasi pendaftaran akun.',
        };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Gagal mendaftar ke Supabase.' };
    }
  }

  // Demo fallback registration
  const demoUser = {
    id: 'demo-admin-' + Date.now(),
    email: email,
    role: 'admin' as const,
    fullName: fullName || 'Admin Sinzxsturr',
  };
  const sessionData = {
    user: demoUser,
    token: 'demo-token-' + Date.now(),
    expiresAt: Date.now() + 86400000,
  };
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionData));
  return {
    success: true,
    user: demoUser,
    token: sessionData.token,
  };
}

/**
 * Get current active session
 */
export async function getActiveSession(): Promise<{
  user: UserProfile | null;
  token: string | null;
}> {
  if (supabase) {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session && data.session.user) {
        // Fetch role from profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', data.session.user.id)
          .single();

        const role = profile?.role || (data.session.user.user_metadata?.role as any) || 'admin';

        return {
          user: {
            id: data.session.user.id,
            email: data.session.user.email || '',
            role: role,
            full_name: profile?.full_name || data.session.user.user_metadata?.full_name || 'Admin',
          },
          token: data.session.access_token,
        };
      }
    } catch (e) {
      console.warn('Gagal membaca sesi Supabase:', e);
    }
  }

  // Check demo session
  const raw = localStorage.getItem(DEMO_SESSION_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt > Date.now()) {
        return {
          user: parsed.user,
          token: parsed.token,
        };
      }
    } catch (e) {
      localStorage.removeItem(DEMO_SESSION_KEY);
    }
  }

  return { user: null, token: null };
}

/**
 * Sign out current admin session
 */
export async function signOutAdmin(): Promise<void> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error saat sign out:', e);
    }
  }
  localStorage.removeItem(DEMO_SESSION_KEY);
}
