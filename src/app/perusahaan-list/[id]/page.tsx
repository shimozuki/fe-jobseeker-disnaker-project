/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Users,
  Share2,
  Search,
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
  Sparkles,
  Zap,
  Laptop,
  Flame,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  History,
  Image as ImageIcon,
} from "lucide-react";

// Tipe Data Perusahaan
interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  isVerified: boolean;
  industry: string;
  employeeCount: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  gallery: string[];
}

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
  publishedDate: string;
  deadline: string;
  isFeatured?: boolean;
  isBumn?: boolean;
  status: "active" | "expired"; // Penanda Lowongan Aktif / Riwayat
}

// Mock Data Perusahaan
const mockCompany: CompanyProfile = {
  id: "COMP-001",
  name: "PT Technology Innovation Sumbawa",
  logo: "/images/karir-logo-1.png",
  coverImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
  isVerified: true,
  industry: "Teknologi Informasi & Pengkodingan",
  employeeCount: "50 - 150 Karyawan",
  location: "Jl. Lintas Sumbawa - Bima Km 4, Sumbawa Besar, NTB",
  website: "https://techsumbawa.co.id",
  email: "karir@techsumbawa.co.id",
  phone: "+62 812-3456-7890",
  description:
    "PT Technology Innovation Sumbawa adalah perusahaan pelopor penyedia solusi digital dan pengembangan perangkat lunak terdepan di wilayah Nusa Tenggara Barat. Kami berfokus pada transformasi digital untuk instansi publik, sistem perpajakan daerah, serta aplikasi perusahaan skala nasional.",
  gallery: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
  ],
};

// Mock Data Lowongan Perusahaan Ini
const mockCompanyJobs: JobVacancy[] = [
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
    status: "active",
  },
  {
    id: "JOB-003",
    title: "UI/UX Designer Specialist",
    companyName: "PT Technology Innovation Sumbawa",
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
    status: "active",
  },
  {
    id: "JOB-008",
    title: "Internship Social Media Officer",
    companyName: "PT Technology Innovation Sumbawa",
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
    status: "active",
  },
  // Lowongan Kadaluarsa / Pernah Dipublikasikan
  {
    id: "JOB-OLD-01",
    title: "Backend Engineer (Golang / Node.js)",
    companyName: "PT Technology Innovation Sumbawa",
    companyLogo: "/images/karir-logo-1.png",
    location: "Sumbawa Besar, NTB",
    category: "Teknologi Informasi",
    type: "Full-time",
    workSystem: "WFO",
    education: "S1 Teknik Informatika",
    experience: "2+ Tahun",
    salaryRange: "Rp 7.000.000 - Rp 10.000.000",
    salaryDisplay: true,
    publishedDate: "2026-05-10",
    deadline: "2026-06-15",
    status: "expired",
  },
  {
    id: "JOB-OLD-02",
    title: "DevOps & Cloud Engineer Specialist",
    companyName: "PT Technology Innovation Sumbawa",
    companyLogo: "/images/karir-logo-1.png",
    location: "Sumbawa Besar, NTB",
    category: "Teknologi Informasi",
    type: "Full-time",
    workSystem: "Hybrid",
    education: "S1 Teknik Informatika",
    experience: "3+ Tahun",
    salaryRange: "Rp 9.000.000 - Rp 14.000.000",
    salaryDisplay: true,
    publishedDate: "2026-03-01",
    deadline: "2026-04-01",
    status: "expired",
  },
];

