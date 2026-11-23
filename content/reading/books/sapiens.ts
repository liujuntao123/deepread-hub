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
    '如果只留下一句话把《人类简史》四大部分二十章与后记拧成一条主线，尤瓦尔·赫拉利究竟颠覆了哪一个关于人类崛起的根本常识？',
  thesis:
    '智人之所以从食物链中游的平庸动物跃升为统治地球的物种，靠的既不是更强壮的体魄，也不是个体大脑的绝对聪明，而是凭借“认知革命”获得了编造并共同相信“虚构故事”的能力——国家、金钱、帝国、宗教与信贷皆是彼此信任的想象秩序，它们把人类推上了掌控物理与生命法则的神坛，却从未自动换来个体幸福，反而把我们带到了“拥有神力却连自己希望想要什么都不知道”的物种终点。',
  answerParagraphs: [
    '这句话之所以能把跨度长达七万年的全书穿成一根针，是因为赫拉利拒绝了教科书里常见的“人类天生高贵、历史必然进步”的线性赞歌，而是始终用生物学与制度史的双重显微镜，死死咬住“大规模灵活合作如何可能”这一核心问题。第一部分用认知革命解释了智人如何靠共同虚构跨越150人熟人上限；第二部分立刻泼下冷水，揭示农业革命并没有让个体更轻松，反而用小麦、文字与想象秩序把亿万人锁进等级与劳役的金字塔。',
    '第三与第四部分再将镜头推向全球整合与现代加速：金钱、帝国与普世宗教把万千破碎世界熔铸成一个地球村，而“承认自己无知”的科学革命与帝国扩张、资本主义信贷结盟，终于撬动了能源、工业与基因改造的杠杆。然而到了书尾，赫拉利把最锋利的手术刀对准了现代人自己——如果一切历史奇迹都建立在“集体想象”之上，且力量暴涨未必带来哪怕一分额外快乐，那么即将打破40亿年自然选择法则的智人，究竟是在走向解放，还是在盲目亲手终结自己？',
  ],
};

const overviewIntroQa: OverviewIntroBlock = {
  question:
    '全书横跨认知革命、农业革命、人类融合统一与科学革命四大板块共二十章与一篇后记，赫拉利是怎样步步反转“进化进步论”的，又有哪些判断需要我们在阅读时拉开批判距离？',
  answerLead:
    '全书像一场层层剥壳的物种解剖：先拆穿“智人自古唯一且高贵”的错觉，再戳破“农业带来富足、历史自有正义”的田园神话，随后展示金钱、帝国、宗教与科学资本如何把人类推上权力巅峰，最后以快乐史与生物工程把人拉回“力量与欲望失配”的哲学悬崖。以下依原书全部二十章与后记逐章提炼，并将原文边界之外的引申、推断与保留标注明确区隔。',
};

