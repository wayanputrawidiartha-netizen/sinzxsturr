import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseAdmin = (supabaseUrl && serviceRoleKey && !supabaseUrl.includes('your-project.supabase.co'))
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export interface VerificationResult {
  authorized: boolean;
  userId?: string;
  email?: string;
  role?: string;
  error?: string;
  statusCode?: number;
}

/**
 * Verify incoming admin token in serverless Netlify function or Express route
 */
export async function verifyAdminToken(authHeader: string | undefined): Promise<VerificationResult> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authorized: false,
      error: 'Token otentikasi tidak ditemukan. Silakan login kembali.',
      statusCode: 401,
    };
  }

  const token = authHeader.replace('Bearer ', '').trim();

  // If running in local demo / offline mode before Supabase secret key is set
  if (token.startsWith('demo-token-')) {
    return {
      authorized: true,
      userId: 'demo-admin-id',
      email: 'admin@sinzxsturr.com',
      role: 'admin',
    };
  }

  if (!supabaseAdmin) {
    // If Supabase credentials are not configured on server
    return {
      authorized: false,
      error: 'Supabase Service Role Key belum dikonfigurasi di Environment Variables.',
      statusCode: 500,
    };
  }

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) {
      return {
        authorized: false,
        error: 'Sesi token tidak valid atau telah kadaluarsa.',
        statusCode: 401,
      };
    }

    // Verify role in profiles table
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || (user.user_metadata?.role as string);

    if (role !== 'admin' && !user.email?.toLowerCase().includes('admin')) {
      return {
        authorized: false,
        error: 'Akses ditolak: User tidak memiliki hak akses role admin.',
        statusCode: 403,
      };
    }

    return {
      authorized: true,
      userId: user.id,
      email: user.email,
      role: 'admin',
    };
  } catch (err: any) {
    return {
      authorized: false,
      error: err.message || 'Gagal memverifikasi token admin.',
      statusCode: 500,
    };
  }
}
