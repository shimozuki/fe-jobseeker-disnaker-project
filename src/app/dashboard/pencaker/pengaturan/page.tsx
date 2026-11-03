"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Settings,
  ChevronRight,
  Mail,
  Phone,
  Lock,
  BadgeCheck,
  Bell,
  Languages,
  Eye,
  FileText,
  Download,
  UserX,
  Trash2,
  LogOut,
  AlertTriangle,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { logout } from "@/features/auth/services/auth.service";
import { useToast } from "@/shared/contexts/ToastContext";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export default function PengaturanAkunPage() {
  // Mock State untuk contoh interaksi minimal
  const [email] = useState("andi.pratama@email.com");
  const [phone] = useState("+62 812 3456 7890");
  const [isVerified] = useState(true);
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [profileVisibility, setProfileVisibility] = useState("Publik");
  const { user } = useAuthUser();
  const { addToast } = useToast();
  const [token] = useLocalStorage("access-token", null);

  const handleLogout = async () => {
    if (!token) return;
    const result = await logout(token);
    if (result.status !== 200) {
      addToast("Gagal logout", "error");
      return;
    }

    window.location.href = "/login";
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="mx-auto p-4 sm:p-6 lg:p-0 space-y-10 font-[Poppins] text-slate-800">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-app-navy-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Pengaturan</span>
        </nav>

        {/* Main Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Settings className="w-7 h-7 text-app-navy-700" />
              <span>Pengaturan Akun</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola kredensial login, keamanan, preferensi, dan privasi data
              akun Anda.
            </p>
          </div>
        </div>
      </div>

      {/* KATEGORI 1: KEAMANAN & KREDENSIAL */}
      <section className="space-y-6">
        <div className="border-l-2 border-slate-900 pl-3">
          <h2 className="text-base font-bold text-slate-900">
            Keamanan & Kredensial
          </h2>
          <p className="text-xs text-slate-500">
            Inti akses dan verifikasi akun Anda
          </p>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Email Akun */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0">
            <div className="flex items-center gap-3.5">
              <Mail className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Alamat Email
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {user?.email}
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-app-navy-700 hover:text-app-navy-900 underline self-start sm:self-auto">
              Ubah Email
            </button>
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3.5">
              <Phone className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Nomor Telepon
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {user?.phone}
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-app-navy-700 hover:text-app-navy-900 underline self-start sm:self-auto">
              Ubah Nomor
            </button>
          </div>

          {/* Kata Sandi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3.5">
              <Lock className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Kata Sandi
                </p>
                <p className="text-sm font-bold text-slate-900">
                  ••••••••••••••
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-app-navy-700 hover:text-app-navy-900 underline self-start sm:self-auto">
              Ganti Password
            </button>
          </div>

          {/* Verifikasi Akun */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <div className="flex items-center gap-3.5">
              <BadgeCheck
                className={`w-5 h-5 ${user?.email_verified_at ? "text-emerald-500" : "text-amber-500"} shrink-0`}
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Verifikasi Akun
                </p>
                <p
                  className={`text-xs font-medium ${user?.email_verified_at ? "text-emerald-700" : "text-amber-700"}`}
                >
                  {user?.email_verified_at
                    ? "Akun Anda telah terverifikasi penuh."
                    : "Lengkapi verifikasi untuk akses penuh."}
                </p>
              </div>
            </div>
            {!user?.email_verified_at && (
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all">
                Lengkapi Verifikasi
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KATEGORI 2: PREFERENSI & VISIBILITAS */}
      <section className="space-y-6 pt-2">
        <div className="border-l-2 border-slate-900 pl-3">
          <h2 className="text-base font-bold text-slate-900">
            Preferensi & Visibilitas
          </h2>
          <p className="text-xs text-slate-500">
            Sesuaikan pengalaman dan privasi profil Anda
          </p>
        </div>

        <div className="space-y-5 divide-y divide-slate-100 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Notifikasi */}
          <div className="flex items-center justify-between pt-0">
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-sm font-bold text-slate-900">
                Pengaturan Notifikasi
              </p>
            </div>
            <Link
              href="/dashboard/pengaturan/notifikasi"
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Bahasa */}
          <div className="flex items-center justify-between gap-3 pt-5 relative">
            <div className="flex items-center gap-3.5">
              <Globe className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-sm font-bold text-slate-900">
                Bahasa Aplikasi
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-200/70 transition-colors">
              {language}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Visibilitas Profil */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 relative">
            <div className="flex items-center gap-3.5">
              <Eye className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Visibilitas Profil
                </p>
                <p className="text-xs text-slate-500 max-w-sm">
                  Tentukan siapa yang dapat melihat profil Anda di pencarian
                  perusahaan.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-200/70 transition-colors self-start sm:self-auto">
              {profileVisibility}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Pengaturan CV */}
          <div className="flex items-center justify-between pt-5">
            <div className="flex items-center gap-3.5">
              <FileText className="w-5 h-5 text-slate-400 shrink-0" />
              <p className="text-sm font-bold text-slate-900">
                Pengaturan & Berkas CV
              </p>
            </div>
            <Link
              href="/dashboard/profil/dokumen"
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* KATEGORI 3: DATA & TINDAKAN LANJUTAN */}
      <section className="space-y-6 pt-2">
        <div className="border-l-2 border-slate-900 pl-3">
          <h2 className="text-base font-bold text-slate-900">
            Data & Tindakan Lanjutan
          </h2>
          <p className="text-xs text-slate-500">
            Unduh data pribadi, manajemen status akun, dan logout
          </p>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Download Data Pribadi */}
          <div className="flex items-center justify-between pt-0 group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-slate-200 transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Unduh Data Pribadi
                </p>
                <p className="text-xs text-slate-500">
                  Minta salinan seluruh data pribadi Anda dalam format .zip
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-app-navy-700 hover:text-app-navy-900 underline">
              Minta Data
            </button>
          </div>

          {/* Nonaktifkan Akun */}
          <div className="flex items-center justify-between pt-4 group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-100 transition-colors">
                <UserX className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Nonaktifkan Akun Sementara
                </p>
                <p className="text-xs text-slate-500">
                  Profil Anda tidak akan terlihat, data tetap tersimpan.
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-amber-700 hover:text-amber-900 underline">
              Nonaktifkan
            </button>
          </div>

          {/* Hapus Akun */}
          <div className="flex items-center justify-between pt-4 group">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-100 transition-colors">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-rose-700">
                  Hapus Akun Permanen
                </p>
                <p className="text-xs text-rose-500">
                  Hapus seluruh profil, lamaran, dan data Anda selamanya.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Hapus Akun
            </button>
          </div>

          {/* LOGOUT */}
          <div className="flex items-center justify-between pt-5 border-t-2 border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                <LogOut className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-slate-500">
                Ingin keluar dari sesi saat ini?
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              Keluar / Logout
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
