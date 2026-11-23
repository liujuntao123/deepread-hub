import type {
  ArgumentMapStep,
  BookReadingDataset,
  BoundaryComparison,
  ChapterProposition,
  KeyGroupSection,
  KeyInsightItem,
  OverviewIntroBlock,
  UltimateThesisBlock,
} from '../types';

const ultimateThesis: UltimateThesisBlock = {
  question:
    '如果只留下一句话把《未来简史》十一章拧成一条主轴，赫拉利究竟预见了一场怎样的现代性自我瓦解？',
  thesis:
    '当人类在21世纪初基本遏制了饥荒、瘟疫与战争这三大古老天敌，转而把长生不死、幸福快乐与化身为“神人”写进新议程时，支撑过去三百年现代秩序的“人文主义”——相信每个人都拥有不可分割的自由意志与至高体验权威——却正被生命科学与计算机算法联手拆毁：智能正在与意识大分离，一旦无意识却高度精准的外部算法比我们更了解自己，人类就可能从世界的主人退化为“无用阶级”，并将宇宙最高权威拱手让给“数据主义”。',
  answerParagraphs: [
    '这句话之所以能把从“草坪历史”一路写到“万物互联网”的全书锁成闭环，是因为赫拉利根本没在写一部猎奇的科幻预言书，而是在追踪一场极具反讽意味的思想坍塌。全书前半段先交代“人类如何成王”：靠把动物降格为资产、靠文字编织出“互为主体的意义之网”、靠签下“放弃意义、换取力量”的现代契约，人文主义终于取代上帝，把人类内心的感受捧上了权威神坛。',
    '然而到了后半段，剧情急转直下：人文主义亲手供养的科学引擎并没有停在服务人类这一站，而是把手术刀掉头插进了人类大脑。脑裂实验与卡尼曼14℃冷水实验撕碎了“单一自由自我”的神话，人工智能在医疗、棋艺与作曲上把“智能”与“意识”彻底剥离，不仅威胁剥夺绝大多数人的经济与军事价值，还催生出把一切生命都视作“数据处理算法”的新兴宗教——数据主义。书尾留下的并非铁板钉钉的宿命，而是逼迫当代人趁尚能踩刹车时必须直面的三个核心追问。',
  ],
};

const overviewIntroQa: OverviewIntroBlock = {
  question:
    '全书从“人类的新议题”起笔，横跨“智人征服世界”“智人为世界赋予意义”“智人失去控制权”三大部分共十一章，赫拉利如何一步步把人文主义推向自我掘墓的边缘？',
  answerLead:
    '整本书像一出三幕悲喜剧：第1章先用现代死亡统计翻开21世纪新议程；第一、二部分（第2—7章）追根溯源，拆解人类究竟凭什么自命万物之灵、又凭什么建立起以人为本的人文主义神殿；第三部分（第8—11章）则让科学实验室和大数据算法正面爆破这座神殿的承重柱。以下依十一章顺序逐章提炼，并将原文之外的引申、推断与保留标注清晰标明。',
};

