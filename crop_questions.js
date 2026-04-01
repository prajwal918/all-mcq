const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image dimensions: 1583 x 2048
// Each page has ~10 questions, each question ~180-200px height
// We'll crop with some padding

const outputDir = './images/maths_u2_questions';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Question layout per page (approximate Y coordinates)
// Format: { page, questions: [{qNum, top, height}] }
const layout = [
    {
        page: 4,
        questions: [
            // UNIT II starts - Q39-42 at bottom of page
            { qNum: 39, top: 1400, height: 165 },
            { qNum: 40, top: 1565, height: 160 },
            { qNum: 41, top: 1725, height: 145 },
            { qNum: 42, top: 1870, height: 160 },
        ]
    },
    {
        page: 5,
        questions: [
            // Fixed positions based on verified crops
            { qNum: 43, top: 35, height: 175 },
            { qNum: 44, top: 210, height: 130 },
            { qNum: 45, top: 340, height: 130 },
            { qNum: 46, top: 470, height: 130 },
            { qNum: 47, top: 600, height: 155 },
            { qNum: 48, top: 755, height: 170 },
            { qNum: 49, top: 925, height: 140 },
            { qNum: 50, top: 935, height: 175 },
            { qNum: 51, top: 1110, height: 170 },
            { qNum: 52, top: 1280, height: 160 },
            { qNum: 53, top: 1440, height: 220 },
            { qNum: 54, top: 1660, height: 130 },
            // Q55 spans pages - handled separately
        ]
    },
    {
        page: 6,
        questions: [
            // Page 6: Q56-Q67 - verified positions
            { qNum: 56, top: 140, height: 160 },
            { qNum: 57, top: 300, height: 150 },
            { qNum: 58, top: 450, height: 100 },
            { qNum: 59, top: 550, height: 180 },
            { qNum: 60, top: 765, height: 140 },
            { qNum: 61, top: 905, height: 140 },
            { qNum: 62, top: 1045, height: 140 },
            { qNum: 63, top: 1185, height: 130 },
            { qNum: 64, top: 1250, height: 240 },
            { qNum: 65, top: 1490, height: 180 },
            { qNum: 66, top: 1670, height: 125 },
            { qNum: 67, top: 1795, height: 170 },
        ]
    }
];

// Special handling for Q55 which spans pages 5 and 6
async function cropQ55() {
    const srcDir = './images/maths_unit2';
    const destDir = './images/maths_u2_questions';
    
    // Page 5: Q55 question + options a,b (y=1750 to ~1920)
    const p5Part = await sharp(path.join(srcDir, 'q-5.png'))
        .extract({ left: 0, top: 1750, width: 1583, height: 170 })
        .toBuffer();
    
    // Page 6: Q55 options c,d (y=80 to 130)
    const p6Part = await sharp(path.join(srcDir, 'q-6.png'))
        .extract({ left: 0, top: 80, width: 1583, height: 50 })
        .toBuffer();
    
    // Stitch together vertically
    await sharp({
        create: {
            width: 1583,
            height: 220,  // 170 + 50
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    })
    .composite([
        { input: p5Part, top: 0, left: 0 },
        { input: p6Part, top: 170, left: 0 }
    ])
    .toFile(path.join(destDir, 'q55.png'));
    
    console.log('  Cropped Q55 (stitched from pages 5+6)');
}

async function cropQuestions() {
    const width = 1583;
    
    for (const pageInfo of layout) {
        const inputPath = `./images/maths_unit2/q-${pageInfo.page}.png`;
        console.log(`Processing page ${pageInfo.page}...`);
        
        for (const q of pageInfo.questions) {
            const outputPath = path.join(outputDir, `q${q.qNum}.png`);
            
            try {
                await sharp(inputPath)
                    .extract({
                        left: 0,
                        top: q.top,
                        width: width,
                        height: q.height
                    })
                    .toFile(outputPath);
                console.log(`  Cropped Q${q.qNum}`);
            } catch (err) {
                console.error(`  Error cropping Q${q.qNum}:`, err.message);
            }
        }
    }
    
    // Crop Q55 which spans pages
    await cropQ55();
    
    console.log('\nDone! Now update JSON with new image paths.');
}

cropQuestions();
