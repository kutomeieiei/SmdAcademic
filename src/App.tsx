/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Search,
  Dna,
  FlaskConical,
  Atom,
  Calculator,
  Cpu,
  Library,
  HardDriveDownload,
  BookOpen,
  BadgeCheck,
  Building2,
  GraduationCap,
  XCircle,
  ChevronDown,
  ExternalLink,
  ArrowLeft,
  MoreVertical,
  Mic,
  Copyright,
  Instagram,
  Mail,
  Facebook,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Moon,
  Sun,
} from "lucide-react";

import { mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks } from "./data/externalLinks";
import { portfolioLinks } from "./data/portfolioLinks";
import { sourceLinks } from "./data/sourceLinks";
import { motion, AnimatePresence } from "motion/react";

interface ExamSourceLogoProps {
  logoUrl?: string;
  title: string;
  shortName: string;
}

function ExamSourceLogo({ logoUrl, title, shortName }: ExamSourceLogoProps) {
  const [imageError, setImageError] = useState(false);
  useEffect(() => { setImageError(false); }, [logoUrl]);

  // Parse Drive direct link
  const getGoogleDriveDirectLink = (url: string | undefined): string | null => {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    const match = trimmed.match(/(?:id=|\/d\/|folders\/)([a-zA-Z0-9-_]{25,50})/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image')) {
      return trimmed;
    }
    return null;
  };

  const directLink = logoUrl ? getGoogleDriveDirectLink(logoUrl) : null;

  if (directLink && !imageError) {
    return (
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-[1.5px] bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] shadow-sm transition-transform duration-300">
        <img
          src={directLink}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full rounded-xl object-contain bg-white p-1"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <>
      {shortName === "Math" && <Calculator className="w-12 h-12 sm:w-14 sm:h-14" />}
      {shortName === "Phys" && <Atom className="w-12 h-12 sm:w-14 sm:h-14" />}
      {shortName === "Chem" && <FlaskConical className="w-12 h-12 sm:w-14 sm:h-14" />}
      {shortName === "Bio" && <Dna className="w-12 h-12 sm:w-14 sm:h-14" />}
      {shortName === "Eng" && <BookOpen className="w-12 h-12 sm:w-14 sm:h-14" />}
    </>
  );
}

