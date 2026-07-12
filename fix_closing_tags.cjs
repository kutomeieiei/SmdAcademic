const fs = require('fs');

const code = fs.readFileSync('src/App.tsx', 'utf8');
const portfolioStart = code.indexOf('{currentView === "portfolio" && (');

if (portfolioStart === -1) {
    console.error("Could not find portfolio start");
    process.exit(1);
}

// We just need to add the closing tags back before portfolio
const tags = `</div>
            </motion.div>
          )}
          `;

const newCode = code.substring(0, portfolioStart) + tags + code.substring(portfolioStart);
fs.writeFileSync('src/App.tsx', newCode);
console.log("Fixed closing tags");
