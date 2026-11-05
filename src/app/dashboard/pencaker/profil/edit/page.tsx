"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Save,
  ArrowLeft,
  X,
  FileText,
  Globe,
  CheckCircle2,
  Building2,
  MapPin,
  Download,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useJobSeekerProfile } from "@/features/profil-pencaker/hooks/useUserProfile.hook";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import APP_CONFIG from "@/shared/global/app_config";
import { useJobSeekerEducation } from "@/features/profil-pencaker/hooks/useUserEducation.hook";
import { motion, AnimatePresence } from "framer-motion";
import { useJobSeekerExperience } from "@/features/profil-pencaker/hooks/useUserExperience.hook";
import { employmentTypeMap } from "@/shared/utils/emplymentTypeMap";
import { useJobSeekerSkill } from "@/features/profil-pencaker/hooks/useUserSkill.hook";
import { useJobSeekerCertification } from "@/features/profil-pencaker/hooks/useUserCertification.hook";
import { formatDateWithMonthName } from "@/shared/utils/formatDate.util";
import { useOptions } from "@/shared/hooks/useOptions.hook";

export default function CandidateEditProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "pribadi" | "pendidikan" | "pengalaman" | "keahlian"
  >("pribadi");
  const {
    jobSeekerProfile,
    jobSeekerProfilePictureFile,
    setJobSeekerProfilePictureFile,
    handleSaveChanges,
    updateJobSeekerProfileForm,
    handleSubmitUpdateJobSeekerProfile,
    handleChangeUpdateJobSeekerProfileForm,
    districtsList,
    handleToggleFreshGraduateStatus,
  } = useJobSeekerProfile();

  const {
    jobSeekerEducation,
    setJobSeekerEducation,
    createJobSeekerEducationForm,
    setCreateJobSeekerEducationForm,
    handleChangeCreateJobSeekerEducationForm,
    handleCreateJobSeekerEducation,
    resetCreateJobSeekerEducationForm,
    handleDeleteJobSeekerEducation,
  } = useJobSeekerEducation();

  const {
    jobSeekerExperience,
    setJobSeekerExperience,
    createJobSeekerExperienceForm,
    setCreateJobSeekerExperienceForm,
    handleChangeCreateJobSeekerExperienceForm,
    handleCreateJobSeekerExperience,
    handleDeleteJobSeekerExperience,
    resetCreateJobSeekerExperienceForm,
  } = useJobSeekerExperience();

  const {
    jobSeekerSkill,
    setJobSeekerSkill,
    createJobSeekerSkillForm,
    setCreateJobSeekerSkillForm,
    handleChangeCreateJobSeekerSkillForm,
    handleCreateJobSeekerSkill,
    handleDeleteJobSeekerSkill,
    resetCreateJobSeekerSkillForm,
  } = useJobSeekerSkill();

  const {
    jobSeekerCertification,
    setJobSeekerCertification,
    createJobSeekerCertificationForm,
    setCreateJobSeekerCertificationForm,
    handleChangeCreateJobSeekerCertificationForm,
    handleCreateJobSeekerCertification,
    handleDeleteJobSeekerCertification,
    resetCreateJobSeekerCertificationForm,
  } = useJobSeekerCertification();

  const { majorOptions, handleSetMajorOptionFilter } = useOptions();

  // State & Ref Searchable Select untuk Jurusan di Modal Pendidikan
  const [modalMajorQuery, setModalMajorQuery] = useState("");
  const [isModalMajorOpen, setIsModalMajorOpen] = useState(false);
  const modalMajorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalMajorRef.current &&
        !modalMajorRef.current.contains(event.target as Node)
      ) {
        setIsModalMajorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredModalMajors = majorOptions.filter((m) =>
    m.nama_jurusan.toLowerCase().includes(modalMajorQuery.toLowerCase()),
  );

  const { user } = useAuthUser();

  // --- MODAL STATES ---
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] =
    useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* HEADER EDIT PROFIL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard/pencaker/profil"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-app-navy-700 hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Profil
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Edit Profil Pencaker
          </h1>
          <p className="text-xs text-slate-500">
            Perbarui data diri, riwayat pendidikan, pengalaman, dan keahlian
            Anda secara berkala.
          </p>
        </div>
      </div>

      {/* NAVIGASI TAB UTAMA (4 BAGIAN EDIT) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab("pribadi")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pribadi"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Data Pribadi</span>
          </button>

          <button
            onClick={() => setActiveTab("pendidikan")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pendidikan"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Pendidikan</span>
          </button>

          <button
            onClick={() => setActiveTab("pengalaman")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pengalaman"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Pengalaman</span>
          </button>

          <button
            onClick={() => setActiveTab("keahlian")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "keahlian"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Keahlian & Sertifikasi</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TAB 1: EDIT DATA PRIBADI */}
      {/* ========================================================================= */}
      {activeTab === "pribadi" && (
        <form className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* UPLOAD FOTO PROFIL */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Foto Profil
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-100 shrink-0">
                {jobSeekerProfilePictureFile ? (
                  <Image
                    src={URL.createObjectURL(jobSeekerProfilePictureFile)}
                    alt="Preview Foto Profil"
                    fill
                    className="object-cover"
                  />
                ) : jobSeekerProfile?.profile_photo_url ? (
                  <Image
                    src={`${APP_CONFIG.STORAGE_URL}${jobSeekerProfile?.profile_photo_url}`}
                    alt="Foto Profil"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full flex-col justify-center text-3xl font-medium items-center text-slate-500">
                    {user?.full_name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" /> Unggah Foto Baru
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setJobSeekerProfilePictureFile(file);
                        }
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-colors"
                  >
                    Hapus
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Format JPG, PNG, atau WEBP. Maksimal ukuran 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* FORM IDENTITAS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Identitas Pengguna
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="full_name"
                  disabled
                  value={updateJobSeekerProfileForm.full_name ?? ""}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  value={updateJobSeekerProfileForm.headline ?? ""}
                  onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={user?.email}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Telepon / WhatsApp *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={updateJobSeekerProfileForm.phone}
                  onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Kelamin *
                </label>
                <select
                  value={updateJobSeekerProfileForm.gender ?? ""}
                  name="gender"
                  onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white"
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    name="birth_place"
                    value={updateJobSeekerProfileForm.birth_place ?? ""}
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={
                      updateJobSeekerProfileForm.date_of_birth?.split("T")[0] ??
                      ""
                    }
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ringkasan Professional
              </label>
              <textarea
                rows={5}
                name="summary"
                value={updateJobSeekerProfileForm.summary ?? ""}
                onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pendidikan Terakhir
                </label>
                <select
                  value={updateJobSeekerProfileForm.highest_education ?? ""}
                  name="highest_education"
                  onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-app-navy-600"
                >
                  <option value="">Pilih Pendidikan Terakhir</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="S-1">S-1</option>
                  <option value="S-2">S-2</option>
                  <option value="S-3">S-3</option>
                </select>
              </div>
            </div>
          </div>

          {/* FORM ALAMAT DOMISILI */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Alamat Domisili
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap (Jalan / RT / RW / No. Rumah)
                </label>
                <textarea
                  rows={2}
                  name="address"
                  value={updateJobSeekerProfileForm.address ?? ""}
                  onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Kecamatan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kecamatan
                  </label>
                  <select
                    value={updateJobSeekerProfileForm.district_code ?? ""}
                    name="district_code"
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-app-navy-600"
                  >
                    <option value="">Pilih Kecamatan</option>
                    {districtsList?.map((district) => (
                      <option
                        key={`${district.code}`}
                        value={`${district.code}`}
                      >
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kabupaten / Kota */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kabupaten / Kota
                  </label>
                  <select
                    value={updateJobSeekerProfileForm.regency_name ?? ""}
                    name="regency_name"
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-app-navy-600"
                  >
                    <option value="">Pilih Kabupaten / Kota</option>
                    <option value="Kabupaten Sumbawa">Kabupaten Sumbawa</option>
                  </select>
                </div>

                {/* Provinsi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Provinsi
                  </label>
                  <select
                    value={updateJobSeekerProfileForm.province_name ?? ""}
                    name="province_name"
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-app-navy-600"
                  >
                    <option value="">Pilih Provinsi</option>
                    <option value="Nusa Tenggara Barat">
                      Nusa Tenggara Barat
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={updateJobSeekerProfileForm.postal_code ?? ""}
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FORM TAUTAN / SOSIAL MEDIA */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Tautan Profesional
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link LinkedIn
                </label>
                <div className="relative">
                  <FaLinkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    name="linkedin_url"
                    value={updateJobSeekerProfileForm.linkedin_url ?? ""}
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link GitHub
                </label>
                <div className="relative">
                  <FaGithub className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    name="github_url"
                    value={updateJobSeekerProfileForm.github_url ?? ""}
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link Portofolio
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    name="portfolio_url"
                    value={updateJobSeekerProfileForm.portfolio_url ?? ""}
                    onChange={(e) => handleChangeUpdateJobSeekerProfileForm(e)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-6 py-2.5 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 2: EDIT PENDIDIKAN */}
      {/* ========================================================================= */}
      {activeTab === "pendidikan" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Riwayat Pendidikan
              </h3>
              <p className="text-[11px] text-slate-500">
                Daftar pendidikan formal atau perguruan tinggi yang pernah
                ditempuh.
              </p>
            </div>
            <button
              onClick={() => setIsEducationModalOpen(true)}
              className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> Tambah Pendidikan
            </button>
          </div>

          <div className="space-y-4">
            {jobSeekerEducation && jobSeekerEducation.length > 0 ? (
              jobSeekerEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-app-navy-100 text-app-navy-800 font-bold text-[10px] rounded">
                        {edu.degree}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        {edu.institution}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      {edu.major}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Tahun {edu.start_date} - {edu.end_date} • IPK/Nilai:{" "}
                      {edu.grade}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() =>
                        handleDeleteJobSeekerEducation(edu.id.toString())
                      }
                      className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Belum ada riwayat pendidikan yang ditambahkan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 3: EDIT PENGALAMAN */}
      {/* ========================================================================= */}
      {activeTab === "pengalaman" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Pengalaman Kerja, Magang & Organisasi
              </h3>
              <p className="text-[11px] text-slate-500">
                Kelola riwayat karir profesional maupun kegiatan organisasi
                Anda.
              </p>
            </div>
            <button
              onClick={() => setIsExperienceModalOpen(true)}
              className={`px-4 py-2 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0
              bg-app-navy-600 hover:bg-app-navy-700`}
            >
              <Plus className="w-4 h-4" /> Tambah Pengalaman
            </button>
          </div>

          {/* OPSI BELUM MEMILIKI PENGALAMAN */}
          {jobSeekerExperience.length === 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
              <input
                type="checkbox"
                id="noExp"
                checked={user?.profile?.is_fresh_graduate}
                onChange={(e) => handleToggleFreshGraduateStatus()}
                className="w-4 h-4 text-app-navy-600 rounded border-amber-300 focus:ring-app-navy-500"
              />
              <label
                htmlFor="noExp"
                className="text-xs font-bold text-amber-900 cursor-pointer"
              >
                Saya adalah lulusan baru (Fresh Graduate) dan belum memiliki
                pengalaman kerja.
              </label>
            </div>
          )}

          <div className="space-y-4">
            {jobSeekerExperience && jobSeekerExperience.length > 0 ? (
              jobSeekerExperience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] rounded">
                          {employmentTypeMap[exp.employment_type]}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {exp.job_title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{exp.company_name}</span>
                        </div>

                        {exp.location && (
                          <>
                            <span className="text-slate-300">•</span>
                            <div className="flex items-center gap-1 text-slate-500">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{exp.location}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {exp.start_date} -{" "}
                        {exp.is_current ? "Sekarang" : exp.end_date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleDeleteJobSeekerExperience(exp.id.toString())
                        }
                        className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200/60">
                    {exp.description && (
                      <p>
                        <strong className="text-slate-800">Deskripsi:</strong>{" "}
                        {exp.description}
                      </p>
                    )}
                    <p>
                      <strong className="text-slate-800">
                        Tanggung Jawab:
                      </strong>{" "}
                      {exp.responsibilities}
                    </p>
                    {exp.achievements && (
                      <p>
                        <strong className="text-slate-800">Pencapaian:</strong>{" "}
                        {exp.achievements}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Belum ada riwayat pengalaman kerja yang ditambahkan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB 4: EDIT KEAHLIAN & SERTIFIKASI */}
      {/* ========================================================================= */}
      {activeTab === "keahlian" && (
        <div className="space-y-8">
          {/* SEKSI KEAHLIAN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Keahlian & Competency
                </h3>
                <p className="text-[11px] text-slate-500">
                  Daftar skill teknis, nonteknis, software, maupun kemampuan
                  bahasa.
                </p>
              </div>
              <button
                onClick={() => setIsSkillModalOpen(true)}
                className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Keahlian
              </button>
            </div>

            {jobSeekerSkill && jobSeekerSkill.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobSeekerSkill.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-bold uppercase text-app-navy-700 block">
                        {skill.skill_category}
                      </span>
                      <p className="text-xs font-bold text-slate-800">
                        {skill.skill_name}
                      </p>
                      <span className="text-[10px] text-slate-500">
                        Tingkat: {skill.proficiency_level}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleDeleteJobSeekerSkill(skill.id.toString())
                      }
                      className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Belum ada keahlian yang ditambahkan.
                </p>
              </div>
            )}
          </div>

          {/* SEKSI SERTIFIKASI */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Sertifikat Kompetensi
                </h3>
                <p className="text-[11px] text-slate-500">
                  Unggah sertifikat resmi pendukung kualifikasi kerja Anda.
                </p>
              </div>
              <button
                onClick={() => setIsCertificationModalOpen(true)}
                className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tambah Sertifikasi
              </button>
            </div>

            {jobSeekerCertification && jobSeekerCertification.length > 0 ? (
              <div className="space-y-3">
                {jobSeekerCertification.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-6 h-6 text-app-navy-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {cert.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Penerbit: {cert.issuer} | Tanggal:{" "}
                          {formatDateWithMonthName(cert.issue_date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cert.certificate_file_url && (
                        <a
                          href={`${APP_CONFIG.STORAGE_URL}${cert.certificate_file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          title="Unduh Sertifikat"
                          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteJobSeekerCertification(cert.id.toString())
                        }
                        title="Hapus Sertifikat"
                        className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Belum ada sertifikasi yang ditambahkan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL POPUPS FOR ADDING ITEMS */}
      {/* ========================================================================= */}

      {/* MODAL TAMBAH PENDIDIKAN */}
      <AnimatePresence>
        {isEducationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Tambah Riwayat Pendidikan
                </h3>
                <button onClick={() => setIsEducationModalOpen(false)}>
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenjang Pendidikan
                  </label>
                  <select
                    name="degree"
                    value={createJobSeekerEducationForm.degree}
                    onChange={(e) => {
                      handleChangeCreateJobSeekerEducationForm(e);
                      handleSetMajorOptionFilter(e.target.value);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value={""}>Pilih Jenjang</option>
                    <option value={"SMA"}>SMA</option>
                    <option value={"Diploma"}>Diploma</option>
                    <option value={"S1"}>S1</option>
                    <option value={"S2"}>S2</option>
                    <option value={"S3"}>S3</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Institusi / Universitas
                  </label>
                  <input
                    name="institution"
                    value={createJobSeekerEducationForm.institution}
                    type="text"
                    onChange={handleChangeCreateJobSeekerEducationForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="Contoh: Universitas Mataram"
                  />
                </div>

                {/* Jurusan / Program Studi dengan majorOptions Searchable Select */}
                <div className="relative" ref={modalMajorRef}>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jurusan / Program Studi
                  </label>
                  <div
                    onClick={() => setIsModalMajorOpen(!isModalMajorOpen)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
                  >
                    <span
                      className={
                        createJobSeekerEducationForm.major
                          ? "text-slate-800 font-bold"
                          : "text-slate-400 font-medium"
                      }
                    >
                      {createJobSeekerEducationForm.major ||
                        "Pilih atau cari jurusan..."}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>

                  {isModalMajorOpen && (
                    <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                      <div className="relative">
                        <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Cari jurusan..."
                          value={modalMajorQuery}
                          onChange={(e) => setModalMajorQuery(e.target.value)}
                          className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-app-navy-600"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        <div
                          onClick={() => {
                            setCreateJobSeekerEducationForm((prev: any) => ({
                              ...prev,
                              major: "",
                            }));
                            setIsModalMajorOpen(false);
                          }}
                          className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                            createJobSeekerEducationForm.major === ""
                              ? "bg-app-navy-50 text-app-navy-800 font-bold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>Pilih Jurusan</span>
                          {createJobSeekerEducationForm.major === "" && (
                            <Check className="w-3.5 h-3.5 text-app-navy-700" />
                          )}
                        </div>
                        {filteredModalMajors.length > 0 ? (
                          filteredModalMajors.map((major) => {
                            const isSelected =
                              createJobSeekerEducationForm.major ===
                              major.nama_jurusan;
                            return (
                              <div
                                key={major.id}
                                onClick={() => {
                                  setCreateJobSeekerEducationForm(
                                    (prev: any) => ({
                                      ...prev,
                                      major: major.nama_jurusan,
                                    }),
                                  );
                                  setIsModalMajorOpen(false);
                                }}
                                className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                                  isSelected
                                    ? "bg-app-navy-50 text-app-navy-800 font-bold"
                                    : "hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                <span>
                                  {major.nama_jurusan}
                                  {major.jenjang ? ` (${major.jenjang})` : ""}
                                </span>
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-app-navy-700" />
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

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tahun Masuk
                    </label>
                    <input
                      type="text"
                      name="start_date"
                      value={createJobSeekerEducationForm.start_date}
                      onChange={handleChangeCreateJobSeekerEducationForm}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      placeholder="2018"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tahun Lulus
                    </label>
                    <input
                      type="text"
                      name="end_date"
                      value={createJobSeekerEducationForm.end_date}
                      onChange={handleChangeCreateJobSeekerEducationForm}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                      placeholder="2022"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    IPK / Nilai Akhir
                  </label>
                  <input
                    type="text"
                    name="grade"
                    value={createJobSeekerEducationForm.grade}
                    onChange={handleChangeCreateJobSeekerEducationForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="Contoh: 3.72"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => {
                    resetCreateJobSeekerEducationForm();
                    setIsEducationModalOpen(false);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    handleCreateJobSeekerEducation();
                    resetCreateJobSeekerEducationForm();
                    setIsEducationModalOpen(false);
                  }}
                  className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL TAMBAH PENGALAMAN */}
      <AnimatePresence>
        {isExperienceModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Tambah Pengalaman
                </h3>
                <button
                  onClick={() => {
                    resetCreateJobSeekerExperienceForm();
                    setIsExperienceModalOpen(false);
                  }}
                >
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto space-y-3 text-xs pr-1">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jenis Pengalaman
                  </label>
                  <select
                    name="employment_type"
                    value={createJobSeekerExperienceForm.employment_type}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  >
                    <option value="">Pilih Jenis Pengalaman</option>
                    <option value="full_time">Penuh Waktu</option>
                    <option value="part_time">Paruh Waktu</option>
                    <option value="contract">Kontrak</option>
                    <option value="internship">Magang (Internship)</option>
                    <option value="freelance">Freelance</option>
                    <option value="organization">
                      Organisasi / Sukarelawan
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={createJobSeekerExperienceForm.company_name}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="Contoh: PT Teknologi Maju"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={createJobSeekerExperienceForm.location}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="Contoh: Sumbawa, Sumbawa Barat"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jabatan / Posisi
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={createJobSeekerExperienceForm.job_title}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="Contoh: Frontend Developer"
                  />
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Tahun Masuk
                      </label>
                      <input
                        type="text"
                        name="start_date"
                        value={createJobSeekerExperienceForm.start_date}
                        onChange={handleChangeCreateJobSeekerExperienceForm}
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                        placeholder="2018"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Tahun Keluar
                      </label>
                      <input
                        type="text"
                        name="end_date"
                        value={
                          createJobSeekerExperienceForm.is_current
                            ? ""
                            : createJobSeekerExperienceForm.end_date
                        }
                        disabled={createJobSeekerExperienceForm.is_current}
                        onChange={handleChangeCreateJobSeekerExperienceForm}
                        className={`w-full p-2.5 rounded-xl border border-slate-200 ${
                          createJobSeekerExperienceForm.is_current
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : ""
                        }`}
                        placeholder={
                          createJobSeekerExperienceForm.is_current
                            ? "Sekarang"
                            : "2022"
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="is_current"
                      name="is_current"
                      checked={
                        createJobSeekerExperienceForm.is_current || false
                      }
                      onChange={handleChangeCreateJobSeekerExperienceForm}
                      className="w-4 h-4 rounded border-slate-300 text-app-navy-600 focus:ring-app-navy-500"
                    />
                    <label
                      htmlFor="is_current"
                      className="text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      Saya masih bekerja di sini
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Deskripsi Pekerjaan
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={createJobSeekerExperienceForm.description}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Deskripsi Tanggung Jawab
                  </label>
                  <textarea
                    rows={3}
                    name="responsibilities"
                    value={createJobSeekerExperienceForm.responsibilities}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Pencapaian
                  </label>
                  <textarea
                    rows={3}
                    name="achievements"
                    value={createJobSeekerExperienceForm.achievements}
                    onChange={handleChangeCreateJobSeekerExperienceForm}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => {
                    resetCreateJobSeekerExperienceForm();
                    setIsExperienceModalOpen(false);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    handleCreateJobSeekerExperience();
                    resetCreateJobSeekerExperienceForm();
                    setIsExperienceModalOpen(false);
                  }}
                  className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL TAMBAH KEAHLIAN */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Keahlian
              </h3>
              <button onClick={() => setIsSkillModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label
                  htmlFor="skill_category"
                  className="block font-bold text-slate-700 mb-1"
                >
                  Kategori Skill
                </label>

                <select
                  id="skill_category"
                  name="skill_category"
                  value={createJobSeekerSkillForm.skill_category}
                  onChange={handleChangeCreateJobSeekerSkillForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="">Pilih Kategori Skill</option>
                  <option value="technical">Keahlian Teknis</option>
                  <option value="soft_skill">Keahlian Nonteknis</option>
                  <option value="software_tools">Software & Tools</option>
                  <option value="language">Kemampuan Bahasa</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Keahlian / Tool
                </label>
                <input
                  type="text"
                  name="skill_name"
                  value={createJobSeekerSkillForm.skill_name}
                  onChange={handleChangeCreateJobSeekerSkillForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  placeholder="Contoh: ArcGIS, Public Speaking"
                />
              </div>

              <div>
                <label
                  htmlFor="proficiency_level"
                  className="block font-bold text-slate-700 mb-1"
                >
                  Tingkat Kemampuan
                </label>

                <select
                  id="proficiency_level"
                  name="proficiency_level"
                  value={createJobSeekerSkillForm.proficiency_level}
                  onChange={handleChangeCreateJobSeekerSkillForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="">Pilih Tingkat Kemampuan</option>
                  <option value="Beginner">Pemula (Basic)</option>
                  <option value="Intermediate">Menengah (Intermediate)</option>
                  <option value="Advanced">Lanjutan (Advanced)</option>
                </select>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  resetCreateJobSeekerSkillForm();
                  setIsSkillModalOpen(false);
                }}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleCreateJobSeekerSkill();
                  resetCreateJobSeekerSkillForm();
                  setIsSkillModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH SERTIFIKASI */}
      {isCertificationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Sertifikasi
              </h3>
              <button onClick={() => setIsCertificationModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Sertifikat / Kompetensi
                </label>
                <input
                  type="text"
                  name="name"
                  value={createJobSeekerCertificationForm.name}
                  onChange={handleChangeCreateJobSeekerCertificationForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lembaga Penerbit
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={createJobSeekerCertificationForm.issuer}
                  onChange={handleChangeCreateJobSeekerCertificationForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tanggal Penerbitan
                </label>
                <input
                  type="date"
                  name="issue_date"
                  value={createJobSeekerCertificationForm.issue_date}
                  onChange={handleChangeCreateJobSeekerCertificationForm}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  File Sertifikat (PDF)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <FileText className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">
                      {createJobSeekerCertificationForm?.certificate_file_url
                        ?.name || "Klik untuk upload atau drag & drop"}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      PDF (Maks. ukuran file menyesuaikan)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="certificate_file_url"
                    accept=".pdf,application/pdf"
                    onChange={handleChangeCreateJobSeekerCertificationForm}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  resetCreateJobSeekerCertificationForm();
                  setIsCertificationModalOpen(false);
                }}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleCreateJobSeekerCertification();
                  resetCreateJobSeekerCertificationForm();
                  setIsCertificationModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
