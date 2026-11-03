"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Banknote,
  Clock,
  CalendarX,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  RotateCcw,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  isVerified: boolean;
  location: string;
  type: "Full-time" | "Part-time" | "Kontrak" | "Magang";
  education: string;
  salary?: string;
  publishedAt: string;
  deadline: string;
}

const mockJobs: Job[] = [
  /*
  {
    id: "1",
    title: "Senior Mine Operations Engineer",
    company: "PT Sumbawa Sejahtera Mining",
    companyLogo: "",
    isVerified: true,
    location: "Sumbawa Besar",
    type: "Full-time",
    education: "S1 Teknik Pertambangan",
    salary: "Rp 12.000.000 - Rp 20.000.000",
    publishedAt: "2 jam yang lalu",
    deadline: "15 Okt 2026",
  },
  {
    id: "2",
    title: "Front Desk & Guest Relation Officer",
    company: "Samawa Seaside Cottage",
    companyLogo: "",
    isVerified: true,
    location: "Labuhan Badas",
    type: "Full-time",
    education: "D3 / S1 Pariwisata",
    salary: "Rp 3.500.000 - Rp 5.000.000",
    publishedAt: "1 hari yang lalu",
    deadline: "30 Sep 2026",
  },
  {
    id: "3",
    title: "Staf Administrasi & Keuangan",
    company: "Perumda Batang Samawa",
    companyLogo: "",
    isVerified: true,
    location: "Sumbawa Besar",
    type: "Kontrak",
    education: "D3 / S1 Akuntansi",
    salary: "Sesuai UMK Sumbawa",
    publishedAt: "2 hari yang lalu",
    deadline: "05 Okt 2026",
  },
  {
    id: "4",
    title: "Junior Field Agricultural Supervisor",
    company: "PT Subur Samawa Agro",
    companyLogo: "",
    isVerified: false,
    location: "Plampang",
    type: "Full-time",
    education: "SMA / D3 Pertanian",
    salary: undefined,
    publishedAt: "3 hari yang lalu",
    deadline: "10 Okt 2026",
  },
  {
    id: "5",
    title: "Content Creator & Social Media Specialist",
    company: "Samawa Digital Studio",
    companyLogo: "",
    isVerified: true,
    location: "Unter Iwes",
    type: "Part-time",
    education: "SMA / S1 Semua Jurusan",
    salary: "Rp 2.000.000 - Rp 3.500.000",
    publishedAt: "3 hari yang lalu",
    deadline: "12 Okt 2026",
  },
  {
    id: "6",
    title: "Internship Field Surveyor & Mapping",
    company: "Dinas PUPR Kabupaten Sumbawa",
    companyLogo: "",
    isVerified: true,
    location: "Sumbawa Besar",
    type: "Magang",
    education: "D3 / S1 Teknik Sipil / Geodesi",
    salary: "Uang Saku Magang",
    publishedAt: "4 hari yang lalu",
    deadline: "01 Okt 2026",
  },
  */
];

export default function LatestJobsSection() {
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});

  const toggleSaveJob = (id: string) => {
    setSavedJobs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTypeBadgeColor = (type: Job["type"]) => {
    switch (type) {
      case "Full-time":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Part-time":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Kontrak":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Magang":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section className="relative bg-slate-50/50 py-16 font-['Poppins',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/80 px-3 py-1 text-[10px] font-semibold text-teal-700 mb-2">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span>Peluang Karier Terbaru</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Lowongan Kerja Terbaru
            </h2>
            <p className="mt-2 text-xs text-slate-500 max-w-xl">
              Temukan dan lamar pekerjaan impian Anda yang baru saja ditambahkan
              oleh perusahaan terverifikasi di Sumbawa.
            </p>
          </div>

          <Link
            href="/lowongan-kerja"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors group shrink-0"
          >
            <span>Lihat Semua Lowongan</span>
            <div className="p-1 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Jobs Grid / UI Handler Data Kosong */}
        {mockJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockJobs.map((job) => {
              const isSaved = savedJobs[job.id] || false;

              return (
                <div
                  key={job.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-md"
                >
                  <div>
                    {/* Card Header: Company Logo with Verified Badge & Save Button */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <div className="relative h-11 w-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden">
                            {job.companyLogo ? (
                              <Image
                                src={job.companyLogo}
                                alt={job.company}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Building2 className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Company Name & Location */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-slate-700 truncate">
                              {job.company}
                            </span>
                            {job.isVerified && (
                              <ShieldCheck className="h-4.5 w-4.5 text-white fill-teal-500 shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bookmark / Save Button */}
                      <button
                        type="button"
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border transition-all shrink-0 ${
                          isSaved
                            ? "bg-amber-50 border-amber-200 text-amber-600"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        }`}
                        aria-label="Simpan Lowongan"
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isSaved ? "fill-amber-500" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/lowongan-kerja/${job.id}`}>
                        {job.title}
                      </Link>
                    </h3>

                    {/* Tags: Type & Education */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getTypeBadgeColor(
                          job.type,
                        )}`}
                      >
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                        <GraduationCap className="h-3 w-3 text-slate-400" />
                        {job.education}
                      </span>
                    </div>

                    {/* Salary & Meta Info */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <Banknote className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                        <span>{job.salary || "Gaji Tidak Ditampilkan"}</span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400 pt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span>{job.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-700 font-medium">
                          <CalendarX className="h-3 w-3 shrink-0 text-amber-600" />
                          <span>Batas: {job.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <Link
                      href={`/lowongan-kerja/${job.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-[11px] font-semibold py-2.5 px-4 transition-all shadow-sm"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Belum Ada Lowongan Terbaru
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Saat ini belum ada lowongan pekerjaan terbaru yang
                dipublikasikan. Silakan cek kembali secara berkala atau jelajahi
                direktori perusahaan mitra kami.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/perusahaan"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <span>Jelajahi Perusahaan Mitra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Mobile View: See All Button */}
        {mockJobs.length > 0 && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/lowongan-kerja"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold py-3 px-4 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <span>Lihat Semua Lowongan</span>
              <ArrowRight className="h-3.5 w-3.5 text-teal-600" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
