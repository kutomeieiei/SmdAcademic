const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');

// We only want to replace in the source section
const startStr = '{currentView === "source" && (';
const startIdx = code.indexOf(startStr);
const endStr = '{currentView === "portfolio" && (';
const endIdx = code.indexOf(endStr);

let sourceBlock = code.substring(startIdx, endIdx);

sourceBlock = sourceBlock
  .replace('layoutId="active-exam-type"', 'layoutId="source-active-exam-type"')
  .replace('layoutId="active-source-type"', 'layoutId="source-active-source-type"')
  .replace('layoutId="active-source-type"', 'layoutId="source-active-source-type"');

const newCode = code.substring(0, startIdx) + sourceBlock + code.substring(endIdx);

fs.writeFileSync('src/App.tsx', newCode);
console.log("Fixed layout IDs in source view");
