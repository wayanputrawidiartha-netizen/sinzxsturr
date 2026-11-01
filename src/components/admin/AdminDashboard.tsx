import React, { useState } from 'react';
import {
  ShieldCheck,
  LogOut,
  ExternalLink,
  Settings,
  DollarSign,
  HelpCircle,
  Gamepad2,
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
} from 'lucide-react';
import {
  UserProfile,
  WebsiteSettings,
  RekberFee,
  GameService,
  FaqItem,
} from '../../types';
import {
  updateSettings,
  saveRekberFee,
  deleteRekberFee,
  saveFaq,
  deleteFaq,
  updateGameService,
} from '../../services/api';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminDashboardProps {
  adminUser: UserProfile;
  token: string;
  initialSettings: WebsiteSettings;
  initialRekberFees: RekberFee[];
  initialGameServices: GameService[];
  initialFaqs: FaqItem[];
  onDataUpdated: () => void;
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  token,
  initialSettings,
  initialRekberFees,
  initialGameServices,
  initialFaqs,
  onDataUpdated,
  onLogout,
  onViewWebsite,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'fees' | 'services' | 'faqs' | 'database'>('settings');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Editable states
  const [settingsForm, setSettingsForm] = useState<WebsiteSettings>({ ...initialSettings });
  const [rekberFees, setRekberFees] = useState<RekberFee[]>([...initialRekberFees]);
  const [gameServices, setGameServices] = useState<GameService[]>([...initialGameServices]);
  const [faqs, setFaqs] = useState<FaqItem[]>([...initialFaqs]);

  // Modal states for Fee CRUD
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<RekberFee | null>(null);
  const [feeRangeLabel, setFeeRangeLabel] = useState('');
  const [feePriceLabel, setFeePriceLabel] = useState('');
  const [feeSortOrder, setFeeSortOrder] = useState(1);

  // Modal states for FAQ CRUD
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqSortOrder, setFaqSortOrder] = useState(1);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // 1. Save Settings Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateSettings(settingsForm, token);
    setSaving(false);
    if (res.success) {
      showToast('success', 'Pengaturan website berhasil diperbarui dan tersimpan permanen!');
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal menyimpan pengaturan website.');
    }
  };

  // 2. Rekber Fee CRUD Handlers
  const handleOpenAddFee = () => {
    setEditingFee(null);
    setFeeRangeLabel('');
    setFeePriceLabel('');
    setFeeSortOrder(rekberFees.length + 1);
    setFeeModalOpen(true);
  };

  const handleOpenEditFee = (fee: RekberFee) => {
    setEditingFee(fee);
    setFeeRangeLabel(fee.range_label);
    setFeePriceLabel(fee.fee_label);
    setFeeSortOrder(fee.sort_order);
    setFeeModalOpen(true);
  };

  const handleSaveFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeRangeLabel || !feePriceLabel) {
      showToast('error', 'Semua kolom tarif wajib diisi.');
      return;
    }

    setSaving(true);
    const payload: RekberFee = {
      id: editingFee ? editingFee.id : `tier-${Date.now()}`,
      range_label: feeRangeLabel,
      fee_label: feePriceLabel,
      sort_order: feeSortOrder,
      is_active: true,
    };

    const res = await saveRekberFee(payload, !editingFee, token);
    setSaving(false);

    if (res.success) {
      if (editingFee) {
        setRekberFees(rekberFees.map((f) => (f.id === payload.id ? payload : f)));
      } else {
        setRekberFees([...rekberFees, payload]);
      }
      setFeeModalOpen(false);
      showToast('success', `Tarif rekber ${payload.range_label} berhasil disimpan!`);
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal menyimpan tarif rekber.');
    }
  };

  const handleDeleteFee = async (id: string, label: string) => {
    if (!confirm(`Hapus tarif "${label}" dari daftar?`)) return;
    setSaving(true);
    const res = await deleteRekberFee(id, token);
    setSaving(false);
    if (res.success) {
      setRekberFees(rekberFees.filter((f) => f.id !== id));
      showToast('success', `Tarif "${label}" berhasil dihapus.`);
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal menghapus tarif.');
    }
  };

  // 3. FAQ CRUD Handlers
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqSortOrder(faqs.length + 1);
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqSortOrder(faq.sort_order);
    setFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) {
      showToast('error', 'Pertanyaan dan jawaban wajib diisi.');
      return;
    }

    setSaving(true);
    const payload: FaqItem = {
      id: editingFaq ? editingFaq.id : `faq-${Date.now()}`,
      question: faqQuestion,
      answer: faqAnswer,
      sort_order: faqSortOrder,
      is_active: true,
    };

    const res = await saveFaq(payload, !editingFaq, token);
    setSaving(false);

    if (res.success) {
      if (editingFaq) {
        setFaqs(faqs.map((f) => (f.id === payload.id ? payload : f)));
      } else {
        setFaqs([...faqs, payload]);
      }
      setFaqModalOpen(false);
      showToast('success', 'Pertanyaan FAQ berhasil disimpan!');
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal menyimpan FAQ.');
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Hapus pertanyaan FAQ ini?')) return;
    setSaving(true);
    const res = await deleteFaq(id, token);
    setSaving(false);
    if (res.success) {
      setFaqs(faqs.filter((f) => f.id !== id));
      showToast('success', 'FAQ berhasil dihapus.');
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal menghapus FAQ.');
    }
  };

  // 4. Game Service update
  const handleSaveGameService = async (service: GameService) => {
    setSaving(true);
    const res = await updateGameService(service, token);
    setSaving(false);
    if (res.success) {
      showToast('success', `Layanan ${service.title} berhasil diperbarui!`);
      onDataUpdated();
    } else {
      showToast('error', res.error || 'Gagal mengupdate layanan game.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080F1E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                : 'bg-red-950/90 border-red-500 text-red-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-[#0b1426]/95 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 p-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-900/40 shadow">
              <img
                src={settingsForm.logo_image || 'https://cdn.phototourl.com/member/2026-10-30-4054384d-a11a-4dd2-ae74-75c675ee91d6.jpg'}
                alt="Logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm sm:text-base font-bold tracking-wider text-white">
                  SINZXR JB STORE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Server-side Protected Dashboard // Netlify Functions + Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Profile Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-mono">{adminUser.email}</span>
              <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] border border-indigo-500/30">
                {adminUser.role.toUpperCase()}
              </span>
            </div>

            {/* View Live Website Button */}
            <button
              onClick={onViewWebsite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
              title="Lihat Halaman Pengunjung"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website Utama</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Website</span>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'fees'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Kelola Tarif Rekber</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Layanan Game</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Kelola FAQ</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & RLS</span>
          </button>
        </div>

        {/* TAB 1: PENGATURAN WEBSITE */}
        {activeTab === 'settings' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>Pengaturan Informasi Website Utama</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Perubahan data di sini akan langsung disimpan ke Supabase Database dan tampil kepada seluruh pengunjung website.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Nama Brand Bisnis
                  </label>
                  <input
                    type="text"
                    value={settingsForm.brand_name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brand_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Nomor WhatsApp Admin (Format 62xxx)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp_number}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    URL Saluran WhatsApp Stok Akun
                  </label>
                  <input
                    type="url"
                    value={settingsForm.whatsapp_channel_url}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_channel_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    URL Akun Resmi TikTok
                  </label>
                  <input
                    type="url"
                    value={settingsForm.tiktok_url}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tiktok_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Headline Utama (Hero Section)
                </label>
                <input
                  type="text"
                  value={settingsForm.hero_headline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Subheadline Utama (Deskripsi Hero)
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.hero_subheadline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hero_subheadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: KELOLA TARIF REKBER (CRUD) */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <span>Daftar Tarif Rekber / Middleman</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola tingkatan tarif biaya jasa rekber untuk transaksi akun Free Fire & Mobile Legends.
                </p>
              </div>
              <button
                onClick={handleOpenAddFee}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Tarif Baru</span>
              </button>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#0b162c] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3">No</th>
                      <th className="px-5 py-3">Rentang Nominal Transaksi</th>
                      <th className="px-5 py-3">Biaya Jasa (Fee Rekber)</th>
                      <th className="px-5 py-3">Urutan</th>
                      <th className="px-5 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {rekberFees.map((fee, idx) => (
                      <tr key={fee.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-cyan-400 font-bold">0{idx + 1}</td>
                        <td className="px-5 py-3.5 font-medium text-white">{fee.range_label}</td>
                        <td className="px-5 py-3.5 font-mono font-bold text-cyan-300 text-sm">
                          {fee.fee_label}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 font-mono">{fee.sort_order}</td>
                        <td className="px-5 py-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditFee(fee)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors cursor-pointer"
                            title="Edit Tarif"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFee(fee.id, fee.range_label)}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                            title="Hapus Tarif"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LAYANAN GAME */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
                <span>Pengaturan Layanan Spesialisasi Game</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ubah deskripsi dan catatan spesialisasi untuk Free Fire dan Mobile Legends.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gameServices.map((service, index) => (
                <div key={service.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-heading text-base font-bold text-white">
                      {service.title}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                      GAME_{index + 1}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Judul Kartu
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const updated = [...gameServices];
                        updated[index].title = e.target.value;
                        setGameServices(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Deskripsi Ringkas
                    </label>
                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(e) => {
                        const updated = [...gameServices];
                        updated[index].description = e.target.value;
                        setGameServices(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Catatan Spesialisasi Layanan
                    </label>
                    <textarea
                      rows={3}
                      value={service.speciality_notes || ''}
                      onChange={(e) => {
                        const updated = [...gameServices];
                        updated[index].speciality_notes = e.target.value;
                        setGameServices(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0a1325] border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleSaveGameService(service)}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Layanan Ini</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KELOLA FAQ (CRUD) */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span>Daftar Pertanyaan Umum (FAQ)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tambah, perbarui, atau hapus pertanyaan dan jawaban yang tampil di accordion FAQ website.
                </p>
              </div>
              <button
                onClick={handleOpenAddFaq}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah FAQ Baru</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-cyan-500/30 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-400 text-xs font-bold">0{idx + 1}.</span>
                      <h3 className="font-semibold text-white text-sm sm:text-base">{faq.question}</h3>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm pl-6 leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors cursor-pointer"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
                      title="Hapus FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DATABASE & RLS STATUS */}
        {activeTab === 'database' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Status Supabase Database & Keamanan Server (RLS)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Laporan konfigurasi database relasional, autentikasi role, dan fungsi backend Netlify Functions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#091222] border border-slate-800">
                <span className="text-xs text-slate-400 font-mono block mb-1">Status Koneksi Supabase:</span>
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" /> Terhubung & Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold">
                    <RefreshCw className="w-4 h-4" /> Mode Preview (Siap Ditautkan)
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#091222] border border-slate-800">
                <span className="text-xs text-slate-400 font-mono block mb-1">Row Level Security (RLS):</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Enabled (Tabel Terproteksi)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#091222] border border-slate-800">
                <span className="text-xs text-slate-400 font-mono block mb-1">Backend Runtime:</span>
                <span className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Netlify Functions + Express
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1529] border border-cyan-500/20 text-xs text-slate-300 space-y-3">
              <p className="font-semibold text-cyan-300">
                Langkah Cepat Konfigurasi Supabase & Netlify:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
                <li>Buka dashboard proyek Supabase Anda, masuk ke menu <strong>SQL Editor</strong>.</li>
                <li>Salin seluruh skrip SQL yang tersedia di file <code>/supabase/schema.sql</code>, lalu klik <strong>Run</strong>.</li>
                <li>Di Netlify (Site configuration &gt; Environment variables), tambahkan:
                  <ul className="list-disc pl-5 mt-1 space-y-1 font-mono text-cyan-200">
                    <li>VITE_SUPABASE_URL = URL proyek Anda</li>
                    <li>VITE_SUPABASE_ANON_KEY = Anon public key</li>
                    <li>SUPABASE_SERVICE_ROLE_KEY = Service role secret key</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Tambah / Edit Tarif Rekber */}
      {feeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1426] border border-cyan-500/30 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span>{editingFee ? 'Edit Tarif Rekber' : 'Tambah Tarif Rekber Baru'}</span>
              </h3>
              <button
                onClick={() => setFeeModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFee} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Rentang Nominal (Contoh: Rp501.000 – Rp1.000.000++)
                </label>
                <input
                  type="text"
                  required
                  value={feeRangeLabel}
                  onChange={(e) => setFeeRangeLabel(e.target.value)}
                  placeholder="Rp100.000 – Rp200.000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Biaya Jasa Fee Rekber (Contoh: Rp10.000)
                </label>
                <input
                  type="text"
                  required
                  value={feePriceLabel}
                  onChange={(e) => setFeePriceLabel(e.target.value)}
                  placeholder="Rp10.000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono font-bold text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Nomor Urutan Tampil
                </label>
                <input
                  type="number"
                  min={1}
                  value={feeSortOrder}
                  onChange={(e) => setFeeSortOrder(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Tarif'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah / Edit FAQ */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1426] border border-cyan-500/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>{editingFaq ? 'Edit Pertanyaan FAQ' : 'Tambah FAQ Baru'}</span>
              </h3>
              <button
                onClick={() => setFaqModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="Contoh: Bagaimana proses serah terima akun?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Jawaban Lengkap
                </label>
                <textarea
                  rows={4}
                  required
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Penjelasan detail jawaban..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Nomor Urutan Tampil
                </label>
                <input
                  type="number"
                  min={1}
                  value={faqSortOrder}
                  onChange={(e) => setFaqSortOrder(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080F1E] border border-slate-700 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  {saving ? 'Menyimpan...' : 'Simpan FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