const chapters: ChapterProposition[] = [
  {
    id: 'hd-01',
    indexLabel: '01',
    chapterTitle: '第1章 人类的新议题',
    part: 'intro',
    partLabel: '导论 人类的新议题',
    shortLabel: '人类的新议题',
    coreProposition:
      '当饥荒、瘟疫与战争从“无法控制的自然力量”转化为“可应对的挑战”后，21世纪人类的下一个宏大议程必然转向长生不死、幸福快乐与化身为“神人”。',
    narrative:
      '几千年来人类向神祈求的不过三件事：别饿死、别病死、别被杀。赫拉利却用一组极具冲击力的现代死亡账单宣告旧时代翻篇：2010年饥荒与营养不良夺走约100万人性命，而肥胖致死高达300万人；2012年全球约5600万死者中，死于人类暴力（战争12万、犯罪50万）合计62万人，竟远低于自杀（80万）和糖尿病（150万）——现在糖比火药更致命。一旦旧议题受控，历史不会允许真空：谷歌子公司Calico等机构已把死亡重新定义为可攻克的技术问题，人类正试图借助生物工程、半机械人工程与非有机生物工程，追求永续愉悦与超人能力。作者还借“一段关于草坪的历史”点明写史的真意：知道家门口的草坪不过源于中世纪英法贵族炫耀闲置土地的符号，才能帮人类从过去的无意识束缚中解放出来。',
    extensionOrInference: {
      kind: '保留标注',
      text: '赫拉利写于2016年的“饥荒、瘟疫与战争已被遏制”判断，在经历2020年代全球疫情与多场大规模地缘冲突后更需要审慎校验；不过作者在本章末尾已特意声明，这些预测指的是人类“试图追寻”而非“必然达成”，也不否认局部苦难仍在，因此将其视作长时段概率趋势而非“旧天敌绝迹”的铁律更为公允。',
    },
  },
  {
    id: 'hd-02',
    indexLabel: '02',
    chapterTitle: '第2章 人类世',
    part: 'part1',
    partLabel: '第一部分 智人征服世界',
    shortLabel: '人类世与生物算法',
    coreProposition:
      '过去7万年是智人改写全球生态的“人类世”，农业有神论与现代工业先后将动物降格为无声资产；可现代生命科学恰恰证明，无论动物还是人类，情感与欲望本质上都是“生物算法”。',
    narrative:
      '童话与纪录片让我们误以为地球仍属于狮狼虎豹，现实却是全球大型动物中有超过90%不是人类就是家畜：全球仅余约20万只野狼，家犬却超过4亿；非洲水牛90万头，驯化牛高达15亿头；企鹅5000万只，鸡却有200亿只。早在狩猎采集时代，泛灵论还把动物当成平等协商的伙伴；农业革命后，人类用有神论的“农业交易”删去动植物的台词，将母猪锁进长200厘米、宽60厘米的水泥金属母猪栏，像哈里·哈洛残酷的幼猴实验一样强行切断哺乳动物的母婴情感联结。可最具讽刺意味的反转正在生命科学实验室里上演：狒狒权衡摘香蕉与躲狮子的恐惧、母爱与欲望并非神秘灵魂，而是数百万年进化打磨出的概率计算“生物算法”——人类有99%的重要抉择同样由这套算法支配。既然动物是算法，人类又凭什么宣称自己高人一等？',
  },
  {
    id: 'hd-03',
    indexLabel: '03',
    chapterTitle: '第3章 人类的特殊之处',
    part: 'part1',
    partLabel: '第一部分 智人征服世界',
    shortLabel: '人类究竟特殊在哪',
    coreProposition:
      '智人统治地球靠的既不是进化论早已否决的“永恒灵魂”，也不是动物同样具备的主观意识，而是独一无二的“互为主体的意义之网”。',
    narrative:
      '进化就是变化，无法分割和渐进改变的“永恒灵魂”根本不可能通过自然选择产生。至于意识与情感，2012年《剑桥意识宣言》与动物实验一再打脸人类中心论：药厂把100只大鼠投入装满水的玻璃管测试抗抑郁药（撑15分钟放弃，若第14分钟捞出喂食再投入则能撑20分钟），前提正是承认大鼠会感受希望与绝望；2010年实验里自由大鼠会先救出狭小笼中的同伴再共享巧克力；瑞典富鲁维克动物园的黑猩猩桑蒂诺清早便把石头藏在稻草下伏击游客；20世纪初看似懂算术的德国名马“聪明的汉斯”则被心理学家奥斯卡·方斯特证明是解读人类微表情的天才。单打独斗的智人并不比祖先更聪明，人类真正的胜负手在于突破150人熟人上限，在“客观现实”与“主观现实”之外编织出第三层“互为主体的现实”（金钱、神明、国家与企业），让无数陌生人围绕共同虚构的故事大规模灵活合作。',
  },
  {
    id: 'hd-04',
    indexLabel: '04',
    chapterTitle: '第4章 说书人',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '说书人与纸面生活',
    coreProposition:
      '文字与货币诞生后，人类突破人脑记忆极限，以官僚算法组织庞大帝国；纸面上的虚构品牌与文件不再只是描述现实，反而反过来重塑并凌驾于血肉现实之上。',
    narrative:
      '文字出现前，神话受限于人脑容量；约5000年前苏美尔人发明文字与货币后，人类终于能靠官僚网络运转超大规模合作。赫拉利将古埃及法老与现代歌星猫王并置：真正掌控尼罗河水利工程或每年吸引超50万朝圣者涌向雅园的，从来不是那个会生老病死的生物体，而是围绕他搭建的虚构品牌。文字一旦与权力结合，“纸上的生活”便威力无穷——1940年葡萄牙领事索萨·门德斯仅凭一个橡皮图章签发签证就救下可能多达3万人；但在更多时候，官方文件与现实冲突时让步的往往是现实，如1884年柏林会议欧洲官僚在半空白地图上一笔画定非洲国界、坦桑尼亚1979年90%农民活在集体农场却只产出全国5%粮食，以及现代学校用分数单取代对学问本身的追求。评价任何人类制度，必须常退一步问：“这个实体会感觉痛苦吗？”',
    extensionOrInference: {
      kind: '引申',
      text: '赫拉利给出的“是否会感觉痛苦”实真检验尺（国家战败国家不痛、银行破产银行不痛，痛的是活生生的士兵、农民与母牛），放到今天的指标考核与算法治理中同样犀利：它能迅速照出一切为抽象报表、KPI或估值而牺牲具体个体血肉体验的纸面拜物教。',
    },
  },
  {
    id: 'hd-05',
    indexLabel: '05',
    chapterTitle: '第5章 一对冤家',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '科学与宗教的共谋',
    coreProposition:
      '世俗常识把科学与宗教想成水火不容的宿敌，实际上宗教关心的核心是“秩序”而非神灵，科学追求的是“力量”而非纯粹真理，两者在历史上往往是一对彼此借力的搭档。',
    narrative:
      '人们一提“科学与宗教”，脑中便浮现猎巫与火刑柱，可科学革命恰恰发源于1600年前后宗教最狂热的伦敦与巴黎，而非更宽容的开罗与伊斯坦布尔。赫拉利重新界定宗教：它不等于迷信或崇拜超自然神明，而是一切为人类法律和规范赋予超人类合法性的“契约”（因此自由主义与共产主义同属宗教），并与逃离世俗秩序的孤独“灵性之旅”截然不同。宗教故事几乎总由“伦理判断+事实声明=具体指示”三部分构成：1441年洛伦佐·瓦拉用语言学和年代考证揭穿《君士坦丁赠礼》实为伪造，现代历史学也证明《利未记》反映的只是古代耶路撒冷祭司的偏见——科学极擅长证伪宗教的事实声明，却永远推不出“该不该为廉价电力牺牲白鳍豚”这类伦理判断。因此，现代社会不可能单靠科学运转，现代史的真相其实是科学与人文主义结盟的协议史。',
  },
  {
    id: 'hd-06',
    indexLabel: '06',
    chapterTitle: '第6章 与“现代”的契约',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '现代契约与增长魔咒',
    coreProposition:
      '现代性的本质是一笔冷酷的交易：人类同意放弃“宇宙存在某种伟大终极意义”的古老安慰，以此换取科学解锁的无尽力量与永不停歇的经济增长。',
    narrative:
      '前现代人把世界看作固定大小的大饼，忍受苦难因为相信自己正出演神圣剧本；现代性却撕碎了剧本，以“放弃意义、换取力量”为条件，靠对未来的信任引爆“信贷”奇迹——与只借不收息、不幻想血量年增3%的吸血蝙蝠不同，现代银行家与资本家靠投资利润把大饼不断做大，甚至让2014年埃博拉疫情暴发时两家药企股价分别暴涨五成和九成。科学革命发现人类自身的无知，进而开发出“越用越多”的第三种资源——知识，使资源枯竭不再是死胡同。但现代增长真正的死敌是生态崩溃：2000—2010年全球温室气体排量年增2.2%，唯一能立竿见影减排的只有经济停滞，可任何政府都不敢踩刹车；更危险的是精英的“方舟综合征”——暗自笃信即便生态洪水淹没世界，高科技也能为上层阶级造出一艘挪亚方舟（正如2013年北京国际学校耗资500万美元为运动场盖起防污圆顶帐篷）。',
    extensionOrInference: {
      kind: '推断',
      text: '作者断言“唯一能确保阻止全球变暖的方式就是停止经济增长，但任何政府都不会愿意这么做”，背后隐含着“增长与生态消耗难以彻底脱钩”的悲观前提；当代绿色能源与循环技术正在力图证伪这一前提，但若脱钩速度始终跑不赢消费膨胀，赫拉利警示的“方舟综合征”与代际转嫁便会愈发逼真。',
    },
  },
  {
    id: 'hd-07',
    indexLabel: '07',
    chapterTitle: '第7章 人文主义革命',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '人文主义的登基与分裂',
    coreProposition:
      '在抛弃上帝与宇宙剧本后，人类并没有陷入虚无，而是靠“人文主义革命”完成惊天逆转——将“人类自身的内在体验与自由意志”加冕为新的宇宙意义之源。',
    narrative:
      '现代契约藏着一条赖皮的例外条款：只要不靠外部宇宙计划，人类自己创造意义就不算违约。于是人文主义横扫全球，以“知识=体验×敏感性”的新公式取代中世纪的“经文×逻辑”，把权威从天上请进人心：伦理上“感觉对了，就做吧”，政治上“选民能做出最好的选择”，经济上“顾客永远是对的”，美学上“看的人觉得美，就是美”（正如杜尚1917年把小便池《喷泉》送进博物馆），教育上“为自己思考”；连看待战争的权威也从马背上的国王转向战壕里二等兵的眼睛。但人文主义很快分裂为三派：正统的“自由人文主义”、强调他人与集体处境的“社会人文主义”，以及迷信优胜劣汰的“进化人文主义”（从贝多芬、查克·贝里、刚果矮人族女孩合唱到狼嚎的四重体验可见三派分歧）。20世纪三大阵营历经惨烈血战，最终自由主义靠超市的胜利与核威慑险胜，成为21世纪初唯一的全球主流方案。',
  },
  {
    id: 'hd-08',
    indexLabel: '08',
    chapterTitle: '第8章 实验室里的定时炸弹',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '自由意志的实验室崩塌',
    coreProposition:
      '自由主义赖以立国的三大事实基石——人有自由意志、人有不可分割的单一自我、人最了解自己——正在神经科学与行为经济学实验室里被逐一引爆。',
    narrative:
      '自由人文主义在政治市场上大获全胜，可它亲手资助的生命科学却在自家后院埋下定时炸弹。第一，脑科学指出人的选择要么源于生物预设、要么源于随机波动，两者瓜分了蛋糕，根本没有“自由意志”的份额：扫描设备能在受试者自己意识到前提前几百毫秒到几秒预测其按键动作；桑吉夫·塔瓦尔给大鼠脑中植入电极就能遥控其行动；记者莎莉·埃迪戴上军方“经颅直流电刺激器”头盔后，脑中自我怀疑瞬间静音并在20分钟内冷静射倒全部20名虚拟攻击者。第二，罗杰·斯佩里与迈克尔·加扎尼加的脑裂实验证明，切断左右脑联系后，负责语言的左脑就像替中情局事后圆谎的国务院发言人，看到鸡爪却见左手因右脑所见雪景指向雪铲时，竟张口编出“清理鸡舍需要铲子”。第三，丹尼尔·卡尼曼的14℃冷水实验（80%受试者宁愿重做多受30秒15℃冷水的长实验）与154名肠镜患者实验揭示，人体内至少住着“体验自我”与只记“峰终定律”、宁可继续受苦也不愿承认过去白费的“叙事自我”。单一真实的自我原来只是另一个虚构故事。',
    extensionOrInference: {
      kind: '保留标注',
      text: '脑科学确实证明人类决策受潜意识与生化机制深刻制约，但从“神经决定论”直接跳到“自由意志与民主政治彻底失效”仍存在哲学跳跃：现代宪政民主与法治在现实中并不要求公民具备形而上学的绝对自由意志，而只需具备可沟通、可纠错与防范权力垄断的公共制衡机制。',
    },
  },
  {
    id: 'hd-09',
    indexLabel: '09',
    chapterTitle: '第9章 大分离',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '智能与意识的大分离',
    coreProposition:
      '21世纪最剧烈的社会裂变是“智能与意识的脱钩”：无意识的算法将在绝大多数职业与决策上碾压人类，制造出失去经济与军事价值的“无用阶级”，并把人类撕裂为超人精英与普通大众。',
    narrative:
      '20世纪大众之所以能争取到普选权、福利与医疗，背后有个务实筹码：工业战争与流水线离不开数以百万计的士兵与工人。但21世纪“智能”正与“意识”彻底脱钩：AlphaGo以4比1击败李世石，肺癌诊断算法准确率达90%（人类医生仅50%），旧金山机器人药剂师首年开出超200万张处方零失误（人类错误率1.7%），戴维·柯普的EMI程序一天就能谱出5000首骗过专业听众的巴赫风格赞美诗。牛津学者弗瑞与奥斯本2013年估算美国47%的工作面临高自动化风险，绝大多数人正面临沦为“无用阶级”的危机。与此同时，从安吉丽娜·朱莉依据BRCA1基因87%患癌概率提前手术，到脸谱网86220人研究显示只需300个赞算法就比配偶更懂你，再到导航软件Waze与微软Cortana从“先知”演进为“代理人”乃至“君主”，外部算法正接管个人选择。等到21世纪医学从“治愈病人”转向“让富人升级”，面对2016年初62名巨富财富等于全球最贫穷36亿人总和的悬殊鸿沟，精英阶层可能干脆切断“三等车厢”，将贫富差距固化为物种鸿沟。',
  },
  {
    id: 'hd-10',
    indexLabel: '10',
    chapterTitle: '第10章 意识的海洋',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '科技人文主义的悖论',
    coreProposition:
      '试图借生物科技把智人升级为“神人”的科技人文主义陷入致命两难：我们在对浩瀚“意识海洋”几乎一无所知时盲目裁剪大脑，而且一旦欲望本身可被技术重写，人类意志便不再神圣。',
    narrative:
      '硅谷正在酝酿两大新科技宗教，其中较保守的“科技人文主义”试图靠基因工程、纳米科技与脑机接口把智人升级为“神人”。可赫拉利戳破了这幅蓝图里的两大暗礁。第一，人类对心智全谱几乎全盲：2010年一项调查发现，顶尖社会心理学期刊96%的样本来自WEIRD群体（西方、受过教育、工业化、富裕、民主），超过三分之二是西方大学心理系学生；正如托马斯·内格尔追问“当蝙蝠的感觉如何”，连蝙蝠的回声世界与鲸鱼数小时的复杂“歌曲”我们都无从体会。在此盲区下，按军队与市场需求给大脑“升级”（如美军“专注头盔”压制怀疑与同理心），只会重复人类为适应大社会而退化嗅觉、注意力与做梦能力的历史，最终把“升级版黑猩猩”降级为高效顺从的“放大版蚂蚁”。第二，科技人文主义把人类意志奉为宇宙依凭的钉子，却同时研发出能随意拔出并重写欲望的药物与脑控工具——当欲望变成可定制的商品，究竟还有谁能裁决欲望本身？',
  },
  {
    id: 'hd-11',
    indexLabel: '11',
    chapterTitle: '第11章 信数据得永生',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '数据主义与终极三问',
    coreProposition:
      '彻底抛弃人类中心的新宗教“数据主义”宣称宇宙由数据流构成、任何实体的价值仅取决于数据处理效率——人类可能沦为万物互联网的过时芯片，但技术绝非宿命，最终选择仍系于当代人的三个追问。',
    narrative:
      '更激进的新兴宗教“数据主义”干脆撤掉了人类的交椅：它把贝多芬第五交响曲、股市泡沫与流感病毒统统视作数据流，把冷战中自由市场战胜计划经济重述为分散式数据处理胜过集中式处理，把民主失灵归因于“政府这只乌龟追不上科技这只野兔”。对数据主义而言，“信息自由”是自1789年以来唯一真正的新价值观（年轻黑客艾伦·施瓦茨因公开JSTOR论文而成为其首位殉道者），“记录、上传、分享”则是现代信徒的日常礼拜。一旦万物互联网成型，人类可能从设计者降级为芯片、再降为数据，像当年被人类功能标准淘汰的长毛象和白鳍豚一样，只剩数据流里一片涟漪。然而赫拉利在书尾刻意按下宿命论的刹车：火车、电力和无线电既造出过法西斯也建起过民主，朝鲜半岛两国面对同一套科技走出了南辕北辙的路。全书最终将三个沉甸甸的问题交到读者手中：生物真的只是算法吗？智能和意识哪个更有价值？当无意识却高智能的算法比我们更了解自己时，社会、政治与生活会变成什么样？',
    extensionOrInference: {
      kind: '引申',
      text: '结合书中“过去想阻挡思想言论靠阻挡信息流通，21世纪靠用不相关信息把人淹没；古代力量来自有权获得资料，今天力量来自知道该忽略什么”的警示，书尾的终极三问恰恰是当代人面对生成式人工智能与算法信息流时最该随身携带的校验尺。',
    },
  },
];

