"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Building,
  Briefcase,
  ArrowUpRight,
  Compass,
  Layers,
  ChevronRight,
  Sparkles,
  RotateCcw,
  MapPinOff,
} from "lucide-react";

interface RegionZone {
  id: string;
  zoneName: string;
  description: string;
  districts: {
    name: string;
    jobsCount: number;
    companiesCount: number;
    topIndustry: string;
    image: string;
    href: string;
  }[];
}

const zonesData: RegionZone[] = [
  {
    id: "pusat",
    zoneName: "Pusat & Kota",
    description:
      "Pusat pemerintahan, perdagangan, jasa, dan pendidikan tinggi.",
    districts: [
      {
        name: "Sumbawa Besar",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Pemerintahan & Jasa",
        image:
          "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=sumbawa-besar",
      },
      {
        name: "Unter Iwes",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Pendidikan & Perdagangan",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=unter-iwes",
      },
      {
        name: "Moyo Utara",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Perikanan & Peternakan",
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=moyo-utara",
      },
    ],
  },
  {
    id: "pesisir",
    zoneName: "Pesisir & Pelabuhan",
    description:
      "Kawasan maritim, transportasi laut, pariwisata bahari, dan perikanan.",
    districts: [
      {
        name: "Labuhan Badas",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Pariwisata & Logistik Pelabuhan",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=labuhan-badas",
      },
      {
        name: "Utan",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Perikanan & Budidaya Laut",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=utan",
      },
      {
        name: "Tarano",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Hasil Laut & Olahan",
        image:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=tarano",
      },
    ],
  },
  {
    id: "barat",
    zoneName: "Sumbawa Wilayah Barat",
    description:
      "Sentra perdagangan lintas wilayah, komoditas pangan, dan perikanan.",
    districts: [
      {
        name: "Alas",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Perdagangan & Perikanan",
        image:
          "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=alas",
      },
      {
        name: "Alas Barat",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Pertanian & Logistik Lintas",
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=alas-barat",
      },
      {
        name: "Buer",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Agrobisnis & UMKM",
        image:
          "https://images.unsplash.com/photo-1595838725982-12499d638c4c?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=buer",
      },
    ],
  },
  {
    id: "timur",
    zoneName: "Sumbawa Wilayah Timur",
    description:
      "Kawasan industri agrobisnis, perkebunan, dan peternakan skala daerah.",
    districts: [
      {
        name: "Plampang",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Pertanian & Agrobisnis",
        image:
          "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=plampang",
      },
      {
        name: "Empang",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Perkebunan & Jagung",
        image:
          "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=empang",
      },
      {
        name: "Maronge",
        jobsCount: 0,
        companiesCount: 0,
        topIndustry: "Peternakan & Jagung",
        image:
          "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=600&q=80",
        href: "/lowongan-kerja?lokasi=maronge",
      },
    ],
  },
];

export default function JobsByLocationSection() {
  const [activeZoneId, setActiveZoneId] = useState<string>(
    zonesData.length > 0 ? zonesData[0].id : "",
  );

  const activeZone =
    zonesData.find((zone) => zone.id === activeZoneId) || zonesData[0];

  return (
    <section className="relative bg-white py-16 font-['Poppins',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-2xl mb-5">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 border border-teal-200/80 mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>Peta Kerja Kabupaten Sumbawa</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Persebaran Lowongan Berdasarkan Wilayah
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
            Pilih zona wilayah untuk menemukan peluang karir yang dekat dengan
            tempat tinggal Anda di seluruh kecamatan se-Kabupaten Sumbawa.
          </p>
        </div>

        {zonesData.length > 0 ? (
          <>
            {/* Layout Utama: Tab Zona Navigasi Horizontal */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none border-b border-slate-100">
              {zonesData.map((zone) => {
                const isActive = zone.id === activeZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-teal-700 text-white shadow-sm ring-2 ring-teal-700/20"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                    }`}
                  >
                    <Layers
                      className={`h-3.5 w-3.5 ${
                        isActive ? "text-teal-200" : "text-slate-400"
                      }`}
                    />
                    <span>{zone.zoneName}</span>
                  </button>
                );
              })}
            </div>

            {/* Zona Info Banner */}
            {activeZone && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                    Zona Terpilih
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeZone.zoneName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeZone.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4 shrink-0">
                  <div>
                    <span className="text-slate-400 font-normal text-[10px] block">
                      Kecamatan
                    </span>
                    <span>{activeZone.districts.length} Wilayah</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-normal text-[10px] block">
                      Total Loker
                    </span>
                    <span className="text-teal-700 font-bold">
                      {activeZone.districts.reduce(
                        (acc, curr) => acc + curr.jobsCount,
                        0,
                      )}{" "}
                      Lowongan
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid Visual Cards Per Kecamatan */}
            {activeZone && activeZone.districts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeZone.districts.map((district) => (
                  <Link
                    key={district.name}
                    href={district.href}
                    className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col justify-between"
                  >
                    {/* Image & Overlay Header */}
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={district.image}
                        alt={district.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                      {/* Job Count Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-teal-800 shadow-sm border border-white/40 flex items-center gap-1">
                        <Briefcase className="h-3 w-3 text-teal-600" />
                        <span>{district.jobsCount} Lowongan</span>
                      </div>

                      {/* District Name inside Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                          <span className="text-xs font-bold drop-shadow-sm">
                            Kec. {district.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body Info */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                          <span className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5 text-slate-400" />
                            Perusahaan Aktif
                          </span>
                          <span className="font-semibold text-slate-800">
                            {district.companiesCount} Perusahaan
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block">
                            Sektor Dominan:
                          </span>
                          <span className="text-xs font-medium text-slate-700">
                            {district.topIndustry}
                          </span>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800 transition-colors">
                        <span>Jelajahi Lowongan</span>
                        <div className="p-1 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          /* EMPTY STATE / UI HANDLER KETIKA DATA ZONA KOSONG */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center space-y-4 shadow-sm mt-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <MapPinOff className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Belum Ada Data Wilayah
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Informasi sebaran lowongan berdasarkan zona wilayah kabupaten
                belum tersedia saat ini. Silakan periksa kembali nanti.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
