const fs = require('fs');
let code = fs.readFileSync('D:/AI/P4/public/js/app.js', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('adminBulk') && lines[i].includes('placeholder')) {
        lines[i] = '        html += \' < textarea id = "adminBulk" style = "width:100%;height:150px;padding:10px;border:2px solid #e9ecef;border-radius:8px;font-family:monospace" placeholder = "[{en:Quality}]" > </textarea>\';';
    }
}

fs.writeFileSync('D:/AI/P4/public/js/app.js', lines.join('\n'), 'utf8');
console.log('Fixed');
