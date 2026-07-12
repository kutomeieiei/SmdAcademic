const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add "รวมทุกวิชา" to subject array
const subjectRegex = /\{ id: "ไทยสังคม", name: "ไทยสังคม", shortName: "TH\/SOC" \},/;
if(subjectRegex.test(code)) {
    code = code.replace(subjectRegex, '{ id: "ไทยสังคม", name: "ไทยสังคม", shortName: "TH/SOC" },\n                  { id: "รวมทุกวิชา", name: "รวมทุกวิชา", shortName: "All" },');
    fs.writeFileSync('src/App.tsx', code);
    console.log("Added All subjects");
} else {
    console.log("Regex for subject array failed");
}
