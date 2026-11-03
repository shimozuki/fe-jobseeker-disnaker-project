/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  DollarSign,
  CalendarDays,
  Clock,
  ChevronDown,
  Filter,
  ArrowRight,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Building2,
  Laptop,
  Flame,
  RotateCcw,
  Bookmark,
  BriefcaseBusiness,
} from "lucide-react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

// Tipe Data Lowongan
interface JobVacancy {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  category: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  workSystem: "WFO" | "WFH" | "Hybrid";
  education: string;
  experience: string;
  salaryRange: string;
  salaryDisplay?: boolean;
  publishedDate: string; // YYYY-MM-DD
  deadline: string; // YYYY-MM-DD
  isFeatured?: boolean;
  isBumn?: boolean; // Penanda BUMN / Instansi
}

// Mock Data Lowongan (Dikomentari sesuai permintaan)
const mockJobs: JobVacancy[] = [
  /*
  {
    id: "JOB-001",
    title: "Senior Frontend Developer (React / Next.js)",
    companyName: "PT Technology Innovation Sumbawa",
    companyLogo: "/images/karir-logo-1.png",
    location: "Sumbawa Besar, NTB",
    category: "Teknologi Informasi",
    type: "Full-time",
    workSystem: "Hybrid",
    education: "S1 Teknik Informatika",
    experience: "3+ Tahun",
    salaryRange: "Rp 8.000.000 - Rp 12.000.000",
    salaryDisplay: true,
    publishedDate: "2026-09-23",
    deadline: "2026-10-20",
    isFeatured: true,
  },
  {
    id: "JOB-002",
    title: "Staff Administrasi & Keuangan Samawa",
    companyName: "CV Agro Samawa Berjaya",
    companyLogo: "/images/karir-logo-1.png",
    location: "Empang, Sumbawa",
    category: "Administrasi",
    type: "Full-time",
    workSystem: "WFO",
    education: "D3 / S1 Akuntansi",
    experience: "1-2 Tahun",
    salaryRange: "Rp 3.500.000 - Rp 5.000.000",
    salaryDisplay: false,
    publishedDate: "2026-09-22",
    deadline: "2026-10-15",
  },
  {
    id: "JOB-003",
    title: "UI/UX Designer Specialist",
    companyName: "PT Samawa Creative Studio",
    companyLogo: "/images/karir-logo-1.png",
    location: "Sumbawa / Remote",
    category: "Desain & Kreatif",
    type: "Contract",
    workSystem: "WFH",
    education: "SMA/SMK (Portofolio Kuat)",
    experience: "2+ Tahun",
    salaryRange: "Rp 5.000.000 - Rp 7.500.000",
    salaryDisplay: true,
    publishedDate: "2026-09-21",
    deadline: "2026-10-10",
  },
  {
    id: "JOB-004",
    title: "Supervisor Operasional Pertambangan",
    companyName: "PT Mineral Sumbawa Energi",
    companyLogo: "/images/karir-logo-1.png",
    location: "Maluk, Sumbawa Barat",
    category: "Pertambangan & Energi",
    type: "Full-time",
    workSystem: "WFO",
    education: "S1 Teknik Pertambangan",
    experience: "5+ Tahun",
    salaryRange: "Rp 15.000.000 - Rp 25.000.000",
    salaryDisplay: true,
    publishedDate: "2026-09-18",
    deadline: "2026-10-30",
    isFeatured: true,
  },
  {
    id: "JOB-005",
    title: "Analis Layanan Publik & Keuangan",
    companyName: "BPR NTB Sumbawa (BUMD)",
    companyLogo: "/images/karir-logo-1.png",
    location: "Sumbawa Besar, NTB",
    category: "Keuangan & Perbankan",
    type: "Full-time",
    workSystem: "WFO",
    education: "S1 Ekonomi / Akuntansi",
    experience: "Fresh Graduate / 1 Tahun",
    salaryRange: "Rp 4.500.000 - Rp 6.000.000",
    salaryDisplay: true,
    publishedDate: "2026-09-23",
    deadline: "2026-10-25",
    isBumn: true,
  },
  {
    id: "JOB-006",
    title: "HR Generalist (Sumbawa Branch)",
    companyName: "Nusantara Digital Group",
    companyLogo: "/images/karir-logo-1.png",
    location: "Remote (Sumbawa)",
    category: "Sumber Daya Manusia",
    type: "Part-time",
    workSystem: "WFH",
    education: "S1 Psikologi / Hukum",
    experience: "2-3 Tahun",
    salaryRange: "Rp 4.000.000 - Rp 6.000.000",
    salaryDisplay: false,
    publishedDate: "2026-09-20",
    deadline: "2026-10-05",
  },
  {
    id: "JOB-007",
    title: "Operator Mesin Produksi Pakan",
    companyName: "CV Samawa Pakan Ternak",
    companyLogo: "/images/karir-logo-1.png",
    location: "Plampang, Sumbawa",
    category: "Manufaktur & Produksi",
    type: "Full-time",
    workSystem: "WFO",
    education: "Min. SMA/SMK Teknik",
    experience: "1 Tahun / Fresh",
    salaryRange: "Rp 3.200.000 - Rp 4.000.000",
    salaryDisplay: true,
    publishedDate: "2026-09-17",
    deadline: "2026-10-15",
  },
  {
    id: "JOB-008",
    title: "Internship Social Media Officer",
    companyName: "Sumbawa Karir Portal",
    companyLogo: "/images/karir-logo-1.png",
    location: "Remote",
    category: "Desain & Kreatif",
    type: "Internship",
    workSystem: "WFH",
    education: "Mahasiswa / Fresh Graduate",
    experience: "Tanpa Pengalaman",
    salaryRange: "Rp 1.500.000 (Uang Saku)",
    salaryDisplay: true,
    publishedDate: "2026-09-23",
    deadline: "2026-11-01",
  },
  */
];

