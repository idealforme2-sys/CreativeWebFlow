const fs = require('fs');
const path = require('path');

const distDir = 'dist';
const assetsDir = path.join(distDir, 'assets');

let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Read all asset files
const files = fs.readdirSync(assetsDir);

files.forEach(file => {
    const filePath = path.join(assetsDir, file);

    if (file.endsWith('.css')) {
        const css = fs.readFileSync(filePath, 'utf8');
        const linkRegex = new RegExp(`<link[^>]*href=["']/assets/${file}["'][^>]*>`, 'g');
        html = html.replace(linkRegex, `<style>${css}</style>`);
    } else if (file.endsWith('.js')) {
        const js = fs.readFileSync(filePath, 'utf8');
        const scriptRegex = new RegExp(`<script[^>]*src=["']/assets/${file}["'][^>]*></script>`, 'g');
        html = html.replace(scriptRegex, `<script type="module">${js}</script>`);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp')) {
        const base64 = fs.readFileSync(filePath).toString('base64');
        const ext = path.extname(file).slice(1);
        const mime = ext === 'jpg' ? 'jpeg' : ext;
        const assetRegex = new RegExp(`/assets/${file}`, 'g');
        html = html.replace(assetRegex, `data:image/${mime};base64,${base64}`);
    }
});

// Write to ExportedSite folder
const outDir = path.join('..', 'ExportedSite');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'creative-webflow-standalone.html'), html);

// Also copy the dist folder for non-inlined version
const distOutDir = path.join(outDir, 'dist-build');
if (!fs.existsSync(distOutDir)) fs.mkdirSync(distOutDir, { recursive: true });
if (!fs.existsSync(path.join(distOutDir, 'assets'))) fs.mkdirSync(path.join(distOutDir, 'assets'));

fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distOutDir, 'index.html'));
files.forEach(f => {
    fs.copyFileSync(path.join(assetsDir, f), path.join(distOutDir, 'assets', f));
});

const size = Math.round(fs.statSync(path.join(outDir, 'creative-webflow-standalone.html')).size / 1024);
console.log(`Done! Standalone HTML: ${size}KB`);
console.log(`Output: ${path.resolve(outDir)}`);
console.log(`  - creative-webflow-standalone.html (single file, all inlined)`);
console.log(`  - dist-build/ (separate files version)`);
