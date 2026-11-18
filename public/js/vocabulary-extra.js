// Extra vocabulary - 280 additional words
(function() {
    // quality/basic - 20 new words
    if (VOCABULARY.quality && VOCABULARY.quality.subcategories.basic) {
        VOCABULARY.quality.subcategories.basic.words.push(
            { en: "Quality Culture", zh: "品质文化", ms: "Budaya Kualiti", ex: "Build quality culture.", ex_zh: "建立品质文化。" },
            { en: "Zero Defects", zh: "零缺陷", ms: "Sifar Kecacatan", ex: "Achieve zero defects.", ex_zh: "实现零缺陷。" },
            { en: "Quality Cost", zh: "质量成本", ms: "Kos Kualiti", ex: "Reduce quality cost.", ex_zh: "降低质量成本。" },
            { en: "Quality Circle", zh: "品质圈", ms: "Bulatan Kualiti", ex: "Join quality circle.", ex_zh: "加入品质圈。" },
            { en: "Total Quality Management", zh: "全面质量管理", ms: "Pengurusan Kualiti Total", ex: "Implement TQM.", ex_zh: "实施全面质量管理。" },
            { en: "Quality Training", zh: "质量培训", ms: "Latihan Kualiti", ex: "Attend quality training.", ex_zh: "参加质量培训。" },
            { en: "Quality Award", zh: "质量奖", ms: "Anugerah Kualiti", ex: "Win quality award.", ex_zh: "获得质量奖。" },
            { en: "Best Practice", zh: "最佳实践", ms: "Amalan Terbaik", ex: "Share best practice.", ex_zh: "分享最佳实践。" },
            { en: "Quality Metric", zh: "质量指标", ms: "Metrik Kualiti", ex: "Track quality metric.", ex_zh: "跟踪质量指标。" },
            { en: "Quality Dashboard", zh: "质量看板", ms: "Papan Pemuka Kualiti", ex: "View quality dashboard.", ex_zh: "查看质量看板。" },
            { en: "Quality Review", zh: "质量评审", ms: "Semakan Kualiti", ex: "Conduct quality review.", ex_zh: "进行质量评审。" },
            { en: "Quality Improvement", zh: "质量改进", ms: "Penambahbaikan Kualiti", ex: "Drive quality improvement.", ex_zh: "推动质量改进。" },
            { en: "Quality Awareness", zh: "质量意识", ms: "Kesedaran Kualiti", ex: "Raise quality awareness.", ex_zh: "提高质量意识。" },
            { en: "Quality Champion", zh: "质量冠军", ms: "Juara Kualiti", ex: "Become quality champion.", ex_zh: "成为质量冠军。" },
            { en: "Quality Gate", zh: "质量关卡", ms: "Pintu Kualiti", ex: "Pass quality gate.", ex_zh: "通过质量关卡。" },
            { en: "Quality KPI", zh: "质量KPI", ms: "KPI Kualiti", ex: "Monitor quality KPI.", ex_zh: "监控质量KPI。" },
            { en: "Quality Roadmap", zh: "质量路线图", ms: "Peta Jalan Kualiti", ex: "Plan quality roadmap.", ex_zh: "规划质量路线图。" },
            { en: "Quality Maturity", zh: "质量成熟度", ms: "Kematangan Kualiti", ex: "Assess quality maturity.", ex_zh: "评估质量成熟度。" },
            { en: "Quality Excellence", zh: "质量卓越", ms: "Kecemerlangan Kualiti", ex: "Achieve quality excellence.", ex_zh: "实现质量卓越。" }
        );
    }

    // quality/defects - 20 new words
    if (VOCABULARY.quality && VOCABULARY.quality.subcategories.defects) {
        VOCABULARY.quality.subcategories.defects.words.push(
            { en: "Void", zh: "空洞", ms: "Lompang", ex: "Detect void.", ex_zh: "检测空洞。" },
            { en: "Rough Surface", zh: "表面粗糙", ms: "Permukaan Kasar", ex: "Smooth rough surface.", ex_zh: "光滑表面粗糙。" },
            { en: "Hot Tear", zh: "热裂", ms: "Koyakan Panas", ex: "Prevent hot tear.", ex_zh: "防止热裂。" },
            { en: "Orange Peel", zh: "橘皮", ms: "Kulit Oren", ex: "Fix orange peel.", ex_zh: "修复橘皮。" },
            { en: "Fish Eye", zh: "鱼眼", ms: "Mata Ikan", ex: "Identify fish eye.", ex_zh: "识别鱼眼。" },
            { en: "Cratering", zh: "凹坑", ms: "Kawah", ex: "Repair cratering.", ex_zh: "修复凹坑。" },
            { en: "Chalking", zh: "粉化", ms: "Pengapuran", ex: "Prevent chalking.", ex_zh: "防止粉化。" },
            { en: "Crazing", zh: "龟裂", ms: "Retak", ex: "Detect crazing.", ex_zh: "检测龟裂。" },
            { en: "Blisters", zh: "气泡", ms: "Gelembung", ex: "Remove blisters.", ex_zh: "去除气泡。" }
        );
    }

    // quality/tools - 20 new words
    if (VOCABULARY.quality && VOCABULARY.quality.subcategories.tools) {
        VOCABULARY.quality.subcategories.tools.words.push(
            { en: "Statistical Process Control", zh: "统计过程控制", ms: "Kawalan Proses Statistik", ex: "Apply SPC.", ex_zh: "应用统计过程控制。" },
            { en: "Design of Experiments", zh: "实验设计", ms: "Reka Bentuk Eksperimen", ex: "Plan DOE.", ex_zh: "规划实验设计。" },
            { en: "Gage R&R", zh: "量具重复性与再现性", ms: "Gage R&R", ex: "Perform Gage R&R.", ex_zh: "执行量具R&R。" },
            { en: "Capability Study", zh: "能力研究", ms: "Kajian Keupayaan", ex: "Run capability study.", ex_zh: "运行能力研究。" },
            { en: "Pareto Analysis", zh: "帕累托分析", ms: "Analisis Pareto", ex: "Do Pareto analysis.", ex_zh: "做帕累托分析。" },
            { en: "Root Cause Analysis", zh: "根因分析", ms: "Analisis Punca", ex: "Find root cause.", ex_zh: "找到根本原因。" },
            { en: "5 Why", zh: "5个为什么", ms: "5 Mengapa", ex: "Ask 5 why.", ex_zh: "问5个为什么。" },
            { en: "Regression", zh: "回归", ms: "Regresi", ex: "Run regression.", ex_zh: "运行回归分析。" },
            { en: "Hypothesis Test", zh: "假设检验", ms: "Ujian Hipotesis", ex: "Test hypothesis.", ex_zh: "检验假设。" },
            { en: "ANOVA", zh: "方差分析", ms: "ANOVA", ex: "Perform ANOVA.", ex_zh: "执行方差分析。" },
            { en: "Correlation", zh: "相关性", ms: "Korelasi", ex: "Check correlation.", ex_zh: "检查相关性。" },
            { en: "Sampling Plan", zh: "抽样计划", ms: "Pelan Persampelan", ex: "Create sampling plan.", ex_zh: "创建抽样计划。" },
            { en: "Acceptance Sampling", zh: "验收抽样", ms: "Persampelan Penerimaan", ex: "Do acceptance sampling.", ex_zh: "做验收抽样。" },
            { en: "Measurement System", zh: "测量系统", ms: "Sistem Pengukuran", ex: "Validate measurement system.", ex_zh: "验证测量系统。" },
            { en: "Error Proofing", zh: "防错", ms: "Pencegahan Ralat", ex: "Implement error proofing.", ex_zh: "实施防错。" }
        );
    }

    // production/process - 20 new words
    if (VOCABULARY.production && VOCABULARY.production.subcategories.process) {
        VOCABULARY.production.subcategories.process.words.push(
            { en: "Casting", zh: "铸造", ms: "Pengecoran", ex: "Prepare casting.", ex_zh: "准备铸造。" },
            { en: "Rolling", zh: "轧制", ms: "Penggulungan", ex: "Adjust rolling.", ex_zh: "调整轧制。" },
            { en: "Bending", zh: "弯曲", ms: "Pembengkokan", ex: "Check bending.", ex_zh: "检查弯曲。" },
            { en: "Shearing", zh: "剪切", ms: "Pemotongan", ex: "Set shearing.", ex_zh: "设置剪切。" },
            { en: "Punching", zh: "冲压", ms: "Penebukan", ex: "Run punching.", ex_zh: "运行冲压。" },
            { en: "Drilling", zh: "钻孔", ms: "Penggerudian", ex: "Do drilling.", ex_zh: "进行钻孔。" },
            { en: "Tapping", zh: "攻丝", ms: "Pengetuk", ex: "Begin tapping.", ex_zh: "开始攻丝。" },
            { en: "Riveting", zh: "铆接", ms: "Paku", ex: "Check riveting.", ex_zh: "检查铆接。" },
            { en: "Adhesive Bonding", zh: "粘接", ms: "Ikatan Pelekat", ex: "Apply adhesive bonding.", ex_zh: "应用粘接。" },
            { en: "Final Assembly", zh: "总装", ms: "Pemasangan Akhir", ex: "Start final assembly.", ex_zh: "开始总装。" },
            { en: "Packaging", zh: "包装", ms: "Pembungkusan", ex: "Prepare packaging.", ex_zh: "准备包装。" },
            { en: "Labeling", zh: "贴标", ms: "Pelabelan", ex: "Do labeling.", ex_zh: "进行贴标。" },
            { en: "End-of-Line Testing", zh: "线末测试", ms: "Ujian Akhir Barisan", ex: "Run EOL testing.", ex_zh: "运行线末测试。" },
            { en: "Burn-In", zh: "老化", ms: "Pembakaran", ex: "Perform burn-in.", ex_zh: "执行老化测试。" },
            { en: "Cleaning", zh: "清洗", ms: "Pembersihan", ex: "Start cleaning.", ex_zh: "开始清洗。" },
            { en: "Drying", zh: "干燥", ms: "Pengeringan", ex: "Begin drying.", ex_zh: "开始干燥。" }
        );
    }

    // production/equipment - 20 new words
    if (VOCABULARY.production && VOCABULARY.production.subcategories.equipment) {
        VOCABULARY.production.subcategories.equipment.words.push(
            { en: "Grinding Machine", zh: "磨床", ms: "Mesin Pengisar", ex: "Run grinding machine.", ex_zh: "运行磨床。" },
            { en: "Drilling Machine", zh: "钻床", ms: "Mesin Gerudi", ex: "Set drilling machine.", ex_zh: "设置钻床。" },
            { en: "Sawing Machine", zh: "锯床", ms: "Mesin Gergaji", ex: "Start sawing machine.", ex_zh: "启动锯床。" },
            { en: "EDM", zh: "电火花加工", ms: "EDM", ex: "Apply EDM.", ex_zh: "应用电火花加工。" },
            { en: "Waterjet", zh: "水刀", ms: "Waterjet", ex: "Use waterjet.", ex_zh: "使用水刀。" },
            { en: "Plasma Cutter", zh: "等离子切割", ms: "Pemotong Plasma", ex: "Operate plasma cutter.", ex_zh: "操作等离子切割。" },
            { en: "Induction Heater", zh: "感应加热", ms: "Pemanas Induksi", ex: "Turn on induction heater.", ex_zh: "打开感应加热。" },
            { en: "Overhead Crane", zh: "天车", ms: "Kren Atas", ex: "Use overhead crane.", ex_zh: "使用天车。" },
            { en: "AGV", zh: "自动导引车", ms: "AGV", ex: "Deploy AGV.", ex_zh: "部署AGV。" },
            { en: "Palletizer", zh: "码垛机", ms: "Palletizer", ex: "Run palletizer.", ex_zh: "运行码垛机。" },
            { en: "Depalletizer", zh: "拆垛机", ms: "Depalletizer", ex: "Start depalletizer.", ex_zh: "启动拆垛机。" },
            { en: "Sorting System", zh: "分拣系统", ms: "Sistem Pengisihan", ex: "Configure sorting system.", ex_zh: "配置分拣系统。" },
            { en: "Inspection Station", zh: "检测站", ms: "Stesen Pemeriksaan", ex: "Set up inspection station.", ex_zh: "设置检测站。" },
            { en: "Rework Station", zh: "返工站", ms: "Stesen Kerja Semula", ex: "Send to rework station.", ex_zh: "送到返工站。" },
            { en: "Test Fixture", zh: "测试治具", ms: "Lekapan Ujian", ex: "Install test fixture.", ex_zh: "安装测试治具。" },
            { en: "Assembly Jig", zh: "装配夹具", ms: "Jig Pemasangan", ex: "Use assembly jig.", ex_zh: "使用装配夹具。" }
        );
    }

    // production/lean - 20 new words
    if (VOCABULARY.production && VOCABULARY.production.subcategories.lean) {
        VOCABULARY.production.subcategories.lean.words.push(
            { en: "Value Stream", zh: "价值流", ms: "Aliran Nilai", ex: "Map value stream.", ex_zh: "绘制价值流图。" },
            { en: "Waste Elimination", zh: "消除浪费", ms: "Penghapusan Pembaziran", ex: "Eliminate waste.", ex_zh: "消除浪费。" },
            { en: "Continuous Flow", zh: "连续流", ms: "Aliran Berterusan", ex: "Create continuous flow.", ex_zh: "创建连续流。" },
            { en: "Push System", zh: "推动系统", ms: "Sistem Tolakan", ex: "Avoid push system.", ex_zh: "避免推动系统。" },
            { en: "Work Cell", zh: "工作单元", ms: "Sel Kerja", ex: "Design work cell.", ex_zh: "设计工作单元。" },
            { en: "Line Balancing", zh: "线平衡", ms: "Pengimbangan Barisan", ex: "Achieve line balancing.", ex_zh: "实现线平衡。" },
            { en: "Setup Reduction", zh: "换模时间减少", ms: "Pengurangan Masa Persediaan", ex: "Reduce setup time.", ex_zh: "减少换模时间。" },
            { en: "Quick Changeover", zh: "快速换型", ms: "Pertukaran Pantas", ex: "Do quick changeover.", ex_zh: "进行快速换型。" },
            { en: "Total Productive Maintenance", zh: "全面生产维护", ms: "Penyelenggaraan Produktif Total", ex: "Apply TPM.", ex_zh: "应用TPM。" },
            { en: "Autonomous Maintenance", zh: "自主维护", ms: "Penyelenggaraan Autonomi", ex: "Practice autonomous maintenance.", ex_zh: "实践自主维护。" },
            { en: "Preventive Maintenance", zh: "预防性维护", ms: "Penyelenggaraan Pencegahan", ex: "Schedule preventive maintenance.", ex_zh: "安排预防性维护。" },
            { en: "Predictive Maintenance", zh: "预测性维护", ms: "Penyelenggaraan Ramalan", ex: "Use predictive maintenance.", ex_zh: "使用预测性维护。" },
            { en: "Overall Equipment Effectiveness", zh: "设备综合效率", ms: "Keberkesanan Peralatan Keseluruhan", ex: "Measure OEE.", ex_zh: "测量OEE。" },
            { en: "Andon System", zh: "安灯系统", ms: "Sistem Andon", ex: "Install Andon system.", ex_zh: "安装安灯系统。" },
            { en: "Poka-Yoke", zh: "防错", ms: "Poka-Yoke", ex: "Design Poka-Yoke.", ex_zh: "设计防错。" },
            { en: "Gemba", zh: "现场", ms: "Gemba", ex: "Go to Gemba.", ex_zh: "去现场。" },
            { en: "A3 Problem Solving", zh: "A3问题解决", ms: "Penyelesaian Masalah A3", ex: "Use A3 problem solving.", ex_zh: "使用A3问题解决。" }
        );
    }

    // supply/procurement - 20 new words
    if (VOCABULARY.supply && VOCABULARY.supply.subcategories.procurement) {
        VOCABULARY.supply.subcategories.procurement.words.push(
            { en: "Supplier Evaluation", zh: "供应商评估", ms: "Penilaian Pembekal", ex: "Conduct supplier evaluation.", ex_zh: "进行供应商评估。" },
            { en: "Strategic Sourcing", zh: "战略采购", ms: "Perolehan Strategik", ex: "Plan strategic sourcing.", ex_zh: "规划战略采购。" },
            { en: "Category Management", zh: "品类管理", ms: "Pengurusan Kategori", ex: "Improve category management.", ex_zh: "改善品类管理。" },
            { en: "Spend Analysis", zh: "支出分析", ms: "Analisis Perbelanjaan", ex: "Perform spend analysis.", ex_zh: "执行支出分析。" },
            { en: "Cost Analysis", zh: "成本分析", ms: "Analisis Kos", ex: "Do cost analysis.", ex_zh: "做成本分析。" },
            { en: "Price Negotiation", zh: "价格谈判", ms: "Rundingan Harga", ex: "Start price negotiation.", ex_zh: "开始价格谈判。" },
            { en: "Contract Management", zh: "合同管理", ms: "Pengurusan Kontrak", ex: "Review contract management.", ex_zh: "审查合同管理。" },
            { en: "Purchase Requisition", zh: "采购申请", ms: "Permintaan Pembelian", ex: "Submit purchase requisition.", ex_zh: "提交采购申请。" },
            { en: "Blanket Order", zh: "框架订单", ms: "Pesanan Selimut", ex: "Create blanket order.", ex_zh: "创建框架订单。" },
            { en: "Order Tracking", zh: "订单跟踪", ms: "Penjejakan Pesanan", ex: "Check order tracking.", ex_zh: "检查订单跟踪。" },
            { en: "Expediting", zh: "催货", ms: "Pengejaran", ex: "Request expediting.", ex_zh: "要求催货。" },
            { en: "Receiving Inspection", zh: "收货检验", ms: "Pemeriksaan Penerimaan", ex: "Perform receiving inspection.", ex_zh: "执行收货检验。" },
            { en: "Material Certification", zh: "材料认证", ms: "Pensijilan Bahan", ex: "Get material certification.", ex_zh: "获得材料认证。" },
            { en: "SCAR", zh: "供应商纠正措施要求", ms: "SCAR", ex: "Issue SCAR.", ex_zh: "发出SCAR。" },
            { en: "Supplier Risk", zh: "供应商风险", ms: "Risiko Pembekal", ex: "Assess supplier risk.", ex_zh: "评估供应商风险。" },
            { en: "Dual Sourcing", zh: "双源采购", ms: "Sumber Berkembar", ex: "Implement dual sourcing.", ex_zh: "实施双源采购。" },
            { en: "Single Sourcing", zh: "单一来源", ms: "Sumber Tunggal", ex: "Avoid single sourcing.", ex_zh: "避免单一来源。" },
            { en: "Supplier Diversity", zh: "供应商多元化", ms: "Kepelbagaian Pembekal", ex: "Promote supplier diversity.", ex_zh: "促进供应商多元化。" }
        );
    }

    // supply/logistics - 20 new words
    if (VOCABULARY.supply && VOCABULARY.supply.subcategories.logistics) {
        VOCABULARY.supply.subcategories.logistics.words.push(
            { en: "Warehouse Management System", zh: "仓库管理系统", ms: "Sistem Pengurusan Gudang", ex: "Use WMS.", ex_zh: "使用WMS。" },
            { en: "Inventory Control", zh: "库存控制", ms: "Kawalan Inventori", ex: "Improve inventory control.", ex_zh: "改善库存控制。" },
            { en: "Stock Replenishment", zh: "补货", ms: "Penambahan Stok", ex: "Schedule stock replenishment.", ex_zh: "安排补货。" },
            { en: "Economic Order Quantity", zh: "经济订购量", ms: "Kuantiti Pesanan Ekonomi", ex: "Calculate EOQ.", ex_zh: "计算EOQ。" },
            { en: "Lead Time Reduction", zh: "缩短交期", ms: "Pengurangan Masa Penghantaran", ex: "Achieve lead time reduction.", ex_zh: "实现缩短交期。" },
            { en: "On-Time Delivery", zh: "准时交货", ms: "Penghantaran Tepat Masa", ex: "Ensure on-time delivery.", ex_zh: "确保准时交货。" },
            { en: "Import License", zh: "进口许可证", ms: "Lesen Import", ex: "Apply for import license.", ex_zh: "申请进口许可证。" },
            { en: "Export Documentation", zh: "出口文件", ms: "Dokumentasi Eksport", ex: "Prepare export documentation.", ex_zh: "准备出口文件。" },
            { en: "Certificate of Origin", zh: "原产地证书", ms: "Sijil Asal", ex: "Get certificate of origin.", ex_zh: "获得原产地证书。" },
            { en: "Consolidation", zh: "拼货", ms: "Penggabungan", ex: "Arrange consolidation.", ex_zh: "安排拼货。" },
            { en: "Container Loading", zh: "装柜", ms: "Pemuatan Kontena", ex: "Supervise container loading.", ex_zh: "监督装柜。" },
            { en: "LCL", zh: "拼箱", ms: "LCL", ex: "Ship LCL.", ex_zh: "发拼箱货。" },
            { en: "FCL", zh: "整柜", ms: "FCL", ex: "Book FCL.", ex_zh: "预订整柜。" },
            { en: "Transit Time", zh: "运输时间", ms: "Masa Transit", ex: "Check transit time.", ex_zh: "检查运输时间。" },
            { en: "Demurrage", zh: "滞港费", ms: "Demuraj", ex: "Avoid demurrage.", ex_zh: "避免滞港费。" },
            { en: "Bonded Warehouse", zh: "保税仓", ms: "Gudang Berikat", ex: "Use bonded warehouse.", ex_zh: "使用保税仓。" }
        );
    }

    // engineering/drawing - 20 new words
    if (VOCABULARY.engineering && VOCABULARY.engineering.subcategories.drawing) {
        VOCABULARY.engineering.subcategories.drawing.words.push(
            { en: "Engineering Change Notice", zh: "工程变更通知", ms: "Notis Perubahan Kejuruteraan", ex: "Issue ECN.", ex_zh: "发出ECN。" },
            { en: "Drawing Revision", zh: "图纸版本", ms: "Semakan Lukisan", ex: "Update drawing revision.", ex_zh: "更新图纸版本。" },
            { en: "Detail Drawing", zh: "零件图", ms: "Lukisan Terperinci", ex: "Create detail drawing.", ex_zh: "创建零件图。" },
            { en: "Drawing Scale", zh: "图纸比例", ms: "Skala Lukisan", ex: "Set drawing scale.", ex_zh: "设置图纸比例。" },
            { en: "Third Angle Projection", zh: "第三角投影", ms: "Unjuran Sudut Ketiga", ex: "Use third angle projection.", ex_zh: "使用第三角投影。" },
            { en: "Isometric View", zh: "等轴测图", ms: "Pandangan Isometrik", ex: "Draw isometric view.", ex_zh: "画等轴测图。" },
            { en: "Datum Reference", zh: "基准参考", ms: "Rujukan Datum", ex: "Define datum reference.", ex_zh: "定义基准参考。" },
            { en: "Straightness", zh: "直线度", ms: "Kelurusan", ex: "Check straightness.", ex_zh: "检查直线度。" },
            { en: "Symmetry", zh: "对称度", ms: "Simetri", ex: "Ensure symmetry.", ex_zh: "确保对称度。" },
            { en: "Fit and Tolerance", zh: "配合与公差", ms: "Padanan dan Toleransi", ex: "Define fit and tolerance.", ex_zh: "定义配合与公差。" }
        );
    }

    // engineering/testing - 20 new words
    if (VOCABULARY.engineering && VOCABULARY.engineering.subcategories.testing) {
        VOCABULARY.engineering.subcategories.testing.words.push(
            { en: "Prototype Testing", zh: "样机测试", ms: "Ujian Prototaip", ex: "Conduct prototype testing.", ex_zh: "进行样机测试。" },
            { en: "Design Validation", zh: "设计验证", ms: "Validasi Reka Bentuk", ex: "Complete design validation.", ex_zh: "完成设计验证。" },
            { en: "Design Verification", zh: "设计确认", ms: "Pengesahan Reka Bentuk", ex: "Perform design verification.", ex_zh: "执行设计确认。" },
            { en: "Compression Test", zh: "压缩测试", ms: "Ujian Mampatan", ex: "Perform compression test.", ex_zh: "执行压缩测试。" },
            { en: "Bending Test", zh: "弯曲测试", ms: "Ujian Lenturan", ex: "Run bending test.", ex_zh: "运行弯曲测试。" },
            { en: "Shear Test", zh: "剪切测试", ms: "Ujian Ricih", ex: "Do shear test.", ex_zh: "做剪切测试。" },
            { en: "Hydrostatic Test", zh: "水压测试", ms: "Ujian Hidrostatik", ex: "Run hydrostatic test.", ex_zh: "运行水压测试。" },
            { en: "Flow Rate Test", zh: "流量测试", ms: "Ujian Kadar Aliran", ex: "Do flow rate test.", ex_zh: "做流量测试。" },
            { en: "Electrical Safety Test", zh: "电气安全测试", ms: "Ujian Keselamatan Elektrik", ex: "Conduct electrical safety test.", ex_zh: "进行电气安全测试。" },
            { en: "Insulation Resistance", zh: "绝缘电阻", ms: "Rintangan Penebatan", ex: "Measure insulation resistance.", ex_zh: "测量绝缘电阻。" },
            { en: "Continuity Test", zh: "导通测试", ms: "Ujian Kesinambungan", ex: "Perform continuity test.", ex_zh: "执行导通测试。" },
            { en: "Function Test", zh: "功能测试", ms: "Ujian Fungsi", ex: "Run function test.", ex_zh: "运行功能测试。" },
            { en: "Performance Test", zh: "性能测试", ms: "Ujian Prestasi", ex: "Do performance test.", ex_zh: "做性能测试。" },
            { en: "Environmental Stress Test", zh: "环境应力测试", ms: "Ujian Tekanan Alam Sekitar", ex: "Conduct environmental stress test.", ex_zh: "进行环境应力测试。" },
            { en: "Accelerated Life Test", zh: "加速寿命测试", ms: "Ujian Hayat Pecutan", ex: "Perform accelerated life test.", ex_zh: "执行加速寿命测试。" }
        );
    }

    // daily/communication - 20 new words
    if (VOCABULARY.daily && VOCABULARY.daily.subcategories.communication) {
        VOCABULARY.daily.subcategories.communication.words.push(
            { en: "Discussion", zh: "讨论", ms: "Perbincangan", ex: "Join discussion.", ex_zh: "加入讨论。" },
            { en: "Agreement", zh: "同意", ms: "Persetujuan", ex: "Reach agreement.", ex_zh: "达成一致。" },
            { en: "Disagreement", zh: "不同意", ms: "Ketidaksetujuan", ex: "Express disagreement.", ex_zh: "表达不同意。" },
            { en: "Confirmation", zh: "确认", ms: "Pengesahan", ex: "Get confirmation.", ex_zh: "获得确认。" },
            { en: "Appointment", zh: "预约", ms: "Temu Janji", ex: "Make appointment.", ex_zh: "预约。" },
            { en: "Status Update", zh: "状态更新", ms: "Kemas Kini Status", ex: "Provide status update.", ex_zh: "提供状态更新。" },
            { en: "Notification", zh: "通知", ms: "Pemberitahuan", ex: "Send notification.", ex_zh: "发送通知。" },
            { en: "Announcement", zh: "公告", ms: "Pengumuman", ex: "Make announcement.", ex_zh: "发布公告。" }
        );
    }

    // daily/malaysia - 20 new words
    if (VOCABULARY.daily && VOCABULARY.daily.subcategories.malaysia) {
        VOCABULARY.daily.subcategories.malaysia.words.push(
            { en: "Mamak", zh: "嘛嘛档", ms: "Mamak", ex: "Go to Mamak.", ex_zh: "去嘛嘛档。" },
            { en: "Mangosteen", zh: "山竹", ms: "Manggis", ex: "Try Mangosteen.", ex_zh: "尝山竹。" },
            { en: "Rambutan", zh: "红毛丹", ms: "Rambutan", ex: "Pick Rambutan.", ex_zh: "摘红毛丹。" },
            { en: "Nasi Kandar", zh: "印度饭", ms: "Nasi Kandar", ex: "Enjoy Nasi Kandar.", ex_zh: "享用印度饭。" },
            { en: "Bak Kut Teh", zh: "肉骨茶", ms: "Bak Kut Teh", ex: "Cook Bak Kut Teh.", ex_zh: "煮肉骨茶。" },
            { en: "Chicken Rice", zh: "鸡饭", ms: "Nasi Ayam", ex: "Serve Chicken Rice.", ex_zh: "上鸡饭。" },
            { en: "Char Kway Teow", zh: "炒粿条", ms: "Char Kway Teow", ex: "Fry Char Kway Teow.", ex_zh: "炒粿条。" },
            { en: "Laksa", zh: "叻沙", ms: "Laksa", ex: "Taste Laksa.", ex_zh: "品尝叻沙。" },
            { en: "Satay", zh: "沙爹", ms: "Satay", ex: "Grill Satay.", ex_zh: "烤沙爹。" },
            { en: "Rendang", zh: "仁当", ms: "Rendang", ex: "Prepare Rendang.", ex_zh: "准备仁当。" },
            { en: "Cendol", zh: "煎蕊", ms: "Cendol", ex: "Eat Cendol.", ex_zh: "吃煎蕊。" },
            { en: "ABC", zh: "红豆冰", ms: "ABC", ex: "Order ABC.", ex_zh: "点红豆冰。" },
            { en: "Kopi O", zh: "咖啡乌", ms: "Kopi O", ex: "Drink Kopi O.", ex_zh: "喝咖啡乌。" },
            { en: "Milo Dinosaur", zh: "美禄恐龙", ms: "Milo Dinosaur", ex: "Try Milo Dinosaur.", ex_zh: "尝美禄恐龙。" },
            { en: "Teh C Peng", zh: "茶C冰", ms: "Teh C Peng", ex: "Make Teh C Peng.", ex_zh: "做茶C冰。" },
            { en: "Nasi Kerabu", zh: "蓝花饭", ms: "Nasi Kerabu", ex: "Cook Nasi Kerabu.", ex_zh: "煮蓝花饭。" }
        );
    }

    // safety/regulations - 20 new words
    if (VOCABULARY.safety && VOCABULARY.safety.subcategories.regulations) {
        VOCABULARY.safety.subcategories.regulations.words.push(
            { en: "OSHA", zh: "职业安全与健康管理局", ms: "OSHA", ex: "Follow OSHA.", ex_zh: "遵守OSHA。" },
            { en: "ISO 45001", zh: "ISO 45001", ms: "ISO 45001", ex: "Implement ISO 45001.", ex_zh: "实施ISO 45001。" },
            { en: "DOSH", zh: "职业安全与健康部", ms: "DOSH", ex: "Comply with DOSH.", ex_zh: "遵守DOSH。" },
            { en: "NIOSH", zh: "国家职业安全与健康研究所", ms: "NIOSH", ex: "Reference NIOSH.", ex_zh: "参考NIOSH。" },
            { en: "Safety Standard", zh: "安全标准", ms: "Piawaian Keselamatan", ex: "Meet safety standard.", ex_zh: "符合安全标准。" },
            { en: "Safety Regulation", zh: "安全法规", ms: "Peraturan Keselamatan", ex: "Follow safety regulation.", ex_zh: "遵守安全法规。" },
            { en: "Safety Policy", zh: "安全政策", ms: "Dasar Keselamatan", ex: "Review safety policy.", ex_zh: "审查安全政策。" },
            { en: "Safety Procedure", zh: "安全程序", ms: "Prosedur Keselamatan", ex: "Follow safety procedure.", ex_zh: "遵循安全程序。" },
            { en: "Safety Training", zh: "安全培训", ms: "Latihan Keselamatan", ex: "Attend safety training.", ex_zh: "参加安全培训。" },
            { en: "Safety Audit", zh: "安全审核", ms: "Audit Keselamatan", ex: "Conduct safety audit.", ex_zh: "进行安全审核。" },
            { en: "Safety Inspection", zh: "安全检查", ms: "Pemeriksaan Keselamatan", ex: "Do safety inspection.", ex_zh: "做安全检查。" },
            { en: "Job Safety Analysis", zh: "作业安全分析", ms: "Analisis Keselamatan Kerja", ex: "Complete JSA.", ex_zh: "完成JSA。" },
            { en: "Permit to Work", zh: "工作许可证", ms: "Permit Kerja", ex: "Get permit to work.", ex_zh: "获得工作许可证。" },
            { en: "Lockout Tagout", zh: "上锁挂牌", ms: "Kunci Tag", ex: "Apply lockout tagout.", ex_zh: "应用上锁挂牌。" },
            { en: "Confined Space", zh: "密闭空间", ms: "Ruang Terkurung", ex: "Enter confined space.", ex_zh: "进入密闭空间。" },
            { en: "Hot Work Permit", zh: "动火证", ms: "Permit Kerja Panas", ex: "Issue hot work permit.", ex_zh: "发出动火证。" },
            { en: "Emergency Response Plan", zh: "应急响应计划", ms: "Pelan Tindak Balas Kecemasan", ex: "Review ERP.", ex_zh: "审查ERP。" },
            { en: "Incident Investigation", zh: "事故调查", ms: "Siasatan Insiden", ex: "Conduct incident investigation.", ex_zh: "进行事故调查。" }
        );
    }

    // safety/equipment - 20 new words
    if (VOCABULARY.safety && VOCABULARY.safety.subcategories.equipment) {
        VOCABULARY.safety.subcategories.equipment.words.push(
            { en: "Work Gloves", zh: "工作手套", ms: "Sarung Tangan Kerja", ex: "Use work gloves.", ex_zh: "使用工作手套。" },
            { en: "Face Shield", zh: "面罩", ms: "Perisai Muka", ex: "Wear face shield.", ex_zh: "戴面罩。" },
            { en: "Safety Harness", zh: "安全带", ms: "Abah-abah Keselamatan", ex: "Attach safety harness.", ex_zh: "系好安全带。" },
            { en: "Reflective Vest", zh: "反光背心", ms: "Rompi Reflektif", ex: "Wear reflective vest.", ex_zh: "穿反光背心。" },
            { en: "Emergency Shower", zh: "紧急淋浴", ms: "Pancuran Kecemasan", ex: "Use emergency shower.", ex_zh: "使用紧急淋浴。" },
            { en: "Safety Sign", zh: "安全标志", ms: "Tanda Keselamatan", ex: "Install safety sign.", ex_zh: "安装安全标志。" },
            { en: "Barricade", zh: "路障", ms: "Barikade", ex: "Set up barricade.", ex_zh: "设置路障。" },
            { en: "Safety Cone", zh: "安全锥", ms: "Kon Keselamatan", ex: "Place safety cone.", ex_zh: "放置安全锥。" }
        );
    }


    // engineering/power_electronics - 50 new inverter words
    if (VOCABULARY.engineering) {
        if (!VOCABULARY.engineering.subcategories.power_electronics) {
            VOCABULARY.engineering.subcategories.power_electronics = {
                name: '电力电子与逆变器',
                icon: '⚡',
                words: []
            };
        }
        VOCABULARY.engineering.subcategories.power_electronics.words.push(
            { en: "Inverter", zh: "逆变器", ms: "Penyongsang", ex: "Check inverter status.", ex_zh: "检查逆变器状态。" },
            { en: "Converter", zh: "变换器", ms: "Penukar", ex: "Test converter output.", ex_zh: "测试变换器输出。" },
            { en: "Rectifier", zh: "整流器", ms: "Penerus", ex: "Inspect rectifier circuit.", ex_zh: "检查整流器电路。" },
            { en: "DC-DC Converter", zh: "直流变换器", ms: "Penukar DC-DC", ex: "Adjust DC-DC converter voltage.", ex_zh: "调整直流变换器电压。" },
            { en: "AC Drive", zh: "交流驱动器", ms: "Pemacu AC", ex: "Calibrate AC drive.", ex_zh: "校准交流驱动器。" },
            { en: "Variable Frequency Drive", zh: "变频驱动器", ms: "Pemacu Frekuensi Boleh Ubah", ex: "Configure VFD parameters.", ex_zh: "配置变频驱动器参数。" },
            { en: "IGBT Module", zh: "IGBT模块", ms: "Modul IGBT", ex: "Replace IGBT module.", ex_zh: "更换IGBT模块。" },
            { en: "MOSFET", zh: "金属氧化物半导体场效应管", ms: "MOSFET", ex: "Test MOSFET switching.", ex_zh: "测试MOSFET开关。" },
            { en: "Power Module", zh: "功率模块", ms: "Modul Kuasa", ex: "Monitor power module temperature.", ex_zh: "监控功率模块温度。" },
            { en: "Heat Sink", zh: "散热器", ms: "Penyerap Haba", ex: "Clean heat sink fins.", ex_zh: "清洁散热器翅片。" },
            { en: "Thermal Management", zh: "热管理", ms: "Pengurusan Terma", ex: "Optimize thermal management.", ex_zh: "优化热管理。" },
            { en: "Cooling Fan", zh: "冷却风扇", ms: "Kipas Penyejuk", ex: "Check cooling fan speed.", ex_zh: "检查冷却风扇转速。" },
            { en: "Gate Driver", zh: "栅极驱动器", ms: "Pemacu Get", ex: "Inspect gate driver circuit.", ex_zh: "检查栅极驱动电路。" },
            { en: "Snubber Circuit", zh: "缓冲电路", ms: "Litar Snubber", ex: "Design snubber circuit.", ex_zh: "设计缓冲电路。" },
            { en: "EMI Filter", zh: "电磁干扰滤波器", ms: "Penapis EMI", ex: "Install EMI filter.", ex_zh: "安装电磁干扰滤波器。" },
            { en: "PWM", zh: "脉宽调制", ms: "PWM", ex: "Adjust PWM frequency.", ex_zh: "调整脉宽调制频率。" },
            { en: "Switching Frequency", zh: "开关频率", ms: "Frekuensi Pensuisan", ex: "Increase switching frequency.", ex_zh: "提高开关频率。" },
            { en: "Power Factor Correction", zh: "功率因数校正", ms: "Pembetulan Faktor Kuasa", ex: "Enable PFC function.", ex_zh: "启用功率因数校正功能。" },
            { en: "MPPT", zh: "最大功率点跟踪", ms: "MPPT", ex: "Calibrate MPPT algorithm.", ex_zh: "校准最大功率点跟踪算法。" },
            { en: "Grid-Tied", zh: "并网", ms: "Bersambung Grid", ex: "Connect grid-tied inverter.", ex_zh: "连接并网逆变器。" },
            { en: "Off-Grid", zh: "离网", ms: "Di Luar Grid", ex: "Configure off-grid mode.", ex_zh: "配置离网模式。" },
            { en: "Island Mode", zh: "孤岛模式", ms: "Mod Pulau", ex: "Test island mode operation.", ex_zh: "测试孤岛模式运行。" },
            { en: "Soft Start", zh: "软启动", ms: "Mula Lembut", ex: "Enable soft start feature.", ex_zh: "启用软启动功能。" },
            { en: "Bypass", zh: "旁路", ms: "Pintas", ex: "Switch to bypass mode.", ex_zh: "切换到旁路模式。" },
            { en: "Dead Time", zh: "死区时间", ms: "Masa Mati", ex: "Adjust dead time setting.", ex_zh: "调整死区时间设置。" },
            { en: "Input Voltage", zh: "输入电压", ms: "Voltan Input", ex: "Measure input voltage.", ex_zh: "测量输入电压。" },
            { en: "Output Voltage", zh: "输出电压", ms: "Voltan Output", ex: "Regulate output voltage.", ex_zh: "调节输出电压。" },
            { en: "Output Current", zh: "输出电流", ms: "Arus Output", ex: "Monitor output current.", ex_zh: "监控输出电流。" },
            { en: "Bus Voltage", zh: "母线电压", ms: "Voltan Bas", ex: "Check DC bus voltage.", ex_zh: "检查直流母线电压。" },
            { en: "Nominal Power", zh: "额定功率", ms: "Kuasa Nominal", ex: "Verify nominal power rating.", ex_zh: "验证额定功率。" },
            { en: "Peak Power", zh: "峰值功率", ms: "Kuasa Puncak", ex: "Test peak power capacity.", ex_zh: "测试峰值功率容量。" },
            { en: "Standby Mode", zh: "待机模式", ms: "Mod Sedia", ex: "Enter standby mode.", ex_zh: "进入待机模式。" },
            { en: "Ripple", zh: "纹波", ms: "Riak", ex: "Reduce output ripple.", ex_zh: "减少输出纹波。" },
            { en: "Harmonic", zh: "谐波", ms: "Harmonik", ex: "Analyze harmonic distortion.", ex_zh: "分析谐波失真。" },
            { en: "Isolation Transformer", zh: "隔离变压器", ms: "Pengubah Pengasingan", ex: "Install isolation transformer.", ex_zh: "安装隔离变压器。" },
            { en: "Overvoltage Protection", zh: "过压保护", ms: "Perlindungan Lebih Voltan", ex: "Test overvoltage protection.", ex_zh: "测试过压保护。" },
            { en: "Overcurrent Protection", zh: "过流保护", ms: "Perlindungan Lebih Arus", ex: "Set overcurrent limit.", ex_zh: "设置过流限制。" },
            { en: "Overtemperature Protection", zh: "过温保护", ms: "Perlindungan Lebih Suhu", ex: "Verify overtemperature protection.", ex_zh: "验证过温保护。" },
            { en: "Short Circuit Protection", zh: "短路保护", ms: "Perlindungan Litar Pintas", ex: "Test short circuit protection.", ex_zh: "测试短路保护。" },
            { en: "Ground Fault", zh: "接地故障", ms: "Kerosakan Tanah", ex: "Detect ground fault.", ex_zh: "检测接地故障。" },
            { en: "Arc Fault", zh: "电弧故障", ms: "Kerosakan Arka", ex: "Prevent arc fault.", ex_zh: "预防电弧故障。" },
            { en: "Fault Code", zh: "故障代码", ms: "Kod Kerosakan", ex: "Read fault code.", ex_zh: "读取故障代码。" },
            { en: "Alarm", zh: "报警", ms: "Penggera", ex: "Reset alarm.", ex_zh: "重置报警。" },
            { en: "Conduction Loss", zh: "导通损耗", ms: "Kerugian Konduksi", ex: "Calculate conduction loss.", ex_zh: "计算导通损耗。" },
            { en: "Switching Loss", zh: "开关损耗", ms: "Kerugian Pensuisan", ex: "Minimize switching loss.", ex_zh: "最小化开关损耗。" },
            { en: "Efficiency Curve", zh: "效率曲线", ms: "Lengkung Kecekapan", ex: "Plot efficiency curve.", ex_zh: "绘制效率曲线。" },
            { en: "THD", zh: "总谐波失真", ms: "THD", ex: "Measure THD percentage.", ex_zh: "测量总谐波失真百分比。" },
            { en: "Response Time", zh: "响应时间", ms: "Masa Respons", ex: "Optimize response time.", ex_zh: "优化响应时间。" },
            { en: "Load Regulation", zh: "负载调整率", ms: "Peraturan Beban", ex: "Test load regulation.", ex_zh: "测试负载调整率。" },
            { en: "Line Regulation", zh: "线性调整率", ms: "Peraturan Talian", ex: "Verify line regulation.", ex_zh: "验证线性调整率。" }
        );
    }

})();