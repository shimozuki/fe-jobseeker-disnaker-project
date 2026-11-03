"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleAlert, LoaderCircle, Mail, MailCheck } from "lucide-react";
import { forgotPassword } from "@/features/auth/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await forgotPassword(email);
      if (result?.status >= 200 && result?.status < 300) setSent(true);
      else setError("message" in (result ?? {}) ? String(result.message) : "Permintaan belum dapat diproses. Silakan coba lagi.");
    } catch {
      setError("Permintaan belum dapat diproses. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-14">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          {sent ? <MailCheck className="h-7 w-7" /> : <Mail className="h-7 w-7" />}
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">SIMNAKER · Pemulihan Akun</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{sent ? "Periksa email Anda" : "Lupa kata sandi?"}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {sent ? "Jika alamat tersebut terdaftar, kami akan mengirim tautan untuk membuat kata sandi baru. Silakan periksa kotak masuk dan folder spam." : "Masukkan email yang terhubung dengan akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi."}
        </p>
        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && <div role="alert" className="flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">Alamat email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 disabled:cursor-wait disabled:opacity-60">
              {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Mengirim...</> : "Kirim tautan reset"}
            </button>
          </form>
        ) : (
          <div role="status" className="mt-6 flex gap-2 rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm leading-5 text-teal-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />Jika akun belum terdaftar, pesan akan tetap sama demi menjaga keamanan akun.</div>
        )}
        <Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-700"><ArrowLeft className="h-4 w-4" />Kembali ke masuk</Link>
      </section>
    </main>
  );
}