export default function App() {
  const [localExternalLinks, setLocalExternalLinks] = useState<any[]>([
    ...mathLinks.map(l => ({ ...l, category: "คณิตศาสตร์" })),
    ...physicsLinks.map(l => ({ ...l, category: "ฟิสิกส์" })),
    ...chemistryLinks.map(l => ({ ...l, category: "เคมี" })),
    ...biologyLinks.map(l => ({ ...l, category: "ชีววิทยา" })),
    ...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" }))
  ]);

  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any | null>(null);

  const [localSourceLinks, setLocalSourceLinks] = useState<any[]>(sourceLinks);

  function getGoogleDriveDirectLink(url: string | undefined): string | null {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    // Match Google Drive files
    const match = trimmed.match(/(?:id=|\/d\/|folders\/)([a-zA-Z0-9-_]{25,50})/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image')) {
      return trimmed;
    }
    return null;
  }

  const [currentView, setCurrentView] = useState<
    "home" | "exams" | "source" | "about" | "more-exams" | "portfolio"
  >("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sourceType, setSourceType] = useState<"All" | "Official" | "Unofficial">("All");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState("ทั้งหมด");
  const [selectedExamType, setSelectedExamType] = useState<string>("All");
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [selectedPortfolioTag, setSelectedPortfolioTag] = useState<string>("All");
  const getPortfolioStep = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 6; // lg: 3 cols * 2 rows = 6
      if (window.innerWidth >= 640) return 4;  // sm: 2 cols * 2 rows = 4
      return 2;                                // mobile: 1 col * 2 rows = 2
    }
    return 6;
  };

  const [portfolioLimit, setPortfolioLimit] = useState(getPortfolioStep());

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    setPortfolioLimit(getPortfolioStep());
  }, [portfolioSearch, selectedPortfolioTag]);

  const allPortfolioTags = ["All", ...Array.from(new Set(portfolioLinks.flatMap(link => link.tags)))];

  const additionalPortfolioSources = [
    {
      id: "1",
      title: "TCAS Portfolio",
      url: "https://www.mytcas.com/",
      description: "รวมตัวอย่างพอร์ตโฟลิโอสำหรับยื่น TCAS",
      tags: ["TCAS", "Official"]
    },
    {
      id: "2",
      title: "Dek-D Portfolio",
      url: "https://www.dek-d.com/portfolio/",
      description: "แหล่งรวมพอร์ตโฟลิโอและบทความแนะนำการทำพอร์ตจากเว็บไซต์ Dek-D",
      tags: ["Guide", "Examples"]
    },
    {
      id: "3",
      title: "Pinterest - Portfolio Design",
      url: "https://www.pinterest.com/search/pins/?q=portfolio%20design%20university",
      description: "รวมไอเดียการออกแบบพอร์ตโฟลิโอให้สวยงามและน่าสนใจ",
      tags: ["Design", "Ideas"]
    }
  ];

  const filteredPortfolioLinks = portfolioLinks.filter((link) => {
    const matchesSearch =
      portfolioSearch === "" ||
      (link.ownerName && link.ownerName.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
      (link.ownerFullName && link.ownerFullName.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
      (link.targetFacultyAndUni && link.targetFacultyAndUni.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
      link.tags.some(tag => tag.toLowerCase().includes(portfolioSearch.toLowerCase()));

    const matchesTag =
      selectedPortfolioTag === "All" ||
      link.tags.includes(selectedPortfolioTag);

    return matchesSearch && matchesTag;
  });

  const examTypes = [
    "All",
    "สอวน. (POSN)",
    "TCAS / A-Level",
    "อื่น ๆ",
  ];

  const filteredExternalLinks = localExternalLinks.filter((link) => {
    return link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           link.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredSourceLinks = localSourceLinks.filter((link) => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           link.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedSourceFilter === "ทั้งหมด") return true;
    if (selectedSourceFilter === "สรุปเนื้อหา") {
      return link.tags?.some(tag => tag.includes("สรุป"));
    }
    if (selectedSourceFilter === "แบบฝึกหัด") {
      return link.tags?.some(tag => tag.toLowerCase().includes("mock") || tag.includes("จำลอง") || tag.includes("ข้อสอบ") || tag.includes("แบบฝึกหัด"));
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none select-none flex justify-center">
        {/* Vertical Watermark Text (Visible on wide screens) */}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#EEECEC] dark:bg-[#0a0a0a] border-b border-neutral-200/50 dark:border-neutral-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl leading-none transition-colors">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">Smd</span>{" "}
                  <span className="text-neutral-900 dark:text-white">Academic</span>
                </h1>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-400 transition-colors mt-0.5">
                  Hope and Dream
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => setCurrentView("home")}
                className={`text-sm font-bold transition-colors ${currentView === "home" ? "text-neutral-700 dark:text-neutral-100" : "text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView("exams")}
                className={`text-sm font-bold transition-colors ${currentView === "exams" ? "text-neutral-700 dark:text-neutral-100" : "text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"}`}
              >
                Exams
              </button>
              <button
                onClick={() => setCurrentView("source")}
                className={`text-sm font-bold transition-colors ${currentView === "source" ? "text-neutral-700 dark:text-neutral-100" : "text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"}`}
              >
                Source
              </button>
              <button
                onClick={() => setCurrentView("portfolio")}
                className={`text-sm font-bold transition-colors ${currentView === "portfolio" ? "text-neutral-700 dark:text-neutral-100" : "text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"}`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setCurrentView("about")}
                className={`text-sm font-bold transition-colors ${currentView === "about" ? "text-neutral-700 dark:text-neutral-100" : "text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"}`}
              >
                About Us
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 ml-2"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-700 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Toggle mobile menu"
              >
                <MoreVertical size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-neutral-200/50 dark:border-neutral-900/50 bg-[#EEECEC] dark:bg-[#0a0a0a] overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setCurrentView("home");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium transition-colors ${currentView === "home" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-700 dark:text-neutral-400"}`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentView("source");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium transition-colors ${currentView === "source" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-700 dark:text-neutral-400"}`}
                >
                  Source
                </button>
                <button
                  onClick={() => {
                    setCurrentView("exams");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium transition-colors ${currentView === "exams" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-700 dark:text-neutral-400"}`}
                >
                  Exams
                </button>
                <button
                  onClick={() => {
                    setCurrentView("portfolio");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium transition-colors ${currentView === "portfolio" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-700 dark:text-neutral-400"}`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => {
                    setCurrentView("about");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-medium transition-colors ${currentView === "about" ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-700 dark:text-neutral-400"}`}
                >
                  About Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-start w-[100vw] relative left-1/2 -translate-x-1/2 -mt-8 min-h-[70vh]"
            >
              {/* Top Section */}
              <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent dark:bg-transparent text-neutral-700 dark:text-white pt-24 pb-8 flex flex-col items-center z-[40]">
                {/* Removed Ambient Background Glow Container for minimal look */}

                <div className="text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-[30] w-full">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-700 dark:text-white">
                    ยินดีต้อนรับเข้าสู่{" "}<br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] whitespace-nowrap">
                      SMD ACADEMIC
                    </span>
                  </h2>
                  <p className="text-lg text-neutral-700 dark:text-white/90 max-w-xl">
                    Knowledge Hub For the New Era <br /> "Wisdom Grow With Study"
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent dark:bg-transparent text-neutral-700 dark:text-white pt-10 pb-24 mt-auto z-[30] flex flex-col items-center">
                {/* Removed Ambient Background Glow Container for minimal look */}

                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-12 text-left relative z-10">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] text-3xl font-normal -rotate-12 transform">✦</span>
                      Exams
                    </h3>
                    <p className="text-neutral-700 dark:text-white/90 text-lg leading-relaxed mb-2">
                      รวบรวมข้อสอบจากเเหล่งข้อสอบต่างๆ เพื่อเป็นที่ฝึกฝนทบทวนความรู้ของทุกคน สำหรับการเตรียมความพร้อมก่อนสอบสนามต่างๆ
                    </p>
                    <button
                      onClick={() => setCurrentView("exams")}
                      className="mt-1 w-fit px-8 py-3 bg-neutral-200 dark:bg-[#f8f9fa]/10 text-neutral-700 dark:text-white border border-neutral-300 dark:border-white/20 hover:bg-neutral-300 dark:hover:bg-[#f8f9fa]/20 rounded-xl font-medium transition-colors shadow-sm active:scale-95"
                    >
                      เริ่มค้นหาข้อสอบ
                    </button>
                  </div>

                  {/* Infinite Scroll Carousel */}
                  <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-transparent py-4 flex items-center justify-center my-8 overflow-hidden">
                    <div className="w-full inline-flex flex-nowrap overflow-hidden">
                      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 sm:[&_li]:mx-8 [&_li]:text-xs sm:[&_li]:text-base [&_li]:font-black [&_li]:text-transparent [&_li]:bg-clip-text [&_li]:bg-gradient-to-r [&_li]:from-[#09D1C7] [&_li]:via-[#28D8B9] [&_li]:to-[#46DFB1] dark:[&_li]:from-[#FF00FF] dark:[&_li]:via-[#FF007F] dark:[&_li]:to-[#FF0000] [&_li]:whitespace-nowrap [&_li]:tracking-widest animate-infinite-scroll w-max">
                        <li>POSN</li>
                        <li>TCAS</li>
                        <li>NETSAT</li>
                        <li>A-LEVEL</li>
                        <li>TGAT</li>
                        <li>TPAT</li>
                        <li>สอวน</li>
                        <li>IJSO</li>
                        <li>POSN</li>
                        <li>TCAS</li>
                        <li>NETSAT</li>
                        <li>A-LEVEL</li>
                        <li>TGAT</li>
                        <li>TPAT</li>
                        <li>สอวน</li>
                        <li>IJSO</li>
                        {/* Duplicated for seamless looping */}
                        <li aria-hidden="true">POSN</li>
                        <li aria-hidden="true">TCAS</li>
                        <li aria-hidden="true">NETSAT</li>
                        <li aria-hidden="true">A-LEVEL</li>
                        <li aria-hidden="true">TGAT</li>
                        <li aria-hidden="true">TPAT</li>
                        <li aria-hidden="true">สอวน</li>
                        <li aria-hidden="true">IJSO</li>
                        <li aria-hidden="true">POSN</li>
                        <li aria-hidden="true">TCAS</li>
                        <li aria-hidden="true">NETSAT</li>
                        <li aria-hidden="true">A-LEVEL</li>
                        <li aria-hidden="true">TGAT</li>
                        <li aria-hidden="true">TPAT</li>
                        <li aria-hidden="true">สอวน</li>
                        <li aria-hidden="true">IJSO</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] text-3xl font-normal -rotate-12 transform">✦</span>
                      Sources
                    </h3>
                    <p className="text-neutral-700 dark:text-white/90 text-lg leading-relaxed mb-2">
                      รวบรวมเเหล่งเเบบฝึกหัดเเละเเหล่งเนื้อหาสรุปวิชาต่างๆ เพื่อเรียนรู้ได้ง่ายมากขึ้น 
                    </p>
                    <button
                      onClick={() => setCurrentView("source")}
                      className="mt-1 w-fit px-8 py-3 bg-neutral-200 dark:bg-[#f8f9fa]/10 text-neutral-700 dark:text-white border border-neutral-300 dark:border-white/20 hover:bg-neutral-300 dark:hover:bg-[#f8f9fa]/20 rounded-xl font-medium transition-colors shadow-sm active:scale-95"
                    >
                      ไปหน้า Sources
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] text-3xl font-normal -rotate-12 transform">✦</span>
                      Portfolio
                    </h3>
                    <p className="text-neutral-700 dark:text-white/90 text-lg leading-relaxed mb-2">
                      รวบรวมเเฟ้มสะสมผลงานของพี่ๆ เพื่อเเบ่งปันไอเดีย ข้อมูล เป็นเเนวทางในการเก็บพอร์ตฟอลิโอในระบบ Tcasfolio สำหรับการยื่นมหาลัย
                    </p>
                    <button
                      onClick={() => setCurrentView("portfolio")}
                      className="mt-1 w-fit px-8 py-3 bg-neutral-200 dark:bg-[#f8f9fa]/10 text-neutral-700 dark:text-white border border-neutral-300 dark:border-white/20 hover:bg-neutral-300 dark:hover:bg-[#f8f9fa]/20 rounded-xl font-medium transition-colors shadow-sm active:scale-95"
                    >
                      ดูผลงาน Portfolio
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === "about" && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-3xl mx-auto py-20 px-4 sm:px-0 flex flex-col items-center justify-center text-center gap-12 w-full min-h-[60vh] relative z-10"
            >
              <div className="flex flex-col gap-2 items-center">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] text-3xl md:text-5xl mb-4 font-normal -rotate-12 transform">✦</span>
                <h2 className="text-[1.3rem] sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 tracking-tight transition-colors whitespace-nowrap">
                  We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">SMD Academic</span> Team
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] mt-2">
                  Run by SMD Leadership 44
                </h3>
              </div>

              <div className="max-w-2xl w-full text-neutral-700 dark:text-neutral-300 text-lg md:text-xl leading-relaxed flex flex-col gap-6 text-left md:text-center">
                <p>
                  พวกเราพร้อมที่จะช่วยทุกๆคน สำหรับการเตรียมความพร้อม
                  <br className="hidden sm:block" />
                  การสอบในสนามต่างๆ เเละการศึกษาต่อในระดับอุดมศึกษา
                </p>
                <p>
                  เพราะพวกเราเชื่อว่าปลายทางจุดหมายไม่ได้ยากอย่างที่คิด
                  <br className="hidden sm:block" />
                  หากมีเข็มทิศนำทางที่ดี พวกเราพร้อมที่จะเป็นเข็มทิศให้ทุกๆคน
                </p>
                <div className="w-full text-center mt-6">
                  <p className="font-semibold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] relative inline-block">
                    Rise while they rest
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-6 mt-8 pt-10 border-t border-neutral-200/50 dark:border-neutral-800/50 w-full text-left">
                <h3 className="text-xl font-bold text-neutral-700 dark:text-white">Contact Us</h3>
                <div className="w-full flex flex-col gap-3 text-left text-neutral-700 dark:text-neutral-400">
                  <div>
                    สามารถรายงานปัญหา ข้อเสนอหรือสิ่งที่อยากให้ทำได้ที่นี้ <a href="https://forms.gle/hTcHcqe53K5iifR68" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] hover:underline font-bold">Feedback</a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">Instagram:</span>{" "}
                      <a href="https://instagram.com/smdacademic" target="_blank" rel="noopener noreferrer" className="hover:text-[#09D1C7] dark:hover:text-[#FF00FF] transition-colors">smdacademic</a>
                    </div>
                    <div>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">Gmail:</span>{" "}
                      <a href="mailto:smdacademic44@gmail.com" className="hover:text-[#09D1C7] dark:hover:text-[#FF00FF] transition-colors">smdacademic44@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentView === "exams" && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 relative"
            >
              {/* Title Section matching Home View */}
              <div className="text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-4 mb-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight transition-colors text-neutral-700 dark:text-white">
                  ค้นหา{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                    แหล่งข้อสอบ
                  </span>
                </h2>
                <p className="text-md text-neutral-700 dark:text-white/90 max-w-xl transition-colors">
                  รวบรวมไฟล์หรือช่องทางเเหล่งข้อสอบต่างๆ ครอบคลุมวิชาหลักสำหรับเตรียมความพร้อมก่อนสอบสนามต่างๆ
                </p>
              </div>

              {/* Subject Accordions */}
              <div className="flex justify-between items-center w-full relative z-10 mb-2 px-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-400">
                  พบข้อมูลทั้งหมด {filteredExternalLinks.length} รายการ
                </span>
              </div>
              <div className="flex flex-col gap-4 w-full pb-10">
                {[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", shortName: "Math" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", shortName: "Phys" },
                  { id: "เคมี", name: "เคมี", shortName: "Chem" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" },
                  { id: "ภาษาอังกฤษ", name: "ภาษาอังกฤษ", shortName: "Eng" },
                ].map((subject) => {
                  const isExpanded = selectedCategory === subject.id;
                  
                  // Filter the already filtered external links specifically for this subject
                  const subjectLinks = filteredExternalLinks.filter(link => 
                     link.category === subject.id || link.category === "รวมทุกวิชา"
                  );

                  return (
                    <div key={subject.id} className="w-full bg-transparent border border-transparent rounded-2xl overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setSelectedCategory(isExpanded ? "All" : subject.id)}
                        className="w-full p-5 sm:p-6 text-left group transition-colors hover:bg-neutral-100/50 dark:hover:bg-neutral-800/20"
                      >
                         <div className="w-full flex flex-row items-center justify-between pb-2 relative">
                           {/* Gradient bottom line under subject title */}
                           <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]" />
                           <div className="flex items-center gap-4 sm:gap-5">
                              <div className="flex items-center justify-center w-12 sm:w-16">
                                <span className="font-mono text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] transition-all duration-300 group-hover:scale-110">{subject.shortName}</span>
                              </div>
                              <span className="text-xl sm:text-2xl font-bold tracking-wide transition-colors text-neutral-700 dark:text-neutral-100 group-hover:text-[#09D1C7] dark:group-hover:text-[#FF00FF]">
                                {subject.name}
                              </span>
                           </div>
                           <div className="flex items-center gap-3 sm:gap-4">
                              <ChevronDown className={`w-6 h-6 text-[#09D1C7] dark:text-[#FF00FF] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                           </div>
                         </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-6 bg-transparent">
                               {subjectLinks.length === 0 ? (
                                  <div className="text-center py-10 text-neutral-700 dark:text-neutral-400">
                                    ไม่พบแหล่งข้อสอบที่ค้นหาในหมวดหมู่นี้
                                  </div>
                               ) : (
                                  <div className="flex flex-col gap-4">
                                     {subjectLinks.map((link) => (
                                       <motion.a
                                         href={link.url}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         key={link.id}
                                         initial={{ opacity: 0, y: 10 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         transition={{ duration: 0.3 }}
                                         className="w-full bg-white/40 dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800/60 rounded-xl p-4 hover:border-[#09D1C7] dark:border-[#FF00FF]/40 dark:hover:border-[#FF00FF]/45 transition-all flex flex-row items-center gap-4 text-left group/card"
                                       >
                                         <div className="flex-shrink-0 w-16 sm:w-20 flex items-center justify-center text-[#09D1C7] dark:text-[#FF00FF] group-hover/card:scale-110 transition-transform duration-300">
                                            <ExamSourceLogo logoUrl={link.logoUrl} title={link.title} shortName={subject.shortName} />
                                          </div>
                                         <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                                           <h3 className="text-base sm:text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#FF00FF] transition-colors line-clamp-1">
                                             {link.title}
                                           </h3>
                                           <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                             {link.description}
                                           </p>
                                         </div>
                                       </motion.a>
                                     ))}
                                  </div>
                               )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
          {currentView === "source" && (
            <motion.div
              key="source"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 relative"
            >
              {/* Title Section matching Home View */}
              <div className="text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-4 mb-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight transition-colors text-neutral-700 dark:text-white">
                  ค้นหา{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                    แหล่งข้อมูล
                  </span>
                </h2>
                <p className="text-md text-neutral-700 dark:text-white/90 max-w-xl transition-colors">
                  รวบรวมเเหล่งเเบบฝึกหัดเเละเเหล่งเนื้อหาสรุปวิชาต่างๆ เพื่อเรียนรู้ได้ง่ายมากขึ้น 
                </p>
              </div>

              {/* Search Bar for Source View */}
              <div className="flex flex-col gap-4 relative z-10 w-full mb-4 px-2 md:px-0">
                {/* Filter Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto w-full">
                  {["ทั้งหมด", "สรุปเนื้อหา", "แบบฝึกหัด"].map((filterName) => (
                    <button
                      key={filterName}
                      onClick={() => setSelectedSourceFilter(filterName)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedSourceFilter === filterName
                          ? "bg-[#09D1C7] dark:bg-[#FF00FF] text-white shadow-md"
                          : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-[#09D1C7]/50 dark:hover:border-[#FF00FF]/50"
                      }`}
                    >
                      {filterName}
                    </button>
                  ))}
                </div>

                <div className="relative group w-full max-w-2xl mx-auto">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#09D1C7] dark:group-focus-within:text-[#FF00FF] transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="ค้นหาแหล่งข้อมูลโดยพิมพ์ชื่อ หรือรายละเอียด..."
                    className="w-full bg-white dark:bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#09D1C7]/50 dark:focus:ring-[#FF00FF]/50 focus:border-[#09D1C7] dark:focus:border-[#FF00FF] transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Source Grid (Old Exams UI style) */}
              <div className="flex justify-between items-center w-full relative z-10 mb-2 px-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-400">
                  พบแหล่งข้อมูลทั้งหมด {filteredSourceLinks.length} รายการ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-10">
                <AnimatePresence mode="popLayout">
                  {filteredSourceLinks.length === 0 ? (
                    <motion.div
                      key="empty-state"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="col-span-1 md:col-span-2 text-center py-10 text-neutral-700 dark:text-neutral-400"
                    >
                      ไม่พบแหล่งข้อมูลที่ค้นหาในหมวดหมู่นี้
                    </motion.div>
                  ) : (
                    filteredSourceLinks.map((link) => (
                      <motion.a
                        layout
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={link.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-full bg-white/40 dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800/60 rounded-xl p-4 hover:border-[#09D1C7] dark:border-[#FF00FF]/40 dark:hover:border-[#FF00FF]/45 transition-all flex flex-row items-center gap-4 text-left group/card"
                      >
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {link.title && (
                          <h3 className="text-base sm:text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#FF00FF] dark:text-[#FF00FF] dark:group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#FF00FF] dark:text-[#FF00FF] transition-colors line-clamp-1">
                            {link.title}
                          </h3>
                        )}
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed line-clamp-2">
                          {link.description}
                        </p>
                        {link.tags && link.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {link.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.a>
                  ))
                )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
          {currentView === "portfolio" && (
            <motion.section
              key="portfolio"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="py-12 flex flex-col items-center justify-start min-h-[60vh] w-full gap-10 max-w-4xl mx-auto relative"
            >
              <div className="text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-black text-neutral-700 dark:text-neutral-100 mb-3 tracking-tight">
                  Student Portfolios
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] mx-auto rounded-full mb-4" />
                <p className="text-neutral-700 dark:text-white/90 max-w-xl mx-auto transition-colors">
                  รวบรวมลิ้งก์เเฟ้มสะสมผลงานของพี่ๆในปีต่างๆ ในหลากหลายสาขาเเละมหาวิทยาลัย
                </p>
              </div>

              {/* ค้นหาและตัวกรอง */}
              <div className="w-full max-w-3xl px-4 sm:px-0 flex flex-col gap-4">
                {/* ช่องค้นหา */}
                <div className="relative group w-full">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#09D1C7] dark:group-focus-within:text-[#FF00FF] transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    value={portfolioSearch}
                    onChange={(e) => setPortfolioSearch(e.target.value)}
                    placeholder="ค้นหาสาขาเเละมหาวิทยาลัยที่สนใจ"
                    className="w-full bg-white/40 dark:bg-neutral-950 border border-neutral-300/80 dark:border-neutral-800 rounded-xl py-3 pl-12 pr-10 text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#09D1C7] dark:focus:ring-[#FF00FF]/50 dark:focus:ring-[#FF00FF]/50 focus:border-transparent transition-all shadow-sm"
                  />
                  {portfolioSearch && (
                    <button
                      onClick={() => setPortfolioSearch("")}
                      className="absolute inset-y-0 right-3 flex items-center text-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full px-4 sm:px-0">
                {filteredPortfolioLinks.length > 0 ? (
                  <div className="flex flex-col gap-10 items-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[280px] sm:max-w-none mx-auto">
                      {filteredPortfolioLinks.slice(0, portfolioLimit).map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5, ease: "easeOut", delay: (index % getPortfolioStep()) * 0.1 }}
                        >
                          <div
                            className="relative aspect-[1/1.4142] w-full h-full rounded-none overflow-hidden shadow-md dark:shadow-black/40 hover:shadow-2xl dark:hover:shadow-black/70 border border-neutral-200/50 dark:border-neutral-800/80 transition-all duration-300 hover:-translate-y-2 group select-none flex flex-col justify-end bg-neutral-950"
                          >
                            {/* Portfolio Cover Image */}
                          {link.coverImageUrl && (
                            <img
                              src={
                                link.coverImageUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
                                  ? `https://lh3.googleusercontent.com/d/${
                                      link.coverImageUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1]
                                    }=w800`
                                  : link.coverImageUrl
                              }
                              alt={`${link.ownerName || "Portfolio"} cover`}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                // Fallback if image fails to load
                                const target = e.currentTarget as HTMLImageElement;
                                if (!target.dataset.failed) {
                                  target.dataset.failed = "true";
                                  // If it's a drive URL, fallback to lh3 just in case
                                  const match = link.coverImageUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/);
                                  if (match && match[1]) {
                                    target.src = `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
                                  } else {
                                    target.style.display = 'none';
                                  }
                                } else {
                                  target.style.display = 'none';
                                }
                              }}
                            />
                          )}
  
                          {/* Top left decorative tag overlay */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                            {link.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-bold bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-none border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
  
                          {/* Bottom Dark Gradient Fade */}
                          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black via-black/95 via-60% to-transparent pointer-events-none" />
  
                          {/* Bottom content area */}
                          <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-4 w-full">
                            {/* Text labels (above the button to avoid getting compressed) */}
                            <div className="flex flex-col gap-1 text-left text-white">
                              {/* Line 1: Owner Name */}
                              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-md line-clamp-1">
                                {link.ownerName || "ชื่อเจ้าของผลงาน"}
                              </h3>
                              {link.ownerFullName && (
                                <p className="text-xs sm:text-sm font-medium text-neutral-200 drop-shadow-md line-clamp-1">
                                  {link.ownerFullName}
                                </p>
                              )}
                              {/* Line 2: Faculty and University */}
                              <p className="text-[10px] sm:text-xs font-medium text-neutral-300 drop-shadow-md leading-relaxed line-clamp-2 mt-0.5">
                                {link.targetFacultyAndUni}
                              </p>
                            </div>
  
                            {/* Red Action Button (bottom right) - Rectangular with square corners containing text */}
                            <div className="flex justify-end">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] hover:opacity-90 active:scale-95 text-white rounded-none shadow-lg shadow-[#09D1C7]/30 dark:shadow-[#FF0000]/20 transition-all duration-300 hover:scale-105 flex items-center justify-center group/btn text-xs sm:text-sm font-bold whitespace-nowrap"
                                title="ดูพอร์ต"
                              >
                                <span>ดูพอร์ต</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredPortfolioLinks.length > portfolioLimit && (
                      <button
                        onClick={() => setPortfolioLimit(prev => prev + getPortfolioStep())}
                        className="px-8 py-3 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl transition-all shadow-sm active:scale-95 border border-neutral-200/50 dark:border-neutral-700/50 text-sm"
                      >
                        โหลดเพิ่มเติม
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4 border border-dashed border-neutral-200 dark:border-neutral-800/80 w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-3">
                    <span className="text-neutral-700 dark:text-neutral-400">
                      <Search size={48} strokeWidth={1} />
                    </span>
                    <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-300">ไม่พบเล่มผลงานที่ต้องการ</h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-400">กรุณาลองใช้คำสำคัญอื่นหรือลองกดเลือกแท็กยอดนิยมอื่นๆ</p>
                    <button
                      onClick={() => {
                        setPortfolioSearch("");
                        setSelectedPortfolioTag("All");
                      }}
                      className="mt-2 text-xs font-bold text-[#09D1C7] dark:text-[#FF00FF] hover:text-[#09D1C7] dark:text-[#FF00FF] underline uppercase tracking-wider"
                    >
                      ล้างตัวกรองทั้งหมด
                    </button>
                  </div>
                )}
              </div>

              {/* แหล่งเพิ่มเติม */}
              <div className="w-full px-4 sm:px-0 max-w-3xl mx-auto mt-16 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]">
                    <GraduationCap className="w-8 h-8 text-[#09D1C7] dark:text-[#FF00FF] shrink-0" />
                    แหล่งเพิ่มเติม
                  </h3>
                  <p className="text-neutral-700 dark:text-white/90 text-sm">
                    เเหล่งข้อมูลเพิ่มเติมที่รวบรวมตัวอย่าง Portfolio เพื่อเป็นเเนวทางเเละไอเดียให้น้องๆ
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 w-full">
                  {additionalPortfolioSources.map((link) => (
                    <div
                      key={link.id}
                      className="w-full rounded-2xl py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-left group transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-[#09D1C7] dark:group-hover:text-[#FF00FF] line-clamp-1 transition-colors">
                            {link.title}
                          </h4>
                        </div>
                        <p className="text-sm text-neutral-700 dark:text-white/90 transition-colors leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800/50 hover:bg-gradient-to-r hover:from-[#09D1C7] hover:to-[#46DFB1] dark:hover:from-[#FF00FF] dark:hover:to-[#FF0000] text-neutral-700 dark:text-neutral-300 hover:text-white dark:hover:text-white rounded-xl text-sm font-medium transition-all sm:shrink-0 hover:-translate-y-0.5 active:scale-95 group-hover:shadow-md group-hover:shadow-[#09D1C7]/20 dark:group-hover:shadow-[#FF0000]/20"
                      >
                        เข้าสู่เว็บไซต์
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </motion.section>
          )}
        </AnimatePresence>
      </main>

  {/* Manage Sources Modal */}
      {isManageModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-in fade-in duration-200 text-left">
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/50">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#09D1C7] dark:text-[#FF00FF]" />
                  จัดการแหล่งข้อสอบ & โลโก้
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 mt-1">
                  เพิ่ม แก้ไข ลบ แหล่งข้อสอบ หรือเปลี่ยนโลโก้ด้วยลิงก์รูปภาพจาก Google Drive
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm("คุณต้องการรีเซ็ตข้อมูลแหล่งข้อสอบกลับเป็นค่าเริ่มต้นทั้งหมดหรือไม่?")) {
                      localStorage.removeItem("customExternalLinks");
                      localStorage.removeItem("customSourceLinks");
                      setLocalExternalLinks([
    ...mathLinks.map(l => ({ ...l, category: "คณิตศาสตร์" })),
    ...physicsLinks.map(l => ({ ...l, category: "ฟิสิกส์" })),
    ...chemistryLinks.map(l => ({ ...l, category: "เคมี" })),
    ...biologyLinks.map(l => ({ ...l, category: "ชีววิทยา" })),
    ...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" }))
  ]);
                      setLocalSourceLinks(sourceLinks);
                    }
                  }}
                  className="px-3 py-1.5 text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="รีเซ็ตเป็นค่าเริ่มต้น"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">รีเซ็ต</span>
                </button>
                <button 
                  onClick={() => setIsManageModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 transition-colors cursor-pointer"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-6">
              {/* Left Column: List of Sources */}
              <div className="w-full lg:w-1/3 border-r border-neutral-100 dark:border-neutral-800 pr-0 lg:pr-6 flex flex-col gap-3 max-h-[50vh] lg:max-h-none overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-500">
                    รายการทั้งหมด ({localExternalLinks.length})
                  </span>
                  <button
                    onClick={() => {
                      const newId = 'custom-' + Date.now();
                      const newItem = {
                        id: newId,
                        title: 'แหล่งข้อสอบใหม่',
                        description: 'คำอธิบายแหล่งข้อสอบ',
                        url: 'https://',
                        logoUrl: ''
                      };
                      setLocalExternalLinks([...localExternalLinks, newItem]);
                      setEditingLink(newItem);
                    }}
                    className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#09D1C7] dark:text-[#FF00FF]" />
                    เพิ่มใหม่
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {localExternalLinks.map((link) => {
                    const isSelected = editingLink?.id === link.id;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => setEditingLink(link)}
                        className={`w-full text-left p-3 rounded-xl transition-all border cursor-pointer ${
                          isSelected 
                            ? 'bg-neutral-100 dark:bg-neutral-800/80 border-[#09D1C7] dark:border-[#FF00FF] text-[#09D1C7] dark:text-[#FF00FF]' 
                            : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 overflow-hidden">
                            {link.logoUrl ? (
                              <img 
                                src={getGoogleDriveDirectLink(link.logoUrl) || link.logoUrl} 
                                alt={link.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
                              />
                            ) : (
                              <BookOpen className="w-4 h-4 text-[#09D1C7] dark:text-[#FF00FF]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm truncate">{link.title}</div>
                            <div className="text-[10px] text-neutral-700 dark:text-neutral-500 truncate">{link.url}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm("คุณต้องการรีเซ็ตแหล่งข้อสอบทั้งหมดกลับไปเป็นค่าเริ่มต้นหรือไม่?")) {
                      setLocalExternalLinks([
    ...mathLinks.map(l => ({ ...l, category: "คณิตศาสตร์" })),
    ...physicsLinks.map(l => ({ ...l, category: "ฟิสิกส์" })),
    ...chemistryLinks.map(l => ({ ...l, category: "เคมี" })),
    ...biologyLinks.map(l => ({ ...l, category: "ชีววิทยา" })),
    ...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" }))
  ]);
                      setEditingLink(null);
                    }
                  }}
                  className="mt-4 w-full py-2 border border-neutral-200 dark:border-neutral-800 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 text-neutral-700 dark:text-neutral-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  คืนค่าเริ่มต้นทั้งหมด
                </button>
              </div>

              {/* Right Column: Edit Form */}
              <div className="flex-1">
                {editingLink ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-neutral-800 dark:text-neutral-200">แก้ไขรายละเอียดแหล่งข้อมูล</h4>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("ลบแหล่งข้อสอบนี้ใช่หรือไม่?")) {
                            setLocalExternalLinks(localExternalLinks.filter(l => l.id !== editingLink.id));
                            setEditingLink(null);
                          }
                        }}
                        className="text-xs text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        ลบแหล่งข้อสอบนี้
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-400">ชื่อแหล่งข้อสอบ</label>
                        <input 
                          type="text"
                          className="w-full bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[#09D1C7] dark:border-[#FF00FF] dark:focus:border-[#FF00FF]"
                          value={editingLink.title}
                          onChange={(e) => {
                            const updated = { ...editingLink, title: e.target.value };
                            setEditingLink(updated);
                            setLocalExternalLinks(localExternalLinks.map(l => l.id === editingLink.id ? updated : l));
                          }}
                        />
                      </div>

                      {/* URL */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-400">ลิงก์ URL</label>
                        <input 
                          type="text"
                          className="w-full bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[#09D1C7] dark:border-[#FF00FF] dark:focus:border-[#FF00FF]"
                          value={editingLink.url}
                          onChange={(e) => {
                            const updated = { ...editingLink, url: e.target.value };
                            setEditingLink(updated);
                            setLocalExternalLinks(localExternalLinks.map(l => l.id === editingLink.id ? updated : l));
                          }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-400">คำอธิบาย</label>
                      <textarea 
                        rows={2}
                        className="w-full bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[#09D1C7] dark:border-[#FF00FF] dark:focus:border-[#FF00FF] resize-none"
                        value={editingLink.description}
                        onChange={(e) => {
                          const updated = { ...editingLink, description: e.target.value };
                          setEditingLink(updated);
                          setLocalExternalLinks(localExternalLinks.map(l => l.id === editingLink.id ? updated : l));
                        }}
                      />
                    </div>

                    {/* Logo Link */}
                    <div className="flex flex-col gap-1.5 p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                          {editingLink.logoUrl ? (
                            <img 
                              src={getGoogleDriveDirectLink(editingLink.logoUrl) || editingLink.logoUrl} 
                              alt="Logo Preview" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
                            />
                          ) : (
                            <BookOpen className="w-6 h-6 text-[#09D1C7] dark:text-[#FF00FF]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">ลิงก์โลโก้ (Google Drive Sharing Link หรือ ลิงก์รูปภาพ)</label>
                          <span className="block text-[10px] text-neutral-700 dark:text-neutral-500 mt-0.5">วางลิงก์ที่แชร์จาก Google Drive ได้โดยตรง ระบบจะแปลงเป็นรูปภาพให้อัตโนมัติ</span>
                        </div>
                      </div>
                      <input 
                        type="text"
                        placeholder="https://drive.google.com/file/d/... หรือ https://..."
                        className="mt-3 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-[#09D1C7] dark:border-[#FF00FF] dark:focus:border-[#FF00FF]"
                        value={editingLink.logoUrl || ""}
                        onChange={(e) => {
                          const updated = { ...editingLink, logoUrl: e.target.value };
                          setEditingLink(updated);
                          setLocalExternalLinks(localExternalLinks.map(l => l.id === editingLink.id ? updated : l));
                        }}
                      />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsManageModalOpen(false);
                        }}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000] text-white font-semibold rounded-xl text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                      >
                        <Save className="w-4 h-4" />
                        เสร็จสิ้น & บันทึก
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl min-h-[300px]">
                    <Settings className="w-12 h-12 text-neutral-700 dark:text-neutral-600 mb-2" />
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-400">กรุณาเลือกแหล่งข้อสอบจากรายการทางซ้ายมือ</p>
                    <p className="text-xs text-neutral-700 dark:text-neutral-500 mt-1">หรือกดปุ่ม "เพิ่มใหม่" เพื่อสร้างแหล่งข้อมูลใหม่</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200/50 dark:border-neutral-900 bg-transparent py-6 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-neutral-700 dark:text-neutral-400 p-1 flex items-center justify-center transition-colors">
              <Copyright size={18} strokeWidth={2} />
            </div>
            <p className="text-neutral-700 dark:text-neutral-400 text-xs sm:text-sm transition-colors flex items-center gap-2 sm:gap-3">
              <span className="truncate">เว็บไซต์ฝ่ายวิชาการของ SMD</span>
              <span className="text-neutral-700 dark:text-neutral-400">|</span>
              <a href="https://forms.gle/hTcHcqe53K5iifR68" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors whitespace-nowrap">
                Feedback
              </a>
              <span className="text-neutral-700 dark:text-neutral-400">|</span>
              <a href="http://instagram.com/smdacademic" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                <Instagram size={18} />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
