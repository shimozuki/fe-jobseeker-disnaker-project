"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Users,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  MoreVertical,
  X,
  FileCheck2,
  RotateCcw,
} from "lucide-react";

// Types
interface JobItem {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Kontrak" | "Magang";
  postedDate: string;
  deadline: string;
  applicantCount: number;
  status: "Menunggu Verifikasi" | "Aktif" | "Ditolak" | "Ditutup";
  recruitmentStage: "Pendaftaran" | "Seleksi Berkas" | "Wawancara" | "Selesai";
}

// Dummy Data Lowongan (Dikomentari sesuai permintaan)
const MOCK_JOBS: JobItem[] = [
  /*
  {
    id: "JOB-001",
    title: "Frontend Web Developer",
    company: "PT Samawa Digital",
    category: "Teknologi Informasi",
    location: "Sumbawa Besar",
    type: "Full-Time",
    postedDate: "2026-09-25",
    deadline: "2026-10-15",
    applicantCount: 24,
    status: "Aktif",
    recruitmentStage: "Pendaftaran",
  },
  {
    id: "JOB-002",
    title: "Staff Akuntansi & Keuangan",
    company: "CV Sumbawa Makmur",
    category: "Keuangan",
    location: "Badas",
    type: "Full-Time",
    postedDate: "2026-09-26",
    deadline: "2026-10-10",
    applicantCount: 12,
    status: "Menunggu Verifikasi",
    recruitmentStage: "Pendaftaran",
  },
  {
    id: "JOB-003",
    title: "Operator Alat Berat",
    company: "PT Tambang West Nusa",
    category: "Pertambangan",
    location: "Maluk",
    type: "Kontrak",
    postedDate: "2026-09-20",
    deadline: "2026-10-05",
    applicantCount: 58,
    status: "Aktif",
    recruitmentStage: "Seleksi Berkas",
  },
  {
    id: "JOB-004",
    title: "HRD & Legal Specialist",
    company: "PT Samawa Digital",
    category: "HR & Legal",
    location: "Sumbawa Besar",
    type: "Full-Time",
    postedDate: "2026-09-18",
    deadline: "2026-09-30",
    applicantCount: 19,
    status: "Aktif",
    recruitmentStage: "Wawancara",
  },
  {
    id: "JOB-005",
    title: "Marketing & Communication Officer",
    company: "CV Lombok Agro",
    category: "Pemasaran",
    location: "Alas",
    type: "Part-Time",
    postedDate: "2026-09-10",
    deadline: "2026-09-24",
    applicantCount: 8,
    status: "Ditutup",
    recruitmentStage: "Selesai",
  },
  {
    id: "JOB-006",
    title: "Teknisi Listrik & Mesin",
    company: "PT Tambang West Nusa",
    category: "Teknik",
    location: "Maluk",
    type: "Kontrak",
    postedDate: "2026-09-22",
    deadline: "2026-10-12",
    applicantCount: 0,
    status: "Ditolak",
    recruitmentStage: "Pendaftaran",
  },
  */
];

