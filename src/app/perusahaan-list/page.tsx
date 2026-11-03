/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Building2,
  Users,
  CheckCircle2,
  Briefcase,
  ChevronRight,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Globe,
  Sparkles,
  Zap,
  Building,
  ShieldCheck,
  Flame,
  RotateCcw,
} from "lucide-react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

// Tipe Data Perusahaan
interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  location: string;
  employeeScale: "Micro" | "Small" | "Medium" | "Large";
  employeeCount: string;
  isVerified: boolean;
  activeJobsCount: number;
  totalJobsCount: number;
  description: string;
  website: string;
}

// Mock Data Perusahaan (Dikomentari sesuai permintaan)
const mockCompanies: Company[] = [
  /*
  {
    id: "COMP-001",
    name: "PT Technology Innovation Sumbawa",
    slug: "COMP-001",
    logo: "/images/karir-logo-1.png",
    industry: "Teknologi Informasi",
    location: "Sumbawa Besar, NTB",
    employeeScale: "Medium",
    employeeCount: "50 - 150 Karyawan",
    isVerified: true,
    activeJobsCount: 3,
    totalJobsCount: 12,
    description:
      "Pengembang software dan solusi transformasi digital pemerintahan serta bisnis di NTB.",
    website: "https://techsumbawa.co.id",
  },
  {
    id: "COMP-002",
    name: "CV Agro Samawa Berjaya",
    slug: "COMP-002",
    logo: "/images/karir-logo-1.png",
    industry: "Pertanian & Perkebunan",
    location: "Empang, Sumbawa",
    employeeScale: "Small",
    employeeCount: "10 - 50 Karyawan",
    isVerified: true,
    activeJobsCount: 1,
    totalJobsCount: 5,
    description:
      "Distributor komoditas jagung, beras, dan hasil bumi unggulan Sumbawa.",
    website: "https://agrosamawa.com",
  },
  {
    id: "COMP-003",
    name: "PT Samawa Creative Studio",
    slug: "COMP-003",
    logo: "/images/karir-logo-1.png",
    industry: "Desain & Kreatif",
    location: "Sumbawa Besar, NTB",
    employeeScale: "Micro",
    employeeCount: "1 - 10 Karyawan",
    isVerified: false,
    activeJobsCount: 1,
    totalJobsCount: 3,
    description:
      "Agency kreatif yang bergerak di bidang Branding, UI/UX, dan Digital Marketing.",
    website: "https://samawacreative.id",
  },
  {
    id: "COMP-004",
    name: "PT Mineral Sumbawa Energi",
    slug: "COMP-004",
    logo: "/images/karir-logo-1.png",
    industry: "Pertambangan & Energi",
    location: "Maluk, Sumbawa Barat",
    employeeScale: "Large",
    employeeCount: "500+ Karyawan",
    isVerified: true,
    activeJobsCount: 1,
    totalJobsCount: 28,
    description:
      "Perusahaan eksplorasi pertambangan dan pengelolaan energi berkelanjutan.",
    website: "https://mineralsumbawa.co.id",
  },
  {
    id: "COMP-005",
    name: "BPR NTB Sumbawa (BUMD)",
    slug: "COMP-005",
    logo: "/images/karir-logo-1.png",
    industry: "Keuangan & Perbankan",
    location: "Sumbawa Besar, NTB",
    employeeScale: "Medium",
    employeeCount: "100 - 300 Karyawan",
    isVerified: true,
    activeJobsCount: 1,
    totalJobsCount: 15,
    description:
      "Layanan perbankan daerah pendukung UMKM dan ekonomi masyarakat Sumbawa.",
    website: "https://bprntbsumbawa.co.id",
  },
  {
    id: "COMP-006",
    name: "Nusantara Digital Group",
    slug: "COMP-006",
    logo: "/images/karir-logo-1.png",
    industry: "Teknologi Informasi",
    location: "Remote (Sumbawa)",
    employeeScale: "Medium",
    employeeCount: "50 - 100 Karyawan",
    isVerified: false,
    activeJobsCount: 1,
    totalJobsCount: 8,
    description: "Perusahaan holding media digital dan teknologi rintisan.",
    website: "https://nusantaradigital.com",
  },
  */
];

