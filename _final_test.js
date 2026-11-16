const http = require('http');

function req(method, path, data, headers) {
  return new Promise((resolve) => {
    const opts = { hostname: 'localhost', port: 3000, path, method, headers: headers || {} };
    if (data) {
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(data);
    }
    const r = http.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    if (data) r.write(data);
    r.end();
  });
}

async function test() {
  console.log('=== 最终完整测试 ===\n');

  // 1. Health check
  let r = await req('GET', '/api/health');
  console.log('1. Health:', r.status, r.body);

  // 2. Login with correct password
  r = await req('POST', '/api/login', JSON.stringify({ username: 'testuser', password: 'test123' }));
  const loginResult = JSON.parse(r.body);
  console.log('2. Login:', r.status, 'token=' + (loginResult.token ? 'OK' : 'FAIL'));

  // 3. Verify token
  r = await req('GET', '/api/verify', null, { 'Authorization': 'Bearer ' + loginResult.token });
  console.log('3. Verify:', r.status, r.body);

  // 4. Wrong password
  r = await req('POST', '/api/login', JSON.stringify({ username: 'testuser', password: 'wrong' }));
  console.log('4. Wrong pass:', r.status, r.body);

  // 5. Frontend page
  r = await req('GET', '/');
  console.log('5. Frontend:', r.status, r.body.includes('loginUsername') ? 'has login form' : 'NO login form');

  // 6. JS syntax check
  r = await req('GET', '/js/app.js');
  try { new Function(r.body); console.log('6. app.js: syntax OK'); } 
  catch(e) { console.log('6. app.js: SYNTAX ERROR -', e.message); }

  console.log('\n=== 测试完成 ===');
}
test();
