const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the start of currentView === "exams"
const startStr = '{currentView === "exams" && (';
const startIdx = code.indexOf(startStr);

if (startIdx === -1) {
  console.log("Could not find start");
  process.exit(1);
}

// Find the start of currentView === "portfolio"
const endStr = '{currentView === "portfolio" && (';
const endIdx = code.indexOf(endStr);

if (endIdx === -1) {
  console.log("Could not find end");
  process.exit(1);
}

const examsBlock = code.substring(startIdx, endIdx);

// Duplicate it, but change "exams" to "source" and change texts.
let sourceBlock = examsBlock
  .replace('{currentView === "exams" && (', '{currentView === "source" && (')
  .replace('key="exams"', 'key="source"')
  .replace('แหล่งข้อสอบเก่า', 'แหล่งข้อมูล (Source)')
  .replace('ค้นหาแหล่งข้อสอบโดยพิมพ์', 'ค้นหาแหล่งข้อมูลโดยพิมพ์')
  .replace('จัดการแหล่งข้อสอบ', 'จัดการแหล่งข้อมูล')
  .replace('พบข้อมูลทั้งหมด', 'พบแหล่งข้อมูลทั้งหมด')
  .replace('แหล่งข้อสอบ', 'แหล่งข้อมูล');

// Insert it before portfolio
const newCode = code.substring(0, endIdx) + sourceBlock + code.substring(endIdx);

fs.writeFileSync('src/App.tsx', newCode);
console.log("Copied exams view to source view");
