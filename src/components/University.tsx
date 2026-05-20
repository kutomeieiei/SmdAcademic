import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, BookOpen, GraduationCap, Building2, X, Info, MapPin, Search } from "lucide-react";

interface UniversityItem {
  id: string;
  name: string;
  nameThai: string;
  url: string;
  icon: React.ReactNode;
  logoUrl?: string;
  color: string;
  description: string;
  location: string;
  admissionMethods: { name: string; description: string; }[];
  faculties: {
    facultyName: string;
    scoreCriteria: string[];
  }[];
}

export function University() {
  const [selectedUni, setSelectedUni] = useState<UniversityItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const unis: UniversityItem[] = [
    {
      id: "1",
      name: "Chulalongkorn University",
      nameThai: "จุฬาลงกรณ์มหาวิทยาลัย",
      url: "https://www.chula.ac.th/",
      icon: <Building2 size={32} />,
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaWqIvP5VYyuI0lA4-plkGBElrboCHhCDQoQ&s", // ปล่อยว่างไว้เพื่อใช้ icon หรือใส่ URL ของตราสัญลักษณ์
      color:
        "text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-900/50 bg-pink-100 dark:bg-pink-950/40",
      description: "จุฬาลงกรณ์มหาวิทยาลัย เป็นมหาวิทยาลัยแห่งแรกของประเทศไทย มีชื่อเสียงด้านวิชาการและการวิจัยที่โดดเด่นในหลากหลายสาขาวิชา มุ่งเน้นการสร้างผู้นำและนวัตกรรมเพื่อสังคม",
      location: "กรุงเทพมหานคร",
      admissionMethods: [
        { name: "TCAS รอบ 1 Portfolio", description: "พิจารณาจากผลงาน (Portfolio) ความสามารถพิเศษ และการสัมภาษณ์" },
        { name: "TCAS รอบ 2 Quota", description: "โควตาพื้นที่ โควตาโรงเรียนสาธิต และโครงการความสามารถพิเศษต่างๆ" },
        { name: "TCAS รอบ 3 Admission", description: "พิจารณาจากคะแนนส่วนกลาง (TGAT, TPAT, A-Level) เป็นหลัก" }
      ],
      faculties: [
        { facultyName: "วิศวกรรมศาสตร์", scoreCriteria: ["TGAT", "TPAT3", "A-Level คณิตศาสตร์ประยุกต์ 1", "A-Level ฟิสิกส์", "A-Level เคมี"] },
        { facultyName: "อักษรศาสตร์", scoreCriteria: ["TGAT", "A-Level ภาษาไทย", "A-Level สังคมศึกษา", "A-Level ภาษาต่างประเทศ"] }
      ]
    },
    {
      id: "2",
      name: "Kasetsart University",
      nameThai: "มหาวิทยาลัยเกษตรศาสตร์",
      url: "https://www.ku.ac.th/",
      icon: <BookOpen size={32} />,
      logoUrl: "", 
      color:
        "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50 bg-emerald-100 dark:bg-emerald-950/40",
      description: "มหาวิทยาลัยเกษตรศาสตร์ เป็นมหาวิทยาลัยของรัฐที่โดดเด่นด้านการเกษตร วิทยาศาสตร์ และเทคโนโลยี รวมไปถึงสาขาวิชาอื่นๆ สร้างบัณฑิตที่มีคุณภาพเพื่อตอบสนองการพัฒนาประเทศ",
      location: "กรุงเทพมหานคร",
      admissionMethods: [
        { name: "TCAS รอบ 1 Portfolio", description: "โครงการเรียนดี โครงการผู้มีความสามารถพิเศษระดับชาติ ส่งแฟ้มสะสมผลงาน" },
        { name: "TCAS รอบ 2 Quota", description: "โควตานักเรียนในเขตพื้นที่ โควตาโรงเรียนเครือข่าย" },
        { name: "TCAS รอบ 3 Admission", description: "การรับสมัครร่วมกันโดยใช้คะแนน TGAT/TPAT, A-Level ตามเกณฑ์" }
      ],
      faculties: [
        { facultyName: "วิทยาศาสตร์", scoreCriteria: ["TGAT", "A-Level คณิตศาสตร์ประยุกต์ 1", "A-Level วิทยาศาสตร์ประยุกต์"] },
        { facultyName: "บริหารธุรกิจ", scoreCriteria: ["TGAT", "A-Level คณิตศาสตร์ประยุกต์ 1 หรือ 2"] }
      ]
    },
    {
      id: "3",
      name: "King Mongkut's Institute of Technology Ladkrabang",
      nameThai: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
      url: "https://www.kmitl.ac.th/",
      icon: <GraduationCap size={32} />,
      logoUrl: "", 
      color:
        "text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50 bg-orange-100 dark:bg-orange-950/40",
      description: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง สถาบันการศึกษาชั้นนำที่มีชื่อเสียงด้านวิศวกรรมศาสตร์ สถาปัตยกรรมศาสตร์ และวิทยาศาสตร์ประยุกต์ เน้นการสร้างสรรค์นวัตกรรม",
      location: "กรุงเทพมหานคร",
      admissionMethods: [
        { name: "TCAS รอบ 1 Portfolio", description: "เปิดรับนักเรียนที่มีผลงานโดดเด่นทางด้านวิชาการ วิศวกรรม และนวัตกรรม" },
        { name: "TCAS รอบ 2 Quota", description: "โควตานักเรียนสายสามัญ โควตาโรงเรียนเครือข่าย" },
        { name: "TCAS รอบ 3 Admission", description: "ใช้คะแนนสอบส่วนกลาง TGAT/TPAT และ A-Level ตามทีกำหนด" },
        { name: "TCAS รอบ 4 Direct Admission", description: "รับสมัครตรงโดยมหาวิทยาลัย (เปิดบางคณะ/สาขาที่ยังไม่เต็ม)" }
      ],
      faculties: [
        { facultyName: "วิศวกรรมศาสตร์", scoreCriteria: ["TGAT", "TPAT3", "A-Level คณิตศาสตร์ประยุกต์ 1", "A-Level ฟิสิกส์"] },
        { facultyName: "สถาปัตยกรรมศาสตร์", scoreCriteria: ["TGAT", "TPAT4"] }
      ]
    },
  ];

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (selectedUni) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedUni]);

  const filteredUnis = unis.filter(uni => 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    uni.nameThai.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.section
        key="university"
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="py-12 flex flex-col items-center justify-start min-h-[50vh] w-full gap-8 max-w-5xl mx-auto px-4 sm:px-6 relative"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-300 mb-2 transition-colors">
            Universities
          </h2>
          <p className="text-neutral-600 dark:text-neutral-500 max-w-xl mx-auto transition-colors">
            ข้อมูลเกี่ยวกับมหาวิทยาลัยที่น่าสนใจ สำหรับศึกษาต่อในระดับอุดมศึกษา
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-700 transition-all shadow-sm"
            placeholder="ค้นหามหาวิทยาลัย..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          {filteredUnis.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
              ไม่พบมหาวิทยาลัยที่ค้นหา
            </div>
          ) : (
            filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 rounded-xl overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <div
                  className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl sm:rounded-2xl border ${uni.color}`}
                >
                  {uni.logoUrl ? (
                    <div className="w-full h-full bg-white dark:bg-neutral-900 p-1.5 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <img src={uni.logoUrl} alt={`${uni.name} logo`} className="w-full h-full object-contain rounded-lg" />
                    </div>
                  ) : (
                    <div className="text-current opacity-80 scale-90 sm:scale-100">
                      {uni.icon}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className={`font-semibold text-neutral-900 dark:text-neutral-200 leading-snug line-clamp-2 inline-flex items-center gap-2 ${uni.nameThai.length > 35 ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                    {uni.nameThai} <img src="https://flagcdn.com/th.svg" alt="Thailand" className="inline-block w-5 h-auto rounded-[2px]" />
                  </h3>
                  <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 truncate pr-2">
                    {uni.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{uni.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end shrink-0 sm:pl-4 mt-2 sm:mt-0">
                <button
                  onClick={() => setSelectedUni(uni)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <span>ข้อมูลเพิ่มเติม</span>
                  <Info size={16} />
                </button>
              </div>
            </div>
          )))}
        </div>
      </motion.section>

      {/* University Info Modal */}
      <AnimatePresence>
        {selectedUni && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUni(null)}
              className="fixed inset-0 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-[500px] h-auto max-h-[calc(100vh-2rem)] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex flex-row items-center gap-4 relative bg-white dark:bg-neutral-900 shrink-0">
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                
                {selectedUni.logoUrl ? (
                  <div className="w-16 h-16 bg-white dark:bg-neutral-900 rounded-xl p-1 shadow-sm border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0">
                    <img src={selectedUni.logoUrl} alt={`${selectedUni.name} logo`} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-sm shrink-0 border ${selectedUni.color}`}>
                    <div className="text-current">{selectedUni.icon}</div>
                  </div>
                )}
                
                <div className="flex-1 min-w-0 pr-10">
                  <h3 className={`font-bold leading-tight flex flex-wrap items-center gap-2 text-left text-neutral-900 dark:text-neutral-100 line-clamp-2 ${selectedUni.name.length > 35 ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                    {selectedUni.name} <img src="https://flagcdn.com/th.svg" alt="Thailand" className="inline-block w-5 h-auto rounded-[2px]" />
                  </h3>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto flex-1 flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">รายละเอียด</h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {selectedUni.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">วิธีการรับเข้าศึกษา</h4>
                  <div className="flex flex-col gap-3">
                    {selectedUni.admissionMethods.map((method, index) => (
                      <div key={index} className="bg-neutral-50 dark:bg-neutral-800/30 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/60">
                        <h5 className="font-semibold text-neutral-900 dark:text-neutral-200 mb-1.5">{method.name}</h5>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{method.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">คะแนนที่ใช้ยื่นในแต่ละคณะ (ตัวอย่าง)</h4>
                  <div className="flex flex-col gap-4">
                    {selectedUni.faculties.map((faculty, fIndex) => (
                      <div key={fIndex} className="bg-neutral-50 dark:bg-neutral-800/30 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/60">
                        <h5 className="font-semibold text-neutral-900 dark:text-neutral-200 mb-3">{faculty.facultyName}</h5>
                        <ul className="flex flex-col gap-2">
                          {faculty.scoreCriteria.map((score, sIndex) => (
                            <li key={sIndex} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-1.5 shrink-0" />
                              <span>{score}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

