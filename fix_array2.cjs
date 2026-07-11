const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `{[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", icon: "/icons/mathematics.svg" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", icon: "/icons/physics.svg" },
                  { id: "เคมี", name: "เคมี", icon: "/icons/chemistry.svg" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", icon: "/icons/biology.svg" },
                ]`;

const replacement = `{[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", shortName: "Math" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", shortName: "Phys" },
                  { id: "เคมี", name: "เคมี", shortName: "Chem" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" },
                ]`;

content = content.replace(targetStr, replacement);
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed array 2');
