import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle, Sparkles, Key, CheckCircle, Database } from 'lucide-react';
import { signInAdmin, registerAdmin, isSupabaseConfigured } from '../../lib/supabase';
import { UserProfile } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (user: UserProfile, token: string) => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessNotice(null);

    if (!email || !password) {
      setErrorMsg('Harap masukkan email dan kata sandi.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      if (isRegisterMode) {
        const res = await registerAdmin(email, password, fullName);
        if (res.success) {
          if (res.token && res.user) {
            onLoginSuccess(res.user, res.token);
          } else {
            setSuccessNotice(res.error || 'Pendaftaran berhasil! Silakan login dengan akun admin Anda.');
            setIsRegisterMode(false);
          }
        } else {
          setErrorMsg(res.error || 'Gagal mendaftar.');
        }
      } else {
        const res = await signInAdmin(email, password);
        if (res.success && res.user && res.token) {
          onLoginSuccess(res.user, res.token);
        } else {
          setErrorMsg(res.error || 'Email atau kata sandi tidak valid.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080F1E] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-12">
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Kembali ke Website Utama</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Robotic HUD border accents */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        <div className="glass-panel p-7 sm:p-9 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-[#0b1426]/95 backdrop-blur-xl">
          {/* Header Brand & Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-900/40 border border-cyan-400/40 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider font-heading uppercase">
              ADMIN PORTAL
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300/80 font-mono mt-1">
              SINZXR JB STORE // SECURE_AUTH
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Autentikasi terenkripsi Supabase Auth & Role-Based Access Control
            </p>
          </div>

          {/* Database connection badge */}
          <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300 font-mono">Supabase Auth:</span>
            </div>
            {isSupabaseConfigured ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Preview Mode
              </span>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {/* Success Notice */}
          {successNotice && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{successNotice}</p>
            </div>
          )}

          {/* Login / Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Nama Lengkap Admin
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Admin Sinzxsturr"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-slate-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sinzxsturr.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-slate-500 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white text-sm placeholder-slate-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akses...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 text-slate-950" />
                    <span>{isRegisterMode ? 'Daftar Akun Admin' : 'Masuk ke Dashboard'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Toggle Register / Login mode */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg(null);
                setSuccessNotice(null);
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium cursor-pointer"
            >
              {isRegisterMode
                ? 'Sudah punya akun admin? Masuk di sini'
                : 'Belum punya akun admin? Registrasi akun di sini'}
            </button>
          </div>

          {!isSupabaseConfigured && (
            <div className="mt-4 p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-slate-300">
              <p className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Tips Mode Uji Coba:
              </p>
              <p>
                Gunakan email apa pun yang mengandung <code>admin</code> (contoh: <code>admin@sinzxsturr.com</code>) dan password min. 6 karakter untuk masuk ke dashboard secara instan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
