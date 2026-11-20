import type {
  ArgumentMapStep,
  BookReadingDataset,
  BoundaryComparison,
  ChapterProposition,
  KeyGroupSection,
  KeyInsightItem,
} from '../types/reading';

export const HOMO_DEUS_ULTIMATE_THESIS = {
  question:
    '如果只留下一句话把《未来简史》十一章拧成一条主轴，赫拉利究竟预见了一场怎样的现代性自我瓦解？',
  thesis:
    '当人类在21世纪初基本遏制了饥荒、瘟疫与战争这三大古老天敌，转而把长生不死、幸福快乐与化身为神写进新议程时，支撑过去三百年现代秩序的“人文主义”——相信每个人都拥有不可分割的自由意志与至高体验权威——却正被生命科学与计算机算法联手拆毁：智能正在与意识大分离，一旦无意识却高度精准的外部算法比我们更了解自己，人类就可能从世界的主人退化为“无用阶级”，并将宇宙最高权威拱手让给“数据主义”。',
  answerParagraphs: [
    '这句话之所以能把从“草坪历史”一路写到“万物互联网”的全书锁成闭环，是因为赫拉利根本没在写一部猎奇的科幻预言书，而是在追踪一场极具反讽意味的思想坍塌。全书前半段先交代“人类如何成王”：靠把其他动物贬为无魂机器、靠纸面虚构的“意义的网”、靠用“放弃宇宙意义”去换取“经济增长力量”的现代契约，人文主义终于取代上帝，把人类内心的感受捧上了权威神坛。',
    '然而到了后半段，剧情急转直下：人文主义所倚重的科学引擎并没有停在服务人类这一站，而是把手术刀掉头插进了人类大脑。裂脑实验与卡尼曼冷水实验撕碎了“单一自由自我”的神话，人工智能在医疗、棋艺与作曲上把“智能”与“意识”彻底剥离，不仅威胁剥夺绝大多数人的经济与军事价值，还催生出把一切生命都视作“数据处理算法”的新兴宗教——数据主义。书尾留下的并非铁板钉钉的宿命，而是逼迫当代人趁尚能踩刹车时必须直面的三个核心追问。',
  ],
};

export const HOMO_DEUS_OVERVIEW_INTRO_QA = {
  question:
    '全书从导论“人类的新议题”起笔，横跨“智人征服世界”“智人为世界赋予意义”“智人失去控制权”三大部分共十一章，赫拉利如何一步步把人文主义推向自我掘墓的边缘？',
  answerLead:
    '整本书像一出三幕悲喜剧：第1章先用现代死亡统计翻开21世纪新议程；第一、二部分（第2—7章）追根溯源，拆解人类究竟凭什么自命万物灵长、又凭什么建立起以人为本的人文主义神殿；第三部分（第8—11章）则让科学实验室和大数据算法正面爆破这座神殿的承重柱。以下依十一章顺序逐章提炼，并将原文之外的引申、推断与保留标注清晰标明。',
};

