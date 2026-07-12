const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add englishLinks to import
const importRegex = /import \{ mathLinks, physicsLinks, chemistryLinks, biologyLinks \} from "\.\/data\/externalLinks";/;
if(importRegex.test(code)) {
    code = code.replace(importRegex, 'import { mathLinks, physicsLinks, chemistryLinks, biologyLinks, englishLinks } from "./data/externalLinks";');
} else {
    console.log("Regex for import failed");
}

// 2. Add englishLinks to initial state
const stateRegex = /...biologyLinks.map\(l => \(\{ ...l, category: "ชีววิทยา" \}\)\)/;
if(stateRegex.test(code)) {
    code = code.replace(stateRegex, '...biologyLinks.map(l => ({ ...l, category: "ชีววิทยา" })),\n    ...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" }))');
} else {
    console.log("Regex for state failed");
}

// 3. Add English to subject array
const subjectRegex = /\{ id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" \},/;
if(subjectRegex.test(code)) {
    code = code.replace(subjectRegex, '{ id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" },\n                  { id: "ภาษาอังกฤษ", name: "ภาษาอังกฤษ", shortName: "Eng" },');
} else {
    console.log("Regex for subject array failed");
}

// 4. Update ExamSourceLogo shortName logic in source view
const logoRegex = /shortName=\{link\.subjects\?\.\[0\] === "คณิตศาสตร์" \? "Math" : link\.subjects\?\.\[0\] === "ฟิสิกส์" \? "Phys" : link\.subjects\?\.\[0\] === "เคมี" \? "Chem" : link\.subjects\?\.\[0\] === "ชีววิทยา" \? "Bio" : "All"\}/;
if(logoRegex.test(code)) {
    code = code.replace(logoRegex, 'shortName={link.subjects?.[0] === "คณิตศาสตร์" ? "Math" : link.subjects?.[0] === "ฟิสิกส์" ? "Phys" : link.subjects?.[0] === "เคมี" ? "Chem" : link.subjects?.[0] === "ชีววิทยา" ? "Bio" : link.subjects?.[0] === "ภาษาอังกฤษ" ? "Eng" : "All"}');
} else {
    console.log("Regex for logo shortName failed");
}

fs.writeFileSync('src/App.tsx', code);