const argumentMapSteps: ArgumentMapStep[] = [
  {
    id: 'hd-step-1',
    stepNumber: '起点',
    title: '糖比火药更致命：旧天敌退场后，人类为何瞄准了长生与成神？',
    shortLabel: '21世纪新议程',
    chaptersRange: '导论 第1章',
    question:
      '几千年来人类拼命向神祈祷不过是别饿死、别病死、别死于战乱，为什么进入第三个千年后，谷歌实验室和硅谷富豪却开始认真讨论战胜死亡与升级成神？',
    leadJudgment:
      '因为饥荒、瘟疫与战争在过去几十年里已从“无法控制的自然力量”转化为“可应对的挑战”；历史不会允许真空，人类必然顺势把长生不死、幸福快乐与化身“神人”推上21世纪头号议程。',
    paragraphs: [
      '赫拉利开篇用一组令人错愕的死亡账单砸碎了传统悲情印象：2010年全球死于饥荒与营养不良者约100万人，而肥胖却夺走了300万人的性命；2012年全球约5600万名死者中，死于人类暴力的共62万人（战争致死12万、犯罪致死50万），竟远远敌不过80万自杀者和150万糖尿病死者——对当代绝大多数人而言，糖真的比火药更致命，暴饮暴食麦当劳的风险甚至高于埃博拉病毒或基地组织恐怖袭击。',
      '一旦旧敌人退居二线，拥有空前科研实力与资本主义增长引擎的现代社会势必寻找新目标：谷歌子公司Calico等机构已把衰老和死亡重新定性为可修复的技术故障，生化调控与基因工程正试图直接改写人类快乐基线并打造超人类。不过赫拉利顺手用“一段关于草坪的历史”点破自己写这部书的真正用意：知道今天家家户户向往的草坪不过源于中世纪英法贵族炫耀闲置土地的符号，才能把人类从过去的无意识束缚里松绑——谈论未来不是为了算命，而是为了趁早看清还能改道的选项。',
    ],
    transitionNote:
      '既然人类敢把自己推上“地球之神”的候选席，那我们得先回头查清一份旧账：人类当初究竟凭什么自命万物之灵、统治所有其他动物，而这份优越感在现代科学眼里还站得住脚吗？',
  },
  {
    id: 'hd-step-2',
    stepNumber: '第 1 步',
    title: '黑猩猩桑蒂诺与猫王品牌：人类究竟比动物多出了什么？',
    shortLabel: '人类世与意义之网',
    chaptersRange: '第一部分 第2—3章 + 第二部分 第4章',
    question:
      '如果现代生物学早已否定“人类独有永恒灵魂”，而且实验大鼠会体会绝望与希望、黑猩猩会提前藏石头、名马“聪明的汉斯”会读懂微表情，那智人统治整个地球靠的到底是什么？',
    leadJudgment:
      '智人统治“人类世”的真正武器既不是灵魂也不是独占的主观意识，而是靠语言和文字编织出的第三层现实——“互为主体的意义之网”；可讽刺的是，这套曾让人类征服动物的科学逻辑，反手也把人类自己还原成了“生物算法”。',
    paragraphs: [
      '在当今地球大型动物里，超过90%不是人类就是家畜（全球仅余约20万只野狼，家犬却超4亿；企鹅5000万只，鸡却高达200亿只）。为了心安理得地把亿万家畜关进工业化母猪栏，农业革命以来的有神论删去了动植物的台词；可现代生命科学拆穿了这层自欺——动物的情感、恐惧与母爱并非廉价机械反射，而是数百万年进化精密计算生存与繁衍概率的“生物算法”。2012年《剑桥意识宣言》改变了举证责任，药厂拿100只大鼠在装满水的玻璃管里测抗抑郁药、2010年大鼠先救笼中同伴再共享巧克力、瑞典黑猩猩桑蒂诺清早把石头藏在稻草下伏击游客，都说明高等动物同样拥有主观意识与筹划能力。',
      '既然单打独斗的个体智人既没有违背进化论的“永恒灵魂”，也没有独占意识，胜负手只落在一处：智人突破了150人的熟人合作上限，能靠群体想象编织出“互为主体的意义之网”。文字与货币发明后，古埃及法老和现代歌星猫王一样，活着的肉身终会腐朽，围绕他搭起的虚构品牌却能让百万人跨时空协作（猫王逝世多年，雅园至今每年迎来超50万朝圣者）。当文字与官僚体系合流，像1884年柏林会议一笔画定非洲国界那样，“纸上的生活”甚至反过来强迫活生生的客观现实向虚构低头。',
    ],
    transitionNote:
      '进入现代社会后，科学不断拆穿古老神圣经典的事实漏洞，按理说虚构故事应该土崩瓦解才对；现代世界究竟签下了哪份新契约，才既保住了大规模协作的秩序、又引爆了史无前例的力量？',
  },
  {
    id: 'hd-step-3',
    stepNumber: '第 2 步',
    title: '放弃意义换取力量：现代契约如何把“人文主义”捧上神坛？',
    shortLabel: '现代契约与人文主义',
    chaptersRange: '第二部分 第5—7章',
    question:
      '现代科学拆毁了上帝和古代宇宙剧本，为什么现代社会没有陷入混乱虚无，反而爆发出比中世纪更狂热的动员力与经济增长？',
    leadJudgment:
      '因为人类签下了一份“现代契约”——主动放弃外在的宇宙终极意义，换取经济增长赋予的巨大力量；同时迅速用“人文主义”填补信仰真空，把“人类自身的内心感受与自由意志”加冕为新的最高权威。',
    paragraphs: [
      '赫拉利先纠正了“科学与宗教誓不两立”的浅薄印象：宗教最在乎秩序，科学最在乎力量；科学虽然能用语言学和考据揭穿《君士坦丁赠礼》或《利未记》里的事实声明，却永远推不出“三峡大坝的廉价电力与白鳍豚存亡孰重”这类伦理判断，因此现代科学必须与现代宗教搭档。这套现代契约的底层交易十分冷酷：承认宇宙没有预设剧本，但只要把“经济增长”奉为最高善、像不同于“贷血不收息”的吸血蝙蝠那样用信贷提前变现未来、靠“越用越多”的知识不断做大蛋糕，就能解决古老的苦难——哪怕这让人类陷入生态崩溃与精英自恃可造“高科技挪亚方舟”的方舟综合征，也没人敢踩刹车。',
      '而在精神层面顶替上帝的，正是席卷全球的“人文主义革命”：用“知识=体验×敏感性”取代经文与逻辑，确立了“选民能做出最好的选择”“顾客永远是对的”“看的人觉得美，就是美”（杜尚《喷泉》）等现代铁律。经过20世纪自由、社会与进化三派人文主义（围绕“贝多芬、查克·贝里、刚果矮人族合唱与狼嚎”等价值归属）的惨烈信仰战争，崇拜个体自由意志的“自由人文主义”最终胜出，筑起了今天民主选举、自由市场与人权体系的全部地基。',
    ],
    transitionNote:
      '看起来自由人文主义已经一统江湖，可偏偏就在登顶的时刻，它亲手供养出来的生命科学与神经实验室，却在自家后院点燃了一颗致命定时炸弹。',
  },
  {
    id: 'hd-step-4',
    stepNumber: '第 3 步',
    title: '14℃冷水实验：实验室里的定时炸弹如何炸碎“自由意志”？',
    shortLabel: '自由意志的崩塌',
    chaptersRange: '第三部分 第8章',
    question:
      '民主投票、自由市场与浪漫爱情全都默认“你是一个完整独立、最懂自己、拥有自由意志的个体”，现代脑科学与心理学实验对这三条铁律给出了什么判决？',
    leadJudgment:
      '实验室的证据正在把这三条自由主义公理逐一拆穿：人类欲望由生物预设与随机性瓜分，人脑内部根本不存在一个铁板一块的“单一自我”，而且替我们做决定的往往是爱编故事、受“峰终定律”支配的“叙事自我”。',
    paragraphs: [
      '赫拉利用三记硬核科学重拳直击人文主义心脏。第一拳来自脑科学与神经调控：人的选择不是生物预设就是随机波动，蛋糕一分为二，没有哪一小块属于“自由意志”。脑部扫描设备能在受试者自己意识到前提前几百毫秒到几秒预测按键动作；桑吉夫·塔瓦尔往实验大鼠脑中植入电极就能遥控其攀爬转弯；记者莎莉·埃迪戴上军方“经颅直流电刺激器”头盔后，脑中自我怀疑的杂音瞬间消失，20分钟内冷静射倒全部20名虚拟攻击者。第二拳来自罗杰·斯佩里与迈克尔·加扎尼加的脑裂实验：切断左右脑神经束后，负责语言的左脑看到鸡爪、右脑看到雪景，患者右手指向鸡而左手指向雪铲，不知内情的左脑立刻面不改色地编出“清理鸡舍需要铲子”——我们自以为掌舵的“我”，常不过是替潜意识中情局事后圆谎的国务院发言人。',
      '第三拳则是诺贝尔经济学奖得主丹尼尔·卡尼曼的14℃冷水实验与154名肠镜患者实验：在“60秒14℃冷水”与“60秒14℃加30秒15℃冷水”之间，足足80%的受试者竟选择重做受苦更久的长实验，只因结尾稍微暖了1℃。这证明人体内至少住着彼此打架的“体验自我”与“叙事自我”：真正承受每一秒苦痛的是体验自我，可掌握记忆、信用卡与选票的却是只记峰值和终点的叙事自我——甚至为避免承认过去痛苦白费，叙事自我宁可在未来继续受苦（如一战意大利11次伊松佐河战役70万士兵阵亡与苏格兰议会大厦超支10倍）。既然“单一自由的自我”都是虚构故事，那句“聆听自己内心的声音”便瞬间失去了权威。',
    ],
    transitionNote:
      '就算实验室证明自由意志是个错觉，两千年前的哲学家早就质疑过自我，也没耽误人类照常投票打工；为什么这一次自由主义却真的扛不住了？因为硅谷把哲学结论变成了抢饭碗、管生活的现实算法。',
  },
  {
    id: 'hd-step-5',
    stepNumber: '第 4 步',
    title: 'EMI作曲与87%概率：智能与意识大分离，人类会沦为无用阶级吗？',
    shortLabel: '大分离与无用阶级',
    chaptersRange: '第三部分 第9—10章',
    question:
      '过去的工业革命虽然淘汰了旧工种，却创造了更多新岗位；为什么这一次人工智能与生物科技的结合，会让人类头一次面临“整体失去经济和军事用途”的危机？',
    leadJudgment:
      '因为历史上首次出现了“智能与意识的脱钩”——无意识的算法不需要拥有感受或情绪，却能在驾驶、诊病、交易乃至作曲上全面超越有意识的人类，进而催生庞大的“无用阶级”，同时让人类把生活决策权一步步交给比自己更懂自己的算法先知。',
    paragraphs: [
      '过去机器只替代体力，人类还可以退守脑力高地；但既然大脑的模式识别与情感直觉本质上也是生化算法，非有机算法照样能做得更快更准：AlphaGo以4比1击败李世石，旧金山机器人药剂师首年开出超200万张处方零失误（对比人类1.7%错误率），肺癌诊断算法准确率达90%而人类医生仅50%，戴维·柯普的EMI程序一天谱出5000首巴赫赞美诗并在俄勒冈大学盲测中骗过专业听众。牛津学者弗瑞与奥斯本估算美国47%的工作高危，一旦大众失去工业战争与流水线赋予的筹码、沦为“无用阶级”，20世纪支撑普选权与福利国家的底层交易就会松动。与此同时，从安吉丽娜·朱莉依据BRCA1变异基因87%患癌概率提前手术、脸谱网86220人研究显示只需300个赞算法就比配偶更懂你，到Waze导航从“先知”演进为“代理人”乃至调控全局的“君主”，权威正悄无声息地从人脑移向算法网络。',
      '更棘手的是，当21世纪医学从“治愈病人”转向“让健康富人升级”，面对2016年初62名最富有人财富等于全球最贫穷36亿人总和的鸿沟，精英阶层可能干脆切断“三等车厢”，把自己改造成全新的超人类物种。而试图借升级智人来保住人类主权的“科技人文主义”本身也撞上了死胡同：顶尖心理学研究96%的样本局限于WEIRD群体，我们对浩瀚“意识的海洋”几乎一无所知，贸然按市场与军方效率去裁剪人脑（如美军专注头盔压制怀疑与同理心），只会把人类降级为“放大版的蚂蚁”；一旦科技连人类欲望本身都能随意重写，被奉为神圣的“人类意志”也就彻底失去了裁决权。',
    ],
    transitionNote:
      '当自由人文主义被实验室与算法拆穿、科技人文主义又在重塑欲望的悖论里自我打结，哪一套全新世界观正准备直接接管整个宇宙的最高解释权？',
  },
  {
    id: 'hd-step-6',
    stepNumber: '终点',
    title: '信数据得永生：当人类沦为数据洪流里的涟漪，我们还剩什么选择？',
    shortLabel: '数据主义与终极三问',
    chaptersRange: '第三部分 第11章 · 全书收束',
    question:
      '如果连“以人为中心”的人文主义也过时了，21世纪正在成形的终极新宗教“数据主义”会怎样重定义宇宙与人的价值，而我们真的只能束手就擒吗？',
    leadJudgment:
      '数据主义把宇宙看作一张无所不包的数据流网络，宣布任何物种的价值只看其数据处理效率——若放任其一统科学界与社会，人类终将像被淘汰的旧芯片一样溶解在万物互联网中；但赫拉利明确拒绝宿命论，用三个核心问题把选择权交回当代人手中。',
    paragraphs: [
      '数据主义极具迷惑性，它最初打着“帮人类实现长生、幸福与神性”的旗号走进生活，却悄悄把最高价值从“人类主观体验”偷换成了“信息自由”（这是自1789年以来唯一真正的新价值观，连26岁黑客艾伦·施瓦茨也因公开JSTOR论文成为其首位殉道者）。今天我们习惯把一顿饭、看到一头大象的瞬间立刻“记录、上传、分享”，其实早已在不知不觉中向万物互联网献祭数据。一旦全球算法网络的处理能力彻底甩开人脑，就像汽车取代马车不是让马升级而是直接让马退休一样，数据主义就会用人类当年淘汰长毛象和白鳍豚的同一把功能尺子，把人类从设计者降级为芯片、再降级为数据，最终只留下一片宇宙数据流里的小小涟漪。',
      '然而全书最清醒的一笔恰恰落在结尾：火车、电力和无线电既催生过法西斯也建起过自由民主，朝鲜半岛两国面对同样的科技走出了南辕北辙的道路——书中一切情境都只是“可能性，而非预言”。在这个“过去阻挡思想靠封锁信息流通，21世纪靠用不相关信息把人淹没；古代力量来自有权获得资料，今天力量来自知道该忽略什么”的噪音时代，赫拉利把三个无法回避的问题留给每一位读者：生物真的只是算法、生命真的只是数据处理吗？智能和意识究竟哪个更有价值？当无意识但高智能的算法比我们更了解自己时，社会、政治与日常生活将会发生怎样的变化？',
    ],
    transitionNote:
      '通读完这场从“人类世”直抵“数据主义”的思想惊雷，我们必须冷静退后一步：赫拉利这套跨学科推演究竟精准击中了哪些时代命门，又在哪些环节滑向了还原论与戏剧化推演的边缘？',
  },
];

