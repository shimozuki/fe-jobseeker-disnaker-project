"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  MapPin,
  Building2,
  Filter,
  ChevronRight,
  RotateCcw,
  Tag,
  Clock,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Users,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  CalendarOff,
} from "lucide-react";

// Tipe Data Event Ketenagakerjaan
interface CareerEvent {
  id: string;
  slug: string;
  title: string;
  category: "Pelatihan" | "Job Fair" | "Seminar & Workshop";
  organizer: string;
  startDate: string; // Format YYYY-MM-DD
  displayDate: string;
  time: string;
  location: string;
  isOnline: boolean;
  status: "Pendaftaran Buka" | "Akan Datang" | "Selesai";
  thumbnail: string;
  quota: string;
  description: string;
}

// Mock Data Agenda Ketenagakerjaan (Dikomentari sesuai permintaan)
const mockEvents: CareerEvent[] = [
  /*
  {
    id: "EVT-001",
    slug: "job-fair-sumbawa-2026",
    title: "Sumbawa Grand Job Fair 2026",
    category: "Job Fair",
    organizer: "Dinas Tenaga Kerja & Transmigrasi Sumbawa",
    startDate: "2026-10-15",
    displayDate: "15 - 16 Oktober 2026",
    time: "08:00 - 16:00 WITA",
    location: "Gedung Wanita Sumbawa Besar",
    isOnline: false,
    status: "Pendaftaran Buka",
    thumbnail: "/images/karir-logo-1.png",
    quota: "50+ Perusahaan & 1.000+ Lowongan",
    description:
      "Bursa kerja terbesar di Sumbawa menghadirkan puluhan perusahaan lokal dan nasional dari berbagai industri.",
  },
  {
    id: "EVT-002",
    slug: "pelatihan-digital-marketing-umkm",
    title: "Pelatihan Intensive Digital Marketing & E-Commerce",
    category: "Pelatihan",
    organizer: "BLK Sumbawa x Kominfo",
    startDate: "2026-10-01",
    displayDate: "01 - 05 Oktober 2026",
    time: "09:00 - 15:00 WITA",
    location: "Aula BLK Sumbawa Besar",
    isOnline: false,
    status: "Pendaftaran Buka",
    quota: "30 Peserta (Gratis & Sertifikat)",
    thumbnail: "/images/karir-logo-1.png",
    description:
      "Program sertifikasi gratis untuk menguasai pemasaran digital, strategi iklan, dan manajemen toko online.",
  },
  {
    id: "EVT-003",
    slug: "workshop-resume-interview-hacks",
    title: "Workshop: Tips Lolos Interview & Menulis CV Standar ATS",
    category: "Seminar & Workshop",
    organizer: "Sumbawa Career Center",
    startDate: "2026-09-28",
    displayDate: "28 September 2026",
    time: "14:00 - 16:30 WITA",
    location: "Zoom Meeting (Online)",
    isOnline: true,
    status: "Pendaftaran Buka",
    quota: "500 Peserta",
    thumbnail: "/images/karir-logo-1.png",
    description:
      "Pelajari cara menyusun resume profesional yang dilirik HRD serta simulasi wawancara kerja yang efektif.",
  },
  {
    id: "EVT-004",
    slug: "pelatihan-frontend-web-developer",
    title: "Bootcamp Pelatihan Web Development Frontend (React & Next.js)",
    category: "Pelatihan",
    organizer: "Sumbawa Tech Hub",
    startDate: "2026-11-01",
    displayDate: "01 November - 10 Desember 2026",
    time: "19:00 - 21:00 WITA",
    location: "Hybrid (Online & Basecamp Tech Hub)",
    isOnline: true,
    status: "Akan Datang",
    quota: "25 Peserta Terpilih",
    thumbnail: "/images/karir-logo-1.png",
    description:
      "Pelatihan koding intensif membangun aplikasi web modern berbasis Next.js dan Tailwind CSS.",
  },
  {
    id: "EVT-005",
    slug: "seminar-karir-industri-pertambangan",
    title: "Seminar Kesiapan Kerja Sektor Pertambangan & Energi Sumbawa",
    category: "Seminar & Workshop",
    organizer: "Himpunan Ahli Tambang Sumbawa",
    startDate: "2026-08-10",
    displayDate: "10 Agustus 2026",
    time: "09:00 - 12:00 WITA",
    location: "Hotel Grand Sumbawa",
    isOnline: false,
    status: "Selesai",
    quota: "150 Peserta",
    thumbnail: "/images/karir-logo-1.png",
    description:
      "Pembekalan wawasan standar K3 dan kualifikasi teknis yang dibutuhkan industri tambang modern.",
  },
  */
];

// Preset Filter
const quickPresets = [
  { label: "Semua Agenda", category: "" },
  { label: "Pelatihan", category: "Pelatihan" },
  { label: "Job Fair", category: "Job Fair" },
  { label: "Seminar & Workshop", category: "Seminar & Workshop" },
];

