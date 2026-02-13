const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const used = [
    'Navbar.jsx', 'Hero.jsx', 'InfiniteMarquee.jsx', 'WhoWeHelp.jsx',
    'AboutSection.jsx', 'ProcessSection.jsx', 'WebDevSection.jsx',
    'AppDevSection.jsx', 'MarketingSection.jsx', 'WorkSection.jsx',
    'WhyChooseUs.jsx', 'MissionSection.jsx', 'ContactSection.jsx',
    'Footer.jsx', 'Preloader.jsx', 'CustomCursor.jsx',
    'UIComponents.jsx', 'TechHUD.jsx', 'WebGLBackground.jsx', 'DigitalRain.jsx'
];

let out = '/* ============================================\n';
out += '   CREATIVE WEBFLOW - FULL SOURCE CODE REFERENCE\n';
out += '   Copy-paste this into Stitch, AI agents, etc.\n';
out += '   ============================================ */\n\n';

out += '/* ====== APP.JSX (Main Entry) ====== */\n';
out += fs.readFileSync('src/App.jsx', 'utf8') + '\n\n';

used.forEach(f => {
    const fp = path.join(dir, f);
    if (fs.existsSync(fp)) {
        out += `/* ====== ${f} ====== */\n`;
        out += fs.readFileSync(fp, 'utf8') + '\n\n';
    }
});

out += '/* ====== INDEX.CSS ====== */\n';
out += fs.readFileSync('src/index.css', 'utf8');

const outDir = path.resolve('..', 'ExportedSite');
fs.writeFileSync(path.join(outDir, 'source-code-reference.txt'), out);
console.log('Source reference:', Math.round(fs.statSync(path.join(outDir, 'source-code-reference.txt')).size / 1024) + 'KB');
