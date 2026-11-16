const DIALOGUES = [
    {
        title: "来料检验", titleEn: "Incoming Inspection",
        lines: [
            { speaker: "QC Inspector", en: "Good morning. We have a new shipment to inspect.", zh: "早上好。我们有一批新货要检验。" },
            { speaker: "Warehouse Staff", en: "Yes, the materials arrived this morning. Here is the delivery note.", zh: "是的，材料今早到了。这是送货单。" },
            { speaker: "QC Inspector", en: "Thank you. Let me check the lot number and quantity first.", zh: "谢谢。让我先检查批号和数量。" },
            { speaker: "QC Inspector", en: "The quantity matches. Now let's do the sampling inspection.", zh: "数量对得上。现在做抽样检验。" },
            { speaker: "QC Inspector", en: "I found 3 defective units out of 50 samples. The defect rate is 6%.", zh: "50个样品中发现3个不良品。不良率6%。" },
            { speaker: "Warehouse Staff", en: "That's above the AQL of 2.5%. What should we do?", zh: "这超过了AQL 2.5%。我们该怎么办？" },
            { speaker: "QC Inspector", en: "We need to reject this batch and issue a non-conformance report.", zh: "我们需要拒收这批并开不符合报告。" },
            { speaker: "Warehouse Staff", en: "OK, I'll put it in the quarantine area and notify procurement.", zh: "好的，我放到隔离区并通知采购。" }
        ]
    },
    {
        title: "产线异常处理", titleEn: "Production Line Issue",
        lines: [
            { speaker: "Line Leader", en: "QA, we have a problem on line 3. The yield rate dropped to 88%.", zh: "QA，3号线有问题。良率降到88%了。" },
            { speaker: "QA Engineer", en: "That's below our target of 95%. When did it start?", zh: "这低于我们95%的目标。什么时候开始的？" },
            { speaker: "Line Leader", en: "About 2 hours ago, after we changed the mold.", zh: "大约2小时前，换模具之后。" },
            { speaker: "QA Engineer", en: "Let me check the first article inspection report.", zh: "让我检查首件检验报告。" },
            { speaker: "Line Leader", en: "Yes, here it is. All dimensions are within tolerance.", zh: "有的。所有尺寸都在公差内。" },
            { speaker: "QA Engineer", en: "The issue might be the injection pressure. Let's adjust it.", zh: "问题可能是注塑压力。让我们调整一下。" },
            { speaker: "QA Engineer", en: "Run 10 pieces for verification after adjustment.", zh: "调整后跑10件验证。" },
            { speaker: "Line Leader", en: "OK. The yield is back to 96% now.", zh: "好的。良率恢复到96%了。" }
        ]
    },
    {
        title: "供应商会议", titleEn: "Supplier Meeting",
        lines: [
            { speaker: "Procurement Manager", en: "Thank you for coming. We need to discuss the delivery delay.", zh: "感谢到来。我们需要讨论交货延迟问题。" },
            { speaker: "Supplier", en: "We apologize for the delay. We had production issues last month.", zh: "我们为延迟道歉。上个月有生产问题。" },
            { speaker: "Procurement Manager", en: "This is affecting our production schedule significantly.", zh: "这严重影响了我们的生产计划。" },
            { speaker: "Supplier", en: "We will increase capacity and ensure on-time delivery.", zh: "我们会增加产能并确保准时交货。" },
            { speaker: "Procurement Manager", en: "Please send your improvement plan by Friday.", zh: "请在周五前发改善计划。" },
            { speaker: "Supplier", en: "Yes. We can also offer 5% cost reduction for next year.", zh: "好的。我们还可以为明年提供5%降本。" },
            { speaker: "Procurement Manager", en: "That sounds good. Let's also discuss quality improvement.", zh: "很好。让我们也讨论品质改善。" },
            { speaker: "Supplier", en: "We've hired a new quality engineer to strengthen our QC team.", zh: "我们新招了一位品质工程师来加强QC团队。" }
        ]
    },
    {
        title: "客户投诉处理", titleEn: "Customer Complaint Handling",
        lines: [
            { speaker: "Customer", en: "We received your shipment but found 5% defective parts.", zh: "我们收到货但发现5%不良品。" },
            { speaker: "Quality Manager", en: "I'm very sorry to hear that. Can you send photos and details?", zh: "很抱歉。您能发照片和详情吗？" },
            { speaker: "Customer", en: "Yes, the main issue is surface scratches on the housing.", zh: "有的。主要问题是外壳表面刮伤。" },
            { speaker: "Quality Manager", en: "We will investigate and provide an 8D report within 48 hours.", zh: "我们会调查并在48小时内提供8D报告。" },
            { speaker: "Customer", en: "Good. We also need replacement parts urgently.", zh: "好的。我们也需要紧急补货。" },
            { speaker: "Quality Manager", en: "We will arrange air freight for replacement at our cost.", zh: "我们会安排空运补货，费用我们承担。" },
            { speaker: "Customer", en: "Thank you. Please also include root cause analysis.", zh: "谢谢。请也包含根本原因分析。" },
            { speaker: "Quality Manager", en: "Absolutely. We will also implement preventive actions.", zh: "当然。我们也会实施预防措施。" }
        ]
    },
    {
        title: "早会交接班", titleEn: "Morning Meeting / Shift Handover",
        lines: [
            { speaker: "Supervisor", en: "Good morning, team. Let's start the morning meeting.", zh: "大家早上好。开始早会。" },
            { speaker: "Line Leader", en: "Yesterday's output was 480 units, target was 500.", zh: "昨天产量480台，目标500台。" },
            { speaker: "Supervisor", en: "What caused the shortfall?", zh: "什么原因导致未达标？" },
            { speaker: "Line Leader", en: "We had 30 minutes downtime on station 5 due to a jam.", zh: "5号工位卡料停机30分钟。" },
            { speaker: "Supervisor", en: "OK. Today's target is 520 units. Any quality issues?", zh: "好的。今天目标520台。有品质问题吗？" },
            { speaker: "Line Leader", en: "No major issues. Yield rate was 97.5%.", zh: "没有重大问题。良率97.5%。" },
            { speaker: "Supervisor", en: "Good. Let's focus on reducing downtime today.", zh: "好的。今天重点减少停机时间。" },
            { speaker: "Line Leader", en: "Understood. We'll do our best.", zh: "明白。我们会尽力。" }
        ]
    },
    {
        title: "新产品导入会议", titleEn: "NPI Meeting",
        lines: [
            { speaker: "Project Manager", en: "Let's review the NPI status for the new product.", zh: "让我们评审新产品NPI状态。" },
            { speaker: "Engineering", en: "The prototype is ready. DFM review is complete.", zh: "样件已准备好。DFM评审完成。" },
            { speaker: "Quality", en: "Do we have the inspection criteria and specifications?", zh: "检验标准和规格书有了吗？" },
            { speaker: "Engineering", en: "Yes, drawing revision B is released with all tolerances.", zh: "是的，图纸B版已发布，所有公差已定义。" },
            { speaker: "Project Manager", en: "When can we start the pilot run?", zh: "什么时候可以试产？" },
            { speaker: "Engineering", en: "We need 2 weeks for tooling. Pilot run in week 5.", zh: "模具需要2周准备。第5周试产。" },
            { speaker: "Quality", en: "I'll prepare the control plan and inspection checklist.", zh: "我会准备控制计划和检验表。" },
            { speaker: "Project Manager", en: "Good. Target mass production in week 8.", zh: "好的。目标第8周量产。" }
        ]
    },
    {
        title: "品质审核", titleEn: "Quality Audit",
        lines: [
            { speaker: "Lead Auditor", en: "Good morning. We'll begin the ISO 9001 surveillance audit.", zh: "早上好。我们开始ISO 9001监督审核。" },
            { speaker: "Quality Manager", en: "Welcome. We have prepared all required documents.", zh: "欢迎。我们已准备好所有需要的文件。" },
            { speaker: "Lead Auditor", en: "Let me review your corrective action records first.", zh: "让我先查看纠正措施记录。" },
            { speaker: "Quality Manager", en: "Here are the CAR logs. We closed 15 actions last quarter.", zh: "这是CAR记录。上季度关闭了15个行动项。" },
            { speaker: "Lead Auditor", en: "I see one CAR was closed without effectiveness verification.", zh: "我发现有一个CAR关闭时没有验证有效性。" },
            { speaker: "Quality Manager", en: "You're right. We will update the procedure to include verification.", zh: "您说得对。我们会更新程序加入验证步骤。" },
            { speaker: "Lead Auditor", en: "I'll note this as a minor nonconformity.", zh: "我会将此记录为轻微不符合项。" },
            { speaker: "Quality Manager", en: "Understood. We will submit the corrective action plan within one week.", zh: "明白。我们会在一周内提交纠正措施计划。" }
        ]
    },
    {
        title: "设备故障报告", titleEn: "Equipment Breakdown Report",
        lines: [
            { speaker: "Maintenance Engineer", en: "The CNC machine on line 2 had a breakdown at 3 AM.", zh: "2号线CNC机床凌晨3点故障了。" },
            { speaker: "Production Manager", en: "What's the root cause? How long to repair?", zh: "根本原因是什么？修好要多久？" },
            { speaker: "Maintenance Engineer", en: "The spindle bearing failed. We need a replacement part.", zh: "主轴轴承坏了。需要更换零件。" },
            { speaker: "Production Manager", en: "Do we have spare parts in stock?", zh: "仓库有备件吗？" },
            { speaker: "Maintenance Engineer", en: "No, we need to order. Lead time is 3 days.", zh: "没有，需要订购。交期3天。" },
            { speaker: "Production Manager", en: "That's too long. Can we outsource to another machine?", zh: "太久了。可以转到其他机器加工吗？" },
            { speaker: "Maintenance Engineer", en: "Yes, line 4 has a similar CNC. I'll reprogram it.", zh: "可以。4号线有类似的CNC。我重新编程。" },
            { speaker: "Production Manager", en: "Good. Also add this bearing to the preventive maintenance list.", zh: "好的。另外把这个轴承加入预防性维护清单。" }
        ]
    },
    {
        title: "仓库盘点", titleEn: "Warehouse Inventory Count",
        lines: [
            { speaker: "Warehouse Manager", en: "We need to do the monthly cycle count today.", zh: "今天要做月度循环盘点。" },
            { speaker: "Warehouse Staff", en: "Which items should we count first?", zh: "先盘点哪些物料？" },
            { speaker: "Warehouse Manager", en: "Start with the high-value items and fast-moving materials.", zh: "先盘高价值和快周转物料。" },
            { speaker: "Warehouse Staff", en: "I found a discrepancy. System shows 500, but actual count is 480.", zh: "我发现差异。系统显示500，实际480。" },
            { speaker: "Warehouse Manager", en: "That's a 4% variance. Check the recent transactions.", zh: "差异4%。检查最近的出入库记录。" },
            { speaker: "Warehouse Staff", en: "Found it. There was an unrecorded issue to production yesterday.", zh: "找到了。昨天有一笔未记录的发料到生产。" },
            { speaker: "Warehouse Manager", en: "Update the system and remind the team to record all movements.", zh: "更新系统并提醒团队记录所有出入库。" },
            { speaker: "Warehouse Staff", en: "Will do. I'll also check FIFO compliance.", zh: "好的。我也会检查先进先出执行情况。" }
        ]
    },
    {
        title: "新员工入职培训", titleEn: "New Employee Orientation",
        lines: [
            { speaker: "HR Manager", en: "Welcome to the company. Let me introduce our quality policy.", zh: "欢迎来到公司。让我介绍我们的品质方针。" },
            { speaker: "New Employee", en: "Thank you. What are the key quality objectives?", zh: "谢谢。主要的品质目标是什么？" },
            { speaker: "HR Manager", en: "Our targets are 98% yield rate and zero customer complaints.", zh: "我们的目标是98%良率和零客户投诉。" },
            { speaker: "New Employee", en: "What training do I need before starting work?", zh: "上岗前需要什么培训？" },
            { speaker: "HR Manager", en: "You need safety training, SOP training, and IPC certification.", zh: "需要安全培训、SOP培训和IPC认证。" },
            { speaker: "New Employee", en: "How long does the training take?", zh: "培训需要多长时间？" },
            { speaker: "HR Manager", en: "About one week. Your supervisor will assign a mentor.", zh: "大约一周。你的主管会指定一位导师。" },
            { speaker: "New Employee", en: "Great. When do I start?", zh: "好的。我什么时候开始？" }
        ]
    },
    {
        title: "模具更换讨论", titleEn: "Mold Change Discussion",
        lines: [
            { speaker: "Production Engineer", en: "We need to change the mold for the new product variant.", zh: "我们需要换模做新产品变体。" },
            { speaker: "Tooling Technician", en: "The new mold is ready. Let me check the mold condition.", zh: "新模具准备好了。让我检查模具状态。" },
            { speaker: "Production Engineer", en: "What's the estimated changeover time?", zh: "预计换模时间多久？" },
            { speaker: "Tooling Technician", en: "About 45 minutes including setup and first article.", zh: "大约45分钟，包括调试和首件。" },
            { speaker: "Production Engineer", en: "Can we reduce it? We have a tight schedule today.", zh: "能缩短吗？今天排程很紧。" },
            { speaker: "Tooling Technician", en: "If we pre-heat the mold, we can save 10 minutes.", zh: "如果预热模具，可以节省10分钟。" },
            { speaker: "Production Engineer", en: "Good idea. Let's start the changeover now.", zh: "好主意。现在开始换模。" },
            { speaker: "Tooling Technician", en: "OK. Please inform QC for the first article inspection.", zh: "好的。请通知QC做首件检验。" }
        ]
    },
    {
        title: "跨部门品质改善会议", titleEn: "Cross-functional Quality Improvement",
        lines: [
            { speaker: "Quality Manager", en: "The scrap rate has been above 5% for three consecutive weeks.", zh: "报废率连续三周超过5%。" },
            { speaker: "Production Manager", en: "The main issue is material-related. The new batch has inconsistencies.", zh: "主要问题是材料相关的。新批次有不一致性。" },
            { speaker: "Procurement Manager", en: "I'll check with the supplier. Can you provide test data?", zh: "我跟供应商确认。你能提供测试数据吗？" },
            { speaker: "Quality Manager", en: "Yes, here's the comparison report. The hardness varies by 15%.", zh: "有的，这是对比报告。硬度差异15%。" },
            { speaker: "Engineering Manager", en: "We could also adjust the process parameters to compensate.", zh: "我们也可以调整工艺参数来补偿。" },
            { speaker: "Quality Manager", en: "Let's do both: fix the material issue and optimize the process.", zh: "两个都做：解决材料问题并优化工艺。" },
            { speaker: "Production Manager", en: "I'll run a DOE to find the optimal parameters.", zh: "我会做DOE找最优参数。" },
            { speaker: "Quality Manager", en: "Good. Let's review the results in next week's meeting.", zh: "好的。下周会议评审结果。" }
        ]
    },
    {
        title: "设备维护保养", titleEn: "Equipment Maintenance",
        lines: [
            { speaker: "Maintenance Engineer", en: "The CNC machine is due for preventive maintenance this week.", zh: "这台CNC机床本周该做预防性保养了。" },
            { speaker: "Production Supervisor", en: "Can we schedule it for the weekend? We have orders to finish.", zh: "能安排到周末吗？我们有订单要赶。" },
            { speaker: "Maintenance Engineer", en: "Weekend works. I need to order the replacement bearings first.", zh: "周末可以。我需要先订购替换轴承。" },
            { speaker: "Production Supervisor", en: "How long will the maintenance take?", zh: "保养需要多长时间？" },
            { speaker: "Maintenance Engineer", en: "About 8 hours including calibration and test runs.", zh: "大约8小时，包括校准和试跑。" },
            { speaker: "Production Supervisor", en: "Please also check the hydraulic system. It has been noisy lately.", zh: "请也检查一下液压系统。最近噪音比较大。" },
            { speaker: "Maintenance Engineer", en: "Noted. I will add it to the checklist and update the maintenance log.", zh: "收到。我会加到检查清单并更新保养记录。" },
            { speaker: "Production Supervisor", en: "Great. Let me know when it is ready for production again.", zh: "好的。恢复生产时通知我。" }
        ]
    },
    {
        title: "安全生产培训", titleEn: "Safety Training Session",
        lines: [
            { speaker: "Safety Officer", en: "Today we cover lockout-tagout procedures and PPE requirements.", zh: "今天的培训内容是上锁挂牌程序和个人防护装备要求。" },
            { speaker: "Operator", en: "Do we need to retake the certification exam this year?", zh: "今年需要重新考认证吗？" },
            { speaker: "Safety Officer", en: "Yes, annual recertification is mandatory per ISO 45001.", zh: "是的，按照ISO 45001每年必须重新认证。" },
            { speaker: "Operator", en: "I noticed the emergency stop button on press 5 is hard to reach.", zh: "我发现5号冲床的紧急停止按钮很难按到。" },
            { speaker: "Safety Officer", en: "Good catch. I will file a corrective action request immediately.", zh: "发现得好。我会立即提交纠正措施申请。" },
            { speaker: "Operator", en: "Also, some of the safety guards on the conveyor are loose.", zh: "另外，传送带上有些安全防护罩松动了。" },
            { speaker: "Safety Officer", en: "I will inspect all lines after this session. Safety is non-negotiable.", zh: "培训结束后我会检查所有产线。安全不容妥协。" }
        ]
    },
    {
        title: "客户要求审核", titleEn: "Customer Audit Request",
        lines: [
            { speaker: "Sales Manager", en: "Our major client wants to conduct an on-site audit next month.", zh: "我们的大客户下个月要来现场审核。" },
            { speaker: "Quality Manager", en: "Which standards? ISO 9001 or their own supplier audit checklist?", zh: "什么标准？ISO 9001还是他们自己的供应商审核清单？" },
            { speaker: "Sales Manager", en: "Both. They also want to review our environmental compliance.", zh: "两个都要。他们还要审查我们的环保合规情况。" },
            { speaker: "Quality Manager", en: "We passed the last audit with two minor findings, all closed.", zh: "上次审核通过了，有两个轻微不符合项，已全部关闭。" },
            { speaker: "Sales Manager", en: "Can you prepare the document room and train the floor staff?", zh: "你能准备文件室并培训车间员工吗？" },
            { speaker: "Quality Manager", en: "I will do a pre-audit next week to identify any gaps.", zh: "我下周做一次预审来识别差距。" },
            { speaker: "Sales Manager", en: "Please keep me updated. This account is worth 2 million annually.", zh: "请随时更新我。这个客户年金额200万。" },
            { speaker: "Quality Manager", en: "Understood. We will be fully prepared.", zh: "明白。我们会做好充分准备。" }
        ]
    },
    {
        title: "仓库盘点", titleEn: "Warehouse Inventory Check",
        lines: [
            { speaker: "Warehouse Manager", en: "Quarter-end inventory count starts tomorrow at 6 AM.", zh: "季度末盘点明天早上6点开始。" },
            { speaker: "Warehouse Staff", en: "Should we freeze all inbound and outbound during the count?", zh: "盘点期间要冻结所有出入库吗？" },
            { speaker: "Warehouse Manager", en: "Yes, no movements from 6 AM to 12 PM. Prioritize high-value items.", zh: "是的，6点到12点禁止移动。先盘高价值物料。" },
            { speaker: "Warehouse Staff", en: "I found a discrepancy last time. System showed 500, actual was 480.", zh: "上次我发现差异。系统显示500，实际480。" },
            { speaker: "Warehouse Manager", en: "Investigate all variances above 2 percent and document root causes.", zh: "所有超过2%的差异都要调查并记录根本原因。" },
            { speaker: "Warehouse Staff", en: "Should I also verify FIFO compliance for the raw materials?", zh: "我需要检查原材料的先进先出执行情况吗？" },
            { speaker: "Warehouse Manager", en: "Yes, and flag any items nearing expiration. Finance needs the report by Friday.", zh: "是的，标记快过期的物料。财务周五前需要报告。" },
            { speaker: "Warehouse Staff", en: "Got it. I will prepare the count sheets tonight.", zh: "收到。我今晚准备好盘点表。" }
        ]
    },
    {
        title: "跨部门协调会议", titleEn: "Cross-department Coordination",
        lines: [
            { speaker: "Plant Manager", en: "We have a rush order for 10,000 units by end of month. Let us align.", zh: "月底前有一个1万件的急单。让我们协调一下。" },
            { speaker: "Production Manager", en: "Current capacity is at 85 percent. We need overtime approval.", zh: "当前产能利用率85%。需要批准加班。" },
            { speaker: "Procurement Manager", en: "Raw materials are in stock, but packaging lead time is 5 days.", zh: "原材料有库存，但包装材料交期5天。" },
            { speaker: "Quality Manager", en: "We will need extra QC staff for in-process inspection on weekends.", zh: "周末需要额外的QC人员做过程检验。" },
            { speaker: "HR Manager", en: "I can arrange temporary workers. How many do you need?", zh: "我可以安排临时工。需要多少人？" },
            { speaker: "Production Manager", en: "Five additional operators and two QC inspectors for two weekends.", zh: "两个周末各需要5名额外操作工和2名QC检验员。" },
            { speaker: "Plant Manager", en: "Approved. Everyone update your plans and report daily.", zh: "批准。各位更新计划并每日汇报。" },
            { speaker: "Quality Manager", en: "I will set up a war room for daily progress tracking.", zh: "我会建立作战室进行每日进度跟踪。" }
        ]
    },
    {
        title: "新产品试产总结", titleEn: "Pilot Run Summary",
        lines: [
            { speaker: "NPI Engineer", en: "The pilot run for the new housing is complete. Here is the summary.", zh: "新外壳的试产完成了。这是总结报告。" },
            { speaker: "Quality Manager", en: "What was the first-pass yield?", zh: "直通率是多少？" },
            { speaker: "NPI Engineer", en: "First-pass yield was 91 percent, below the 95 percent target for mass production.", zh: "直通率91%，低于量产目标95%。" },
            { speaker: "Production Manager", en: "What were the main failure modes?", zh: "主要的失效模式是什么？" },
            { speaker: "NPI Engineer", en: "Warping at 4 percent and sink marks at 3 percent. Both are mold-related.", zh: "翘曲4%，缩痕3%。都与模具相关。" },
            { speaker: "Tooling Engineer", en: "I can modify the cooling channels to fix warping. Need 3 days.", zh: "我可以修改冷却流道来修复翘曲。需要3天。" },
            { speaker: "Quality Manager", en: "Schedule a second pilot run after the mold modification.", zh: "模具修改后安排第二次试产。" },
            { speaker: "NPI Engineer", en: "Agreed. I will update the PFMEA and control plan accordingly.", zh: "同意。我会相应更新PFMEA和控制计划。" }
        ]
    },
    {
        title: "供应商现场审核", titleEn: "Supplier On-site Audit",
        lines: [
            { speaker: "SQE Auditor", en: "Thank you for hosting us. Let us start with the incoming inspection area.", zh: "感谢接待。我们从进料检验区开始。" },
            { speaker: "Supplier QA Manager", en: "Of course. We use AQL 1.0 for critical dimensions.", zh: "当然。关键尺寸我们用AQL 1.0。" },
            { speaker: "SQE Auditor", en: "Show me the calibration records for your CMM machine.", zh: "请给我看三坐标测量机的校准记录。" },
            { speaker: "Supplier QA Manager", en: "Here they are. Last calibration was two months ago, valid for one year.", zh: "在这里。上次校准是两个月前，有效期一年。" },
            { speaker: "SQE Auditor", en: "I noticed some operators are not wearing ESD wrist straps in the SMT area.", zh: "我注意到SMT区域有些操作员没戴防静电手环。" },
            { speaker: "Supplier QA Manager", en: "That is a finding. I will issue a corrective action immediately.", zh: "这是一个不符合项。我会立即发出纠正措施。" },
            { speaker: "SQE Auditor", en: "Overall your system is solid. I will send the formal report in 5 business days.", zh: "总体你们的体系不错。我5个工作日内发正式报告。" }
        ]
    },
    {
        title: "员工绩效考核", titleEn: "Employee Performance Review",
        lines: [
            { speaker: "Department Manager", en: "Let us review your Q3 performance. Your defect detection rate is excellent.", zh: "我们来回顾你第三季度的绩效。你的缺陷检出率非常优秀。" },
            { speaker: "QC Technician", en: "Thank you. I completed the advanced GD and T training this quarter.", zh: "谢谢。我这个季度完成了高级GD&T培训。" },
            { speaker: "Department Manager", en: "That shows initiative. Your area for improvement is documentation speed.", zh: "这体现了主动性。你需要改善的方面是文档记录速度。" },
            { speaker: "QC Technician", en: "I have been working on that. I now use digital forms instead of paper.", zh: "我一直在改进。现在用电子表格代替纸质的了。" },
            { speaker: "Department Manager", en: "Good progress. I would like you to mentor two new hires next quarter.", zh: "进步不错。下季度我想让你带两名新员工。" },
            { speaker: "QC Technician", en: "I would be happy to. Should I prepare a training schedule?", zh: "我很乐意。我需要准备培训计划吗？" },
            { speaker: "Department Manager", en: "Yes, submit it by next Monday. Your rating this quarter is Exceeds Expectations.", zh: "是的，下周一前提交。你本季度评级为超出预期。" },
            { speaker: "QC Technician", en: "Thank you! I will keep improving and aim for Outstanding next quarter.", zh: "谢谢！我会继续提升，争取下季度卓越。" }
        ]
    }

];