const chapters: ChapterProposition[] = [
  {
    id: 'sp-01',
    indexLabel: '01',
    chapterTitle: '第一章 人类：一种也没什么特别的动物',
    part: 'part1',
    partLabel: '第一部分 认知革命',
    shortLabel: '没什么特别的动物',
    coreProposition:
      '在距今约10万年前的漫长岁月里，人类既不是地球上唯一的人种，也不是食物链顶端的王者，只是一种处于中游、仓促登顶的普通动物。',
    narrative:
      '人们习惯把人类历史想象成一条单线高歌猛进的独角戏，可赫拉利一开场就打破了“人类自古唯一”的自恋：直到约12000年前，地球上还曾陆续或同时生活着尼安德特人、直立人、梭罗人、丹尼索瓦人、弗洛里斯人等多种人属物种。更尴尬的是，200万年来人类大脑虽然占去静息能量的25%并迫使胎儿早产，却长期只能捡食狮子鬣狗吃剩的骨髓；直到约40万年前才开始固定猎捕大型动物，约10万年前才骤然跃居食物链顶端。正是这种缺少百万年生态制衡的“仓促登顶”，给人类留下了伴随至今的恐惧、焦虑与残酷。',
  },
  {
    id: 'sp-02',
    indexLabel: '02',
    chapterTitle: '第二章 知善恶树',
    part: 'part1',
    partLabel: '第一部分 认知革命',
    shortLabel: '知善恶树与虚构',
    coreProposition:
      '约7万年前的“认知革命”赋予智人谈论“根本不存在的事物”的能力，这使智人得以突破150人的八卦极限，实现陌生人之间的大规模灵活合作。',
    narrative:
      '约10万年前，智人第一次尝试走出东非进入地中海东部，结果竟被体格更壮的尼安德特人逼退；可约7万年前再次出击时，智人却迅速席卷欧亚并让所有其他人种消失。转折点不在工具，而在语言的质变：八卦能把自然团体维持在约150人以内，而只有讲出大家共同相信的“虚构故事”，才能让成千上万互不相识的陌生人齐心协力。赫拉利用法国标致汽车（Peugeot）作比：厂房、汽车、员工全都换光，“有限公司”这个法律拟制依然存在——神明、国家、人权与金钱本质上皆是如此，这也让智人得以绕开堵车的“基因演化”，走上靠改写故事实现社会行为闪电迭代的“文化演化”快车道。',
  },
  {
    id: 'sp-03',
    indexLabel: '03',
    chapterTitle: '第三章 亚当和夏娃的一天',
    part: 'part1',
    partLabel: '第一部分 认知革命',
    shortLabel: '采集者的真实一天',
    coreProposition:
      '农业出现前的采集者并非忍饥挨饿的野蛮苦力，他们在营养多样性、工时自由度与个体综合生存技能上，往往远胜后来的农民与工厂工人。',
    narrative:
      '现代人容易用“茹毛饮血、朝不保夕”来俯视史前祖先，赫拉利却结合演化心理学与考古证据给出截然不同的图景：虽然现代人热衷暴食高糖高脂的“贪吃基因”源于当年稀缺果实的记忆，但采集社会实际上被许多专家定义为“最初的富裕社会”。他们平均每周只需工作35至45小时（每天采集3至6小时），食物来源囊括数十种动植物，极少因单一作物歉收而饿死，也因低密度流动而几乎免受大规模传染病侵袭；并且每个采集者的大脑都必须同时精通植物学、动物追踪、制器与医疗，论个人层面的知识面甚至高于现代流水线上被高度专业化的个体。当然，作者也刻意避免美化“高贵的野蛮人”——以存活到20世纪60年代的巴拉圭亚契人为例，采集部落同样存在抛弃病弱、杀婴与部族暴力。',
  },
  {
    id: 'sp-04',
    indexLabel: '04',
    chapterTitle: '第四章 毁天灭地的人类洪水',
    part: 'part1',
    partLabel: '第一部分 认知革命',
    shortLabel: '生态连环杀手',
    coreProposition:
      '远在工业污染与现代文明出现之前，手持火把与石矛的采集智人就已经是地球生物史上最致命的物种灭绝推手。',
    narrative:
      '环保叙事常把人类破坏自然的起点画在工业革命，赫拉利却翻出两份触目惊心的史前案卷：约45000年前智人乘船踏上澳大利亚，不过几千年间，当地24种体重在50公斤以上的大型动物竟灭绝了23种，重达两吨半的双门齿兽与200公斤重的巨型袋鼠悉数消失；约16000年前智人步行跨过西伯利亚与阿拉斯加的陆桥进入美洲，一路推进到火地岛，不到两千年就让北美47属大型哺乳动物消失34属、南美60属消失50属。气候变迁只是帮凶，真正致命的是大型动物在演化中来不及学会害怕这批看似弱小却会放火开荒、集体围猎的新来者——远在发明轮子、文字和铁器之前，智人就已亲手让全球约一半的大型陆生哺乳动物魂归西天。',
  },
  {
    id: 'sp-05',
    indexLabel: '05',
    chapterTitle: '第五章 史上最大骗局',
    part: 'part2',
    partLabel: '第二部分 农业革命',
    shortLabel: '史上最大骗局',
    coreProposition:
      '农业革命是一场以基因复制成功为代价、却换来个体生活质量骤降的演化陷阱——不是智人驯化了小麦，而是小麦驯化了智人。',
    narrative:
      '教科书向来把约1万年前人类定居耕作赞美为“文明曙光”，赫拉利却毫不留情地称之为“史上最大的一桩骗局”。从单个人类的脊椎、膝盖、菜单和工时来看，小麦既不好消化又娇贵脆弱，逼着人类整日弯腰清石、除草挑水、吃单一谷物、忍受高发传染病与连年饥荒；唯一赢家是小麦基因与智人DNA拷贝总数的暴增。更颠覆的是，公元前9500年的土耳其哥贝克力石阵（每根石柱重达7吨、高5米，附近采石场甚至留有50吨未完工巨柱）表明，人类起初或许是先建立信仰中心，为了养活建庙者才一步步陷入耕作。原本的奢侈品很快变成必需品并带来新的义务：等到人口因余粮暴涨，人类再也回不去采集时代，演化成功与个体幸福在这里彻底分道扬镳。',
    extensionOrInference: {
      kind: '保留标注',
      text: '将农业革命定性为“史上最大骗局”具有极强的修辞震撼力，但作者刻意压低了农耕社会在延长平均代际知识累积、抵御极端寒潮及提供高密度分工上限上的长程红利；读者应把它当作拆解“进化=幸福”迷思的棱镜，而非全盘否定农耕文明的字面结论。',
    },
  },
  {
    id: 'sp-06',
    indexLabel: '06',
    chapterTitle: '第六章 盖起金字塔',
    part: 'part2',
    partLabel: '第二部分 农业革命',
    shortLabel: '想象建构的秩序',
    coreProposition:
      '从古巴比伦的《汉谟拉比法典》到现代美国的《独立宣言》，人类所有超大规模社会秩序都并非刻在自然法则里，而是靠集体相信维系的“想象建构的秩序”。',
    narrative:
      '农业定居让人类第一次陷入对“未来”的焦虑，而随着村落扩张为百万人口的帝国，血缘与亲情再也撑不住如此庞大的协作网络。赫拉利把约公元前1776年的《汉谟拉比法典》与公元1776年的美国《独立宣言》并置解剖：前者宣称神明将人分为上等人、平民和奴隶，后者宣称造物主赋予人人生而平等的不可剥夺权利——但在纯生物学意义上，既没有“上等人”，也没有“平等”与“权利”，两者同样只是让百万人彼此合作的虚构剧本。想象秩序之所以牢不可破，靠的是三大机制：它深深嵌入物质世界（如现代房屋的个人儿童房与中世纪城堡大厅），塑造了人们最私密的欲望（如浪漫消费主义驱动的出国度假），并且它不是个人主观幻想，而是存在于千千万万人之间的“主体间”网络——单个个体醒来无济于事，要改变旧秩序，就必须先用想象建构出另一套新秩序。',
  },
  {
    id: 'sp-07',
    indexLabel: '07',
    chapterTitle: '第七章 记忆过载',
    part: 'part2',
    partLabel: '第二部分 农业革命',
    shortLabel: '文字与官僚体系',
    coreProposition:
      '文字最初并非为了记录诗歌与哲学，而是因为帝国税收与账目超出了人脑内存，才被迫发明出的体外数据处理系统。',
    narrative:
      '人们总浪漫地以为人类留给后世的第一句书面语一定是深邃的哲思或动人的史诗，可考古发现的最早苏美尔泥板写着的却是枯燥至极的财经签核：“29086单位大麦37个月库辛”。当王国大到要向数十万人收税、算粮、派工时，只擅长记动植物和人际关系的人脑必然过载。从苏美尔的“部分表意文字”与安第斯文化在印加帝国达到鼎盛的“结绳语”（quipu），到后来发展出完整表意文字与0到9的阿拉伯数字，人类不仅把信息卸载到了泥板、绳结与纸张上，更在归档、编目与检索中重塑了自身的思维方式——文字本来应该是人类意识的仆人，却在官僚制度与数字语言里一步步反仆为主。',
  },
  {
    id: 'sp-08',
    indexLabel: '08',
    chapterTitle: '第八章 历史从无正义',
    part: 'part2',
    partLabel: '第二部分 农业革命',
    shortLabel: '阶层与性别迷思',
    coreProposition:
      '种姓、种族与性别等级几乎都源于历史偶然事件，却借“洁净与污染”“违背自然”的虚构叙事自我强化成难以挣脱的恶性循环。',
    narrative:
      '既然人类所有大型社会都靠想象秩序维系，为何这些秩序无一例外地划分出高低贵贱？赫拉利指出，复杂社会需要快速识别陌生人的分工与位置，但等级的具体切法却充满偶然：印度种姓、美洲白人对黑人的歧视，起初源于征服或奴隶贸易的地理经济巧合，随后却用“污染恐惧”和法律禁令固化成“偏见—贫困—失学—加深偏见”的自我实现恶性循环。面对“天生自然”的借口，他给出一条黄金法则：“天生带来允许，文化造成封闭”——真正违反自然规律的事根本不会发生，也无须禁止。至于几乎遍布农业以来所有文明的父权制，作者逐一检验了“肌肉理论”“流氓理论”和“父权基因理论”，却诚实承认每一种生物学解释都有破绽——为何全球文化不约而同地贬低女性、推崇男性，依然是历史与人类学最难解的谜题之一。',
  },
  {
    id: 'sp-09',
    indexLabel: '09',
    chapterTitle: '第九章 历史的方向',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '历史统一的方向',
    coreProposition:
      '尽管文化内部永远充满“认知失调”般的自相矛盾，从几千年的太空间谍卫星高度俯瞰，人类历史却呈现出从数千个孤立小世界合流为单一全球村的清晰方向。',
    narrative:
      '中世纪欧洲贵族清晨在教堂聆听基督教的谦卑忍让，午后在城堡宴会狂热追逐骑士的血腥复仇；现代人自法国大革命以来一边高呼“自由”，一边追求“平等”——赫拉利强调，这种内在矛盾与认知失调绝非文化的缺陷，反而是逼迫我们思考、批评与重新评价的文化引擎。若把观察高度拉升到几千年的尺度，历史合久必分只是一时、分久必合才是大势：公元前10000年地球上存在数千个彼此不知对方存在的孤立人类文明，公元前2000年缩减为数百个（最多两三千个），到公元1450年已有近九成人类活在紧密相连的“亚非世界”里，今天全人类更已生活在单一的全球地缘政治、经济、法律与科学体系之内。推动这场大一统的三种全球秩序，正是金钱、帝国与全球性宗教。',
  },
  {
    id: 'sp-10',
    indexLabel: '10',
    chapterTitle: '第十章 金钱的味道',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '金钱是互信系统',
    coreProposition:
      '金钱不是具有内在价值的金属或纸片，而是人类历史上最具包容性、也是唯一能让仇敌与陌生人彼此合作的终极互信系统。',
    narrative:
      '西班牙征服者科尔特斯率军入侵阿兹特克时，用黄金狂热震惊了当地人，可黄金既不能吃也不能造工具——为什么语言不通、信仰水火不容的文明都认同一块亮闪闪的金属？因为金钱不是物质上的现实，而是心理上的想象：宗教信仰的重点是“自己相信”，而金钱信仰的重点是“别人相信”。只要我相信别人会接受它，大麦、银舍客勒、贝壳、集中营香烟乃至今天占全球60兆美元货币总量九成以上的电子数据都能充当万物换算器。金钱凭“万物可换”与“万众相信”两大原则跨越了几乎所有文化鸿沟，但代价同样冷酷——人们信任的不再是邻居或神圣价值，而只是他们手上的钱，金钱像水流不断渗入大坝裂缝，持续侵蚀荣誉、忠诚与亲情等“无价之宝”。',
  },
  {
    id: 'sp-11',
    indexLabel: '11',
    chapterTitle: '第十一章 帝国的愿景',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '帝国的双重面孔',
    coreProposition:
      '帝国固然以血腥征服起家，却也是过去2500年最常见的政治形态，并靠普世愿景把无数分散族群熔铸成我们今天视若珍宝的诸多“本土文化”。',
    narrative:
      '现代政治词典几乎把“帝国主义者”当成仅次于“法西斯”的骂名，但赫拉利提醒读者别用简单的好人坏人滤镜擦掉历史事实：从波斯居鲁士大帝宣称“我们之所以征服你们，是为了你们好”，到秦始皇的天命观、古罗马、阿拉伯帝国与大英帝国，帝国之所以长久稳固，靠的不只是刀剑，更是包容性的普世教化愿景，以及对法律、语言、度量衡的标准化整合。更令人坐立难安的真相是，现存几乎所有人类文化都带着历代帝国的混血遗绪——现代印度用来反抗殖民的民族意识、英语、铁路网、议会民主乃至板球和茶，都深深烙着大英帝国（以及更早的莫卧儿、笈多等帝国）的印记，想要一刀切净所有帝国遗产，结果只会让文化本身魂归九霄。',
  },
  {
    id: 'sp-12',
    indexLabel: '12',
    chapterTitle: '第十二章 宗教的法则',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '宗教与人文信仰',
    coreProposition:
      '宗教的本质是“建立在超人类秩序之上的人类规范及价值观系统”；按此标准，现代的自由主义、社会主义与演化人文主义同样是崇拜智人的世俗宗教。',
    narrative:
      '为了让脆弱的想象秩序免遭质疑，宗教赋予它“超人类秩序”的神圣合法性。赫拉利梳理了宗教如何从地方性的泛神论、宽容的多神论，演变为狂热排他的一神论、直面“恶的难题”的二元论（善恶对立），以及不拜神祇却崇拜自然法则的佛教（以“离苦”而非“拜神”为最高原则）。最颠覆的一步落在现代：许多人以为现代社会早已告别宗教，可作者把人文主义直接归入崇拜“人性（智人）”的新型宗教——自由人文主义崇拜个人内心声音、社会人文主义崇拜人类整体平等、演化人文主义（以纳粹为极端代表）崇拜物种进化。然而随着生命科学剥离“自由意志”与“不朽灵魂”，自由人文主义与现代生物学之间的鸿沟正变得越来越难以掩盖。',
    extensionOrInference: {
      kind: '引申',
      text: '这一宽泛定义让赫拉利得以打通古代神学与现代意识形态的底层同构，也直接埋下了《未来简史》里“数据主义取代人文主义成为新宗教”的伏笔。',
    },
  },
  {
    id: 'sp-13',
    indexLabel: '13',
    chapterTitle: '第十三章 成功的秘密',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '后见之明与混沌',
    coreProposition:
      '历史属于无法精准预测的“二级混沌系统”，事后看来无可避免的一切，在当时往往只是无数十字路口中一次出人意表的偶然。',
    narrative:
      '读完人类走向统一的大叙事，读者很容易滑向“宿命论”，以为基督教取代多神教成为古罗马国教、阿拉伯帝国崛起或全球统一都是写死在剧本里的必然结果。赫拉利立刻在第十三章按下暂停键：历史之所以无法像天气预报（一级混沌）那样被准确预测，是因为市场与政治属于会随预测本身而改变的“二级混沌系统”——如果真能准确预测明天爆发革命，统治者就会立刻行动让革命流产。而且历史的选择从不以“提升人类福祉”为目标，更像迷因学或博弈论里的病毒传播。我们研究历史不是为了预测未来，而是为了拓展视野，看清今日看似“自然且必然”的一切原本大有可能是别的模样。',
  },
  {
    id: 'sp-14',
    indexLabel: '14',
    chapterTitle: '第十四章 发现自己的无知',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '发现自己的无知',
    coreProposition:
      '科学革命之所以引爆过去500年的力量井喷，不是因为欧洲人发现了终极真理，而是因为人类史上头一次坦然承认“我们对最重要的问题其实毫无所知”。',
    narrative:
      '公元1500年，全球只有约5亿人口、总产值约2500亿美元、日耗能量13万亿卡路里，人类甚至还没绕过地球一圈；五百年后，人口增加14倍、生产增加240倍、能耗增加115倍，连月球都留下了脚印。这场大跃迁的开关，赫拉利定格在“承认无知”（拉丁词根 ignoramus，“我们不知道”）：前现代经典宣称宇宙所有重要答案早已被神明或智者写完，只需钻研古籍；现代科学却公开承认整套体系对最重要的问题仍一无所知，必须靠实证观察与数学工具（包括牛顿力学与精算统计学）搜集新知，并借培根“知识就是力量”把新知化为科技。更关键的是，科学研究耗资巨大，从诞生之初就依赖帝国与资本的资助，也催生了把死亡视为“技术问题”的“吉尔伽美什计划”。',
  },
  {
    id: 'sp-15',
    indexLabel: '15',
    chapterTitle: '第十五章 科学与帝国的联姻',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '科学与帝国联姻',
    coreProposition:
      '近代欧洲之所以甩开当时更富裕的中国、印度与奥斯曼帝国，关键不在船坚炮利的起点，而在于敢在世界地图上留出大片空白并派科学家随军远征的探索征服心态。',
    narrative:
      '1405至1433年郑和下西洋的船队规模远超1492年哥伦布的小舰队，却并未试图殖民他国，反倒是偏居欧亚西陲的欧洲国家掀起了征服全球的浪潮。赫拉利指出，分水岭就在“世界地图上的空白”：1459年之前的旧地图把未知区域画满想象的怪物与细节，仿佛早已无所不知；而1525年萨尔瓦提地图等新版欧洲地图故意大片留白，像磁铁一样召唤探险家与学者出海填图。1768年库克船长远征南太平洋，由皇家学会出资、皇家海军派船，既观测金星凌日、采集标本并借酸菜和蔬果攻克坏血病，也顺手替英国圈占澳大利亚、酿成塔斯马尼亚原住民灭族惨剧；罗林森冒死抄录破译贝希斯敦铭文、威廉·琼斯开创印欧语系比较语言学，同样与殖民治理紧密交织——科学与帝国根本就是一家。',
  },
  {
    id: 'sp-16',
    indexLabel: '16',
    chapterTitle: '第十六章 资本主义教条',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '信贷与增长大饼',
    coreProposition:
      '现代经济得以持续指数增长的真正引擎，是对“未来大饼会越做越大”的集体信任，以及由此凭空撬动现实资源的“信贷”与利润再投资机制。',
    narrative:
      '前现代社会普遍把经济视为零和博弈，因不信明天能产出更多财富而惜贷重利，陷入“缺乏信任—信贷短缺—增长停滞”的死循环。科学进步观与亚当·斯密《国富论》改写了剧本：只要相信新知与远航能把经济大饼做大，并将“生产的利润再投资于提高产量”，银行与股份公司就能用今天的信贷预支未来尚未出现的财富——印钞票的是银行和政府，但最后埋单的是不断拿出新发明的科学家。荷兰东印度公司与英国东印度公司借股份制与金融信誉打败了靠强征暴敛的旧帝国。但赫拉利绝不美化“自由市场”：1717年成立、1719年底崩盘的约翰·劳“密西西比泡沫”证明市场离不开政治与法律信任；而由上市贩奴公司驱动的大西洋奴隶贸易（约1000万非洲奴隶被运往美洲、七成在甘蔗园劳作）与1885—1908年比利时刚果自由邦惨剧则冷酷警示，当增长沦为不受道德制衡的至高目标，冷漠与贪婪同样会杀害数百万人。',
  },
  {
    id: 'sp-17',
    indexLabel: '17',
    chapterTitle: '第十七章 工业的巨轮',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '工业化与消费伦理',
    coreProposition:
      '工业革命本质上是一场“能源转换革命”，它一边把农业与数十亿农场动物推上冷酷的工业输送带，一边迫使全人类把传统节俭翻转为“消费主义伦理”。',
    narrative:
      '过去人类几乎只能依赖肌肉、畜力与风水流转，而蒸汽机与内燃机打开了把热能转化为动能的魔法大门，让人类第一次坐拥近乎无穷的能源海洋与原材料新世界。工业巨轮首先彻底机械化了农业：如今美国仅靠2%的农业人口就能养活全国并大量出口，却也让全球随时有数十亿只家禽家畜活在工厂生产线上——工业畜牧业只满足它们的客观生存条件，却无视哺乳动物在野外演化出的情感与社交主观需求，酿成地球史上规模最庞大的动物苦难。紧接着，人类史上头一次出现“生产超出需求”的难题，催生出与过去所有禁欲宗教截然相反的新伦理：消费主义。资本主义与消费主义成了同一枚硬币的正反两面——有钱人的最高指导原则是“投资”，其他人的最高指导原则是“购买”，甚至连肥胖症都成了既拉动食品销量又拉动减肥产业的消费主义双重胜利。',
  },
  {
    id: 'sp-18',
    indexLabel: '18',
    chapterTitle: '第十八章 一场永远的革命',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '社群瓦解与核和平',
    coreProposition:
      '短短两百年间，工业时刻表、国家与市场联手瓦解了维系人类百万年的传统家庭与密切社群，同时在核威慑与知识经济夹击下意外带来了史上最和平的年代。',
    narrative:
      '工业革命带来的生活剧变远超机器本身：1847年英国铁路公司统一以格林尼治时间为准，1880年英国立法确立全国统一时刻表，人类从此脱离日升日落，被塞进精确到分钟的工业钟表。更剧烈的革命在于，国家和市场联手对个体开出无法拒绝的交易——“做自己吧，不必再听父母长辈与乡邻摆布，我们提供教育、警力、养老与保险”——短短两百年就把百万年来最稳固的家庭与密切社群粉碎成互相疏远的原子个人，再由“民族”和“消费大众”两大想象社群填补情感空缺。与此同时，赫拉利提出一个极具反差感的判断：二战后几十年其实是人类史上最和平的年代（例如2002年全球5700万死亡人口中，死于战争与暴力犯罪共约74.1万人，甚至低于87.3万自杀人数）——核武器让大国大战变成集体自杀，而现代财富转向人力资本与科技知识，也让传统侵略战争变得无利可图。',
    extensionOrInference: {
      kind: '保留标注',
      text: '成书于2012—2014年的“战争已退场、帝国和平退位”论断，在随后十余年的地缘冲突回潮中明显显得过于乐观；事实上赫拉利本人在2018年的《今日简史》第11章也已专门补课，以“永远不要低估人类的愚蠢”修正了这一纯理性算账的盲区。',
    },
  },
  {
    id: 'sp-19',
    indexLabel: '19',
    chapterTitle: '第十九章 从此过着幸福快乐的日子',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '快乐的历史追问',
    coreProposition:
      '历史学家极少追问人类五百年来是否真的更快乐，而心理学、生物学与佛教共同提示：外在财富与力量几乎无法永久抬高大脑设定的快乐基线。',
    narrative:
      '如果人类积累的庞大知识、财富与核能没有让我们比中世纪农民或史前采集者更幸福，那这一切到底图什么？赫拉利从三个维度拆解“快乐”：在社会心理层面，快乐并不取决于客观条件本身，而取决于客观条件与主观期望之间是否相符——中世纪农民从不期望天天洗澡更衣，现代人却被大众媒体和广告业不断拔高比较标尺；在生物化学层面，演化为了逼我们继续生存繁衍，把血清素、多巴胺与催产素设成了类似恒温空调的回落机制，无论古代农夫盖完土屋还是现代香港企业家还完豪宅房贷，大脑在意的只是血清素浓度；在意义与觉察层面，尼采与丹尼尔·卡尼曼指出“生命意义”支撑整体幸福，但意义本身往往只是个人与集体同步的错觉，而佛教走得最彻底——苦的真正根源不在于感受本身，而在于对转瞬即逝的主观感受的不断追求。',
  },
  {
    id: 'sp-20',
    indexLabel: '20',
    chapterTitle: '第二十章 智人末日',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '智人末日与智能设计',
    coreProposition:
      '在遵循“自然选择”长达40亿年之后，生物工程、仿生工程与无机生命这三条通道正准备用“智慧设计”亲手终结智人这个物种本身。',
    narrative:
      '2000年，巴西生物艺术家爱德华多·卡茨请法国实验室把绿色荧光水母的DNA植入兔子胚胎，造出了自然选择绝不可能孕育出的绿色荧光兔阿巴（Alba）。赫拉利把它视作一场生物学大革命的预兆：第一条路是生物工程，从改造农作物与动物、用3亿美元预算探讨复活尼安德特人，一步步滑向直接修改人类基因与欲望；第二条路是仿生工程，如2001年双臂截肢后装上意识操控生化手臂的美国水电工杰西·沙利文、杜克大学用脑电极远程操控生化肢体的恒河猴，以及未来的脑机双向接口，让有机体与无机物融合成全新物种“生化人”；第三条路是彻底摆脱碳基肉身的无机生命，如自主演化的基因程序与2005年成立、2013年获欧盟10亿欧元资助的“蓝脑计划”。因为“弗兰肯斯坦博士就坐在吉尔伽美什的肩膀上”，没人能挡住治病延寿的旗号，历史真正的终点很可能是智人被自己造出的后人类物种彻底取代。',
  },
  {
    id: 'sp-21',
    indexLabel: '21',
    chapterTitle: '后记 变成神的这种动物',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '后记：变成神的动物',
    coreProposition:
      '人类已经一步步掌握了接近神明的创造与毁灭之力，却仍旧不负责任、贪得无厌，甚至连“自己究竟希望想要什么”都答不上来。',
    narrative:
      '站在七万年演化的山巅回头一望，赫拉利用一页冷峻的后记替全书落槌：7万年前，智人还只是非洲角落里微不足道的动物；今天我们跃升为地球的主人、生态系统的梦魇，只需再跨一步就能进入神的境界，获得永恒青春与创造毁灭万物的神力。但力量越接近全能，一个被所有人刻意回避的终极漏洞就越显刺眼——既然我们很快连自己的欲望都能改造，真正该问的早已不是“我们究竟想要变成什么”，而是“我们究竟希望自己想要什么”。拥有神的能力，但是不负责任、贪得无厌，而且连想要什么都不知道，赫拉利冷冷作结：天下危险，恐怕莫此为甚。',
    extensionOrInference: {
      kind: '引申',
      text: '这句结尾并非悲观收场，而是直接把接力棒交给了续作《未来简史》：当人类真的开始把长生、快乐与成神写进21世纪的工程议程表，谁来决定人类该被改造成什么模样？',
    },
  },
];

