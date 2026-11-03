"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, LoaderCircle, MailCheck, Send } from "lucide-react";
import { resendVerification, verifyEmail } from "@/features/auth/services/auth.service";

export default function VerifyEmailClient({ token }: { token: string }) {
  const hasRequested = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  async function handleResend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResendLoading(true);
    setResendError("");
    setResendMessage("");
    try {
      const result = await resendVerification(email);
      if (result?.status >= 200 && result?.status < 300) {
        setResendMessage("Jika email terdaftar dan belum terverifikasi, tautan baru akan dikirim ke kotak masuk Anda.");
      } else {
        setResendError("message" in (result ?? {}) ? String(result.message) : "Tautan verifikasi belum dapat dikirim. Silakan coba lagi.");
      }
    } catch {
      setResendError("Tautan verifikasi belum dapat dikirim. Silakan coba lagi nanti.");
    } finally {
      setResendLoading(false);
    }
  }

  useEffect(() => {
    if (!token || hasRequested.current) return;
    hasRequested.current = true;
    verifyEmail(token).then((result) => {
      if (result?.status >= 200 && result?.status < 300) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage("message" in (result ?? {}) ? String(result.message) : "Tautan verifikasi tidak valid atau sudah kedaluwarsa.");
      }
    }).catch(() => {
      setStatus("error");
      setMessage("Verifikasi belum dapat diproses. Silakan coba lagi nanti.");
    });
  }, [token]);

  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <section className="relative w-full max-w-lg rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-12">
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${status === "success" ? "bg-teal-50 text-teal-600" : status === "error" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}>
          {status === "loading" ? <LoaderCircle className="h-10 w-10 animate-spin" /> : status === "error" ? <CircleAlert className="h-10 w-10" /> : <MailCheck className="h-10 w-10" />}
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">SIMNAKER · Keamanan Akun</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {status === "loading" ? "Memverifikasi email" : status === "error" ? "Verifikasi belum berhasil" : "Email berhasil diverifikasi!"}
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600">
          {status === "loading" ? "Kami sedang memastikan tautan ini valid. Mohon tunggu sebentar." : status === "error" ? message || "Tautan verifikasi tidak ditemukan. Buka kembali tautan dari email Anda." : "Alamat email Anda sudah terkonfirmasi. Sekarang Anda dapat masuk dan mulai menggunakan akun SIMNAKER."}
        </p>
        {status !== "loading" && (
          <Link href={status === "success" ? "/login" : "/registration"} className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${status === "success" ? "bg-teal-700 shadow-teal-700/20 hover:bg-teal-800" : "bg-slate-800 shadow-slate-800/20 hover:bg-slate-900"}`}>
            {status === "success" ? <><CheckCircle2 className="h-4 w-4" /> Masuk ke akun</> : "Kembali ke pendaftaran"}
          </Link>
        )}
        {status === "error" && (
          <form onSubmit={handleResend} className="mt-7 border-t border-slate-100 pt-6 text-left">
            <label htmlFor="resend-email" className="text-xs font-bold uppercase tracking-wider text-slate-700">Kirim ulang tautan verifikasi</label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input id="resend-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Alamat email Anda" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
              <button type="submit" disabled={resendLoading} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60">
                {resendLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Kirim ulang
              </button>
            </div>
            {(resendMessage || resendError) && <p role={resendError ? "alert" : "status"} className={`mt-3 text-xs leading-5 ${resendError ? "text-rose-600" : "text-teal-700"}`}>{resendError || resendMessage}</p>}
          </form>
        )}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400"><CheckCircle2 className="h-4 w-4 text-teal-600" />Tautan aman untuk akun Anda</div>
      </section>
    </main>
  );
}
