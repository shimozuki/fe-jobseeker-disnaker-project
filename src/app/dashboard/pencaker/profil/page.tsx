"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FolderKanban,
  FileText,
  Edit3,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Download,
  Building2,
  Sliders,
  Plus,
  ChevronRight,
  Mars,
  Venus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { useJobSeekerProfile } from "@/features/profil-pencaker/hooks/useUserProfile.hook";
import APP_CONFIG from "@/shared/global/app_config";
import { formatDateWithMonthName } from "@/shared/utils/formatDate.util";
import { userGenderMap } from "@/shared/utils/userGenderMap";
import { useJobSeekerDocument } from "@/features/document-pencaker/hooks/useUserDocument.hook";
import { JobSeekerDocumentData } from "@/features/document-pencaker/types/userDocument.type";
import { useJobSeekerExperience } from "@/features/profil-pencaker/hooks/useUserExperience.hook";
import { useJobSeekerEducation } from "@/features/profil-pencaker/hooks/useUserEducation.hook";
import { JobSeekerExperienceData } from "@/features/profil-pencaker/types/userExperience.type";
import { employmentTypeMap } from "@/shared/utils/emplymentTypeMap";
import { useJobSeekerSkill } from "@/features/profil-pencaker/hooks/useUserSkill.hook";
import { useJobSeekerCertification } from "@/features/profil-pencaker/hooks/useUserCertification.hook";
import { useJobSeekerPreference } from "@/features/preference-pencaker/hooks/useUserPreference.hook";
import { useJobSeekerProfileCompletionRate } from "@/features/profil-pencaker/hooks/useUserProfileCompletionRate";

