const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{\[\s*\{\s*id:\s*"คณิตศาสตร์".*?\}\],\s*\n?.*?\].map\(\(subject\)\s*=>\s*\{/s,
  `{[
                  { id: "คณิตศาสตร์", name: "คณิตศาสตร์", shortName: "Math" },
                  { id: "ฟิสิกส์", name: "ฟิสิกส์", shortName: "Phys" },
                  { id: "เคมี", name: "เคมี", shortName: "Chem" },
                  { id: "ชีววิทยา", name: "ชีววิทยา", shortName: "Bio" },
                ].map((subject) => {`
);
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed array');
