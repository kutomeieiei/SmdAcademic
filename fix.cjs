const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace('              </div>\n              </section>\n          )}\n\n          {currentView === "portfolio" && (', '              </div>\n            </motion.div>\n          )}\n\n          {currentView === "portfolio" && (');
fs.writeFileSync('src/App.tsx', content);
