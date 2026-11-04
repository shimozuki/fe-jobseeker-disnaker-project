"use client";

import React, { useState } from "react";
import {
  Coffee,
  HeartHandshake,
  ShieldCheck,
  GraduationCap,
  Laptop,
  Clock,
  Car,
  Plane,
  Gift,
  Smile,
  Plus,
} from "lucide-react";
import Modal from "@/shared/components/Modal";

// Pilihan Icon untuk Fasilitas
const ICON_OPTIONS = [
  { name: "Coffee", icon: Coffee, label: "Fasilitas Kantor / Konsumsi" },
  {
    name: "HeartHandshake",
    icon: HeartHandshake,
    label: "Kesehatan / Asuransi",
  },
  { name: "ShieldCheck", icon: ShieldCheck, label: "Tunjangan / Jaminan" },
  { name: "GraduationCap", icon: GraduationCap, label: "Pengembangan diri" },
  { name: "Laptop", icon: Laptop, label: "Perangkat & Alat Kerja" },
  { name: "Clock", icon: Clock, label: "Jam Kerja Fleksibel" },
  { name: "Car", icon: Car, label: "Transportasi" },
  { name: "Plane", icon: Plane, label: "Cuti / Liburan" },
  { name: "Gift", icon: Gift, label: "Bonus / Gift" },
];

interface AddFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFacility: (facilityName: string) => void;
}

export default function AddFacilityModal({
  isOpen,
  onClose,
  onAddFacility,
}: AddFacilityModalProps) {
  const [facilityName, setFacilityName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Kesehatan & Kesejahteraan",
  );
  const [selectedIcon, setSelectedIcon] = useState("Coffee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityName.trim()) return;

    // Menambahkan fasilitas baru
    onAddFacility(facilityName.trim());

    // Reset form & tutup modal
    setFacilityName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Fasilitas & Benefit Karyawan"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Fasilitas */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nama Fasilitas / Benefit <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Asuransi Kesehatan Swasta, Laptop Apple M Series"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Kategori Benefit */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Kategori Benefit
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
          >
            <option>Kesehatan & Kesejahteraan</option>
            <option>Waktu Kerja & Fleksibilitas</option>
            <option>Pengembangan Karir & Pelatihan</option>
            <option>Tunjangan Finansial & Bonus</option>
            <option>Fasilitas Kantor & Entertainment</option>
          </select>
        </div>

        {/* Pilih Ikon Visual */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Pilih Ikon Fasilitas
          </label>
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
            {ICON_OPTIONS.map((item) => {
              const IconComponent = item.icon;
              const isSelected = selectedIcon === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedIcon(item.name)}
                  title={item.label}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 text-teal-600 ring-2 ring-teal-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-xs shadow-teal-600/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Fasilitas</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
