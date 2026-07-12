const fs = require('fs');
let code = fs.readFileSync('src/data/externalLinks.ts', 'utf8');

// Remove the externalLinks export array at the bottom
code = code.replace(/\/\/ รวมลิงก์ทั้งหมดเพื่อส่งไปแสดงผลในหน้าเว็บ\nexport const externalLinks: ExternalLinkItem\[\] = \[\n(?:  \.\.\.[a-zA-Z]+Links,\n)*  \.\.\.[a-zA-Z]+Links\n\];/g, '');
code = code.replace(/export const externalLinks: ExternalLinkItem\[\] = \[[^\]]*\];/g, '');

fs.writeFileSync('src/data/externalLinks.ts', code.trim() + '\n');
