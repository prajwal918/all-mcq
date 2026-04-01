const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Create the new questions array with correct image paths
const questions = [];
const answers = {
    39: 2, 40: 2, 41: 0, 42: 1,
    43: 3, 44: 0, 45: 1, 46: 0, 47: 1, 48: 0,
    49: 2, 50: 1, 51: 0, 52: 0, 53: 2, 54: 2,
    55: 3, 56: 2, 57: 0, 58: 2, 59: 0, 60: 2,
    61: 1, 62: 0, 63: 2, 64: 0, 65: 3, 66: 2, 67: 0
};

for (let q = 39; q <= 67; q++) {
    questions.push({
        questionImg: `images/maths_u2_questions/q${q}.png`,
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
    console.log(`Updated maths_la_u2_img with ${questions.length} questions`);
} else {
    console.log('Pattern not found - maths_la_u2_img may not exist');
}