const argumentMapSteps: ArgumentMapStep[] = [
  {
    id: 'sp-step-1',
    stepNumber: '起点',
    title: '败走中东与标致汽车：智人凭什么一夜反转食物链？',
    shortLabel: '认知革命与虚构',
    chaptersRange: '第一部分 第1—4章',
    question:
      '约10万年前智人第一次走出非洲进入地中海东部时曾被尼安德特人逼退，为什么约7万年前再次出击却横扫全球、让其他所有人种悉数消失？',
    leadJudgment:
      '决定胜负的不是智人突然长出了更锋利的石矛或更大的肌肉，而是约7万年前的“认知革命”赋予了智人一种独一无二的语言异能——传达关于“根本不存在的事物”的信息，并借此让成千上万陌生人彼此信任、灵活协作。',
    paragraphs: [
      '单打独斗时，一个智人根本打不过尼安德特人，甚至也未必比黑猩猩更厉害；可一旦把规模拉到几百人乃至一万人，黑猩猩群立刻沦为混乱厮杀，智人却能造出金字塔、跨国公司与登月火箭。赫拉利点破了其中的人数天堑：单靠面对面的亲密关系和八卦，人类自然团体的上限就卡在150人左右；唯有编出大家共同相信的虚构故事——就像法国标致汽车（Peugeot）那样，即便厂房炸毁、员工辞职、高管换光，“有限公司”这个既看不见也摸不着的法律拟制依然活在成千上万人的集体想象里——陌生人才能迅速组成精密大军。',
      '这场语言突变让智人获得了绕过基因演化的超级外挂：蜜蜂和黑猩猩必须等几十万年基因突变才能改变社会结构，而智人只要换一个神明、改一套故事，就能在一代人之内重构整个社会的合作方式。然而，智人从食物链中游骤然登顶缺乏数百万年的生态制衡，像极了“香蕉共和国的独裁者”：早在工业时代以前，手持石器与火把的采集智人就凭火耕与围猎踏平了澳大利亚（24种50公斤以上动物灭绝23种）与美洲的巨型动物群，证明人类远在发明轮子与铁器前便已是地球生态的连环杀手。',
    ],
    transitionNote:
      '既然采集者在健康、工时与菜单上并不比后人差，甚至堪称“最初的富裕社会”，智人为什么又在约1万年前主动放弃流浪、把自己拴在了一小块农田里？',
  },
  {
    id: 'sp-step-2',
    stepNumber: '第 1 步',
    title: '小麦的陷阱与泥板账本：农业革命如何把自由变成金字塔？',
    shortLabel: '农业陷阱与官僚',
    chaptersRange: '第二部分 第5—8章',
    question:
      '如果种地让人弯腰驼背、营养单一、传染病频发且工时更长，为什么全人类还是前赴后继地掉进了“农业革命”的坑里再也爬不出来？',
    leadJudgment:
      '因为演化只认DNA拷贝的数量，从来不管个体快不快乐——农业是“奢侈品变成必需品”的渐进陷阱，它养活了暴增的人口，却迫使亿万农民用劳役去供养由“想象秩序”、文字账本与阶层等级搭起的庞大金字塔。',
    paragraphs: [
      '最初智人只是顺手照料几株野生小麦，或者为了养活修建公元前9500年土耳其哥贝克力石阵巨石神庙的工匠而开始种植；可多出来的口粮立刻换来多生下的孩子，等到部落人口膨胀到再也靠采集养不活，回头路就彻底断了。这就是赫拉利著名的倒置：从物种繁衍角度看，不是我们驯化了小麦，而是小麦成功驯化了智人，逼着人类替它清石、除草、浇水、赶虫，把自己从无名野草推上了地球霸主之位。',
      '人口爆炸随之压垮了大脑与血缘的极限，两套支撑大型文明的新机器应运而生。一是深入人心的“想象建构的秩序”：无论是约公元前1776年把人分三等的《汉谟拉比法典》，还是公元1776年宣告人人生而平等的美国《独立宣言》，都靠嵌入物质空间、塑造个人欲望与主体间共识，让亿万人接受由历史偶然定下的种姓、种族或性别等级；二是体外内存——文字与数字。人类留下的最早泥板不是诗歌或哲思，而是“29086单位大麦37个月库辛”的枯燥财税签核，官僚机器借着文字、编目和数字语言一步步反仆为主。',
    ],
    transitionNote:
      '无数个各自为政的农耕王国、神庙和部落本来彼此隔绝、语言不通，它们又是靠哪几股力量在短短几千年里被一步步拧成今天同一个地球村的？',
  },
  {
    id: 'sp-step-3',
    stepNumber: '第 2 步',
    title: '金钱、帝国与宗教：三台大一统引擎如何熔铸全球村？',
    shortLabel: '金钱帝国与宗教',
    chaptersRange: '第三部分 第9—13章',
    question:
      '不同族群说着互听不懂的语言、拜着水火不容的神明，人类究竟凭借什么机制，从公元前10000年数千个孤立小世界合流成今天单一的全球秩序？',
    leadJudgment:
      '推动人类跨过文化与血缘高墙的三台超级引擎，分别是靠“别人相信”打通陌生人交易的金钱、靠武力与普世教化整合版图的帝国，以及借超人类秩序封死质疑的普世宗教（包括现代各种人文主义意识形态）。',
    paragraphs: [
      '金钱是人类史上心胸最开阔的互信系统：宗教信仰要求“自己相信”，金钱信仰只需“别人相信”，因此哪怕基督徒与穆斯林在战场上你死我活，在贸易场上照样乐意接受对方认可的金币。帝国则扮演了残酷却高效的熔炉：从波斯、秦汉、古罗马、阿拉伯到大英帝国，它们在流血征服之后推广统一法律、语言和基建，让数代人之后连被征服者也把帝国的遗产认作自己的“本土文化”。宗教则把脆弱的人间规矩包装成神圣不可动摇的超人类法则，赋予大型秩序以终极合法性。',
      '赫拉利在这里特别做了两手防呆：第一，他把现代人推崇的自由人文主义、社会人文主义与演化人文主义直接归入崇拜智人的新型宗教，指出它们同样是在崇拜某种超越个人意志的神圣秩序；第二，他在第十三章猛踩刹车，提醒读者别因为从太空间谍卫星高度看世界走向了统一，就以为每一步都是命中注定——历史是会对预测本身做出反应的“二级混沌系统”，基督教称霸或帝国兴衰在当时全都是出人意表的偶然。',
    ],
    transitionNote:
      '如果金钱、帝国与宗教在公元1500年前就已经运转了数千年，为什么人类的总产值、人口与科技力量直到最近五百年才突然像火箭一样垂直起飞？',
  },
  {
    id: 'sp-step-4',
    stepNumber: '第 3 步',
    title: '地图上的空白：承认无知如何与帝国、信贷联姻？',
    shortLabel: '科学与资本联姻',
    chaptersRange: '第四部分 第14—16章',
    question:
      '公元1500年前的中国、印度与奥斯曼帝国既富饶又强大，为什么引爆现代科学、全球殖民与指数级增长的引擎偏偏在不起眼的西欧点火？',
    leadJudgment:
      '因为现代科学、欧洲帝国与资本主义这三股原本陌生的力量结成了互相喂养的铁三角：科学公开“承认无知”换取新力量，帝国为了填补地图空白砸钱资助探险研究，而资本主义则靠相信“未来大饼会变大”的信贷系统源源不断预支资金。',
    paragraphs: [
      '前现代知识体系大多假定圣贤与经典早已写尽宇宙重要真理，学问只是反复注经；而15、16世纪后的欧洲人却在世界地图上诚实留出大片空白，公开承认“我们不知道”（ignoramus）。这份谦卑立刻转化成野心勃勃的探索征服欲：库克船长的军舰载着天文学家与植物学家，既为了科学观测和攻克坏血病，也顺手替大英帝国圈走澳大利亚；科研拿帝国的资助，帝国拿科学换来的枪炮、医药与地理图征服全球。',
      '而把这套机器推向永动机的第三条腿，是对未来的集体信任——信贷。只要相信科技发现与新航路会让明天的财富总盘子比今天更大，银行家与股份公司就敢把今天尚不存在的未来钱借给商人建厂造船，印钞票的是银行和政府，最后埋单的是不断突破极限的科学家。不过赫拉利丝毫没有给资本主义戴上道德光环：从1717—1719年约翰·劳酿成的密西西比泡沫，到由上市贩奴公司驱动的大西洋奴隶贸易与刚果自由邦惨剧，信贷引擎只管把利润和增长最大化，从来不自动附带公平与慈悲。',
    ],
    transitionNote:
      '当能源、信贷与工厂把生产效率推高上百倍后，普通人的日常生活、家庭归属与内心感受，究竟是被这场现代革命解放了，还是被悄悄接管了？',
  },
  {
    id: 'sp-step-5',
    stepNumber: '第 4 步',
    title: '工业时刻表与快乐恒温器：空前的力量换来了幸福吗？',
    shortLabel: '工业化与快乐账',
    chaptersRange: '第四部分 第17—19章',
    question:
      '现代人享有史无前例的能源、和平、寿命与琳琅满目的商品，为什么赫拉利却敢质疑：五百年来人类整体的幸福感未必真的胜过祖先？',
    leadJudgment:
      '工业革命虽然靠能源转换解放了生产力、靠国家与市场瓦解了传统大家庭并换来空前的核子和平，但大脑由演化定死的生化“快乐恒温器”与消费主义不断抬高的期待值，让外在物质的暴增几乎立刻被焦虑吞噬。',
    paragraphs: [
      '工业化改写的远不止几台机器：工厂化畜牧业把数十亿头有感知力的动物推上冰冷的生产线，无视它们的情感与社交需求，制造了地球史上规模最大的动物苦难；1847年英国铁路统一格林尼治时间、1880年全国立法统一时刻表，把人从日升日落拽进了精确到分钟的工业钟表；国家与市场联手接管了教育、警力与养老，短短两百年就把百万年来最稳固的家庭与密切社群粉碎成原子个人，代之以“民族”和“消费大众”两大想象社群。同时，核威慑与知识经济虽然压低了现代战争致死率，但消费主义伦理把大众推入了永无止境的欲望跑轮。',
      '因此第十九章成了全书最沉静也最尖锐的回马枪：历史学家热衷计算帝国疆域和GDP，却从未追问人类是否更快乐。心理学证明幸福感取决于客观条件是否符合主观期望，生物学更残酷地指出，血清素、多巴胺与催产素像恒温空调一样会把任何狂喜拉回基线；连“生命意义”本身都往往只是个人与集体同步的错觉。赫拉利由此引出佛教最彻底的洞见——苦的根源不在于感受本身，而在于对转瞬即逝的主观感受的不断追求。',
    ],
    transitionNote:
      '既然外在物质满足永远追不上生化恒温器，手握科学权杖的现代人下一步会做什么？他们不再满足于改造外界，而是直接把手伸向了自己。',
  },
  {
    id: 'sp-step-6',
    stepNumber: '终点',
    title: '荧光兔阿巴与终极之问：打破自然选择的“神”究竟想要什么？',
    shortLabel: '智人末日与终问',
    chaptersRange: '第四部分 第20章 + 后记',
    question:
      '既然智人用七万年走完了从非洲荒原到地球霸主的全部路程，历史接下来还会怎么演？如果连人类自身的身体、基因和大脑都可以被改写，智人还是智人吗？',
    leadJudgment:
      '40亿年来主宰地球生命的“自然选择”即将被“智慧设计”取代——通过生物工程、仿生工程与无机生命三条路径，智人正在亲手终结自己作为碳基物种的历史，而最危险的隐患在于：我们握有神力，却连自己希望想要什么都不知道。',
    paragraphs: [
      '2000年法国实验室为巴西艺术家爱德华多·卡茨植入水母DNA造出的绿色荧光兔阿巴（Alba），连同能用意识操控生化手臂的杰西·沙利文以及仿真人脑的“蓝脑计划”，在赫拉利眼里绝非猎奇新闻，而是物种谢幕的钟声。以往所有历史变革不管多惨烈，人类的生物学硬件和喜怒哀乐都还是七万年前那副旧底板；但接下来，科学即将跨过改造自然与改造社会的门槛，直接改写生命代码、融合机器神经，甚至孕育出完全脱离有机肉身的无机生命，而且“弗兰肯斯坦博士就坐在吉尔伽美什的肩膀上”，借治病延寿的旗号势不可挡。',
      '正因如此，全书最后没有落在一个关于科技奇迹的欢呼上，而是落在一记令人脊背发凉的哲学顿笔上：既然连我们的欲望本身很快都能被生物科技与算法重新设计，那么“我们究竟想要变成什么”已经不够问了，真正决定文明生死的问题是“我们究竟希望自己想要什么”。一个刚刚从动物演变成神、既贪得无厌又不肯对生态系统负责、甚至连自己想要什么都不清楚的物种，正站在40亿年生命史最险峻的悬崖边。',
    ],
    transitionNote:
      '走完从东非草原到基因实验室的七万年全景后，我们还必须退后一步：赫拉利这套横跨生物、历史与哲学的宏大透镜究竟强在哪里，又有哪些容易让人被他带跑的解释盲区？',
  },
];

