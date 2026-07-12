const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<div className="flex-shrink-0 w-12 sm:w-14 flex items-center justify-center text-\[#09D1C7\] dark:text-\[#FF00FF\] group-hover\/card:scale-110 transition-transform duration-300">\s*<ExamSourceLogo logoUrl=\{link\.logoUrl\} title=\{link\.title\} shortName=\{[^\}]+\} \/>\s*<\/div>/;

// since the regex might match the one in "exams" view as well, I'll be more specific.
// Let's find the exact string.
