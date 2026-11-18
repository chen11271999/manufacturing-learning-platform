// ===== App State =====
let token = localStorage.getItem('token');

// Token expiry handler
function handleTokenExpiry() {
  console.log('[Auth] Token expired, logging out...');
  alert('您的登录已过期，请重新登录');
  logout();
}

// Intercept fetch to handle 401 TOKEN_EXPIRED
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const response = await originalFetch.apply(this, args);
  if (response.status === 401) {
    try {
      const data = await response.clone().json();
      if (data.code === 'TOKEN_EXPIRED') {
        handleTokenExpiry();
        return response;
      }
    } catch (e) {}
  }
  return response;
};

let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let isAdmin = false;
let currentCatKey = '';

// Listening state
let listeningWords = [];
let listeningIndex = 0;
let listeningCorrect = 0;
let listeningTotal = 0;
let listeningAttempts = 0; // 0 = first try, 1 = second try
let currentWord = null;
let wrongWords = JSON.parse(localStorage.getItem('wrongWords') || '[]');

// Phonetics dictionary
const PH = {
    'Quality':'/ˈkwɒlɪti/','Control':'/kənˈtrəʊl/','Assurance':'/əˈʃʊərəns/',
    'Inspection':'/ɪnˈspekʃən/','Defective':'/dɪˈfektɪv/','Defect':'/ˈdiːfekt/',
    'Report':'/rɪˈpɔːt/','Root':'/ruːt/','Cause':'/kɔːz/','Analysis':'/əˈnæləsɪs/',
    'Corrective':'/kəˈrektɪv/','Action':'/ˈækʃən/','Preventive':'/prɪˈventɪv/',
    'Sampling':'/ˈsɑːmplɪŋ/','Specification':'/ˌspesɪfɪˈkeɪʃən/','Tolerance':'/ˈtɒlərəns/',
    'Calibration':'/ˌkælɪˈbreɪʃən/','Rework':'/ˈriːwɜːk/','Scrap':'/skræp/',
    'Audit':'/ˈɔːdɪt/','Production':'/prəˈdʌkʃən/','Line':'/laɪn/',
    'Assembly':'/əˈsembli/','Machine':'/məˈʃiːn/','Maintenance':'/ˈmeɪntənəns/',
    'Breakdown':'/ˈbreɪkdaʊn/','Operator':'/ˈɒpəreɪtə/','Shift':'/ʃɪft/',
    'Output':'/ˈaʊtpʊt/','Yield':'/jiːld/','Rate':'/reɪt/',
    'Efficiency':'/ɪˈfɪʃənsi/','Raw':'/rɔː/','Material':'/məˈtɪəriəl/',
    'Purchase':'/ˈpɜːtʃəs/','Order':'/ˈɔːdə/','Supplier':'/səˈplaɪə/',
    'Quotation':'/kwəʊˈteɪʃən/','Lead':'/liːd/','Time':'/taɪm/',
    'Delivery':'/dɪˈlɪvəri/','Warehouse':'/ˈweəhaʊs/','Inventory':'/ˈɪnvəntəri/',
    'Logistics':'/ləˈdʒɪstɪks/','Customs':'/ˈkʌstəmz/',
    'Meeting':'/ˈmiːtɪŋ/','Agenda':'/əˈdʒendə/','Minutes':'/ˈmɪnɪts/',
    'Deadline':'/ˈdedlaɪn/','Schedule':'/ˈʃedjuːl/','Presentation':'/ˌprezənˈteɪʃən/',
    'Proposal':'/prəˈpəʊzəl/','Approval':'/əˈpruːvəl/','Complaint':'/kəmˈpleɪnt/',
    'Safety':'/ˈseɪfti/','Helmet':'/ˈhelmɪt/','Emergency':'/ɪˈmɜːdʒənsi/',
    'Exit':'/ˈeksɪt/','Extinguisher':'/ɪkˈstɪŋɡwɪʃə/','Hazard':'/ˈhæzəd/',
    'Risk':'/rɪsk/','Assessment':'/əˈsesmənt/',
    'Good':'/ɡʊd/','Morning':'/ˈmɔːnɪŋ/','Thank':'/θæŋk/',
    'Welcome':'/ˈwelkəm/','Sorry':'/ˈsɒri/','Understand':'/ˌʌndəˈstænd/',
    'Hospital':'/ˈhɒspɪtəl/','Delicious':'/dɪˈlɪʃəs/',
    'Batch':'/bætʃ/','Finished':'/ˈfɪnɪʃt/','Goods':'/ɡʊdz/',
    'Negotiation':'/nɪˌɡəʊʃiˈeɪʃən/','Reduction':'/rɪˈdʌkʃən/',
    'Drawing':'/ˈdrɔːɪŋ/','Dimension':'/dɪˈmenʃən/','Surface':'/ˈsɜːfɪs/',
    'Prototype':'/ˈprəʊtətaɪp/','Sample':'/ˈsɑːmpl/',
    'Reliability':'/rɪˌlaɪəˈbɪləti/','Test':'/test/',
    'Non-conformance':'/nɒn kənˈfɔːməns/','Gauge':'/ɡeɪdʒ/',
    'Measurement':'/ˈmeʒəmənt/','Mold':'/məʊld/',
    'Employee':'/ɪmˈplɔɪiː/','Training':'/ˈtreɪnɪŋ/',
    'Scratch':'/skrætʃ/','Crack':'/kræk/','Dent':'/dent/',
    'Burr':'/bɜː/','Deformation':'/ˌdiːfɔːˈmeɪʃən/',
    'Flash':'/flæʃ/','Weld':'/weld/','Porosity':'/ˌpɔːrˈɒsɪti/',
    'Downtime':'/ˈdaʊntaɪm/','Cycle':'/ˈsaɪkl/',
    'Conveyor':'/kənˈveɪə/','Bottleneck':'/ˈbɒtlnek/',
    'Kanban':'/ˈkænbæn/','Kaizen':'/ˈkaɪzen/',
    'Incoming':'/ˈɪnkʌmɪŋ/','Outgoing':'/ˈaʊtɡəʊɪŋ/',
    'Acceptable':'/əkˈseptəbəl/','Level':'/ˈlevəl/',
    'Management':'/ˈmænɪdʒmənt/','Continuous':'/kənˈtɪnjuəs/',
    'Improvement':'/ɪmˈpruːvmənt/','Customer':'/ˈkʌstəmə/',
    'Satisfaction':'/ˌsætɪsˈfækʃən/','Process':'/ˈprəʊses/',
    'Capability':'/ˌkeɪpəˈbɪləti/','Blister':'/ˈblɪstə/',
    'Oxidation':'/ˌɒksɪˈdeɪʃən/','Shrinkage':'/ˈʃrɪŋkɪdʒ/',
    'Visual':'/ˈvɪʒuəl/','Destructive':'/dɪˈstrʌktɪv/',
    'Powder':'/ˈpaʊdə/','Coating':'/ˈkəʊtɪŋ/',
    'Laser':'/ˈleɪzə/','Cutting':'/ˈkʌtɪŋ/',
    'Grinding':'/ˈɡraɪndɪŋ/','Polishing':'/ˈpɒlɪʃɪŋ/',
    'Standard':'/ˈstændəd/','System':'/ˈsɪstəm/',
    'Poka-Yoke':'/ˌpoʊkə ˈjoʊkeɪ/','Heijunka':'/heɪˈdʒʊŋkə/',
    'Extrusion':'/ɪkˈstruːʒən/','Anodizing':'/ˈænədaɪzɪŋ/',
    'Torque':'/tɔːk/','Hardness':'/ˈhɑːdnəs/',
    'Tensile':'/ˈtensaɪl/','Strength':'/streŋθ/',
    'Density':'/ˈdensɪti/','Corrosion':'/kəˈrəʊʒən/',
    'Resistance':'/rɪˈzɪstəns/','Conductivity':'/ˌkɒndʌkˈtɪvɪti/',
    'Stainless':'/ˈsteɪnləs/','Steel':'/stiːl/',
    'Aluminum':'/ˌæljuˈmɪniəm/','Plastic':'/ˈplæstɪk/',
    'Rubber':'/ˈrʌbə/','Resin':'/ˈrezɪn/',
    'Flatness':'/ˈflætnəs/','Parallelism':'/ˈpærəlelɪzəm/',
    'Perpendicularity':'/ˌpɜːpənˌdɪkjuˈlærɪti/','Concentricity':'/ˌkɒnsənˈtrɪsɪti/',
    'Circularity':'/ˌsɜːkjuˈlærɪti/','Runout':'/ˈrʌnaʊt/',
    'Chamfer':'/ˈtʃæmfə/','Fillet':'/ˈfɪlɪt/',
    'Thread':'/θred/','Section':'/ˈsekʃən/',
    'NPI':'/ˌen piː ˈaɪ/','DFM':'/ˌdiː ef ˈem/',
    'Burn-In':'/ˈbɜːrn ɪn/','Durability':'/ˌdjʊərəˈbɪlɪti/',
    'Certification':'/ˌsɜːtɪfɪˈkeɪʃən/','Compliance':'/kəmˈplaɪəns/',
};

