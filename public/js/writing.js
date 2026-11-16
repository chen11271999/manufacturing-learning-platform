const WRITING_TEMPLATES = [
    {
        title: "品质投诉回复邮件", titleEn: "Quality Complaint Reply",
        template: [
            { en: "Dear [Customer Name],", zh: "尊敬的[客户名]，" },
            { en: "Thank you for your feedback regarding [product/batch number].", zh: "感谢您对[产品/批号]的反馈。" },
            { en: "We take your concern seriously and have initiated an investigation.", zh: "我们非常重视您的关注，已启动调查。" },
            { en: "Our root cause analysis shows that [root cause].", zh: "我们的根本原因分析显示[根本原因]。" },
            { en: "Corrective actions include: [actions].", zh: "纠正措施包括：[措施]。" },
            { en: "We will provide the full 8D report by [date].", zh: "我们将在[日期]前提供完整8D报告。" },
            { en: "We apologize for any inconvenience caused.", zh: "对造成的不便深表歉意。" },
            { en: "Best regards,", zh: "此致敬意，" }
        ]
    },
    {
        title: "供应商交期催促邮件", titleEn: "Supplier Delivery Follow-up",
        template: [
            { en: "Dear [Supplier Name],", zh: "尊敬的[供应商名]，" },
            { en: "We would like to follow up on PO #[number] dated [date].", zh: "我们想跟进[日期]的采购订单#[编号]。" },
            { en: "The agreed delivery date was [date], but we have not received the goods yet.", zh: "约定交货日期是[日期]，但尚未收到货物。" },
            { en: "This delay is affecting our production schedule.", zh: "这个延迟影响了我们的生产计划。" },
            { en: "Please advise the updated delivery schedule urgently.", zh: "请紧急告知更新的交货时间。" },
            { en: "We look forward to your prompt reply.", zh: "期待您的尽快回复。" },
            { en: "Best regards,", zh: "此致敬意，" }
        ]
    },
    {
        title: "品质周报", titleEn: "Weekly Quality Report",
        template: [
            { en: "Weekly Quality Report - Week [number]", zh: "品质周报 - 第[周数]周" },
            { en: "1. Yield Rate: [actual]% (Target: [target]%)", zh: "1. 良率：[实际]% (目标：[目标]%)" },
            { en: "2. Customer Complaints: [number] this week", zh: "2. 客户投诉：本周[数量]件" },
            { en: "3. Scrap Rate: [actual]% (Target: [target]%)", zh: "3. 报废率：[实际]% (目标：[目标]%)" },
            { en: "4. Open NCRs: [number]", zh: "4. 未关闭NCR：[数量]件" },
            { en: "5. Key Issues:", zh: "5. 主要问题：" },
            { en: "   - [Issue description and status]", zh: "   - [问题描述及状态]" },
            { en: "6. Action Items for Next Week:", zh: "6. 下周行动项：" },
            { en: "   - [Action item / owner / due date]", zh: "   - [行动项 / 负责人 / 截止日期]" }
        ]
    },
    {
        title: "会议纪要模板", titleEn: "Meeting Minutes Template",
        template: [
            { en: "Meeting Minutes", zh: "会议纪要" },
            { en: "Date: [date]  Time: [time]  Location: [location]", zh: "日期：[日期] 时间：[时间] 地点：[地点]" },
            { en: "Attendees: [names]", zh: "出席人员：[姓名]" },
            { en: "Agenda:", zh: "议程：" },
            { en: "1. [Topic 1]", zh: "1. [议题1]" },
            { en: "2. [Topic 2]", zh: "2. [议题2]" },
            { en: "Discussion Points:", zh: "讨论要点：" },
            { en: "- [Key discussion points]", zh: "- [关键讨论内容]" },
            { en: "Action Items:", zh: "行动项：" },
            { en: "| No. | Action | Owner | Due Date | Status |", zh: "| 序号 | 行动 | 负责人 | 截止日期 | 状态 |" },
            { en: "Next Meeting: [date and time]", zh: "下次会议：[日期和时间]" }
        ]
    },
    {
        title: "NPI状态报告", titleEn: "NPI Status Report",
        template: [
            { en: "NPI Status Report - [Project Name]", zh: "NPI状态报告 - [项目名称]" },
            { en: "Project Phase: [phase]  Overall Status: [Green/Yellow/Red]", zh: "项目阶段：[阶段] 总体状态：[绿/黄/红]" },
            { en: "Key Milestones:", zh: "关键里程碑：" },
            { en: "- Design Review: [status / date]", zh: "- 设计评审：[状态 / 日期]" },
            { en: "- Tooling Ready: [status / date]", zh: "- 模具就绪：[状态 / 日期]" },
            { en: "- Pilot Run: [status / date]", zh: "- 试产：[状态 / 日期]" },
            { en: "- PPAP Submission: [status / date]", zh: "- PPAP提交：[状态 / 日期]" },
            { en: "- Mass Production: [status / date]", zh: "- 量产：[状态 / 日期]" },
            { en: "Open Issues:", zh: "未关闭问题：" },
            { en: "- [Issue / action plan / owner / due date]", zh: "- [问题 / 行动计划 / 负责人 / 截止日期]" }
        ]
    },
    {
        title: "异常分析报告 (8D Report)", titleEn: "8D Corrective Action Report",
        template: [
            { en: "8D Report - [Report Number]", zh: "8D报告 - [报告编号]" },
            { en: "", zh: "" },
            { en: "D1 - Team Members:", zh: "D1 - 团队成员：" },
            { en: "Team Leader: [name / department]", zh: "组长：[姓名 / 部门]" },
            { en: "Members: [name1, name2, name3]", zh: "成员：[姓名1, 姓名2, 姓名3]" },
            { en: "", zh: "" },
            { en: "D2 - Problem Description (5W2H):", zh: "D2 - 问题描述 (5W2H)：" },
            { en: "What: [defect type and description]", zh: "什么：[缺陷类型和描述]" },
            { en: "Where: [location / station / part number]", zh: "哪里：[位置 / 工位 / 零件号]" },
            { en: "When: [date / time / shift discovered]", zh: "何时：[发现日期 / 时间 / 班次]" },
            { en: "Who: [who discovered / who is affected]", zh: "谁：[谁发现 / 谁受影响]" },
            { en: "Why: [initial observation, not root cause]", zh: "为什么：[初步观察，非根本原因]" },
            { en: "How: [how was it detected / inspection method]", zh: "如何：[如何发现 / 检验方法]" },
            { en: "How many: [quantity affected / defect rate]", zh: "多少：[受影响数量 / 不良率]" },
            { en: "", zh: "" },
            { en: "D3 - Interim Containment Actions (ICA):", zh: "D3 - 临时围堵措施 (ICA)：" },
            { en: "Action 1: [description / owner / date]", zh: "措施1：[描述 / 负责人 / 日期]" },
            { en: "Action 2: [description / owner / date]", zh: "措施2：[描述 / 负责人 / 日期]" },
            { en: "", zh: "" },
            { en: "D4 - Root Cause Analysis:", zh: "D4 - 根本原因分析：" },
            { en: "Occurrence Root Cause: [why it happened]", zh: "发生原因：[为什么产生]" },
            { en: "Escape Root Cause: [why it was not detected]", zh: "逃逸原因：[为什么没检出]" },
            { en: "Verification: [data / evidence supporting root cause]", zh: "验证：[支持根因的数据/证据]" },
            { en: "", zh: "" },
            { en: "D5 - Permanent Corrective Actions (PCA):", zh: "D5 - 永久纠正措施 (PCA)：" },
            { en: "PCA 1: [description / owner / due date]", zh: "措施1：[描述 / 负责人 / 截止日期]" },
            { en: "PCA 2: [description / owner / due date]", zh: "措施2：[描述 / 负责人 / 截止日期]" },
            { en: "", zh: "" },
            { en: "D6 - Implementation & Validation:", zh: "D6 - 实施与验证：" },
            { en: "Implementation date: [date]", zh: "实施日期：[日期]" },
            { en: "Validation result: [before vs after data]", zh: "验证结果：[改善前后数据对比]" },
            { en: "", zh: "" },
            { en: "D7 - Preventive Actions:", zh: "D7 - 预防措施：" },
            { en: "System update: [FMEA / Control Plan / SOP changes]", zh: "系统更新：[FMEA/控制计划/SOP变更]" },
            { en: "Horizontal deployment: [similar products / lines]", zh: "横向展开：[类似产品/产线]" },
            { en: "", zh: "" },
            { en: "D8 - Team Recognition & Closure:", zh: "D8 - 团队认可与关闭：" },
            { en: "Lessons learned: [summary]", zh: "经验教训：[总结]" },
            { en: "Report closed by: [name / date]", zh: "报告关闭人：[姓名 / 日期]" }
        ]
    },
    {
        title: "稽查不符合项报告", titleEn: "Audit Nonconformity Report",
        template: [
            { en: "Nonconformity Report (NCR)", zh: "不符合项报告 (NCR)" },
            { en: "NCR Number: [number]  Date: [date]", zh: "NCR编号：[编号] 日期：[日期]" },
            { en: "", zh: "" },
            { en: "Audit Type: [System / Process / Product / Supplier]", zh: "审核类型：[体系 / 过程 / 产品 / 供应商]" },
            { en: "Auditor: [name]  Auditee: [department / name]", zh: "审核员：[姓名] 被审核方：[部门 / 姓名]" },
            { en: "", zh: "" },
            { en: "Nonconformity Description:", zh: "不符合项描述：" },
            { en: "Clause: [ISO clause number, e.g. 8.5.1]", zh: "条款：[ISO条款号，如8.5.1]" },
            { en: "Finding: [objective evidence of nonconformity]", zh: "发现：[不符合的客观证据]" },
            { en: "Grade: [Major / Minor / Observation]", zh: "等级：[严重 / 轻微 / 观察项]" },
            { en: "", zh: "" },
            { en: "Root Cause Analysis (by auditee):", zh: "根本原因分析（被审核方填写）：" },
            { en: "[Root cause description using 5-Why or Fishbone]", zh: "[使用5Why或鱼骨图分析根本原因]" },
            { en: "", zh: "" },
            { en: "Corrective Action Plan:", zh: "纠正措施计划：" },
            { en: "Action 1: [description / owner / due date]", zh: "措施1：[描述 / 负责人 / 截止日期]" },
            { en: "Action 2: [description / owner / due date]", zh: "措施2：[描述 / 负责人 / 截止日期]" },
            { en: "", zh: "" },
            { en: "Verification of Effectiveness:", zh: "有效性验证：" },
            { en: "Verified by: [auditor name]  Date: [date]", zh: "验证人：[审核员姓名] 日期：[日期]" },
            { en: "Result: [Effective / Not effective - reopen NCR]", zh: "结果：[有效 / 无效-重新开启NCR]" }
        ]
    }
];

