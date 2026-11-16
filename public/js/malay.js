// 马来语专项数据
const MALAY_DATA = {
    readings: [
        {
            title: "工厂安全规定",
            titleMs: "Peraturan Keselamatan Kilang",
            content: "Semua pekerja mesti memakai peralatan perlindungan diri (PPE) semasa berada di kawasan kilang. Ini termasuk topi keselamatan, cermin mata keselamatan, dan kasut keselamatan. Merokok dilarang sama sekali di dalam kawasan kilang. Sila laporkan sebarang bahaya kepada penyelia anda dengan segera.",
            translation: "所有工人在工厂区域必须穿戴个人防护装备（PPE）。这包括安全帽、安全眼镜和安全鞋。工厂区域内严禁吸烟。请立即向主管报告任何隐患。",
            questions: [
                { q: "Apakah PPE?", a: "Peralatan perlindungan diri (个人防护装备)", q_zh: "PPE是什么？" },
                { q: "Di mana merokok dilarang?", a: "Di dalam kawasan kilang (工厂区域内)", q_zh: "哪里禁止吸烟？" }
            ]
        },
        {
            title: "马来西亚美食文化",
            titleMs: "Budaya Makanan Malaysia",
            content: "Malaysia terkenal dengan pelbagai jenis makanan. Nasi lemak adalah hidangan kebangsaan yang dimakan dengan sambal, ikan bilis, kacang tanah, dan telur. Teh tarik adalah minuman kegemaran rakyat Malaysia. Anda boleh menikmati makanan ini di kedai mamak yang dibuka 24 jam.",
            translation: "马来西亚以各种美食闻名。椰浆饭是国菜，配以叁巴酱、江鱼仔、花生和鸡蛋。拉茶是马来西亚人最喜爱的饮料。您可以在24小时营业的嘛嘛档享用这些美食。",
            questions: [
                { q: "Apakah hidangan kebangsaan Malaysia?", a: "Nasi lemak (椰浆饭)", q_zh: "马来西亚的国菜是什么？" },
                { q: "Di mana boleh menikmati makanan ini?", a: "Di kedai mamak (嘛嘛档)", q_zh: "在哪里可以享用这些美食？" }
            ]
        },
        {
            title: "品质管理通知",
            titleMs: "Notis Pengurusan Kualiti",
            content: "Pihak pengurusan ingin memaklumkan bahawa audit ISO 9001 akan dijalankan pada minggu hadapan. Semua jabatan diminta menyediakan dokumen dan rekod kualiti yang berkaitan. Sila pastikan semua prosedur operasi standard (SOP) dikemaskini. Terima kasih atas kerjasama anda.",
            translation: "管理层通知，ISO 9001审核将于下周进行。请各部门准备相关文件和品质记录。请确保所有标准操作程序（SOP）已更新。感谢您的合作。",
            questions: [
                { q: "Bilakah audit ISO 9001?", a: "Minggu hadapan (下周)", q_zh: "ISO 9001审核什么时候？" },
                { q: "Apa yang perlu disediakan?", a: "Dokumen dan rekod kualiti (文件和品质记录)", q_zh: "需要准备什么？" }
            ]
        }
    ],
    
    phrases: [
        { ms: "Selamat pagi", zh: "早上好", en: "Good morning", category: "问候" },
        { ms: "Terima kasih banyak", zh: "非常感谢", en: "Thank you very much", category: "问候" },
        { ms: "Sama-sama", zh: "不客气", en: "You're welcome", category: "问候" },
        { ms: "Maafkan saya", zh: "对不起/打扰了", en: "Excuse me / I'm sorry", category: "问候" },
        { ms: "Boleh", zh: "可以", en: "Can / OK", category: "日常" },
        { ms: "Tidak apa", zh: "没关系", en: "No problem / It's okay", category: "日常" },
        { ms: "Berapa harga ini?", zh: "这个多少钱？", en: "How much is this?", category: "购物" },
        { ms: "Mahal sangat", zh: "太贵了", en: "Too expensive", category: "购物" },
        { ms: "Boleh kurang?", zh: "可以便宜点吗？", en: "Can you reduce the price?", category: "购物" },
        { ms: "Di mana tandas?", zh: "洗手间在哪里？", en: "Where is the restroom?", category: "问路" },
        { ms: "Pusing kiri", zh: "左转", en: "Turn left", category: "问路" },
        { ms: "Pusing kanan", zh: "右转", en: "Turn right", category: "问路" },
        { ms: "Jalan terus", zh: "直走", en: "Go straight", category: "问路" },
        { ms: "Saya tidak faham", zh: "我不明白", en: "I don't understand", category: "沟通" },
        { ms: "Boleh cakap perlahan?", zh: "可以说慢点吗？", en: "Can you speak slowly?", category: "沟通" },
        { ms: "Tolong ulang sekali lagi", zh: "请再说一遍", en: "Please repeat", category: "沟通" },
        { ms: "Saya sakit", zh: "我生病了", en: "I'm sick", category: "医疗" },
        { ms: "Saya perlukan doktor", zh: "我需要看医生", en: "I need a doctor", category: "医疗" },
        { ms: "Tolong!", zh: "救命！", en: "Help!", category: "紧急" },
        { ms: "Polis di mana?", zh: "警察在哪里？", en: "Where is the police?", category: "紧急" },
        { ms: "Saya lapar", zh: "我饿了", en: "I'm hungry", category: "饮食" },
        { ms: "Saya dahaga", zh: "我渴了", en: "I'm thirsty", category: "饮食" },
        { ms: "Sedap!", zh: "好吃！", en: "Delicious!", category: "饮食" },
        { ms: "Tidak pedas", zh: "不辣", en: "Not spicy", category: "饮食" },
        { ms: "Jalan sesak", zh: "塞车", en: "Traffic jam", category: "交通" },
        { ms: "Saya lambat", zh: "我迟到了", en: "I'm late", category: "工作" },
        { ms: "Kerja bagus!", zh: "做得好！", en: "Good job!", category: "工作" },
        { ms: "Mesyuarat pukul berapa?", zh: "会议几点？", en: "What time is the meeting?", category: "工作" },
        { ms: "Siap!", zh: "完成了！", en: "Done!", category: "工作" },
        { ms: "Balik kerja", zh: "下班", en: "Off work / Going home", category: "工作" }
    ],
    
    spelling: [
        { ms: "Selamat pagi", zh: "早上好", hint: "S_l_m_t p_g_" },
        { ms: "Terima kasih", zh: "谢谢", hint: "T_r_m_ k_s_h" },
        { ms: "Kawalan Kualiti", zh: "品质控制", hint: "K_w_l_n K__l_t_" },
        { ms: "Pemeriksaan", zh: "检验", hint: "P_m_r_ks__n" },
        { ms: "Pengeluaran", zh: "生产/产量", hint: "P_ng_l__r_n" },
        { ms: "Penyelenggaraan", zh: "维护", hint: "P_ny_l_ngg_r__n" },
        { ms: "Mesyuarat", zh: "会议", hint: "M_sy__r_t" },
        { ms: "Pembekal", zh: "供应商", hint: "P_mb_k_l" },
        { ms: "Gudang", zh: "仓库", hint: "G_d_ng" },
        { ms: "Keselamatan", zh: "安全", hint: "K_s_l_m_t_n" },
        { ms: "Kerosakan", zh: "故障/损坏", hint: "K_r_s_k_n" },
        { ms: "Peralatan", zh: "设备", hint: "P_r_l_t_n" },
        { ms: "Pelanggan", zh: "客户", hint: "P_l_gg_n" },
        { ms: "Penghantaran", zh: "交货", hint: "P_ng_h_nt_r_n" },
        { ms: "Tindakan Pembetulan", zh: "纠正措施", hint: "T_nd_k_n P_mb_t_l_n" }
    ]
};
