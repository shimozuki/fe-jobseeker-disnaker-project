"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  BadgeCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Building2,
  RotateCcw,
  Building,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  verified: boolean;
  activeJobs: number;
  slug: string;
}

const companyData: Company[] = [
  /*
  {
    id: "c1",
    name: "PT Sumbawa Sejahtera Mining",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80",
    industry: "Pertambangan & Energi",
    location: "Sumbawa Besar",
    verified: true,
    activeJobs: 8,
    slug: "pt-sumbawa-sejahtera-mining",
  },
  {
    id: "c2",
    name: "RSUD Kabupaten Sumbawa",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&auto=format&fit=crop&q=80",
    industry: "Kesehatan & Rumah Sakit",
    location: "Sumbawa",
    verified: true,
    activeJobs: 5,
    slug: "rsud-kabupaten-sumbawa",
  },
  {
    id: "c3",
    name: "Bank NTB Syariah Sumbawa",
    logo: "https://cdn.antaranews.com/cache/1200x800/2025/11/10/Gedung-Bank-NTB-Syariah.jpg",
    industry: "Perbankan & Keuangan",
    location: "Sumbawa",
    verified: true,
    activeJobs: 3,
    slug: "bank-ntb-syariah",
  },
  {
    id: "c4",
    name: "Samawa Seaside Resort",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80",
    industry: "Pariwisata & Perhotelan",
    location: "Labuhan Badas",
    verified: true,
    activeJobs: 8,
    slug: "samawa-seaside-resort",
  },
  */
];

export default function FeaturedCompaniesSection() {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-20 border-t border-slate-200/80 font-['Poppins',sans-serif] relative overflow-hidden">
      {/* Background Subtle Accent Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-xs font-semibold text-teal-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Kemitraan Disnakertrans Sumbawa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Perusahaan & Instansi Terpercaya
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Jelajahi berbagai perusahaan dan penyedia kerja terverifikasi yang
              secara aktif membuka kesempatan karier di wilayah Kabupaten
              Sumbawa.
            </p>
          </div>

          <Link
            href="/perusahaan"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-teal-700 shadow-sm hover:shadow transition-all group shrink-0"
          >
            <span>Lihat Semua Perusahaan</span>
            <ArrowRight className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Vertical Modern Grid Card / UI Handler Data Kosong */}
        {companyData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.map((company) => (
              <Link
                key={company.id}
                href={`/perusahaan/${company.slug}`}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Header Card: Logo & Verified Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 p-1.5 shrink-0 group-hover:border-teal-300 transition-colors">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-inner">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {company.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-full">
                        <BadgeCheck className="h-3 w-3 text-teal-600" />
                        Resmi
                      </span>
                    ) : (
                      <div className="h-7 w-7 rounded-xl bg-slate-50 text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Company Name & Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                      {company.name}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-500">
                      <p className="flex items-center gap-1.5 truncate">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{company.industry}</span>
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{company.location}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Card: Job Count & Action Icon */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                    {company.activeJobs} Lowongan Aktif
                  </span>

                  <div className="h-7 w-7 rounded-lg bg-slate-50 group-hover:bg-teal-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-200/60 group-hover:border-teal-600">
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Building className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Belum Ada Perusahaan Mitra Unggulan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Saat ini belum ada data perusahaan atau instansi mitra unggulan
                yang ditampilkan di halaman utama. Silakan kunjungi direktori
                perusahaan untuk informasi lengkap.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/perusahaan-list"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <span>Lihat Direktori Perusahaan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
