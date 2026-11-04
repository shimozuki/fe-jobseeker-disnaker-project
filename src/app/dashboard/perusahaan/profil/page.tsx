/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Phone,
  Globe,
  MapPin,
  Mail,
  User,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  FileText,
  AlertCircle,
  Save,
  Sparkles,
  Heart,
  Smile,
  Coffee,
  Briefcase,
} from "lucide-react";
import AddFacilityModal from "@/features/dashboard-perusahaan/components/AddFacilityModal"; // Sesuaikan path jika perlu

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "identitas" | "kontak" | "budaya" | "media" | "verifikasi"
  >("identitas");

  // State untuk kontrol Modal Tambah Fasilitas
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);

  // State Dokumen Legalitas (Mendukung simulasi upload pertama kali / belum diunggah)
  const [legalDocuments, setLegalDocuments] = useState([
    {
      id: "nib",
      name: "NIB (Nomor Induk Berusaha)",
      desc: "Resmi diterbitkan melalui sistem OSS Indonesia",
      status: "verified", // verified | waiting | rejected | empty
      statusLabel: "Disetujui",
      file: "NIB_Samawa_Digital_2024.pdf",
    },
    {
      id: "akta",
      name: "Akta Pendirian PT & Perubahan",
      desc: "Akta pendirian beserta SK Kemenkumham",
      status: "verified",
      statusLabel: "Disetujui",
      file: "Akta_Pendirian_PT_Samawa.pdf",
    },
    {
      id: "npwp",
      name: "NPWP Badan Perusahaan",
      desc: "Nomor Pokok Wajib Pajak atas nama badan usaha",
      status: "waiting",
      statusLabel: "Menunggu Review",
      file: "NPWP_PT_Samawa_Digital.pdf",
    },
    {
      id: "domisili",
      name: "Surat Domisili / Bukti Alamat Kantor",
      desc: "Surat keterangan domisili gedung / kantor aktif",
      status: "empty", // Belum diunggah sama sekali
      statusLabel: "Belum Diunggah",
      file: null,
    },
  ]);

  // State Form Dummy
  const [formData, setFormData] = useState({
    // A. Identitas
    companyName: "Samawa Digital Nusantara",
    legalName: "PT Samawa Digital Nusantara",
    companyType: "Perseroan Terbatas (PT)",
    foundedYear: "2021",
    companySize: "50 - 100 Karyawan",
    industry: "Teknologi Informasi & Perangkat Lunak",
    shortDescription:
      "Perusahaan teknologi penyedia solusi transformasi digital dan pengembang perangkat lunak berbasis di Sumbawa.",

    // B. Kontak
    email: "hrd@samawadigital.co.id",
    phone: "+62 812-3456-7890",
    website: "https://samawadigital.co.id",
    address: "Jl. Lintas Sumbawa - Bima Km. 4, Unter Iwes",
    regency: "Kabupaten Sumbawa",
    province: "Nusa Tenggara Barat",
    hrContactName: "Rian Hidayat",
    hrContactRole: "Head of People & Culture",
    hrContactEmail: "rian@samawadigital.co.id",

    // C. Budaya
    about:
      "PT Samawa Digital Nusantara adalah penyedia layanan teknologi terdepan yang berfokus pada digitalisasi sektor publik dan swasta. Kami berkomitmen menciptakan dampak nyata melalui inovasi perangkat lunak.",
    vision:
      "Menjadi penggerak utama ekosistem digital berbasis daerah yang berdaya saing global.",
    mission:
      "1. Membangun produk digital berdampak tinggi.\n2. Mengembangkan bakat talenta lokal berkualitas.",
    values: [
      "Inovasi Berkelanjutan",
      "Integritas & Transparansi",
      "Kolaborasi",
    ],
    workCulture:
      "Lingkungan kerja yang fleksibel, berbasis hasil, serta mengutamakan keterbukaan dan pengembangan potensi tim.",
    facilities: [
      "BPJS Ketenagakerjaan & Kesehatan",
      "Jam Kerja Fleksibel",
      "Sponsor Sertifikasi Tech",
      "Tunjangan Kopi & Snack",
    ],

    // D. Media
    socialLinkedin: "https://linkedin.com/company/samawadigital",
    socialInstagram: "https://instagram.com/samawadigital",
    videoUrl: "https://youtube.com/watch?v=sample",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan profil berhasil disimpan!");
  };

  const handleAddFacility = (newFacility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, newFacility],
    }));
  };

  return (
    <div className="w-full space-y-6 mx-auto">
      {/* MODAL TAMBAH FASILITAS */}
      <AddFacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
        onAddFacility={handleAddFacility}
      />

      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 p-1 shrink-0 overflow-hidden group">
            <Image
              src="/images/karir-logo-1.png"
              alt="Logo Perusahaan"
              fill
              className="object-contain p-1"
            />
            <label className="absolute inset-0 bg-slate-900/60 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Upload className="w-4 h-4 mb-0.5" />
              <span className="text-[0.55rem]">Ganti Logo</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">
                {formData.companyName}
              </h1>
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">
                <CheckCircle2 className="w-3 h-3 text-teal-600" /> Terverifikasi
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {formData.industry} • {formData.regency}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/perusahaan-list/preview"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Tampilan Publik</span>
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-xs shadow-teal-600/20 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {/* TAB NAVIGASI PROFIL */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px scrollbar-none">
        {[
          { id: "identitas", label: "Informasi Identitas", icon: Building2 },
          { id: "kontak", label: "Informasi Kontak", icon: Phone },
          { id: "budaya", label: "Budaya & Fasilitas", icon: Heart },
          { id: "media", label: "Media & Dokumentasi", icon: Sparkles },
          {
            id: "verifikasi",
            label: "Status Verifikasi",
            icon: ShieldCheck,
            badge: "Terverifikasi",
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-teal-600 text-teal-700 font-bold bg-white rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-slate-400"}`}
              />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 text-[0.55rem] font-bold rounded-md bg-teal-100 text-teal-700">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CONTENT SECTIONS */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* SEKSI A: INFORMASI IDENTITAS */}
        {activeTab === "identitas" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Identitas Perusahaan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Brand Perusahaan
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Legal Perusahaan (Sesuai Akta)
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) =>
                    setFormData({ ...formData, legalName: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Badan Usaha
                </label>
                <select
                  value={formData.companyType}
                  onChange={(e) =>
                    setFormData({ ...formData, companyType: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                >
                  <option>Perseroan Terbatas (PT)</option>
                  <option>Commanditaire Vennootschap (CV)</option>
                  <option>BUMD / BUMN</option>
                  <option>Yayasan / NGO</option>
                  <option>Perorangan / UMKM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industri / Bidang Usaha
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tahun Berdiri
                </label>
                <input
                  type="text"
                  value={formData.foundedYear}
                  onChange={(e) =>
                    setFormData({ ...formData, foundedYear: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ukuran / Skala Perusahaan
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) =>
                    setFormData({ ...formData, companySize: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                >
                  <option>1 - 10 Karyawan</option>
                  <option>11 - 50 Karyawan</option>
                  <option>50 - 100 Karyawan</option>
                  <option>100 - 500 Karyawan</option>
                  <option>500+ Karyawan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deskripsi Singkat (Ringkasan 1-2 Kalimat)
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SEKSI B: INFORMASI KONTAK */}
        {activeTab === "kontak" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Kontak & Lokasi Kantor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Perusahaan
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Telepon Kantor
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website Resmi
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kabupaten / Kota
                </label>
                <input
                  type="text"
                  value={formData.regency}
                  onChange={(e) =>
                    setFormData({ ...formData, regency: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Lengkap Kantor
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-800 mb-3">
                Kontak Penanggung Jawab HR / Recruiter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Nama Lengkap HR
                  </label>
                  <input
                    type="text"
                    value={formData.hrContactName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hrContactName: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Jabatan / Posisi
                  </label>
                  <input
                    type="text"
                    value={formData.hrContactRole}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hrContactRole: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Email Kontak HR
                  </label>
                  <input
                    type="email"
                    value={formData.hrContactEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hrContactEmail: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKSI C: PROFIL DAN BUDAYA PERUSAHAAN */}
        {activeTab === "budaya" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Profil, Visi, Misi & Budaya
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tentang Perusahaan (Lengkap)
              </label>
              <textarea
                rows={4}
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Visi Perusahaan
                </label>
                <textarea
                  rows={3}
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Misi Perusahaan
                </label>
                <textarea
                  rows={3}
                  value={formData.mission}
                  onChange={(e) =>
                    setFormData({ ...formData, mission: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Budaya & Lingkungan Kerja
              </label>
              <textarea
                rows={3}
                value={formData.workCulture}
                onChange={(e) =>
                  setFormData({ ...formData, workCulture: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Fasilitas Karyawan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Fasilitas & Benefit Karyawan
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-medium"
                  >
                    <Coffee className="w-3.5 h-3.5 text-teal-600" />
                    <span>{fac}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          facilities: formData.facilities.filter(
                            (_, i) => i !== idx,
                          ),
                        })
                      }
                      className="text-teal-600 hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Buka Modal saat tombol diklik */}
                <button
                  type="button"
                  onClick={() => setIsFacilityModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-teal-600 hover:border-teal-500 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Fasilitas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEKSI D: MEDIA PERUSAHAAN (DENGAN INPUT FILE UNGGAH FOTO) */}
        {activeTab === "media" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Foto, Video Profil & Media Sosial
            </h2>

            {/* Upload Foto Kantor dengan Input File Fungsional */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Galeri Foto Kantor & Kegiatan (Maks. 5 Foto)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Contoh Slot Foto yang sudah terunggah */}
                <div className="relative aspect-video rounded-xl border border-slate-200 bg-slate-100 overflow-hidden group">
                  <Image
                    src="/images/karir-logo-1.png"
                    alt="Kantor 1"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Slot Unggah Foto Baru Pertama Kali / Tambahan */}
                <label className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors flex flex-col items-center justify-center text-slate-400 cursor-pointer">
                  <Upload className="w-5 h-5 mb-1 text-slate-400" />
                  <span className="text-[0.65rem] font-medium">
                    Unggah Foto
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                </label>
              </div>
              <p className="text-[0.65rem] text-slate-400 mt-1.5">
                Format yang didukung: JPG, JPEG, PNG. Ukuran maksimal per foto
                5MB.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link Video Profil (Youtube / Vimeo)
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Perusahaan
                </label>
                <input
                  type="text"
                  value={formData.socialLinkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, socialLinkedin: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram Perusahaan
                </label>
                <input
                  type="text"
                  value={formData.socialInstagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialInstagram: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SEKSI E: STATUS VERIFIKASI */}
        {activeTab === "verifikasi" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Status Verifikasi & Legalitas Akun
                </h2>
                <p className="text-xs text-slate-500">
                  Unggah dan kelola dokumen legalitas perusahaan untuk
                  mendapatkan lencana terverifikasi resmi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold w-fit">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> Terverifikasi
                Resmi
              </span>
            </div>

            {/* Detail Ringkas & Catatan Admin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
                  Detail Ringkas Verifikasi
                </span>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Berkas:</span>
                  <span className="font-semibold text-slate-900">
                    4 Jenis Dokumen Legal
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Status Keseluruhan:</span>
                  <span className="font-semibold text-teal-600">
                    2 Disetujui, 1 Review, 1 Belum Diunggah
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Masa Berlaku Status:</span>
                  <span className="font-semibold text-teal-600">
                    Aktif Permanen
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <span className="text-[0.65rem] font-bold text-amber-800 uppercase tracking-wider block">
                  Catatan Administrator
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {
                    "Mohon segera unggah dokumen Surat Domisili/Bukti Alamat Kantor agar verifikasi akun perusahaan dapat diproses sepenuhnya."
                  }
                </p>
              </div>
            </div>

            {/* Daftar Dokumen Legalitas & Area Upload */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 mb-3">
                Kelengkapan Dokumen Legalitas Perusahaan
              </h3>
              <div className="space-y-3">
                {legalDocuments.map((doc, idx) => {
                  let badgeStyle = "bg-teal-100 text-teal-700 border-teal-200";
                  let IconStatus = FileCheck;

                  if (doc.status === "waiting") {
                    badgeStyle = "bg-amber-100 text-amber-700 border-amber-200";
                    IconStatus = AlertCircle;
                  } else if (doc.status === "rejected") {
                    badgeStyle = "bg-rose-100 text-rose-700 border-rose-200";
                    IconStatus = AlertCircle;
                  } else if (doc.status === "empty") {
                    badgeStyle = "bg-slate-100 text-slate-500 border-slate-200";
                    IconStatus = AlertCircle;
                  }

                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-white gap-3 transition-all hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-teal-600 shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-bold text-slate-900">
                              {doc.name}
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-md border ${badgeStyle}`}
                            >
                              <IconStatus className="w-3 h-3" />{" "}
                              {doc.statusLabel}
                            </span>
                          </div>
                          <p className="text-[0.65rem] text-slate-500 mt-0.5">
                            {doc.desc} •{" "}
                            {doc.file ? (
                              <span className="text-slate-700 font-medium">
                                {doc.file}
                              </span>
                            ) : (
                              <span className="text-rose-500 font-medium italic">
                                Belum ada berkas terlampir
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Kondisi Tombol: Jika kosong tampilkan tombol "Upload Dokumen", jika sudah ada tampilkan "Ganti Berkas" */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {doc.status === "empty" ? (
                          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-teal-500 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                            <Upload className="w-3.5 h-3.5 text-teal-600" />
                            <span>Unggah Dokumen</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        ) : (
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5 text-slate-500" />
                            <span>Ganti Berkas</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
