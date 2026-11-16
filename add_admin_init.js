const fs = require("fs");
let code = fs.readFileSync("D:/AI/P4/server.js", "utf8");
const lines = code.split("\n");
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("app.listen(PORT")) { insertIdx = i; break; }
}
const adminInit = [
  "// === Admin account initialization ===",
  "(function ensureAdminAccount() {",
  "  try {",
  "    const existing = db.prepare(\x27SELECT id FROM users WHERE username = ?\x27).get(\x27testuser\x27);",
  "    if (!existing) {",
  "      const hashed = bcrypt.hashSync(\x27testuser123\x27, 10);",
  "      db.prepare(\x27INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)\x27)",
  "        .run(\x27testuser\x27, hashed, \x27Admin\x27, \x27admin\x27);",
  "      console.log(\x27[Init] Admin account created: testuser / testuser123\x27);",
  "    } else {",
  "      db.prepare(\x27UPDATE users SET role = ? WHERE username = ? AND role != ?\x27).run(\x27admin\x27, \x27testuser\x27, \x27admin\x27);",
  "    }",
  "  } catch (e) { console.error(\x27[Init] Admin account error:\x27, e.message); }",
  "})();",
  ""
];
lines.splice(insertIdx, 0, ...adminInit);
fs.writeFileSync("D:/AI/P4/server.js", lines.join("\n"), "utf8");
console.log("Added admin init at line " + insertIdx);
