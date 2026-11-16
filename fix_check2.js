const fs = require('fs');
const code = fs.readFileSync('D:/AI/P4/public/js/app.js', 'utf8');
const lines = code.split('\n');

// Find checkListening function
let start = -1, end = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function checkListening')) start = i;
  if (start >= 0 && i > start && lines[i].startsWith('function ')) { end = i; break; }
}

console.log('checkListening at lines', start+1, 'to', end);

// New function - restored scoring logic
const newFn = [
  'function checkListening() {',
  '    if (!currentWord) return;',
  '    const inp = document.getElementById(\'listeningAnswer\');',
  '    const answer = inp.value.trim().toLowerCase();',
  '    if (!answer) return;',
  '',
  '    const correct = currentWord.en.toLowerCase().replace(/[()]/g, \'\').trim();',
  '    const parts = correct.split(/\\s+/);',
  '    const isCorrect = answer === correct ||',
  '        parts.some(p => p.length > 3 && answer === p) ||',
  '        (correct.includes(answer) && answer.length > 2);',
  '',
  '    const fb = document.getElementById(\'listeningFeedback\');',
  '',
  '    if (isCorrect) {',
  '        listeningTotal++;',
  '        if (listeningAttempts === 0) listeningCorrect++;',
  '        fb.innerHTML = \'<span style="color:#28a745;font-weight:600">\u2705 正确! \' + currentWord.en + \'</span>\';',
  '        inp.disabled = true; inp.style.borderColor = \'#28a745\';',
  '        trackActivity({ listening_correct: 1 });',
  '        setTimeout(() => nextListeningWord(), 1500);',
  '    } else {',
  '        listeningAttempts++;',
  '        if (listeningAttempts >= 2) {',
  '            listeningTotal++;',
  '            fb.innerHTML = \'<span style="color:#dc3545;font-weight:600">\u274C 正确答案: \' + currentWord.en + \' (\' + currentWord.zh + \')</span>\';',
  '            inp.disabled = true; inp.style.borderColor = \'#dc3545\';',
  '            if (!wrongWords.find(w => w.en === currentWord.en)) {',
  '                wrongWords.push({ en: currentWord.en, zh: currentWord.zh, ms: currentWord.ms });',
  '                localStorage.setItem(\'wrongWords\', JSON.stringify(wrongWords));',
  '            }',
  '            setTimeout(() => nextListeningWord(), 2500);',
  '        } else {',
  '            fb.innerHTML = \'<span style="color:#ffc107;font-weight:600">\u26A0 不正确，还剩1次机会，请再试</span>\';',
  '            inp.value = \'\'; inp.style.borderColor = \'#ffc107\'; inp.focus();',
  '            document.getElementById(\'listeningAttempt\').textContent = \'第 2 次机会（共2次）\';',
  '            speak(currentWord.en);',
  '        }',
  '    }',
  '    updateListeningUI();',
  '}',
  ''
];

const newLines = lines.slice(0, start).concat(newFn).concat(lines.slice(end));
fs.writeFileSync('D:/AI/P4/public/js/app.js', newLines.join('\n'), 'utf8');
console.log('\u2705 checkListening fixed with scoring');