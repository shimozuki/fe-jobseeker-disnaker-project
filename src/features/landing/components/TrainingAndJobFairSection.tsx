"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Building2,
  ArrowRight,
  Sparkles,
  CalendarOff,
  RotateCcw,
} from "lucide-react";

// Interface Data Agenda
interface EventItem {
  id: string;
  title: string;
  category:
    | "job_fair"
    | "pelatihan"
    | "seminar"
    | "workshop"
    | "magang"
    | "sertifikasi";
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: "open" | "coming_soon" | "closed";
  statusLabel: string;
  image: string;
  link: string;
}

export default function TrainingAndJobFairSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Data Agenda Kegiatan (Dikomentari sesuai permintaan)
  const events: EventItem[] = [
    /*
    {
      id: "ev-1",
      title: "Sumbawa Career Expo & Job Fair Hybrid 2026",
      category: "job_fair",
      categoryLabel: "Job Fair",
      date: "15 - 16 Oktober 2026",
      time: "08:00 - 16:00 WITA",
      location: "Gedung Serbaguna Sumbawa Besar",
      organizer: "Dinas Tenaga Kerja & Transmigrasi",
      status: "open",
      statusLabel: "Pendaftaran Dibuka",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
      link: "/informasi-karir/job-fair-sumbawa-2026",
    },
    {
      id: "ev-2",
      title: "Bootcamp Intensif Frontend Development & React.js",
      category: "pelatihan",
      categoryLabel: "Pelatihan Keterampilan",
      date: "01 - 12 November 2026",
      time: "09:00 - 15:00 WITA",
      location: "Sumbawa Techno Park / Online",
      organizer: "Kominfo x SumbawaDev",
      status: "open",
      statusLabel: "Pendaftaran Dibuka",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      link: "/informasi-karir/job-fair-sumbawa-2026",
    },
    {
      id: "ev-3",
      title: "Workshop Strategi Membangun CV ATS-Friendly & Portfolio Review",
      category: "workshop",
      categoryLabel: "Workshop CV",
      date: "28 Oktober 2026",
      time: "13:30 - 16:00 WITA",
      location: "Ruang Aula Perpustakaan Daerah",
      organizer: "KarirSumbawa Academy",
      status: "coming_soon",
      statusLabel: "Segera Dibuka",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80",
      link: "/agenda/workshop-cv-ats",
    },
    {
      id: "ev-4",
      title: "Sertifikasi Kompetensi Operator Tambang & POP",
      category: "sertifikasi",
      categoryLabel: "Sertifikasi",
      date: "20 - 22 November 2026",
      time: "08:00 - 17:00 WITA",
      location: "Pusat Pelatihan K3 Taliwang",
      organizer: "BNSP x PT AMNT",
      status: "open",
      statusLabel: "Pendaftaran Dibuka",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
      link: "/agenda/sertifikasi-pop-bnsp",
    },
    {
      id: "ev-5",
      title: "Seminar Karier: Navigasi Industri Hijau & Renewable Energy",
      category: "seminar",
      categoryLabel: "Seminar Karier",
      date: "05 November 2026",
      time: "09:00 - 12:00 WITA",
      location: "Auditorium Universitas Samawa",
      organizer: "Himpunan Mahasiswa & Disnakertrans",
      status: "coming_soon",
      statusLabel: "Segera Dibuka",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80",
      link: "/agenda/seminar-green-jobs",
    },
    {
      id: "ev-6",
      title: "Program Pemagangan Industri Tambang & Geologi batch IV",
      category: "magang",
      categoryLabel: "Pemagangan",
      date: "01 Desember 2026",
      time: "6 Bulan Program",
      location: "Batu Hijau Site, Sumbawa Barat",
      organizer: "Konsorsium Tambang Sumbawa",
      status: "closed",
      statusLabel: "Pendaftaran Ditutup",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80",
      link: "/agenda/pemagangan-tambang-b4",
    },
    */
  ];

  // Filter Agenda
  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((item) => item.category === activeFilter);

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-teal-100/80 border border-teal-200 text-teal-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>Pengembangan Diri & Karir</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pelatihan, Workshop & Job Fair Terdekat
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              Tingkatkan daya saing dan perluas jaringan profesional Anda
              melalui berbagai agenda kegiatan kerja resmi di wilayah Sumbawa
              dan sekitarnya.
            </p>
          </div>

          <Link
            href="/agenda"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-700 hover:text-teal-800 hover:underline shrink-0 group"
          >
            <span>Lihat Semua Agenda Kegiatan</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* TAB FILTER KATEGORI */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {[
            { id: "all", label: "Semua Agenda" },
            { id: "job_fair", label: "Job Fair" },
            { id: "pelatihan", label: "Pelatihan Keterampilan" },
            { id: "workshop", label: "Workshop CV" },
            { id: "sertifikasi", label: "Sertifikasi" },
            { id: "seminar", label: "Seminar Karier" },
            { id: "magang", label: "Program Pemagangan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GRID KARTU AGENDA / UI HANDLER KETIKA DATA KOSONG */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* IMAGE HEADER & BADGE */}
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* BADGE KATEGORI */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-[9px] uppercase tracking-wider rounded-md shadow-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* BADGE STATUS PENDAFTARAN */}
                  <div className="absolute bottom-2.5 left-2.5">
                    {item.status === "open" && (
                      <span className="px-2 py-0.5 bg-emerald-500 text-white font-bold text-[9px] rounded-full inline-flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {item.statusLabel}
                      </span>
                    )}
                    {item.status === "coming_soon" && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white font-bold text-[9px] rounded-full shadow-sm">
                        {item.statusLabel}
                      </span>
                    )}
                    {item.status === "closed" && (
                      <span className="px-2 py-0.5 bg-slate-600 text-white font-bold text-[9px] rounded-full shadow-sm">
                        {item.statusLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT BODY */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>

                    <div className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-2.5">
                      {/* TANGGAL & WAKTU */}
                      <div className="flex items-start gap-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.date}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      {/* LOKASI */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <p className="line-clamp-1 font-medium">
                          {item.location}
                        </p>
                      </div>

                      {/* PENYELENGGARA */}
                      <div className="flex items-start gap-2">
                        <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <p className="line-clamp-1 text-slate-500 text-[10px]">
                          Penyelenggara:{" "}
                          <strong className="text-slate-700">
                            {item.organizer}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER BUTTON */}
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href={item.link}
                      className={`w-full py-2 px-3 rounded-lg text-[11px] font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
                        item.status === "closed"
                          ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          : "bg-teal-700 text-white hover:bg-teal-800 shadow-sm"
                      }`}
                    >
                      <span>Lihat Detail Agenda</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <CalendarOff className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {events.length === 0
                  ? "Belum Ada Agenda Kegiatan"
                  : "Agenda Tidak Ditemukan"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {events.length === 0
                  ? "Saat ini belum ada jadwal pelatihan, job fair, atau workshop yang dipublikasikan. Silakan periksa kembali di lain waktu."
                  : "Tidak ada agenda kegiatan yang cocok dengan kategori filter yang Anda pilih saat ini."}
              </p>
            </div>
            {activeFilter !== "all" && (
              <div className="pt-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  <span>Tampilkan Semua Agenda</span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
