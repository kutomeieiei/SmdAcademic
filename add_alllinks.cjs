const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add allLinks to import
const importRegex = /import \{ mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks, thaiSocLinks \} from "\.\/data\/externalLinks";/;
if(importRegex.test(code)) {
    code = code.replace(importRegex, 'import { mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks, thaiSocLinks, allLinks } from "./data/externalLinks";');
} else {
    console.log("Regex for import failed");
}

// 2. Add allLinks to initial state
const stateRegex = /...thaiSocLinks.map\(l => \(\{ ...l, category: "ไทยสังคม" \}\)\)/;
if(stateRegex.test(code)) {
    code = code.replace(stateRegex, '...thaiSocLinks.map(l => ({ ...l, category: "ไทยสังคม" })),\n    ...allLinks.map(l => ({ ...l, category: "รวมทุกวิชา" }))');
} else {
    console.log("Regex for state failed");
}

fs.writeFileSync('src/App.tsx', code);
