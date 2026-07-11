const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = /<div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 dark:bg-red-900\/20 rounded-lg flex items-center justify-center overflow-hidden border border-red-100 dark:border-red-900\/30">/g;

content = content.replace(targetStr, `<div className="flex-shrink-0 w-12 sm:w-14 flex items-center justify-center">`);

fs.writeFileSync('src/App.tsx', content);
console.log('Removed square borders');
