"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function VerifiedSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-3">
        {/* Ikon Sukses */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-emerald-50 rounded-full border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-white shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Header Teks */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Akun Berhasil Diverifikasi!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Selamat! Identitas dan dokumen akun Anda telah berhasil diverifikasi
            oleh sistem. Sekarang Anda dapat mengakses seluruh fitur penuh
            platform.
          </p>
        </div>

        {/* Informasi Status Badge */}
        <div className="p-3 bg-app-navy-50 border border-app-navy-100 rounded-2xl flex items-center justify-center gap-2 text-app-navy-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-app-navy-600 shrink-0" />
          <span>Status: Akun Resmi & Terverifikasi</span>
        </div>

        {/* Tombol Aksi */}
        <div className="space-y-2">
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <span>Lanjutkan Masuk ke Akun</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* Footer Kecil */}
        <p className="text-[10px] text-slate-400">
          Butuh bantuan?{" "}
          <a
            href="/tentang-kami"
            className="text-app-navy-600 font-semibold hover:underline"
          >
            Hubungi Tim Dukungan
          </a>
        </p>
      </div>
    </div>
  );
}
