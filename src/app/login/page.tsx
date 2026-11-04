"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
  CircleAlert,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/services/auth.service";
import { useToast } from "@/shared/contexts/ToastContext";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { userDashboardPath } from "@/shared/utils/userDashboardPath";
import { useAuthUser } from "@/shared/contexts/SessionContext";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<String>("");
  const { addToast } = useToast();
  const [token, setToken] = useLocalStorage<string | null>(
    "access-token",
    null,
  );

  const { setToggleUpdateAuth } = useAuthUser();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      email: identifier,
      password,
    };

    const result = await login(payload);
    console.log(result);
    if (result?.status !== 200) {
      if (result?.status === 403) {
        if ("message" in result) {
          setErrMsg(
            (result.message as String) +
              ". Silahkan cek email anda untuk melakukan verifikasi!",
          );
          setIsLoading(false);
          return;
        }
      }
      setErrMsg("Kesalahan pada server");
      setIsLoading(false);
      return;
    }
    setToken(result.data.data.access_token);
    addToast("Login berhasil", "success");
    setIsLoading(false);
    setToggleUpdateAuth((prev) => !prev);
    const userAccountType = result.data.data.user.account_type;
    router.push(userDashboardPath[userAccountType]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* SISI KIRI: HERO / BRANDING PANEL (Tampil di Layar Medium Ke Atas) */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden text-white">
        {/* BACKGROUND IMAGE WITH NEXT/IMAGE */}
        <Image
          src="/images/hero-0.jpg"
          alt="Hero Background Sumbawa Karir"
          fill
          priority
          className="object-cover object-center"
        />

        {/* OVERLAY GRADIENT (Agar teks tetap kontras dan mudah dibaca) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-app-navy-950/85 to-slate-900/90 z-0" />

        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-app-navy-500/20 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-app-navy-400/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Branding Top */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image
              src="/images/karir-logo-1.png"
              alt="Logo Sumbawa Karir"
              width={180}
              height={50}
              className="h-17 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>
        </div>

        {/* Hero Content Center */}
        <div className="relative z-10 space-y-8 max-w-md">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Portal Resmi Pengembangan Karier
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Bangun Masa Depan & Karier Terbaik di Wilayah Sumbawa
            </h2>
            <p className="text-app-navy-100/80 text-xs leading-relaxed">
              Hubungkan potensi Anda dengan ribuan peluang kerja, program
              pelatihan tersertifikasi, dan jejaring profesional lokal.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
              <div className="p-2 bg-teal-500/30 rounded-lg">
                <Briefcase className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  Akses Lowongan Eksklusif
                </h3>
                <p className="text-[10px] text-teal-200/70">
                  Peluang kerja terverifikasi dari perusahaan terpercaya.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
              <div className="p-2 bg-teal-500/30 rounded-lg">
                <GraduationCap className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  Program Pelatihan & Sertifikasi
                </h3>
                <p className="text-[10px] text-teal-200/70">
                  Tingkatkan keahlian sesuai kebutuhan industri saat ini.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Panel Kiri */}
        <div className="relative z-10 text-[11px] text-teal-300 flex items-center justify-between">
          <p>
            © {new Date().getFullYear()} Sumbawa Karir. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>Terproteksi SSL</span>
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm mx-auto my-auto space-y-6">
          {/* Header Form */}
          <div className="space-y-2">
            {/* Logo untuk Tampilan Mobile */}
            <div className="lg:hidden mb-6">
              <Link href="/">
                <Image
                  src="/images/karir-logo-1.png"
                  alt="Logo Sumbawa Karir"
                  width={160}
                  height={45}
                  className="h-15 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-xs text-slate-500">
              Silakan masukkan kredensial akun Anda untuk mengakses portal.
            </p>
          </div>
          {/* ALERT ERROR */}
          {errMsg && (
            <div className="flex gap-2 p-3 bg-red-50 border items-center border-red-200 rounded-xl text-red-600 text-xs font-semibold">
              <CircleAlert size={16} />
              {errMsg}
            </div>
          )}

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email / No Telp */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                Email atau Nomor Telepon
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="contoh@email.com atau 081234567890"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
                >
                  Kata Sandi
                </label>
                <Link
                  href="/lupa-password"
                  className="text-[11px] font-semibold text-app-navy-700 hover:text-app-navy-800 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi Anda"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Ingat Saya Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                />
                <span className="text-[11px] font-medium text-slate-600">
                  Ingat Saya di Perangkat Ini
                </span>
              </label>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl shadow-md shadow-app-navy-700/10 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <span>Masuk Ke Akun</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-slate-50 px-3 text-slate-400 font-bold tracking-wider">
                Atau Masuk Menggunakan
              </span>
            </div>
          </div>

          {/* Social OAuth Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                router.push("/dashboard/perusahaan");
              }}
              className="w-full py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-[11px] font-bold text-slate-700 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                router.push("/dashboard/admin");
              }}
              className="w-full py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-[11px] font-bold text-slate-700 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FaFacebook className="w-4 h-4 text-[#1877F2]" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Link Register */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-500">
              Belum memiliki akun?{" "}
              <Link
                href="/registration"
                className="font-bold text-app-navy-700 hover:text-app-navy-800 hover:underline"
              >
                Daftar Akun Baru
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Mobile/Kanan Bottom */}
        <div className="mt-8 text-center space-y-2 text-[10px] text-slate-400">
          <div className="space-x-3">
            <Link href="/kebijakan-privasi" className="hover:underline">
              Kebijakan Privasi
            </Link>
            <span>•</span>
            <Link href="/syarat-ketentuan" className="hover:underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
