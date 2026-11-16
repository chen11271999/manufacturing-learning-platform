const fs = require("fs");
let code = fs.readFileSync("D:/AI/P4/server.js", "utf8");

// Find and replace the broken CREATE TABLE statement
const lines = code.split("\n");
let result = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Start of broken section
  if (line.includes("db.exec(CREATE TABLE IF NOT EXISTS custom_words")) {
    // Add the fixed version with backticks
    result.push("    db.exec(`CREATE TABLE IF NOT EXISTS custom_words (");
    result.push("        id INTEGER PRIMARY KEY AUTOINCREMENT,");
    result.push("        category TEXT NOT NULL,");
    result.push("        subcategory TEXT NOT NULL,");
    result.push("        en TEXT NOT NULL,");
    result.push("        zh TEXT NOT NULL,");
    result.push("        ms TEXT NOT NULL,");
    result.push("        example TEXT DEFAULT ',");
    result.push("        example_zh TEXT DEFAULT ',");
    result.push("        created_by INTEGER,");
    result.push("        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,");
    result.push("        FOREIGN KEY (created_by) REFERENCES users(id)");
    result.push("    )`);");
    skip = true;
    continue;
  }
  
  // Skip lines until we find the closing ));
  if (skip) {
    if (line.trim() === "));") {
      skip = false;
      continue;
    }
    continue;
  }
  
  result.push(line);
}

fs.writeFileSync("D:/AI/P4/server.js", result.join("\n"), "utf8");
console.log("Fixed CREATE TABLE statement with backticks");
