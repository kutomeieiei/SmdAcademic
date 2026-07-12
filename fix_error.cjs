const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/onError=\{\(e\) \=\> \{\s*const target = e\.target as HTMLImageElement;\s*\/\/ If it's a drive URL, fallback to uc\?export=view just in case\s*const match = link\.coverImageUrl\?\.match\(\/\\\/d\\\/\\(\[a-zA-Z0-9_-\]\+\\\)\/\);\s*if \(match && match\[1\]\) \{\s*target\.src = `https:\/\/drive\.google\.com\/thumbnail\?id=\$\{match\[1\]\}&sz=w1000`;\s*\} else \{\s*target\.style\.display = 'none';\s*\}\s*\}\}/g, `onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  if (target.dataset.failed) {
                                    target.style.display = 'none';
                                  } else {
                                    target.dataset.failed = 'true';
                                    const match = link.coverImageUrl?.match(/\\/d\\/([a-zA-Z0-9_-]+)/);
                                    if (match && match[1]) {
                                      target.src = \`https://lh3.googleusercontent.com/d/\${match[1]}=w1000\`;
                                    } else {
                                      target.style.display = 'none';
                                    }
                                  }
                                }}`);
fs.writeFileSync('src/App.tsx', code);
