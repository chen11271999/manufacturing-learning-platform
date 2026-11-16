const fs = require('fs');

// 读取 index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// 新的听力部分HTML
const newSection = [
  '<section id="listening-section" class="section">',
  '                <div class="listening-container">',
  '                    <h2>🎧 听力训练</h2>',
  '                    <div style="background:#f0f4ff;padding:12px;border-radius:8px;margin-bottom:20px;font-size:13px">',
  '                        <strong>积分规则：</strong>首次拼对 +2分 | 第2次拼对 +0分 | 2次都错 +0分且纳入错题本',
  '                    </div>',
  '                    <div class="listening-controls" style="margin-bottom:20px">',
  '                        <button class="control-btn" onclick="startListening()" style="font-size:18px;padding:15px 40px">🚀 开始训练</button>',
  '                        <button class="control-btn secondary" onclick="playListening()">🔊 再听一次</button>',
  '                    </div>',
  '                    <div class="word-display" id="listeningWord" style="font-size:48px;margin:30px 0;letter-spacing:8px;font-family:monospace">点击"开始训练"按钮</div>',
  '                    <div id="listeningMeaning" style="text-align:center;font-size:20px;color:#6c757d;margin-bottom:20px;min-height:30px"></div>',
  '                    <div class="answer-input" style="max-width:500px;margin:0 auto">',
  '                        <input type="text" id="listeningAnswer" placeholder="输入单词拼写..." onkeypress="if(event.key===\x27Enter\x27)checkListening()" style="text-align:center;font-size:20px;padding:15px">',
  '                        <button onclick="checkListening()" class="btn-primary" style="padding:15px 25px;font-size:18px">✅ 检查</button>',
  '                    </div>',
  '                    <div id="listeningAttempt" style="text-align:center;margin:8px 0;font-size:14px;color:#6c757d"></div>',
  '                    <div id="listeningFeedback" style="text-align:center;margin:8px 0;font-size:16px;min-height:24px"></div>',
  '                    <div class="stats">',
  '                        <div class="stat-item">',
  '                            <div class="stat-value" id="correctCount">0</div>',
  '                            <div class="stat-label">首次正确</div>',
  '                        </div>',
  '                        <div class="stat-item">',
  '                            <div class="stat-value" id="totalCount">0</div>',
  '                            <div class="stat-label">总题数</div>',
  '                        </div>',
  '                        <div class="stat-item">',
  '                            <div class="stat-value" id="accuracy">0%</div>',
  '                            <div class="stat-label">准确率</div>',
  '                        </div>',
  '                        <div class="stat-item">',
  '                            <div class="stat-value" id="wrongCount" style="color:#dc3545">0</div>',
  '                            <div class="stat-label">错题数</div>',
  '                        </div>',
  '                    </div>',
  '                </div>',
  '            </section>'
].join('\n');

// 替换听力部分
html = html.replace(
  /<section id="listening-section" class="section">[\s\S]*?<\/section>/,
  newSection
);

fs.writeFileSync('public/index.html', html);
console.log('✅ UI 已更新');