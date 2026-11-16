const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // 监听控制台输出
  const logs = [];
  page.on('console', msg => logs.push('[CONSOLE] ' + msg.text()));
  page.on('pageerror', err => logs.push('[PAGE ERROR] ' + err.message));
  
  // 监听网络请求
  const requests = [];
  page.on('requestfailed', req => requests.push('[REQUEST FAILED] ' + req.url()));
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    
    // 等待登录表单出现
    await page.waitForSelector('#loginUsername', { timeout: 5000 });
    
    // 填写登录表单
    await page.type('#loginUsername', 'testuser');
    await page.type('#loginPassword', 'test123');
    
    // 点击登录按钮
    await page.click('button.btn-primary');
    
    // 等待响应（检查是否成功登录或显示错误）
    await page.waitForTimeout(2000);
    
    // 检查结果
    const errorText = await page.evaluate(() => {
      const errorEl = document.querySelector('#loginError');
      return errorEl ? errorEl.textContent : '';
    });
    
    const appVisible = await page.evaluate(() => {
      const appEl = document.querySelector('#app');
      return appEl && appEl.style.display !== 'none';
    });
    
    const modalVisible = await page.evaluate(() => {
      const modal = document.querySelector('#authModal');
      return modal && modal.classList.contains('active');
    });
    
    console.log('=== LOGIN TEST RESULTS ===');
    console.log('Error message:', errorText || '(none)');
    console.log('App visible:', appVisible);
    console.log('Modal visible:', modalVisible);
    console.log('Success:', appVisible && !modalVisible && !errorText);
    
    if (logs.length > 0) {
      console.log('\n=== CONSOLE LOGS ===');
      logs.forEach(l => console.log(l));
    }
    
    if (requests.length > 0) {
      console.log('\n=== FAILED REQUESTS ===');
      requests.forEach(r => console.log(r));
    }
    
  } catch (e) {
    console.log('TEST ERROR:', e.message);
  }
  
  await browser.close();
})();
