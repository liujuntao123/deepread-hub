import type {
  ArgumentMapStep,
  BookReadingDataset,
  BoundaryComparison,
  ChapterProposition,
  KeyGroupSection,
  KeyInsightItem,
} from '../types/reading';

export const SAPIENS_ULTIMATE_THESIS = {
  question:
    '如果只留下一句话把《人类简史》四大部分二十章与后记拧成一条主线，尤瓦尔·赫拉利究竟颠覆了哪一个关于人类崛起的根本常识？',
  thesis:
    '智人之所以从食物链中游的平庸动物跃升为统治地球的物种，靠的既不是更强壮的体魄，也不是个体大脑的绝对聪明，而是凭借“认知革命”获得了编造并共同相信“虚构故事”的能力——国家、金钱、帝国、宗教与信用皆是彼此信任的想象秩序，它们把人类推上了掌控物理与生命法则的神坛，却从未自动换来个体幸福，反而把我们带到了“拥有神力却不知自己究竟想要什么”的物种终点。',
  answerParagraphs: [
    '这句话之所以能把跨度长达七万年的全书穿成一根针，是因为赫拉利拒绝了教科书里常见的“人类天生高贵、历史必然进步”的线性赞歌，而是始终用生物学与制度史的双重显微镜，死死咬住“大规模灵活合作如何可能”这一核心问题。第一部分用认知革命解释了智人如何靠共同虚构跨越150人熟人上限；第二部分立刻泼下冷水，揭示农业革命并没有让个体更轻松，反而用小麦、文字与想象秩序把亿万人锁进等级与劳役的金字塔。',
    '第三与第四部分再将镜头推向全球整合与现代加速：金钱、帝国与普世宗教把万千破碎世界熔铸成一个地球村，而“承认自己无知”的科学革命与帝国扩张、资本主义信用结盟，终于撬动了能源、工业与基因改造的杠杆。然而到了书尾，赫拉利把最锋利的手术刀对准了现代人自己——如果一切历史奇迹都建立在“集体想象”之上，且力量暴涨未必带来哪怕一分额外快乐，那么即将打破40亿年自然选择法则的智人，究竟是在走向解放，还是在盲目亲手终结自己？',
  ],
};

export const SAPIENS_OVERVIEW_INTRO_QA = {
  question:
    '全书横跨认知革命、农业革命、人类融合统一与科学革命四大板块共二十章与一篇后记，赫拉利是怎样步步反转“进化进步论”的，又有哪些判断需要我们在阅读时拉开批判距离？',
  answerLead:
    '全书像一场层层剥壳的物种解剖：先拆穿“智人自古唯一且高贵”的错觉，再戳破“农业带来富足、历史自有正义”的田园神话，随后展示金钱、帝国、宗教与科学资本如何把人类推上权力巅峰，最后以快乐史与生物工程把人拉回“力量与欲望失配”的哲学悬崖。以下依原书全部二十章与后记逐章提炼，并将原文边界之外的引申、推断与保留标注明确区隔。',
};

