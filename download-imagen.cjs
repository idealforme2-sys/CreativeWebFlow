const fs = require('fs');
const path = require('path');

const API_KEY = "AIzaSyB-9iwrNtgxc4IG584dj1YIKG7WlhqyGvw";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

const dir = path.join(__dirname, 'src', 'assets', 'process');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const steps = [
    {
        name: "imagen_discovery",
        prompt: "Cinematic close-up of a glowing cyan futuristic data core, floating isometric data visualization, intricate glass circuitry, obsidian background, 8k Unreal Engine render."
    },
    {
        name: "imagen_design",
        prompt: "Hyper-realistic macro photography of floating vibrant purple holographic interfaces, sleek modern dark UI/UX components forming in 3d space, depth of field, neon glow, minimalist dark aesthetic, 8k."
    },
    {
        name: "imagen_build",
        prompt: "Insanely detailed 3D render of a futuristic server monolith emitting bright blue laser lines, metallic textures, volumetric lighting, data streams, cyberpunk aesthetic, 8k."
    },
    {
        name: "imagen_launch",
        prompt: "A majestic space shuttle launching into a neon purple and cyan starry night sky, dramatic speed blur, glowing rocket trail, cinematic composition, breathtaking digital art, 4k."
    }
];

async function downloadImages() {
    for (const step of steps) {
        console.log(`Generating image for ${step.name}...`);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [{ prompt: step.prompt }],
                    parameters: { sampleCount: 1 }
                })
            });

            if (!response.ok) {
                console.error(`Failed to generate ${step.name}: ${response.statusText}`);
                const text = await response.text();
                console.error(text);
                continue;
            }

            const data = await response.json();
            if (data.predictions?.[0]?.bytesBase64Encoded) {
                const base64Data = data.predictions[0].bytesBase64Encoded;
                const filePath = path.join(dir, `${step.name}.png`);
                fs.writeFileSync(filePath, base64Data, 'base64');
                console.log(`Saved ${filePath}`);
            } else {
                console.error(`No image data returned for ${step.name}`);
            }
        } catch (error) {
            console.error(`Error generating ${step.name}:`, error);
        }
    }
    console.log('All images downloaded successfully.');
}

downloadImages();
