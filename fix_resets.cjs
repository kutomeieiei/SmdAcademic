const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /setLocalExternalLinks\(\[\.\.\.mathLinks, \.\.\.physicsLinks, \.\.\.chemistryLinks, \.\.\.biologyLinks\]\);/g;
const replacement = `setLocalExternalLinks([
    ...mathLinks.map(l => ({ ...l, category: "คณิตศาสตร์" })),
    ...physicsLinks.map(l => ({ ...l, category: "ฟิสิกส์" })),
    ...chemistryLinks.map(l => ({ ...l, category: "เคมี" })),
    ...biologyLinks.map(l => ({ ...l, category: "ชีววิทยา" })),
    ...englishLinks.map(l => ({ ...l, category: "ภาษาอังกฤษ" })),
    ...thaiSocLinks.map(l => ({ ...l, category: "ไทยสังคม" })),
    ...allLinks.map(l => ({ ...l, category: "รวมทุกวิชา" }))
  ]);`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code);