export const SAPIENS_CHAPTER_PROPOSITIONS: ChapterProposition[] = [
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
      '人们习惯把人类历史想象成一条单线高歌猛进的独角戏，可赫拉利一开场就打破了“人类自古唯一”的自恋：直到约1万年前，地球上还曾同时生活着尼安德特人、直立人、梭罗人、丹尼索瓦人、弗洛里斯人等多种人属物种。更尴尬的是，200万年来人类大脑虽然占去静息能量的25%并迫使胎儿早产，却长期只能捡食狮子鬣狗吃剩的骨髓；直到约40万年前才开始固定猎捕大型动物，约10万年前才骤然跃居食物链顶端。正是这种缺少百万年生态制衡的“仓促登顶”，给人类留下了伴随至今的焦虑与残酷。',
  },
  {
    id: 'sp-02',
    indexLabel: '02',
    chapterTitle: '第二章 知善恶树',
    part: 'part1',
    partLabel: '第一部分 认知革命',
    shortLabel: '知善恶树与虚构',
    coreProposition:
      '约7万年前的“认知革命”赋予智人谈论“并不存在的事物”的能力，这使智人得以突破150人的八卦极限，实现陌生人之间的大规模灵活合作。',
    narrative:
      '约10万年前，智人第一次尝试走出东非进入地中海东部，结果竟被脑容量更大、体格更壮的尼安德特人打了回去；可7万年前再次出击时，智人却迅速席卷欧亚并让所有其他人种消失。转折点不在工具，而在语言的质变：八卦能把合作群体维持在约150人以内，而只有讲出大家共同相信的“虚构故事”，才能让成千上万互不相识的陌生人齐心协力。赫拉利用法国标致汽车（Peugeot SA）作比：厂房、汽车、员工全拆光了，“有限责任公司”这个法律拟制依然存在——神明、国家、人权与金钱本质上皆是如此，这也让智人得以绕开缓慢的基因演化，直接通过改写故事实现社会行为的闪电迭代。',
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
      '现代人容易用“茹毛饮血、朝不保夕”来俯视史前祖先，赫拉利却结合演化心理学与考古证据给出截然不同的图景：虽然现代人热衷暴食高糖高脂的“贪吃基因”源于当年稀缺果实的记忆，但采集社会实际上堪称“最早的富裕社会”。他们每天只需花数小时觅食，食物来源囊括数十种动植物，极少因单一作物歉收而饿死，也因低密度流动而几乎免受大规模传染病侵袭；并且每个采集者的大脑都必须同时精通植物学、动物追踪、制器与医疗，论个体知识面甚至高于现代流水线上被高度专业化的个体。当然，作者也刻意避免美化“高贵的野蛮人”——采集部落同样存在抛弃老弱、杀婴与部族暴力。',
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
      '环保叙事常把人类破坏自然的起点画在工业革命，赫拉利却翻出两份触目惊心的史前案卷：约4.5万年前智人乘船踏上澳大利亚，不过几千年间，当地24种体重在50公斤以上的大型动物竟灭绝了23种，双门齿兽与巨型袋鼠悉数消失；约1.6万年前智人跨过白令陆桥进入美洲，一路推进到火地岛，不到两千年就让北美47属大型哺乳动物消失34属、南美60属消失50属。气候变迁只是帮凶，真正致命的是大型动物在演化中来不及学会害怕这批看似弱小却会集体放火、围猎的新来者——第一波物种大灭绝，早在农业与机器出现前就已由智人亲手拉开帷幕。',
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
      '教科书向来把1万年前人类定居耕作赞美为“文明曙光”，赫拉利却毫不留情地称之为“史上最大骗局”。从单个人类的脊柱、膝盖、菜单和工时来看，小麦既不好消化又娇贵脆弱，逼着人类整日弯腰除草挑水、吃单一谷物、忍受高发传染病与连年饥荒；唯一赢家是小麦基因与人类总人口的暴增。更讽刺的是，土耳其哥贝克力石阵（每根石柱重达7吨、高5米，甚至留有50吨未完工巨柱）表明，人类起初或许是为了供养宗教圣地的建造者才一步步陷入耕作。奢侈品往往很快变成必需品：等到人口因余粮暴涨，人类再也回不去采集时代，只能世代替一小撮精英的宫殿和粮仓劳作——演化成功与个体幸福之间，在这里彻底分道扬镳。',
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
      '从古巴比伦的《汉谟拉比法典》到现代美国的《独立宣言》，人类所有超大规模社会秩序都并非刻在自然法则里，而是靠集体相信维系的“想象秩序”。',
    narrative:
      '农业定居让人类第一次陷入对“未来”的焦虑，而随着村落扩张为百万人口的帝国，血缘与亲情再也撑不住如此庞大的协作网络。赫拉利把公元前1776年的《汉谟拉比法典》与公元1776年的美国《独立宣言》并置解剖：前者宣称神明将人分为上等人、平民和奴隶，后者宣称造物主赋予人人生而平等的不可剥夺权利——但在纯生物学意义上，既没有“上等人”，也没有“平等”与“权利”，两者同样只是让百万人彼此合作的虚构剧本。想象秩序之所以牢不可破，靠的是三大机制：它被嵌入了物质世界（如个人卧室与建筑布局），塑造了人们最私密的欲望（如浪漫主义消费与出国旅游），并且它不是个人幻想，而是联结于千万大脑之间的“主体间性”网络——你一个人醒过来没用，必须说服所有人换一个新故事。',
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
      '人们总浪漫地以为人类留给后世的第一句书面语一定是深邃的哲思或动人的史诗，可考古发现的最早苏美尔泥板写着的却是枯燥至极的财务签核：“29086单位大麦，37个月，库辛”。当王国大到要向数十万人收税、算粮、派工时，单靠人脑记忆必然死机。从苏美尔的“部分表意文字”与印加帝国的结绳记事（奇普），到后来发展出完整表音文字与0到9的阿拉伯数字，人类不仅把信息卸载到了泥板与纸张上，更在归档、检索与目录分类中重塑了自身的思维方式——文字本来是人类意识的仆人，却在官僚体制与数学符号里一步步反客为主，迫使现实生活按表格与档案的逻辑运转。',
  },
  {
    id: 'sp-08',
    indexLabel: '08',
    chapterTitle: '第八章 历史从无正义',
    part: 'part2',
    partLabel: '第二部分 农业革命',
    shortLabel: '阶层与性别迷思',
    coreProposition:
      '种姓、种族与性别等级几乎都源于历史偶然事件，却借“洁净与污染”“自然法则”的虚构叙事自我强化成难以挣脱的恶性循环。',
    narrative:
      '既然人类所有大型社会都靠想象秩序维系，为何这些秩序无一例外地划分出高低贵贱？赫拉利指出，复杂社会需要快速识别陌生人的分工与位置，但等级的具体切法却充满偶然：印度种姓、美国白人对黑人的歧视，起初源于征服或奴隶贸易的地理经济巧合，随后却用“污染恐惧”和法律禁令固化成“偏见—贫困—失学—加深偏见”的自我实现循环。至于几乎遍布农业以来所有文明的父权制，作者逐一检验了“肌力论”“流氓基因论”和“演化心理分工论”，却诚实承认每一种生物学解释都有破绽——直到今天，为何全球文化不约而同地贬低女性、推崇男性，依然是人类学史上最耐人寻味的未解之谜之一。',
  },
  {
    id: 'sp-09',
    indexLabel: '09',
    chapterTitle: '第九章 历史的方向',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '历史统一的方向',
    coreProposition:
      '尽管文化内部永远充满“认知失调”般的自相矛盾，从几千年的高空俯瞰，人类历史却呈现出从数千个孤立小世界合流为单一全球村的清晰矢量。',
    narrative:
      '中世纪贵族一边笃信基督教的谦卑忍让，一边狂热追求骑士的血腥复仇；现代人一边高呼个人自由，一边追求社会平等——赫拉利强调，这种内在矛盾不是文化的缺陷，反而是推动文化不断演化的引擎。若把焦距拉长到数千年尺度，历史的方向其实异常清晰：公元前10000年地球上存在数千个彼此不知对方存在的孤立人类世界，到公元前2000年减少到数百个，到公元1450年已压缩到以亚非世界为主的寥寥数个板块，今天几乎全人类都生活在同一套地缘政治、经济与科学体系之内。推动这场大一统的三大普世秩序，正是接下来的金钱、帝国与宗教。',
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
      '西班牙征服者科尔特斯率军入侵阿兹特克时，用黄金狂热震惊了当地人，可黄金既不能吃也不能造武器——为什么两个语言不通、信仰敌对的文明竟然都认同一块亮闪闪的金属？因为金钱的本质从来不是物理材质，而是心理上的“万用互信”：只要我相信别人会接受它，贝壳、大麦、银币乃至今天占货币总量九成以上的电子数据都能充当万物换算器。金钱凭“万物可换”与“万众相信”两大原则拆毁了一切宗教与国界高墙，哪怕基督徒与穆斯林在战场上兵戎相见，在贸易场上照样乐意接受对方铸造的金币；但代价也同样冷酷——金钱会不断侵蚀亲情、荣誉与忠诚等原本“无价”的人类社群纽带。',
  },
  {
    id: 'sp-11',
    indexLabel: '11',
    chapterTitle: '第十一章 帝国的愿景',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '帝国的双重面孔',
    coreProposition:
      '帝国固然以血腥征服起家，却也是过去两千五百年最常见的政治形态，并靠普世愿景把无数分散族群熔铸成我们今天引以为傲的诸多“本土文化”。',
    narrative:
      '当代政治词典几乎把“帝国主义”当成纯粹的骂人脏话，但赫拉利提醒读者别用道德滤镜擦掉历史事实：从波斯居鲁士大帝宣称“为万民福祉统治”，到秦汉、罗马、阿拉伯与大英帝国，帝国之所以能长久稳固，靠的不只是刀剑，更是标榜普世教化使命的意识形态，以及对被征服族群语言、法律、度量衡的标准化整合。更令人坐立难安的真相是，今天人们用来反抗帝国、高呼“纯正本土文化”的遗产——例如印度独立运动使用的英语、铁路与民族主义，乃至我们日常的语言和饮食——多半恰恰是前几任帝国强行混合留下的私生子，历史账簿上从来没有一尘不染的纯正受害者。',
  },
  {
    id: 'sp-12',
    indexLabel: '12',
    chapterTitle: '第十二章 宗教的法则',
    part: 'part3',
    partLabel: '第三部分 人类的融合统一',
    shortLabel: '宗教与人文信仰',
    coreProposition:
      '宗教的本质是“建立在超人类秩序信仰上的规范体系”；按此标准，现代的自由主义、共产主义与民族主义同样是换了外衣的世俗宗教。',
    narrative:
      '为了让脆弱的想象秩序免遭质疑，人类发展出了“超人类法则”——宣称社会规范不是谁拍脑袋定的，而是神明或自然铁律颁布的。赫拉利梳理了宗教从万物有灵论、宽容的多神教，演变为狂热排他的一神教、擅长解释恶的二元论（善恶对立），以及不拜神明却崇拜自然法则的佛教（以“离苦”而非“拜神”为核心）。最颠覆的一步落在现代：许多人以为现代社会早已世俗化，可作者把人文主义（自由人文主义崇拜个人内心、社会人文主义崇拜人类集体、演化人文主义崇拜物种进化）直接归入“自然法则宗教”——它们同样要求信徒相信一套超越个人意志的神圣秩序，并愿意为之流血牺牲。',
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
      '历史属于无法精准预测的“二级混沌系统”，事后看起来“必然如此”的一切，在当时往往只是无数岔路口中的一次偶然赢牌。',
    narrative:
      '读完人类走向统一的大叙事，读者很容易滑向“历史决定论”，以为基督教兴起、罗马崛起或全球统一都是写死在剧本里的必然结果。赫拉利立刻在第十三章按下暂停键：历史之所以无法像天气预报那样被准确预测，是因为它会随预测本身而改变（一级混沌如天气不受预报影响，二级混沌如市场与政治会因预言而自我颠覆）。十字军东征、基督教从犹太小教派变身帝国国教，在事前都绝非铁板钉钉。历史学家的价值从不是预测明天，而是把“原本看起来天经地义的现状”还原成过去偶然选择的产物，从而让我们意识到未来依然敞开着别的可能。',
  },
  {
    id: 'sp-14',
    indexLabel: '14',
    chapterTitle: '第十四章 发现自己的无知',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '发现自己的无知',
    coreProposition:
      '科学革命之所以引爆过去五百年的力量井喷，不是因为欧洲人突然发现了终极真理，而是因为人类史上头一次坦然承认“我们不知道”。',
    narrative:
      '公元1500年，全球只有约5亿人口、总产值约2500亿美元，人类甚至还没绕过地球一圈；五百年后，人口膨胀14倍、总产值暴增约240倍、能源消耗增加115倍，连月球都留下了脚印。这场大跃迁的开关，赫拉利定格在“承认无知”（拉丁文ignoramus）：古代经典宣称宇宙所有重要答案早已被神明或圣贤写完，只需注释背诵；现代科学却公开承认自己对世界所知甚少，必须通过观察与数学工具去搜集新知，并用新知换取新力量。更关键的是，科学从不是漂浮在象牙塔里的纯洁求知——正因研发需要巨额资金，科学从诞生第一天起就被绑上了政治帝国与经济资本的战车，也催生了把死亡降格为“技术问题”的“吉尔伽美什计划”。',
  },
  {
    id: 'sp-15',
    indexLabel: '15',
    chapterTitle: '第十五章 科学与帝国的联姻',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '科学与帝国联姻',
    coreProposition:
      '近代欧洲之所以甩开当时更富裕的中国、印度与奥斯曼帝国，关键不在船坚炮利的起点，而在于敢在地图上留出大片空白并派科学家随军远征的帝国心态。',
    narrative:
      '1405至1433年郑和下西洋的船队规模远超1492年哥伦布的三艘小船，可明朝舰队并未把印度洋变成中国殖民地；反倒是偏居欧亚西陲的小国们掀起了征服全球的浪潮。赫拉利指出，分水岭就在“世界地图上的空白”：前现代地图把未知区域画满怪兽或干脆抹平，仿佛自己早已无所不知；而15世纪末之后的欧洲地图故意留白，像磁铁一样勾引探险家与学者出发填图。库克船长远征南太平洋既带天文学家观测金星凌日、带植物学家采标本，也顺手替英国占下澳大利亚；贝希斯敦铭文破译与印欧语系研究同样与殖民官僚紧密交织——帝国给科学砸钱开路，科学替帝国提供地理、医学与统治术，两者互为因果。',
  },
  {
    id: 'sp-16',
    indexLabel: '16',
    chapterTitle: '第十六章 资本主义教条',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '信用与增长大饼',
    coreProposition:
      '现代经济得以持续爆炸增长的真正引擎，是对“未来大饼会越做越大”的集体信仰，以及由此凭空变出现实资金的“信用”机制。',
    narrative:
      '为什么前现代社会总认为经济是零和博弈——你发财就意味着我变穷？因为当时没人相信明天能比今天多产出多少财富，于是借贷极难、利息奇高，结果形成“不信未来—缺少信用—增长停滞”的死循环。哥伦布的远航与荷兰东印度公司的股份制改写了剧本：只要大家相信新知与远征能把未来大饼做大，银行就能用今天的“信用”提前透支未来尚不存在的财富，拿去建厂开矿，进而真的把大饼做大。赫拉利也用1717—1720年约翰·劳在法国制造的“密西西比泡沫”与冷血的大西洋奴隶贸易警示：资本主义既非纯靠市场自己运转（它离不开帝国军舰保驾护航），也绝非天然道德——当利润凌驾一切，“自由市场”照样能为奴隶贩运、鸦片战争与殖民屠杀开出绿灯。',
  },
  {
    id: 'sp-17',
    indexLabel: '17',
    chapterTitle: '第十七章 工业的巨轮',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '工业化与消费伦理',
    coreProposition:
      '工业革命本质上是一场“能源转换革命”，它一边用机器把亿万动物变成流水线上的活体零件，一边迫使全人类把节俭美德翻转为“消费主义伦理”。',
    narrative:
      '过去人类几乎只能靠肌肉、畜力与风水流转，可蒸汽机与内燃机打开了把热能转化为动能的魔法大门，让人类第一次坐拥近乎无穷的能源海洋。但工业巨轮一旦转起来，就改写了地球上的每一种生物命运：首先是铁路时刻表强行把全人类塞进了精确到分钟的工业时间；其次是工业化畜牧业将数十亿头牛、猪、鸡关进狭窄铁笼，只顾产肉产奶却彻底无视哺乳动物的情感痛苦，酿成了史上规模最庞大的动物苦难；最后，产能过剩反逼出史上头一遭的新伦理——消费主义。过去所有宗教都劝人克己禁欲，唯有现代经济要求你“买买买、放纵自己”，甚至连肥胖症都成了拉动医疗与健身双倍GDP的绝佳生意。',
  },
  {
    id: 'sp-18',
    indexLabel: '18',
    chapterTitle: '第十八章 一场永远的革命',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '社群瓦解与核和平',
    coreProposition:
      '短短两百年间，国家与市场联手瓦解了维系人类数万年的传统家庭与地方社群，同时在核武器与知识经济夹击下意外带来了史上最漫长的和平时期。',
    narrative:
      '现代人往往在不知不觉中经历了一场比任何王朝更迭都剧烈的社会解体：过去生老病死、教育养老、邻里互助全由大家庭和乡土社群兜底；而工业化之后，国家和市场联手对个体喊出诱人的承诺——“你不必再听父母长辈和乡邻摆布，只要交税、工作、消费，我们来保护你、给你发养老金！”家庭和熟人社群被迅速抽空，取而代之的是“民族”和“消费群体”这两大想象的社群。与此同时，赫拉利还给出一个极具反差感的判断：尽管20世纪打过两场惨烈大战，但二战后全球战争致死率却暴跌至史前采集时代与古代农业帝国的零头——核武器把大国大战变成集体自杀，而财富核心从抢地盘转向抢人才与知识，让发动侵略战争头一次变得血本无归。',
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
      '历史学家极少追问人类五百年来是否真的更快乐，而心理学、生物学与佛学共同提示：外在财富与力量几乎无法永久抬高大脑设定的快乐基线。',
    narrative:
      '如果人类积累的庞大知识、财富与核能没有让我们比中世纪农民或史前采集者更幸福，那这一切到底图什么？赫拉利从三个维度拆解“快乐”：在社会心理层面，快乐不取决于绝对条件，而取决于现实与期待的落差——中世纪农民没用过抽水马桶不会痛苦，现代人少刷十分钟Wi-Fi就会焦躁，连广告机器都在刻意不断抬高我们的焦虑；在生物化学层面，演化为了逼我们继续觅食繁殖，把血清素与多巴胺设成了类似空调恒温器的回落机制，中彩票带来的狂喜几个月后就会回落基线；在意义与觉察层面，尼采与现代心理学认为意义感支撑幸福，但佛教走得更彻底——追逐转瞬即逝的快感本身正是痛苦之源，唯有如实观察自身感受的生灭，才可能跳出情绪过山车。',
  },
  {
    id: 'sp-20',
    indexLabel: '20',
    chapterTitle: '第二十章 智人末日',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '智人末日与智能设计',
    coreProposition:
      '在遵循“自然选择”长达40亿年之后，生物工程、仿生工程与无机生命这三条通道正准备用“智能设计”亲手终结智人这个物种本身。',
    narrative:
      '2000年，艺术家爱德华多·卡茨请法国实验室把水母的绿色荧光基因植入兔子胚胎，造出了自然界绝不可能凭演化诞生的绿色荧光兔阿巴（Alba）。赫拉利把它视作一场物种大谢幕的序曲：第一条路是生物工程，从修复疾病滑向改造基因、复活尼安德特人甚至重写人类欲望；第二条路是仿生工程，如靠大脑信号操控机械义肢的杰西·沙利文与脑机接口，让有机体与机器融合成赛博格；第三条路是彻底摆脱碳基血肉的无机生命，如能够自主学习演化的程序与“蓝脑计划”的大脑仿真。历史真正的终点也许不是某种政治制度的胜利，而是“智人”被自己造出的后人类物种彻底取代。',
  },
  {
    id: 'sp-21',
    indexLabel: '21',
    chapterTitle: '后记 变成神的这种动物',
    part: 'part4',
    partLabel: '第四部分 科学革命',
    shortLabel: '后记：变成神的动物',
    coreProposition:
      '人类已经一步步掌握了接近神明的创造与毁灭之力，却仍旧不负责任、贪得无厌，甚至连“自己究竟想要什么”都答不上来。',
    narrative:
      '站在七万年演化的山巅回头一望，赫拉利用一页冷峻的后记替全书落槌：七万年前，智人还是非洲角落里无足轻重的动物；今天我们跃升为地球的主宰，甚至正准备改写生命法则、创造全新物种。但力量越接近全能，一个被所有人刻意回避的终极问题就越显刺眼——在即将能够随心设计自己大脑与欲望的前夜，我们真正该问的早已不是“我们想要成为什么”，而是“我们究竟想要什么（What do we want to want）”。拥有神明般的能力，却不知满足、不愿负责、连自己的欲望都搞不明白，赫拉利冷冷写道：天下危险，恐怕莫此为甚。',
    extensionOrInference: {
      kind: '引申',
      text: '这句结尾并非悲观收场，而是直接把接力棒交给了续作《未来简史》：当人类真的开始把长生、快乐与成神写进21世纪的工程议程表，谁来决定人类该被改造成什么模样？',
    },
  },
];