export default function InformasiKarirPage() {
  const router = useRouter();

  // State Search & Filter Input
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const toggleStatusFilter = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedStatus([]);
    setLocationQuery("");
    setFilterDate("");
  };

  // Logika Filter Agenda Ketenagakerjaan
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      if (
        searchQuery &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }

      if (selectedStatus.length > 0 && !selectedStatus.includes(event.status)) {
        return false;
      }

      if (
        locationQuery &&
        !event.location.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }

      if (filterDate && event.startDate < filterDate) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedStatus,
    locationQuery,
    filterDate,
  ]);

  // Styling Badge Status
  const getStatusBadge = (status: CareerEvent["status"]) => {
    switch (status) {
      case "Pendaftaran Buka":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Akan Datang":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Selesai":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Styling Badge Kategori
  const getCategoryBadge = (category: CareerEvent["category"]) => {
    switch (category) {
      case "Pelatihan":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "Job Fair":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Seminar & Workshop":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-18 font-[Poppins]">
      {/* HEADER & SEARCH AREA */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <nav className="flex items-center gap-1.5 text-[13px] text-slate-500 justify-center sm:justify-start">
              <Link
                href="/dashboard"
                className="hover:text-teal-700 transition-colors"
              >
                Dashboard
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-semibold text-slate-800">
                Informasi Karir
              </span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Agenda <span className="text-teal-700">Ketenagakerjaan</span>{" "}
              Sumbawa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Ikuti job fair, pelatihan keterampilan gratis, dan seminar
              peningkatan kapasitas karir untuk melesatkan potensi profesional
              Anda.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative bg-white p-2 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama agenda, job fair, atau penyelenggara..."
                className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <div className="relative w-full sm:w-56 shrink-0">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Lokasi kegiatan..."
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <button className="w-full sm:w-auto px-7 py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-2xl shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              <span>Cari Agenda</span>
            </button>
          </div>

          {/* QUICK CATEGORY PRESETS */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
            {quickPresets.map((preset, idx) => {
              const active = selectedCategory === preset.category;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(preset.category)}
                  className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    active
                      ? "bg-teal-700 text-white shadow-md shadow-teal-700/15"
                      : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                  }`}
                >
                  <Tag
                    className={`w-3 h-3 ${active ? "text-amber-300" : "text-slate-400"}`}
                  />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* SIDEBAR FILTER */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-teal-700" />
                Filter Kegiatan
              </h2>
              <button
                onClick={handleResetFilters}
                title="Reset Filter"
                aria-label="Reset Filter"
                className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* FILTER JENIS KEGIATAN */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Jenis Kegiatan
              </label>
              {[
                { label: "Semua Jenis", value: "" },
                { label: "Pelatihan & Bootcamp", value: "Pelatihan" },
                { label: "Job Fair / Bursa Kerja", value: "Job Fair" },
                { label: "Seminar & Workshop", value: "Seminar & Workshop" },
              ].map((cat) => (
                <label
                  key={cat.value}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="radio"
                    name="categoryFilter"
                    checked={selectedCategory === cat.value}
                    onChange={() => setSelectedCategory(cat.value)}
                    className="h-4 w-4 text-teal-700 focus:ring-teal-600 border-slate-300 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors font-medium">
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>

            {/* FILTER STATUS PENDAFTARAN */}
            <div className="space-y-2.5 pt-3.5 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Status Pendaftaran
              </label>
              {["Pendaftaran Buka", "Akan Datang", "Selesai"].map((st) => (
                <label
                  key={st}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(st)}
                    onChange={() => toggleStatusFilter(st)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors font-medium">
                    {st}
                  </span>
                </label>
              ))}
            </div>

            {/* FILTER TANGGAL MULAI */}
            <div className="space-y-2.5 pt-3.5 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Mulai Dari Tanggal
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full pl-9 pr-2.5 py-2 text-[11px] bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                />
              </div>
            </div>
          </aside>

          {/* MAIN EVENT LIST AREA */}
          <main className="lg:col-span-3 space-y-5">
            {/* TOP STATUS BAR */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3">
              <p className="text-[11px] sm:text-xs text-slate-500">
                Menampilkan{" "}
                <span className="font-bold text-teal-800">
                  {filteredEvents.length}
                </span>{" "}
                agenda kegiatan ketenagakerjaan.
              </p>
            </div>

            {/* EVENT CARDS LIST / UI HANDLER KETIKA DATA KOSONG */}
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col md:flex-row gap-5 items-start group"
                  >
                    {/* Thumbnail Kegiatan */}
                    <div className="w-full md:w-48 h-40 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden shrink-0 flex items-center justify-center p-3">
                      <Image
                        src={evt.thumbnail}
                        alt={evt.title}
                        width={110}
                        height={110}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full border text-[9px] font-extrabold uppercase tracking-wider ${getStatusBadge(
                          evt.status,
                        )}`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    {/* Informasi Detail Kegiatan */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold ${getCategoryBadge(
                            evt.category,
                          )}`}
                        >
                          {evt.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Oleh:{" "}
                          <strong className="text-slate-700">
                            {evt.organizer}
                          </strong>
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>

                      {/* Detail Metadata (Tanggal, Lokasi, Kuota) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span className="font-semibold">
                            {evt.displayDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span className="font-medium text-teal-800">
                            {evt.quota}
                          </span>
                        </div>
                      </div>

                      {/* Tombol Lihat Detail */}
                      <div className="pt-2.5 flex justify-end border-t border-slate-50">
                        <Link
                          href={`/informasi-karir/${evt.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold rounded-xl shadow-md shadow-teal-700/15 transition-all group-hover:translate-x-0.5"
                        >
                          <span>Lihat Detail</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
              <div className="bg-white rounded-3xl border border-slate-100 p-12 sm:p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                  <CalendarOff className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {mockEvents.length === 0
                      ? "Belum Ada Agenda Ketenagakerjaan"
                      : "Agenda Tidak Ditemukan"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {mockEvents.length === 0
                      ? "Saat ini belum ada jadwal agenda pelatihan, job fair, atau seminar yang dipublikasikan. Silakan periksa kembali di lain waktu."
                      : "Tidak ada agenda kegiatan ketenagakerjaan yang cocok dengan kriteria kata kunci pencarian atau filter yang Anda terapkan saat ini."}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <span>Tampilkan Semua Kegiatan</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
