const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');

// We only want to replace in the source section
const startStr = '{currentView === "source" && (';
const startIdx = code.indexOf(startStr);
const endStr = '{currentView === "portfolio" && (';
const endIdx = code.indexOf(endStr);

let sourceBlock = code.substring(startIdx, endIdx);

sourceBlock = sourceBlock
  .replace('ไม่พบแหล่งข้อสอบที่ค้นหาในหมวดหมู่นี้', 'ไม่พบแหล่งข้อมูลที่ค้นหาในหมวดหมู่นี้');

const newCode = code.substring(0, startIdx) + sourceBlock + code.substring(endIdx);

fs.writeFileSync('src/App.tsx', newCode);
console.log("Updated empty message in source view");
