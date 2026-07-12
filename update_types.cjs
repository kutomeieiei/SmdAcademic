const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(/logoUrl\?: string;/g, 'logoUrl?: string;\n  tags?: string[];');

fs.writeFileSync('src/types.ts', code);
