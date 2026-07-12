const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix ExamSourceLogo
code = code.replace(/const \[imageError, setImageError\] = useState\(false\);/, `const [imageError, setImageError] = useState(false);\n  useEffect(() => { setImageError(false); }, [logoUrl]);`);

// Fix modal preview
code = code.replace(/onError=\{\(e\) => \{\s*e\.currentTarget\.style\.display = 'none';\s*\}\}/g, `onError={(e) => { e.currentTarget.style.display = 'none'; }}\n                              onLoad={(e) => { e.currentTarget.style.display = 'block'; }}`);

fs.writeFileSync('src/App.tsx', code);
