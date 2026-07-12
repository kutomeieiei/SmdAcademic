const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/https:\/\/drive\.google\.com\/thumbnail\?id=\$\{/g, 'https://lh3.googleusercontent.com/d/${');
code = code.replace(/\}\&sz=w800`/g, '}=w800`');

fs.writeFileSync('src/App.tsx', code);
