const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/https:\/\/drive\.google\.com\/uc\?export=view\&id=\$\{match\[1\]\}/g, 'https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000');
fs.writeFileSync('src/App.tsx', code);