// Quick Filters URLs Presets
const quickUrlFilters = [
  {
    title: "Semua Perusahaan",
    href: "/perusahaan",
    icon: Building2,
    badge: null,
  },
  {
    title: "Terverifikasi",
    href: "/perusahaan?verifikasi=true",
    icon: ShieldCheck,
    badge: "Official",
  },
  {
    title: "Teknologi & Digital",
    href: "/perusahaan?kategori=teknologi",
    icon: Zap,
    badge: "Hot",
  },
  {
    title: "Perusahaan Besar (500+)",
    href: "/perusahaan?skala=besar",
    icon: Building,
    badge: null,
  },
  {
    title: "Sedang Buka Lowongan",
    href: "/perusahaan?filter=lowongan-aktif",
    icon: Flame,
    badge: "Popular",
  },
];

export default function DaftarPerusahaanPage() {
  const router = useRouter();

  // State Parameter URL menggunakan window.location.search
  const [filterParam, setFilterParam] = useState<string | null>(null);
  const [kategoriParam, setKategoriParam] = useState<string | null>(null);
  const [verifikasiParam, setVerifikasiParam] = useState<string | null>(null);
  const [skalaParam, setSkalaParam] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const filter = params.get("filter");
    const kategori = params.get("kategori");
    const verifikasi = params.get("verifikasi");
    const skala = params.get("skala");

    setFilterParam(filter);
    setKategoriParam(kategori);
    setVerifikasiParam(verifikasi);
    setSkalaParam(skala);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("Terbaru");

  // State Checkbox Filter Sidebar
  const [filters, setFilters] = useState({
    industry: [] as string[],
    scale: [] as string[],
    verifiedOnly: false,
  });

  // Sinkronisasi URL Params ke State Sidebar
  useEffect(() => {
    const newIndustries: string[] = [];
    const newScales: string[] = [];
    let isVerified = false;

    if (kategoriParam === "teknologi") {
      newIndustries.push("Teknologi Informasi");
    }

    if (skalaParam === "besar") {
      newScales.push("Large");
    }

    if (verifikasiParam === "true") {
      isVerified = true;
    }

    setFilters({
      industry: newIndustries,
      scale: newScales,
      verifiedOnly: isVerified,
    });
  }, [kategoriParam, skalaParam, verifikasiParam]);

  const toggleFilterIndustry = (ind: string) => {
    setFilters((prev) => ({
      ...prev,
      industry: prev.industry.includes(ind)
        ? prev.industry.filter((i) => i !== ind)
        : [...prev.industry, ind],
    }));
  };

  const toggleFilterScale = (scale: string) => {
    setFilters((prev) => ({
      ...prev,
      scale: prev.scale.includes(scale)
        ? prev.scale.filter((s) => s !== scale)
        : [...prev.scale, scale],
    }));
  };

  // Logika Filter Perusahaan
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((comp) => {
      // 1. URL Param: verifikasi=true
      if (verifikasiParam === "true" && !comp.isVerified) return false;

      // 2. URL Param: kategori=teknologi
      if (
        kategoriParam === "teknologi" &&
        !comp.industry.toLowerCase().includes("teknologi")
      ) {
        return false;
      }

      // 3. URL Param: skala=besar
      if (skalaParam === "besar" && comp.employeeScale !== "Large")
        return false;

      // 4. URL Param: filter=lowongan-aktif
      if (filterParam === "lowongan-aktif" && comp.activeJobsCount === 0)
        return false;

      // 5. Keyword Name Search
      if (
        searchQuery &&
        !comp.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !comp.industry.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 6. Location Filter Input
      if (
        locationQuery &&
        !comp.location.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }

      // 7. Checkbox Industry Sidebar
      if (
        filters.industry.length > 0 &&
        !filters.industry.includes(comp.industry)
      ) {
        return false;
      }

      // 8. Checkbox Scale Sidebar
      if (
        filters.scale.length > 0 &&
        !filters.scale.includes(comp.employeeScale)
      ) {
        return false;
      }

      // 9. Checkbox Verified Sidebar
      if (filters.verifiedOnly && !comp.isVerified) {
        return false;
      }

      return true;
    });
  }, [
    verifikasiParam,
    kategoriParam,
    skalaParam,
    filterParam,
    searchQuery,
    locationQuery,
    filters,
  ]);

  // Cek Status Keaktifan Quick Presets Link
  const isTabActive = (href: string) => {
    if (href === "/perusahaan") {
      return !filterParam && !kategoriParam && !verifikasiParam && !skalaParam;
    }
    if (href.includes("verifikasi=true")) return verifikasiParam === "true";
    if (href.includes("kategori=teknologi"))
      return kategoriParam === "teknologi";
    if (href.includes("skala=besar")) return skalaParam === "besar";
    if (href.includes("filter=lowongan-aktif"))
      return filterParam === "lowongan-aktif";
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-18 font-[Poppins]">
      {/* HEADER & SEARCH AREA */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-5 lg:px-7 py-8 space-y-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <Breadcrumbs></Breadcrumbs>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Direktori{" "}
              <span className="text-amber-700">Perusahaan & Instansi</span>{" "}
              Sumbawa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Temukan perusahaan terpercaya, pelajari budaya kerja mereka, dan
              lamar posisi yang sesuai dengan keahlian Anda.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-md shadow-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama perusahaan atau bidang industri..."
                className="w-full pl-10 pr-3.5 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
            </div>
            <div className="relative w-full sm:w-52 shrink-0">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Lokasi (cth. Sumbawa Besar)..."
                className="w-full pl-9 pr-3.5 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-sm shadow-amber-700/20 transition-all flex items-center justify-center gap-2 shrink-0">
              <Search className="w-4 h-4" />
              <span>Cari Perusahaan</span>
            </button>
          </div>

          {/* PRESET QUICK URL FILTERS */}
          <div className="overflow-x-auto no-scrollbar pt-1.5 border-t border-slate-100">
            <div className="flex items-center gap-2 min-w-max pb-0.5">
              {quickUrlFilters.map((tab, idx) => {
                const IconComponent = tab.icon;
                const active = isTabActive(tab.href);
                return (
                  <Link
                    key={idx}
                    href={tab.href}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                      active
                        ? "bg-amber-700 text-white shadow-sm shadow-amber-700/15"
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
                            : "bg-amber-100 text-amber-800"
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
      <div className="max-w-7xl mx-auto px-3.5 sm:px-5 lg:px-7 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* SIDEBAR FILTER */}
          <aside className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-700" />
                Filter Perusahaan
              </h2>
              <button
                onClick={() => {
                  setFilters({ industry: [], scale: [], verifiedOnly: false });
                  router.push("/perusahaan");
                }}
                title="Reset Filter"
                aria-label="Reset Filter"
                className="p-1 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* STATUS VERIFIKASI */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Status Perusahaan
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      verifiedOnly: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-600 cursor-pointer"
                />
                <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-amber-600" />
                  Hanya Terverifikasi
                </span>
              </label>
            </div>

            {/* BIDANG INDUSTRI */}
            <div className="space-y-2.5 pt-1.5 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Bidang Industri
              </label>
              {[
                "Teknologi Informasi",
                "Pertanian & Perkebunan",
                "Desain & Kreatif",
                "Pertambangan & Energi",
                "Keuangan & Perbankan",
              ].map((ind) => (
                <label
                  key={ind}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={filters.industry.includes(ind)}
                    onChange={() => toggleFilterIndustry(ind)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors">
                    {ind}
                  </span>
                </label>
              ))}
            </div>

            {/* SKALA KARYAWAN */}
            <div className="space-y-2.5 pt-1.5 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Jumlah Karyawan
              </label>
              {[
                { label: "Mikro (1 - 10)", value: "Micro" },
                { label: "Kecil (10 - 50)", value: "Small" },
                { label: "Menengah (50 - 300)", value: "Medium" },
                { label: "Besar (500+)", value: "Large" },
              ].map((s) => (
                <label
                  key={s.value}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={filters.scale.includes(s.value)}
                    onChange={() => toggleFilterScale(s.value)}
                    className="h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-700 group-hover:text-slate-950 transition-colors">
                    {s.label}
                  </span>
                </label>
              ))}
            </div>

            <button className="w-full py-2.5 px-3 bg-slate-900 hover:bg-black text-white text-[11px] font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] mt-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Terapkan Filter
            </button>
          </aside>

          {/* MAIN COMPANY LIST AREA */}
          <main className="lg:col-span-3 space-y-6">
            {/* TOP STATUS BAR */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Menampilkan{" "}
                  <span className="font-bold text-amber-800">
                    {filteredCompanies.length}
                  </span>{" "}
                  perusahaan terdaftar.
                </p>
                {(verifikasiParam || kategoriParam || skalaParam) && (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md capitalize">
                    Filter Aktif
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
                    className="w-full sm:w-auto appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pr-8 text-[11px] font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Terbaru">Terbaru Bergabung</option>
                    <option value="Lowongan">Lowongan Terbanyak</option>
                    <option value="Nama">Nama (A-Z)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* COMPANY GRID / UI HANDLER KETIKA DATA KOSONG */}
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCompanies.map((comp) => (
                  <div
                    key={comp.id}
                    className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-lg hover:border-amber-100 transition-all duration-300 group relative"
                  >
                    {/* Header: Logo & Title */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-amber-200 transition-colors">
                          <Image
                            src={comp.logo}
                            alt={comp.name}
                            width={44}
                            height={44}
                            className="object-contain"
                          />
                        </div>

                        {comp.isVerified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-extrabold shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-amber-600" />
                            Terverifikasi
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <Link href={`/perusahaan/${comp.slug}`}>
                          <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                            {comp.name}
                          </h3>
                        </Link>
                        <p className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-amber-700" />
                          {comp.industry}
                        </p>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {comp.description}
                      </p>
                    </div>

                    {/* Metadata Badges */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{comp.location}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Users className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{comp.employeeCount}</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800">
                          <Briefcase className="w-3 h-3 text-amber-700" />
                          <span>{comp.activeJobsCount} Lowongan Aktif</span>
                        </div>

                        <Link
                          href={`/perusahaan/${comp.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 transition-colors"
                        >
                          Lihat Profil
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
              <div className="bg-white rounded-2xl border border-slate-100 p-12 sm:p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {mockCompanies.length === 0
                      ? "Belum Ada Perusahaan Terdaftar"
                      : "Perusahaan Tidak Ditemukan"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {mockCompanies.length === 0
                      ? "Saat ini belum ada direktori perusahaan atau instansi yang terdaftar di sistem. Silakan periksa kembali nanti."
                      : "Tidak ada perusahaan atau instansi yang cocok dengan kriteria kata kunci pencarian atau filter URL yang Anda pilih saat ini."}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setLocationQuery("");
                      router.push("/perusahaan");
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    <span>Lihat Semua Perusahaan</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* PAGINATION */}
            {filteredCompanies.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                  disabled
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Sebelumnya
                </button>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                  <button className="w-8 h-8 rounded-md bg-amber-700 text-white shadow-sm shadow-amber-700/10 flex items-center justify-center">
                    1
                  </button>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg shadow-sm transition-all">
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
