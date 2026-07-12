const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Update gradients
code = code.replace(/bg-gradient-to-r from-\[\#09D1C7\] to-\[\#46DFB1\]/g, 'bg-gradient-to-r from-[#09D1C7] to-[#46DFB1] dark:from-[#FF00FF] dark:to-[#FF0000]');
code = code.replace(/hover:from-\[\#09D1C7\] hover:to-\[\#46DFB1\]/g, 'hover:from-[#09D1C7] hover:to-[#46DFB1] dark:hover:from-[#FF00FF] dark:hover:to-[#FF0000]');
code = code.replace(/\[\&_li\]:from-\[\#09D1C7\] \[\&_li\]:via-\[\#28D8B9\] \[\&_li\]:to-\[\#46DFB1\]/g, '[&_li]:from-[#09D1C7] [&_li]:via-[#28D8B9] [&_li]:to-[#46DFB1] dark:[&_li]:from-[#FF00FF] dark:[&_li]:via-[#FF007F] dark:[&_li]:to-[#FF0000]');

// Add dark text/border/ring replacements where dark mode is missing or using light mode colors
code = code.replace(/text-\[\#09D1C7\] dark:text-\[\#46DFB1\]/g, 'text-[#09D1C7] dark:text-[#FF00FF]');
code = code.replace(/text-\[\#09D1C7\]/g, 'text-[#09D1C7] dark:text-[#FF00FF]');
// Deduplicate if we accidentally doubled up:
code = code.replace(/dark:text-\[\#FF00FF\] dark:text-\[\#FF00FF\]/g, 'dark:text-[#FF00FF]');
code = code.replace(/dark:text-\[\#46DFB1\]/g, 'dark:text-[#FF0000]'); // Some use 46DFB1 for dark mode explicitly

// Group hover/focus text
code = code.replace(/group-hover:text-\[\#09D1C7\] dark:group-hover:text-\[\#46DFB1\]/g, 'group-hover:text-[#09D1C7] dark:group-hover:text-[#FF00FF]');
code = code.replace(/group-hover\/card:text-\[\#09D1C7\] dark:group-hover\/card:text-\[\#09D1C7\]/g, 'group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#FF00FF]');
code = code.replace(/group-hover\/card:text-\[\#09D1C7\]/g, 'group-hover/card:text-[#09D1C7] dark:group-hover/card:text-[#FF00FF]');
code = code.replace(/group-focus-within:text-\[\#09D1C7\] dark:group-focus-within:text-\[\#09D1C7\]/g, 'group-focus-within:text-[#09D1C7] dark:group-focus-within:text-[#FF00FF]');

// Borders
code = code.replace(/hover:border-\[\#09D1C7\]\/40 dark:hover:border-\[\#46DFB1\]\/45/g, 'hover:border-[#09D1C7]/40 dark:hover:border-[#FF00FF]/45');
code = code.replace(/focus:border-\[\#09D1C7\]/g, 'focus:border-[#09D1C7] dark:focus:border-[#FF00FF]');
code = code.replace(/border-\[\#09D1C7\]/g, 'border-[#09D1C7] dark:border-[#FF00FF]');

// Ring
code = code.replace(/focus:ring-\[\#09D1C7\]\/50 dark:focus:ring-\[\#46DFB1\]\/50/g, 'focus:ring-[#09D1C7]/50 dark:focus:ring-[#FF00FF]/50');
code = code.replace(/focus:ring-\[\#09D1C7\]/g, 'focus:ring-[#09D1C7] dark:focus:ring-[#FF00FF]');

// Shadows
code = code.replace(/shadow-\[\#09D1C7\]\/30 dark:shadow-\[\#46DFB1\]\/20/g, 'shadow-[#09D1C7]/30 dark:shadow-[#FF0000]/20');
code = code.replace(/group-hover:shadow-\[\#09D1C7\]\/20/g, 'group-hover:shadow-[#09D1C7]/20 dark:group-hover:shadow-[#FF0000]/20');

// Deduplicate
code = code.replace(/dark:border-\[\#FF00FF\] dark:border-\[\#FF00FF\]/g, 'dark:border-[#FF00FF]');
code = code.replace(/dark:focus:border-\[\#FF00FF\] dark:focus:border-\[\#FF00FF\]/g, 'dark:focus:border-[#FF00FF]');
code = code.replace(/dark:focus:ring-\[\#FF00FF\] dark:focus:ring-\[\#FF00FF\]/g, 'dark:focus:ring-[#FF00FF]');
code = code.replace(/dark:group-hover\/card:text-\[\#FF00FF\] dark:group-hover\/card:text-\[\#FF00FF\]/g, 'dark:group-hover/card:text-[#FF00FF]');

fs.writeFileSync('src/App.tsx', code);
