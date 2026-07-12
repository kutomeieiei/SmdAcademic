const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the import
code = code.replace(/import \{ externalLinks \} from "\.\/data\/externalLinks";/, 'import { mathLinks, physicsLinks, chemistryLinks, biologyLinks } from "./data/externalLinks";');

// Replace the state initialization
code = code.replace(/const \[localExternalLinks, setLocalExternalLinks\] = useState<any\[\]>\(externalLinks\);/, 'const [localExternalLinks, setLocalExternalLinks] = useState<any[]>([...mathLinks, ...physicsLinks, ...chemistryLinks, ...biologyLinks]);');

// Replace the reset in the modal
code = code.replace(/setLocalExternalLinks\(externalLinks\);/g, 'setLocalExternalLinks([...mathLinks, ...physicsLinks, ...chemistryLinks, ...biologyLinks]);');

fs.writeFileSync('src/App.tsx', code);
