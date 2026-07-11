const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{\[\s*\{\s*id:\s*"คณิตศาสตร์".*?\],\s*\n?\s*\]\.map\(\(subject\)\s*=>\s*\{/s,
  `{[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", shortName: "Math" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", shortName: "Phys" },
                  { id: "เคมี", name: "เคมี", shortName: "Chem" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" },
                ].map((subject) => {`
);

content = content.replace(
  /<img src=\{subject\.icon\} alt=\{subject\.name\} className=\{`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 \$\{isExpanded \? 'scale-110' : 'group-hover:scale-110'\} dark:invert-\[0\.15\] dark:brightness-200`\} \/>/g,
  `<span className={\`font-mono text-sm sm:text-base font-bold text-red-500 dark:text-red-400 transition-all duration-300 \$\{isExpanded ? 'scale-110' : 'group-hover:scale-110'\}\`}>{subject.shortName}</span>`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Replaced top accordion logos');