const boundaryComparison: BoundaryComparison = {
  id: 'sp-boundary',
  question:
    '《人类简史》之所以能用一本书讲透七万年，靠的是哪套极具穿透力的分析方法；而作为清醒的读者，我们在佩服之余又该给他的哪些论断打上边界标注？',
  leadJudgment:
    '赫拉利最犀利的武器是“生物学去魅 + 主体间虚构透镜 + 快乐史逆向审计”，它能一刀劈开人类中心主义和进步神话；但当你用这把宏大剪刀去裁剪具体历史时，必须警惕它对物质博弈、制度细节与科技时间表的过度化约。',
  authorMethodParagraphs: [
    '作者的核心方法论是将人类史彻底拉回生命科学的尺度：先通过“智人只是人属之一”和“40亿年自然选择”剥掉人类的神圣光环，再提出“虚构故事（主体间性）”这把万能钥匙，一口气打通神明、法律、公司、金钱、帝国、人权乃至现代人文主义的底层机制。这种高空鸟瞰视角极具解释爆发力，让原本分散在考古学、经济学、宗教学与科技史里的碎片瞬间咬合成一张清晰因果网。',
    '同时，赫拉利非常擅长用“反常识的价值审计”制造思想震荡——他不停把“物种繁衍成功”与“个体幸福感受”拆开对账，用采集者对比农民、用工业化动物苦难对比人类产能、用佛教内观对比生化快乐恒温器，并刻意在第十三章插入“二级混沌系统”来提醒读者不要把历史读成必然剧本。这套写法不是为了堆砌史实辞典，而是为了把习以为常的现代前提变成可供审视的历史偶然。',
  ],
  readerLookbackParagraphs: [
    '拉开距离回看，这把万能钥匙也有清晰的适用边界。首先，把宗教、法律、公司、货币、人权统统归入“虚构故事”，虽然揭示了它们依赖共识的共同前提，却容易模糊它们在约束力、可纠错机制与物质基础上的巨大差异——一张经由宪政与统计审计反复校正的现代法律条文，和一个纯靠神启威慑的古代神话，在现实运作里的抗错能力绝非同一量级。',
    '其次，全书在部分关键判断上带有鲜明的修辞挑衅与时代局限：例如将农业革命直接称为“史上最大的一桩骗局”略过了农耕文明在漫长历史中积累的制度、医药与抗灾红利；2012—2014年写就的“核子和平让全面战争近乎不可能”低估了大国地缘政治与意识形态的非理性回潮（作者本人在2018年《今日简史》中已作了明显修正）；此外，末尾对复活尼安德特人、生化人与无机生命的推演极具哲学警世价值，但阅读时须分清“科学界已验证的工程事实”与“作者顺势拉远的未来思想实验”。',
  ],
};