function getPhonetic(text) {
    let result = [];
    const words = text.replace(/[()]/g, '').split(/\s+/);
    for (const w of words) {
        const clean = w.replace(/[^a-zA-Z-]/g, '');
        for (const [key, val] of Object.entries(PH)) {
            if (clean.toLowerCase() === key.toLowerCase() || clean.toLowerCase().includes(key.toLowerCase())) {
                result.push(val); break;
            }
        }
    }
    return result.join(' ');
}

function getInitials(text) {
    return text.replace(/[()]/g, '').trim().split(/\s+/)
        .filter(w => w.length > 0 && /[a-zA-Z]/.test(w))
        .map(w => w.charAt(0).toUpperCase() + '_ '.repeat(1).trim()).join('  ');
}

// ===== Auth =====
function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

async function login() {
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value;
    const e = document.getElementById('loginError'); e.textContent = '';
    if (!u || !p) { e.textContent = '请填写用户名和密码'; return; }
    try {
        const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) });
        const d = await r.json();
        if (!r.ok) { e.textContent = d.error; return; }
        token = d.token; currentUser = d.user; isAdmin = d.user.role === 'admin';
        localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(currentUser));
        showApp();
    } catch (x) { e.textContent = '网络错误'; }
}

async function register() {
    const u = document.getElementById('regUsername').value.trim();
    const p = document.getElementById('regPassword').value;
    const dept = document.getElementById('regDepartment').value.trim();
    const e = document.getElementById('regError'); e.textContent = '';
    if (!u || !p) { e.textContent = '请填写用户名和密码'; return; }
    if (p.length < 4) { e.textContent = '密码至少4位'; return; }
    try {
        const r = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p, department: dept }) });
        const d = await r.json();
        if (!r.ok) { e.textContent = d.error; return; }
        token = d.token; currentUser = d.user; isAdmin = d.user.role === 'admin';
        localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(currentUser));
        showApp();
    } catch (x) { e.textContent = '网络错误'; }
}

function logout() {
    token = null; currentUser = null; isAdmin = false;
    localStorage.removeItem('token'); localStorage.removeItem('user');
    document.getElementById('authModal').classList.add('active');
    document.getElementById('app').style.display = 'none';
}

function showApp() {
    document.getElementById('authModal').classList.remove('active');
    document.getElementById('app').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.username + (isAdmin ? ' 👑' : '');
    document.getElementById('adminBtn').style.display = isAdmin ? 'inline-block' : 'none';
    document.getElementById('adminNavItem').style.display = isAdmin ? '' : 'none';
    initCategories(); loadUserStats();
}

function switchTab(tab, event) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tab + '-section').classList.add('active');
    if (tab === 'dialogue') initDialogues();
    if (tab === 'writing') initWriting();
    if (tab === 'leaderboard') loadLeaderboard('daily');
    if (tab === 'admin') initAdmin();
}

// ===== Vocabulary =====
function getAllWords() {
    let all = [];
    for (const cat of Object.values(VOCABULARY))
        for (const sub of Object.values(cat.subcategories))
            all.push(...sub.words);
    return all;
}

