const fs = require('fs');
const code = fs.readFileSync('D:/AI/P4/public/js/app.js', 'utf8');
const lines = code.split('\n');

// Find nextListeningWord function
let start = -1, end = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function nextListeningWord')) start = i;
  if (start >= 0 && lines[i].includes('function playListening')) { end = i; break; }
}

// New function
const newFn = [
  'function nextListeningWord() {',
  '    if (listeningWords.length === 0) return;',
  '    listeningIndex = (listeningIndex + 1) % listeningWords.length;',
  '    currentWord = listeningWords[listeningIndex];',
  '    listeningAttempts = 0;',
  '',
  '    const ph = getPhonetic(currentWord.en);',
  '    const ini = getInitials(currentWord.en);',
  '',
  '    const display = document.getElementById(\'listeningWord\');',
  '    display.innerHTML =',
  '        \'<div style="font-size:26px;margin-bottom:10px">\u{1F3A7} 听发音，拼写单词</div>\' +',
  '        \'<div style="margin:12px 0;font-size:36px;font-weight:700;color:#667eea;letter-spacing:6px;font-family:monospace">\' + ini + \'</div>\' +',
  '        (ph ? \'<div style="margin:8px 0"><span style="font-size:18px;color:#6c757d">\' + ph + \'</span></div>\' : \'\');',
  '',
  '    document.getElementById(\'listeningMeaning\').textContent = \'中文：\' + currentWord.zh;',
  '',
  '    const inp = document.getElementById(\'listeningAnswer\');',
  '    inp.value = \'\'; inp.disabled = false; inp.focus();',
  '    inp.style.borderColor = \'#e9ecef\';',
  '',
  '    document.getElementById(\'listeningFeedback\').innerHTML = \'\';',
  '    document.getElementById(\'listeningAttempt\').textContent = \'第 1 次机会（共2次）\';',
  '',
  '    speak(currentWord.en);',
  '}',
  ''
];

const newLines = lines.slice(0, start).concat(newFn).concat(lines.slice(end));
fs.writeFileSync('D:/AI/P4/public/js/app.js', newLines.join('\n'), 'utf8');
console.log('✅ nextListeningWord updated');