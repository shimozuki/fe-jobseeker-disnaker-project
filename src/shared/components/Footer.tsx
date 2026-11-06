"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Building2,
  ChevronRight,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const hideFootbar =
    pathname.startsWith("/dashboard") ||
<<<<<<< HEAD
    ["login", "registration", "403", "verify-email", "reset-password", "lupa-password"].some((route) => pathname.includes(route));
=======
    ["login", "registration", "403", "verify"].some((route) =>
      pathname.includes(route),
    );
>>>>>>> upstream/main

  if (hideFootbar) return null;

  return (
    <footer className="relative top-16 bg-slate-900 text-slate-300 font-['Poppins',sans-serif] border-t border-slate-800">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-amber-500 to-teal-600" />

      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Disnakertrans Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo SIMNAKER Image */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative h-[50px] w-[120px] overflow-hidden rounded-xl group-hover:border-teal-500 transition-colors shrink-0">
                <Image
                  src="/images/karir-logo-1.png"
                  alt="SIMNAKER Logo"
                  width={200}
                  height={100}
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Portal informasi lowongan kerja digital terpadu Kabupaten Sumbawa.
              Menghubungkan pencari kerja lokal secara transparan dengan
              perusahaan terpercaya dan instansi resmi.
            </p>

            {/* Identitas Disnakertrans Sumbawa */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">
                  Dinas Tenaga Kerja & Transmigrasi
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Pemerintah Kabupaten Sumbawa, Nusa Tenggara Barat.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[10px] text-teal-400 font-medium">
                <ShieldCheck className="h-3 w-3 text-teal-400" />
                <span>Pengawasan & Pengelolaan Resmi</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Navigasi
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Beranda", href: "/" },
                { name: "Cari Lowongan", href: "/lowongan" },
                { name: "Perusahaan", href: "/perusahaan" },
                { name: "Tips Karier", href: "/tips-karier" },
                { name: "Job Fair", href: "/job-fair" },
                { name: "Tentang Kami", href: "/tentang-kami" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-600" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Legal Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Bantuan & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "FAQ", href: "/faq" },
                { name: "Panduan Pengguna", href: "/panduan" },
                { name: "Hubungi Kami", href: "/kontak" },
                { name: "Kebijakan Privasi", href: "/kebijakan-privasi" },
                { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-600" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Info & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Kontak Resmi
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Garuda No. 10, Kel. Lempeh, Kec. Sumbawa, Kabupaten
                  Sumbawa, NTB 84310
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>(0371) 21234 / +62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-teal-400 shrink-0" />
                <a
                  href="mailto:disnakertrans@sumbawakab.go.id"
                  className="hover:text-white transition-colors"
                >
                  disnakertrans@sumbawakab.go.id
                </a>
              </div>
            </div>

            {/* Social Media Links dengan SVG Custom */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-300 mb-2">
                Media Sosial Resmi:
              </p>
              <div className="flex items-center gap-2">
                {/* Facebook SVG */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white border border-slate-700/60 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.72l-.43 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white border border-slate-700/60 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn SVG */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white border border-slate-700/60 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube SVG */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white border border-slate-700/60 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Lucide Globe (Website Official) */}
                <a
                  href="https://sumbawakab.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website Resmi Kab. Sumbawa"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white border border-slate-700/60 transition-all duration-200"
                >
                  <Globe className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright Section */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-500">
          <p>
            © {currentYear}{" "}
            <span className="font-semibold text-slate-300">SIMNAKER</span>. Hak
            Cipta Dilindungi Undang-Undang.
          </p>
          <p className="text-slate-500">
            Dikelola oleh{" "}
            <span className="text-slate-400">Disnakertrans Kab. Sumbawa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