const keyGroups: KeyGroupSection[] = [
  {
    id: 'sp-cognition',
    title: '虚构的武器：智人凭什么越过150人上限',
    shortLabel: '01–05 认知与虚构',
    rangeLabel: '01–05',
    question:
      '单挑打不过尼安德特人、体能比不过猛兽，智人究竟靠哪几步反常识的转折站上了地球食物链顶端？',
    answerLead:
      '前五条直指第一部分的认知底牌：智人的霸权不是生理优胜，而是语言虚构打破合作规模限制的结果，并从一开始就伴随着惨烈的生态代价。',
  },
  {
    id: 'sp-agriculture',
    title: '小麦的圈套：农业、想象秩序与文字官僚',
    shortLabel: '06–10 农业与秩序',
    rangeLabel: '06–10',
    question:
      '如果种地并没有让普通人过得更轻松，人类为什么会被困在农田、等级和账本里整整一万年？',
    answerLead:
      '这五条拆解了文明金字塔的暗面：演化成功与个体苦难可以背道而驰，想象秩序靠主体间共识自我锁定，而文字最初是官僚算账的枷锁。',
  },
  {
    id: 'sp-unification',
    title: '大一统的齿轮：金钱、帝国、宗教与历史混沌',
    shortLabel: '11–15 融合与混沌',
    rangeLabel: '11–15',
    question:
      '语言不通、信仰敌对的千百个小世界是怎么拧成同一个地球村的，而“历史必然论”又错在哪里？',
    answerLead:
      '这里浓缩了第三部分的宏大整合逻辑：金钱靠“别人相信”打通全球，帝国熔铸所谓“本土文化”，人文主义成为世俗宗教，而一切事后必然其实都只是二级混沌中的偶然。',
  },
  {
    id: 'sp-science',
    title: '无知的力量与神的迷惘：科学、快乐与智人终点',
    shortLabel: '16–20 科学与终点',
    rangeLabel: '16–20',
    question:
      '承认无知为何撬动了五百年力量井喷？当人类即将改写生命代码，真正悬而未决的终极漏洞是什么？',
    answerLead:
      '最后五条直击现代性的核心悖论：科学借地图留白与信贷起飞、工业化制造消费伦理与原子孤立，可生化恒温器让幸福原地踏步，手握神力的智人最终撞上了“连想要什么都不知道”的绝壁。',
  },
];

