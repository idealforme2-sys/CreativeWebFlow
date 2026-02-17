const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.resolve(__dirname, '..', 'ExportedSite', 'stitch-designs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const screens = [
    {
        name: 'full-landing-page',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQzMGE5MTNhMmVhNjQ4MTM4NjI5ZDcxMTcyZWMyY2RlEgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    },
    {
        name: 'hero-section',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZiYzE5MDljYTZiYTQxMzM5MDRlYmM3NjU0YjdhN2M3EgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    },
    {
        name: 'services-section',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzVhZGI1M2ZjYTdmYjRmNDZiOGZjZDcwZTdjZGUxNWFhEgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    },
    {
        name: 'process-stats-section',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYyZGM4NWNiNWQ5YjRhZWViMzExMTE0NDk5YjIyZDY3EgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    },
    {
        name: 'contact-footer-section',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZmYWU5YTgwNWYzOTRlOTU5YWRkZjhiODE4Zjg0YzRiEgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    },
    {
        name: 'about-industries-section',
        url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M1YWUzMTg2YWIxZTRmZjE5NDhhMzM3NmE5YzI2NTFjEgsSBxC7vPCWzAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxODA4ODgwMDEzMTQyMTgxODQ0NQ&filename=&opi=96797242'
    }
];

function download(url, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                download(response.headers.location, filePath).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                const size = Math.round(fs.statSync(filePath).size / 1024);
                console.log(`  ✓ ${path.basename(filePath)} (${size}KB)`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

async function main() {
    console.log('Downloading Stitch-generated HTML files...\n');

    for (const screen of screens) {
        const filePath = path.join(outDir, `${screen.name}.html`);
        try {
            await download(screen.url, filePath);
        } catch (err) {
            console.log(`  ✗ ${screen.name}: ${err.message}`);
        }
    }

    console.log(`\nAll files saved to: ${outDir}`);
}

main();
