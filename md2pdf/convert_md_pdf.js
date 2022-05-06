const markdownpdf = require("markdown-pdf")
const fs = require("fs")

fs.createReadStream("static/main.md")
  .pipe(markdownpdf())
  .pipe(fs.createWriteStream("pdf/Note.pdf"))

// --- OR ---

// markdownpdf().from("/static/main.m").to("/pdf/document.pdf", function () {
//   console.log("Done")
// })