const boundaryComparison: BoundaryComparison = {
  id: 'hd-boundary',
  question:
    '《未来简史》凭借什么方法把脑科学、经济史、宗教学与人工智能焊成了一部震撼人心的未来诊断书，而读者又该在哪些论断处保持清醒的保留态度？',
  leadJudgment:
    '赫拉利的过人之处在于用“宗教—权威迁移史”的框架透视科技冲击，敏锐提前捕捉到了“智能与意识脱钩”“算法接管个人判断”等当代核心焦虑；但在阅读时，必须把“哲学思想实验”与“现实工程和政治制度的复杂韧性”严格分开。',
  authorMethodParagraphs: [
    '作者最巧妙的分析工具，是将历史拆解为“权威来源的迁移史”：从神明经书到人类内心（人文主义），再从人类内心滑向外部数据网络（数据主义）。通过把现代意识形态、自由市场和算法范式统统放进广义“宗教”与“数据处理系统”的统一坐标系里，赫拉利打破了人文社科与生命科学、计算机科学之间的学科壁垒，让读者一眼看清：脑科学实验室里关于自由意志的发现，与硅谷大数据推荐系统，其实正在联手撼动民主投票与个人尊严的同一块地基。',
    '同时，作者在行文策略上极具自觉：他在第1章用“草坪的历史”铺垫历史学的解放功能，并在第11章反复声明书中勾勒的只是“可能性，而非预言”，试图用最极端的情景模拟把沉浸在日常惯性里的读者摇醒。尤其关于“智能与意识脱钩”“糖比火药更致命”“今天力量来自知道该忽略什么”等洞察，在生成式人工智能与信息过载席卷全球的今天更显惊人前瞻性。',
  ],
  readerLookbackParagraphs: [
    '但站在今天回看，全书至少有三处边界值得标注。第一，把“生物皆是算法”当成即将一统科学界的必然教条，带有较强的还原论色彩——正如作者在第3章与第11章自己也承认的，生命科学内部对意识究竟如何从电化学信号中涌现至今毫无定论，距离用纯算法穷尽人类主观体验仍隔着鸿沟。',
    '第二，从“自由意志在神经科学上不成立”直接推导出“民主选举与人权价值根基崩塌”，存在逻辑跳步：现代宪政民主的现实根基从来不是形而上学的完美自由灵魂，而是防范权力垄断的纠错制衡机制；即便个体判断充满偏见与算法可预测性，这反而更说明不能把绝对权力交给少数掌控算法的平台或政府。第三，书中对“长生不死工程化”“基本遏制战争与瘟疫”及“全人类迅速分化为超人与无用阶级”的节奏带有畅销书式的戏剧拉近，2020年代的全球疫情冲击与地缘战争回潮都提醒我们：旧议题并未彻底退场，新旧风险往往是叠加共生而非整齐换挡。',
  ],
};

