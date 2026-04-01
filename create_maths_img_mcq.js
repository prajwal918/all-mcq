const fs = require('fs');

// UNIT 2 ONLY - Questions 39-67 (Linear Algebra)
// Each question shows page image with question number indicator
// Yellow highlighted answers in PDF indicate correct answer

const questions = [
    // Page 4 - UNIT II starts at Q39
    { qNum: 39, page: 4, answer: 2 },  // c) Span(S) = V
    { qNum: 40, page: 4, answer: 2 },  // c) unique zero solution
    { qNum: 41, page: 4, answer: 0 },  // a) R^n
    { qNum: 42, page: 4, answer: 1 },  // b) (0,0)
    
    // Page 5 - Questions 43-55
    { qNum: 43, page: 5, answer: 3 },  // d) (2,2,0)
    { qNum: 44, page: 5, answer: 0 },  // a) 0
    { qNum: 45, page: 5, answer: 1 },  // b) 2
    { qNum: 46, page: 5, answer: 0 },  // a) R^m
    { qNum: 47, page: 5, answer: 1 },  // b) 2
    { qNum: 48, page: 5, answer: 0 },  // a) T(xy)=T(x)T(y)
    { qNum: 49, page: 5, answer: 2 },  // c) R³(R)
    { qNum: 50, page: 5, answer: 1 },  // b) T(x,y)=(2x+y,3x-3y,x+y)
    { qNum: 51, page: 5, answer: 0 },  // a) 9
    { qNum: 52, page: 5, answer: 0 },  // a) b ∈ Col(A)
    { qNum: 53, page: 5, answer: 2 },  // c) matrix [[1,0],[0,0]]
    { qNum: 54, page: 5, answer: 2 },  // c) V is always range of T
    { qNum: 55, page: 5, answer: 3 },  // d) u.v = 0
    
    // Page 6 - Questions 56-67
    { qNum: 56, page: 6, answer: 2 },  // c) 19
    { qNum: 57, page: 6, answer: 0 },  // a) {[1,0],[0,1]}
    { qNum: 58, page: 6, answer: 2 },  // c) 3
    { qNum: 59, page: 6, answer: 0 },  // a) normalized form
    { qNum: 60, page: 6, answer: 2 },  // c) (1,2,4)
    { qNum: 61, page: 6, answer: 1 },  // b) {(0,y)}
    { qNum: 62, page: 6, answer: 0 },  // a) Null space of A
    { qNum: 63, page: 6, answer: 2 },  // c) both (a) &(b)
    { qNum: 64, page: 6, answer: 0 },  // a) [[0,0],[0,1]]
    { qNum: 65, page: 6, answer: 3 },  // d) both (a) and (b)
    { qNum: 66, page: 6, answer: 2 },  // c) (x₁,0,0,x₄)
    { qNum: 67, page: 6, answer: 0 },  // a) orthogonal vectors
];

// Create the questions array with image references
const maths_la_u2_img = questions.map(q => ({
    questionImg: `images/maths_unit2/q-${q.page}.png`,
    qNum: q.qNum,
    options: ["A", "B", "C", "D"],
    answer: q.answer
}));

// Read existing JSON
const jsonPath = './all_questions.json';
let data = {};
try {
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
    console.log('Creating new JSON file');
}

// Add maths_la_u2_img (Unit 2 only, image-based)
data.maths_la_u2_img = maths_la_u2_img;

// Remove old text versions if exists
delete data.maths_la;
delete data.maths_la_img;

// Write back
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log(`Added ${maths_la_u2_img.length} Unit 2 image-based questions to maths_la_u2_img`);
