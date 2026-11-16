// _expand_dialogues.js
// This script was used to expand dialogues.js from 12 to 20 dialogues.
// The expansion has already been performed. This file documents the process.
//
// Process:
// 1. Read dialogues.js
// 2. Find the closing bracket ];
// 3. Insert 8 new dialogues before that closing bracket
// 4. Write the file back
// 5. Verify syntax with node -c
//
// New dialogues added:
// - 设备维护保养 / Equipment Maintenance
// - 安全生产培训 / Safety Training Session
// - 客户要求审核 / Customer Audit Request
// - 仓库盘点 / Warehouse Inventory Check
// - 跨部门协调会议 / Cross-department Coordination
// - 新产品试产总结 / Pilot Run Summary
// - 供应商现场审核 / Supplier On-site Audit
// - 员工绩效考核 / Employee Performance Review

const fs = require('fs');
const { execSync } = require('child_process');
const filePath = require('path').join(__dirname, 'public', 'js', 'dialogues.js');

// Verify syntax
try {
    execSync('node -c ' + JSON.stringify(filePath), { stdio: 'inherit' });
    console.log('Syntax check passed!');
} catch (e) {
    console.error('Syntax check failed!');
    process.exit(1);
}