// Opsi Quick Navigation Tabs Sesuai Spesifikasi URL
const quickUrlFilters = [
  {
    title: "Semua Lowongan",
    desc: "Jelajahi seluruh peluang karir di Sumbawa",
    href: "/lowongan-kerja",
    icon: Search,
    badge: null,
  },
  {
    title: "Lowongan Terbaru",
    desc: "Peluang kerja yang baru dipublikasikan",
    href: "/lowongan-kerja?filter=terbaru",
    icon: Flame,
    badge: "Hot",
  },
  {
    title: "Full-Time (Penuh Waktu)",
    desc: "Karir permanen & kontrak jangka panjang",
    href: "/lowongan-kerja?tipe=full-time",
    icon: Clock,
    badge: null,
  },
  {
    title: "Remote / Work From Home",
    desc: "Kerja fleksibel dari mana saja",
    href: "/lowongan-kerja?tipe=remote",
    icon: Laptop,
    badge: "Populer",
  },
  {
    title: "BUMN & Instansi Daerah",
    desc: "Peluang karir di sektor pemerintahan & BUMN",
    href: "/lowongan-kerja?kategori=bumn",
    icon: Building2,
    badge: null,
  },
  {
    title: "Magang & Fresh Graduate",
    desc: "Khusus lulusan baru & program magang",
    href: "/lowongan-kerja?kategori=magang",
    icon: GraduationCap,
    badge: null,
  },
];

