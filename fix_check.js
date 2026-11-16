const fs = require('fs');
const code = fs.readFileSync('D:/AI/P4/public/js/app.js', 'utf8');
const lines = code.split('\n');

// Find checkListening function
let start = -1, end = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function checkListening')) start = i;
  if (start >= 0 && i > start && lines[i].startsWith('function ')) { end = i; break; }
}

// New function
const newFn = [
  'function checkListening() {',
  '    if (!currentWord) return;',
  '    const inp = document.getElementById(\'listeningAnswer\');',
  '    const answer = inp.value.trim();',
  '    if (!answer) return;',
  '',
  '    const fb = document.getElementById(\'listeningFeedback\');',
  '    const isCorrect = answer.toLowerCase() === currentWord.en.toLowerCase();',
  '',
  '    if (isCorrect) {',
  '        listeningCorrect++;',
  '        fb.innerHTML = \'<span style="color:#28a745">\u2705 正确！</span>\';',
  '        setTimeout(nextListeningWord, 1500);',
  '    } else {',
  '        listeningAttempts++;',
  '        if (listeningAttempts >= 2) {',
  '            fb.innerHTML = \'<span style="color:#dc3545">\u274C 正确答案是：\' + currentWord.en + \' (\' + currentWord.zh + \')</span>\';',
  '            wrongWords.push(currentWord);',
  '            localStorage.setItem(\'wrongWords\', JSON.stringify(wrongWords));',
  '            setTimeout(nextListeningWord, 2000);',
  '        } else {',
  '            fb.innerHTML = \'<span style="color:#ffc107">\u26A0 再试一次（第2次机会）</span>\';',
  '            inp.value = \'\';',
  '            inp.focus();',
  '        }',
  '    }',
  '',
  '    updateStats();',
  '}',
  ''
];

const newLines = lines.slice(0, start).concat(newFn).concat(lines.slice(end));
fs.writeFileSync('D:/AI/P4/public/js/app.js', newLines.join('\n'), 'utf8');
console.log('✅ checkListening updated');