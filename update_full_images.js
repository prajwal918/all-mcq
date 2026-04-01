const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Use full page images with question number indicator
const questions = [];
const answers = {
    39: 2, 40: 2, 41: 0, 42: 1,
    43: 3, 44: 0, 45: 1, 46: 0, 47: 1, 48: 0,
    49: 2, 50: 1, 51: 0, 52: 0, 53: 2, 54: 2,
    55: 3, 56: 2, 57: 0, 58: 2, 59: 0, 60: 2,
    61: 1, 62: 0, 63: 2, 64: 0, 65: 3, 66: 2, 67: 0
};

// Map question numbers to pages
const pageMap = {
    39: 4, 40: 4, 41: 4, 42: 4,
    43: 5, 44: 5, 45: 5, 46: 5, 47: 5, 48: 5, 49: 5, 50: 5, 51: 5, 52: 5, 53: 5, 54: 5,
    55: 5, 56: 6, 57: 6, 58: 6, 59: 6, 60: 6, 61: 6, 62: 6, 63: 6, 64: 6, 65: 6, 66: 6, 67: 6
};

for (let q = 39; q <= 67; q++) {
    questions.push({
        questionImg: `images/maths_unit2/q-${pageMap[q]}.png`,
        qNum: q,
        options: ['a', 'b', 'c', 'd'],
        answer: answers[q]
    });
}

// Replace the maths_la_u2_img section
const newSection = JSON.stringify(questions);
const regex = /"maths_la_u2_img":\[.*?\](?=,"|$)/s;

if (html.match(regex)) {
    html = html.replace(regex, `"maths_la_u2_img":${newSection}`);
    fs.writeFileSync('index.html', html);
    console.log(`Updated with ${questions.length} questions using full page images`);
} else {
    console.log('Pattern not found');
}