function initCategories() {
    const grid = document.getElementById('categoryGrid'); grid.innerHTML = '';
    let total = 0;
    for (const [key, cat] of Object.entries(VOCABULARY)) {
        let cnt = 0;
        for (const sub of Object.values(cat.subcategories)) cnt += sub.words.length;
        total += cnt;
        const card = document.createElement('div');
        card.className = 'category-card'; card.onclick = () => showCategory(key);
        card.innerHTML = '<div class="category-icon">' + cat.icon + '</div><div class="category-name">' + cat.name + '</div><div class="category-count">' + cnt + ' 词</div>';
        grid.appendChild(card);
    }
    document.getElementById('vocabProgress').textContent = '总词汇: ' + total;
}

function showCategory(key) {
    currentCatKey = key;
    const cat = VOCABULARY[key];
    const vl = document.getElementById('vocabList');
    document.getElementById('categoryGrid').style.display = 'none';
    vl.style.display = 'block';
    let html = '<button class="back-btn" onclick="backToCategories()">← 返回</button>';
    html += '<h2 style="margin-bottom:15px;font-size:22px">' + cat.icon + ' ' + cat.name + '</h2>';
    for (const [sk, sub] of Object.entries(cat.subcategories)) {
        html += '<h3 style="margin:15px 0 8px;color:#667eea;font-size:16px">' + sub.name + ' (' + sub.words.length + ')</h3><div class="vocab-grid">';
        for (const w of sub.words) {
            const ph = getPhonetic(w.en);
            const se = w.en.replace(/'/g, "\\'"), sm = w.ms.replace(/'/g, "\\'");
            html += '<div class="vocab-card-mini">' +
                '<div class="vcm-zh">' + w.zh + '</div>' +
                '<div class="vcm-en">' + w.en + (ph ? ' <span class="vcm-phonetic">' + ph + '</span>' : '') + '</div>' +
                '<div class="vcm-ms">' + w.ms + '</div>' +
                '<div class="vcm-btns">' +
                '<button class="speak-mini" onclick="speak(\'' + se + '\')">🔊 EN</button>' +
                '<button class="speak-mini" onclick="speakMY(\'' + sm + '\')">🔊 MY</button></div>' +
                '<div class="vcm-ex"><span>' + w.ex + '</span><br><span style="color:#6c757d;font-size:12px">' + w.ex_zh + '</span></div></div>';
        }
        html += '</div>';
    }
    // Embed Malay learning
    html += '<div style="margin-top:30px;padding-top:25px;border-top:3px solid #667eea">' +
        '<h3 style="color:#667eea;margin-bottom:15px;font-size:20px">🇲🇾 马来语练习 - ' + cat.name + '</h3>' +
        '<div style="display:flex;gap:10px;margin-bottom:15px;flex-wrap:wrap">' +
        '<button class="malay-tab active" onclick="showCatMalay(this,\'spelling\',\'' + key + '\')">拼写练习</button>' +
        '<button class="malay-tab" onclick="showCatMalay(this,\'listening\',\'' + key + '\')">听力练习</button>' +
        '<button class="malay-tab" onclick="showCatMalay(this,\'reading\')">阅读理解</button></div>' +
        '<div id="catMalayContent"></div></div>';
    vl.innerHTML = html;
    trackActivity({ words_learned: 1 });
    setTimeout(() => { const ft = vl.querySelector('.malay-tab'); if (ft) showCatMalay(ft, 'spelling', key); }, 100);
}

function backToCategories() {
    document.getElementById('categoryGrid').style.display = 'grid';
    document.getElementById('vocabList').style.display = 'none';
    document.getElementById('vocabList').innerHTML = '';
}

// ===== Speech =====
function speak(text) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.85; u.volume = 1.0;
    speechSynthesis.speak(u);
}

function speakMY(text) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ms-MY'; u.rate = 0.8; u.volume = 1.0;
    // Try to find Malay voice, fallback to louder settings
    const voices = speechSynthesis.getVoices();
    const msVoice = voices.find(v => v.lang.startsWith('ms')) || voices.find(v => v.lang.startsWith('id'));
    if (msVoice) u.voice = msVoice;
    speechSynthesis.speak(u);
}

// Load voices
speechSynthesis.onvoiceschanged = () => { speechSynthesis.getVoices(); };