const keyGroups: KeyGroupSection[] = [
  {
    id: 'hd-agenda',
    title: '新议程与人类世：旧天敌退场后，动物与人同为算法',
    shortLabel: '01–05 新议程与动物',
    rangeLabel: '01–05',
    question:
      '当肥胖、糖尿病与自杀取代饥荒与战争成为头号死因，人类给自己开出的新野心为什么反而动摇了人类统治地球的古老理由？',
    answerLead:
      '前五条奠定全书反讽基调：人类借“互为主体的意义之网”坐上人类世宝座，却在用进化论拆掉永恒灵魂、把情感还原为生物算法的同时，悄悄拆掉了自己高人一等的台阶。',
  },
  {
    id: 'hd-humanism',
    title: '现代契约与人文登基：纸面世界如何取代上帝？',
    shortLabel: '06–10 契约与人文',
    rangeLabel: '06–10',
    question:
      '抛弃上帝之后，现代社会凭什么运转得比中世纪更有力量？人文主义又是如何把自己变成现代最高宗教的？',
    answerLead:
      '这五条浓缩了第二部分的思想史精髓：文字虚构凌驾现实、宗教管秩序而科学管力量、人类用放弃意义换取增长力量，并最终把个体体验推上权威神坛。',
  },
  {
    id: 'hd-decoupling',
    title: '实验室爆破与大分离：自我分裂、算法接管与无用阶级',
    shortLabel: '11–15 爆破与大分离',
    rangeLabel: '11–15',
    question:
      '为什么说自由人文主义最大的敌人不是外部独裁者，而是自家实验室里的脑科学家与硅谷工程师？',
    answerLead:
      '这里直击第三部分最犀利的五记重锤：自由意志在决定论与随机性夹击下破产、体验自我与叙事自我分裂、智能与意识脱钩、无用阶级诞生，以及外部算法从先知演化为君主。',
  },
  {
    id: 'hd-dataism',
    title: '数据主义与终极三问：在信息洪流中守住选择权',
    shortLabel: '16–20 数据与三问',
    rangeLabel: '16–20',
    question:
      '如果“万物互联的数据流”准备接管宇宙最高权威，人类还能在历史岔路口握住哪些不被算法吞没的清醒判断？',
    answerLead:
      '最后五条涵盖科技人文主义的悖论、数据主义的新戒律与吞噬风险、信息过载时代的真正力量，以及全书收尾拒绝宿命论的终极三问。',
  },
];

