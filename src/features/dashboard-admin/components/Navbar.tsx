"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  ShieldCheck,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  CheckCircle2,
  FileCheck2,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { accountTypeMap } from "@/shared/utils/userAccountTypeMap";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/services/auth.service";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
}

export default function NavbarDashboardAdmin({
  onToggleMobileSidebar,
}: NavbarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user } = useAuthUser();
  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();

  const hide = ["/dashboard/admin/peta"].some((route) =>
    pathname.includes(route),
  );

  const handleLogout = async () => {
    if (!token) return;
    const result = await logout(token);
    if (result.status !== 200) {
      addToast("Gagal logout", "error");
      return;
    }

    window.location.href = "/login";
  };

  if (hide) return null;
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 flex items-center justify-between font-['Poppins',sans-serif]">
      {/* LEFT SECTION: MOBILE TOGGLE & SEARCH BAR */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-md">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200 md:hidden transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari lowongan, perusahaan, pelamar, atau berita..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
          {/* <kbd className="hidden lg:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 px-1.5 py-0.5 text-[0.6rem] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd> */}
        </div>
      </div>

      {/* RIGHT SECTION: ACTIONS & USER PROFILE */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action: Verifikasi Lowongan */}
        {/* <Link
          href="/dashboard/disnakertrans/lowongan/verifikasi"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium shadow-xs shadow-teal-600/20 transition-all duration-200"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Verifikasi Lowongan</span>
        </Link> */}

        {/* <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" /> */}

        <Link
          href="/dashboard/disnakertrans/pesan"
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          title="Pesan & Komunikasi"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
        </Link>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              if (isProfileOpen) setIsProfileOpen(false);
            }}
            className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-800">
                    Notifikasi Disnakertrans
                  </span>
                  <span className="text-[0.65rem] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full font-medium">
                    2 Perlu Verifikasi
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[0.7rem] font-medium text-slate-700">
                        <span className="font-semibold text-slate-900">
                          PT Amanah Nusantara
                        </span>{" "}
                        mengajukan verifikasi akun perusahaan baru.
                      </p>
                      <span className="text-[0.625rem] text-slate-400">
                        10 menit yang lalu
                      </span>
                    </div>
                  </div>

                  <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[0.7rem] font-medium text-slate-700">
                        Lowongan baru{" "}
                        <span className="font-semibold text-slate-900">
                          Staff Administrasi
                        </span>{" "}
                        menunggu persetujuan verifikasi.
                      </p>
                      <span className="text-[0.625rem] text-slate-400">
                        1 jam yang lalu
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard/disnakertrans/notifikasi"
                  onClick={() => setIsNotificationOpen(false)}
                  className="block p-2.5 text-center text-[0.7rem] font-medium text-slate-500 hover:text-teal-600 bg-slate-50/80 border-t border-slate-100 transition-colors"
                >
                  Lihat Semua Notifikasi
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Disnakertrans Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              if (isNotificationOpen) setIsNotificationOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <Image
                src="/images/karir-logo-1.png"
                alt="Avatar Disnakertrans"
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="hidden md:flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                  {user?.full_name}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              </div>
              <span className="text-[0.625rem] text-slate-500">
                {accountTypeMap[user?.account_type as string]}
              </span>
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180 text-slate-700" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1.5 space-y-0.5"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    Admin Disnakertrans
                  </p>
                  <p className="text-[0.65rem] text-slate-500 truncate">
                    admin@disnakertrans.go.id
                  </p>
                </div>

                <Link
                  href="/dashboard/disnakertrans/pengaturan/akun"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pengaturan Akun</span>
                </Link>

                <Link
                  href="/dashboard/disnakertrans/bantuan"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pusat Bantuan</span>
                </Link>

                <div className="h-[1px] bg-slate-100 my-1" />

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