// Opsi Preset URL Quick Filters
const quickUrlFilters = [
  {
    title: "Semua Lowongan",
    desc: "Seluruh lowongan dari perusahaan ini",
    href: "/perusahaan/COMP-001",
    icon: Search,
    badge: null,
  },
  {
    title: "Lowongan Terbaru",
    desc: "Lowongan aktif publikasi terbaru",
    href: "/perusahaan/COMP-001?filter=terbaru",
    icon: Flame,
    badge: "Hot",
  },
  {
    title: "Full-Time",
    desc: "Karir permanen & jangka panjang",
    href: "/perusahaan/COMP-001?tipe=full-time",
    icon: Clock,
    badge: null,
  },
  {
    title: "Remote / WFH",
    desc: "Kerja fleksibel jarak jauh",
    href: "/perusahaan/COMP-001?tipe=remote",
    icon: Laptop,
    badge: "Populer",
  },
  {
    title: "Magang & Fresh Grad",
    desc: "Program internship & lulusan baru",
    href: "/perusahaan/COMP-001?kategori=magang",
    icon: GraduationCap,
    badge: null,
  },
];

export default function ProfilPerusahaanPublikPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab Utama (Lowongan Aktif vs Riwayat Lowongan)
  const [activeTab, setActiveTab] = useState<"active" | "expired">("active");

  // State Modal Bagikan Profil
  const [copiedShare, setCopiedShare] = useState(false);

  // Ambil Parameter URL
  const filterParam = searchParams.get("filter");
  const tipeParam = searchParams.get("tipe");
  const kategoriParam = searchParams.get("kategori");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Terbaru");

  // State Filter Checkbox Sidebar
  const [filters, setFilters] = useState({
    type: [] as string[],
    workSystem: [] as string[],
  });

  // Auto-sync Query Params ke State Checkbox Filter
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

  // Logika Filter Data Lowongan
  const filteredJobs = useMemo(() => {
    return mockCompanyJobs.filter((job) => {
      // 1. Filter Status Utama (Aktif vs Kadaluarsa)
      if (job.status !== activeTab) return false;

      // 2. Query Param filter=terbaru
      if (filterParam === "terbaru") {
        if (job.publishedDate !== "2026-09-23") return false;
      }

      // 3. Query Param tipe=full-time | remote
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

      // 4. Query Param kategori=magang
      if (kategoriParam === "magang") {
        if (
          job.type !== "Internship" &&
          !job.experience.toLowerCase().includes("fresh")
        ) {
          return false;
        }
      }

      // 5. Keyword Search Input
      if (
        searchQuery &&
        !job.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 6. Sidebar Checkbox Type
      if (filters.type.length > 0 && !filters.type.includes(job.type)) {
        return false;
      }

      // 7. Sidebar Checkbox Work System
      if (
        filters.workSystem.length > 0 &&
        !filters.workSystem.includes(job.workSystem)
      ) {
        return false;
      }

      return true;
    });
  }, [activeTab, filterParam, tipeParam, kategoriParam, searchQuery, filters]);

  // Cek Status Keaktifan Preset Link Tab
  const isTabActive = (href: string) => {
    if (href === "/perusahaan/COMP-001") {
      return !filterParam && !tipeParam && !kategoriParam;
    }
    if (href.includes("filter=terbaru")) return filterParam === "terbaru";
    if (href.includes("tipe=full-time")) return tipeParam === "full-time";
    if (href.includes("tipe=remote")) return tipeParam === "remote";
    if (href.includes("kategori=magang")) return kategoriParam === "magang";
    return false;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const activeJobCount = mockCompanyJobs.filter(
    (j) => j.status === "active",
  ).length;
  const expiredJobCount = mockCompanyJobs.filter(
    (j) => j.status === "expired",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-16 font-[Poppins]">
      {/* SECTION 1: HEADER BANNER & COMPANY HERO */}
      <div className="bg-white border-b border-slate-200/80 shadow-sm">
        {/* Cover Image Header */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-800 overflow-hidden">
          <Image
            src={mockCompany.coverImage}
            alt="Company Cover"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        </div>

        {/* Company Identity Info Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-15 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Logo Perusahaan */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-3 border-4 border-white shadow-xl shadow-slate-200/50 shrink-0 relative overflow-hidden">
                <Image
                  src={mockCompany.logo}
                  alt={mockCompany.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Title & Badges */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {mockCompany.name}
                  </h1>
                  {mockCompany.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 fill-teal-100" />
                      Terverifikasi
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Building2 className="w-4 h-4 text-app-navy-700" />
                    {mockCompany.industry}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    {mockCompany.employeeCount}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {mockCompany.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Share Profile Button */}
            <div className="w-full sm:w-auto flex items-center gap-3">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Share2 className="w-4 h-4 text-app-navy-700" />
                <span>{copiedShare ? "Link Tersalin!" : "Bagikan Profil"}</span>
              </button>
            </div>
          </div>

          {/* Quick Contact & Links Row */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <a
              href={mockCompany.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 hover:bg-app-navy-50/50 border border-slate-100 hover:border-app-navy-200 text-slate-700 hover:text-app-navy-800 transition-all group"
            >
              <Globe className="w-4 h-4 text-app-navy-700 shrink-0" />
              <span className="truncate font-semibold">
                {mockCompany.website}
              </span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-app-navy-700" />
            </a>
            <a
              href={`mailto:${mockCompany.email}`}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 hover:bg-app-navy-50/50 border border-slate-100 hover:border-app-navy-200 text-slate-700 hover:text-app-navy-800 transition-all"
            >
              <Mail className="w-4 h-4 text-app-navy-700 shrink-0" />
              <span className="truncate font-semibold">
                {mockCompany.email}
              </span>
            </a>
            <a
              href={`tel:${mockCompany.phone}`}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 hover:bg-app-navy-50/50 border border-slate-100 hover:border-app-navy-200 text-slate-700 hover:text-app-navy-800 transition-all"
            >
              <Phone className="w-4 h-4 text-app-navy-700 shrink-0" />
              <span className="truncate font-semibold">
                {mockCompany.phone}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2: COMPANY OVERVIEW & GALLERY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deskripsi Perusahaan */}
          <div className="lg:col-span-2 bg-white p-7 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-app-navy-700" />
              Tentang Perusahaan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {mockCompany.description}
            </p>
          </div>

          {/* Galeri Perusahaan */}
          <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
              <ImageIcon className="w-5 h-5 text-app-navy-700" />
              Galeri Perusahaan
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {mockCompany.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative h-20 rounded-2xl overflow-hidden border border-slate-100 group cursor-pointer"
                >
                  <Image
                    src={imgUrl}
                    alt={`Galeri ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: LOWONGAN PERUSAHAAN (FILTERS & VACANCIES LIST) */}
        <div className="space-y-6 pt-6 border-t border-slate-200/80">
          {/* TAB HEADER: LOWONGAN AKTIF VS RIWAYAT */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "active"
                    ? "bg-white text-app-navy-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Briefcase className="w-4 h-4 text-app-navy-700" />
                Lowongan Aktif ({activeJobCount})
              </button>
              <button
                onClick={() => setActiveTab("expired")}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "expired"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <History className="w-4 h-4 text-slate-400" />
                Pernah Dipublikasikan ({expiredJobCount})
              </button>
            </div>

            {/* PRESET QUICK URL FILTERS LINK */}
            <div className="overflow-x-auto no-scrollbar w-full sm:w-auto">
              <div className="flex items-center gap-2 min-w-max">
                {quickUrlFilters.map((tab, idx) => {
                  const IconComponent = tab.icon;
                  const active = isTabActive(tab.href);
                  return (
                    <Link
                      key={idx}
                      href={tab.href}
                      className={`px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center gap-2 shrink-0 ${
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
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MAIN FILTER & LIST CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* SIDEBAR FILTER */}
            <aside className="lg:col-span-1 bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-7 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <Filter className="w-5 h-5 text-app-navy-700" />
                  Filter Lowongan
                </h2>
                <button
                  onClick={() => {
                    setFilters({ type: [], workSystem: [] });
                    router.push("/perusahaan/COMP-001");
                  }}
                  className="text-[11px] font-semibold text-app-navy-700 hover:text-app-navy-800 hover:underline"
                >
                  Reset Filter
                </button>
              </div>

              {/* SEARCH INPUT */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Kata Kunci
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari posisi..."
                    className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* JENIS PEKERJAAN */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Jenis Pekerjaan
                </label>
                {["Full-time", "Part-time", "Contract", "Internship"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleFilterType(type)}
                        className="h-4.5 w-4.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                      />
                      <span className="text-xs text-slate-700 group-hover:text-slate-950 transition-colors">
                        {type}
                      </span>
                    </label>
                  ),
                )}
              </div>

              {/* SISTEM KERJA */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Sistem Kerja
                </label>
                {["WFO", "WFH", "Hybrid"].map((system) => (
                  <label
                    key={system}
                    className="flex items-center gap-3 cursor-pointer select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.workSystem.includes(system)}
                      onChange={() => toggleFilterWorkSystem(system)}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-700 group-hover:text-slate-950 transition-colors">
                      {system}
                    </span>
                  </label>
                ))}
              </div>
            </aside>

            {/* MAIN VACANCY CARDS LIST */}
            <main className="lg:col-span-3 space-y-6">
              {/* STATUS BAR & SORTING */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-slate-500">
                  Menampilkan{" "}
                  <span className="font-bold text-app-navy-800">
                    {filteredJobs.length}
                  </span>{" "}
                  lowongan {activeTab === "active" ? "aktif" : "kadaluarsa"}.
                </p>

                <div className="flex items-center gap-2.5 justify-end">
                  <span className="text-xs font-semibold text-slate-500">
                    Urutkan:
                  </span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Terbaru">Terbaru Diunggah</option>
                      <option value="Relevan">Paling Relevan</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* LIST LOWONGAN */}
              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`bg-white rounded-3xl border border-slate-100 p-6 flex flex-col gap-5 shadow-sm hover:shadow-lg transition-all duration-300 relative group ${
                        job.status === "expired"
                          ? "opacity-75 bg-slate-50/50"
                          : ""
                      }`}
                    >
                      {/* Featured Badge */}
                      {job.isFeatured && job.status === "active" && (
                        <div className="absolute top-0 right-16 translate-y-[-50%] bg-amber-400 text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}

                      {/* Bookmark / Status Badge */}
                      {job.status === "active" ? (
                        <button className="absolute top-5 right-5 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors border border-slate-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                          Ditutup
                        </span>
                      )}

                      {/* Header Card */}
                      <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                          <Image
                            src={job.companyLogo}
                            alt={job.companyName}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div className="space-y-1 flex-1 pr-8">
                          <Link
                            href={`/lowongan-kerja/${job.id}`}
                            className="block"
                          >
                            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-app-navy-700 transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </p>
                        </div>
                      </div>

                      {/* Meta Tags & Salary */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-app-navy-50 text-app-navy-700 text-[10px] font-bold border border-app-navy-100">
                            <Briefcase className="w-3 h-3" />
                            {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200/80">
                            <Zap className="w-3 h-3 text-amber-500" />
                            {job.workSystem}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/80">
                            <GraduationCap className="w-3 h-3" />
                            {job.education}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <p className="text-xs font-extrabold text-slate-900">
                              {job.salaryRange}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            / bulan
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-[10px] text-slate-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.publishedDate}
                          </span>
                        </div>
                        <Link
                          href={`/lowongan-kerja/${job.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-app-navy-700 hover:text-app-navy-800 transition-colors"
                        >
                          Detail
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* EMPTY STATE */
                <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Tidak Ada Lowongan Ditemukan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tidak ada lowongan{" "}
                      {activeTab === "active" ? "aktif" : "kadaluarsa"} yang
                      sesuai dengan kriteria filter yang Anda pilih.
                    </p>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
