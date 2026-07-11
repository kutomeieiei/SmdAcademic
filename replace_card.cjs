const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = '<motion.div\n                                         key={link.id}';
const endMarker = '                                       </motion.div>';

const startIndex = content.indexOf(startMarker);
let endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

endIndex += endMarker.length;

const replacement = `<motion.a
                                         href={link.url}
                                         target="_blank"
                                         rel="noopener noreferrer"
                                         key={link.id}
                                         initial={{ opacity: 0, y: 10 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         transition={{ duration: 0.3 }}
                                         className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60 rounded-xl p-4 shadow-sm hover:border-red-500/40 dark:hover:border-red-600/45 hover:shadow-md transition-all flex flex-row items-center gap-4 text-left group/card"
                                       >
                                         <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center overflow-hidden border border-red-100 dark:border-red-900/30">
                                            <img src={subject.icon} alt={subject.name} className="w-7 h-7 sm:w-8 sm:h-8 opacity-80 group-hover/card:scale-110 transition-transform duration-300 dark:invert-[0.15] dark:brightness-200" />
                                         </div>
                                         <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                                           <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-200 group-hover/card:text-red-500 dark:group-hover/card:text-red-400 transition-colors line-clamp-1">
                                             {link.title}
                                           </h3>
                                           <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                             {link.description}
                                           </p>
                                           {link.subjects && link.subjects.length > 0 && (
                                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                                <span className="text-[10px] sm:text-xs font-semibold text-neutral-400 dark:text-neutral-500 mr-0.5">วิชา:</span>
                                                {link.subjects.map((sub) => (
                                                  <span
                                                    key={sub}
                                                    className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full whitespace-nowrap"
                                                  >
                                                    {sub}
                                                  </span>
                                                ))}
                                              </div>
                                           )}
                                         </div>
                                         <div className="hidden sm:flex text-neutral-400 group-hover/card:text-red-500 transition-colors pr-2">
                                           <ExternalLink size={20} />
                                         </div>
                                       </motion.a>`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);

fs.writeFileSync('src/App.tsx', newContent);
console.log('Successfully replaced card content.');
