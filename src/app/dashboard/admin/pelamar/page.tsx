"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  ChevronDown,
  MoreVertical,
  Eye,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Trash2,
  X,
  CheckSquare,
  FileText,
  UserCheck,
  UserX,
  ShieldAlert,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAdminJobSeeker } from "@/features/dashboard-admin/hooks/useAdminJobSeeker.hook";
import { AdminJobSeekerIndexFilter } from "@/features/dashboard-admin/types/AdminJobSeeker.type";
import { useOptions } from "@/shared/hooks/useOptions.hook";
import { Districts } from "@/shared/types/districtsList.type";
import { formatDateWithMonthName } from "@/shared/utils/formatDate.util";

export default function AdminPelamarPage() {
  const router = useRouter();

  // Ambil data pelamar, pagination dari backend, serta fungsi setFilters
  const { adminJobSeeker, adminJobSeekerPagination, filters, setFilters } =
    useAdminJobSeeker();

  const { districtOptions } = useOptions();

  // State UI lokal
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status Akun");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Multiple Selection State
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // State Dropdown Aksi
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  // Handler Apply Filter (Langsung memperbarui state filters di hook agar memicu fetch BE)
  const handleApplyFilter = (
    newFilterUpdates: Partial<AdminJobSeekerIndexFilter>,
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilterUpdates,
      page: 1, // Reset halaman ke 1 saat filter berubah
    }));
  };

  // Nilai Pagination yang diambil langsung dari Backend (dengan fallback value)
  const currentPage = adminJobSeekerPagination?.page ?? filters.page;
  const totalPages = adminJobSeekerPagination?.total_pages ?? 1;
  const totalItems = adminJobSeekerPagination?.total ?? adminJobSeeker.length;
  const currentLimit = adminJobSeekerPagination?.limit ?? filters.limit;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * currentLimit + 1;
  const endItem = Math.min(currentPage * currentLimit, totalItems);
  const paginatedApplicants = adminJobSeeker;

  // Handle Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allCurrentIds = paginatedApplicants.map((item) => item.profile_id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...allCurrentIds])));
    } else {
      const currentIds = paginatedApplicants.map((item) => item.profile_id);
      setSelectedIds(selectedIds.filter((id) => !currentIds.includes(id)));
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllPaginatedSelected =
    paginatedApplicants.length > 0 &&
    paginatedApplicants.every((item) => selectedIds.includes(item.profile_id));

  // Batch Action Handlers Placeholder
  const handleBulkDeactivate = () => {
    setSelectedIds([]);
  };

  const handleBulkActivate = () => {
    setSelectedIds([]);
  };

  const handleAction = (id: number, actionName: string) => {
    setActiveDropdownId(null);
  };

  // Helper Badge Status Akun
  const getAccountStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "aktif":
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "nonaktif":
      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200/60";
      case "ditangguhkan":
      case "suspended":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200/60";
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-xs relative pb-12">
      <div className="mx-auto space-y-4">
        {/* Page Title & Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" /> Database Seluruh
              Pelamar
            </h1>
            <p className="text-[0.7rem] md:text-xs text-slate-500 mt-0.5">
              Kelola data pencari kerja terdaftar, pantau rekam jejak lamaran,
              serta status akun pelamar di sistem.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                router.push("pelamar/export");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export
            </button>
          </div>
        </div>

        {/* Ringkasan Statistik untuk Admin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Total Pelamar
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {totalItems} Orang
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Total Akumulasi Lamaran
              </p>
              <h3 className="text-lg font-bold text-teal-600 mt-0.5">
                0 Berkas
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Pelamar Aktif Melamar
              </p>
              <h3 className="text-lg font-bold text-amber-600 mt-0.5">
                0 Orang
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Akun Terverifikasi/Aktif
              </p>
              <h3 className="text-lg font-bold text-emerald-600 mt-0.5">
                {
                  adminJobSeeker.filter((a) => a.account_status === "active")
                    .length
                }{" "}
                Akun
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, NIK, atau email pelamar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleApplyFilter({ search: e.target.value });
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            {/* Filter Status Akun */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  handleApplyFilter({ account_status: e.target.value });
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700 transition-all"
              >
                <option value={""}>Semua Status Akun</option>
                <option value="active">Aktif</option>
                <option value="non_active">Nonaktif</option>
              </select>
            </div>

            {/* Toggle Advanced Filter Button */}
            <div>
              <button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  showAdvancedFilter
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter Lanjutan</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showAdvancedFilter ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-slate-100 pt-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tingkat Pendidikan
                    </label>
                    <select
                      value={filters.education_level}
                      onChange={(e) =>
                        handleApplyFilter({ education_level: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option value="">Semua Pendidikan</option>
                      <option value="SMA/SMK">SMA/SMK</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Pengalaman Kerja
                    </label>
                    <select
                      value={filters.experience}
                      onChange={(e) =>
                        handleApplyFilter({ experience: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option value="">Semua Pengalaman</option>
                      <option value="fresh_graduate">Fresh Graduate</option>
                      <option value="under_1_year">{"< 1 Tahun"}</option>
                      <option value="1_2_years">1 - 2 Tahun</option>
                      <option value="3_5_years">3 - 5 Tahun</option>
                      <option value="over_5_years">{"> 5 Tahun"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Kode Kecamatan
                    </label>
                    <select
                      value={filters.district_code}
                      onChange={(e) =>
                        handleApplyFilter({ district_code: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option value="">Semua Kecamatan</option>
                      {districtOptions.map((d: Districts) => (
                        <option key={d.code} value={d.code}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tgl Daftar (Dari)
                    </label>
                    <input
                      type="date"
                      value={filters.registered_from}
                      onChange={(e) =>
                        handleApplyFilter({ registered_from: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tgl Daftar (Sampai)
                    </label>
                    <input
                      type="date"
                      value={filters.registered_to}
                      onChange={(e) =>
                        handleApplyFilter({ registered_to: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabel Pelamar Admin */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 pl-4 pr-2 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllPaginatedSelected}
                      onChange={handleSelectAll}
                      className="rounded border-slate-200 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-3 min-w-[220px]">Data Pelamar</th>
                  <th className="py-3.5 px-3">Pendidikan</th>
                  <th className="py-3.5 px-3">Pengalaman</th>
                  <th className="py-3.5 px-3 text-center">Fresh Grad</th>
                  <th className="py-3.5 px-3 min-w-[130px]">Kecamatan</th>
                  <th className="py-3.5 px-3">Tgl Terdaftar</th>
                  <th className="py-3.5 px-3">Status Akun</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedApplicants.length > 0 ? (
                  paginatedApplicants.map((seeker) => {
                    const isSelected = selectedIds.includes(seeker.profile_id);
                    const initials = seeker.full_name
                      ? seeker.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      : "JS";

                    return (
                      <tr
                        key={seeker.profile_id}
                        className={`transition-colors ${
                          isSelected ? "bg-teal-50/40" : "hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Checkbox Individual */}
                        <td className="py-3.5 pl-4 pr-2 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(seeker.profile_id)}
                            className="rounded border-slate-200 text-teal-600 focus:ring-teal-500 cursor-pointer"
                          />
                        </td>

                        {/* Nama Pelamar, NIK & Email */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold text-xs flex items-center justify-center shrink-0">
                              {initials}
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/admin/pelamar/${seeker.profile_id}`}
                                className="font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-1"
                              >
                                {seeker.full_name}
                              </Link>
                              <div className="flex items-center gap-2 text-[0.625rem] text-slate-400 font-mono">
                                <span>NIK: {seeker.nik || "-"}</span>
                                <span>•</span>
                                <span>{seeker.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Pendidikan */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="text-[0.7rem] font-medium">
                              {seeker.education || "-"}
                            </span>
                          </div>
                        </td>

                        {/* Pengalaman */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="text-[0.7rem] font-medium">
                              {seeker.experience_years} Tahun
                            </span>
                          </div>
                        </td>

                        {/* Fresh Graduate Indicator */}
                        <td className="py-3.5 px-3 text-center">
                          {seeker.is_fresh_graduate ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-medium text-[0.65rem]">
                              <Sparkles className="w-3 h-3" />
                              Ya
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[0.7rem]">
                              -
                            </span>
                          )}
                        </td>

                        {/* Kecamatan */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[130px] text-[0.7rem]">
                              {seeker.district_name ||
                                seeker.district_code ||
                                "-"}
                            </span>
                          </div>
                        </td>

                        {/* Tanggal Terdaftar */}
                        <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[0.7rem]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>
                              {formatDateWithMonthName(seeker.registered_at) ||
                                "-"}
                            </span>
                          </div>
                        </td>

                        {/* Status Akun */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${getAccountStatusBadge(
                              seeker.account_status,
                            )}`}
                          >
                            {seeker.account_status === "active"
                              ? "Aktif"
                              : "Non-Aktif"}
                          </span>
                        </td>

                        {/* Aksi Menu Dropdown */}
                        <td className="py-3.5 px-4 text-right relative">
                          <div className="inline-block text-left">
                            <button
                              onClick={() =>
                                setActiveDropdownId(
                                  activeDropdownId === seeker.profile_id
                                    ? null
                                    : seeker.profile_id,
                                )
                              }
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            {activeDropdownId === seeker.profile_id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setActiveDropdownId(null)}
                                />
                                <div className="absolute right-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left divide-y divide-slate-100">
                                  <div className="py-1">
                                    <Link
                                      href={`/dashboard/admin/pelamar/${seeker.user_id}`}
                                      className="flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Detail</span>
                                    </Link>

                                    <button
                                      onClick={() =>
                                        handleAction(
                                          seeker.profile_id,
                                          "Kirim Email",
                                        )
                                      }
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>Kirim Email / Notif</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {seeker.account_status?.toLowerCase() ===
                                    "aktif" ? (
                                      <button
                                        onClick={() =>
                                          handleAction(
                                            seeker.profile_id,
                                            "Nonaktifkan",
                                          )
                                        }
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-amber-600 hover:bg-amber-50"
                                      >
                                        <ShieldAlert className="w-3.5 h-3.5" />
                                        <span>Nonaktifkan Akun</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleAction(
                                            seeker.profile_id,
                                            "Aktifkan",
                                          )
                                        }
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-emerald-600 hover:bg-emerald-50"
                                      >
                                        <UserCheck className="w-3.5 h-3.5" />
                                        <span>Aktifkan Akun</span>
                                      </button>
                                    )}
                                  </div>

                                  <div className="py-1">
                                    <button
                                      onClick={() =>
                                        handleAction(seeker.profile_id, "Hapus")
                                      }
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Hapus Pelamar</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 text-center text-slate-400"
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-semibold">
                        Tidak ada pelamar yang ditemukan
                      </p>
                      <p className="text-[0.65rem] text-slate-400 mt-0.5">
                        Coba ubah kata kunci pencarian atau filter Anda.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-200 text-xs text-slate-600 bg-slate-50/50">
            <div>
              Menampilkan{" "}
              <span className="font-bold text-slate-900">{startItem}</span> -{" "}
              <span className="font-bold text-slate-900">{endItem}</span> dari{" "}
              <span className="font-bold text-slate-900">{totalItems}</span>{" "}
              pelamar
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* Rows Per Page */}
              <div className="flex items-center gap-2">
                <span className="text-[0.7rem] text-slate-500 font-medium">
                  Tampilkan:
                </span>
                <select
                  value={filters.rowsPerPage || filters.limit}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFilters((prev) => ({
                      ...prev,
                      rowsPerPage: val,
                      limit: val,
                      page: 1,
                    }));
                  }}
                  className="px-2 py-1 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Navigasi Halaman */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
                  disabled={currentPage <= 1}
                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                  title="Halaman Pertama"
                >
                  <ChevronsLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.max(prev.page - 1, 1),
                    }))
                  }
                  disabled={currentPage <= 1}
                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                  title="Halaman Sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="px-2.5 text-xs font-semibold text-slate-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.min(prev.page + 1, totalPages),
                    }))
                  }
                  disabled={currentPage >= totalPages || totalItems === 0}
                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                  title="Halaman Selanjutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page: totalPages }))
                  }
                  disabled={currentPage >= totalPages || totalItems === 0}
                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                  title="Halaman Terakhir"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR FOR ADMIN */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/60 flex items-center gap-4"
          >
            <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
              <CheckSquare className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-medium">
                <strong className="text-teal-400">{selectedIds.length}</strong>{" "}
                pelamar dipilih
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkActivate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Aktifkan Akun</span>
              </button>

              <button
                onClick={handleBulkDeactivate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs"
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Nonaktifkan Akun</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
                title="Batal pilih"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
