"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Users,
  GitMerge,
  BarChart3,
  Info,
  ChevronDown,
  CheckCircle2,
  ListOrdered,
  Calendar,
  Newspaper,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";

interface SubMenuItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: string | number;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  badge?: string | number;
  submenu?: SubMenuItem[];
}

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Lowongan");

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu((prev) => (prev === title ? null : title));
  };

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Lowongan",
      icon: Briefcase,
      href: "/dashboard/admin/lowongan",
      // submenu: [
      //   {
      //     title: "Semua Lowongan",
      //     href: "/dashboard/admin/lowongan",
      //     icon: Briefcase,
      //   },
      //   {
      //     title: "Verifikasi Lowongan",
      //     href: "/dashboard/admin/lowongan/verifikasi",
      //     icon: FileCheck2,
      //     badge: 5,
      //   },
      // ],
    },
    {
      title: "Perusahaan",
      href: "/dashboard/admin/perusahaan",
      icon: Building2,
      // submenu: [
      //   {
      //     title: "Semua Perusahaan",
      //     href: "/dashboard/admin/perusahaan",
      //     icon: Building2,
      //   },
      //   {
      //     title: "Verifikasi Perusahaan",
      //     href: "/dashboard/admin/perusahaan/verifikasi",
      //     icon: ShieldCheck,
      //     badge: 3,
      //   },
      // ],
    },
    {
      title: "Pelamar",
      href: "/dashboard/admin/pelamar",
      icon: Users,
    },
    // {
    //   title: "Rekrutmen",
    //   icon: GitMerge,
    //   submenu: [
    //     {
    //       title: "Tahapan Rekrutmen",
    //       href: "/dashboard/admin/rekrutmen/tahapan",
    //       icon: ListOrdered,
    //     },
    //     {
    //       title: "Jadwal Rekrutmen",
    //       href: "/dashboard/admin/rekrutmen/jadwal",
    //       icon: Calendar,
    //     },
    //   ],
    // },
    {
      title: "Laporan & Statistik",
      href: "/dashboard/admin/laporan",
      icon: BarChart3,
    },
    {
      title: "Informasi",
      icon: Info,
      submenu: [
        // {
        //   title: "Berita",
        //   href: "/dashboard/admin/informasi/berita",
        //   icon: Newspaper,
        // },
        // {
        //   title: "Pelatihan",
        //   href: "/dashboard/admin/informasi/pelatihan",
        //   icon: GraduationCap,
        // },
        {
          title: "Job Fair",
          href: "/dashboard/admin/informasi/job-fair",
          icon: Sparkles,
        },
      ],
    },
  ];

  const hide = ["/dashboard/admin/peta"].some((route) =>
    pathname.includes(route),
  );

  if (hide) return null;

  return (
    <aside className="w-64 h-screen bg-white text-slate-700 flex flex-col border-r border-slate-200 sticky top-0 left-0 z-40 select-none">
      {/* BRAND / LOGO */}
      <div className="pl-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-30 h-20 shrink-0">
            <Image
              src="/images/karir-logo-1.png"
              alt="Logo App"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </div>
        </Link>
      </div>

      {/* NAVIGATION MENU */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="px-3 pb-2 text-[0.625rem] font-bold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0);
          const isSubmenuOpen = openSubmenu === item.title;

          // Pengecualian khusus untuk menu Dashboard: hanya aktif jika pathname sama persis dengan href-nya
          const isDashboard = item.href === "/dashboard/admin";

          const isParentActive = isDashboard
            ? pathname === item.href
            : item.href
              ? pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              : item.submenu?.some(
                  (sub) =>
                    pathname === sub.href ||
                    (sub.href !== "/" && pathname.startsWith(sub.href)),
                );

          const isLinkActive = isDashboard
            ? pathname === item.href
            : pathname === item.href ||
              (item.href &&
                item.href !== "/" &&
                pathname.startsWith(item.href));

          return (
            <div key={item.title} className="space-y-0.5">
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isParentActive
                      ? "bg-teal-50/80 text-teal-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isParentActive
                          ? "text-teal-600"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[0.6rem] font-bold rounded-full bg-teal-100 text-teal-700">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isSubmenuOpen ? "rotate-180 text-slate-700" : ""
                      }`}
                    />
                  </div>
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isLinkActive
                      ? "bg-teal-600 text-white font-semibold shadow-sm shadow-teal-600/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isLinkActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[0.6rem] font-bold rounded-full ${
                        isLinkActive
                          ? "bg-white/20 text-white"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {hasSubmenu && (
                <AnimatePresence>
                  {isSubmenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pr-1 space-y-0.5 border-l border-slate-200 ml-5 my-1"
                    >
                      {item.submenu?.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive =
                          pathname === sub.href ||
                          (sub.href !== "/" && pathname.startsWith(sub.href));

                        return (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-[0.7rem] font-medium transition-all duration-150 ${
                              isSubActive
                                ? "bg-teal-50 text-teal-700 font-semibold"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {SubIcon && (
                                <SubIcon
                                  className={`w-3.5 h-3.5 ${
                                    isSubActive
                                      ? "text-teal-600"
                                      : "text-slate-400"
                                  }`}
                                />
                              )}
                              <span>{sub.title}</span>
                            </div>

                            {sub.badge && (
                              <span className="px-1.5 py-0.2 text-[0.55rem] font-bold rounded-md bg-amber-100 text-amber-700 border border-amber-200">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
