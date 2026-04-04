# MCQ Quiz Website - Continuation Guide

## 📍 Current Status
- **Website URL**: https://prajwal918.github.io/all-mcq/
- **GitHub Repo**: https://github.com/prajwal918/all-mcq.git
- **Branch**: `master` (NOT main)

## ✅ What's Done
1. Basic quiz website working with Unit 1 & Unit 2
2. Subjects added:
   - DBMS Unit 1 (40 MCQs)
   - SEPM Unit 1 (48 MCQs)
   - Maths Unit 1 (68 MCQs)
   - DAA Unit 2 (49 MCQs)
   - DBMS Unit 2 (50 MCQs)
   - SEPM Unit 2 (25 MCQs)
   - Maths Unit 2 (37 MCQs)
3. MP Unit 2 REMOVED (PDF only had essay questions, NO MCQs)

## ✅ COMPLETED (2026-04-04)
1. **Fixed Matrix Display** - All Maths matrices now use proper LaTeX `\begin{bmatrix}` format
2. **KaTeX Integrated** - Beautiful math rendering working
3. **37 Maths Unit 2 questions** - All properly formatted with matrices

## ❌ What's Left (Optional)
1. Add more Unit 1 questions if needed
2. Add DAA Unit 1 (currently empty)

## 📁 Source Files in Repo (origin/main branch)
```
DAA_Unit 2_MCQs_a1f7bfedc835a4d61ce7999722269b38.pdf
DBMS_UNIT_2_MCQ.pdf
MCQ MA2005-1.pdf  (Maths)
MP_UNIT2_QBANK (1).pdf  (Only essay questions - NO MCQs!)
sepm-unit 2 mcqs.docx
```

## 🔧 To Continue Work

### Step 1: Clone and Setup
```powershell
cd C:\Users\jogip\OneDrive\Desktop\mcq2
git pull origin master
npm install pdf-parse mammoth tesseract.js pdf-to-png-converter
```

### Step 2: Get PDFs from repo
```powershell
git checkout origin/main -- "DAA_Unit 2_MCQs_a1f7bfedc835a4d61ce7999722269b38.pdf"
git checkout origin/main -- "DBMS_UNIT_2_MCQ.pdf"
git checkout origin/main -- "MCQ MA2005-1.pdf"
git checkout origin/main -- "sepm-unit 2 mcqs.docx"
```

### Step 3: Extract and Parse (Use this script)
Create `parse_mcqs.js`:
```javascript
const fs = require("fs");
const mammoth = require("mammoth");

// For PDF extraction, use pdf-parse with PDFParse class
const { PDFParse } = require("pdf-parse");

async function extractPDF(filename) {
    const parser = new PDFParse();
    const data = fs.readFileSync(filename);
    const result = await parser.parse(data);
    return result.text;
}

// Parse MCQ text into JSON format
function parseMCQs(text) {
    const mcqs = [];
    // Split by question numbers
    const parts = text.split(/\n\s*(\d+)[.\)]\s*/);
    
    for (let i = 1; i < parts.length; i += 2) {
        const qText = parts[i + 1] || "";
        // Split options
        const optParts = qText.split(/\n\s*[a-dA-D][.\)]\s*/);
        
        if (optParts.length >= 3) {
            const question = optParts[0].trim();
            const options = optParts.slice(1, 5).map(o => o.trim());
            // Default answer 0, need manual verification
            mcqs.push({ question, options, answer: 0 });
        }
    }
    return mcqs;
}

// Main
async function main() {
    // Extract each PDF and save
    // Then parse MCQs
    // Update all_questions.json
}

main();
```

### Step 4: For Maths Matrices - Use LaTeX Format
Convert matrix text to KaTeX LaTeX:
```
[1 2 3 4]  →  $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$
```

The index.html already has KaTeX CDN loaded:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
```

### Step 5: Update and Push
```powershell
# After updating all_questions.json
git add all_questions.json index.html
git commit -m "Fix matrix display with KaTeX

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git push origin master
```

## 📊 Question JSON Format
```json
{
  "subject_key": [
    {
      "question": "What is 2+2?",
      "options": ["1", "2", "3", "4"],
      "answer": 3
    }
  ]
}
```
- `answer` is 0-indexed (0=A, 1=B, 2=C, 3=D)

## 🎨 Website Structure
- `index.html` - Main quiz app (loads questions from JSON)
- `all_questions.json` - All MCQs data
- `images/` - For any images needed

## 🔑 Key Points
1. **MP Unit 2 has NO MCQs** - The PDF only has essay/descriptive questions
2. **Use OCR for scanned PDFs** - tesseract.js + pdf-to-png-converter
3. **Matrices need LaTeX** - Use KaTeX with $\begin{bmatrix}...\end{bmatrix}$
4. **Push to master branch** - NOT main (website serves from master)

## 📝 Prompt to Continue Tomorrow
```
Continue working on https://github.com/prajwal918/all-mcq.git

I need to:
1. Fix math/matrix display in Maths questions using KaTeX LaTeX
2. Re-extract questions from PDFs properly
3. Make sure all questions are complete and properly formatted

Read CONTINUE_WORK.md for full context.
```

## 🖥️ Current Working Directory
`C:\Users\jogip\OneDrive\Desktop\mcq2`

## 📦 Installed NPM Packages
- mammoth (DOCX extraction)
- pdf-parse (PDF text extraction)
- tesseract.js (OCR for scanned PDFs)
- pdf-to-png-converter (Convert PDF pages to images for OCR)

---
Last Updated: 2026-04-04
