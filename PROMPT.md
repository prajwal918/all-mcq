# 🚀 MASTER PROMPT - MCQ Extraction to GitHub Pages Quiz

## Copy this prompt for future MCQ extraction:

---

```
I need to extract MCQs from PDF/DOCX files and add them to my quiz website.

**Website:** https://prajwal918.github.io/all-mcq/
**Repo:** https://github.com/prajwal918/all-mcq.git
**Branch:** master (NOT main)

## RULES:
1. Extract MCQs ONLY from the PDF - DO NOT create questions from internet
2. Use OCR (tesseract.js + pdf-to-png-converter) for scanned PDFs
3. Keep question numbers and text EXACTLY as in PDF
4. For MATH/MATRICES - Use KaTeX LaTeX format:
   - Matrices: $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$
   - Symbols: $\lambda$, $\neq$, $\times$, $\det$, $\text{tr}$
5. Answer index is 0-based (A=0, B=1, C=2, D=3)

## JSON FORMAT:
{
  "subject_key": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0
    }
  ]
}

## FILES:
- index.html - Quiz app (loads from all_questions.json)
- all_questions.json - All MCQ data

## STEPS:
1. Clone repo: git clone https://github.com/prajwal918/all-mcq.git
2. Get PDFs from origin/main branch
3. OCR extract text from PDFs
4. Parse MCQs into JSON format
5. Update all_questions.json
6. Update CATALOG in index.html if adding new subjects
7. Push to master branch

## CURRENT SUBJECTS:
- Unit 1: dbms, sepm, maths
- Unit 2: daa_unit2, dbms_unit2, sepm_unit2, maths_unit2

## TO ADD NEW SUBJECT:
1. Add to all_questions.json with unique key
2. Add to CATALOG in index.html:
   catalog_key: { name: "Name", icon: "📊", description: "Description", unit: 1 or 2 }

## IMPORTANT:
- MP Unit 2 PDF has NO MCQs (only essay questions) - SKIP IT
- Always verify questions match PDF exactly
- Test website after pushing
```

---

# 📋 QUICK REFERENCE

## OCR Setup (for scanned PDFs)
```javascript
const Tesseract = require("tesseract.js");
const { pdfToPng } = require("pdf-to-png-converter");

async function ocrPdf(pdfPath) {
    const pages = await pdfToPng(pdfPath, { viewportScale: 2.5 });
    let text = "";
    for (let i = 0; i < pages.length; i++) {
        const result = await Tesseract.recognize(pages[i].content, "eng");
        text += result.data.text;
    }
    return text;
}
```

## LaTeX Matrix Examples
```
2x2 Matrix:
$\begin{bmatrix} a & b \\ c & d \end{bmatrix}$

3x3 Matrix:
$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$

Augmented Matrix:
$\begin{bmatrix} 1 & 2 & | & 3 \\ 4 & 5 & | & 6 \end{bmatrix}$

Greek Letters:
$\lambda$ (lambda), $\alpha$ (alpha), $\beta$ (beta)

Symbols:
$\neq$ (not equal), $\leq$ (less equal), $\geq$ (greater equal)
$\times$ (times), $\rightarrow$ (arrow), $\in$ (in)
```

## Git Commands
```bash
# Clone
git clone https://github.com/prajwal918/all-mcq.git
cd all-mcq

# Get source PDFs
git checkout origin/main -- "filename.pdf"

# Push changes
git add all_questions.json index.html
git commit -m "Add [Subject] Unit [X] MCQs

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git push origin master
```

## NPM Packages Needed
```bash
npm install pdf-parse mammoth tesseract.js pdf-to-png-converter
```

---

# ✅ CURRENT STATUS (2026-04-04)

| Subject | Unit 1 | Unit 2 | Notes |
|---------|--------|--------|-------|
| DAA | ❌ 0 | ✅ 49 | Unit 1 not in repo |
| DBMS | ✅ 40 | ✅ 50 | Complete |
| SEPM | ✅ 48 | ✅ 25 | Complete |
| Maths | ✅ 68 | ✅ 37 | With LaTeX matrices |
| MP | ❌ | ❌ | PDF has NO MCQs |

**TOTAL: 317 MCQs**

---

# 🔧 TROUBLESHOOTING

## PDF extraction not working?
- Use OCR for scanned PDFs
- Check if PDF is image-based or text-based

## Matrices not displaying?
- Wrap in $ signs: `$\begin{bmatrix}...\end{bmatrix}$`
- Use & for column separator, \\\\ for row separator

## Push failing?
- Make sure you're on master branch
- Pull latest: `git pull origin master`

## Questions missing?
- Check PDF page by page
- Some PDFs have questions split across pages

---

**Live Website:** https://prajwal918.github.io/all-mcq/
**Repository:** https://github.com/prajwal918/all-mcq
