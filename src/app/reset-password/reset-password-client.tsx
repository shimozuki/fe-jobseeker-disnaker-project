"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Eye, EyeOff, KeyRound, LockKeyhole, LoaderCircle } from "lucide-react";
import { resetPassword } from "@/features/auth/services/auth.service";

export default function ResetPasswordClient({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleConfirmation, setVisibleConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!token) return setError("Token reset tidak ditemukan. Silakan minta tautan reset password yang baru.");
    if (password.length < 8 || password.length > 72) return setError("Kata sandi harus terdiri dari 8 sampai 72 karakter.");
    if (password !== confirmation) return setError("Konfirmasi kata sandi belum cocok.");

    setLoading(true);
    try {
      const result = await resetPassword({ token, new_password: password });
      if (result?.status >= 200 && result?.status < 300) setSuccess(true);
      else setError("message" in (result ?? {}) ? String(result.message) : "Tautan reset tidak valid atau sudah kedaluwarsa.");
    } catch {
      setError("Reset kata sandi belum dapat diproses. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-14">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
        <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${success ? "bg-teal-50 text-teal-700" : "bg-blue-50 text-blue-700"}`}>
          {success ? <CheckCircle2 className="h-7 w-7" /> : <KeyRound className="h-7 w-7" />}
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">SIMNAKER · Pemulihan Akun</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{success ? "Kata sandi diperbarui" : "Buat kata sandi baru"}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{success ? "Kata sandi akun Anda berhasil diubah. Silakan masuk menggunakan kata sandi baru." : "Pilih kata sandi yang kuat untuk melindungi akun dan informasi karier Anda."}</p>

        {success ? (
          <Link href="/login" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800">Masuk ke akun</Link>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && <div role="alert" className="flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">Kata sandi baru</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="password" type={visible ? "text" : "password"} autoComplete="new-password" required minLength={8} maxLength={72} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 8 karakter" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmation" className="text-xs font-bold uppercase tracking-wider text-slate-700">Ulangi kata sandi</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="confirmation" type={visibleConfirmation ? "text" : "password"} autoComplete="new-password" required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Masukkan kembali kata sandi" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10" />
                <button type="button" onClick={() => setVisibleConfirmation(!visibleConfirmation)} aria-label={visibleConfirmation ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{visibleConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading || !token} className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Memperbarui...</> : "Simpan kata sandi baru"}
            </button>
            <p className="text-center text-xs text-slate-500">Ingat kata sandi Anda? <Link href="/login" className="font-semibold text-teal-700 hover:underline">Masuk</Link></p>
          </form>
        )}
      </section>
    </main>
  );
}