export default function CandidateProfilePage() {
  const [activeTab, setActiveTab] = useState<"detail" | "history">("detail");
  const router = useRouter();
  const { user } = useAuthUser();
  const { jobSeekerProfile } = useJobSeekerProfile();
  const { jobSeekerDocument } = useJobSeekerDocument();
  const { jobSeekerExperience } = useJobSeekerExperience();
  const { jobSeekerEducation } = useJobSeekerEducation();
  const { jobSeekerSkill } = useJobSeekerSkill();
  const { jobSeekerCertification } = useJobSeekerCertification();
  const { jobSeekerPreference } = useJobSeekerPreference();
  const [jobSeekerCv, setJobSeekerCv] = useState<JobSeekerDocumentData | null>(
    null,
  );
  const [jobSeekerJobExperience, setJobSeekerJobExperience] = useState<
    JobSeekerExperienceData[] | []
  >([]);
  const [jobSeekerOrganizationExperience, setJobSeekerOrganizationExperience] =
    useState<JobSeekerExperienceData[] | []>([]);

  const { jobSeekerProfileCompletionRate: profileProgress } =
    useJobSeekerProfileCompletionRate();

  useEffect(() => {
    console.log(jobSeekerPreference);
    console.log(jobSeekerDocument);
  }, [jobSeekerPreference, jobSeekerDocument]);

  useEffect(() => {
    console.log(jobSeekerCv);
  }, [jobSeekerCv]);

  useEffect(() => {
    const getCv = () => {
      const allCv = jobSeekerDocument.filter((cv) => cv.category === "cv");
      const mainCv = allCv.find((cv) => cv.isMain === true);

      if (mainCv) {
        setJobSeekerCv(mainCv);
        return;
      }
      setJobSeekerCv(allCv[0]);
    };
    getCv();
  }, [jobSeekerDocument]);

  useEffect(() => {
    const getJobSeekerExperienceByType = () => {
      const nonOrg = jobSeekerExperience.filter(
        (job) =>
          job.employment_type !== "organization" &&
          job.employment_type !== "internship",
      );
      const org = jobSeekerExperience.filter(
        (job) =>
          job.employment_type === "organization" ||
          job.employment_type === "internship",
      );

      setJobSeekerJobExperience(nonOrg);
      setJobSeekerOrganizationExperience(org);
    };
    getJobSeekerExperienceByType();
  }, [jobSeekerExperience]);

  // Riwayat pembaruan profil
  const updateHistory = [
    {
      id: 1,
      action: "Memperbarui Pengalaman Kerja",
      detail: "Menambahkan pengalaman di PT AMNT sebagai Geologist",
      date: "20 September 2026",
    },
    {
      id: 2,
      action: "Mengunggah CV Terbaru",
      detail: "Mengunggah berkas CV_Fajar_Ardiansyah_2026.pdf",
      date: "15 September 2026",
    },
    {
      id: 3,
      action: "Pembaruan Data Pribadi",
      detail: "Memperbarui nomor telepon dan alamat domisili",
      date: "01 September 2026",
    },
  ];

  return (
    <div className="space-y-8">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs></Breadcrumbs>

        {/* Main Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <User className="w-7 h-7 text-app-navy-700" />
              <span>Profil Saya</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola data diri, riwayat pendidikan, pengalaman, dan berkas
              lamaran Anda.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => router.push("profil/preview")}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Profil</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("profil/edit")}
              className="flex items-center gap-2 px-4 py-2.5 bg-app-navy-700 hover:bg-app-navy-900 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-app-navy-700/10 active:scale-[0.98] cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. INDIKATOR PROFIL LENGKAP & ALERTS DATA BELUM DIISI */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-app-navy-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Kelengkapan Profil Pencaker
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Profil yang lengkap meningkatkan peluang dilirik oleh HRD hingga
              2x lipat.
            </p>
          </div>
          <span className="text-xl font-black text-app-navy-700">
            {profileProgress?.profile_completeness ?? 0}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${profileProgress?.profile_completeness ?? 0}%` }}
          />
        </div>

        {/* Alert Data Yang Belum Diisi */}
        {profileProgress?.missing_data_alerts &&
          profileProgress.missing_data_alerts.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Perhatian: Data Anda Belum Lengkap</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc text-xs text-amber-900">
                {profileProgress.missing_data_alerts.map((alert) => (
                  <li key={alert.id}>
                    <span className="font-semibold">{alert.category}:</span>{" "}
                    {alert.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </section>

      {/* TAB NAVIGATION: DETAIL PROFIL VS RIWAYAT PEMBARUAN */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab("detail")}
          className={`pb-3 transition-colors relative ${
            activeTab === "detail"
              ? "text-app-navy-700 border-b-2 border-app-navy-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Detail Profil
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === "history"
              ? "text-app-navy-700 border-b-2 border-app-navy-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Riwayat Pembaruan</span>
        </button>
      </div>

      {/* ISINYA BERDASARKAN TAB */}
      {activeTab === "detail" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI (1/3): FOTO, NAMA, RINGKASAN & DATA PRIBADI */}
          <div className="space-y-6">
            {/* CARD PROFIL & DATA PRIBADI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-100 shadow-inner">
                  {jobSeekerProfile?.profile_photo_url ? (
                    <Image
                      src={`${APP_CONFIG.STORAGE_URL}${jobSeekerProfile?.profile_photo_url}`}
                      alt="Foto Profil"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full flex-col justify-center text-3xl font-medium items-center text-slate-500">
                      {user?.full_name?.charAt(0) ?? "U"}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {user?.full_name}
                  </h3>
                  <p className="text-xs font-semibold text-app-navy-700 mt-0.5">
                    {jobSeekerProfile?.headline ?? (
                      <span className="text-slate-400 font-normal">
                        Data belum diisi
                      </span>
                    )}
                  </p>
                  {jobSeekerProfile?.address ? (
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" /> {jobSeekerProfile?.address}
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" /> Data belum diisi
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  Data Pribadi
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {formatDateWithMonthName(
                        jobSeekerProfile?.date_of_birth,
                      ) ?? (
                        <span className="text-slate-400 font-normal">
                          Data belum diisi
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    {jobSeekerProfile?.gender === "female" ? (
                      <Venus className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Mars className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span>
                      {jobSeekerProfile?.gender ? (
                        userGenderMap[jobSeekerProfile?.gender as string]
                      ) : (
                        <span className="text-slate-400 font-normal">
                          Data belum diisi
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* CV Utama */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  CV Utama
                </h4>

                {jobSeekerCv ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {jobSeekerCv?.name || "CV_Tanpa_Nama.pdf"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {jobSeekerCv?.size || "-"}
                        </p>
                      </div>
                    </div>

                    {jobSeekerCv?.fileUrl ? (
                      <a
                        href={`${APP_CONFIG.STORAGE_URL}${jobSeekerCv.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        title="Unduh CV"
                        className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">
                        File tidak tersedia
                      </span>
                    )}
                  </div>
                ) : (
                  /* Empty State jika CV belum diunggah / null */
                  <div className="text-center py-4 px-3 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-xs text-slate-400">
                      Belum ada CV utama yang diunggah.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PREFERENSI PEKERJAAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Preferensi Kerja
                  </h3>
                </div>
              </div>

              {jobSeekerPreference ? (
                <div className="space-y-3 text-xs">
                  {/* Jabatan Diharapkan */}
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Jabatan / Posisi Diharapkan
                    </p>
                    <p className="font-bold text-slate-800">
                      {jobSeekerPreference.preferred_positions &&
                      jobSeekerPreference.preferred_positions.length > 0
                        ? jobSeekerPreference.preferred_positions
                            .map((pos) => pos.name)
                            .join(", ")
                        : "Belum ditentukan"}
                    </p>
                  </div>

                  {/* Bidang & Industri */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Bidang Pekerjaan
                      </p>
                      <p className="font-bold text-slate-800">
                        {jobSeekerPreference.job_field || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Industri Pilihan
                      </p>
                      <p className="font-bold text-slate-800">
                        {jobSeekerPreference.industry || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Lokasi Kerja (Kecamatan) */}
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Lokasi Kerja Pilihan
                    </p>
                    <p className="font-bold text-slate-800">
                      {jobSeekerPreference.preferred_districts &&
                      jobSeekerPreference.preferred_districts.length > 0
                        ? jobSeekerPreference.preferred_districts
                            .map((d) => `Kec. ${d.name}`)
                            .join(", ")
                        : "Seluruh wilayah"}
                      {jobSeekerPreference.willing_to_relocate && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-app-navy-50 text-app-navy-700 rounded text-[9px] font-bold">
                          Siap Relokasi
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Ekspektasi Gaji */}
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Ekspektasi Gaji Bulanan
                    </p>
                    <p className="font-bold text-app-navy-700">
                      {jobSeekerPreference.min_salary ||
                      jobSeekerPreference.max_salary
                        ? `Rp ${Number(jobSeekerPreference.min_salary || 0).toLocaleString("id-ID")} - Rp ${Number(jobSeekerPreference.max_salary || 0).toLocaleString("id-ID")}`
                        : "Tidak ditentukan"}
                    </p>
                  </div>

                  {/* Jenis & Sistem Kerja */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Jenis Pekerjaan
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {jobSeekerPreference.job_types?.map((type, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md"
                          >
                            {type === "full_time"
                              ? "Penuh Waktu"
                              : type === "part_time"
                                ? "Paruh Waktu"
                                : type === "contract_project"
                                  ? "Kontrak"
                                  : type === "internship"
                                    ? "Magang"
                                    : type === "freelance"
                                      ? "Freelance"
                                      : type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Sistem Kerja
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {jobSeekerPreference.work_arrangements?.map(
                          (sys, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md"
                            >
                              {sys === "on_site"
                                ? "On-site"
                                : sys === "hybrid"
                                  ? "Hybrid"
                                  : sys === "remote"
                                    ? "Remote"
                                    : sys}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Pencarian Kerja */}
                  <div className="pt-1">
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Status Pencarian Kerja
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      {jobSeekerPreference.job_search_status ===
                      "actively_looking"
                        ? "Aktif mencari pekerjaan (Open to Work)"
                        : jobSeekerPreference.job_search_status ===
                            "open_to_offers"
                          ? "Terbuka untuk penawaran"
                          : "Tidak sedang mencari kerja"}
                    </p>
                  </div>
                </div>
              ) : (
                /* Empty State jika data preferensi belum diatur */
                <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    Belum ada preferensi kerja yang diatur.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Atur preferensi karir Anda untuk mendapatkan rekomendasi
                    lowongan yang sesuai.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN (2/3): DETAIL SECTION LENGKAP */}
          <div className="lg:col-span-2 space-y-6">
            {/* RINGKASAN PROFESIONAL */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
                Ringkasan Profesional
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {jobSeekerProfile?.summary ?? (
                  <span className="text-slate-400">Data belum disi</span>
                )}
              </p>
            </div>

            {/* PENGALAMAN KERJA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pengalaman Kerja
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {jobSeekerJobExperience && jobSeekerJobExperience.length > 0 ? (
                  jobSeekerJobExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex gap-4 pb-4 border-b border-slate-50 last:border-none last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-xl bg-app-navy-50 text-app-navy-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 text-xs w-full overflow-hidden">
                        <h4 className="font-extrabold text-slate-900 truncate">
                          {exp.job_title}
                        </h4>
                        <p className="font-semibold text-slate-600 truncate">
                          {exp.company_name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {employmentTypeMap[exp.employment_type]} •{" "}
                          {exp.start_date} -{" "}
                          {exp.is_current
                            ? "Sekarang"
                            : exp.end_date || "Selesai"}{" "}
                          {exp.location ? `• ${exp.location}` : ""}
                        </p>

                        {exp.description && (
                          <p className="text-slate-600 mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.responsibilities && (
                          <div className="text-slate-600 mt-1">
                            <span className="font-bold text-[11px] text-slate-700">
                              Tanggung Jawab:
                            </span>
                            <p className="leading-relaxed">
                              {exp.responsibilities}
                            </p>
                          </div>
                        )}

                        {exp.achievements && (
                          <div className="text-slate-600 mt-1">
                            <span className="font-bold text-[11px] text-slate-700">
                              Pencapaian:
                            </span>
                            <p className="leading-relaxed">
                              {exp.achievements}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State jika data kosong / length === 0 */
                  <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      Belum ada pengalaman kerja yang ditambahkan.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Tambahkan riwayat pekerjaan Anda untuk meningkatkan
                      peluang diterima kerja.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PENDIDIKAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pendidikan
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {jobSeekerEducation && jobSeekerEducation.length > 0 ? (
                  jobSeekerEducation.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex gap-4 pb-4 border-b border-slate-50 last:border-none last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-xl bg-app-navy-50 text-app-navy-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {edu.degree || "Edu"}
                      </div>
                      <div className="space-y-1 text-xs w-full overflow-hidden">
                        <h4 className="font-extrabold text-slate-900 truncate">
                          {edu.degree} {edu.major}
                        </h4>
                        <p className="font-semibold text-slate-600 truncate">
                          {edu.institution}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {edu.start_date} - {edu.end_date || "Sekarang"}{" "}
                          {edu.grade ? `• IPK: ${edu.grade}` : ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State jika data pendidikan kosong / length === 0 */
                  <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      Belum ada riwayat pendidikan yang ditambahkan.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Tambahkan latar belakang pendidikan Anda untuk melengkapi
                      profil profesional.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PENGALAMAN ORGANISASI ATAU MAGANG */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pengalaman Organisasi/Magang
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {jobSeekerOrganizationExperience &&
                jobSeekerOrganizationExperience.length > 0 ? (
                  jobSeekerOrganizationExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex gap-4 pb-4 border-b border-slate-50 last:border-none last:pb-0"
                    >
                      <div className="w-10 h-10 rounded-xl bg-app-navy-50 text-app-navy-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 text-xs w-full overflow-hidden">
                        <h4 className="font-extrabold text-slate-900 truncate">
                          {exp.job_title}
                        </h4>
                        <p className="font-semibold text-slate-600 truncate">
                          {exp.company_name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {employmentTypeMap[exp.employment_type]} •{" "}
                          {exp.start_date} -{" "}
                          {exp.is_current
                            ? "Sekarang"
                            : exp.end_date || "Selesai"}{" "}
                          {exp.location ? `• ${exp.location}` : ""}
                        </p>

                        {exp.description && (
                          <p className="text-slate-600 mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {exp.responsibilities && (
                          <div className="text-slate-600 mt-1">
                            <span className="font-bold text-[11px] text-slate-700">
                              Tanggung Jawab:
                            </span>
                            <p className="leading-relaxed">
                              {exp.responsibilities}
                            </p>
                          </div>
                        )}

                        {exp.achievements && (
                          <div className="text-slate-600 mt-1">
                            <span className="font-bold text-[11px] text-slate-700">
                              Pencapaian:
                            </span>
                            <p className="leading-relaxed">
                              {exp.achievements}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State jika data kosong / length === 0 */
                  <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      Belum ada pengalaman organisasi/magang yang ditambahkan.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Tambahkan riwayat pekerjaan Anda untuk meningkatkan
                      peluang diterima organisasi/magang.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* KEAHLIAN & SERTIFIKASI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* KEAHLIAN */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-app-navy-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Keahlian & Kemahiran
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {jobSeekerSkill && jobSeekerSkill.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {jobSeekerSkill.map((skill) => (
                        <div
                          key={skill.id}
                          className="group px-2.5 py-1 bg-slate-50 border border-slate-200 hover:border-app-navy-300 hover:bg-app-navy-50/30 text-slate-700 font-medium text-[11px] rounded-lg transition-all inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>{skill.skill_name}</span>
                          {skill.proficiency_level && (
                            <span className="px-1 py-0.2 bg-white border border-slate-200 group-hover:border-app-navy-200 text-[8px] font-bold text-app-navy-700 rounded uppercase tracking-wide">
                              {skill.proficiency_level}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State jika data keahlian kosong / length === 0 */
                    <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                      <p className="text-xs font-medium text-slate-500 mb-1">
                        Belum ada keahlian yang ditambahkan.
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Tambahkan keahlian utama untuk menarik perhatian
                        perekrut.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* SERTIFIKASI */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-app-navy-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Sertifikasi Kompetensi
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {jobSeekerCertification &&
                  jobSeekerCertification.length > 0 ? (
                    jobSeekerCertification.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-app-navy-50 text-app-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 truncate">
                            <p className="font-bold text-xs text-slate-900 truncate">
                              {cert.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {cert.issuer} • Diterbitkan:{" "}
                              {new Date(cert.issue_date).toLocaleDateString(
                                "id-ID",
                                {
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Tombol Unduh Sertifikat */}
                        {cert.certificate_file_url && (
                          <a
                            href={cert.certificate_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            title="Unduh Sertifikat"
                            className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    /* Empty State jika data kosong */
                    <div className="text-center py-6 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                      <p className="text-xs font-medium text-slate-500 mb-1">
                        Belum ada sertifikasi yang ditambahkan.
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Unggah sertifikat resmi pendukung kualifikasi kerja
                        Anda.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PORTOFOLIO */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Tautan Profesional & Portofolio
                </h3>
              </div>

              <div className="space-y-3">
                {/* Portofolio URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Portofolio Proyek
                  </label>
                  {jobSeekerProfile?.portfolio_url ? (
                    <a
                      href={jobSeekerProfile?.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-app-navy-700 shrink-0" />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-app-navy-700 truncate">
                          {jobSeekerProfile?.portfolio_url}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-app-navy-700 shrink-0">
                        Buka Link
                      </span>
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">
                      Portofolio belum diisi
                    </span>
                  )}
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    LinkedIn
                  </label>
                  {jobSeekerProfile?.linkedin_url ? (
                    <a
                      href={jobSeekerProfile?.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-app-navy-700 shrink-0" />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-app-navy-700 truncate">
                          {jobSeekerProfile?.linkedin_url}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-app-navy-700 shrink-0">
                        Buka Link
                      </span>
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">
                      LinkedIn belum diisi
                    </span>
                  )}
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    GitHub
                  </label>
                  {jobSeekerProfile?.github_url ? (
                    <a
                      href={jobSeekerProfile?.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-app-navy-700 shrink-0" />
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-app-navy-700 truncate">
                          {jobSeekerProfile?.github_url}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-app-navy-700 shrink-0">
                        Buka Link
                      </span>
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">
                      GitHub belum diisi
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. RIWAYAT PEMBARUAN PROFIL */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm max-w-3xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
            Aktivitas Pembaruan Profil
          </h3>
          <div className="relative border-l-2 border-slate-100 pl-4 space-y-6 ml-2 my-2">
            {updateHistory.map((item) => (
              <div key={item.id} className="relative group">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-app-navy-600 ring-4 ring-white" />
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-slate-900">
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-600">{item.detail}</p>
                  <span className="text-[10px] font-medium text-slate-400 block pt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
