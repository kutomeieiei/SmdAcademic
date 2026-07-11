const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 dark:bg-red-900\/20 rounded-lg flex items-center justify-center overflow-hidden border border-red-100 dark:border-red-900\/30">\s*<img src=\{subject\.icon\} alt=\{subject\.name\}.*?\/>\s*<\/div>/g;

content = content.replace(regex, `<div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center overflow-hidden border border-red-100 dark:border-red-900/30">
                                            <span className="font-mono text-sm sm:text-base font-bold text-red-500 dark:text-red-400 group-hover/card:scale-110 transition-transform duration-300">{subject.shortName}</span>
                                         </div>`);

const tagsRegex = /\{link\.subjects && link\.subjects\.length > 0 && \(\s*<div className="flex flex-wrap items-center gap-1\.5 mt-0\.5">\s*<span className="text-\[10px\] sm:text-xs font-semibold text-neutral-400 dark:text-neutral-500 mr-0\.5">วิชา:<\/span>\s*\{link\.subjects\.map\(\(sub\) => \(\s*<span\s*key=\{sub\}\s*className="text-\[10px\] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0\.5 rounded-full whitespace-nowrap"\s*>\s*\{sub\}\s*<\/span>\s*\)\)\}\s*<\/div>\s*\)\}/g;

content = content.replace(tagsRegex, '');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed cards');