export const SAPIENS_ARGUMENT_MAP_STEPS: ArgumentMapStep[] = [
  {
    id: 'sp-step-1',
    stepNumber: '第 1 步',
    title: '败走中东与标致汽车：智人凭什么一夜反转食物链？',
    shortLabel: '认知革命与虚构',
    chaptersRange: '第一部分 第1—4章',
    question:
      '约10万年前智人第一次走出非洲时曾被体格更壮、脑容量更大的尼安德特人赶回老家，为什么3万年后再次出击却横扫全球、灭绝所有竞争者？',
    leadJudgment:
      '决定胜负的不是智人突然长出了更锋利的石矛或更大的肌肉，而是约7万年前的“认知革命”赋予了智人一种独一无二的语言异能——谈论“根本不存在的事物”，并借此让成千上万陌生人彼此信任、灵活协作。',
    paragraphs: [
      '单打独斗时，一个智人根本打不过尼安德特人，甚至也未必比黑猩猩更厉害；可一旦把规模拉到一万人，黑猩猩群立刻沦为混乱厮杀，智人却能造出金字塔、跨国公司与登月火箭。赫拉利点破了其中的人数天堑：单靠面对面的亲密关系和八卦，人类部落的上限就卡在150人左右；唯有编出大家共同相信的虚构故事——就像法国标致汽车（Peugeot SA）那样，即便厂房炸毁、员工辞职、高管换光，“有限责任公司”这个既看不见也摸不着的法律拟制依然活在成千上万人的共识里——陌生人才能迅速组成精密大军。',
      '这场语言突变让智人获得了绕过基因演化的超级外挂：蜜蜂和黑猩猩必须等几十万年基因突变才能改变社会结构，而智人只要换一个神明、改一部宪法，就能在一代人之内重构整个社会的合作方式。然而这股仓促登顶的力量毫无生态克制：早在工业时代以前，手持火把的采集智人就凭集体围猎踏平了澳大利亚（24种50公斤以上动物灭绝23种）与美洲的巨型动物群，证明人类早在石器时代便已是地球生态的连环杀手。',
    ],
    transitionNote:
      '既然采集者在健康、工时与菜单上并不比后人差，甚至堪称自由的“富裕社会”，智人为什么又在约1万年前主动放弃流浪、把自己拴在了一小块农田里？',
  },
  {
    id: 'sp-step-2',
    stepNumber: '第 2 步',
    title: '小麦的陷阱与泥板账本：农业革命如何把自由变成金字塔？',
    shortLabel: '农业陷阱与官僚',
    chaptersRange: '第二部分 第5—8章',
    question:
      '如果种地让人弯腰驼背、营养单一、传染病频发且工时更长，为什么全人类还是前赴后继地掉进了“农业革命”的坑里再也爬不出来？',
    leadJudgment:
      '因为演化只认基因复制的数量，从来不管个体快不快乐——农业是“奢侈品变必需品”的渐进陷阱，它养活了暴增的人口，却迫使亿万农民用劳役去供养由“想象秩序”、文字账本与阶层等级搭起的庞大金字塔。',
    paragraphs: [
      '最初智人只是顺手照料几株野生小麦，或者为了养活修建土耳其哥贝克力石阵巨石神庙的工匠而多开几块地；可多出来的口粮立刻换来多生下的孩子，等到部落人口膨胀到再也靠采集养不活，回头路就彻底断了。这就是赫拉利著名的倒置：从物种繁衍角度看，不是智人驯化了小麦，而是小麦成功绑架了智人替它除草、浇水、赶鸟，把自己从野生杂草推上了地球霸主之位。',
      '人口爆炸随之压垮了大脑与血缘的极限，两套支撑大型文明的新机器应运而生。一是深入人心的“想象秩序”：无论是公元前1776年把人分三等的《汉谟拉比法典》，还是公元1776年宣告人人生而平等的美国《独立宣言》，都靠嵌入物质空间、塑造个人欲望与主体间共识，让亿万人心甘情愿接受由历史偶然定下的种姓、种族或性别等级；二是体外内存——文字与数字。人类最早的泥板不是赞美诗，而是“29086单位大麦，37个月，库辛”的枯燥财税签核，官僚机器借着文字和表格一步步接管了整个社会。',
    ],
    transitionNote:
      '无数个各自为政的农耕王国、神庙和部落本来彼此隔绝、语言不通，它们又是靠哪几股力量在短短几千年里被一步步拧成今天同一个地球村的？',
  },
  {
    id: 'sp-step-3',
    stepNumber: '第 3 步',
    title: '金钱、帝国与宗教：三台大一统引擎如何熔铸全球村？',
    shortLabel: '金钱帝国与宗教',
    chaptersRange: '第三部分 第9—13章',
    question:
      '不同族群说着互听不懂的语言、拜着水火不容的神明，人类究竟凭借什么机制，从一万年前数千个孤立小世界合流成今天单一的全球秩序？',
    leadJudgment:
      '推动人类跨过文化与血缘高墙的三台超级引擎，分别是靠互信打通陌生人交易的金钱、靠武力与普世教化整合版图的帝国，以及借超人类法则封死质疑的普世宗教（包括现代各种人文主义意识形态）。',
    paragraphs: [
      '金钱是人类史上最宽容的虚构故事：哪怕信仰敌对的商人和士兵恨不得置对方于死地，只要看见银币或黄金，照样能坐下来和平交易，因为大家彼此信任“别人也认它”。帝国则扮演了残酷却高效的熔炉：从波斯、罗马、秦汉到大英帝国，它们在流血征服之后推广统一法律、语言和基建，让数代人之后连被征服者也把帝国的遗产认作自己的“本土文化”。宗教则把脆弱的人间规矩包装成神圣不可侵犯的宇宙律法，赋予帝国与秩序以终极合法性。',
      '赫拉利在这里特别做了两手防呆：第一，他把现代人推崇的自由主义、共产主义和民族主义直接放进“自然法则宗教”的抽屉里，指出它们同样是在崇拜某种超越个人的神圣人性或历史法则；第二，他在第十三章猛踩刹车，提醒读者别因为世界最终走向融合，就以为每一步都是命中注定——历史是会对预测本身做出反应的“二级混沌系统”，基督教称霸或帝国兴衰在当时全都是险胜的偶然。',
    ],
    transitionNote:
      '如果金钱、帝国与宗教在公元1500年前就已经运转了数千年，为什么人类的总产值、人口与科技力量直到最近五百年才突然像火箭一样垂直起飞？',
  },
  {
    id: 'sp-step-4',
    stepNumber: '第 4 步',
    title: '地图上的空白：承认无知如何与帝国、信用联姻？',
    shortLabel: '科学与资本联姻',
    chaptersRange: '第四部分 第14—16章',
    question:
      '公元1500年前的中国、印度与奥斯曼帝国既富饶又强大，为什么引爆现代科学、全球殖民与指数级增长的引擎偏偏在不起眼的西欧点火？',
    leadJudgment:
      '因为现代科学、欧洲帝国与资本主义这三股原本陌生的力量结成了互相喂养的铁三角：科学公开“承认无知”换取新力量，帝国为了填补地图空白砸钱资助探险研究，而资本主义则靠相信“未来大饼会变大”的信用系统源源不断预支资金。',
    paragraphs: [
      '古代文明大多假定圣贤与经典已经把宇宙真理写完，学问只是反复注经；而16世纪后的欧洲人却在世界地图上诚实留下了大片空白，承认“我们不知道”（ignoramus）。这份谦卑立刻转化成野心勃勃的征服欲：库克船长的军舰载着天文学家与植物学家，既为了科学观测，也顺手替大英帝国圈走澳洲；科研拿帝国的军费，帝国拿科学换来的枪炮、奎宁与地理图征服全球。',
      '而把这套机器推向永动机的第三条腿，是对未来的集体信仰——信用。只要相信科技与新航路会让明天的财富总盘子比今天更大，银行家与股份公司就敢把今天尚不存在的未来钱借给商人建厂造船，从而真正把大饼做大。不过赫拉利丝毫没有给资本主义戴上道德光环：从约翰·劳酿成的密西西比泡沫，到由跨国股份公司、银行与海军联手护航的残酷奴隶贸易，信用引擎只管把增长最大化，从来不自动附带正义与慈悲。',
    ],
    transitionNote:
      '当能源、信用与工厂把生产效率推高上百倍后，普通人的日常生活、家庭归属与内心感受，究竟是被这场现代革命解放了，还是被悄悄接管了？',
  },
  {
    id: 'sp-step-5',
    stepNumber: '第 5 步',
    title: '工业时刻表与快乐恒温器：空前的力量换来了幸福吗？',
    shortLabel: '工业化与快乐账',
    chaptersRange: '第四部分 第17—19章',
    question:
      '现代人享有史无前例的能源、和平、寿命与琳琅满目的商品，为什么赫拉利却敢质疑：五百年来人类整体的幸福感未必真的胜过祖先？',
    leadJudgment:
      '工业革命虽然靠能源转换解放了生产力、靠国家与市场瓦解了传统大家庭并换来空前的核子和平，但大脑由演化定死的生化“快乐恒温器”与消费主义不断抬高的期待值，让外在物质的暴增几乎立刻被焦虑吞噬。',
    paragraphs: [
      '工业化带来的改变远比几台机器深刻得多：铁路时刻表把人从太阳与季节里拽进了以分钟计费的精密钟表；工厂化农场把数十亿头有感知力的动物塞进流水线铁笼，制造了地球史上规模最大的物种苦难；国家与市场联手接管了教育、医疗与养老，让个体挣脱了父母宗族的束缚，却也把人变成孤零零依赖消费群体和民族国家两个“想象社群”的原子。同时，核威慑与知识经济虽然压低了现代战争致死率，但消费主义伦理把人类推入了永无止境的欲望跑轮。',
      '因此第十九章成了全书最沉静也最尖锐的回马枪：历史学家热衷计算帝国疆域和GDP，却忘了问“人有没有更快乐”。心理学证明幸福感取决于现实减去期待，而生物学更残酷地指出，血清素和多巴胺像恒温器一样会把任何狂喜拉回基线；哪怕你把现代空调搬回中世纪，兴奋也维持不了多久。赫拉利借此引出佛教的彻底拷问——如果我们连“快乐不是外在成就，而是内心对感受的执着”都没想透，盲目加速追求力量到底意义何在？',
    ],
    transitionNote:
      '既然外在物质满足永远追不上生化恒温器，手握科学权杖的现代人下一步会做什么？他们不再满足于改造外界，而是直接把手伸向了自己。',
  },
  {
    id: 'sp-step-6',
    stepNumber: '第 6 步',
    title: '荧光兔阿巴与终极之问：打破自然选择的“神”究竟想要什么？',
    shortLabel: '智人末日与终问',
    chaptersRange: '第四部分 第20章 + 后记',
    question:
      '既然智人用七万年走完了从非洲荒原到地球霸主的全部路程，历史接下来还会怎么演？如果连人类自身的身体、基因和大脑都可以被改写，智人还是智人吗？',
    leadJudgment:
      '40亿年来主宰地球生命的“自然选择”即将被“智能设计”取代——通过生物工程、仿生工程与无机生命三条路径，智人正在亲手终结自己作为碳基物种的历史，而最危险的隐患在于：我们握有神力，却根本不知道自己想要什么。',
    paragraphs: [
      '法国实验室为艺术家卡茨植入水母基因造出的绿色荧光兔阿巴（Alba），连同能用意念操控仿生手臂的杰西·沙利文以及仿真人脑的“蓝脑计划”，在赫拉利眼里绝非猎奇新闻，而是物种谢幕的钟声。以往所有历史变革不管多惨烈，人类的生物学硬件和喜怒哀乐都还是七万年前那副旧底板；但接下来，科学即将跨过改造自然与改造社会的门槛，直接改写生命代码、融合机器神经，甚至孕育出完全脱离有机肉身的无机智能。',
      '正因如此，全书最后没有落在一个关于科技奇迹的欢呼上，而是落在一记令人脊背发凉的哲学顿笔上：既然连我们的欲望本身很快都能被生物科技与算法重新设计，那么“我们想成为什么”已经不够问了，真正决定文明生死的问题是“我们究竟想要什么”。一个刚刚从动物演变成神、既贪得无厌又不肯对生态系统负责、甚至连自己欲望从何而来都不清楚的物种，正站在40亿年生命史最险峻的悬崖边。',
    ],
    transitionNote:
      '走完从东非草原到基因实验室的七万年全景后，我们还必须退后一步：赫拉利这套横跨生物、历史与哲学的宏大透镜究竟强在哪里，又有哪些容易让人被他带跑的解释盲区？',
  },
];

