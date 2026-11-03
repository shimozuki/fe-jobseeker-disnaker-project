"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  CircleAlert,
  PersonStanding,
  CardSim,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ACCOUNT_TYPE } from "@/shared/types/accountType.type";
import { register } from "@/features/auth/services/auth.service";
import { useToast } from "@/shared/contexts/ToastContext";
import { useRouter } from "next/navigation";
import Modal from "@/shared/components/Modal";
import TermsAndConditionsContent from "@/features/auth/components/TermsAndConditionsContents";
import PrivacyPolicyContent from "@/features/auth/components/PrivacyPolicyContents";
import { BsPassport } from "react-icons/bs";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<ACCOUNT_TYPE>("job_seeker");
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeTermsOpen, setIsAgreeTermsOpen] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreePrivacyOpen, setIsAgreePrivacyOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { addToast } = useToast();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok dengan kata sandi!");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      setErrorMsg(
        "Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi!",
      );
      return;
    }

    setIsLoading(true);

    const payload = {
      nik,
      full_name: fullName,
      email,
      phone,
      password,
      account_type: accountType,
      terms_accepted: agreeTerms,
      privacy_accepted: agreePrivacy,
    };

    const result = await register(payload);

    if (result?.status !== 201) {
      if (result?.status === 409 || result?.status === 400) {
        if ("message" in result) {
          setErrorMsg(result.message);
          setIsLoading(false);
          return;
        }
      }

      setErrorMsg("Kesalahan pada server!");
      setIsLoading(false);
      return;
    }
    addToast("Registrasi Berhasil", "success", 3000, "top-right");
    setIsLoading(false);
    router.push("/login");
  };

  const closeAgreeTermsModal = () => {
    setIsAgreeTermsOpen(false);
  };

  const closeAgreePrivacyModal = () => {
    setIsAgreePrivacyOpen(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex text-slate-800">
      <Modal isOpen={agreeTermsOpen} onClose={closeAgreeTermsModal}>
        <TermsAndConditionsContent
          hasAgreed={agreeTerms}
          setHasAgreed={setAgreeTerms}
          onCloseModal={closeAgreeTermsModal}
        ></TermsAndConditionsContent>
      </Modal>
      <Modal isOpen={agreePrivacyOpen} onClose={closeAgreePrivacyModal}>
        <PrivacyPolicyContent
          hasAgreed={agreePrivacy}
          setHasAgreed={setAgreePrivacy}
          onCloseModal={closeAgreePrivacyModal}
        ></PrivacyPolicyContent>
      </Modal>
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

        {/* OVERLAY GRADIENT */}
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
              className="h-20 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>
        </div>

        {/* Hero Content Center */}
        <div className="relative z-10 space-y-8 max-w-md">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Bergabung Bersama Sumbawa Karir
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Mulai Langkah Karier atau Temukan Talenta Terbaik
            </h2>
            <p className="text-teal-100/80 text-xs leading-relaxed">
              Daftarkan diri Anda sebagai Pencari Kerja untuk menemukan peluang
              karier, atau sebagai Perusahaan untuk merekrut talenta berbakat di
              Sumbawa.
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
                  Ribuan Peluang Karir
                </h3>
                <p className="text-[10px] text-teal-200/70">
                  Akses langsung lowongan kerja dari berbagai sektor industri.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
              <div className="p-2 bg-teal-500/30 rounded-lg">
                <GraduationCap className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  Pengembangan Diri & Pelatihan
                </h3>
                <p className="text-[10px] text-teal-200/70">
                  Ikuti sertifikasi dan kelas peningkatan kompetensi kerja.
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
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Terproteksi SSL</span>
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM REGISTRASI */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md mx-auto my-auto space-y-6">
          {/* Header Form */}
          <div className="space-y-2">
            {/* Logo Mobile */}
            <div className="lg:hidden mb-6">
              <Link href="/">
                <Image
                  src="/images/karir-logo-1.png"
                  alt="Logo Sumbawa Karir"
                  width={160}
                  height={45}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Buat Akun Baru
            </h1>
            <p className="text-xs text-slate-500">
              Lengkapi data di bawah ini untuk memulai akun Sumbawa Karir Anda.
            </p>
          </div>

          {/* TAB SELEKTOR JENIS AKUN */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Pilih Jenis Akun
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-200/60 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setAccountType("job_seeker")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  accountType === "job_seeker"
                    ? "bg-white text-app-navy-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Pencari Kerja</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("company")}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  accountType === "company"
                    ? "bg-white text-app-navy-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Perusahaan</span>
              </button>
            </div>
          </div>

          {/* ALERT ERROR */}
          {errorMsg && (
            <div className="flex gap-2 p-3 bg-red-50 border items-center border-red-200 rounded-xl text-red-600 text-xs font-semibold">
              <CircleAlert size={16} />
              {errorMsg}
            </div>
          )}

          {/* FORM UTAMA */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {accountType === "job_seeker" && (
              <div className="space-y-1">
                <label
                  htmlFor="nik"
                  className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
                >
                  NIK
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <BsPassport className="h-4 w-4" />
                  </div>
                  <input
                    id="nik"
                    type="text"
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="5204XXXXXXXXXXXX"
                    className="block w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}
            {/* INPUT NAMA LENGKAP / PERUSAHAAN */}
            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                {accountType === "job_seeker"
                  ? "Nama Lengkap"
                  : "Nama Perusahaan / Instansi"}
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  {accountType === "job_seeker" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Building2 className="h-4 w-4" />
                  )}
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    accountType === "job_seeker"
                      ? "Masukkan nama lengkap Anda"
                      : "Masukkan nama resmi perusahaan"
                  }
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* INPUT EMAIL */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                Alamat Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* INPUT NOMOR TELEPON */}
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                Nomor Telepon / WhatsApp
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                Kata Sandi
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
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

            {/* INPUT KONFIRMASI PASSWORD */}
            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi Anda"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* CHECKBOX SYARAT & KETENTUAN DAN KEBIJAKAN PRIVASI */}
            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 mt-0.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                />
                <span className="text-[11px] font-medium text-slate-600 leading-tight">
                  Saya menyetujui{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsAgreeTermsOpen(true);
                    }}
                    className="font-bold text-app-navy-700 hover:underline"
                  >
                    Syarat dan Ketentuan
                  </span>{" "}
                  yang berlaku di portal Sumbawa Karir.
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="h-4 w-4 mt-0.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                />
                <span className="text-[11px] font-medium text-slate-600 leading-tight">
                  Saya telah membaca dan menyetujui{" "}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsAgreePrivacyOpen(true);
                    }}
                    className="font-bold text-app-navy-700 hover:underline"
                  >
                    Kebijakan Privasi
                  </span>
                  .
                </span>
              </label>
            </div>

            {/* TOMBOL DAFTAR */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl shadow-md shadow-app-navy-700/10 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-3"
            >
              {isLoading ? (
                <span>Memproses Pendaftaran...</span>
              ) : (
                <>
                  <span>Daftar Akun Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-slate-50 px-3 text-slate-400 font-bold tracking-wider">
                Atau Daftar Dengan
              </span>
            </div>
          </div> */}

          {/* SOCIAL LOGIN */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-[11px] font-bold text-slate-700 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="w-full py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-[11px] font-bold text-slate-700 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FaFacebook className="w-4 h-4 text-[#1877F2]" />
              <span>Facebook</span>
            </button>
          </div> */}

          {/* LINK MENUJU HALAMAN LOGIN */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-500">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-bold text-app-navy-700 hover:text-app-navy-800 hover:underline"
              >
                Masuk ke Akun
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Right */}
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