export default function DaftarLowonganPage() {
  const router = useRouter();

  // State Parameter URL menggunakan window.location.search
  const [filterParam, setFilterParam] = useState<string | null>(null);
  const [tipeParam, setTipeParam] = useState<string | null>(null);
  const [kategoriParam, setKategoriParam] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const filter = params.get("filter");
    const tipe = params.get("tipe");
    const kategori = params.get("kategori");

    setFilterParam(filter);
    setTipeParam(tipe);
    setKategoriParam(kategori);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Terbaru");

  // State Filter Sidebar (Checkbox)
  const [filters, setFilters] = useState({
    type: [] as string[],
    workSystem: [] as string[],
    education: [] as string[],
  });

  // Sinkronisasi URL Params ke State Sidebar secara Otomatis
  useEffect(() => {
    const newTypes: string[] = [];
    const newWorkSystems: string[] = [];

    if (tipeParam === "full-time") {
      newTypes.push("Full-time");
    } else if (tipeParam === "remote") {
      newWorkSystems.push("WFH");
    }

    if (kategoriParam === "magang") {
      newTypes.push("Internship");
    }

    setFilters((prev) => ({
      ...prev,
      type: newTypes,
      workSystem: newWorkSystems,
    }));
  }, [tipeParam, kategoriParam]);

  const toggleFilterType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const toggleFilterWorkSystem = (system: string) => {
    setFilters((prev) => ({
      ...prev,
      workSystem: prev.workSystem.includes(system)
        ? prev.workSystem.filter((s) => s !== system)
        : [...prev.workSystem, system],
    }));
  };

  // Logika Penyaringan Data Utama
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // 1. Filter dari Query Param: filter=terbaru
      if (filterParam === "terbaru") {
        if (job.publishedDate !== "2026-09-23") return false;
      }

      // 2. Filter dari Query Param: tipe=full-time | remote
      if (tipeParam === "full-time") {
        if (job.type !== "Full-time") return false;
      } else if (tipeParam === "remote") {
        if (
          job.workSystem !== "WFH" &&
          !job.location.toLowerCase().includes("remote")
        ) {
          return false;
        }
      }

      // 3. Filter dari Query Param: kategori=bumn | magang
      if (kategoriParam === "bumn") {
        if (!job.isBumn) return false;
      } else if (kategoriParam === "magang") {
        if (
          job.type !== "Internship" &&
          !job.experience.toLowerCase().includes("fresh")
        ) {
          return false;
        }
      }

      // 4. Input Pencarian Keyword
      if (
        searchQuery &&
        !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 5. Filter Manual Checkbox Sidebar (Pekerjaan)
      if (filters.type.length > 0 && !filters.type.includes(job.type)) {
        return false;
      }

      // 6. Filter Manual Checkbox Sidebar (Sistem Kerja)
      if (
        filters.workSystem.length > 0 &&
        !filters.workSystem.includes(job.workSystem)
      ) {
        return false;
      }

      return true;
    });
  }, [filterParam, tipeParam, kategoriParam, searchQuery, filters]);

  // Cek Tab Mana yang Aktif Berdasarkan URL
  const isTabActive = (href: string) => {
    if (href === "/lowongan-kerja") {
      return !filterParam && !tipeParam && !kategoriParam;
    }
    if (href.includes("filter=terbaru")) return filterParam === "terbaru";
    if (href.includes("tipe=full-time")) return tipeParam === "full-time";
    if (href.includes("tipe=remote")) return tipeParam === "remote";
    if (href.includes("kategori=bumn")) return kategoriParam === "bumn";
    if (href.includes("kategori=magang")) return kategoriParam === "magang";
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-18 font-[Poppins]">
      {/* HEADER & SEARCH AREA */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <Breadcrumbs />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Temukan <span className="text-app-navy-700">Karier Impian</span>{" "}
              Anda di Sumbawa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Jelajahi peluang kerja terbaru dari perusahaan terpercaya di
              seluruh wilayah Sumbawa.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative bg-white p-2.5 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama posisi, keahlian, atau nama perusahaan..."
                className="w-full pl-11 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all"
              />
            </div>
            <div className="relative w-full sm:w-60 shrink-0">
              <MapPin className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pilih lokasi atau 'Remote'..."
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all"
              />
            </div>
            <button className="w-full sm:w-auto px-7 py-3 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-2xl shadow-md shadow-app-navy-700/20 transition-all flex items-center justify-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              <span>Cari Kerja</span>
            </button>
          </div>

          {/* PRESET QUICK URL FILTERS */}
          <div className="overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5 min-w-max pb-1">
              {quickUrlFilters.map((tab, idx) => {
                const IconComponent = tab.icon;
                const active = isTabActive(tab.href);
                return (
                  <Link
                    key={idx}
                    href={tab.href}
                    className={`px-3.5 py-2 rounded-2xl text-[10px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                      active
                        ? "bg-app-navy-700 text-white shadow-md shadow-app-navy-700/15"
                        : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        active ? "text-amber-300" : "text-slate-400"
                      }`}
                    />
                    <span>{tab.title}</span>
                    {tab.badge && (
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                          active
                            ? "bg-amber-400 text-slate-950"
                            : "bg-teal-100 text-teal-800"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* SIDEBAR FILTER */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-app-navy-700" />
                Filter Pencarian
              </h2>
              <button
                onClick={() => {
                  setFilters({ type: [], workSystem: [], education: [] });
                  router.push("/lowongan-kerja");
                }}
                title="Reset Filter"
                aria-label="Reset Filter"
                className="p-1.5 text-slate-400 hover:text-app-navy-700 hover:bg-app-navy-50 rounded-lg transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* JENIS PEKERJAAN */}
            <div className="space-y-2.5">
              <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest">
                Jenis Pekerjaan
              </label>
              {["Full-time", "Part-time", "Contract", "Internship"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2.5 cursor-pointer select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleFilterType(type)}
                      className="h-4 w-4 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors">
                      {type}
                    </span>
                  </label>
                ),
              )}
            </div>

            {/* SISTEM KERJA */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest">
                Sistem Kerja
              </label>
              {["WFO", "WFH", "Hybrid"].map((system) => (
                <label
                  key={system}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={filters.workSystem.includes(system)}
                    onChange={() => toggleFilterWorkSystem(system)}
                    className="h-4 w-4 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors">
                    {system}
                  </span>
                </label>
              ))}
            </div>

            <button className="w-full py-2.5 px-3 bg-slate-900 hover:bg-black text-white text-[11px] font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] mt-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Terapkan Filter
            </button>
          </aside>

          {/* MAIN LIST AREA */}
          <main className="lg:col-span-3 space-y-6">
            {/* TOP BAR */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Menampilkan{" "}
                  <span className="font-bold text-app-navy-800">
                    {filteredJobs.length}
                  </span>{" "}
                  lowongan kerja aktif.
                </p>
                {(filterParam || tipeParam || kategoriParam) && (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg capitalize">
                    Filter: {filterParam || tipeParam || kategoriParam}
                  </span>
                )}
              </div>

              {/* SORTING DROPDOWN */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                  Urutkan:
                </span>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 pr-8 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Terbaru">Terbaru Diunggah</option>
                    <option value="Relevan">Paling Relevan</option>
                    <option value="Deadline">Batas Terdekat</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* JOB GRID / UI HANDLER KETIKA DATA KOSONG */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:border-app-navy-100 hover:shadow-app-navy-700/5 transition-all duration-300 relative group"
                  >
                    {job.isFeatured && (
                      <div className="absolute top-0 right-14 translate-y-[-50%] bg-amber-400 text-black px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                    {job.isBumn && (
                      <div className="absolute top-0 right-14 translate-y-[-50%] bg-blue-600 text-white px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        BUMN / BUMD
                      </div>
                    )}

                    <button className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors border border-slate-100 group-hover:border-rose-100">
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                        <Image
                          src={job.companyLogo}
                          alt={job.companyName}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="space-y-0.5 flex-1 pr-7">
                        <Link
                          href={`/lowongan-kerja/${job.id}`}
                          className="block"
                        >
                          <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-app-navy-700 transition-colors line-clamp-2 leading-snug">
                            {job.title}
                          </h3>
                        </Link>
                        <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {job.companyName}
                        </p>
                        <p className="text-[9.5px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-app-navy-50 text-app-navy-700 text-[9px] font-bold border border-app-navy-100">
                          <Briefcase className="w-2.5 h-2.5" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-bold border border-slate-200/80">
                          <Zap className="w-2.5 h-2.5 text-amber-500" />
                          {job.workSystem}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-semibold border border-slate-200/80">
                          <GraduationCap className="w-2.5 h-2.5" />
                          {job.education}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-semibold border border-slate-200/80">
                          <TrendingUp className="w-2.5 h-2.5" />
                          Exp: {job.experience}
                        </span>
                      </div>

                      <div className="bg-slate-50/70 p-2.5 rounded-2xl border border-slate-100/80 flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          <p
                            className={`text-[11px] ${
                              job.salaryDisplay
                                ? "font-extrabold text-slate-900"
                                : "font-semibold text-slate-400 italic"
                            }`}
                          >
                            {job.salaryDisplay
                              ? job.salaryRange
                              : "Gaji Tidak Ditampilkan"}
                          </p>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono">
                          / bulan
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[9px] text-slate-400">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {job.publishedDate}
                        </span>
                        <span className="flex items-center gap-1 text-rose-600 font-medium">
                          <CalendarDays className="w-2.5 h-2.5" />
                          {job.deadline}
                        </span>
                      </div>
                      <Link
                        href={`/lowongan-kerja/${job.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-app-navy-700 hover:text-app-navy-800 transition-colors shrink-0"
                      >
                        Detail
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
              <div className="bg-white rounded-3xl border border-slate-100 p-12 sm:p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                  <BriefcaseBusiness className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {mockJobs.length === 0
                      ? "Belum Ada Lowongan Pekerjaan"
                      : "Lowongan Tidak Ditemukan"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {mockJobs.length === 0
                      ? "Saat ini belum ada data lowongan pekerjaan yang tersedia di portal. Silakan periksa kembali secara berkala atau jelajahi kategori lainnya."
                      : "Tidak ada lowongan pekerjaan yang sesuai dengan kriteria kata kunci pencarian atau filter URL yang Anda pilih saat ini."}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      router.push("/lowongan-kerja");
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <span>Lihat Semua Lowongan</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            {filteredJobs.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
                  disabled
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Sebelumnya
                </button>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                  <button className="w-8 h-8 rounded-lg bg-app-navy-700 text-white shadow-md shadow-app-navy-700/10 flex items-center justify-center text-xs">
                    1
                  </button>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-xl shadow-sm transition-all">
                  Selanjutnya
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
