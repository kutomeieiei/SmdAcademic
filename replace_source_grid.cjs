const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');

const sourceStart = code.indexOf('{currentView === "source" && (');
const portfolioStart = code.indexOf('{currentView === "portfolio" && (');

if (sourceStart === -1 || portfolioStart === -1) {
    console.error("Could not find view boundaries.");
    process.exit(1);
}

let sourceBlock = code.substring(sourceStart, portfolioStart);

const accordionsStart = sourceBlock.indexOf('{/* Subject Accordions */}');
const accordionsEnd = sourceBlock.lastIndexOf('</div>\n            </motion.div>\n          )}');

if (accordionsStart === -1 || accordionsEnd === -1) {
    console.error("Could not find accordions boundaries within source block.");
    process.exit(1);
}

const replacement = `{/* Source Grid (Old Exams UI style) */}
              <div className="flex justify-between items-center w-full relative z-10 mb-2 px-1">
                <span className="text-sm text-neutral-700 dark:text-neutral-400">
                  พบแหล่งข้อมูลทั้งหมด {filteredExternalLinks.length} รายการ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-10">
                {filteredExternalLinks.length === 0 ? (
                  <div className="col-span-1 md:col-span-2 text-center py-10 text-neutral-700 dark:text-neutral-400">
                    ไม่พบแหล่งข้อมูลที่ค้นหาในหมวดหมู่นี้
                  </div>
                ) : (
                  filteredExternalLinks.map((link) => (
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={link.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800/60 rounded-xl p-4 hover:border-[#09D1C7]/40 dark:hover:border-[#46DFB1]/45 transition-all flex flex-row items-center gap-4 text-left group/card"
                    >
                      <div className="flex-shrink-0 w-12 sm:w-14 flex items-center justify-center text-[#09D1C7] dark:text-[#46DFB1] group-hover/card:scale-110 transition-transform duration-300">
                        <ExamSourceLogo logoUrl={link.logoUrl} title={link.title} shortName={link.subjects?.[0] === "คณิตศาสตร์" ? "Math" : link.subjects?.[0] === "ฟิสิกส์" ? "Phys" : link.subjects?.[0] === "เคมี" ? "Chem" : link.subjects?.[0] === "ชีววิทยา" ? "Bio" : "All"} />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-700 dark:text-neutral-200 group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#09D1C7] transition-colors line-clamp-1">
                          {link.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed line-clamp-2">
                          {link.description}
                        </p>
                      </div>
                      <div className="hidden sm:flex text-neutral-700 group-hover/card:text-[#09D1C7] transition-colors pr-2">
                        <ExternalLink size={20} />
                      </div>
                    </motion.a>
                  ))
                )}
              `;

const newSourceBlock = sourceBlock.substring(0, accordionsStart) + replacement;

const newCode = code.substring(0, sourceStart) + newSourceBlock + code.substring(portfolioStart);

fs.writeFileSync('src/App.tsx', newCode);
console.log("Replaced source view with old exams UI grid.");