export const HOMO_DEUS_CHAPTER_PROPOSITIONS: ChapterProposition[] = [
  {
    id: 'hd-01',
    indexLabel: '01',
    chapterTitle: '第1章 人类的新议题',
    part: 'intro',
    partLabel: '导论 人类的新议题',
    shortLabel: '人类的新议题',
    coreProposition:
      '当饥荒、瘟疫与战争从“天谴宿命”退化为可管控的挑战后，21世纪人类的下一个宏大议程必然转向战胜死亡、追求永恒快乐与升级为“智神”。',
    narrative:
      '几千年来人类向神祈求的不过三件事：别饿死、别病死、别被杀。赫拉利却用一组极具冲击力的现代死亡账单宣告旧时代翻篇：2010年饥荒与营养不良致死约100万人，而肥胖致死高达300万人；2012年全球约5600万死者中，战争（12万）与犯罪（50万）合计62万，竟远低于自杀（80万）和糖尿病（150万）——今天糖比火药更致命。一旦旧议题受控，人类绝不会就此停手，谷歌Calico等机构已把死亡重新定义为可攻克的技术故障，生化调控与基因工程正准备帮人类追求永续愉悦与超人能力。作者还借“贵族草坪的历史”阐明写史的意义：知道今天理所当然的草坪不过是古代贵族炫耀闲置土地的产物，才能把人类从无意识的旧剧本里松绑。',
  },
  {
    id: 'hd-02',
    indexLabel: '02',
    chapterTitle: '第2章 人类世',
    part: 'part1',
    partLabel: '第一部分 智人征服世界',
    shortLabel: '人类世与生物算法',
    coreProposition:
      '农业与工业革命把人类推上“人类世”独裁宝座，为了心安理得地剥削亿万动物，一神教与科学先后发明了把动物剥夺灵魂与情感的叙事；但现代科学恰恰证明，无论动物还是人类，本质上都是生化算法。',
    narrative:
      '如果把今天地球上所有大型动物称重，人类约占3亿吨、家禽家畜约7亿吨，而所有野生大型动物加起来还不到1亿吨——地球早已进入智人一家独大的“人类世”。为了安抚良心，从万物有灵论的平等对话转向农业革命的有神论交易时，人类把自己升格为唯一拥有灵魂的造物，把猪牛鸡鸭贬低成没有痛苦的工业原料。可最具讽刺意味的反转正在实验室里上演：生命科学证明动物的情感、母爱与恐惧并非廉价机械反射，而是经过数百万年演化精密计算生存概率的“生化算法”；既然如此，如果动物是算法，人类又凭什么宣称自己例外？',
  },
  {
    id: 'hd-03',
    indexLabel: '03',
    chapterTitle: '第3章 人类的特殊之处',
    part: 'part1',
    partLabel: '第一部分 智人征服世界',
    shortLabel: '人类究竟特殊在哪',
    coreProposition:
      '人类统治地球的真正法宝既不是演化论已否决的“永恒灵魂”，也不是动物同样具备的自我意识，而是独一无二的“互为主体意义之网”。',
    narrative:
      '既然达尔文演化论早已让“不变的灵魂”无处安身，人类比动物高贵在哪？有人说人有意识，赫拉利却翻出动物心理学档案逐一打脸：关在狭小笼里的实验室大鼠会抑郁；瑞典富鲁维克动物园的黑猩猩桑蒂诺（Santino）会一大早偷偷囤石块、甚至盖干草伪装来砸游客，证明它能规划未来；而20世纪初看似懂算术的德国名马“聪明的汉斯”（Clever Hans）其实靠敏锐读懂人类微表情来点蹄子。个体智人既没有灵魂也没有独占意识，真正让智人甩开黑猩猩、在地球上建成庞大帝国的唯一优势，是在“客观现实”与“主观感受”之外编织出第三层现实——靠集体信任维系的“互为主体的现实”（金钱、神明、国家与企业）。',
  },
  {
    id: 'hd-04',
    indexLabel: '04',
    chapterTitle: '第4章 说书人',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '说书人与纸面生活',
    coreProposition:
      '文字发明之后，纸面上的虚构实体不再只是辅助记账的工具，反而成了压倒血肉真实、重塑客观世界的最高统治者。',
    narrative:
      '口耳相传的故事受限于人脑容量，文字出现后，人类终于能运转由数百万陌生人共同演出的超长剧本。赫拉利用古埃及法老与现代猫王（Elvis Presley）对比指出：法老也好、猫王也罢，真正日进斗金、让百万人顶礼膜拜的从来不是那个会生老病死的生物体，而是围绕他建立起来的“品牌与虚构实体”——肉身死了，雅园照样每年迎来超过50万朝圣者。更惊人的是，当文字与官僚系统结合，“纸面上的生活”开始强行改造现实世界：帝国划定的虚构国界、会计账本里的抽象数字、甚至现代教育的分数单，常常比真实的人类苦痛和河流生态拥有大得多的生杀予夺之权。',
  },
  {
    id: 'hd-05',
    indexLabel: '05',
    chapterTitle: '第5章 一对冤家',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '科学与宗教的共谋',
    coreProposition:
      '世俗常识把科学与宗教想成水火不容的宿敌，实际上宗教关心的核心是“秩序”而非神灵，科学负责提供事实与工具、宗教负责输出伦理判断，两者在历史上往往是一对彼此借力的冤家搭档。',
    narrative:
      '人们一提“科学与宗教”，脑中就蹦出中世纪火刑柱和猎巫行动。赫拉利却精准拆解了二者的真实分工：宗教绝非等同于迷信或崇拜超自然神明，而是一切能赋予人类法律、规范与价值观以超人类合法性的“交易系统”（因此共产主义与自由主义同样是宗教）。作者把经典文本拆成“伦理判断+事实陈述=实务指南”的三段式：无论是伪造的《君士坦丁赠礼》还是《利未记》，科学最擅长检验其中的事实漏洞，却无法凭空推导出一丁点“应当如何”的伦理价值。因此，任何大型现代社会都不可能单靠纯粹科学运转，科学必须与某种宗教（在现代便是人文主义）合作，才能建成医院、大坝与法律体系。',
  },
  {
    id: 'hd-06',
    indexLabel: '06',
    chapterTitle: '第6章 与“现代”的契约',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '现代契约与增长魔咒',
    coreProposition:
      '现代性的本质是一笔史无前例的交易：人类同意放弃“宇宙存在某种伟大终极意义”的古老安慰，以此换取科学解锁的无尽力量与永不停歇的经济增长。',
    narrative:
      '前现代人忍受贫困与瘟疫，是因为坚信自己正扮演着上帝或天道安排的宏大宇宙角色；现代文化却撕毁了这份剧本，坦承宇宙本身并无剧本，人生也没什么先天注定的宏大意义——作为回报，现代性许诺给人类前所未有的物质力量，而解锁力量的咒语就是“经济增长”。为了喂饱资本家和银行家（与靠分享鲜血互助求生的吸血蝙蝠不同，现代银行靠信用把未来大饼提前变现），现代社会把增长尊为压倒一切的最高善，相信它能自动化解阶级冲突与政治难题；可这笔交易藏着生态崩溃的“方舟综合征”——哪怕地球生态面临灾难，人类依旧像停不下来的老鼠跑轮一样不敢踩下增长刹车，因为一旦增长停摆，整个现代社会就会立刻分崩离析。',
  },
  {
    id: 'hd-07',
    indexLabel: '07',
    chapterTitle: '第7章 人文主义革命',
    part: 'part2',
    partLabel: '第二部分 智人为世界赋予意义',
    shortLabel: '人文主义的登基与分裂',
    coreProposition:
      '在抛弃上帝与宇宙剧本后，人类并没有陷入虚无，而是发起了一场席卷全球的“人文主义革命”——将“人类自身的内在体验与自由意志”加冕为新的宇宙意义之源。',
    narrative:
      '如果没有神明颁布善恶，现代人凭什么决定谁对谁错、美丑高低？答案落在“倾听你内心的声音”：政治上“选民最清楚”，经济上“顾客永远是对的”，美学上“美在观者眼中”，伦理上“只要感觉好且不伤人就去做”，教育上“学会自己思考”。赫拉利精妙地把人文主义拆成三派内战：正统的“自由人文主义”（崇拜独一无二的个人自由）、“社会人文主义”（强调感受他人尤其是底层受苦者的集体体验）与“演化人文主义”（迷信物种优胜劣汰，最终引爆纳粹灾难）。20世纪三大阵营血战收场，自由人文主义险胜称王；但正如赫拉利拿贝多芬与查克·贝里作比，就连“谁更高级”的艺术评判权，也已彻底从经书权威转移到了个体主观感受之上。',
  },
  {
    id: 'hd-08',
    indexLabel: '08',
    chapterTitle: '第8章 实验室里的定时炸弹',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '自由意志的实验室崩塌',
    coreProposition:
      '自由主义赖以立国的三大基石——人有自由意志、人有不可分割的单一自我、人最了解自己——正在神经科学与认知心理学实验室里被逐一引爆。',
    narrative:
      '人文主义在政治与市场上大获全胜，可它亲手资助的生命科学却在实验室里埋下了一颗定时炸弹。第一，演化论与脑科学指出，所谓“自由意志”既不是神秘魔法，也逃不出基因与环境交织的决定论与随机性——往大鼠或人脑特定区域施加电流，就能精准制造或抹除欲望。第二，迈克尔·加扎尼加的裂脑实验揭示，左脑根本不是诚实的主宰，而是个擅长替自己无意识行为事后圆谎的“自编剧”。第三，诺贝尔奖得主丹尼尔·卡尼曼的14℃冷水实验（60秒14℃ vs 60秒14℃加30秒稍微回暖至15℃）证明，每个人体内至少住着“体验自我”与“叙事自我”两个打架的房客，而替我们做决定、投选票的往往是只记峰终故事、无视真实受苦时长的叙事自我。如果连“真实的单一自我”都不存在，自由主义的根基便瞬间悬空。',
    extensionOrInference: {
      kind: '保留标注',
      text: '脑科学确实证明人类决策受潜意识与生化机制深刻制约，但从“神经决定论”直接跳到“自由意志与民主政治彻底失效”仍存在哲学跳跃：民主与法治在现实中并不要求公民具备形而上学的绝对自由意志，而只需具备可沟通、可纠错与可承担责任的公共理性空间。',
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
      '21世纪最剧烈的社会裂变是“智能与意识的脱钩”：无意识的算法很快将在绝大多数职业与决策中击败人类，不仅制造出庞大且失去经济与军事价值的“无用阶级”，还会把社会撕裂为升级版超人与普通大众两个生物阶层。',
    narrative:
      '20世纪大众之所以能争取到普选权、福利与医疗，背后有个冷冰冰的现实筹码：工业大军和流水线离不开数以百万计的普通士兵与工人。可21世纪算法正在把“高度智能”从“主观意识”中剥离出来——自动驾驶、金融交易员、放射科医生甚至艺术作曲都被改写（大卫·柯普写的EMI程序一天就能谱出5000首骗过专家耳朵的巴赫风格赞美诗）。当绝大多数人连被“剥削”的价值都丧失，沦为“无用阶级”，精英阶层还会继续维持平等民主吗？与此同时，安吉丽娜·朱莉凭基因检测得知自己有87%概率患乳腺癌而预防性切除乳腺，预告了算法“从先知走向君主”的轨迹：当你把健康、伴侣和职业决策一步步外包给比你更懂你DNA和心率的算法，少数掌握资本与生物改造权的精英将可能借科技把自己升级成全新的超人类物种，把贫富差距固化成不可逾越的生物鸿沟。',
  },
  {
    id: 'hd-10',
    indexLabel: '10',
    chapterTitle: '第10章 意识的海洋',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '科技人文主义的悖论',
    coreProposition:
      '试图用生物科技把智人升级为“智神”的科技人文主义，在追求强化人类心智的道路上却面临致命悖论：一旦技术能随意设计人类欲望，人类就不再是决定宇宙方向的主人，反而成了被市场与军队塑形的商品。',
    narrative:
      '面对自由人文主义的摇摇欲坠，科技精英们推出了一套修补方案——“科技人文主义”：既然智人过时了，那就用基因编辑、纳米机器人和脑机接口把人类升级成更强、更聪明的“智神”（Homo Deus）。但赫拉利一眼看穿这套宏伟蓝图里的致命暗礁：第一，我们对“意识的海洋”几乎一无所知，绝大多数演化出的心智状态我们连想象都想象不到，贸然只按现代经济与军事需求去裁剪大脑（例如像军方给士兵装上消除恐惧与质疑的头盔那样，放大服从与算力、阉割怀疑与同理心），只会造出更高效却更残缺的“降级版工具人”；第二，科技人文主义仍把“人类欲望”奉为神圣，可当技术本身足以按需重写欲望时，究竟是谁在替谁做主？',
  },
  {
    id: 'hd-11',
    indexLabel: '11',
    chapterTitle: '第11章 信数据得永生',
    part: 'part3',
    partLabel: '第三部分 智人失去控制权',
    shortLabel: '数据主义与终极三问',
    coreProposition:
      '彻底抛弃人类中心的新宗教“数据主义”宣称宇宙由数据流构成、任何实体的价值仅取决于它对数据处理的贡献——一旦万物互联网成型，人类可能从设计师降级为芯片，最终溶解在数据洪流里。',
    narrative:
      '如果说科技人文主义还想给人类留把交椅，硅谷正在孕育的“数据主义”（Dataism）则干脆连椅子都撤掉了。在它眼里，自由市场与计划经济之争不过是分布式与集中式数据处理的效率之争，贝多芬第五交响曲与股票行情同样是数据流，而“信息自由流通”就是至高戒律——连“记录、上传、分享”都成了现代信徒的日常祷告。一旦人类不再是最高效的数据处理器，数据主义就可能像当年人类抛弃猛犸象和白鳍豚一样抛弃智人。然而赫拉利在书尾刻意收住悲观预言的闸门：同样是火车、电力和无线电，既催生过法西斯也建起过自由民主，技术绝不等于宿命。全书最终以三个直抵灵魂的问题交到读者手中：1.生物真的只是算法、生命真的只是数据处理吗？2.智能和意识，究竟哪一个更有价值？3.等到无意识却高智能的算法比我们更了解自己时，社会、政治与生活会变成什么样？',
    extensionOrInference: {
      kind: '引申',
      text: '结合书中“过去阻挡思想靠封锁信息，21世纪阻挡思想靠用不相关信息淹没人群；古代力量来自获取资料，今天力量来自知道该忽略什么”的警示，这三个问题恰恰是当代人面对生成式AI与算法推荐时最该随身携带的校验尺。',
    },
  },
];

export const HOMO_DEUS_ARGUMENT_MAP_STEPS: ArgumentMapStep[] = [
  {
    id: 'hd-step-1',
    stepNumber: '第 1 步',
    title: '糖比火药更致命：旧天敌退场后，人类为何瞄准了长生与成神？',
    shortLabel: '21世纪新议程',
    chaptersRange: '导论 第1章',
    question:
      '几千年来人类拼命祈祷不过是别饿死、别病死、别死于战乱，为什么进入第三个千年后，谷歌实验室和硅谷富豪却开始认真讨论战胜死亡与升级成神？',
    leadJudgment:
      '因为饥荒、瘟疫与战争在过去几十年里已从“不可控的天谴宿命”退化为可管理的技术与政治挑战；人类绝不会在赢下旧战役后停下脚步，必然顺势把长生不死、永恒快乐与化身“智神”推上21世纪头号议程。',
    paragraphs: [
      '赫拉利开篇用一组令人错愕的死亡数据砸碎了传统悲情印象：2010年全球死于饥荒与营养不良者约100万人，而死于肥胖相关疾病者高达300万人；2012年全球约5600万名死者中，战争（12万）与犯罪（50万）合起来不过62万人，甚至敌不过80万自杀者和150万糖尿病死者——对当代绝大多数人而言，麦当劳和白砂糖真的比火药和瘟疫更致命。',
      '一旦旧敌人退居二线，拥有空前科研实力与资本引擎的现代社会势必寻找新目标：把衰老和死亡重新定性为可以修复的生物技术故障，用生化干预和基因改造去直接调节人类快乐基线，进而将智人升级为超人类。不过赫拉利顺手用“草坪的历史”点破自己写这部书的真正用心：正因为我们不是为了算命，而是像识破“贵族草坪只是旧炫富符号”一样看清眼前这条赛道是怎么铺出来的，才有可能在列车冲下悬崖前主动改变方向。',
    ],
    transitionNote:
      '既然人类敢把自己推上“造物神明”的候选席，那我们得先回头查清一份旧账：人类当初究竟凭什么自命万物之灵、统治所有其他动物，而这份优越感在现代科学眼里站得住脚吗？',
  },
  {
    id: 'hd-step-2',
    stepNumber: '第 2 步',
    title: '黑猩猩桑蒂诺与猫王品牌：人类究竟比动物多出了什么？',
    shortLabel: '人类世与意义之网',
    chaptersRange: '第一部分 第2—3章 + 第4章',
    question:
      '如果现代生物学早已否定“人类独有永恒灵魂”，而且黑猩猩会提前藏石头、名马“聪明的汉斯”会读懂微表情，那智人统治整个地球靠的到底是什么？',
    leadJudgment:
      '智人统治“人类世”的真正武器既不是灵魂也不是独占的自我意识，而是靠语言和文字编织出的第三层现实——“互为主体的意义之网”；可讽刺的是，这套曾让人类征服动物的科学逻辑，反手也把人类自己还原成了“生化算法”。',
    paragraphs: [
      '在地球大型动物总重量里，人类与家畜占去超过九成，野生动物不足一成。为了心安理得地把亿万头猪牛鸡鸭关进工业化铁笼，农业以来的宗教把动物贬成无魂之物；可现代生命科学拆穿了这层自欺——动物的情感、痛苦与社交直觉并非低级反射，而是演化打磨数百万年的精密“生化算法”。关在铁笼里的实验鼠会抑郁，动物园黑猩猩桑蒂诺会清早囤石头并藏在草堆下伏击游客，说明许多高等动物同样拥有主观意识与筹划能力。',
      '既然单打独斗的个体智人与动物并无本质神圣鸿沟，胜负手只落在一处：智人能借文字与群体信任编造“互为主体的虚构实体”——就像古埃及法老和现代歌星猫王一样，活着的肉身终会腐朽，围绕他们搭起的“品牌与神圣叙事”却能让百万人跨时空协作。文字诞生之后，账本、国界与神圣经典上的“纸面生活”甚至反过来压倒了真实血肉的感受。',
    ],
    transitionNote:
      '进入现代社会后，科学不断拆穿古老神圣经典的事实漏洞，按理说虚构故事应该土崩瓦解才对；现代世界究竟签下了哪份新契约，才既保留了大规模协作的秩序、又引爆了史无前例的力量？',
  },
  {
    id: 'hd-step-3',
    stepNumber: '第 3 步',
    title: '放弃意义换取力量：现代契约如何把“人文主义”捧上神坛？',
    shortLabel: '现代契约与人文主义',
    chaptersRange: '第二部分 第5—7章',
    question:
      '现代科学拆毁了上帝和古代宇宙剧本，为什么现代社会没有陷入混乱虚无，反而爆发出比宗教时代更狂热的动员力与经济增长？',
    leadJudgment:
      '因为人类签下了一份“现代契约”——主动放弃外在的宇宙终极意义，换取经济增长赋予的巨大力量；同时迅速用“人文主义”填补信仰真空，把“人类自身的内心感受与自由意志”加冕为新的最高权威。',
    paragraphs: [
      '赫拉利首先纠正了“科学与宗教势不两立”的浅薄印象：宗教的核心是维系秩序与给出价值判断，科学只能核查事实，永远推导不出“人生应该追求什么”；因此现代科学照样需要一套现代宗教做搭档。这套搭档的底层交易十分冷酷：承认宇宙本身没有预设剧本，但只要大家齐心协力把“经济增长”奉为最高善，用信用不断做大蛋糕，就能解决贫困、冲突与痛苦——即便它带来了生态透支的“方舟综合征”，全社会也不敢停下跑轮。',
      '而在精神层面顶替上帝的，正是席卷全球的“人文主义革命”：政治听选民的心声、市场听顾客的感受、艺术听观众的直觉（连贝多芬与查克·贝里孰高孰低都交由体验裁决）。经过20世纪自由、社会与演化三派人文主义的惨烈内战，崇拜个体自由意志的“自由人文主义”最终胜出，构成了今天民主选举、自由市场与人权体系的全部地基。',
    ],
    transitionNote:
      '看起来自由人文主义已经一统江湖，可偏偏就在登顶的时刻，它亲手供养出来的生命科学与神经实验室，却在自家后院点燃了一颗致命炸弹。',
  },
  {
    id: 'hd-step-4',
    stepNumber: '第 4 步',
    title: '14℃冷水实验：实验室里的定时炸弹如何炸碎“自由意志”？',
    shortLabel: '自由意志的崩塌',
    chaptersRange: '第三部分 第8章',
    question:
      '民主投票、自由市场与浪漫爱情全都默认“你是一个完整独立、最懂自己、拥有自由意志的个体”，现代脑科学与心理学实验对这三条铁律给出了什么判决？',
    leadJudgment:
      '实验室的证据正在把这三条自由主义公理逐一拆穿：人类欲望受控于决定论加随机性的生化算法，人脑内部根本不存在一个铁板一块的“单一自我”，而且替我们做决定的往往是爱编故事却会歪曲真实体验的“叙事自我”。',
    paragraphs: [
      '赫拉利用三记硬核科学重拳直击人文主义心脏。第一拳来自演化论与神经调控：没有任何灵魂能跳出物理与生化因果链，只要用微弱电流刺激大脑特定区域，就能凭空开关一个人的恐惧、冲动或爱欲，所谓“自由意志”不过是感受不到底层生化运算时产生的主观错觉。第二拳来自迈克尔·加扎尼加的裂脑实验：切断左右脑连接后，负责语言的左脑面对右脑做出的动作，居然会面不改色地瞬间编出一套合情合理的假借口——那个自以为掌舵的“我”，其实常是个事后圆谎的公关发言人。',
      '第三拳则是诺贝尔奖得主丹尼尔·卡尼曼著名的冷水实验：让受试者分别经历60秒14℃冰水（短实验）与60秒14℃加30秒15℃冰水（长实验），结果大多数人竟宁愿重做受苦更久的长实验，只因末尾稍微暖了1℃。这证明人体内住着彼此打架的“体验自我”与“叙事自我”：真正承受每一秒痛苦的是体验自我，可掌握记忆、投票与人生大权的，却是只记高潮和结尾的叙事自我。既然连“真实完整的自我”都是幻象，那一句“倾听你内心的声音”便瞬间失去了权威。',
    ],
    transitionNote:
      '就算实验室证明自由意志是个错觉，哲学家早就争论过几千年，也没耽误人类照常投票打工；为什么这一次自由主义却真的扛不住了？因为硅谷把哲学结论变成了抢饭碗、管生活的现实算法。',
  },
  {
    id: 'hd-step-5',
    stepNumber: '第 5 步',
    title: 'EMI作曲与87%概率：智能与意识大分离，人类会沦为无用阶级吗？',
    shortLabel: '大分离与无用阶级',
    chaptersRange: '第三部分 第9—10章',
    question:
      '过去的工业革命虽然淘汰了旧工种，却创造了更多新岗位；为什么这一次人工智能与生物科技的结合，会让人类头一次面临“整体失去经济和军事用途”的危机？',
    leadJudgment:
      '因为历史上首次出现了“智能与意识的大分离”——无意识的算法不需要拥有感受或情绪，却能在驾驶、诊病、交易乃至作曲上全面碾压有意识的人类，进而催生庞大的“无用阶级”，同时让人类把生活决策权一步步交给比自己更懂自己的算法先知。',
    paragraphs: [
      '过去机器只替代体力，人类还可以退守需要直觉、模式识别与情感判断的脑力高地；但既然大脑的直觉本质上也是生化模式识别算法，计算机照样能学得更快更准。大卫·柯普开发的EMI程序一天就能写出5000首足以乱真的巴赫风格赞美诗，证明连最引以为傲的艺术灵感也不再是人类禁区。一旦绝大多数普通人既打不了无人机战争、又干不过算法流水线，20世纪支撑普选权与福利国家的底层筹码就会抽空；与此同时，就像安吉丽娜·朱莉依据基因检测87%的患癌概率提前做手术一样，算法正从提供参考的“先知”悄然升级为替我们选医生、选伴侣甚至选政党的“君主”。',
      '更棘手的是，当少数巨富开始用基因工程和脑机接口把自己升级为长寿、高智的生物精英，社会不平等可能头一次固化为物种鸿沟。而试图靠升级智人来保住人类主权的“科技人文主义”本身也陷入死胡同：在对浩瀚“意识的海洋”一无所知时，按市场和军事效率去裁剪人脑（比如消除士兵的恐惧与怀疑），只会把人降格为失去灵魂的精密零件。',
    ],
    transitionNote:
      '当自由人文主义被实验室拆穿、科技人文主义又在重塑欲望的悖论里自我打结，哪一套全新世界观正准备直接接管整个宇宙的最高解释权？',
  },
  {
    id: 'hd-step-6',
    stepNumber: '第 6 步',
    title: '信数据得永生：当人类沦为数据洪流里的涟漪，我们还剩什么选择？',
    shortLabel: '数据主义与终极三问',
    chaptersRange: '第三部分 第11章',
    question:
      '如果连“以人为中心”的人文主义也过时了，21世纪正在成形的终极新宗教“数据主义”会怎样重定义宇宙与人的价值，而我们真的只能束手就擒吗？',
    leadJudgment:
      '数据主义把宇宙看作一张无所不包的数据流网络，宣布任何物种的价值只看其数据处理效率——若放任其一统科学界与社会，人类终将像被淘汰的旧芯片一样溶解在万物互联网中；但赫拉利明确拒绝宿命论，用三个核心问题把选择权交回当代人手中。',
    paragraphs: [
      '数据主义极具迷惑性，因为它最初打着“帮人类实现长生、幸福与成神”的旗号走进生活，却悄悄把最高价值从“人类主观体验”偷换成了“信息自由流动”。今天我们习惯把一顿饭、一次心跳、一段恋情立刻“记录、上传、分享”，其实早已在不知不觉中向万物互联网献祭数据。一旦全球算法网络的处理能力彻底甩开人脑，以数据为中心的范式就会像人类过去淘汰猛犸象和白鳍豚一样，不再关心人类这个过时处理器的喜怒哀乐。',
      '然而全书最清醒的一笔恰恰落在结尾：火车、电力和无线电既能服务极权也能滋养民主，朝鲜半岛南北两国面对同样的工业技术走出了截然相反的道路——科技带来的是各种“可能性”，绝非铁板钉钉的“预言”。在今天“力量不再来自获取信息，而来自知道该忽略什么”的噪音时代，赫拉利把三个无法回避的追问留给每一位读者：生物真的只是算法吗？智能与意识究竟哪个更有价值？当无意识算法比我们更懂我们自己，人类社会究竟该如何重立契约？',
    ],
    transitionNote:
      '通读完这场从“人类世”直抵“数据主义”的思想惊雷，我们必须冷静退后一步：赫拉利这套跨学科推演究竟精准击中了哪些时代命门，又在哪些环节滑向了修辞夸张与技术决定论的边缘？',
  },
];

export const HOMO_DEUS_BOUNDARY_COMPARISON: BoundaryComparison = {
  id: 'hd-boundary',
  question:
    '《未来简史》凭借什么方法把脑科学、经济史、宗教学与人工智能焊成了一部震撼人心的未来诊断书，而读者又该在哪些论断处保持清醒的保留态度？',
  leadJudgment:
    '赫拉利的过人之处在于用“宗教—权威迁移史”的框架透视科技冲击，敏锐提前捕捉到了“智能与意识脱钩”“算法接管个人判断”等当代核心焦虑；但在阅读时，必须把“哲学思想实验”与“现实工程和政治制度的复杂韧性”严格分开。',
  authorMethodParagraphs: [
    '作者最巧妙的分析工具，是将历史拆解为“权威来源的迁移史”：从神明经书到人类内心（人文主义），再从人类内心滑向外部数据网络（数据主义）。通过把现代意识形态、自由市场和算法范式统统放进广义“宗教”与“数据处理系统”的统一坐标系里，赫拉利打破了人文社科与生命科学、计算机科学之间的学科壁垒，让读者一眼看清：脑科学实验室里关于自由意志的发现，与硅谷大数据推荐系统，其实正在联手撼动民主投票与个人尊严的同一块地基。',
    '同时，作者在行文策略上极具自觉：他在第1章用“草坪的历史”铺垫历史学的解放功能，并在第11章反复声明书中勾勒的只是“可能性而非预言”，试图用最极端的情景模拟把沉浸在日常惯性里的读者摇醒。尤其关于“智能与意识大分离”“糖比火药更致命”“信息时代的力量在于知道该忽略什么”等洞察，在生成式人工智能席卷全球的今天更显惊人前瞻性。',
  ],
  readerLookbackParagraphs: [
    '但站在今天回看，全书至少有三处边界值得标注。第一，把“生物皆是算法”当成即将一统科学界的必然教条，带有较强的还原论色彩——生命科学内部对意识的本质（“困难问题”）、具身认知以及复杂生态系统的涌现性至今远无定论，距离用纯算法穷尽人类主观体验仍隔着鸿沟。',
    '第二，从“自由意志在神经科学上不成立”直接推导出“民主选举与人权价值根基崩塌”，存在逻辑跳步：现代宪政民主的现实根基从来不是形而上学的完美自由灵魂，而是防范权力垄断的纠错制衡机制；即便个体判断充满偏见与算法可预测性，这反而更说明不能把绝对权力交给少数掌控算法的平台或政府。第三，书中对“长生不死工程化”“彻底消灭战争与瘟疫”及“全人类迅速分化为超人与无用阶级”的时间表带有畅销书式的戏剧拉近，像2020年后的全球疫情冲击与地缘战争回潮都提醒我们：旧议题并未彻底退场，新旧风险往往是叠加共生而非整齐换挡。',
  ],
};

export const HOMO_DEUS_KEY_GROUPS: KeyGroupSection[] = [
  {
    id: 'hd-agenda',
    title: '新议程与人类世：旧天敌退场后，动物与人同为算法',
    shortLabel: '01–05 新议程与动物',
    rangeLabel: '01–05',
    question:
      '当肥胖与自杀取代饥荒与战争成为头号死因，人类给自己开出的新野心为什么反而动摇了人类统治地球的古老理由？',
    answerLead:
      '前五条奠定全书反讽基调：人类借“互为主体意义之网”坐上人类世宝座，却在把动物简化为生化算法的同时，悄悄拆掉了自己高人一等的灵魂台阶。',
  },
  {
    id: 'hd-humanism',
    title: '现代契约与人文登基：纸面世界如何取代上帝？',
    shortLabel: '06–10 契约与人文',
    rangeLabel: '06–10',
    question:
      '抛弃上帝之后，现代社会凭什么运转得比中世纪更有力量？人文主义又是如何把自己变成现代最高宗教的？',
    answerLead:
      '这五条浓缩了第二部分的思想史精髓：文字虚构凌驾现实、科学与宗教分管事实与价值、人类用放弃意义换取增长力量，并最终把个体体验推上权威神坛。',
  },
  {
    id: 'hd-decoupling',
    title: '实验室爆破与大分离：自我分裂、算法接管与无用阶级',
    shortLabel: '11–15 爆破与大分离',
    rangeLabel: '11–15',
    question:
      '为什么说自由人文主义最大的敌人不是外部独裁者，而是自家实验室里的脑科学家与硅谷工程师？',
    answerLead:
      '这里直击第三部分最犀利的五记重锤：体验自我与叙事自我的分裂、智能与意识的大分离、无用阶级的诞生，以及算法如何从先知一步步变为君主。',
  },
  {
    id: 'hd-dataism',
    title: '数据主义与终极三问：在信息洪流中守住选择权',
    shortLabel: '16–20 数据与三问',
    rangeLabel: '16–20',
    question:
      '如果“万物互联的数据流”准备接管宇宙最高权威，人类还能在历史岔路口握住哪些不被算法吞没的清醒判断？',
    answerLead:
      '最后五条涵盖科技人文主义的悖论、数据主义的新戒律、信息过载时代的真正力量，以及全书收尾拒绝宿命论的终极三问。',
  },
];

export const HOMO_DEUS_KEY_INSIGHTS: KeyInsightItem[] = [
  {
    id: 1,
    indexLabel: '01',
    groupId: 'hd-agenda',
    chapterRef: '第1章',
    propositionZh:
      '2012年全球死于战争与犯罪的人数合计约62万，而死于自杀的有80万、死于糖尿病的更高达150万——今天，糖比火药更致命。',
    propositionEn:
      'In 2012, about 620,000 people died from war and crime combined, compared with 800,000 suicides and 1.5 million deaths from diabetes—today, sugar is far more dangerous than gunpowder. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最震撼的开篇对照。用一组冰冷的现代死亡账单瞬间扭转了读者对历史威胁的坐标系：人类几千年祈求逃离的匮乏与暴力正在退居二线，而丰裕时代的新议题（长生、快乐与升级成神）正推门而入。',
  },
  {
    id: 2,
    indexLabel: '02',
    groupId: 'hd-agenda',
    chapterRef: '第1章',
    propositionZh:
      '研究历史并不是为了照搬过去，而是为了把我们从过去的无意识束缚中解放出来——就像知道草坪最初只是贵族炫耀土地的符号，你才不必盲目为草坪劳碌一生。',
    propositionEn:
      'We study history not to repeat the past, but to be liberated from it—once you learn that lawns began as aristocratic status symbols, you are free to rethink your own choices. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '用“草坪的历史”这个极接地气的日常切片，把宏大的历史哲学讲得通透无比：所有看似天经地义的当代生活标准，往上追几百年往往只是一场历史偶然。',
  },
  {
    id: 3,
    indexLabel: '03',
    groupId: 'hd-agenda',
    chapterRef: '第2章',
    propositionZh:
      '现代生命科学指出，情绪、欲望与母爱并不是动物拥有的神秘灵魂，也不是低级机械反射，而是经过数百万年演化计算生存与繁衍概率的“生化算法”。',
    propositionEn:
      'Modern life sciences hold that emotions, desires, and maternal love are neither mystical souls nor crude reflexes, but biochemical algorithms honed over millions of years to calculate survival and reproduction. （回译）',
    conceptNote: '核心隐喻：生物也是算法（organisms are algorithms）',
    quoteOrigin: 'back-translation',
    analysis:
      '这是贯穿整部《未来简史》最危险也最具穿透力的命题起点：一旦我们用“生化算法”打通了动物与机器之间的墙，下一步被推倒的必然就是人与机器之间的墙。',
  },
  {
    id: 4,
    indexLabel: '04',
    groupId: 'hd-agenda',
    chapterRef: '第3章',
    propositionZh:
      '在客观世界与主观世界之外，智人还创造出了第三层现实——“互为主体的现实”；正是金钱、国家与公司这张集体编织的意义之网，而不是灵魂，让人类征服了地球。',
    propositionEn:
      'Beyond objective and subjective realities, Sapiens weave a third level—intersubjective reality; it is this collective web of money, nations, and corporations, not an immortal soul, that gave humans dominion over Earth. （回译）',
    conceptNote: '三层现实：客观 / 主观 / 互为主体（intersubjective）',
    quoteOrigin: 'back-translation',
    analysis:
      '在拿黑猩猩桑蒂诺和名马汉斯打破“人类独占意识”之后，赫拉利精准交代了智人的唯一护城河——同时也埋下伏笔：既然人类优势全在编织意义之网，那未来算法一旦接管织网权，人类还剩什么？',
  },
  {
    id: 5,
    indexLabel: '05',
    groupId: 'hd-agenda',
    chapterRef: '第3章',
    propositionZh:
      '演化的铁律早已否定“不可分割的永恒灵魂”——灵魂如果不能拆分与渐进变异，就不可能经由自然选择演化出来。',
    propositionEn:
      'The theory of evolution rules out an indivisible eternal soul—anything that cannot be assembled and modified step by step could never have evolved through natural selection. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '干净利落地拆除了传统神学替人类划出的特殊免死金牌。人类如果还想为自身尊严辩护，不能再躲进灵魂神话，必须直面脑科学与演化论给出的真实人性底板。',
  },
  {
    id: 6,
    indexLabel: '06',
    groupId: 'hd-humanism',
    chapterRef: '第4章',
    propositionZh:
      '就像法老和猫王一样，在大型文明里，真正运转权力与财富的从来不是那个有血有肉的生物体，而是围绕他搭建起来的虚构品牌；而文字让“纸面上的生活”凌驾于活生生的现实之上。',
    propositionEn:
      'Just like the Pharaoh and Elvis Presley, in large civilizations power and wealth belong less to the biological body than to the fictional brand—and writing allowed life on paper to override living reality. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '拿古埃及法老与田纳西州猫王故居雅园并置，一眼刺穿一切权力与名望的虚构本质：肉身死去多年，品牌依然收割版税与朝圣者；账本与公文一旦写定，往往比血肉痛苦更具统治力。',
  },
  {
    id: 7,
    indexLabel: '07',
    groupId: 'hd-humanism',
    chapterRef: '第5章',
    propositionZh:
      '宗教在乎的从来不是神灵，而是秩序；科学在乎的是力量——科学永远无法独自推导出任何伦理价值，因此任何现代大工程都离不开科学事实与宗教（含人文主义）价值判断的合谋。',
    propositionEn:
      'Religion is above all about order, while science is about power—science can never derive ethical judgments on its own, so every large modern project relies on an alliance between scientific facts and religious or humanist values. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '破除了“科学与宗教天然死敌”的陈旧二元对立。哪怕是修建一座水坝或设计一套医疗体系，科学只回答“能不能建、会淹多少村”，决定“值不值得建”的永远是一套超越纯粹事实的价值信仰。',
  },
  {
    id: 8,
    indexLabel: '08',
    groupId: 'hd-humanism',
    chapterRef: '第6章',
    propositionZh:
      '现代契约可以用一句话概括：人类同意放弃宇宙的终极意义，以换取无穷无尽的物质力量——而维持这份契约不崩盘的唯一咒语，就是永不停歇的经济增长。',
    propositionEn:
      'The modern deal can be summed up in one sentence: humans agree to give up cosmic meaning in exchange for power—and the sole mantra keeping this deal intact is relentless economic growth. （回译）',
    conceptNote: '核心概念：现代契约（The Modern Deal）',
    quoteOrigin: 'back-translation',
    analysis:
      '把整个现代社会的焦躁感浓缩成了一纸冷酷合同：过去人们忍受贫苦因为相信神圣剧本，现代人放弃了剧本，却把自己绑上了“一旦GDP停滞整个社会就面临撕裂与崩溃”的高速跑轮。',
  },
  {
    id: 9,
    indexLabel: '09',
    groupId: 'hd-humanism',
    chapterRef: '第6章',
    propositionZh:
      '面对经济增长带来的生态失衡，人类常常陷入“方舟综合征”：哪怕气候危机步步紧逼，社会依然不敢踩下增长刹车，因为停下增长本身就会立刻引爆当前的经济与政治灾难。',
    propositionEn:
      'Confronting ecological destabilization, humanity falls into an "Ark Syndrome"—even as climate risks mount, societies dare not hit the brakes on growth because halting growth triggers immediate economic and political collapse. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '精准刻画了当代气候谈判与能源转型的死结：问题往往不在大家不知道生态危险，而在于现代信用和福利体系早已全盘押注在持续扩张的增长前提上。',
  },
  {
    id: 10,
    indexLabel: '10',
    groupId: 'hd-humanism',
    chapterRef: '第7章',
    propositionZh:
      '人文主义革命把宇宙的最高权威从天上的经书挪进了人类的内心：选民最清楚、顾客永远是对的、美在观者眼中——连贝多芬与查克·贝里孰优孰劣，都由个体体验裁决。',
    propositionEn:
      'The Humanist Revolution shifted supreme authority from sacred scriptures to human inner experience: the voter knows best, the customer is always right, beauty lies in the eye of the beholder—even judging Beethoven against Chuck Berry. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把分散在政治、商业、教育、美学与伦理里的五句现代流行口号，一网打尽地还原为同一套现代宗教教义——唯有看清整座现代文明都建立在“人类内心体验至上”之上，才会明白下一章实验室的冲击有多致命。',
  },
  {
    id: 11,
    indexLabel: '11',
    groupId: 'hd-decoupling',
    chapterRef: '第8章',
    propositionZh:
      '所谓“自由意志”经不起演化论与脑科学的检验：你的欲望要么源于基因与环境的决定性链条，要么源于神经元的随机波动，无论决定论还是随机性，都绝不等于“自由”。',
    propositionEn:
      'Free will collapses under evolutionary biology and neuroscience: your desires arise either from deterministic genetic and environmental chains or from random neural fluctuations—and neither determinism nor randomness equals freedom. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '赫拉利在这里对自由意志祭出了最严密的逻辑夹击：很多人误以为量子或神经的“随机性”能挽救自由意志，可凭骰子随机跳出来的念头，同样不是由一个独立自主的“你”所选择的。',
  },
  {
    id: 12,
    indexLabel: '12',
    groupId: 'hd-decoupling',
    chapterRef: '第8章',
    propositionZh:
      '每个人身体里至少住着“体验自我”和“叙事自我”两个房客：承受每一秒真实苦痛的是体验自我，但握有记忆、评价与投票决策大权的，却是只记峰值与结尾的叙事自我。',
    propositionEn:
      'Inside each of us live at least two selves—the experiencing self and the narrating self: the experiencing self feels every moment of pain, yet the narrating self remembers only peaks and endings and makes all our major decisions. （回译）',
    conceptNote: '卡尼曼14℃冷水实验：体验自我 vs 叙事自我',
    quoteOrigin: 'back-translation',
    analysis:
      '卡尼曼的冷水实验是全书最具说服力的认知切片。它揭示了人类连自己刚才有多痛都会被左脑编的故事骗过去——这为算法绕开我们爱撒谎的叙事自我、直接监测心率脑波来接管决策敞开了大门。',
  },
  {
    id: 13,
    indexLabel: '13',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '21世纪最深远的技术革命不是机器有了意识，而是“智能与意识的彻底大分离”——算法不需要感到爱与恐惧，却能在医疗、驾驶、交易甚至模仿巴赫作曲上全面超越人类。',
    propositionEn:
      'The defining rupture of the 21st century is not machines gaining consciousness, but the Great Decoupling of intelligence from consciousness—algorithms need no feelings to outperform humans in medicine, driving, trading, or composing like Bach. （回译）',
    conceptNote: '核心概念：大分离（The Great Decoupling）',
    quoteOrigin: 'back-translation',
    analysis:
      '一举击破“AI没有情感和自我意识，所以永远替代不了人类”的自我安慰。从EMI一天谱出5000首巴赫风格赞美诗可以看出，现代社会付钱雇佣人类干的绝大多数活儿，要的是高智能产出，而不是主观体验。',
  },
  {
    id: 14,
    indexLabel: '14',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '20世纪大众靠“工业大军与流水线缺你不可”换来了民主与福利；21世纪普通人面临的最大危机不再是被剥削，而是失去经济与军事价值，沦为彻底无关紧要的“无用阶级”。',
    propositionEn:
      'In the 20th century, mass armies and factories gave ordinary people the leverage to win democracy and welfare; in the 21st, the gravest threat is no longer exploitation, but irrelevance—becoming a vast "useless class." （回译）',
    conceptNote: '核心概念：无用阶级（the useless class）',
    quoteOrigin: 'back-translation',
    analysis:
      '把技术失业问题从经济学拉升到政治权力史的高度：历史上精英之所以愿意与平民分享权利和医保，绝非单凭良心发现，而是因为机器与战场需要健康的平民；筹码一旦消失，社会契约必然重洗。',
  },
  {
    id: 15,
    indexLabel: '15',
    groupId: 'hd-decoupling',
    chapterRef: '第9章',
    propositionZh:
      '外部算法正在悄无声息地完成“从先知到君主”的加冕：起初我们只是在基因检测87%患癌概率这类节点请它给建议，等到它次次比我们更准，我们就会心甘情愿把人生方向盘彻底交出去。',
    propositionEn:
      'External algorithms are quietly moving from oracle to sovereign: at first we consult them like an advisor on an 87% genetic risk, until their superior track record persuades us to hand over the steering wheel of life. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '借安吉丽娜·朱莉基于基因风险做医疗决策的真实现场，精准描绘了权威转移的温柔斜坡——没有暴力政变，没有坦克上街，人类是出于便利、安全与恐惧，一步步主动交出了自主权。',
  },
  {
    id: 16,
    indexLabel: '16',
    groupId: 'hd-dataism',
    chapterRef: '第10章',
    propositionZh:
      '试图把智人改造成“智神”的科技人文主义藏着致命悖论：一旦技术能够按需设计和重写人类欲望，把“人类欲望”奉为最高权威的信念就会立刻自我瓦解。',
    propositionEn:
      'Techno-humanism faces a fatal paradox: the moment biotechnology can engineer and rewrite human desires on demand, human desire ceases to be a sacred authority and becomes just another programmable product. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '拆解了“科技增强人类”的乐观幻梦。如果士兵的恐惧可以被头盔关掉、消费者的冲动可以被芯片调高，那么升级出来的究竟是更自由的“智神”，还是更听话的超级工具？',
  },
  {
    id: 17,
    indexLabel: '17',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '数据主义将“信息自由流通”捧为宇宙至高戒律，把人类社会、股市与有机体统统视为数据处理系统——“记录、上传、分享”正在成为新一代信徒每天践行的宗教礼拜。',
    propositionEn:
      'Dataism elevates the freedom of information flow into the supreme cosmic law, viewing societies, markets, and organisms alike as data-processing systems—and turning "record, upload, share" into a daily religious ritual. （回译）',
    conceptNote: '核心概念：数据主义（Dataism）',
    quoteOrigin: 'back-translation',
    analysis:
      '用极为犀利的文化观察点醒现代社交媒体用户：当我们觉得一顿饭不拍照发网就像白吃了一样时，实际上已经把“人生体验的价值”从自身内心挪到了“能否汇入全球数据流”之上。',
  },
  {
    id: 18,
    indexLabel: '18',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '一旦万物互联网成型并取代人脑成为最高效的数据处理器，人类就可能从系统设计者降级为芯片、再降级为数据，最终如同滚滚洪流里的一块泥土般溶解分散。',
    propositionEn:
      'Once the Internet-of-All-Things surpasses human brains as the supreme data processor, humans risk being demoted from designers to chips, then to data, eventually dissolving like a clod of earth in a rushing torrent. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '与第2章人类淘汰猛犸象和白鳍豚遥相呼应：人类自己立下了“只看网络功能价值”的冰冷标准，如今这把尺子正掉转枪口量到人类自己头上。',
  },
  {
    id: 19,
    indexLabel: '19',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '过去想阻挡思想言论靠的是封锁信息流通，而在21世纪靠的是用海量不相关信息把人淹没——在古代力量来自有权获得资料，而到今天，力量来自知道该忽略什么。',
    propositionEn:
      'In the past, censorship worked by blocking the flow of information; in the 21st century, it works by flooding people with irrelevant data—once power meant having access to data, today power means knowing what to ignore. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '堪称当代信息社会最精准的诊断之一。它与尼尔·波兹曼《娱乐至死》里“赫胥黎式信息淹没”跨时空共振，直指当代公众注意力失焦的症结。',
  },
  {
    id: 20,
    indexLabel: '20',
    groupId: 'hd-dataism',
    chapterRef: '第11章',
    propositionZh:
      '科技从不注定只有一种结局，全书一切情境皆是可能性而非预言；真正决定人类走向的，是我们能否直面三个问题：生物只是算法吗？智能与意识谁更重要？当算法比我们更懂自己，社会该往何处去？',
    propositionEn:
      'Technology is never deterministic, and every scenario is a possibility rather than a prophecy; our future hinges on three questions: are organisms just algorithms, is intelligence or consciousness more valuable, and what happens when algorithms know us better than we know ourselves? （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书收束的定海神针。赫拉利用火车、电力与朝鲜半岛南北分化的历史事实拒绝了廉价的技术宿命论，把方向盘重新递回具备反思能力的人类读者手中。',
  },
];

export const HOMO_DEUS_DATASET: BookReadingDataset = {
  ultimateThesis: HOMO_DEUS_ULTIMATE_THESIS,
  overviewIntroQa: HOMO_DEUS_OVERVIEW_INTRO_QA,
  chapters: HOMO_DEUS_CHAPTER_PROPOSITIONS,
  argumentMapSteps: HOMO_DEUS_ARGUMENT_MAP_STEPS,
  boundaryComparison: HOMO_DEUS_BOUNDARY_COMPARISON,
  keyGroups: HOMO_DEUS_KEY_GROUPS,
  keyInsights: HOMO_DEUS_KEY_INSIGHTS,
};