export default function AllJobsPage() {
  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedCompany, setSelectedCompany] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedLocation, setSelectedLocation] = useState("Semua");
  const [selectedType, setSelectedType] = useState("Semua");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Options Unik untuk Dropdown Filter
  const companyOptions = useMemo(
    () => Array.from(new Set(MOCK_JOBS.map((item) => item.company))),
    [],
  );
  const categoryOptions = useMemo(
    () => Array.from(new Set(MOCK_JOBS.map((item) => item.category))),
    [],
  );
  const locationOptions = useMemo(
    () => Array.from(new Set(MOCK_JOBS.map((item) => item.location))),
    [],
  );

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === "Semua" || job.status === selectedStatus;
      const matchCompany =
        selectedCompany === "Semua" || job.company === selectedCompany;
      const matchCategory =
        selectedCategory === "Semua" || job.category === selectedCategory;
      const matchLocation =
        selectedLocation === "Semua" || job.location === selectedLocation;
      const matchType = selectedType === "Semua" || job.type === selectedType;

      let matchDate = true;
      if (startDate) {
        matchDate =
          matchDate && new Date(job.postedDate) >= new Date(startDate);
      }
      if (endDate) {
        matchDate = matchDate && new Date(job.postedDate) <= new Date(endDate);
      }

      return (
        matchSearch &&
        matchStatus &&
        matchCompany &&
        matchCategory &&
        matchLocation &&
        matchType &&
        matchDate
      );
    });
  }, [
    searchQuery,
    selectedStatus,
    selectedCompany,
    selectedCategory,
    selectedLocation,
    selectedType,
    startDate,
    endDate,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("Semua");
    setSelectedCompany("Semua");
    setSelectedCategory("Semua");
    setSelectedLocation("Semua");
    setSelectedType("Semua");
    setStartDate("");
    setEndDate("");
  };

  const getStatusBadge = (status: JobItem["status"]) => {
    switch (status) {
      case "Aktif":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Aktif
          </span>
        );
      case "Menunggu Verifikasi":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Perlu Verifikasi
          </span>
        );
      case "Ditolak":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" />
            Ditolak
          </span>
        );
      case "Ditutup":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Ditutup
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Semua Lowongan Kerja
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar lengkap seluruh lowongan pekerjaan terdaftar di wilayah
            Disnakertrans.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          Total:{" "}
          <span className="font-bold text-slate-900">
            {filteredJobs.length}
          </span>{" "}
          Lowongan
        </div>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-600" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Filter Data Lowongan
            </h2>
          </div>
          <button
            onClick={resetFilters}
            className="text-[0.7rem] font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Reset Filter
          </button>
        </div>

        {/* SEARCH & PRIMARY FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lowongan, perusahaan..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Ditutup">Ditutup</option>
            </select>
          </div>

          {/* Filter Perusahaan */}
          <div>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Semua">Semua Perusahaan</option>
              {companyOptions.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Kategori Pekerjaan */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Semua">Semua Kategori</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECONDARY FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Filter Lokasi */}
          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Semua">Semua Lokasi</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Jenis Pekerjaan */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Semua">Semua Jenis Kerja</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Kontrak">Kontrak</option>
              <option value="Magang">Magang</option>
            </select>
          </div>

          {/* Filter Tanggal Mulai */}
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-medium text-slate-400 shrink-0">
              Dari:
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Filter Tanggal Sampai */}
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-medium text-slate-400 shrink-0">
              Sampai:
            </span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* TABLE DATA LOWONGAN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Lowongan & Perusahaan</th>
                <th className="py-3.5 px-4">Kategori & Lokasi</th>
                <th className="py-3.5 px-4">Tanggal Tayang</th>
                <th className="py-3.5 px-4 text-center">Jumlah Pelamar</th>
                <th className="py-3.5 px-4">Status Rekrutmen</th>
                <th className="py-3.5 px-4">Status Verifikasi</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Lowongan & Perusahaan */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <Link
                          href={`/dashboard/admin/lowongan/${job.id}`}
                          className="font-semibold text-slate-900 hover:text-teal-600 transition-colors block"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-1.5 text-[0.65rem] text-slate-500">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <Link
                            href={`/dashboard/admin/perusahaan/${encodeURIComponent(
                              job.company,
                            )}`}
                            className="hover:underline"
                          >
                            {job.company}
                          </Link>
                          <span className="text-slate-300">•</span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Kategori & Lokasi */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="font-medium text-slate-800 block">
                          {job.category}
                        </span>
                        <div className="flex items-center gap-1 text-[0.65rem] text-slate-400">
                          <MapPin className="w-3 h-3" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </td>

                    {/* Tanggal Tayang & Deadline */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5 text-[0.65rem]">
                        <p className="text-slate-700 font-medium">
                          {job.postedDate}
                        </p>
                        <p className="text-slate-400">s/d {job.deadline}</p>
                      </div>
                    </td>

                    {/* Jumlah Pelamar */}
                    <td className="py-3 px-4 text-center">
                      <Link
                        href={`/dashboard/admin/lowongan/${job.id}/pelamar`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 font-bold text-slate-800 text-xs transition-colors"
                      >
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.applicantCount}</span>
                      </Link>
                    </td>

                    {/* Status Rekrutmen */}
                    <td className="py-3 px-4">
                      <span className="text-[0.65rem] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {job.recruitmentStage}
                      </span>
                    </td>

                    {/* Status Verifikasi */}
                    <td className="py-3 px-4">{getStatusBadge(job.status)}</td>

                    {/* Aksi */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Detail Lowongan */}
                        <Link
                          href={`/dashboard/admin/lowongan/${job.id}`}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Lihat Detail Lowongan"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Lihat Perusahaan */}
                        <Link
                          href={`/dashboard/admin/perusahaan/${encodeURIComponent(
                            job.company,
                          )}`}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Lihat Perusahaan"
                        >
                          <Building2 className="w-4 h-4" />
                        </Link>

                        {/* Lihat Pelamar */}
                        <Link
                          href={`/dashboard/admin/lowongan/${job.id}/pelamar`}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Lihat Pelamar"
                        >
                          <Users className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* EMPTY STATE / UI HANDLER KETIKA DATA KOSONG */
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-slate-800">
                          {MOCK_JOBS.length === 0
                            ? "Belum Ada Data Lowongan"
                            : "Lowongan Tidak Ditemukan"}
                        </h3>
                        <p className="text-[0.7rem] text-slate-500 leading-relaxed">
                          {MOCK_JOBS.length === 0
                            ? "Saat ini belum ada lowongan pekerjaan yang terdaftar di dalam sistem administratif."
                            : "Tidak ada lowongan pekerjaan yang sesuai dengan kriteria filter atau pencarian Anda."}
                        </p>
                      </div>
                      {(searchQuery ||
                        selectedStatus !== "Semua" ||
                        selectedCompany !== "Semua" ||
                        selectedCategory !== "Semua" ||
                        selectedLocation !== "Semua" ||
                        selectedType !== "Semua" ||
                        startDate ||
                        endDate) && (
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

        {/* FOOTER TABLE / PAGINATION */}
        <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredJobs.length} data</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
              Prev
            </button>
            <button className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-medium">
              1
            </button>
            <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
