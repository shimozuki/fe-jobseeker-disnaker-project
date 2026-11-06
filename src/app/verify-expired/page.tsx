"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { resendVerification } from "@/features/auth/services/auth.service";

export default function VerificationExpiredPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    if (!email) {
      setMsg("Silakan masukkan alamat email Anda terlebih dahulu.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMsg("");

    try {
      const result = await resendVerification(email);
      if (result.status !== 200) {
        setMsg("Gagal mengirim email verifikasi, coba lagi.");
        setIsSuccess(false);
      } else {
        setMsg(
          "Berhasil mengirim email verifikasi, harap periksa kotak pesan Anda.",
        );
        setIsSuccess(true);
      }
    } catch (error) {
      setMsg("Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-4">
        {/* Ikon Peringatan / Kedaluwarsa */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-amber-50 rounded-full border border-amber-100">
          <AlertCircle className="w-10 h-10 text-amber-600" />
        </div>

        {/* Header Teks */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Link Verifikasi Kedaluwarsa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Maaf, tautan verifikasi yang Anda gunakan telah kedaluwarsa atau
            sudah tidak berlaku demi keamanan akun Anda.
          </p>
        </div>

        {/* Kotak Informasi Bantuan */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-xs leading-relaxed text-left">
          Silakan masukkan email Anda untuk meminta tautan verifikasi baru.
        </div>

        {/* Input Email */}
        <div className="space-y-1 text-left">
          <label className="block text-xs font-bold text-slate-700">
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
            />
          </div>
        </div>

        {/* Notifikasi Pesan Feedback */}
        {msg && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              isSuccess
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{msg}</span>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>
              {isLoading ? "Mengirim..." : "Kirim Ulang Link Verifikasi"}
            </span>
          </button>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Masuk</span>
          </Link>
        </div>

        {/* Footer Kecil */}
        <p className="text-[10px] text-slate-400">
          Butuh bantuan?{" "}
          <a
            href="/bantuan"
            className="text-app-navy-600 font-semibold hover:underline"
          >
            Hubungi Tim Dukungan
          </a>
        </p>
      </div>
    </div>
  );
}