export const SAPIENS_BOUNDARY_COMPARISON: BoundaryComparison = {
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
    '其次，全书在部分关键判断上带有鲜明的修辞挑衅与时代局限：例如将农业革命直接称为“史上最大骗局”略过了农耕文明在漫长历史中积累的制度、医药与抗灾红利；2012—2014年写就的“核子和平让战争近乎过时”低估了大国地缘政治与意识形态的非理性回潮（作者本人在2018年《今日简史》中已作了明显修正）；此外，末尾对复活尼安德特人、仿生人与无机生命的推演极具哲学警世价值，但阅读时须分清“科学界已验证的工程事实”与“作者顺势拉远的未来思想实验”。',
  ],
};

export const SAPIENS_KEY_GROUPS: KeyGroupSection[] = [
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
      '这里浓缩了第三部分的宏大整合逻辑：金钱提供万用互信，帝国熔铸所谓“本土文化”，人文主义成为世俗宗教，而一切事后必然其实都只是二级混沌中的偶然。',
  },
  {
    id: 'sp-science',
    title: '无知的力量与神的迷惘：科学、快乐与智人终点',
    shortLabel: '16–20 科学与终点',
    rangeLabel: '16–20',
    question:
      '承认无知为何撬动了五百年力量井喷？当人类即将改写生命代码，真正悬而未决的终极漏洞是什么？',
    answerLead:
      '最后五条直击现代性的核心悖论：科学借帝国与信用起飞、工业化制造消费伦理与动物苦难，可生化恒温器让幸福原地踏步，手握神力的智人最终撞上了“不知道自己想要什么”的绝壁。',
  },
];

