const fs = require('fs');
let code = fs.readFileSync('public/js/app.js', 'utf8');

// Fix the nested quote issue on line 541
const broken = \placeholder='[\{"en":"...","zh":"...","ms":"...","ex":"...","ex_zh":"..."}]'\;
const fixed = \placeholder=\"[{\\\\\"en\\\\\":\\\\\"...\\\\\",\\\\\"zh\\\\\":\\\\\"...\\\\\",\\\\\"ms\\\\\":\\\\\"...\\\\\"}]\"\;

if (code.includes(broken)) {
  code = code.replace(broken, fixed);
  fs.writeFileSync('public/js/app.js', code, 'utf8');
  console.log('OK: Fixed nested quote syntax error');
} else {
  console.log('Pattern not found, checking line 541...');
  const lines = code.split('\\n');
  if (lines[540]) {
    console.log('Line 541:', lines[540].substring(0, 100));
  }
}