const WRITING_KNOWLEDGE = [
    {
        icon: "📋",
        title: "异常分析报告指南 / 8D Report Guide",
        sections: [
            {
                heading: "D0 准备阶段 / Preparation",
                items: [
                    "<b>When to use 8D / 何时使用8D：</b> Complex, recurring, or high-impact problems / 复杂的、重复发生的或高影响的问题",
                    "<b>Initial data collection / 初始数据收集：</b> Defect type, batch number, quantity, discovery time / 缺陷类型、批号、数量、发现时间",
                    "<b>Urgency assessment / 紧急评估：</b> Determine if immediate containment is needed / 确定是否需要立即围堵"
                ]
            },
            {
                heading: "D1 成立团队 / Form the Team",
                items: [
                    "<b>Cross-functional members / 跨部门成员：</b> Quality, Engineering, Production, Procurement / 品质、工程、生产、采购",
                    "<b>Designate Team Leader / 指定组长：</b> Clear roles and responsibilities / 明确角色和职责",
                    "<b>Ensure resources / 确保资源：</b> Team has authority and resources / 团队有足够权限和资源"
                ]
            },
            {
                heading: "D2 问题描述 / Problem Description",
                items: [
                    "<b>5W2H method / 5W2H方法：</b> What/Where/When/Who/Why/How/How many",
                    "<b>Quantify the problem / 量化问题：</b> Defect rate, defect type, scope of impact / 不良率、缺陷类型、影响范围",
                    "<b>Timeline / 时间线：</b> When the issue started and was discovered / 问题发生和发现的时间节点"
                ]
            },
            {
                heading: "D3 临时围堵 / Interim Containment (ICA)",
                items: [
                    "<b>Isolate suspect product / 隔离可疑品：</b> In warehouse, in transit, at customer / 在库、在途、客户端",
                    "<b>100% inspection / 全检挑选：</b> Determine the scope of affected products / 确定受影响产品范围",
                    "<b>No new problems / 不引入新问题：</b> Ensure containment doesn't create new issues / 确保围堵措施不引入新问题",
                    "<b>Document results / 记录结果：</b> Record containment quantities and outcomes / 记录围堵数量和结果"
                ]
            },
            {
                heading: "D4 根本原因分析 / Root Cause Analysis (RCA)",
                items: [
                    "<b>5-Why analysis / 5个为什么：</b> Dig deep to find the true root cause / 深入挖掘找到真正根因",
                    "<b>Fishbone diagram / 鱼骨图：</b> Man/Machine/Material/Method/Environment/Measurement / 人机料法环测",
                    "<b>Two types of causes / 两类原因：</b> Occurrence (why produced) + Escape (why not detected) / 发生原因+逃逸原因",
                    "<b>Data verification / 数据验证：</b> Simulate or test to confirm root cause / 模拟或测试验证根因"
                ]
            },
            {
                heading: "D5/D6 永久纠正措施 / Permanent Corrective Actions",
                items: [
                    "<b>Multiple solutions / 多方案评估：</b> Evaluate risks and effectiveness / 评估风险和效果",
                    "<b>Implement best option / 实施最佳方案：</b> With clear timeline and owner / 明确时间线和负责人",
                    "<b>Validate effectiveness / 验证有效性：</b> Compare data before and after / 对比改善前后数据",
                    "<b>Remove containment / 取消围堵：</b> After PCA is verified effective / PCA验证有效后取消D3措施"
                ]
            },
            {
                heading: "D7 预防措施 / Preventive Actions",
                items: [
                    "<b>System update / 系统改善：</b> Update FMEA, Control Plan, SOP / 更新FMEA、控制计划、SOP",
                    "<b>Horizontal deployment / 横向展开：</b> Apply to similar products and lines / 类似产品/产线同步改善",
                    "<b>Training / 培训：</b> Train all relevant personnel / 培训所有相关人员"
                ]
            },
            {
                heading: "D8 团队认可 / Team Recognition",
                items: [
                    "<b>Summarize results / 总结成果：</b> Document lessons learned / 记录经验教训",
                    "<b>Recognize team / 认可贡献：</b> Acknowledge team efforts / 认可团队贡献",
                    "<b>Close report / 关闭报告：</b> Archive all documents / 归档文件"
                ]
            }
        ]
    },
    {
        icon: "🔍",
        title: "品质稽查指南 / Quality Audit Guide",
        sections: [
            {
                heading: "Audit Types / 审核类型",
                items: [
                    "<b>System Audit / 体系审核：</b> ISO 9001 / IATF 16949 management system audit / 管理体系审核",
                    "<b>Process Audit / 过程审核：</b> VDA 6.3 process audit to evaluate capability / 评估生产过程能力",
                    "<b>Product Audit / 产品审核：</b> VDA 6.5 product audit to verify conformance / 验证产品符合要求",
                    "<b>Supplier Audit / 供应商审核：</b> Assess supplier QMS, process, and product / 评估供应商体系/过程/产品"
                ]
            },
            {
                heading: "Audit Preparation / 审核准备",
                items: [
                    "<b>Annual plan / 年度计划：</b> Schedule audits for the year / 制定年度审核日程",
                    "<b>Checklist / 检查表：</b> Prepare audit checklist based on standards / 根据标准编制检查表",
                    "<b>Auditor selection / 审核员选择：</b> Qualified auditors, avoid auditing own dept / 有资质审核员，避免审核自己部门",
                    "<b>Notification / 通知：</b> Inform auditee of scope and schedule / 通知被审核部门范围和时间"
                ]
            },
            {
                heading: "Audit Execution / 审核执行",
                items: [
                    "<b>Opening meeting / 首次会议：</b> Introduce purpose, scope, and plan / 介绍审核目的、范围和计划",
                    "<b>On-site audit / 现场审核：</b> Observe, interview, review records, sample / 观察、提问、查阅记录、抽样",
                    "<b>Record findings / 记录发现：</b> Conformities and nonconformities (Major/Minor/Obs) / 符合项和不符合项",
                    "<b>Closing meeting / 末次会议：</b> Present findings, confirm NCs / 汇报发现，确认不符合项"
                ]
            },
            {
                heading: "Audit Follow-up / 审核跟踪",
                items: [
                    "<b>Issue NCR/CAR / 发出不符合报告：</b> Formal nonconformity report / 正式不符合报告",
                    "<b>Corrective action plan / 纠正措施计划：</b> Require response from responsible dept / 要求责任部门提交计划",
                    "<b>Verify effectiveness / 验证有效性：</b> Check if actions resolved the issue / 检查措施是否解决问题",
                    "<b>Close NC / 关闭不符合项：</b> Complete audit report / 完成审核报告"
                ]
            }
        ]
    },
    {
        icon: "⚙️",
        title: "品质管理核心知识 / Quality Management Essentials",
        sections: [
            {
                heading: "Cost of Quality (COQ) / 品质成本",
                items: [
                    "<b>Prevention Cost / 预防成本：</b> Training, quality planning, process control / 培训、品质规划、过程控制",
                    "<b>Appraisal Cost / 鉴定成本：</b> Inspection, testing, calibration / 检验、测试、校准",
                    "<b>Internal Failure / 内部失败成本：</b> Scrap, rework, sorting, downtime / 报废、返工、挑选、停机",
                    "<b>External Failure / 外部失败成本：</b> Returns, warranty, claims, lost customers / 退货、保修、赔偿、客户流失",
                    "<b>Goal / 目标：</b> Invest more in prevention, reduce failure costs / 增加预防投入，减少失败成本"
                ]
            },
            {
                heading: "Statistical Process Control (SPC) / 统计过程控制",
                items: [
                    "<b>Control charts / 控制图：</b> X-bar R chart, P chart, C chart, U chart / X-bar R图、P图、C图、U图",
                    "<b>Out-of-control rules / 判异规则：</b> 8 Western Electric Rules / 8条Western Electric规则",
                    "<b>Process capability / 过程能力：</b> Cp, Cpk (short-term), Pp, Ppk (long-term) / Cp/Cpk(短期), Pp/Ppk(长期)",
                    "<b>Acceptance criteria / 接受标准：</b> Cpk ≥ 1.33 acceptable, ≥ 1.67 excellent / Cpk≥1.33可接受，≥1.67优秀",
                    "<b>MSA / 测量系统分析：</b> GR&R < 10% excellent, < 30% acceptable / GR&R<10%优秀，<30%可接受"
                ]
            },
            {
                heading: "7 QC Tools / 品质七大手法",
                items: [
                    "<b>1. Check Sheet / 检查表：</b> Data collection tool / 数据收集工具",
                    "<b>2. Pareto Chart / 柏拉图：</b> Identify vital few problems / 识别主要问题",
                    "<b>3. Fishbone Diagram / 因果图：</b> Analyze root causes / 分析原因",
                    "<b>4. Histogram / 直方图：</b> Show data distribution / 显示数据分布",
                    "<b>5. Scatter Diagram / 散布图：</b> Analyze correlation / 相关性分析",
                    "<b>6. Control Chart / 控制图：</b> Monitor process stability / 监控过程稳定性",
                    "<b>7. Stratification / 层别法：</b> Categorize data for analysis / 数据分类分析"
                ]
            },
            {
                heading: "APQP / 产品质量先期策划",
                items: [
                    "<b>Phase 1 / 阶段1：</b> Plan and define program / 计划和定义项目",
                    "<b>Phase 2 / 阶段2：</b> Product design and development / 产品设计和开发",
                    "<b>Phase 3 / 阶段3：</b> Process design and development / 过程设计和开发",
                    "<b>Phase 4 / 阶段4：</b> Product and process validation / 产品和过程确认",
                    "<b>Phase 5 / 阶段5：</b> Feedback, assessment, corrective action / 反馈、评估和纠正措施",
                    "<b>Key deliverables / 关键交付物：</b> DFMEA, PFMEA, Control Plan, MSA, PPAP"
                ]
            }
        ]
    }
];
