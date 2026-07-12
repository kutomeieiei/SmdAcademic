const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add thaiSocLinks to import
const importRegex = /import \{ mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks \} from "\.\/data\/externalLinks";/;
if(importRegex.test(code)) {
    code = code.replace(importRegex, 'import { mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks, thaiSocLinks } from "./data/externalLinks";');
} else {
    console.log("Regex for import failed");
}

// 2. Add thaiSocLinks to initial state
const stateRegex = /...englishLinks.map\(l => \(\{ ...l, category: "ภาษาอังกฤษ" \}\)\)/;
if(stateRegex.test(code)) {
    code = code.replace(stateRegex, '...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" })),\n    ...thaiSocLinks.map(l => ({ ...l, category: "ไทยสังคม" }))');
} else {
    console.log("Regex for state failed");
}

// 3. Add Thai/Social to subject array
const subjectRegex = /\{ id: "ภาษาอังกฤษ", name: "ภาษาอังกฤษ", shortName: "Eng" \},/;
if(subjectRegex.test(code)) {
    code = code.replace(subjectRegex, '{ id: "ภาษาอังกฤษ", name: "ภาษาอังกฤษ", shortName: "Eng" },\n                  { id: "ไทยสังคม", name: "ไทยสังคม", shortName: "TH/SOC" },');
} else {
    console.log("Regex for subject array failed");
}

// 4. Update ExamSourceLogo shortName logic in source view
const logoRegex = /link\.subjects\?\.\[0\] === "ภาษาอังกฤษ" \? "Eng" : "All"/;
if(logoRegex.test(code)) {
    code = code.replace(logoRegex, 'link.subjects?.[0] === "ภาษาอังกฤษ" ? "Eng" : link.subjects?.[0] === "ไทยสังคม" ? "TH/SOC" : "All"');
} else {
    console.log("Regex for logo shortName failed");
}

fs.writeFileSync('src/App.tsx', code);