// ===== Dialogues =====
function initDialogues() {
    const c = document.getElementById('dialogueContent'); let html = '';
    DIALOGUES.forEach(d => {
        html += '<div class="dialogue-section"><div class="dialogue-title">📝 ' + d.title + ' / ' + d.titleEn + '</div>';
        d.lines.forEach(l => {
            html += '<div class="dialogue-line"><div class="speaker">' + l.speaker + '</div>' +
                '<div class="line-en">' + l.en + ' <button class="speak-btn" style="width:26px;height:26px;font-size:13px" onclick="speak(\'' + l.en.replace(/'/g, "\\'") + '\')">🔊</button></div>' +
                '<div class="line-zh">' + l.zh + '</div></div>';
        });
        html += '</div>';
    });
    c.innerHTML = html;
}

// ===== Listening (2 attempts, initials+phonetic, auto-advance) =====
function startListening() {
    listeningWords = getAllWords().sort(() => Math.random() - 0.5);
    listeningIndex = -1; listeningCorrect = 0; listeningTotal = 0;
    updateListeningUI();
    nextListeningWord();
}

function nextListeningWord() {
    if (listeningWords.length === 0) return;
    listeningIndex = (listeningIndex + 1) % listeningWords.length;
    currentWord = listeningWords[listeningIndex];
    listeningAttempts = 0;

    var hintEl = document.getElementById('listeningHint');
    var word = currentWord.en.replace(/[()]/g, '').trim();
    var parts = word.split(/\s+/);
    var initials = parts.map(function(p) { return p.charAt(0).toUpperCase() + '_'.repeat(Math.max(p.length - 1, 1)); }).join(' ');
    hintEl.innerHTML = initials;

    document.getElementById('listeningMeaning').textContent = '中文：' + currentWord.zh;

    var inp = document.getElementById('listeningAnswer');
    inp.value = ''; inp.disabled = false; inp.focus();
    inp.style.borderColor = '#e9ecef';

    document.getElementById('listeningFeedback').innerHTML = '';
    document.getElementById('listeningAttempt').textContent = '第 1 次机会（共2次）';

    speak(currentWord.en);
}

function playListening() {
    if (currentWord) speak(currentWord.en);
}

function checkListening() {
    if (!currentWord) return;
    const inp = document.getElementById('listeningAnswer');
    const answer = inp.value.trim().toLowerCase();
    if (!answer) return;

    const correct = currentWord.en.toLowerCase().replace(/[()]/g, '').trim();
    const parts = correct.split(/\s+/);
    const isCorrect = answer === correct ||
        parts.some(p => p.length > 3 && answer === p) ||
        (correct.includes(answer) && answer.length > 2);

    const fb = document.getElementById('listeningFeedback');

    if (isCorrect) {
        listeningTotal++;
        if (listeningAttempts === 0) {
            listeningCorrect++;
            trackActivity({ listening_correct: 1 });
        }
        var attemptText = listeningAttempts === 0 ? ' (首次拼对 +2分)' : ' (第2次拼对 +0分)';
        fb.innerHTML = '<span style="color:#28a745;font-weight:600">✅ 正确! ' + currentWord.en + attemptText + '</span>';
        inp.disabled = true; inp.style.borderColor = '#28a745';
        setTimeout(() => nextListeningWord(), 1500);
    } else {
        listeningAttempts++;
        if (listeningAttempts >= 2) {
            listeningTotal++;
            fb.innerHTML = '<span style="color:#dc3545;font-weight:600">❌ 正确答案: ' + currentWord.en + ' (' + currentWord.zh + ')</span>';
            inp.disabled = true; inp.style.borderColor = '#dc3545';
            if (!wrongWords.find(w => w.en === currentWord.en)) {
                wrongWords.push({ en: currentWord.en, zh: currentWord.zh, ms: currentWord.ms });
                localStorage.setItem('wrongWords', JSON.stringify(wrongWords));
            }
            setTimeout(() => nextListeningWord(), 2500);
        } else {
            fb.innerHTML = '<span style="color:#ffc107;font-weight:600">⚠ 不正确，还剩1次机会，请再试</span>';
            inp.value = ''; inp.style.borderColor = '#ffc107'; inp.focus();
            document.getElementById('listeningAttempt').textContent = '第 2 次机会（共2次）';
            speak(currentWord.en);
        }
    }
    updateListeningUI();
}

function updateListeningUI() {
    document.getElementById('correctCount').textContent = listeningCorrect;
    document.getElementById('totalCount').textContent = listeningTotal;
    document.getElementById('accuracy').textContent = (listeningTotal > 0 ? Math.round(listeningCorrect / listeningTotal * 100) : 0) + '%';
    document.getElementById('wrongCount').textContent = wrongWords.length;
}

// ===== Category Malay Learning =====
function showCatMalay(el, tab, catKey) {
    if (el) { el.parentElement.querySelectorAll('.malay-tab').forEach(t => t.classList.remove('active')); el.classList.add('active'); }
    const c = document.getElementById('catMalayContent'); if (!c) return;

    if (tab === 'spelling') {
        const cat = VOCABULARY[catKey]; if (!cat) return;
        let words = [];
        for (const sub of Object.values(cat.subcategories))
            words.push(...sub.words.map(w => ({ ms: w.ms, zh: w.zh, en: w.en, hint: w.ms.split(' ').map(x => x.charAt(0) + '_'.repeat(Math.min(x.length-1,4))).join(' ') })));
        words.sort(() => Math.random() - 0.5); words = words.slice(0, 8);
        let html = '<h4 style="margin-bottom:12px">看中文，拼写马来语</h4>';
        words.forEach((w, i) => {
            html += '<div style="background:#f8f9fa;padding:12px;border-radius:8px;margin-bottom:8px">' +
                '<div style="font-size:16px;font-weight:600;margin-bottom:4px">' + w.zh + '</div>' +
                '<div style="color:#6c757d;font-size:13px;margin-bottom:6px">提示: ' + w.hint + '</div>' +
                '<div style="display:flex;gap:8px"><input type="text" id="cs-' + i + '" placeholder="输入马来语..." style="flex:1;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
                '<button class="speak-mini" onclick="checkCS(' + i + ',\'' + w.ms.replace(/'/g, "\\'") + '\')">检查</button></div>' +
                '<div id="csr-' + i + '" style="margin-top:4px;font-size:14px"></div></div>';
        });
        c.innerHTML = html;
    }
    else if (tab === 'listening') {
        const cat = VOCABULARY[catKey]; if (!cat) return;
        let words = [];
        for (const sub of Object.values(cat.subcategories))
            words.push(...sub.words.map(w => ({ en: w.en, ms: w.ms, zh: w.zh })));
        const correct = words[Math.floor(Math.random() * words.length)];
        const opts = [correct];
        while (opts.length < 4) { const o = words[Math.floor(Math.random() * words.length)]; if (!opts.find(x => x.zh === o.zh)) opts.push(o); }
        opts.sort(() => Math.random() - 0.5);
        window._mlAnswer = correct.zh; window._mlKey = catKey;
        let html = '<div style="text-align:center;margin-bottom:12px"><button class="control-btn" style="font-size:18px;padding:15px 35px" onclick="speakMY(\'' + correct.ms.replace(/'/g, "\\'") + '\')">🔊 点击听马来语</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
        opts.forEach(o => { html += '<div class="category-card" style="padding:15px;cursor:pointer" onclick="checkML(this,\'' + o.zh.replace(/'/g, "\\'") + '\')"><div style="font-size:15px">' + o.zh + '</div></div>'; });
        html += '</div>';
        c.innerHTML = html; speakMY(correct.ms);
    }
    else if (tab === 'reading') {
        let html = '';
        MALAY_DATA.readings.forEach(r => {
            html += '<div style="background:#f8f9fa;padding:18px;border-radius:8px;margin-bottom:12px">' +
                '<div style="font-weight:600;margin-bottom:8px">' + r.titleMs + ' / ' + r.title + '</div>' +
                '<div style="line-height:1.8;margin-bottom:10px">' + r.content + '</div>' +
                '<button class="speak-mini" onclick="speakMY(\'' + r.content.replace(/'/g, "\\'") + '\')">🔊 朗读</button>' +
                '<div style="margin-top:10px;padding:10px;background:#fff3cd;border-radius:6px;font-size:14px"><strong>翻译：</strong>' + r.translation + '</div>';
            r.questions.forEach(q => { html += '<div style="margin-top:8px;font-size:14px"><strong>' + q.q + '</strong> <span style="color:#6c757d">(' + q.q_zh + ')</span><br><span style="color:#28a745">答案: ' + q.a + '</span></div>'; });
            html += '</div>';
        });
        c.innerHTML = html;
    }
}

function checkCS(i, correct) {
    const inp = document.getElementById('cs-' + i).value.trim().toLowerCase();
    const r = document.getElementById('csr-' + i);
    if (inp === correct.toLowerCase()) { r.innerHTML = '<span style="color:#28a745">✅ 正确!</span>'; trackActivity({ malay_exercises: 1 }); }
    else r.innerHTML = '<span style="color:#dc3545">❌ 答案: ' + correct + '</span>';
}
function checkML(el, answer) {
    const correct = window._mlAnswer === answer;
    el.style.borderColor = correct ? '#28a745' : '#dc3545';
    el.style.background = correct ? '#d4edda' : '#f8d7da';
    if (correct) trackActivity({ malay_exercises: 1 });
    setTimeout(() => showCatMalay(null, 'listening', window._mlKey), 1500);
}

// ===== Writing =====
function initWriting() {
    const c = document.getElementById('writingContent');
    let html = '<div class="writing-tabs">' +
        '<button class="malay-tab active" onclick="showWT(this,\'templates\')">邮件模板</button>' +
        '<button class="malay-tab" onclick="showWT(this,\'knowledge\')">品质知识库</button></div>';
    html += '<div id="writingTemplates">';
    WRITING_TEMPLATES.forEach(t => {
        html += '<div class="dialogue-section"><div class="dialogue-title">✍️ ' + t.title + '</div><p style="color:#6c757d;margin-bottom:12px">' + t.titleEn + '</p><div style="background:#f8f9fa;padding:18px;border-radius:8px">';
        t.template.forEach(l => {
            if (!l.en && !l.zh) { html += '<br>'; return; }
            html += '<div style="margin-bottom:6px"><span>' + l.en + '</span><br><span style="color:#6c757d;font-size:13px">' + l.zh + '</span></div>';
        });
        html += '</div></div>';
    });
    html += '</div><div id="writingKnowledge" style="display:none">';
    WRITING_KNOWLEDGE.forEach(k => {
        html += '<div class="dialogue-section"><div class="dialogue-title">' + k.icon + ' ' + k.title + '</div>';
        k.sections.forEach(s => {
            html += '<h4 style="color:#667eea;margin:12px 0 8px">' + s.heading + '</h4><ul style="padding-left:20px;color:#495057">';
            s.items.forEach(i => { html += '<li style="margin-bottom:6px;line-height:1.6">' + i + '</li>'; });
            html += '</ul>';
        });
        html += '</div>';
    });
    html += '</div>';
    c.innerHTML = html;
}

function showWT(el, tab) {
    document.querySelectorAll('.writing-tabs .malay-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('writingTemplates').style.display = tab === 'templates' ? 'block' : 'none';
    document.getElementById('writingKnowledge').style.display = tab === 'knowledge' ? 'block' : 'none';
}

// ===== Leaderboard =====
async function loadLeaderboard(period) {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    try {
        const r = await fetch('/api/leaderboard/' + period, { headers: { 'Authorization': 'Bearer ' + token } });
        if (!r.ok) return;
        const data = await r.json();
        const c = document.getElementById('leaderboardContent');
        // Show scoring rules
        let html = '<div style="background:#f0f4ff;padding:15px;border-radius:8px;margin-bottom:20px;font-size:14px">' +
            '<strong>📊 积分规则：</strong> 词汇学习 +1分/次 | 听力正确 +2分/次（首次答对）<br>' +
            '<strong>⚠️ 注意：</strong> 听力第2次答对不计分，2次都错不计分且纳入错题本。对话/马来语/写作不计入排名积分。</div>';
        if (!data || data.length === 0) { html += '<div style="text-align:center;padding:40px;color:#6c757d">暂无数据，开始学习吧！</div>'; c.innerHTML = html; return; }
        data.forEach((u, i) => {
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i+1);
            const isMe = u.username === currentUser.username;
            html += '<div style="display:flex;align-items:center;padding:12px 18px;border-bottom:1px solid #e9ecef' + (isMe ? ';background:#fff3cd' : '') + '">' +
                '<div style="width:35px;font-size:18px;text-align:center">' + medal + '</div>' +
                '<div style="flex:1"><div style="font-weight:600">' + u.username + (isMe ? ' (我)' : '') + '</div>' +
                '<div style="font-size:13px;color:#6c757d">' + (u.department||'') +
                ' · 词汇' + (u.words_learned||0) + '分' +
                ' · 听力' + (u.listening_correct||0) + '分' +
                ' · ' + (u.active_days||0) + '天</div></div>' +
                '<div style="font-size:18px;font-weight:700;color:#667eea">⭐' + (u.total_points||0) + '</div></div>';
        });
        c.innerHTML = html;
    } catch(e) {}
}

// ===== Admin =====
function initAdmin() {
    if (!isAdmin) return;
    const c = document.getElementById('adminContent');
    let html = '<div style="margin-bottom:20px;border-bottom:2px solid #e9ecef;display:flex;gap:5px;padding-bottom:10px;flex-wrap:wrap">';
    html += '<button class="control-btn admin-tab active" onclick="switchAdminTab(this,\'vocab\')" style="padding:10px 20px;font-size:14px">\u{1F4DA} 词汇管理</button>';
    html += '<button class="control-btn admin-tab" onclick="switchAdminTab(this,\'dialogue\')" style="padding:10px 20px;font-size:14px">💬 对话管理</button>';
    html += '<button class="control-btn admin-tab" onclick="switchAdminTab(this,\'writing\')" style="padding:10px 20px;font-size:14px">✍️ 写作管理</button>';
    html += '<button class="control-btn admin-tab" onclick="switchAdminTab(this,\'bulk\')" style="padding:10px 20px;font-size:14px">\u{1F4E5} 批量导入</button>';
    html += '<button class="control-btn admin-tab" onclick="switchAdminTab(this,\'users\')" style="padding:10px 20px;font-size:14px">\u{1F465} 用户管理</button>';
    html += '<button class="control-btn admin-tab" onclick="switchAdminTab(this,\'wrong\')" style="padding:10px 20px;font-size:14px">\u{1F4D5} 错题本</button>';
    html += '</div><div id="adminTabContent"></div>';
    c.innerHTML = html;
    switchAdminTab(document.querySelector('.admin-tab'), 'vocab');
}

function switchAdminTab(btn, tab) {
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const content = document.getElementById('adminTabContent');
    
    if (tab === 'vocab') {
        let html = '<div class="dialogue-section"><div class="dialogue-title">\u2795 添加新词汇</div>';
        html += '<select id="adminCategory" style="padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px;width:100%">';
        for (const [k,v] of Object.entries(VOCABULARY)) {
            html += '<option value="' + k + '">' + v.icon + ' ' + v.name + '</option>';
        }
        html += '</select>';
        html += '<input id="adminSubcategory" placeholder="子分类key (如 basic/defects/tools)" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px">';
        html += '<input id="adminEn" placeholder="English" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="adminZh" placeholder="中文" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="adminMs" placeholder="Malay" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="adminEx" placeholder="Example (English)" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="adminExZh" placeholder="例句翻译 (中文)" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px">';
        html += '<button class="control-btn" onclick="adminAddWord()">\u2795 添加词汇</button>';
        html += '<div id="adminResult" style="margin-top:10px"></div></div>';
        html += '<div class="dialogue-section" style="margin-top:20px"><div class="dialogue-title">\u{1F4CB} 已添加的自定义词汇</div><div id="customWordsList">加载中...</div></div>';
        content.innerHTML = html;
        loadCustomWords();
    } else if (tab === 'bulk') {
        let html = '<div class="dialogue-section"><div class="dialogue-title">\u{1F4E5} 批量导入 (JSON格式)</div>';
        html += '<p style="margin-bottom:10px;color:#6c757d;font-size:13px">格式: [{"en":"English", "zh":"中文", "ms":"Malay", "ex":"Example", "ex_zh":"例句翻译"}]</p>';
        html += '<select id="bulkCategory" style="padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px;width:100%">';
        for (const [k,v] of Object.entries(VOCABULARY)) {
            html += '<option value="' + k + '">' + v.icon + ' ' + v.name + '</option>';
        }
        html += '</select>';
        html += '<input id="bulkSubcategory" placeholder="子分类key" value="basic" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px">';
        html += ' < textarea id = "adminBulk" style = "width:100%;height:150px;padding:10px;border:2px solid #e9ecef;border-radius:8px;font-family:monospace" placeholder = "[{en:Quality}]" > </textarea>';
        html += '<div style="margin-top:10px;display:flex;gap:10px">';
        html += '<button class="control-btn" onclick="adminBulk()">\u{1F4E5} 导入</button>';
        html += '<button class="control-btn secondary" onclick="document.getElementById(\'fileInput\').click()">\u{1F4C1} 上传JSON文件</button>';
        html += '<input type="file" id="fileInput" accept=".json" style="display:none" onchange="uploadJsonFile(event)">';
        html += '</div><div id="bulkResult" style="margin-top:10px"></div></div>';
        content.innerHTML = html;
    } else if (tab === 'users') {
        content.innerHTML = '<div class="dialogue-section"><div class="dialogue-title">\u{1F465} 用户列表</div><div id="usersList">加载中...</div></div>';
        loadUsers();
    } else if (tab === 'wrong') {
        let html = '<div class="dialogue-section"><div class="dialogue-title">\u{1F4D5} 错题本 (' + wrongWords.length + '词)</div>';
        if (wrongWords.length === 0) {
            html += '<p style="color:#6c757d">暂无错题</p>';
        } else {
            html += '<div id="wrongWordsList">';
            wrongWords.forEach(function(w) {
                var safeEn = w.en.replace(/'/g, "\\'");
                html += '<div style="padding:8px;border-bottom:1px solid #e9ecef">' + w.en + ' - ' + w.zh + ' - ' + w.ms + ' <button class="speak-mini" onclick="speak(\'' + safeEn + '\')"\u{1F50A}</button></div>';
            });
            html += '</div>';
            html += '<button class="control-btn secondary" style="margin-top:10px" onclick="clearWrongWords()">清空错题本</button>';
        }
        html += '</div>';
        content.innerHTML = html;
    } else if (tab === 'dialogue') {
        var html = '<div class="dialogue-section"><div class="dialogue-title">\u2795 添加新对话</div>';
        html += '<input id="dialogueTitle" placeholder="对话标题 (如：客户验厂)" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="dialogueTitleEn" placeholder="English Title" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px">';
        html += '<div id="dialogueLinesContainer" style="margin-bottom:10px"></div>';
        html += '<button class="control-btn secondary" onclick="addDialogueLine()" style="margin-bottom:10px">\u2795 添加对话行</button><br>';
        html += '<button class="control-btn" onclick="adminAddDialogue()">\u2795 保存对话</button>';
        html += '<div id="dialogueResult" style="margin-top:10px"></div></div>';
        html += '<div class="dialogue-section" style="margin-top:20px"><div class="dialogue-title">\u{1F4CB} 现有对话列表</div><div id="dialogueList">';
        if (typeof DIALOGUES !== 'undefined') {
            DIALOGUES.forEach(function(d, idx) {
                html += '<div style="padding:10px;border-bottom:1px solid #e9ecef"><strong>' + d.title + ' / ' + d.titleEn + '</strong>';
                html += '<div style="font-size:12px;color:#6c757d">' + d.lines.length + ' 行对话</div></div>';
            });
        }
        html += '</div></div>';
        content.innerHTML = html;
        addDialogueLine();
    } else if (tab === 'writing') {
        var html = '<div class="dialogue-section"><div class="dialogue-title">\u2795 添加新写作模板</div>';
        html += '<input id="writingTitle" placeholder="模板标题 (如：品质投诉回复邮件)" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:8px">';
        html += '<input id="writingTitleEn" placeholder="English Title" style="width:100%;padding:10px;border:2px solid #e9ecef;border-radius:8px;margin-bottom:10px">';
        html += '<div id="writingLinesContainer" style="margin-bottom:10px"></div>';
        html += '<button class="control-btn secondary" onclick="addWritingLine()" style="margin-bottom:10px">\u2795 添加模板行</button><br>';
        html += '<button class="control-btn" onclick="adminAddWriting()">\u2795 保存模板</button>';
        html += '<div id="writingResult" style="margin-top:10px"></div></div>';
        html += '<div class="dialogue-section" style="margin-top:20px"><div class="dialogue-title">\u{1F4CB} 现有写作模板</div><div id="writingList">';
        if (typeof WRITING_TEMPLATES !== 'undefined') {
            WRITING_TEMPLATES.forEach(function(w, idx) {
                html += '<div style="padding:10px;border-bottom:1px solid #e9ecef"><strong>' + w.title + ' / ' + w.titleEn + '</strong>';
                html += '<div style="font-size:12px;color:#6c757d">' + w.template.length + ' 行模板</div></div>';
            });
        }
        html += '</div></div>';
        content.innerHTML = html;
        addWritingLine();
    }
}

async function loadCustomWords() {
    try {
        var r = await fetch('/api/admin/words', { headers: { 'Authorization': 'Bearer ' + token } });
        var words = await r.json();
        var list = document.getElementById('customWordsList');
        if (words.length === 0) {
            list.innerHTML = '<p style="color:#6c757d">暂无自定义词汇</p>';
        } else {
            var html = '';
            words.forEach(function(w) {
                html += '<div style="padding:10px;border-bottom:1px solid #e9ecef;display:flex;justify-content:space-between;align-items:center">';
                html += '<div><strong>' + w.en + '</strong> - ' + w.zh + ' - ' + w.ms + '<div style="font-size:12px;color:#6c757d">分类: ' + w.category + '/' + w.subcategory + '</div></div>';
                html += '<button class="control-btn secondary" onclick="deleteCustomWord(' + w.id + ')" style="padding:5px 10px;font-size:12px">删除</button>';
                html += '</div>';
            });
            list.innerHTML = html;
        }
    } catch(e) {
        document.getElementById('customWordsList').innerHTML = '<p style="color:#dc3545">加载失败</p>';
    }
}

async function deleteCustomWord(id) {
    if (!confirm('确定删除此词汇？')) return;
    try {
        var r = await fetch('/api/admin/word/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } });
        var d = await r.json();
        if (d.success) { loadCustomWords(); alert('删除成功'); }
    } catch(e) { alert('删除失败'); }
}

async function loadUsers() {
    try {
        var r = await fetch('/api/admin/users', { headers: { 'Authorization': 'Bearer ' + token } });
        var users = await r.json();
        var list = document.getElementById('usersList');
        var html = '';
        users.forEach(function(u) {
            html += '<div style="padding:10px;border-bottom:1px solid #e9ecef"><strong>' + u.username + '</strong>';
            if (u.role === 'admin') html += ' <span style="color:#667eea">[管理员]</span>';
            html += '<div style="font-size:12px;color:#6c757d">部门: ' + (u.department || '未设置') + ' | 注册: ' + u.created_at + '</div></div>';
        });
        list.innerHTML = html;
    } catch(e) {
        document.getElementById('usersList').innerHTML = '<p style="color:#dc3545">加载失败</p>';
    }
}

async function uploadJsonFile(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = async function(e) {
        try {
            var data = JSON.parse(e.target.result);
            var cat = document.getElementById('bulkCategory').value;
            var sub = document.getElementById('bulkSubcategory').value.trim() || 'basic';
            var r = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ type: 'words', category: cat, subcategory: sub, data: data })
            });
            var d = await r.json();
            document.getElementById('bulkResult').innerHTML = '<p style="color:#28a745">\u2705 ' + d.message + '</p>';
        } catch(err) {
            document.getElementById('bulkResult').innerHTML = '<p style="color:#dc3545">导入失败: ' + err.message + '</p>';
        }
    };
    reader.readAsText(file);
}

async function adminAddWord() {
    const data = {
        category: document.getElementById('adminCategory').value,
        subcategory: document.getElementById('adminSubcategory').value.trim() || 'basic',
        word: { en: document.getElementById('adminEn').value.trim(), zh: document.getElementById('adminZh').value.trim(), ms: document.getElementById('adminMs').value.trim(), ex: document.getElementById('adminEx').value.trim(), ex_zh: document.getElementById('adminExZh').value.trim() }
    };
    if (!data.word.en || !data.word.zh || !data.word.ms) { document.getElementById('adminResult').innerHTML = '<p style="color:#dc3545">请填写中英马三语</p>'; return; }
    try {
        const r = await fetch('/api/admin/word', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(data) });
        const d = await r.json();
        document.getElementById('adminResult').innerHTML = '<p style="color:#28a745">✅ ' + d.message + '</p>';
        if (VOCABULARY[data.category] && VOCABULARY[data.category].subcategories[data.subcategory])
            VOCABULARY[data.category].subcategories[data.subcategory].words.push(data.word);
        initCategories();
    } catch(e) { document.getElementById('adminResult').innerHTML = '<p style="color:#dc3545">添加失败</p>'; }
}

async function adminBulk() {
    const raw = document.getElementById('adminBulk').value.trim(); if (!raw) return;
    try {
        const words = JSON.parse(raw);
        const cat = document.getElementById('adminCategory').value;
        const sub = document.getElementById('adminSubcategory').value.trim() || 'basic';
        const r = await fetch('/api/admin/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ category: cat, subcategory: sub, words }) });
        const d = await r.json();
        document.getElementById('adminResult').innerHTML = '<p style="color:#28a745">✅ ' + d.message + '</p>';
        if (VOCABULARY[cat] && VOCABULARY[cat].subcategories[sub]) words.forEach(w => VOCABULARY[cat].subcategories[sub].words.push(w));
        initCategories();
    } catch(e) { document.getElementById('adminResult').innerHTML = '<p style="color:#dc3545">导入失败: ' + e.message + '</p>'; }
}

function clearWrongWords() {
    wrongWords = []; localStorage.removeItem('wrongWords'); initAdmin();
}

// ===== Admin: Dialogue Management =====
function addDialogueLine() {
    var container = document.getElementById('dialogueLinesContainer');
    if (!container) return;
    var div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center';
    div.innerHTML = '<input placeholder="Speaker (如: QC Inspector)" class="dlg-speaker" style="width:25%;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
        '<input placeholder="English" class="dlg-en" style="flex:1;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
        '<input placeholder="中文" class="dlg-zh" style="flex:1;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
        '<button onclick="this.parentElement.remove()" style="padding:8px 12px;border:none;background:#dc3545;color:white;border-radius:6px;cursor:pointer">❌</button>';
    container.appendChild(div);
}

function adminAddDialogue() {
    var title = document.getElementById('dialogueTitle').value.trim();
    var titleEn = document.getElementById('dialogueTitleEn').value.trim();
    if (!title || !titleEn) {
        document.getElementById('dialogueResult').innerHTML = '<p style="color:#dc3545">请填写对话标题</p>';
        return;
    }
    var speakers = document.querySelectorAll('.dlg-speaker');
    var ens = document.querySelectorAll('.dlg-en');
    var zhs = document.querySelectorAll('.dlg-zh');
    var lines = [];
    for (var i = 0; i < speakers.length; i++) {
        var s = speakers[i].value.trim();
        var e = ens[i].value.trim();
        var z = zhs[i].value.trim();
        if (s && e && z) lines.push({ speaker: s, en: e, zh: z });
    }
    if (lines.length === 0) {
        document.getElementById('dialogueResult').innerHTML = '<p style="color:#dc3545">请至少添加一行完整对话</p>';
        return;
    }
    var dialogue = { title: title, titleEn: titleEn, lines: lines };
    if (typeof DIALOGUES !== 'undefined') DIALOGUES.push(dialogue);
    document.getElementById('dialogueResult').innerHTML = '<p style="color:#28a745">✅ 对话已添加: ' + title + ' (' + lines.length + ' 行)</p>';
    document.getElementById('dialogueTitle').value = '';
    document.getElementById('dialogueTitleEn').value = '';
    document.getElementById('dialogueLinesContainer').innerHTML = '';
    addDialogueLine();
    setTimeout(function() { switchAdminTab(document.querySelector('.admin-tab.active'), 'dialogue'); }, 1000);
}

// ===== Admin: Writing Management =====
function addWritingLine() {
    var container = document.getElementById('writingLinesContainer');
    if (!container) return;
    var div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center';
    div.innerHTML = '<input placeholder="English line" class="wrt-en" style="flex:1;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
        '<input placeholder="中文" class="wrt-zh" style="flex:1;padding:8px;border:2px solid #e9ecef;border-radius:6px">' +
        '<button onclick="this.parentElement.remove()" style="padding:8px 12px;border:none;background:#dc3545;color:white;border-radius:6px;cursor:pointer">❌</button>';
    container.appendChild(div);
}

function adminAddWriting() {
    var title = document.getElementById('writingTitle').value.trim();
    var titleEn = document.getElementById('writingTitleEn').value.trim();
    if (!title || !titleEn) {
        document.getElementById('writingResult').innerHTML = '<p style="color:#dc3545">请填写模板标题</p>';
        return;
    }
    var ens = document.querySelectorAll('.wrt-en');
    var zhs = document.querySelectorAll('.wrt-zh');
    var template = [];
    for (var i = 0; i < ens.length; i++) {
        var e = ens[i].value.trim();
        var z = zhs[i].value.trim();
        if (e && z) template.push({ en: e, zh: z });
    }
    if (template.length === 0) {
        document.getElementById('writingResult').innerHTML = '<p style="color:#dc3545">请至少添加一行完整模板</p>';
        return;
    }
    var writing = { title: title, titleEn: titleEn, template: template };
    if (typeof WRITING_TEMPLATES !== 'undefined') WRITING_TEMPLATES.push(writing);
    document.getElementById('writingResult').innerHTML = '<p style="color:#28a745">✅ 写作模板已添加: ' + title + ' (' + template.length + ' 行)</p>';
    document.getElementById('writingTitle').value = '';
    document.getElementById('writingTitleEn').value = '';
    document.getElementById('writingLinesContainer').innerHTML = '';
    addWritingLine();
    setTimeout(function() { switchAdminTab(document.querySelector('.admin-tab.active'), 'writing'); }, 1000);
}

// ===== Activity =====
async function trackActivity(data) {
    if (!token) return;
    try { await fetch('/api/activity', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(data) }); loadUserStats(); } catch(e) {}
}
async function loadUserStats() {
    if (!token) return;
    try { const r = await fetch('/api/stats', { headers: { 'Authorization': 'Bearer ' + token } }); if (!r.ok) return; const s = await r.json(); document.getElementById('userPoints').textContent = '⭐ ' + (s.total_points||0); } catch(e) {}
}

document.addEventListener('DOMContentLoaded', async () => {
  if (token && currentUser) {
    try {
      const r = await fetch('/api/verify', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (r.ok) {
        const data = await r.json();
        currentUser = data.user;
        isAdmin = currentUser.role === 'admin';
        localStorage.setItem('user', JSON.stringify(currentUser));
        showApp();
      } else if (r.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        token = null;
        currentUser = null;
      }
    } catch (e) {
      console.error('[Auth] Verification failed:', e);
      showApp();
    }
  }
});


