"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  Filter,
  MapPin,
  Briefcase,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Building,
  Eye,
  RotateCcw,
} from "lucide-react";

// Interface Data Perusahaan
interface Company {
  id: string;
  name: string;
  nib: string;
  industry: string;
  location: string;
  address: string;
  verificationStatus: "Terverifikasi" | "Menunggu" | "Ditolak";
  activeJobsCount: number;
  totalJobsCount: number;
  joinedDate: string;
  logoUrl?: string;
}

// Mock Data Perusahaan (Dikomentari sesuai permintaan)
const MOCK_COMPANIES: Company[] = [
  /*
  {
    id: "COMP-001",
    name: "PT Samawa Digital",
    nib: "9120102930129",
    industry: "Teknologi Informasi",
    location: "Sumbawa Besar",
    address: "Jl. Diponegoro No. 12, Sumbawa Besar",
    verificationStatus: "Terverifikasi",
    activeJobsCount: 3,
    totalJobsCount: 12,
    joinedDate: "2025-01-15",
  },
  {
    id: "COMP-002",
    name: "CV Sumbawa Makmur",
    nib: "8120392019238",
    industry: "Keuangan & Akuntansi",
    location: "Badas",
    address: "Kawasan Pelabuhan Badas No. 8, Sumbawa",
    verificationStatus: "Terverifikasi",
    activeJobsCount: 1,
    totalJobsCount: 5,
    joinedDate: "2025-03-20",
  },
  {
    id: "COMP-003",
    name: "PT Tambang West Nusa",
    nib: "7192039102938",
    industry: "Pertambangan & Energi",
    location: "Sekongkang",
    address: "Jl. Raya Lintas Benete, Sekongkang",
    verificationStatus: "Terverifikasi",
    activeJobsCount: 8,
    totalJobsCount: 24,
    joinedDate: "2024-11-10",
  },
  {
    id: "COMP-004",
    name: "CV Berkah Teknik",
    nib: "6102938475610",
    industry: "Konstruksi & Teknik",
    location: "Sumbawa Besar",
    address: "Jl. Kebon Kopi No. 45, Sumbawa Besar",
    verificationStatus: "Menunggu",
    activeJobsCount: 0,
    totalJobsCount: 2,
    joinedDate: "2026-09-20",
  },
  {
    id: "COMP-005",
    name: "PT Agro Sumbawa Sejahtera",
    nib: "5102938471102",
    industry: "Pertanian & Perkebunan",
    location: "Plampang",
    address: "Jl. Poros Plampang-Empang Km. 4",
    verificationStatus: "Ditolak",
    activeJobsCount: 0,
    totalJobsCount: 1,
    joinedDate: "2026-08-14",
  },
  */
];

// Opsi Filter
const INDUSTRIES = [
  "Semua Industri",
  "Teknologi Informasi",
  "Keuangan & Akuntansi",
  "Pertambangan & Energi",
  "Konstruksi & Teknik",
  "Pertanian & Perkebunan",
];

const LOCATIONS = [
  "Semua Lokasi",
  "Sumbawa Besar",
  "Badas",
  "Sekongkang",
  "Plampang",
  "Alas",
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [selectedIndustry, setSelectedIndustry] =
    useState<string>("Semua Industri");
  const [selectedLocation, setSelectedLocation] =
    useState<string>("Semua Lokasi");

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("Semua");
    setSelectedIndustry("Semua Industri");
    setSelectedLocation("Semua Lokasi");
  };

  // Filtering Logic
  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.nib.includes(searchQuery) ||
        company.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "Semua" ||
        company.verificationStatus === selectedStatus;

      const matchesIndustry =
        selectedIndustry === "Semua Industri" ||
        company.industry === selectedIndustry;

      const matchesLocation =
        selectedLocation === "Semua Lokasi" ||
        company.location === selectedLocation;

      return (
        matchesSearch && matchesStatus && matchesIndustry && matchesLocation
      );
    });
  }, [searchQuery, selectedStatus, selectedIndustry, selectedLocation]);

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-600" />
            Daftar Perusahaan Terdaftar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data mitra perusahaan, status verifikasi NIB, dan riwayat
            publikasi lowongan kerja.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
          Total Perusahaan:{" "}
          <strong className="text-slate-900">{filteredCompanies.length}</strong>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="md:col-span-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, NIB, atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-500 transition-all"
            >
              <option value="Semua">Semua Status Verifikasi</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Menunggu">Menunggu Verifikasi</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          {/* Filter Industri */}
          <div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-500 transition-all"
            >
              {INDUSTRIES.map((ind, idx) => (
                <option key={idx} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Lokasi */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-500 transition-all"
            >
              {LOCATIONS.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE / LIST PERUSAHAAN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Perusahaan & NIB</th>
                <th className="py-3.5 px-4">Industri & Lokasi</th>
                <th className="py-3.5 px-4">Status Verifikasi</th>
                <th className="py-3.5 px-4 text-center">Jumlah Lowongan</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Perusahaan & NIB */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/admin/perusahaan/${company.id}`}
                            className="font-bold text-slate-900 hover:text-teal-600 transition-colors block"
                          >
                            {company.name}
                          </Link>
                          <span className="text-[0.65rem] text-slate-400 font-mono">
                            NIB: {company.nib}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Industri & Lokasi */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">
                        {company.industry}
                      </p>
                      <p className="text-[0.65rem] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {company.location}
                      </p>
                    </td>

                    {/* Status Verifikasi */}
                    <td className="py-3.5 px-4">
                      {company.verificationStatus === "Terverifikasi" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Terverifikasi
                        </span>
                      )}
                      {company.verificationStatus === "Menunggu" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Menunggu
                        </span>
                      )}
                      {company.verificationStatus === "Ditolak" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3 h-3" /> Ditolak
                        </span>
                      )}
                    </td>

                    {/* Jumlah Lowongan */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center justify-center">
                        <div className="inline-flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200/60 text-xs font-semibold">
                          <span className="px-2 py-0.5 rounded-md bg-white text-emerald-600 shadow-2xs font-bold border border-slate-100">
                            {company.activeJobsCount} Aktif
                          </span>
                          <span className="px-2 text-slate-400 text-[0.65rem] font-medium">
                            / {company.totalJobsCount} Total
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/perusahaan/${company.id}/lowongan`}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg text-[0.7rem] font-semibold flex items-center gap-1 transition-colors"
                          title="Lihat Semua Lowongan Perusahaan Ini"
                        >
                          <Briefcase className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/dashboard/admin/perusahaan/${company.id}`}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Lihat Detail Lowongan"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                        <Building className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-slate-800">
                          {MOCK_COMPANIES.length === 0
                            ? "Belum Ada Data Perusahaan"
                            : "Perusahaan Tidak Ditemukan"}
                        </h3>
                        <p className="text-[0.7rem] text-slate-500 leading-relaxed">
                          {MOCK_COMPANIES.length === 0
                            ? "Saat ini belum ada data perusahaan atau instansi mitra yang terdaftar di dalam sistem."
                            : "Tidak ada perusahaan atau instansi yang sesuai dengan kriteria filter atau pencarian Anda."}
                        </p>
                      </div>
                      {(searchQuery ||
                        selectedStatus !== "Semua" ||
                        selectedIndustry !== "Semua Industri" ||
                        selectedLocation !== "Semua Lokasi") && (
                        <button
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[0.7rem] font-bold rounded-lg transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset Filter</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
