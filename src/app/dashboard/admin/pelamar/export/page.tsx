"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Search,
  Users,
  CheckCircle2,
  ChevronDown,
  Check,
} from "lucide-react";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { useAdminJobSeeker } from "@/features/dashboard-admin/hooks/useAdminJobSeeker.hook";
import { useOptions } from "@/shared/hooks/useOptions.hook";
import { AdminExportJobSeekerFilter } from "@/features/dashboard-admin/types/AdminJobSeeker.type";
import { userGenderMap } from "@/shared/utils/userGenderMap";
import { mapPayloadToJobStatus } from "@/shared/utils/userJobMap";

export default function ExportPelamarPage() {
  // Hook Integrasi Backend untuk Export dan Filter Data Pelamar
  const {
    adminExportJobSeeker,
    adminExportJobSeekerFilter,
    setAdminExportJobSeekerFilter,
    exportMessage,
    isExportingPdf,
    handleExportPDF,
    handleExportExcel,
  } = useAdminJobSeeker();

  // Hook Master Options untuk Pilihan Dinamis (District, Industry, Job Field, Job Position, Major)
  const {
    districtOptions,
    insdustryOptions,
    jobCategoryOptions,
    jobPositionOptions,
    majorOptions,
    handleSetMajorOptionFilter,
  } = useOptions();

  // State Search Query untuk Dropdown Searchable Select
  const [jobFieldQuery, setJobFieldQuery] = useState("");
  const [isJobFieldOpen, setIsJobFieldOpen] = useState(false);

  const [industryQuery, setIndustryQuery] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [positionQuery, setPositionQuery] = useState("");
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const [workPlaceQuery, setWorkPlaceQuery] = useState("");
  const [isWorkPlaceOpen, setIsWorkPlaceOpen] = useState(false);

  const [districtQuery, setDistrictQuery] = useState("");
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  const [majorQuery, setMajorQuery] = useState("");
  const [isMajorOpen, setIsMajorOpen] = useState(false);

  // Refs untuk Click Outside Dropdown
  const posRef = useRef<HTMLDivElement>(null);
  const workPlaceRef = useRef<HTMLDivElement>(null);
  const districtRef = useRef<HTMLDivElement>(null);
  const jobFieldRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);
  const majorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (posRef.current && !posRef.current.contains(event.target as Node)) {
        setIsPositionOpen(false);
      }
      if (
        workPlaceRef.current &&
        !workPlaceRef.current.contains(event.target as Node)
      ) {
        setIsWorkPlaceOpen(false);
      }
      if (
        districtRef.current &&
        !districtRef.current.contains(event.target as Node)
      ) {
        setIsDistrictOpen(false);
      }
      if (
        jobFieldRef.current &&
        !jobFieldRef.current.contains(event.target as Node)
      ) {
        setIsJobFieldOpen(false);
      }
      if (
        industryRef.current &&
        !industryRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
      }
      if (
        majorRef.current &&
        !majorRef.current.contains(event.target as Node)
      ) {
        setIsMajorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Search Lists dari Master Options
  const filteredPositions = jobPositionOptions.filter((p) =>
    p.name.toLowerCase().includes(positionQuery.toLowerCase()),
  );
  const filteredWorkPlaces = districtOptions.filter((d) =>
    d.name.toLowerCase().includes(workPlaceQuery.toLowerCase()),
  );
  const filteredDistricts = districtOptions.filter((d) =>
    d.name.toLowerCase().includes(districtQuery.toLowerCase()),
  );
  const filteredJobFields = jobCategoryOptions.filter((f) =>
    f.name.toLowerCase().includes(jobFieldQuery.toLowerCase()),
  );
  const filteredIndustries = insdustryOptions.filter((i) =>
    i.name.toLowerCase().includes(industryQuery.toLowerCase()),
  );
  const filteredMajors = majorOptions.filter((m) =>
    m.nama_jurusan.toLowerCase().includes(majorQuery.toLowerCase()),
  );

  // Handler Perubahan Field Filter secara Generik
  const handleFilterChange = (
    key: keyof AdminExportJobSeekerFilter,
    value: any,
  ) => {
    setAdminExportJobSeekerFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6 mx-auto pb-12 text-xs">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <Breadcrumbs />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Download className="w-7 h-7 text-teal-600" />
              <span>Export Laporan Berdasarkan Preferensi Pelamar</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Saring database pelamar menggunakan parameter preferensi,
              demografi, tempat tinggal (domisili), serta preferensi tempat
              kerja langsung dari server.
            </p>
          </div>
        </div>
      </div>

      {/* NOTIFIKASI TOAST */}
      {exportMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold transition-all shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* FILTER BUILDER CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-600" /> Parameter Filter Data
            Pelamar
          </h2>
          <span className="text-[11px] text-slate-400">
            Terintegrasi langsung ke Backend API
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Pendidikan Terakhir */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pendidikan Terakhir
              </label>
              <select
                value={adminExportJobSeekerFilter.education_level}
                onChange={(e) => {
                  handleFilterChange("education_level", e.target.value);
                  handleSetMajorOptionFilter(e.target.value);
                }}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="">Semua Pendidikan</option>
                <option value="SMA/SMK">SMA/SMK</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>

            {/* 2. Jurusan (Major ID / Searchable Select) */}
            <div className="relative" ref={majorRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jurusan / Program Studi
              </label>
              <div
                onClick={() => setIsMajorOpen(!isMajorOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.major_id
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {majorOptions.find(
                    (m) => m.id === adminExportJobSeekerFilter.major_id,
                  )?.nama_jurusan || "Semua Jurusan"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isMajorOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari jurusan..."
                      value={majorQuery}
                      onChange={(e) => setMajorQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("major_id", null);
                        setIsMajorOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.major_id === null
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Jurusan</span>
                      {adminExportJobSeekerFilter.major_id === null && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredMajors.length > 0 ? (
                      filteredMajors.map((major) => {
                        const isSelected =
                          adminExportJobSeekerFilter.major_id === major.id;
                        return (
                          <div
                            key={major.id}
                            onClick={() => {
                              handleFilterChange("major_id", major.id);
                              setIsMajorOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>
                              {major.nama_jurusan}
                              {major.jenjang ? ` (${major.jenjang})` : ""}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Tempat Tinggal (Domisili / District Code Select) */}
            <div className="relative" ref={districtRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tempat Tinggal (Kecamatan)
              </label>
              <div
                onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.district_code
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {districtOptions.find(
                    (d) => d.code === adminExportJobSeekerFilter.district_code,
                  )?.name
                    ? `Kec. ${
                        districtOptions.find(
                          (d) =>
                            d.code === adminExportJobSeekerFilter.district_code,
                        )?.name
                      }`
                    : "Semua Domisili"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isDistrictOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari kecamatan domisili..."
                      value={districtQuery}
                      onChange={(e) => setDistrictQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("district_code", "");
                        setIsDistrictOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.district_code === ""
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Domisili</span>
                      {adminExportJobSeekerFilter.district_code === "" && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredDistricts.length > 0 ? (
                      filteredDistricts.map((dist) => {
                        const isSelected =
                          adminExportJobSeekerFilter.district_code ===
                          dist.code;
                        return (
                          <div
                            key={dist.code}
                            onClick={() => {
                              handleFilterChange("district_code", dist.code);
                              setIsDistrictOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{dist.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Preferensi Tempat Kerja (Preferred District Code Select) */}
            <div className="relative" ref={workPlaceRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferensi Tempat Kerja
              </label>
              <div
                onClick={() => setIsWorkPlaceOpen(!isWorkPlaceOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.preferred_district_code
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {districtOptions.find(
                    (d) =>
                      d.code ===
                      adminExportJobSeekerFilter.preferred_district_code,
                  )?.name
                    ? `Kec. ${
                        districtOptions.find(
                          (d) =>
                            d.code ===
                            adminExportJobSeekerFilter.preferred_district_code,
                        )?.name
                      }`
                    : "Semua Tempat Kerja"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isWorkPlaceOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari preferensi tempat kerja..."
                      value={workPlaceQuery}
                      onChange={(e) => setWorkPlaceQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("preferred_district_code", "");
                        setIsWorkPlaceOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.preferred_district_code ===
                        ""
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Tempat Kerja</span>
                      {adminExportJobSeekerFilter.preferred_district_code ===
                        "" && <Check className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    {filteredWorkPlaces.length > 0 ? (
                      filteredWorkPlaces.map((dist) => {
                        const isSelected =
                          adminExportJobSeekerFilter.preferred_district_code ===
                          dist.code;
                        return (
                          <div
                            key={dist.code}
                            onClick={() => {
                              handleFilterChange(
                                "preferred_district_code",
                                dist.code,
                              );
                              setIsWorkPlaceOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{dist.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={adminExportJobSeekerFilter.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="">Semua Gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            {/* 6. Umur (Min - Max Age) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rentang Umur (Tahun)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Umur"
                  value={adminExportJobSeekerFilter.min_age ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "min_age",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
                <input
                  type="number"
                  placeholder="Max Umur"
                  value={adminExportJobSeekerFilter.max_age ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "max_age",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
              </div>
            </div>

            {/* 7. Rentang Ekspektasi Gaji */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rentang Ekspektasi Gaji (IDR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Gaji"
                  value={adminExportJobSeekerFilter.min_salary ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "min_salary",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
                <input
                  type="number"
                  placeholder="Max Gaji"
                  value={adminExportJobSeekerFilter.max_salary ?? ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "max_salary",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
              </div>
            </div>

            {/* 8. Job Field ID (Searchable Select Option) */}
            <div className="relative" ref={jobFieldRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bidang Pekerjaan
              </label>
              <div
                onClick={() => setIsJobFieldOpen(!isJobFieldOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.job_field_id
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {jobCategoryOptions.find(
                    (f) => f.id === adminExportJobSeekerFilter.job_field_id,
                  )?.name || "Semua Bidang Pekerjaan"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isJobFieldOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari bidang pekerjaan..."
                      value={jobFieldQuery}
                      onChange={(e) => setJobFieldQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("job_field_id", null);
                        setIsJobFieldOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.job_field_id === null
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Bidang Pekerjaan</span>
                      {adminExportJobSeekerFilter.job_field_id === null && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredJobFields.length > 0 ? (
                      filteredJobFields.map((field) => {
                        const isSelected =
                          adminExportJobSeekerFilter.job_field_id === field.id;
                        return (
                          <div
                            key={field.id}
                            onClick={() => {
                              handleFilterChange("job_field_id", field.id);
                              setIsJobFieldOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{field.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 9. Industry ID (Searchable Select Option) */}
            <div className="relative" ref={industryRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Industri Pilihan
              </label>
              <div
                onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.industry_id
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {insdustryOptions.find(
                    (i) => i.id === adminExportJobSeekerFilter.industry_id,
                  )?.name || "Semua Industri"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isIndustryOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari industri..."
                      value={industryQuery}
                      onChange={(e) => setIndustryQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("industry_id", null);
                        setIsIndustryOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.industry_id === null
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Industri</span>
                      {adminExportJobSeekerFilter.industry_id === null && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredIndustries.length > 0 ? (
                      filteredIndustries.map((ind) => {
                        const isSelected =
                          adminExportJobSeekerFilter.industry_id === ind.id;
                        return (
                          <div
                            key={ind.id}
                            onClick={() => {
                              handleFilterChange("industry_id", ind.id);
                              setIsIndustryOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{ind.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 10. Position ID (Searchable Select Option) */}
            <div className="relative" ref={posRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Posisi yang Diinginkan
              </label>
              <div
                onClick={() => setIsPositionOpen(!isPositionOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    adminExportJobSeekerFilter.position_id
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {jobPositionOptions.find(
                    (p) => p.id === adminExportJobSeekerFilter.position_id,
                  )?.name || "Semua Posisi"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isPositionOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari posisi..."
                      value={positionQuery}
                      onChange={(e) => setPositionQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        handleFilterChange("position_id", null);
                        setIsPositionOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        adminExportJobSeekerFilter.position_id === null
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Posisi</span>
                      {adminExportJobSeekerFilter.position_id === null && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredPositions.length > 0 ? (
                      filteredPositions.map((pos) => {
                        const isSelected =
                          adminExportJobSeekerFilter.position_id === pos.id;
                        return (
                          <div
                            key={pos.id}
                            onClick={() => {
                              handleFilterChange("position_id", pos.id);
                              setIsPositionOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{pos.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 11. Job Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jenis Pekerjaan
              </label>
              <select
                value={adminExportJobSeekerFilter.job_type}
                onChange={(e) => handleFilterChange("job_type", e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="">Semua Jenis Kerja</option>
                <option value="full_time">Penuh Waktu (Full-time)</option>
                <option value="part_time">Paruh Waktu (Part-time)</option>
                <option value="contract_project">Kontrak / Proyek</option>
                <option value="internship">Magang (Internship)</option>
                <option value="freelance">Lepas / Freelance</option>
              </select>
            </div>

            {/* 12. Work Arrangement */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sistem Kerja
              </label>
              <select
                value={adminExportJobSeekerFilter.work_arrangement}
                onChange={(e) =>
                  handleFilterChange("work_arrangement", e.target.value)
                }
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="">Semua Sistem Kerja</option>
                <option value="on_site">Kantor (On-site)</option>
                <option value="hybrid">Hibrida (Hybrid)</option>
                <option value="remote">Dari Rumah (Remote)</option>
              </select>
            </div>

            {/* 13. Willing to Relocate */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kesediaan Relokasi
              </label>
              <select
                value={
                  adminExportJobSeekerFilter.willing_to_relocate === null
                    ? "all"
                    : String(adminExportJobSeekerFilter.willing_to_relocate)
                }
                onChange={(e) =>
                  handleFilterChange(
                    "willing_to_relocate",
                    e.target.value === "all" ? null : e.target.value === "true",
                  )
                }
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="all">Semua Opsi</option>
                <option value="true">Bersedia Relokasi (Ya)</option>
                <option value="false">Tidak Bersedia Relokasi</option>
              </select>
            </div>

            {/* 14. Job Search Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Pencarian Kerja
              </label>
              <select
                value={adminExportJobSeekerFilter.job_search_status}
                onChange={(e) =>
                  handleFilterChange("job_search_status", e.target.value)
                }
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="">Semua Status</option>
                <option value="actively_looking">
                  Aktif mencari pekerjaan (Open to Work)
                </option>
                <option value="open_to_offers">
                  Terbuka untuk penawaran (Passive)
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* HASIL FILTER & TOMBOL EXPORT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" /> Hasil Filter Data
              Preferensi Pelamar
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ditemukan{" "}
              <strong className="text-teal-700">
                {adminExportJobSeeker.length}
              </strong>{" "}
              pelamar yang cocok dengan kriteria filter preferensi server.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              disabled={adminExportJobSeeker.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={adminExportJobSeeker.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* TABEL HASIL FILTER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Nama & NIK</th>
                <th className="py-3 px-3">Pendidikan & Demografi</th>
                <th className="py-3 px-3">
                  Domisili & Preferensi Tempat Kerja
                </th>
                <th className="py-3 px-3">Posisi Pilihan</th>
                <th className="py-3 px-3 min-w-52">Ekspektasi Gaji</th>
                <th className="py-3 px-3 min-w-32">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {adminExportJobSeeker.length > 0 ? (
                adminExportJobSeeker.map((applicant, idx) => {
                  const initials = applicant.FullName
                    ? applicant.FullName.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "JS";

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              {applicant.FullName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              NIK: {applicant.NIK || "-"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-800">
                          {applicant.Education || "-"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {userGenderMap[applicant.Gender] || "-"} •{" "}
                          {applicant.Age || 0} Tahun
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-slate-800">
                          Domisili: {applicant.DistrictName || "-"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Kerja:{" "}
                          {applicant.PreferredDistricts
                            ? applicant.PreferredDistricts.join(", ")
                            : "-"}
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {applicant.PreferredPositions &&
                          applicant.PreferredPositions.length > 0 ? (
                            applicant.PreferredPositions.map((pos, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] rounded font-semibold"
                              >
                                {pos}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-bold text-teal-700">
                        Rp {applicant.MinSalary?.toLocaleString("id-ID") || 0} -
                        Rp {applicant.MaxSalary?.toLocaleString("id-ID") || 0}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {mapPayloadToJobStatus(applicant.JobSearchStatus) ||
                            "Active"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30 text-teal-600" />
                    <p className="text-xs font-bold text-slate-700">
                      Tidak ada pelamar yang cocok dengan kriteria preferensi
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Coba longgarkan parameter filter untuk melihat hasil data
                      lainnya.
                    </p>
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
