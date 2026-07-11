const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = /<div className=\{`p-3 sm:p-4 rounded-xl flex items-center justify-center transition-colors \$\{isExpanded \? 'bg-red-50 dark:bg-red-900\/20' : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-red-50 dark:group-hover:bg-red-900\/20'\}`\}>/g;

content = content.replace(targetStr, `<div className="flex items-center justify-center w-12">`);

fs.writeFileSync('src/App.tsx', content);
console.log('Removed accordion square border');
