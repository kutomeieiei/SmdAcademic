const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/https:\/\/drive\.google\.com\/thumbnail\?id=\$\{match\[1\]\}&sz=w1000/g, 'https://lh3.googleusercontent.com/d/${match[1]}=w1000');
fs.writeFileSync('src/App.tsx', code);