const keyInsights: KeyInsightItem[] = [
  {
    id: 1,
    indexLabel: '01',
    groupId: 'sp-cognition',
    chapterRef: '第1章',
    propositionZh:
      '智人就像是个香蕉共和国的独裁者。我们在不久之前，还是大草原上的小可怜，整天充满恐惧和焦虑，但这也让人类更加残酷和危险。人类历史上众多的灾难，不论是生灵涂炭的战乱还是生态遭逢的浩劫，其实都是源自这场过于仓促的地位跳跃。',
    propositionEn:
      'Sapiens is more like a banana republic dictator. Having so recently been one of the underdogs of the savannah, we are full of fears and anxieties over our position, which makes us doubly cruel and dangerous. Many historical calamities, from deadly wars to ecological catastrophes, have resulted from this over-hasty jump. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '直接击碎“人类生来就是万物之灵”的自恋。狮子和鲨鱼花了数百万年才爬上生态金字塔顶，生态系统与它们自身都演化出了制衡与威严；而人类长达数百万年都待在食物链中游、直到40万年前才固定猎捕大型动物、10万年前才骤然登顶，这场毫无心理准备的“暴发户式跳跃”，为后文物种灭绝与战争埋下了演化心理学底色。',
  },
  {
    id: 2,
    indexLabel: '02',
    groupId: 'sp-cognition',
    chapterRef: '第2章',
    propositionZh:
      '人类语言真正最独特的功能，并不在于能够传达关于人或狮子的信息，而是能够传达关于一些根本不存在的事物的信息……除了存在于人类共同的想象之外，这个宇宙中根本没有神、没有国家、没有钱、没有人权、没有法律，也没有正义。',
    propositionEn:
      'The truly unique feature of our language is not its ability to transmit information about men and lions, but its ability to transmit information about things that do not exist at all... There are no gods in the universe, no nations, no money, no human rights, no laws, and no justice outside the common imagination of human beings. （回译）',
    conceptNote: '核心概念：认知革命 / 想象的现实（imagined reality）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书第一根承重柱。青猴会喊“小心有狮子”，八卦也只能把人类团体维系在约150人以内；唯有共同相信“根本不存在的事物”，智人才能像法国标致汽车（Peugeot）用“有限公司”这一法律拟制串联起全球20万互不相识的员工一样，让成千上万陌生人围绕共同目标高效协作。',
  },
  {
    id: 3,
    indexLabel: '03',
    groupId: 'sp-cognition',
    chapterRef: '第2章',
    propositionZh:
      '正由于大规模的人类合作是以虚构的故事作为基础，只要改变所讲的故事，就能改变人类合作的方式……这等于开启了一条采用“文化演化”的快速道路，而不再停留在“基因演化”这条总是堵车的道路上。',
    propositionEn:
      'Since large-scale human cooperation is based on myths, the way people cooperate can be altered by changing the myths... This opened the fast lane of cultural evolution, bypassing the traffic jams of genetic evolution. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '解释了“历史学”何以从“生物学”里挣脱出来。黑猩猩必须等基因突变才能改写首领制度，直立人的石器两百万年几乎不变；而1789年的法国人一夜之间把“天赋君权”换成“人民做主”，那位活过1900—2000年的柏林老太太基因未改却历经五种政体——改变故事就能让人类社会闪电迭代。',
  },
  {
    id: 4,
    indexLabel: '04',
    groupId: 'sp-cognition',
    chapterRef: '第3章',
    propositionZh:
      '就整体而言，现今人类所知远超过远古人类。但在个人层面上，远古的采集者则是有史以来最具备多样知识和技能的人类……有证据显示，自从采集时代以来，智人的脑容量其实是逐渐减少！',
    propositionEn:
      'At the collective level, humans today know far more than the ancient foragers. But at the individual level, ancient foragers were the most knowledgeable and skilful people in history... There is some evidence that the size of the average Sapiens brain has actually decreased since the age of foraging! （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '一举翻转“越古老越愚昧”的线性进步错觉。三万年前的采集者每天只需采猎3至6小时，却必须独自精通数百种植物药性、动物踪迹与燧石制器；进入农业与工业社会后，人类可以依赖他人分工活下来，个体生存带宽反而收缩，戳破了现代人对“最初的富裕社会”的俯视。',
  },
  {
    id: 5,
    indexLabel: '05',
    groupId: 'sp-cognition',
    chapterRef: '第4章',
    propositionZh:
      '甚至远在人类还没有发明轮子、文字和铁器之前，智人就已经让全球大约一半的大型兽类魂归西天、就此灭绝……早在工业革命之前，智人就是造成最多动植物绝种的元凶。人类可以说坐上了生物学有史以来最致命物种的宝座。',
    propositionEn:
      'Long before humans invented the wheel, writing, or iron tools, Homo sapiens had already driven to extinction about half of the planet’s big beasts... Long before the Industrial Revolution, Homo sapiens held the record among all organisms for driving the most plant and animal species to their extinctions. We have the dubious distinction of being the deadliest species in the annals of biology. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '用硬核古生物账本击碎“史前祖先与自然和谐共生”的浪漫滤镜：认知革命时全球约有200属体重超过50公斤的大型陆生哺乳动物，到农业革命时只剩约100属——45000年前澳大利亚24种大型动物灭绝23种，16000年前美洲北美47属失34属、南美60属失50属，第一波大灭绝全由石器时代的采集智人亲手拉开。',
  },
  {
    id: 6,
    indexLabel: '06',
    groupId: 'sp-agriculture',
    chapterRef: '第5章',
    propositionZh:
      '农业革命可说是史上最大的一桩骗局……其实不是我们驯化了小麦，而是小麦驯化了我们……这正是农业革命真正的本质：让更多的人却以更糟的状况活下去。',
    propositionEn:
      'The Agricultural Revolution was history’s biggest fraud... We did not domesticate wheat. It domesticated us... This is the essence of the Agricultural Revolution: the ability to keep more people alive under worse conditions. （回译）',
    conceptNote: '核心区分：演化成功 vs 个体幸福',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最震撼的价值审计。巴勒斯坦杰里科绿洲从公元前13000年养活百人健康的采集部落，变成公元前8500年拥挤多病的千人麦田村落：按DNA拷贝数衡量，1000份永远胜过100份；可落到每个弯腰清石、吃单一谷物、忍受椎间盘突出与饥荒的农民头上，物种成功与个体幸福在这里彻底分道扬镳。',
  },
  {
    id: 7,
    indexLabel: '07',
    groupId: 'sp-agriculture',
    chapterRef: '第5章',
    propositionZh:
      '奢侈品史上常有这样的情况，就是原本的奢侈品往往最后会成为必需品，而且带来新的义务。等到习惯某种奢侈品，就开始认为这是天经地义。接着就是一种依赖。最后，生活中就再也不能没有这种奢侈品了。',
    propositionEn:
      'One of history’s few iron laws is that luxuries tend to become necessities and to spawn new obligations. Once people get used to a certain luxury, they take it for granted. Then they begin to count on it. Finally they reach a point where they can’t live without it. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '解释了人类何以一步步走入“不归路”而非一夜受骗。从纳图芬人为了多收几周野生小麦而建起永久石屋、最终被暴涨的人口锁死在麦田，到现代人发明洗衣机与电子邮件本想省时却反而陷入更紧绷的工作节奏，看似带来便利的每一次“小进步”，都在悄悄焊死新的生活枷锁。',
  },
  {
    id: 8,
    indexLabel: '08',
    groupId: 'sp-agriculture',
    chapterRef: '第6章',
    propositionZh:
      '想象建构的秩序并非个人主观的想象，而是存在于主体之间（inter-subjective），存在于千千万万人共同的想象之中……每一次我们以为自己打破了监狱的高墙、迈向自由的前方，其实只是到了另一间更大的监狱，把活动范围稍稍加以扩大。',
    propositionEn:
      'The imagined order is not a subjective order existing in my own imagination, but rather an inter-subjective order, existing in the shared imagination of thousands and millions of people... Each time we think we have broken down the prison walls and run towards freedom, we are in fact running into the more spacious exercise yard of a bigger prison. （回译）',
    conceptNote: '核心概念：主体间性（inter-subjective）',
    quoteOrigin: 'back-translation',
    analysis:
      '一针点破“个人觉醒就能推翻旧秩序”的天真幻想。无论是《汉谟拉比法典》的阶级还是《独立宣言》的人权，都既不像放射线那样客观存在，也不像童年幻想朋友那样随个人念头消失；要改变一套主体间秩序，只能先组织起相信另一套虚构故事的亿万陌生人——因此人类从未走出想象秩序，只是不断换进更大的牢笼。',
  },
  {
    id: 9,
    indexLabel: '09',
    groupId: 'sp-agriculture',
    chapterRef: '第7章',
    propositionZh:
      '人类史上的第一个文本不但不是哲学巧思，不是诗歌，不是传奇，不是法律，甚至也不是对王室歌功颂德，而是无聊至极的财经文件，记录各种税务、债务以及财产的所有权……文字本来应该是人类意识的仆人，但现在正在反仆为主。',
    propositionEn:
      'The first texts of history contain no philosophical insights, no poetry, legends, laws, or even royal triumphs; they are humdrum economic documents, recording the payment of taxes, the accumulation of debts and the ownership of property... Writing was born as the maidservant of human consciousness, but is increasingly becoming its master. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把“文字神圣起源说”一脚踹回税务账房。古城乌鲁克出土的最早泥板记着“29086单位大麦37个月库辛”，史上第一个留下名字的不是先知或英雄而是会计师；等到阿拉伯数字、电子表格与计算机程序接管官僚系统，“贫穷”“幸福”乃至人类说话做梦的方式，都开始被迫翻译成机器读得懂的数字语言。',
  },
  {
    id: 10,
    indexLabel: '10',
    groupId: 'sp-agriculture',
    chapterRef: '第8章',
    propositionZh:
      '一项黄金法则就是“天生带来允许，文化造成封闭”……从生物学的角度来看，这世界上根本没有什么是不自然的。只要有可能发生的事，就是自然。真正完全“不自然”的事，是指违背了自然规律，但这种事情根本就不会存在，所以也没有禁止的必要。',
    propositionEn:
      'A good rule of thumb is "Biology enables, Culture forbids"... From a biological perspective, nothing is unnatural. Whatever is possible is by definition also natural. A truly unnatural behaviour, one that goes against the laws of nature, simply cannot exist, so it would need no prohibition. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最锋利的逻辑拆弹器。各种社会总爱搬出“合乎自然”替性别分工、种姓隔离或性取向禁忌背书；赫拉利反手指出，从来没有任何文化需要立法“禁止男性进行光合作用”或“禁止女性跑得比光速快”——凡是必须靠道德与法律拼命禁止的，恰恰证明生物学原本是允许的。',
  },
  {
    id: 11,
    indexLabel: '11',
    groupId: 'sp-unification',
    chapterRef: '第9章',
    propositionZh:
      '像这样的矛盾，本来就是每个人类文化无法避免的，甚至还可以说是文化的引擎，为人类带来创意、提供动力……一般认为认知失调是人类心理上的一种问题，但这其实是一项重要的特性，如果人真的无法同时拥有互相抵触的信念和价值观，很可能所有的文化都将无从建立，也无以为继。',
    propositionEn:
      'Such contradictions are an inseparable part of every human culture. In fact, they are culture’s engines, responsible for the creativity and dynamism of our species... Cognitive dissonance is often considered a failure of the human psyche. In fact, it is a vital asset. Had people been unable to hold contradictory beliefs and values, it would probably have been impossible to establish and maintain any human culture. （回译）',
    conceptNote: '核心概念：认知失调（cognitive dissonance）',
    quoteOrigin: 'back-translation',
    analysis:
      '打破了对“逻辑完美自洽文化”的迷信。中世纪贵族在教堂听谦卑福音、在城堡讲血腥复仇，反而催生了骑士修会与亚瑟王传奇；现代社会在1789年之后永远拉扯于“自由”与“平等”之间，却正是这组无解的张力像音乐里的不谐和音一样，推动政治与思想不断向前演化。',
  },
  {
    id: 12,
    indexLabel: '12',
    groupId: 'sp-unification',
    chapterRef: '第10章',
    propositionZh:
      '宗教信仰的重点是自己相信，但金钱信仰的重点是“别人相信”……所有人类创造的信念系统之中，只有金钱能够跨越几乎所有文化鸿沟，不会因为宗教、性别、种族、年龄或性取向而有所歧视。',
    propositionEn:
      'Whereas religion asks us to believe in something, money asks us to believe that other people believe in something... Money is the only trust system created by humans that can bridge almost any cultural gap, and that does not discriminate on the basis of religion, gender, race, age or sexual orientation. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '精准揭示金钱既是最强统一者又是最冷酷腐蚀者的双重面孔：本·拉登痛恨美国文化与政治却照样顺手使用美元，公元1世纪印度市场抢着模仿古罗马迪纳厄斯银币；但金钱靠“万物可换”与“万众相信”拆掉部落高墙的同时，也在不断渗入家庭忠诚、荣誉与爱情的大坝裂缝。',
  },
  {
    id: 13,
    indexLabel: '13',
    groupId: 'sp-unification',
    chapterRef: '第11章',
    propositionZh:
      '今天大多数人说话、思考和做梦的时候，用的都是过去曾拿刀对着我们祖先的征服者的语言……现存的所有人类文化，至少都有一部分是帝国和帝国文明的遗绪，任何以学术或政治为名的手术，如果想把所有帝国的部位一次切除，病人也就必然魂归九霄。',
    propositionEn:
      'Most of us speak, think and dream in imperial languages that were forced upon our ancestors by the sword... All human cultures are at least in part the legacy of empires and imperial civilisations, and no academic or political surgery can cut out the imperial legacies without killing the patient. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '拒绝廉价的“纯正本土 vs 邪恶帝国”二元童话。无论是从阿拉斯加到麦哲伦海峡通用的西、葡、法、英语，还是现代印度人用来反殖民的英语、铁路网、议会民主、板球与茶（以及更早的泰姬玛哈陵），历史账簿上早已不存在一尘不染的“纯净文化”，认清这种混血复杂性才是理解过去2500年政治史的前提。',
  },
  {
    id: 14,
    indexLabel: '14',
    groupId: 'sp-unification',
    chapterRef: '第12章',
    propositionZh:
      '宗教是“一种人类规范及价值观的系统，建立在超人类的秩序之上”……有神论的宗教，重点在神的崇拜；至于人文主义宗教，重点就是对人的崇拜，或者讲得更明确，是对智人的崇拜。',
    propositionEn:
      'Religion can be defined as a system of human norms and values that is founded on a belief in a superhuman order... Theist religions focus on the worship of gods. Humanist religions worship humanity, or more correctly, Homo sapiens. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把“世俗现代”拉回宗教史的同一张解剖台。只要具备“超人类秩序”与“约束性规范”两要素，佛教（崇拜自然法则）与现代自由主义、社会主义、演化人文主义（崇拜智人的神圣人性）本质上都是宗教——这也解释了为何现代意识形态同样拥有经典、异端与烈士，且正面临生命科学否定“自由灵魂”的正面冲击。',
  },
  {
    id: 15,
    indexLabel: '15',
    groupId: 'sp-unification',
    chapterRef: '第13章',
    propositionZh:
      '历史的铁则就是：事后看来无可避免的事，在当时看来总是毫不明显……我们之所以研究历史，不是为了要知道未来，而是要拓展视野，要了解现在的种种绝非“自然”，也并非无可避免。未来的可能性远超过我们的想象。',
    propositionEn:
      'It is an iron rule of history that what looks inevitable in hindsight was far from obvious at the time... We study history not to know the future but to widen our horizons, to understand that our present situation is neither natural nor inevitable, and that we consequently have many more possibilities before us than we imagine. （回译）',
    conceptNote: '核心概念：二级混沌系统（level-two chaotic system）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书的方法论灵魂。君士坦丁在公元306年即位时没人料到基督教会成为古罗马国教，1913年10月没人料到布尔什维克四年后掌权；因为政治与市场属于会因预测本身而改写的“二级混沌系统”，历史学不是算命术，而是帮我们拆掉“现状天经地义”的心理围墙。',
  },
  {
    id: 16,
    indexLabel: '16',
    groupId: 'sp-science',
    chapterRef: '第14—15章',
    propositionZh:
      '科学革命并不是“知识的革命”，而是“无知的革命”。真正让科学革命起步的伟大发现，就是发现“人类对于最重要的问题其实毫无所知”……地图上的空白就像一块磁铁，让欧洲人前仆后继，希望填补这些空白。',
    propositionEn:
      'The Scientific Revolution has not been a revolution of knowledge. It has been above all a revolution of ignorance. The great discovery that launched the Scientific Revolution was the discovery that humans do not know the answers to their most important questions... The empty spaces on the map were a magnet that enticed Europeans to set sail and fill them in. （回译）',
    conceptNote: '拉丁词根：ignoramus（我们不知道）',
    quoteOrigin: 'back-translation',
    analysis:
      '一针点破前现代与现代的思维分水岭，也解释了为何是西欧而非当时更富裕的中国或印度引爆现代世界。哥伦布至死不肯承认《圣经》漏了一整块大陆，而水手亚美利哥·韦斯普奇敢说出“我们不知道”，于是1525年萨尔瓦提地图留下的大片空白把科学观察与帝国征服焊成了一台加速500年的超级机器。',
  },
  {
    id: 17,
    indexLabel: '17',
    groupId: 'sp-science',
    chapterRef: '第16章',
    propositionZh:
      '在过去500年间，这种关于进步的概念说服了全球人民，将越来越多的信任交付给未来。正是这种信任创造了信贷；而信贷带来了实实在在的经济成长……印钞票的是银行和政府，但最后埋单的是科学家。',
    propositionEn:
      'Over the last 500 years the idea of progress convinced people to put more and more trust in the future. This trust created credit; credit brought real economic growth... Banks and governments print money, but ultimately, it is the scientists who foot the bill. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把金融学翻成了思想史与科学史的咬合齿轮。前现代社会因不信未来能把饼做大而陷入信贷枯竭，现代资本主义则凭“信任未来→信贷→投资生产→增长”的循环实现五百年240倍产值暴涨；但这套看似违反自然有限性的指数魔术之所以没彻底崩盘，归根到底靠的是科学家每隔几年就端出美洲航路、内燃机或基因工程来替透支的未来埋单。',
  },
  {
    id: 18,
    indexLabel: '18',
    groupId: 'sp-science',
    chapterRef: '第17—18章',
    propositionZh:
      '资本主义和消费主义的伦理可以说是一枚硬币的正反两面，将这两种秩序合而为一。有钱人的最高指导原则是——“投资！”而我们这些其他人的最高指导原则则是——“购买！”……经过数百万年的演化，人类的生活和思考方式都预设自己属于社群。但仅仅过了两个世纪，我们就成了互相疏远的个人。',
    propositionEn:
      'The capitalist and consumerist ethics are two sides of the same coin, a merger of two commandments. The supreme commandment of the rich is "Invest!" The supreme commandment of the rest of us is "Buy!"... Over millions of years of evolution, humans evolved to live and think of themselves as members of a community. In a mere two centuries we have become alienated individuals. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '精准勾勒出现代人“既前所未有地自由、又前所未有地孤独且焦虑”的双重处境：国家与市场联手在短短两百年内抽空了维系百万年的家庭与密切社群，用“民族”和“消费大众”取而代之；同时头一次造出人人都能轻松达标的世俗宗教——富人继续投资赚钱、大众尽情买买买，连肥胖都成了拉动GDP的双重胜利。',
  },
  {
    id: 19,
    indexLabel: '19',
    groupId: 'sp-science',
    chapterRef: '第19章',
    propositionZh:
      '快乐并不在于任何像是财富、健康甚至社群之类的客观条件，而在于客观条件和主观期望之间是否相符……人类的生化机制就像是个恒温空调系统，不管是严寒还是酷暑都要想办法保持恒定……苦真正的根源就在于“追求”主观感受这件事，不管追求的是什么，都会让人陷入持续的紧张、困惑和不满之中。',
    propositionEn:
      'Happiness does not really depend on objective conditions of either wealth, health or even community. Rather, it depends on the correlation between objective conditions and subjective expectations... Our biochemical system seems to be programmed like an air-conditioning system that keeps the temperature constant come heatwave or blizzard... The root of suffering is neither the feeling of pain nor of sadness nor even of meaninglessness. Rather, the real root of suffering is this never-ending and pointless pursuit of ephemeral feelings, which causes us to be in a constant state of tension, restlessness and dissatisfaction. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最沉静也最彻底的一记三连击：先用心理学拆穿“越富裕越快乐”的期望陷阱（广告与媒体不断拔高对比标尺），再用生物学恒温器指出古代农夫盖完土屋与现代香港企业家还完豪宅房贷的血清素浓度并无二致，最后借佛教内观直指终极盲区——若不放下对转瞬即逝主观感受的执着，无论改造世界还是改造大脑都可能南辕北辙。',
  },
  {
    id: 20,
    indexLabel: '20',
    groupId: 'sp-science',
    chapterRef: '第20章 + 后记',
    propositionZh:
      '自然选择的法则开始被打破，而由智慧设计（intelligent design）法则取而代之……或许真正该问的问题不是“我们究竟想要变成什么”，而是“我们究竟希望自己想要什么”……拥有神的能力，但是不负责任、贪得无厌，而且连想要什么都不知道。天下危险，恐怕莫此为甚。',
    propositionEn:
      'The laws of natural selection are beginning to be broken, replaced by the laws of intelligent design... Perhaps the real question facing us is not "What do we want to become?", but "What do we want to want?"... Is there anything more dangerous than dissatisfied and irresponsible gods who don’t know what they want? （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书的终极警世钟。从绿色荧光兔阿巴、意识操控生化手臂的杰西·沙利文到获欧盟10亿欧元资助的“蓝脑计划”，智人正站在打破40亿年自然选择的奇异点前夜；当连人类自身的欲望都可以被生物工程与算法改写时，唯一决定文明生死的不再是“能不能做到”，而是我们是否来得及搞明白自己究竟希望想要什么。',
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