const keyInsights: KeyInsightItem[] = [
  {
    id: 1,
    indexLabel: '01',
    groupId: 'hd-agenda',
    chapterRef: '第1章',
    propositionZh:
      '2012年，全球约有5600万人死亡，其中62万人死于人类暴力（战争致死12万，犯罪致死50万）。相较之下，自杀的人数有80万，死于糖尿病的更是有150万……现在，糖可比火药更致命。',
    propositionEn:
      'In 2012 about 56 million people died throughout the world; 620,000 of them died due to human violence (war killed 120,000 people, and crime killed another 500,000). In contrast, 800,000 committed suicide, and 1.5 million died of diabetes... Sugar is now more dangerous than gunpowder. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最震撼的开篇对照。用一组冰冷的现代死亡账单瞬间扭转了读者对历史威胁的坐标系（同章还给出2010年饥荒与营养不良致死约100万、肥胖致死却达300万的对比）：人类几千年向神祈求逃离的匮乏与暴力正在退居二线，而丰裕时代的新议题——长生不死、幸福快乐与化身为神——正推门而入。',
  },
  {
    id: 2,
    indexLabel: '02',
    groupId: 'hd-agenda',
    chapterRef: '第1章',
    propositionZh:
      '历史学家研究过去不是为了重复过去，而是为了从中获得解放……研究历史并不能告诉我们该如何选择，但至少能给我们提供更多的选项。',
    propositionEn:
      'Historians study the past not in order to repeat it, but in order to be liberated from it... Studying history will not tell us what to choose, but at least it gives us more options. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '紧接着“一段关于草坪的历史”道破整本书的写作立场：中世纪英法贵族城堡前用来炫耀闲置土地的草坪，竟一路演变成美国郊区中产必修仪式乃至卡塔尔伊斯兰艺术博物馆沙漠里10万平方米的绿地。看清看似天经地义的当代生活不过源于历史偶然，才能为21世纪的抉择腾出松绑空间。',
  },
  {
    id: 3,
    indexLabel: '03',
    groupId: 'hd-agenda',
    chapterRef: '第2章',
    propositionZh:
      '生命科学家近几十年间已经证实，情感并不是只能用来写诗谱曲的神秘精神现象，而是对所有哺乳动物生存和繁衍至为关键的生物算法……人类有99%的决定，包括关于配偶、事业和住处的重要抉择，都是由各种进化而成的算法来处理，我们把这些算法称为感觉、情感和欲望。',
    propositionEn:
      'Over the last few decades biologists have demonstrated that emotions are not some mysterious spiritual phenomenon useful only for writing poetry and composing symphonies, but biochemical algorithms vital for the survival and reproduction of all mammals... Ninety-nine per cent of human decisions—including the most important choices concerning spouses, careers and habitats—are made by the highly refined algorithms we call sensations, emotions and desires. （回译）',
    conceptNote: '核心隐喻：生物也是算法（organisms are algorithms）',
    quoteOrigin: 'back-translation',
    analysis:
      '这是贯穿整部《未来简史》最危险也最具穿透力的命题起点。第2章从狒狒权衡“饿死”与“被狮子吃掉”的概率、母猪栏与哈里·哈洛幼猴实验出发，把情感拆解为“生物算法”——一旦我们借此打通了动物与机器之间的墙，后半本书被推倒的必然就是人与机器之间的墙。',
  },
  {
    id: 4,
    indexLabel: '04',
    groupId: 'hd-agenda',
    chapterRef: '第3章',
    propositionZh:
      '无法分割或改变的东西，就不可能通过自然选择而出现……进化就是变化，进化无法产生永恒不变的实体。',
    propositionEn:
      'Nothing that cannot be divided or changed could ever have evolved through natural selection... Evolution means change, and is incapable of producing everlasting entities. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '一句话解释了为什么2012年盖洛普调查里近半数美国人抗拒达尔文却对相对论和量子力学毫不在意：因为相对论不碰灵魂，而进化论用眼睛由细胞器一步步渐进演化的事实，干净利落地拆除了“不可分割的永恒灵魂”这块神学免死金牌，逼迫人类直面无灵魂的生物现实。',
  },
  {
    id: 5,
    indexLabel: '05',
    groupId: 'hd-agenda',
    chapterRef: '第3章',
    propositionZh:
      '智人统治世界，是因为只有智人能编织出互为主体的意义之网：其中的法律、约束力、实体和地点都只存在于他们共同的想象之中……没有任何其他动物能对抗我们，并不是因为它们没有灵魂或没有心灵，而是因为它们没有必要的想象力。',
    propositionEn:
      'Sapiens rule the world because only they can weave an intersubjective web of meaning: a web of laws, forces, entities and places that exist purely in their common imagination... No other animal can stand up to us, not because they lack a soul or a mind, but because they lack the necessary imagination. （回译）',
    conceptNote: '三层现实：客观 / 主观 / 互为主体（intersubjective）',
    quoteOrigin: 'back-translation',
    analysis:
      '在拿大鼠游泳抗抑郁实验、大鼠救同伴共享巧克力、黑猩猩桑蒂诺稻草藏石和名马汉斯打破“人类独占意识”之后，赫拉利精准点出智人突破150人熟人上限的唯一护城河——同时也埋下伏笔：狮子不会开银行账户，可未来一旦算法接管编织意义之网的权力，人类还剩什么优势？',
  },
  {
    id: 6,
    indexLabel: '06',
    groupId: 'hd-humanism',
    chapterRef: '第4章',
    propositionZh:
      '如果官方报告与客观现实有所冲突，最后让步的往往是现实……怎么知道某个实体是否真实？答案很简单，只要问问自己“它是否会感觉痛苦”就行了。',
    propositionEn:
      'Whenever official reports clash with objective reality, reality is often the one that gives way... How do you know if an entity is real? Very simple—just ask yourself, "Can it suffer?" （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '第4章从法老与每年吸引超50万朝圣者的猫王“雅园”品牌讲到文字官僚如何重塑世界：1884年柏林会议在半空白地图上一笔画定非洲国界、坦桑尼亚1979年90%农民在集体农场却只产5%粮食、学校为追求分数牺牲教育。末尾那句“它是否会感觉痛苦”则是刺破一切纸面虚构的终极防身尺。',
  },
  {
    id: 7,
    indexLabel: '07',
    groupId: 'hd-humanism',
    chapterRef: '第5章',
    propositionZh:
      '宗教最在乎的其实是秩序，宗教的目的就是创造和维持社会结构；而科学最在乎的则是力量，科学的目的是通过研究得到力量，以治疗疾病、征伐作战、生产食物。',
    propositionEn:
      'Religion is interested above all in order. It aims to create and maintain the social structure. Science is interested above all in power. It aims to acquire the power to cure diseases, fight wars and produce food. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '彻底破除“科学与宗教天然死敌”的陈旧二元对立。瓦拉在1441年能用语言学揭穿《君士坦丁赠礼》的事实伪造，科学家也能算出三峡大坝的电量与成本，但没有任何方程式能证明“保住白鳍豚还是多发电更有价值”——因此任何现代大型社会都离不开科学力量与广义宗教（在现代即人文主义）秩序的合谋。',
  },
  {
    id: 8,
    indexLabel: '08',
    groupId: 'hd-humanism',
    chapterRef: '第6章',
    propositionZh:
      '这份契约简单到不可思议，只要一句话就能总结——人类同意放弃意义、换取力量……“现代性”的基本教义可以总结为一个简单的想法：“如果解决问题，可能就需要更多；为了拥有更多，就要生产更多。”',
    propositionEn:
      'The deal is surprisingly simple, and can be summarised in a single phrase: humans agree to give up meaning in exchange for power... The fundamental dogma of modernity can be summarised in one simple idea: "If you have a problem, you probably need more stuff, and in order to have more stuff, you must produce more of it." （回译）',
    conceptNote: '核心概念：现代契约（The Modern Deal）',
    quoteOrigin: 'back-translation',
    analysis:
      '把整个现代社会的狂飙与存在焦虑浓缩成一纸冷酷合同：前现代人像“贷血不收息”的吸血蝙蝠一样相信大饼大小固定，现代人则用信贷和“越用越多”的知识资源不断把大饼做大，甚至在2014年埃博拉暴发时把致命瘟疫变成特克米拉股价暴涨五成的商机，却从此再也下不了增长跑轮。',
  },
  {
    id: 9,
    indexLabel: '09',
    groupId: 'hd-humanism',
    chapterRef: '第6章',
    propositionZh:
      '就算情况极度恶化，科学再也无法阻挡洪水侵袭，工程师仍然能够为上层阶级打造出一艘高科技的挪亚方舟，至于其他几十亿人就随波而去吧……唯一能确保阻止全球变暖的方式就是停止经济增长，但任何政府都不会愿意这么做。',
    propositionEn:
      'Even if the worst comes to the worst and science fails to stem the deluge, engineers can still build a high-tech Noah\'s Ark for the upper caste, leaving billions of others to drown... The only sure way to stop global warming is to stop economic growth, which no government is willing to do. （回译）',
    conceptNote: '核心隐喻：方舟综合征（The Ark Syndrome）',
    quoteOrigin: 'back-translation',
    analysis:
      '精准戳中当代气候僵局的双重死结：2000—2010年温室气体排量年增2.2%，2008—2009年碳排短暂下滑靠的不是哥本哈根协议而是金融危机；而从2013年北京国际学校耗资500万美元为运动场盖防污圆顶帐篷起，精英阶层暗自押注“高科技方舟”的侥幸心理，正是生态危机迟迟难以逆转的深层病灶。',
  },
  {
    id: 10,
    indexLabel: '10',
    groupId: 'hd-humanism',
    chapterRef: '第7章',
    propositionZh:
      '传统认为，是伟大的宇宙计划为人类生活带来了意义，但人文主义让角色逆转，认为是人类体验为宇宙赋予了意义……在伦理上，人文主义的座右铭是“感觉对了，就做吧”。在政治上，人文主义告诉我们“选民能做出最好的选择”。在美学上，人文主义说“看的人觉得美，就是美”。',
    propositionEn:
      'Traditionally, the great cosmic plan gave meaning to human life, but humanism reverses the roles and expects human experiences to give meaning to the cosmos... In ethics, the humanist motto is "If it feels good—do it." In politics, humanism instructs us that "the voter knows best." In aesthetics, humanism says that "beauty is in the eye of the beholder." （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把政治选举、消费市场、伦理观念与艺术评判（杜尚1917年将小便池《喷泉》送进博物馆、旅行者一号金唱片并列收录贝多芬、查克·贝里与刚果矮人族歌谣却把狼嚎降级为自然声）一网打尽地还原为同一套现代宗教教义——唯有看清整座现代文明都押注在“人类内心体验至上”，才会明白第8章实验室爆破有多致命。',
  },
  {
    id: 11,
    indexLabel: '11',
    groupId: 'hd-decoupling',
    chapterRef: '第8章',
    propositionZh:
      '就目前最先进的科学看来，人的选择不是生物预设就是随机，两者就像蛋糕一分为二，没有哪一小块属于“自由意志”……人的欲望不是一种“选择”，我们只能“感觉”到欲望，再据以行事。',
    propositionEn:
      'According to the most advanced science today, human choices are either deterministic or random, dividing the cake between them and leaving not a single crumb for "free will"... Humans do not choose their desires; we only feel them, and act accordingly. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '对自由意志祭出最严密的逻辑夹击：把机器人接到放射性铀原子上按衰变奇偶数按键同样不可预测，却绝不是“自由”。脑部扫描提前几百毫秒到几秒预测按键、桑吉夫·塔瓦尔遥控机器生化鼠、以及记者莎莉·埃迪戴上经颅直流电刺激头盔后杂念静音20分钟全歼虚拟敌军，都在把这一哲学结论变成实验室铁证。',
  },
  {
    id: 12,
    indexLabel: '12',
    groupId: 'hd-decoupling',
    chapterRef: '第8章',
    propositionZh:
      '人体内至少有两种自我：体验自我（experiencing self）及叙事自我（narrating self）……我们的叙事自我宁可在未来继续痛苦，也不想承认过去的痛苦完全没有意义。',
    propositionEn:
      'There are at least two selves inside us: the experiencing self and the narrating self... Our narrating self would much rather continue suffering in the future just so it doesn\'t have to admit that our past suffering was devoid of all meaning. （回译）',
    conceptNote: '卡尼曼14℃冷水实验与峰终定律（peak-end rule）',
    quoteOrigin: 'back-translation',
    analysis:
      '紧扣斯佩里与加扎尼加脑裂实验（左脑为鸡爪与雪铲强编“清理鸡舍需要铲子”）、卡尼曼14℃冷水实验（80%受试者宁愿重做多受30秒15℃冷水的长实验）及154名肠镜患者实验。叙事自我不仅靠峰终定律歪曲真实痛苦，更会因“我们的孩子不能白白牺牲”心理把国家拖进伊松佐河70万人阵亡的无底洞，把政府拖进苏格兰议会大厦预算暴涨10倍的沉没成本陷阱。',
  },
  {
    id: 13,
    indexLabel: '13',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '“智能”即将开始与“意识”脱钩，人类因此面临失去经济价值的危险……至少对军队和企业来说，答案再简单不过：智能是必要的，但意识可有可无。',
    propositionEn:
      'Intelligence is decoupling from consciousness, threatening to rob humans of their economic value... For armies and corporations at least, the answer is straightforward: intelligence is mandatory but consciousness is optional. （回译）',
    conceptNote: '核心概念：大分离（The Great Decoupling）',
    quoteOrigin: 'back-translation',
    analysis:
      '一举击破“AI没有情感和自我意识，所以永远替代不了人类”的自我安慰。从2016年AlphaGo以4比1击败李世石、旧金山机器人药剂师首年200万张处方零差错、肺癌诊断算法90%准确率压倒人类医生50%，到戴维·柯普的EMI一天谱出5000首巴赫赞美诗并在盲测中骗过专业乐迷，社会系统付钱买的是结果，而非执行者的主观感受。',
  },
  {
    id: 14,
    indexLabel: '14',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '21世纪经济学最重要的问题，可能就是多余的人能有什么功用……到了21世纪，我们可能看到的是一个全新而庞大的阶级：这一群人没有任何经济、政治或艺术价值，对社会的繁荣、力量和荣耀也没有任何贡献。',
    propositionEn:
      'The most important question in twenty-first-century economics may well be what to do with all the superfluous people... In the twenty-first century we might witness the creation of a massive new unworking class: people devoid of any economic, political or even artistic value, who contribute nothing to the prosperity, power and glory of society. （回译）',
    conceptNote: '核心概念：无用阶级（the useless class）',
    quoteOrigin: 'back-translation',
    analysis:
      '把技术失业问题从经济学拉升到政治权力史高度：1793年法国人权宣言与全国总动员同期登场，1918年威尔逊因一战女性在各行业顶替男性而力推妇女投票权；当牛津研究估算美国47%岗位高危（电话营销99%、收银员97%）、62名最富有人掌控全球底层一半人口财富时，大众失去军事与经济筹码后，精英阶层可能干脆“切断三等车厢”。',
  },
  {
    id: 15,
    indexLabel: '15',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '科技已经让外部算法有能力“比我更了解我自己”。一旦如此，个人主义就即将崩溃，权威也将从个人转向由算法构成的网络……等到谷歌、脸谱网和其他算法成为无所不知的先知之后，很有可能就会进一步演化成代理人，最后成为君主。',
    propositionEn:
      'Technology has made it possible for external algorithms to "know me better than I know myself." Once that happens, belief in individualism will collapse and authority will shift from individual humans to networked algorithms... As Google, Facebook and other algorithms become all-knowing oracles, they may well evolve into agents, and finally into sovereigns. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '沿着安吉丽娜·朱莉凭BRCA1基因87%患癌概率手术、脸谱网86220人研究（10赞胜同事、70赞胜朋友、150赞胜家人、300赞胜配偶）、导航软件Waze因用户太多不得不分流调控，以及Kindle升级后“在你读书的时候，书也在读你”等切片，精准勾勒出没有坦克政变、人类却因便利与安全主动交出方向盘的温柔斜坡。',
  },
  {
    id: 16,
    indexLabel: '16',
    groupId: 'hd-dataism',
    chapterRef: '第10章',
    propositionZh:
      '人的意志是宇宙中最重要的东西，同时人类在开发能够控制、重新设计意志的科技……然而一旦这样的控制成真，过去神圣的人类就会成为另外一种设计品，反而让科技人文主义不知该何去何从。',
    propositionEn:
      'Human will is the most important thing in the universe, while at the same time humans are developing technologies that can control and redesign that very will... Yet once such control becomes a reality, the once-sacred human becomes just another designer product, leaving techno-humanism with nowhere to turn. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '拆穿“用科技把智人升级为神人”的乐观幻梦。一方面，顶尖心理学96%样本局限于WEIRD群体，我们对“意识海洋”与蝙蝠、鲸鱼式体验几乎全盲，按军方和市场需求戴上“专注头盔”只会把人类降级成高效无怀疑的“放大版蚂蚁”；另一方面，若连罗密欧与朱丽叶的爱意都能靠药丸一键清除，被设计出来的欲望便再无资格充当宇宙依凭的钉子。',
  },
  {
    id: 17,
    indexLabel: '17',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '对数据主义来说，信息自由就是最高的善……现代的新座右铭是：“如果你体验到了什么，就记录下来。如果你记录下了什么，就上传。如果你上传了什么，就分享。”',
    propositionEn:
      'For Dataism, freedom of information is the greatest good of all... The new motto says: "If you experience something—record it. If you record something—upload it. If you upload something—share it." （回译）',
    conceptNote: '核心概念：数据主义（Dataism）与信息自由',
    quoteOrigin: 'back-translation',
    analysis:
      '点醒数字原住民的日常信仰迁移：数据主义把自由主义赋予人类的“言论自由”偷换为赋予信息的“信息自由”（2013年1月11日26岁黑客艾伦·施瓦茨因公开JSTOR论文成为首位殉道者）。当我们看到大象或吃顿饭的第一反应不再是体会感受而是拍照上传等点赞，就等于在默认“不汇入全球数据流的体验毫无价值”。',
  },
  {
    id: 18,
    indexLabel: '18',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '一旦万物互联网开始运作，人类就有可能从设计者降级成芯片，再降成数据，最后在数据的洪流中溶解分散，如同滚滚洪流中的一块泥土……我们自己设定的标准，会让我们也走上长毛象和白鳍豚的灭绝之路。',
    propositionEn:
      'Once the Internet-of-All-Things is up and running, humans might be reduced from engineers to chips, then to data, and eventually we might dissolve within the data torrent like a clump of earth within a gushing river... By our own standards, we too could go the way of the mammoths and the Chinese river dolphins. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '与第2章人类用功能标准淘汰野生动物形成震撼首尾闭环：汽车取代马车时人类没有给马升级，而是直接让马退休；当5000万辆共享无人驾驶汽车足以取代10亿辆私家车、万物互联算法全面超越非洲大草原演化出的人脑处理器，人类自己立下的冰冷效率尺子便会掉转过来量在自己头上。',
  },
  {
    id: 19,
    indexLabel: '19',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '过去想阻挡思想言论，做法是阻挡信息流通。但到了21世纪想阻挡思想言论，反而靠的是用不相关的信息把人淹没。我们已经不知道该注意些什么，常常浪费时间研究辩论无关紧要的议题。在古代，力量来自有权获得资料。而到今天，力量却是来自知道该忽略什么。',
    propositionEn:
      'In the past, censorship worked by blocking the flow of information. In the twenty-first century, censorship works by flooding people with irrelevant information. People just don\'t know what to pay attention to, and often spend their time investigating and debating side issues. In ancient times having power meant having access to data. Today having power means knowing what to ignore. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '堪称当代信息社会最精准的诊断之一。它解释了为何连拥有全套情报监控的超级大国政府也会被数据压得反应笨拙、选民不知权力去了哪儿，同时也与尼尔·波兹曼《娱乐至死》警示的“赫胥黎式信息淹没”跨时空共振，直指当代注意力失焦的症结。',
  },
  {
    id: 20,
    indexLabel: '20',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '书中讲到的一切情境，都只是可能性，而非预言……生物真的只是算法，而生命也真的只是数据处理吗？……智能和意识，究竟哪一个才更有价值？……等到无意识但具备高度智能的算法比我们更了解我们自己时，社会、政治和日常生活将会有什么变化？',
    propositionEn:
      'All the scenarios outlined in this book should be understood as possibilities rather than prophecies... Are organisms really just algorithms, and is life really just data processing?... What\'s more valuable—intelligence or consciousness?... What will happen to society, politics and daily life when non-conscious but highly intelligent algorithms know us better than we know ourselves? （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书收束的定海神针。赫拉利用工业革命的火车、电力与无线电催生出法西斯与民主两种截然相反的政体，以及朝鲜半岛两国面对同一套科技走出南辕北辙道路的历史事实，明确拒绝廉价的技术宿命论，把方向盘重新递回具备反思能力的人类读者手中。',
  },
];

export const BOOK_DATASET: BookReadingDataset = {
  ultimateThesis,
  overviewIntroQa,
  chapters,
  argumentMapSteps,
  boundaryComparison,
  keyGroups,
  keyInsights,
};
