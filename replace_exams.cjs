const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '{/* Controls & Filters with Custom gradient border highlight */}';
const endMarker = '              </section>\n            </motion.div>\n          )}\n\n          {currentView === "portfolio" && (';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const replacement = `{/* Global Filters for Exams */}
              <section className="flex flex-col gap-5 p-2 transition-colors relative z-10 w-full mb-4">
                {/* 2. Exam Type & Source Type Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Exam Type Filter */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1">
                      สนามสอบ
                    </span>
                    <div className="flex gap-2 p-1 rounded-xl overflow-x-auto transition-colors scrollbar-none">
                      {examTypes.map((et) => (
                        <button
                          key={et}
                          onClick={() => setSelectedExamType(et)}
                          className={\`relative flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center \${
                            selectedExamType === et
                              ? "text-white"
                              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                          }\`}
                        >
                          {selectedExamType === et && (
                            <motion.div
                              layoutId="active-exam-type"
                              className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-sm"
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                            />
                          )}
                          <span className="relative z-10">{et}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Source Type Filter */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1">
                      ผู้จัดทำ / แหล่งที่มา
                    </span>
                    <div className="flex p-1 rounded-xl transition-colors relative">
                      <button
                        onClick={() => setSourceType("All")}
                        className={\`relative flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center \${
                          sourceType === "All"
                            ? "text-white"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }\`}
                      >
                        {sourceType === "All" && (
                          <motion.div
                            layoutId="active-source-type"
                            className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">ทั้งหมด</span>
                      </button>
                      <button
                        onClick={() => setSourceType("Official")}
                        className={\`relative flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center \${
                          sourceType === "Official"
                            ? "text-white"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }\`}
                      >
                        {sourceType === "Official" && (
                          <motion.div
                            layoutId="active-source-type"
                            className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">ผู้ออกข้อสอบ</span>
                      </button>
                      <button
                        onClick={() => setSourceType("Unofficial")}
                        className={\`relative flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center \${
                          sourceType === "Unofficial"
                            ? "text-white"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }\`}
                      >
                        {sourceType === "Unofficial" && (
                          <motion.div
                            layoutId="active-source-type"
                            className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">รวบรวม</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Search Bar */}
                <div className="flex flex-col gap-2 border-t border-neutral-200/40 dark:border-neutral-800/50 pt-3">
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1">
                    ค้นหาอย่างละเอียด
                  </span>
                  <div className="relative group w-full">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 group-focus-within:text-red-500 dark:group-focus-within:text-red-400 transition-colors"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="ค้นหาแหล่งข้อสอบโดยพิมพ์ ชื่อรายชื่อ, รายวิชา..."
                      className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-neutral-900 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-600/50 focus:border-red-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Clear Filters (if active) */}
                {(searchTerm || sourceType !== "All" || selectedExamType !== "All") && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSourceType("All");
                        setSelectedExamType("All");
                        setSelectedCategory("All");
                      }}
                      className="text-red-500 dark:text-red-400 text-sm font-semibold hover:underline focus:outline-none transition-colors"
                    >
                      ล้างตัวกรองทั้งหมด
                    </button>
                  </div>
                )}
              </section>

              {/* Subject Accordions */}
              <div className="flex flex-col gap-4 w-full pb-10">
                {[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", icon: "/icons/mathematics.svg" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", icon: "/icons/physics.svg" },
                  { id: "เคมี", name: "เคมี", icon: "/icons/chemistry.svg" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", icon: "/icons/biology.svg" },
                ].map((subject) => {
                  const isExpanded = selectedCategory === subject.id;
                  
                  // Filter the already filtered external links specifically for this subject
                  const subjectLinks = filteredExternalLinks.filter(link => 
                     link.subjects && (link.subjects.includes(subject.id) || link.subjects.includes("รวมทุกวิชา"))
                  );

                  return (
                    <div key={subject.id} className={\`w-full bg-white dark:bg-neutral-900 border \${isExpanded ? 'border-red-500 dark:border-red-500/50 shadow-md' : 'border-neutral-200 dark:border-neutral-800 hover:border-red-300 dark:hover:border-red-700/50'} rounded-2xl overflow-hidden transition-all duration-300\`}>
                      <button
                        onClick={() => setSelectedCategory(isExpanded ? "All" : subject.id)}
                        className="w-full flex flex-row items-center justify-between p-5 sm:p-6 text-left group transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                      >
                         <div className="flex items-center gap-4 sm:gap-5">
                            <div className={\`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-colors \${isExpanded ? 'bg-red-50 dark:bg-red-900/20' : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20'}\`}>
                               <img src={subject.icon} alt={subject.name} className={\`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 \${isExpanded ? 'scale-110' : 'group-hover:scale-110'} dark:invert-[0.15] dark:brightness-200\`} />
                            </div>
                            <span className={\`text-xl sm:text-2xl font-bold tracking-wide transition-colors \${isExpanded ? 'text-red-600 dark:text-red-400' : 'text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400'}\`}>
                              {subject.name}
                            </span>
                         </div>
                         <div className="flex items-center gap-3 sm:gap-4">
                            <span className="hidden sm:inline-block text-sm font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full">
                               {subjectLinks.length} แหล่งข้อสอบ
                            </span>
                            <ChevronDown className={\`w-6 h-6 text-neutral-400 transition-transform duration-300 \${isExpanded ? "rotate-180 text-red-500" : "group-hover:text-red-500"}\`} />
                         </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="p-4 sm:p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#0a0a0a]/50">
                               {subjectLinks.length === 0 ? (
                                  <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                                    ไม่พบแหล่งข้อสอบที่ค้นหาในหมวดหมู่นี้
                                  </div>
                               ) : (
                                  <div className="flex flex-col gap-4">
                                     {subjectLinks.map((link) => (
                                       <motion.div
                                         key={link.id}
                                         initial={{ opacity: 0, y: 10 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         transition={{ duration: 0.3 }}
                                         className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60 rounded-xl p-4 sm:p-5 shadow-sm hover:border-red-500/40 dark:hover:border-red-600/45 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-left group/card"
                                       >
                                         <div className="flex-1 min-w-0">
                                           <div className="flex flex-wrap items-center gap-2 mb-2">
                                             <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 group-hover/card:text-red-500 dark:group-hover/card:text-red-400 transition-colors">
                                               {link.title}
                                             </h3>
                                             <div className="flex flex-wrap items-center gap-1.5">
                                               {link.isOfficialSource ? (
                                                 <span className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50 px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                                                   Official
                                                 </span>
                                               ) : (
                                                 <span className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50 px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider">
                                                   รวบรวม
                                                 </span>
                                               )}
                                               {link.examTypes &&
                                                 link.examTypes.map((et) => (
                                                   <span
                                                     key={et}
                                                     className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50 px-2.5 py-0.5 rounded-full whitespace-nowrap"
                                                   >
                                                     {et}
                                                   </span>
                                                 ))}
                                             </div>
                                           </div>
                                           <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                             {link.description}
                                           </p>
                                         </div>
                                         <a
                                           href={link.url}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           className="inline-flex items-center justify-center px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-red-600 text-neutral-900 dark:text-neutral-200 hover:text-white rounded-lg text-sm font-medium transition-all sm:shrink-0 active:scale-95 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-transparent group-hover/card:shadow-md group-hover/card:shadow-red-600/20"
                                         >
                                           ไปที่เว็บไซต์
                                         </a>
                                       </motion.div>
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
              </div>\n`;

const newContent = content.substring(0, startIndex) + replacement + endMarker + content.substring(endIndex + endMarker.length);

fs.writeFileSync('src/App.tsx', newContent);
console.log('Successfully replaced content.');