export const SAPIENS_KEY_INSIGHTS: KeyInsightItem[] = [
  {
    id: 1,
    indexLabel: '01',
    groupId: 'sp-cognition',
    chapterRef: '第1章',
    propositionZh:
      '在约10万年前智人仓促跃居食物链顶端之前，人类在长达200万年的时间里一直处于食物链中游，这种缺乏生态制衡的“暴发户式登顶”造就了人类深层的焦虑与残酷。',
    propositionEn:
      'Before Homo sapiens leaped abruptly to the top of the food chain about 100,000 years ago, humans spent two million years in the middle—and this sudden ascent without ecological checks bred deep anxiety and cruelty. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '打破“人类生来就是万物之灵”的古老傲慢。狮子和鲨鱼花了数百万年才爬上生态金字塔顶，生态系统与它们自身都演化出了克制与威严；而智人几乎是一夜之间从捡食骨髓的弱者坐上王座，既来不及习惯霸权，也从未学会善待脚下的世界。',
  },
  {
    id: 2,
    indexLabel: '02',
    groupId: 'sp-cognition',
    chapterRef: '第2章',
    propositionZh:
      '智人语言最独特的功能不是传递危险与八卦，而是能够谈论根本不存在的事物——唯有共同相信虚构故事，人类才能突破150人的熟人极限，实现陌生人之间的大规模灵活合作。',
    propositionEn:
      'The truly unique feature of Sapiens language is not gossip or warning of lions, but the ability to speak about things that do not exist—only shared fictions let humans cross the 150-person threshold for flexible mass cooperation. （回译）',
    conceptNote: '核心概念：认知革命 / 虚构故事（imagined reality）',
    quoteOrigin: 'back-translation',
    analysis:
      '这是全书第一根承重柱。从标致汽车这样的有限责任公司，到国家、货币与人权，全书后面所有制度奇迹都由此派生：黑猩猩只能和见过的同类合作，而智人只要相信同一个看不见的故事，就能把百万陌生人组织成同一条战线。',
  },
  {
    id: 3,
    indexLabel: '03',
    groupId: 'sp-cognition',
    chapterRef: '第2章',
    propositionZh:
      '自从认知革命以来，智人不再需要苦等数十万年的基因突变来改变社会行为，而是只要改写虚构故事，就能在一代人之内彻底重塑合作模式。',
    propositionEn:
      'Since the Cognitive Revolution, Sapiens no longer needed genetic mutations to alter social behavior; simply rewriting shared myths could transform cooperation within a single generation. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '解释了为什么“历史”能够从“生物学”里独立出来。法国大革命一夜之间把“君权神授”换成“主权在民”，靠的不是法国人DNA突变，而是故事换了剧本——文化演化由此甩开了蜗牛般的生物演化。',
  },
  {
    id: 4,
    indexLabel: '04',
    groupId: 'sp-cognition',
    chapterRef: '第3章',
    propositionZh:
      '采集社会在工时、营养多样性与抵御单一灾荒上堪称“最早的富裕社会”，普通采集者个体掌握的综合生存知识，往往远胜现代流水线上高度专精的个体。',
    propositionEn:
      'In working hours, dietary diversity, and resilience against famine, foraging bands formed the original affluent society, and each forager possessed a wider range of survival knowledge than most modern specialists. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '翻转了“越古老越悲惨”的线性进步错觉。虽然现代人类作为一个集体拥有核电站与互联网，但拆到单个个体头上，既不会辨认百种草药、也不懂生火织衣的现代白领，在个体生存带宽上反而不如三万年前的祖先。',
  },
  {
    id: 5,
    indexLabel: '05',
    groupId: 'sp-cognition',
    chapterRef: '第4章',
    propositionZh:
      '远在工业烟囱冒烟之前，手持石器与火把的智人踏上澳大利亚和美洲的几千年内就扫平了当地绝大多数大型动物，人类从走出非洲那一刻起就是地球生态的连环杀手。',
    propositionEn:
      'Long before industrial smokestacks, stone-age Sapiens wiped out most megafauna within millennia of reaching Australia and the Americas; humankind has been an ecological serial killer ever since leaving Africa. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '用澳大利亚24种50公斤以上动物灭绝23种、美洲大型哺乳动物惨遭腰斩的硬核考古记录，击碎了“史前祖先与自然和谐共生”的浪漫田园滤镜。',
  },
  {
    id: 6,
    indexLabel: '06',
    groupId: 'sp-agriculture',
    chapterRef: '第5章',
    propositionZh:
      '农业革命是史上最大的骗局：不是智人驯化了小麦，而是小麦驯化了智人，演化的尺度只算基因复制的数量，从来不顾单个生物是幸福还是受苦。',
    propositionEn:
      'The Agricultural Revolution was history’s biggest fraud: we did not domesticate wheat, wheat domesticated us—evolution measures success only by DNA copies, never by individual well-being. （回译）',
    conceptNote: '核心区分：演化成功 vs 个体幸福',
    quoteOrigin: 'back-translation',
    analysis:
      '全书最著名的思想震撼弹。一旦把“物种DNA总数暴增”和“普通人每天弯腰吃苦”这两本账拆开，不仅农业革命面目全非，后来工业畜牧业里数量暴涨却生不如死的数十亿头牛羊鸡鸭，也都在同一条冷酷逻辑下现出原形。',
  },
  {
    id: 7,
    indexLabel: '07',
    groupId: 'sp-agriculture',
    chapterRef: '第5章',
    propositionZh:
      '历史上的奢侈品往往很快变成必需品，并悄悄生出新的义务——一旦人类习惯了某种便利，就再也回不到没有它的过去。',
    propositionEn:
      'One of history’s few iron laws is that luxuries tend to become necessities and to spawn new obligations; once people get used to a luxury, they take it for granted and can no longer live without it. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '赫拉利把史前人类陷入耕作的轨迹与现代人发明电子邮件、智能手机却比祖先更忙碌的悖论直接连通：原以为省时间的新技术，最后总是把生活节奏推得更快、把原本的享受锁成脱不掉的刚需。',
  },
  {
    id: 8,
    indexLabel: '08',
    groupId: 'sp-agriculture',
    chapterRef: '第6章',
    propositionZh:
      '无论是宣称人分三等的《汉谟拉比法典》，还是宣告人人生而平等的《独立宣言》，在生物学意义上都不存在客观实体——它们同样是靠“主体间性”维系的想象秩序。',
    propositionEn:
      'Neither the Code of Hammurabi’s hierarchy nor the Declaration of Independence’s equality exists in objective biology; both are imagined orders sustained by intersubjective belief. （回译）',
    conceptNote: '核心概念：主体间性（intersubjective reality）',
    quoteOrigin: 'back-translation',
    analysis:
      '把现代人最神圣的信条放到古代法典旁边同台解剖，极具穿透力：承认“人权”和“平等”是想象建构，并不意味着要抛弃它们，而是逼迫我们清醒意识到——它们不会像万有引力那样自动存在，一旦人类停止相信并维护它们，它们就会瞬间坍塌。',
  },
  {
    id: 9,
    indexLabel: '09',
    groupId: 'sp-agriculture',
    chapterRef: '第7章',
    propositionZh:
      '人类留给后世的最早书面记录不是诗歌、哲学或国王颂歌，而是苏美尔泥板上“29086单位大麦、37个月、库辛”的财务签核——文字本来是人类意识的仆人，却一步步成了官僚体制的主人。',
    propositionEn:
      'The earliest surviving human text is neither poetry nor philosophy, but a Sumerian receipt reading "29,086 measures barley 37 months Kushim"—writing was born as a servant of bureaucracy and slowly became our master. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把“文字神圣起源说”拉回税务局账房。帝国为了记清田赋与债务，被迫把信息卸载出人脑；而当现实必须被翻译成表格、编号与数字才能被官僚系统看见时，人类也开始按数据系统的逻辑裁剪自己的人生。',
  },
  {
    id: 10,
    indexLabel: '10',
    groupId: 'sp-agriculture',
    chapterRef: '第8章',
    propositionZh:
      '生物学允许的可能性极其宽广，文化却总是强行禁止其中绝大部分——凡是真正“违反自然”的事情根本就不可能发生，需要立法规和道德去严厉禁止的，恰恰都是自然允许的。',
    propositionEn:
      'Biology enables, culture forbids: truly "unnatural" behavior is physically impossible, so whatever laws and taboos must furiously ban is precisely what nature allows. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '一句干净利落的逻辑拆弹器。人们总爱用“天经地义、合乎自然”替既定等级、性别分工或文化禁忌辩护；赫拉利反手指出，从来没有人需要立法禁止人类靠扇动胳膊飞上天，因为真正的自然法则根本不用道德警察来执法。',
  },
  {
    id: 11,
    indexLabel: '11',
    groupId: 'sp-unification',
    chapterRef: '第9章',
    propositionZh:
      '文化内部充满自相矛盾的信念绝非文明的缺陷，恰恰是“认知失调”逼迫人类不断思考、再评价与妥协，才成了推动文化演化的发动机。',
    propositionEn:
      'Internal contradictions within a culture are not fatal flaws; cognitive dissonance forces people to rethink, debate, and adapt, acting as the vital engine of cultural evolution. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '打破了对“逻辑完美统一文化”的执念。无论是中世纪的骑士荣誉与基督教忍让，还是现代社会的个人自由与社会平等，正是这套永远拧巴的内在张力，让人类文明没有僵死在某个静止教条里。',
  },
  {
    id: 12,
    indexLabel: '12',
    groupId: 'sp-unification',
    chapterRef: '第10章',
    propositionZh:
      '金钱是人类所创造出的最宽容、最普世的互信系统——它不问你的肤色、性别、信仰与国别，只要你相信别人会接受它，哪怕世仇之间也能立刻展开贸易。',
    propositionEn:
      'Money is the most universal and efficient system of mutual trust ever devised—indifferent to race, gender, creed, or nationality, it lets even sworn enemies cooperate as long as each trusts the other will accept it. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '直视金钱的矛盾魔力：它一边拆毁了神学与部落的高墙，成为统一世界的最强黏合剂；另一边又靠“万物皆可定价”的冷血腐蚀着忠诚、亲情与荣誉，逼着人类永远在信任金币与信任人心之间走钢丝。',
  },
  {
    id: 13,
    indexLabel: '13',
    groupId: 'sp-unification',
    chapterRef: '第11章',
    propositionZh:
      '帝国固然满手鲜血，但今天人们用来高呼“反抗殖民、守护纯正本土文化”的语言、建筑、饮食与观念，十有八九正是历代帝国强行融合留下的遗产。',
    propositionEn:
      'Empires were built in blood, yet most of the languages, institutions, cuisines, and ideals we now defend as "authentic local culture" are themselves the hybrid legacy of past empires. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '拒绝简单的好人坏人二元史观。把所有帝国遗产一刀切掉，印度连全国通用的铁路、民主议会与反殖民语言都会瞬间蒸发——历史从来不是纯洁原住民对抗邪恶帝国的童话，而是层层叠加的混血现场。',
  },
  {
    id: 14,
    indexLabel: '14',
    groupId: 'sp-unification',
    chapterRef: '第12章',
    propositionZh:
      '如果宗教指的是“建立在超人类秩序信仰上的人类规范体系”，那么现代世界并非告别了宗教，而是把神明换成了崇拜人性的自由主义、社会主义与演化人文主义。',
    propositionEn:
      'If religion is a system of human norms founded on belief in a superhuman order, modernity did not abolish religion—it merely replaced gods with humanist creeds worshiping humanity itself. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '打破“古代迷信宗教、现代纯粹理性”的自负。现代意识形态同样有经典、教条、异端审判和烈士，只是把至高权威从天上的上帝挪到了“人”的内心、集体或物种进化之上。',
  },
  {
    id: 15,
    indexLabel: '15',
    groupId: 'sp-unification',
    chapterRef: '第13章',
    propositionZh:
      '研究历史不是为了预测未来，恰恰相反，是为了把今天看起来“理所当然、别无选择”的现实还原成过去无数偶然岔路中的一条，从而把我们从过去的束缚里解放出来。',
    propositionEn:
      'We study history not to predict the future, but to widen our horizons—to realize that our present situation is neither natural nor inevitable, and that far more possibilities lie ahead than we imagine. （回译）',
    conceptNote: '核心概念：二级混沌系统（level-two chaotic system）',
    quoteOrigin: 'back-translation',
    analysis:
      '这是赫拉利给全书赋予的方法论灵魂。历史不是算命术，因为人类一旦听见预言就会改写行动；真正懂历史的人不会迷信“铁律”，而是看见每一座看似永恒的围墙当初其实都搭得颇为侥幸。',
  },
  {
    id: 16,
    indexLabel: '16',
    groupId: 'sp-science',
    chapterRef: '第14—15章',
    propositionZh:
      '科学革命不是知识的革命，而是无知的革命——真正的伟大发现是人类终于坦然承认“对最重要的问题我们其实一无所知”，并在世界地图上画出了大片引人远征的空白。',
    propositionEn:
      'The Scientific Revolution has not been a revolution of knowledge, but above all a revolution of ignorance: the great discovery was admitting that humans do not know the answers to their most important questions. （回译）',
    conceptNote: '拉丁箴言：ignoramus（我们不知道）',
    quoteOrigin: 'back-translation',
    analysis:
      '一针点破前现代与现代的思维分水岭。自以为答案全在经典里的人没有理由出海冒险；唯有承认地图上有大片空白、书本里没写尽世界的人，才会把科学观测、远洋船队与帝国野心焊成一台加速五百年的超级机器。',
  },
  {
    id: 17,
    indexLabel: '17',
    groupId: 'sp-science',
    chapterRef: '第16章',
    propositionZh:
      '现代经济得以爆炸增长的根基不是黄金储备，而是人类对“未来会更好”的集体信任——信用允许我们用尚不存在的未来财富，在今天就建起工厂与航船。',
    propositionEn:
      'The bedrock of modern economic growth is not gold reserves, but collective trust in the future—credit lets us build today’s factories and fleets using wealth that does not yet exist. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把枯燥的金融学翻成了心理史与思想史：前现代经济停滞不是因为古人懒惰，而是因为没人相信明天的大饼能比今天更大；一旦信任崩盘，约翰·劳的密西西比泡沫瞬间化作废纸，证明信用既是发动机也是定时炸弹。',
  },
  {
    id: 18,
    indexLabel: '18',
    groupId: 'sp-science',
    chapterRef: '第17—18章',
    propositionZh:
      '过去两百年里，国家与市场联手瓦解了维系人类数万年的家庭与地方社群，同时以“消费主义”取代一切传统节俭伦理，将人类推入一场永不停歇的现代革命。',
    propositionEn:
      'Over the past two centuries, the state and the market joined forces to dissolve the intimate family and local community that sustained humans for millennia, replacing age-old frugality with the supreme ethic of consumerism. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '解释了现代人“前所未有地自由，却又前所未有地孤独”的双重体验：你不再受家长和村社管束，却必须把生老病死托付给庞大的国家机器，把情绪安慰寄托在不断刷卡买来的消费身份上。',
  },
  {
    id: 19,
    indexLabel: '19',
    groupId: 'sp-science',
    chapterRef: '第19章',
    propositionZh:
      '财富、寿命与力量五百年来暴涨百倍，但演化把人类大脑的快乐基线设定成了类似空调的生化恒温器——单靠改造外在世界，永远填不满水涨船高的期待落差。',
    propositionEn:
      'Wealth, lifespan, and power surged a hundredfold over five centuries, yet evolution wired our brains with a biochemical happiness thermostat—transforming the outside world alone never closes the gap with rising expectations. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '这是全书最令人安静下来的一击。如果历史进步没有换来哪怕成比例的幸福感提升，那么一味狂奔的现代文明就必须正视自身的目的空洞——这也为全书末章对“直接改造大脑生化机制”的担忧埋下伏笔。',
  },
  {
    id: 20,
    indexLabel: '20',
    groupId: 'sp-science',
    chapterRef: '第20章 + 后记',
    propositionZh:
      '我们即将打破40亿年的自然选择，用智能设计把自己改造成全新的神明物种；然而拥有神的能力，却不负责任、贪得无厌、连自己想要什么都不知道，天下危险莫此为甚。',
    propositionEn:
      'We are about to break four billion years of natural selection and redesign ourselves into gods—yet is there anything more dangerous than dissatisfied and irresponsible gods who do not know what they want? （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书收尾的警世钟。真正棘手的不再是技术能不能做到（荧光兔、仿生臂与人工智能早已推开大门），而是人类在学会改写欲望之前，从未真正弄懂“我们究竟想要什么”。',
  },
];

export const SAPIENS_DATASET: BookReadingDataset = {
  ultimateThesis: SAPIENS_ULTIMATE_THESIS,
  overviewIntroQa: SAPIENS_OVERVIEW_INTRO_QA,
  chapters: SAPIENS_CHAPTER_PROPOSITIONS,
  argumentMapSteps: SAPIENS_ARGUMENT_MAP_STEPS,
  boundaryComparison: SAPIENS_BOUNDARY_COMPARISON,
  keyGroups: SAPIENS_KEY_GROUPS,
  keyInsights: SAPIENS_KEY_INSIGHTS,
};
