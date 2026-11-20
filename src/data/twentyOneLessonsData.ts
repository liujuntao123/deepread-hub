import type {
  ArgumentMapStep,
  BookReadingDataset,
  BoundaryComparison,
  ChapterProposition,
  KeyGroupSection,
  KeyInsightItem,
} from '../types/reading';

export const TWENTY_ONE_LESSONS_ULTIMATE_THESIS = {
  question:
    '如果只留下一句话把《今日简史》的序言与五大板块二十一章收束成一条核心行动脉络，赫拉利究竟给站在21世纪十字路口的当代人开出了什么诊断？',
  thesis:
    '当自由主义故事在2018年陷入幻灭、生物科技与人工智能的双重革命又开始具备“黑进人体”与重构就业的能力时，退回狭隘的民族主义、复古宗教或后真相泡泡都无法解决核战、生态崩溃与科技失控三大全球危机；在信息爆炸却多半无用的时代，清晰的见解本身就是力量——个人与社会唯有承认自身无知、拒绝盲从任何虚构大故事，并以心理韧性与深度自我觉察抢在算法之前读懂自己的心智操作系统，才不至于沦为数据独裁与历史愚蠢的牺牲品。',
  answerParagraphs: [
    '这句话之所以能统摄横跨就业、移民、恐怖主义、宗教、后真相与内观禅修的全部二十一章，是因为《今日简史》不再像《人类简史》那样回望过去，也不像《未来简史》那样遥望数百年后，而是把镜头死死锁在“当下这一代人必须面对的现实困境”。前半部（第一、二部分）先撕开两层剧烈错配：一方面，AI与生物传感正在把人类推向“无足轻重”、数据垄断与数字独裁；另一方面，人类的政治容器仍被锁在古老的民族国家、宗教身份与线上部落里，根本接不住三大全球性生存危机。',
    '后半部（第三至第五部分）则转向认知防卫与个体自救：面对恐怖主义的戏剧挑衅、战争的愚蠢诱惑、部落偏见的知识错觉以及“10亿人信千年就成宗教”的后真相迷雾，赫拉利开出的药方既不浪漫也不廉价——向外要以世俗的谦逊与全球协作去对冲偏执与盲信，向内则把教育重心转向4C与终身重塑，并直白建议读者通过如实观察自身痛苦与心智（如内观禅修）看穿一切虚构故事的剧本，赶在科技巨头和政府算法之前，先亲手认识自己。',
  ],
};

export const TWENTY_ONE_LESSONS_OVERVIEW_INTRO_QA = {
  question:
    '全书以一篇序言开篇，下设科技颠覆、政治挑战、绝望与希望、真相、生存下去五大板块共二十一章，赫拉利怎样把这些看似零散的当代热点议题编织成一套递进逻辑？',
  answerLead:
    '这二十一章表面上像一份包罗万象的当代议题清单，骨子里却沿着一条清晰的五步诊治路径推进：先诊断自由主义失灵与科技颠覆（1—4章），再戳穿旧政治容器为何无力应对全球挑战（5—9章），接着清理恐慌、傲慢与教条三大心理毒素（10—14章），继而揭开人类天生无知与后真相洗脑机（15—18章），最后落回教育、人生意义与自我觉察的个体生存指南（19—21章）。以下依全书序言与二十一章逐篇梳理，并标明原文边界外的引申与保留标注。',
};

export const TWENTY_ONE_LESSONS_CHAPTER_PROPOSITIONS: ChapterProposition[] = [
  {
    id: 'tl-00',
    indexLabel: '序',
    chapterTitle: '序：清晰的见解就是力量',
    part: 'preface',
    partLabel: '序言',
    shortLabel: '序：清晰的见解',
    coreProposition:
      '在一个信息爆炸却多半无用的世界里，清晰的见解本身就是力量——历史绝不会因为你忙着谋生育儿而对你手下留情。',
    narrative:
      '开篇序言直击现代普通人的真实窘境：大多数人每天忙于上班、照顾孩子和年迈双亲，根本抽不出时间研究人工智能或气候政治；可赫拉利冷峻提醒，即便你因忙碌而缺席关于人类未来的辩论，历史照样会把最终账单砸在你和孩子头上。历史学家给不了面包和衣服，能做的是在无用噪音的洪流中劈开一条清晰视野，让更多人有机会平等参与决定人类命运的公共讨论。',
  },
  {
    id: 'tl-01',
    indexLabel: '01',
    chapterTitle: '第1章 理想的幻灭：从旧故事到新故事',
    part: 'part1',
    partLabel: '第一部分 科技颠覆',
    shortLabel: '理想的幻灭',
    coreProposition:
      '从1938年的三个全球大故事一路跌至2018年的归零，自由主义在赢得20世纪后却遭遇生物科技与信息技术的双重夹击，陷入了没有新剧本可讲的深层迷惘。',
    narrative:
      '人类靠故事而非事实来思考。赫拉利用四个历史截面勾勒出当代人的精神真空：1938年人类还有法西斯、共产主义和自由主义三种全球故事可选；1968年剩下两种；1998年自由主义似乎一统天下；到了2018年，这个数字骤降为0。全球化与2008年金融危机让大批民众觉得自由主义只是精英的骗局，更致命的是，基因工程和人工智能的合流正准备把亿万人甩出就业与政治舞台——自由主义当年靠吸收工人福利、反抗纳粹浴火重生，但面对如今这场不流血却彻底改写人性的科技革命，连精英自己也交不出像样的新故事。',
  },
  {
    id: 'tl-02',
    indexLabel: '02',
    chapterTitle: '第2章 就业：等你长大，可能没有工作',
    part: 'part1',
    partLabel: '第一部分 科技颠覆',
    shortLabel: '就业与无用阶级',
    coreProposition:
      '2017年AlphaZero用4小时零基础自学击败人类千年棋谱，预示人工智能凭连通性与可更新性将重塑整个劳动力市场，普通人面临的噩梦不再是被剥削，而是沦为“无足轻重”。',
    narrative:
      '人们总安慰自己“自动化淘汰旧工作，就会创造新工作”，可赫拉利指出这次不一样：人工智能拥有人类绝无可能企及的两大优势——“连通性”（一台自动驾驶学会新路况，全球车队瞬间同步）与“可更新性”（软件一键升级，医生却要重读十年医学院）。2017年12月7日，谷歌AlphaZero每秒只计算8万步、不教任何人类棋谱，仅凭4小时自我对弈就击败了每秒算7000万步的Stockfish 8，甚至走出了连顶尖大师都惊叹的“创意棋”。哪怕未来冒出新岗位，失业的卡车司机也很难在40岁转行写虚拟世界代码。至于流行的“全民基本收入（UBI）”，赫拉利一针拆穿两大难题：“全民”究竟只管本国公民还是管孟加拉纺织工？“基本”又该如何界定才不至于让人在被剥夺尊严和意义感后陷入抑郁？',
  },
  {
    id: 'tl-03',
    indexLabel: '03',
    chapterTitle: '第3章 自由：数据霸权与社会公平',
    part: 'part1',
    partLabel: '第一部分 科技颠覆',
    shortLabel: '自由与数字独裁',
    coreProposition:
      '当生物监测与算力联手实现“比你更了解你自己”时，自由意志与民主选举将面临被算法静默接管的危险，21世纪头号政治威胁是集中数据处理驱动的“数字独裁”。',
    narrative:
      '2017年10月，一名巴勒斯坦工人在推土机前自拍并配阿拉伯文“早安（Ysabechhum）”，却被平台自动翻译误判成“杀光他们（Ydbachhum）”，害得他险些被当成恐怖分子逮捕。赫拉利既展示当前算法的愚蠢，更警告它一旦跨过“读懂人类情绪与生化反应”的门槛会有多致命：连自动驾驶汽车的“电车难题”都会把哲学从书斋拽进代码（对比1970年12月普林斯顿神学院“好撒玛利亚人”实验里，赶去演讲道德的神学生竟纷纷跨过路边呻吟的求助者）。更深层的警报在于，过去极权政权败给民主是因为集中处理数据太慢，可21世纪人工智能反过来让集中式数据处理比分散市场更高效——一旦少数寡头或政权拿捏住你的心跳、血压与消费弱点，选举和自由就会沦为被幕后操控的木偶戏。',
  },
  {
    id: 'tl-04',
    indexLabel: '04',
    chapterTitle: '第4章 平等：谁该拥有数据',
    part: 'part1',
    partLabel: '第一部分 科技颠覆',
    shortLabel: '谁该拥有数据',
    coreProposition:
      '人类最重要的资产已从古代的土地、近代的机器演变为今天的数据；如果不尽早规范数据所有权，数据垄断将与生物工程合谋制造出史上最悬殊的生物阶层鸿沟。',
    narrative:
      '历史上的政治斗争核心始终围绕“头号资产归谁所有”：农业时代贵族垄断土地，工业时代资本家垄断机器，到了21世纪，科技巨头正以提供免费邮件、视频和社交的甜头，静悄悄地收割全球数十亿人最值钱的新矿产——个人行为与生物数据。赫拉利强调，数据与土地、机器截然不同，它能瞬间复制、极速跨国流动且聚合效应极强；我们目前连“如何防止数据过度集中又不扼杀创新、不滑向国家全盘监控”的制度蓝图都还没画出来，但这恰恰是决定未来人类是走向生物种姓制还是守住平等底线的关键战场。',
  },
  {
    id: 'tl-05',
    indexLabel: '05',
    chapterTitle: '第5章 社群：人类身体的价值',
    part: 'part2',
    partLabel: '第二部分 政治挑战',
    shortLabel: '线下社群与身体',
    coreProposition:
      '算法可以替我们匹配点赞和网聊，却无法替代有血有肉的线下亲密社群；科技巨头一边卖“连接全球”的承诺，一边把活生生的身体降格成盯着屏幕的流量容器。',
    narrative:
      '脸谱网等科技巨头在遭遇信任危机后纷纷宣称要“重建人类社群”，可赫拉利犀利点出其中的商业悖论：传统熟人社群靠的是邻居在厨房里一起切菜、生病时登门端碗汤这种耗费真实肉身时间的长期相处；而互联网平台的盈利模式恰恰靠把人的注意力从现实身体拽回屏幕、不断挑动愤怒与点赞。一旦线上连接取代了线下拥抱，人类既失去抵御孤独的肉身缓冲带，也更容易被屏幕背后的商业与政治力量逐个击破。',
  },
  {
    id: 'tl-06',
    indexLabel: '06',
    chapterTitle: '第6章 文明：世界的大同',
    part: 'part2',
    partLabel: '第二部分 政治挑战',
    shortLabel: '文明冲突的幻觉',
    coreProposition:
      '所谓水火不容的“文明冲突”是一种糟糕的生物学误用——从奥运会、主权国家、美元到现代医院，今天几乎全人类早已共享同一套单一的全球文明。',
    narrative:
      '亨廷顿式的“文明冲突论”常把不同文化比作互不相容的生物物种，赫拉利却用“德国人和大猩猩”一举戳穿这个比喻：真正基因不同的是人与大猩猩，而中世纪根本不可能举办奥运会（当时各国连国旗、国歌、统一公制和民族国家概念都没有），今天无论伊朗、美国、中国还是巴西，全都在玩同一套主权国家、民族主义、银行美元、现代物理和抗菌医学游戏。哪怕极端原教旨主义者嘴上骂着西方现代性，手里拿的却是现代步枪、美元现钞和社交媒体——当下冲突不是古老文明的殊死碰撞，而是同一座全球文明内部不同家族的激烈争吵。',
  },
  {
    id: 'tl-07',
    indexLabel: '07',
    chapterTitle: '第7章 民族主义：无法解决全球性问题',
    part: 'part2',
    partLabel: '第二部分 政治挑战',
    shortLabel: '民族主义的局限',
    coreProposition:
      '温和的爱国主义曾帮助陌生人共建医院和学校，但面对核战争、生态崩溃与颠覆性科技失控这三大全球性生存危机，任何国家关起门来高喊“本国优先”都无济于事。',
    narrative:
      '赫拉利并没有全盘妖魔化民族主义——他承认温和的民族认同像“照顾家人的延伸”，让互不相识的纳税人愿意资助素未谋面的同胞。但人类如今撞上了三座必须全地球联手才能翻越的大山：核按钮不会尊重国界线，二氧化碳排放不分护照国籍，而如果各国在人工智能与基因编辑上展开“谁先不管伦理谁先赢”的军备竞赛，任何一国抢跑都会把全人类拖下深渊。面对地球这艘漏水的宇宙飞船，如果政客只顾着煽动民族排外、拒绝对全球规则妥协，最终只能一起沉船。',
  },
  {
    id: 'tl-08',
    indexLabel: '08',
    chapterTitle: '第8章 宗教：神祇只是为国家服务',
    part: 'part2',
    partLabel: '第二部分 政治挑战',
    shortLabel: '宗教侍奉民族主义',
    coreProposition:
      '传统宗教既给不出基因编辑的技术方案，也提供不了现代金融的政策工具，如今它们在现实政治中大多只剩下一个角色——像婢女一样替民族主义提供身份边界与情绪动员。',
    narrative:
      '21世纪确实出现了宗教复兴，可赫拉利按“技术问题、政策问题、身份认同问题”三层逐一筛查，发现传统经书几乎帮不上任何实务忙：现代农民不会去查《圣经》里的“基督教农业”来抗旱，中东银行家也绕不开现代金融学，没有哪本古代经典能回答人工智能失业或基因专利怎么立法。传统宗教之所以依然声势浩大，全在于它擅长在沙地上画出一条“我们 vs 他们”的不可跨越的身份红线，并迅速被现代民族国家收编，沦为替地缘政治和民族冲突加油助威的贴身婢女。',
  },
  {
    id: 'tl-09',
    indexLabel: '09',
    chapterTitle: '第9章 文化认同：开放与宽容',
    part: 'part2',
    partLabel: '第二部分 政治挑战',
    shortLabel: '移民与文化主义',
    coreProposition:
      '围绕移民的尖锐撕裂不是“宽容好人 vs 排外坏人”的道德剧，而是三项隐性契约条款的现实博弈，而原本臭名昭著的生物学“种族主义”正悄悄换装为以文化优劣划线的“文化主义”。',
    narrative:
      '面对欧洲与全球的移民风暴，赫拉利拒绝站队喊口号，而是把移民争论冷静拆成三条具体合同条款：东道国允许移民入境、移民至少接受东道国核心价值观、若融入足够充分最终成为平等公民。支持派与反对派其实是在争执“接收移民是义务还是恩惠”“同化底线划在哪”“融合期要多久”。同时他敏锐指出，今天很少有人再公开宣称黑人或白人基因低劣，但“文化主义”却大行其道——把特定文化群体视为铁板一块的落后包袱；虽然文化差异确实客观存在，但若把复杂历史习惯固化成排他标签，就会重蹈种族主义的覆辙。',
  },
  {
    id: 'tl-10',
    indexLabel: '10',
    chapterTitle: '第10章 恐怖主义：切忌反应过度',
    part: 'part3',
    partLabel: '第三部分 绝望与希望',
    shortLabel: '恐怖主义戏剧逻辑',
    coreProposition:
      '恐怖主义本质上是弱者策划的“恐怖戏剧”，其直接杀伤力微乎其微，真正致命的武器是像“大空瓶里的小硬币”一样制造巨大回响，诱使现代强权反应过度、自我伤害。',
    narrative:
      '从统计数字看，全球每年死于恐怖袭击的人数与交通事故、糖尿病或空气污染相比不过沧海一粟；一个恐怖组织根本不可能靠几枚炸弹摧毁一个现代大国。可为什么恐怖分子仍屡屡得手？因为他们深谙现代国家的合法性软肋——现代国家承诺彻底消除国内政治暴力，于是哪怕一枚小硬币掉进原本寂静的大空瓶里也会发出震耳欲聋的巨响。恐怖分子就像试图把大象激怒、让大象自己踩碎瓷器店的苍蝇：他们故意挑起镜头前的惨剧，逼着愤怒的政府发动代价高昂的战争、侵犯公民自由、重新洗牌地缘格局。对抗恐怖主义最有效的三招恰恰是冷静克制、幕后情报精准反制，以及媒体与公众拒绝替恐怖分子免费扩音。',
  },
  {
    id: 'tl-11',
    indexLabel: '11',
    chapterTitle: '第11章 战争：永远不要低估人类的愚蠢',
    part: 'part3',
    partLabel: '第三部分 绝望与希望',
    shortLabel: '切忌低估人类愚蠢',
    coreProposition:
      '虽然知识经济和核武器让发动大规模侵略战争在账面上早已变成血本无归的赔本买卖，但历史反复证明，人类的傲慢与集体愚蠢照样能把理性算盘踢翻。',
    narrative:
      '赫拉利在这里对自己在《人类简史》里偏乐观的“和平时代论”做了极其诚实的自我补丁：没错，今天抢占硅谷大楼抢不走工程师脑子里的算法，核大国开战更是同归于尽，在战争中“取胜”几乎成了失传的艺术（哪怕2014年俄罗斯轻松拿下克里米亚，也随即激起了周边反弹与漫长制裁）。但问题在于，历史从来不是由绝对理性的计算器主宰的——一战爆发前、1904年日俄战争前，无数大国领袖都误以为能靠一场干脆利落的闪电战扬威立万，结果亲手拉响了“愚蠢进行曲”。和平绝不是自动锁死的自然规律，一旦民族自负、领袖误判与军备盲冲合流，人类随时可能亲手把第三次世界大战拖回现实。',
    extensionOrInference: {
      kind: '引申',
      text: '写于2018年的这一章在随后数年地缘战火重燃的现实中显得格外警醒：它提醒读者永远不要单凭“经济理性账本”去断言战争绝不会发生。',
    },
  },
  {
    id: 'tl-12',
    indexLabel: '12',
    chapterTitle: '第12章 谦逊：地球不是绕着你转',
    part: 'part3',
    partLabel: '第三部分 绝望与希望',
    shortLabel: '打破自我中心傲慢',
    coreProposition:
      '几乎每个民族、宗教和文明都曾宣称自己是人类道德与宇宙真理的唯一中心，而考古与世界史无情地证明：早在《圣经》和任何现存大国出现之前，人类就已拥有伦理、艺术与文明。',
    narrative:
      '赫拉利用一则颇带自嘲的犹太拉比故事和“弗洛伊德的母亲”笑话，对包括自己出身的犹太传统在内的所有文化自大开火：希腊人觉得自己发明了历史与民主，中国人、印度人、基督徒、穆斯林与犹太人各自宣称自家先祖是全球道德的源头——甚至有神棍一本正经谈论“犹太教物理学”或“基督教生物学”。可真实历史却是，远在亚伯拉罕或一神教诞生前数万年，人类采集部落就已懂得互助、同情、禁忌与正义，甚至黑猩猩和大象族群都有原始互惠伦理。真正的成熟始于谦逊：承认自己的族群和信仰不过是人类长河中后来加入的一朵浪花，宇宙并不是绕着自己旋转的。',
  },
  {
    id: 'tl-13',
    indexLabel: '13',
    chapterTitle: '第13章 神：不要妄称神的名',
    part: 'part3',
    partLabel: '第三部分 绝望与希望',
    shortLabel: '神与无神论伦理',
    coreProposition:
      '讨论“神”时必须把代表宇宙终极奥秘的“神秘之神”和替人间戒律背书的“世俗立法之神”彻底切开；道德从来不需要靠敬畏某个具体神明才能成立，它的根基是减少痛苦的同理心。',
    narrative:
      '每当有人争论“上帝存不存在”，双方往往鸡同鸭讲：一方面是对宇宙起源与存在奥秘的哲学敬畏（我们对其一无所知），另一方面则是各种经典里具体规定女性该穿什么、周几该休息、该憎恨谁的“具象立法神”。赫拉利尖锐质问：你绝不能一边借着“神秘之神”的不可知来躲避科学反驳，一边又拿“立法之神”的名义去压迫他人或发动圣战。至于“不信神就会道德沦丧”的常见指责，他干脆回应：道德不是为了讨好天上裁判而遵守的死规矩，而是出于减少真实生命痛苦的自然同理心——无数无神论者与世俗社会照样比中世纪宗教裁判所更温和、更守信。',
  },
  {
    id: 'tl-14',
    indexLabel: '14',
    chapterTitle: '第14章 世俗主义：面对你的不完美',
    part: 'part3',
    partLabel: '第三部分 绝望与希望',
    shortLabel: '世俗主义与阴影',
    coreProposition:
      '世俗主义绝不是消极的“反宗教”，而是一套以真理、同情、平等、自由、勇气与责任为支柱的积极伦理——它最大的优势在于敢于承认自己的不完美与历史阴影，并凭证据不断纠错。',
    narrative:
      '很多人把世俗主义误解成冷冰冰的虚无主义，赫拉利却郑重勾勒出世俗伦理的六大核心承诺：以客观证据而非盲信追求真理、以减少众生苦痛为准则的同情、拒绝先天高人一等的平等、敢于质疑权威的自由、承认无知与认错的勇气，以及不把责任推给神意或宿命的现实担当。他同样不回避世俗运动在20世纪滑向教条主义与极权灾难（如斯大林主义或激进科学主义）的黑暗阴影——但恰恰因为世俗伦理不宣称自己握有神颁布的绝对无谬真理，它才保留了直面阴影、公开认错和自我修复的宝贵通道。',
  },
  {
    id: 'tl-15',
    indexLabel: '15',
    chapterTitle: '第15章 无知：你知道的比你想象的少',
    part: 'part4',
    partLabel: '第四部分 真相',
    shortLabel: '知识的错觉与盲区',
    coreProposition:
      '现代人普遍深陷“知识的错觉”：我们连拉链的工作原理都讲不清楚，却把他人大脑里的专业知识错当成自己的见识，而在“群体思维”与“权力的黑洞”笼罩下，连顶尖领袖也往往听不到真话。',
    narrative:
      '心理学家史蒂文·斯洛曼与菲利普·费恩巴赫做过一项经典实验：先让受试者给“自己有多懂拉链”打分，大家自信满满；接着请他们一步步解释拉链的机械原理，绝大多数人瞬间哑口无言。这就是“知识的错觉”——人类自古靠“群体思维”分工活命，错把别人的知识当成了自己的。在复杂现代世界里，单靠个人查证几乎不可能搞懂核物理、气候模型和国际贸易，而身居高位的领袖更惨：他们深陷“权力的黑洞”，权力越大，周围阿谀奉承扭曲真相的引力就越强，导致掌权者往往比普通人更晚看清现实。',
  },
  {
    id: 'tl-16',
    indexLabel: '16',
    chapterTitle: '第16章 正义：人类的道德困境',
    part: 'part4',
    partLabel: '第四部分 真相',
    shortLabel: '正义与复杂因果链',
    coreProposition:
      '智人的道德直觉是为几十人狩猎采集部落演化出来的，在面对横跨五大洲、层层嵌套的现代金融与供应链体系时，我们的正义感彻底失灵，甚至不知自己在无意间参与了哪场“偷走河流”。',
    narrative:
      '狩猎采集者一眼就能看清午餐来自哪棵树、鹿皮鞋是谁缝的、谁偷了邻居的矛；可现代人每天早上喝一杯咖啡、买一件打折衬衫、让养老基金投资全球股市，完全不知道自己无意间是否正资助着远方的血汗工厂、热带雨林砍伐或水资源掠夺。我们的道德大脑天生只对看得见摸得着的“面对面偷窃”敏感，对复杂系统性的“偷走河流”却一片麻木。面对尺度失配，人类常犯四种偷懒毛病：缩小问题规模、编造替罪羊阴谋论、躲进神圣教条，或者干脆闭眼不看——可真正解决现代不公，只能靠提升认知复杂度与制度透明度，绝不能指望原始情绪直觉。',
  },
  {
    id: 'tl-17',
    indexLabel: '17',
    chapterTitle: '第17章 后真相时代：谎言万世永存',
    part: 'part4',
    partLabel: '第四部分 真相',
    shortLabel: '后真相与洗脑机',
    coreProposition:
      '人类从来就是一种“后真相物种”——如果1000个人相信一个编造故事一个月，那是假新闻；如果是10亿人相信它1000年，那就成了不容冒犯的宗教或神圣信仰。',
    narrative:
      '人们总痛叹社交媒体把我们拖进了史无前例的“后真相时代”，赫拉利却冷静提醒：智人征服地球靠的本来就是集体虚构，从古代神王神话到现代商业广告，真相从来都不是人类物种的头号优先项——权力、凝聚力与集体归属感常常压倒事实。但这并不意味着真假毫无区别，也不意味着我们该放弃追求真相。如何走出无处不在的“洗脑机”？赫拉利给出了两条极其务实的检验法：第一，如果你真想得到可靠信息，就别指望免费午餐，愿意为独立高质量新闻付费（否则你自己就是被卖给广告商和政客的商品）；第二，如果某个议题真的事关重大，别只刷社交媒体碎片，花力气去读经得起同行评议的严谨科学文献。',
  },
  {
    id: 'tl-18',
    indexLabel: '18',
    chapterTitle: '第18章 未来不是科幻小说：无法逃离的母体',
    part: 'part4',
    partLabel: '第四部分 真相',
    shortLabel: '科幻误区与母体',
    coreProposition:
      '大众科幻作品因为要把复杂科技危机拍成好莱坞个人英雄剧，往往错把风险简化成“有意识的机器人造反”，反而掩盖了真正迫近的威胁——无意识算法顺着人体生化弱点悄悄接管大脑。',
    narrative:
      '对多数公众而言，关于AI和生物科技的风险认知不是来自科学论文，而是来自《黑客帝国》《终结者》等科幻电影。赫拉利指出，影视剧为了票房与戏剧冲突，习惯把人工智能写成产生自我意识、发动叛乱的大反派，或者把《黑客帝国》拍成逃出虚拟盒子回到“真实自我”的英雄冒险——却忘了即便逃出外在盒子，人类自己大脑里由情绪与神经递质编织的“内在母体”照样操控着我们。连皮克斯与迪士尼的《头脑特工队》都已经悄然抛弃了“完美自由意志”，把小女孩莱莉的大脑拍成五种生化情绪按钮轮流掌舵的控制室——未来的真正危机不是机器人拿枪追杀你，而是算法比你更懂怎么按下你大脑里的情绪开关。',
  },
  {
    id: 'tl-19',
    indexLabel: '19',
    chapterTitle: '第19章 教育：改变是唯一不变的事',
    part: 'part5',
    partLabel: '第五部分 生存下去',
    shortLabel: '教育4C与自我重塑',
    coreProposition:
      '没人知道2050年的世界长什么样，继续向孩子灌输死记硬背的过时技能无异于灾难；21世纪教育的核心必须转向“4C”通用能力、终身自我重塑的心理韧性，以及抢在算法“黑进人体”之前先读懂自己。',
    narrative:
      '几百年来学校一直按工业流水线模式训练孩子：前半生学一门手艺，后半生吃一辈子。但在变化速度史无前例的21世纪，今天学校里教的具体编程语法或专业知识，等到孩子40岁时多半早已过时。赫拉利呼应教育专家提出的“4C”——批判性思考（critical thinking）、沟通（communication）、合作（collaboration）与创意（creativity），并强调更深层的护城河是情绪平衡与终生不断学习、放弃旧身份、重塑自我的心理弹性。他对15岁少年给出了三句极具冲击力的忠告：不要盲信大人（他们懂的是旧世界），不要盲信技术（若你不知道自己想要什么，技术就会替你塑形），也别轻易盲信自己“内心的声音”——唯有趁早认清自己这套心智操作系统，才不会被政府宣传和商业算法轻易黑进大脑。',
  },
  {
    id: 'tl-20',
    indexLabel: '20',
    chapterTitle: '第20章 意义：人生不是虚构的故事',
    part: 'part5',
    partLabel: '第五部分 生存下去',
    shortLabel: '人生不是虚构故事',
    coreProposition:
      '历史上所有宏大意识形态与宗教都是人类编织的不完整故事，经不起终极逻辑拷问；检验什么是“真实”而非虚构的唯一铁标准，就是“它会不会感到痛苦”。',
    narrative:
      '人类渴望在某个宏大宇宙剧本里领一个有意义的角色，从神明救赎、民族复兴到浪漫爱情，人们总试图靠身份组合和仪式（赫拉利戏称连在赫尔辛格超市买东西的普通人也同时混搭着多种相互矛盾的故事）来填补空虚。但所有宏大故事都经不起追问“谁给了屋顶支撑”，也往往靠要求信徒“奉献牺牲”把虚假剧本钉死在血肉上。那么抛弃虚构大故事之后，我们就会跌进虚无吗？赫拉利给出了极具力量的“现实的考验”：国家不会受苦，品牌不会流泪，欧元和经书没有神经末梢——只有活生生的有情众生会真正感到痛苦。因此，人生真正紧迫的根本问题从不是“我在哪部虚构大戏里演什么角色”，而是“如何看清实相、减轻真实存在的痛苦”。',
  },
  {
    id: 'tl-21',
    indexLabel: '21',
    chapterTitle: '第21章 重新认识自己：人类心智的奥秘',
    part: 'part5',
    partLabel: '第五部分 生存下去',
    shortLabel: '内观与重新认识自己',
    coreProposition:
      '面对随时可能黑进人脑的算法时代，“认识你自己”不再只是哲学家的闲情逸致，而是关乎生存的紧迫自救——通过内观禅修如实观察自身呼吸与感受，是人类在不依赖外部故事的前提下直面心智实相的一条朴素路径。',
    narrative:
      '全书收官一章罕见地褪去宏大历史学家外衣，写下了赫拉利自己的私密实践：2000年4月，他在好友罗恩劝说下勉强参加了一场为期10天的内观（Vipassana）禅修，此后坚持每天静坐两小时、每年闭关一两个月。他特别澄清，内观不是逃避现实的新世纪神秘主义，而是一场把实验室搬进自己意识内部的清醒观察——不靠编故事、不靠念咒语，只是如实观察鼻孔的呼吸、身体的酸痒与情绪的生起和消散，从而亲眼看穿痛苦并非来自外界事件本身，而是来自大脑对外界感受永不满足的贪爱与嗔恨反应。在外部算法即将比我们更懂我们欲望的前夜，我们必须赶在它们之前，亲自走近自己心智的本来面目。',
    extensionOrInference: {
      kind: '保留标注',
      text: '将内观禅修作为全书二十一章的最终收束，带有鲜明的作者个人哲学偏好；对当代社会而言，个体心智觉察固然可贵，但面对数据垄断、就业冲击与核生态危机，单靠个人冥想远远不够，它必须与公共制度监管、全球治理协作并轨前行。',
    },
  },
];

export const TWENTY_ONE_LESSONS_ARGUMENT_MAP_STEPS: ArgumentMapStep[] = [
  {
    id: 'tl-step-1',
    stepNumber: '第 1 步',
    title: '从3到0的故事归零与AlphaZero：科技如何掀翻自由主义的旧桌子？',
    shortLabel: '幻灭与就业冲击',
    chaptersRange: '序 + 第一部分 第1—2章',
    question:
      '为什么1998年还被视为“历史终结”的自由主义故事，短短二十年后的2018年就在全球陷入迷惘？这次AI与生物科技的颠覆，和过去蒸汽机淘汰马车到底有什么本质不同？',
    leadJudgment:
      '1938到2018年间全球大叙事从3个一路归零，根本原因在于自由主义赖以运转的“普通人不可或缺”前提正在被人工智能的连通性与可更新性瓦解——人们面对的不再是旧式的阶级剥削，而是随时失去经济价值的“无足轻重”。',
    paragraphs: [
      '开篇序言先敲响警钟：在一个信息爆炸却多半无用的世界，清晰的见解本身就是力量，即便你忙着谋生育儿而缺席关于人类未来的辩论，历史也不会放过你。紧接着第1章点破了当代精神危机的全景：1938年人类还有法西斯、共产主义与自由主义三个全球故事，1968年剩两个，1998年只剩自由主义独大，到2018年竟归零了——人们隐约感到全球化与自动化正把大多数人抛在身后，却找不到新剧本。',
      '2017年12月7日的棋盘现场把这场冲击具象到了极致：谷歌AlphaZero没有任何人类棋谱指导，每秒只算8万步，仅凭4小时自我学习就击败了每秒算7000万步的传统冠军Stockfish 8，还走出颠覆人类直觉的“创意招法”。由于AI拥有“一机学会、全网同步”的连通性与一键升级的可更新性，即便未来诞生新工种，中年失业的卡车司机和职员也很难反复跨界转型；就连寄予厚望的全民基本收入（UBI），也卡死在“全民究竟包不包括外国工人”与“失去社会角色尊严后基本生活怎么算”两道难题上。',
    ],
    transitionNote:
      '如果失业只是经济账，那还有更让人脊背发凉的政治账：当算法不仅抢走工作，还开始接管我们的信息流、判断力和心跳数据时，个人自由与社会平等会变成什么样？',
  },
  {
    id: 'tl-step-2',
    stepNumber: '第 2 步',
    title: '推土机前的“早安”与数据矿产：算法霸权如何改写自由与平等？',
    shortLabel: '数据霸权与独裁',
    chaptersRange: '第一部分 第3—4章',
    question:
      '如果算法今天连阿拉伯文的“早安”都能错译成“杀光他们”，我们为什么反而要担心它会比我们更了解自己，甚至催生21世纪的“数字独裁”与生物不平等？',
    leadJudgment:
      '机器的荒谬失误只是初级阶段，真正颠覆自由与平等的是“生物知识×算力×数据”的合流——一旦集中式数据处理在效率上压倒分散民主，而少数巨头与国家又垄断了全人类的数据矿产，政治权威与生物优势就会被永久锁死在极少数人手里。',
    paragraphs: [
      '2017年10月，一名巴勒斯坦工人在推土机前自拍配文“早安（Ysabechhum）”，竟被平台算法误译成“杀光他们（Ydbachhum）”导致被安全部队逮捕。赫拉利先拿这桩荒唐案提醒大家别神化当下的笨拙AI，但紧接着把锋芒指向更深处：自动驾驶的“电车难题”正在把伦理学写成代码，而1970年普林斯顿神学院“好撒玛利亚人”实验证明人类在紧急情绪下同样脆弱不堪。过去独裁体制输给民主，是因为官僚集中处理百万人的信息太慢；21世纪AI却让集中监控和实时精准干预反超分散体制，催生前所未有的“数字独裁”风险。',
      '决定未来走向的头号资产已从古代土地、近代机器彻底切换为今天的数据。普通人为了免费视频、邮箱和导航，正欢天喜地把最私密的生物与行为数据拱手送给寡头平台。如果不及时在制度上回答“数据究竟该归个人、企业还是国家”，数据垄断叠加基因与脑机升级技术，就可能把贫富差距固化为人类史上头一遭的“生物阶级分化”。',
    ],
    transitionNote:
      '面对如此排山倒海的全球科技风暴，各国政客与民众的本能反应却往往是回头抱紧民族国家、传统宗教与本土身份；这些古老的政治容器到底能不能兜住21世纪的危机？',
  },
  {
    id: 'tl-step-3',
    stepNumber: '第 3 步',
    title: '中世纪没有奥运会：为什么民族主义与复古宗教接不住三大全球危机？',
    shortLabel: '政治容器与全球危机',
    chaptersRange: '第二部分 第5—9章',
    question:
      '当线上虚拟社群冲散了邻里人情、移民潮又挑动文化焦虑时，退回“本国优先”的民族主义或重新请出传统宗教，真的能替我们挡住未来的风雨吗？',
    leadJudgment:
      '绝无可能——全人类早已活在共享主权、美元、医院与奥运会的同一座全球文明里；面对核战、生态崩溃与科技失控这三大不分国界的生存危机，民族主义毫无解法，传统宗教也只剩替民族主义摇旗呐喊的身份红线功能。',
    paragraphs: [
      '赫拉利先拆解了当下政治反弹的三个常见幻觉。第一，商业互联网一边打着“重建社群”的旗号，一边用屏幕收割注意力、掏空需要真实肉身相处的线下社群；第二，动辄鼓吹“文明冲突”的人忘了中世纪根本办不了奥运会——如今哪怕彼此敌对的国家也同样使用主权国家、民族主义、美元和现代医学，所谓的冲突其实发生在同一座全球文明内部；第三，传统宗教在基因编辑、现代金融和生态模型面前根本开不出具体处方，沦为替民族主义在沙地上画分界线的贴身婢女。',
      '至于让欧美剧烈撕裂的移民与文化认同问题，作者把它还原成东道国与移民之间三条可协商的现实契约，并警惕生物学种族主义正借壳变身为贴标签的“文化主义”。真正决定人类存亡的是三项全球性难题：核扩散、气候生态崩溃、以及AI和生物技术的无序军备竞赛——任何国家关起门来高喊本国优先，都无异于在一条共同漏水的宇宙飞船里争抢谁先淹死。',
    ],
    transitionNote:
      '既然道理如此明摆着，人类为什么还是屡屡在危机面前乱了阵脚——动不动被几起恐怖袭击吓得大动干戈，或者被骄傲偏执推向惨烈战争？问题出在我们头脑里的情绪与教条毒素。',
  },
  {
    id: 'tl-step-4',
    stepNumber: '第 4 步',
    title: '大空瓶里的小硬币与愚蠢进行曲：如何清理恐慌、战争与傲慢毒素？',
    shortLabel: '恐慌战争与世俗伦理',
    chaptersRange: '第三部分 第10—14章',
    question:
      '为什么杀伤力远不如车祸和糖尿病的恐怖主义总能搅动全球政局？既然现代战争早已血本无归，和平为什么依然脆弱？我们在祛魅神明之后又该凭什么安身立命？',
    leadJudgment:
      '恐怖主义靠戏剧恐慌引诱大国反应过度，战争则随时可能被人类低估的集体愚蠢重新引爆；要摆脱绝望与偏执，人类必须戒掉“地球绕着本族群转”的文化自大，以敢于认错和减少痛苦为核心的世俗伦理作为公共底线。',
    paragraphs: [
      '第10章用“大空瓶里的小硬币”一针刺穿恐怖主义的魔术：恐怖分子手里没有摧毁大国的硬实力，全靠制造镜头前的极端震动，激怒现代强权自己踩碎瓷器店；化解它的良方正是冷静克制、秘密精准情报反制与拒绝替恐怖剧场免费扩音。第11章则诚实修正了单纯靠经济账本乐观预测和平的盲区——知识经济固然让侵略战争无利可图，但历史一再上演“愚蠢进行曲”，傲慢和误判随时可能把核时代拖回深渊。',
      '为了替公共理性清理地基，第12至14章连拆三座自负堡垒：世界史证明道德与伦理早于《圣经》和任何现存文明，地球绝非绕着某个自命天选的民族旋转；讨论“神”时不能拿宇宙终极奥秘的神秘感，去替压迫他人的世俗教条撑腰；真正的“世俗主义”绝不是没有底线的虚无，而是由真理、同情、平等、自由、勇气与责任六大原则构成的积极伦理——它并不完美，甚至也在20世纪留下过极权阴影，但正因它承认自己会犯错，才保住了借证据自我纠偏的生机。',
    ],
    transitionNote:
      '就算我们在道德上接受了谦逊与世俗理性，现实世界却还有一道更难跨越的认知深渊：普通人连一根拉链的原理都讲不清，每天又泡在真假难辨的信息泡泡里，我们拿什么分辨真相？',
  },
  {
    id: 'tl-step-5',
    stepNumber: '第 5 步',
    title: '拉链实验与后真相物种：当直觉跟不上全球因果链，如何走出洗脑机？',
    shortLabel: '无知正义与后真相',
    chaptersRange: '第四部分 第15—18章',
    question:
      '为什么越是身居高位或自信满满的人越容易陷入误判？为什么说“后真相时代”并不是社交媒体刚刚发明的怪胎，连科幻电影都在误导我们对未来的想象？',
    leadJudgment:
      '人类天生依赖“群体思维”并深陷“知识的错觉”，在远超部落尺度的全球供应链与复杂因果前，原始正义直觉彻底失灵；智人向来是偏爱虚构故事的“后真相物种”，唯有为高质量真相付费、深读科学文献并识破流行科幻的误导，才能走出洗脑机。',
    paragraphs: [
      '斯洛曼与费恩巴赫的“拉链实验”揭露了人类认知的尴尬底色：我们每天都在用拉链，自以为很懂，一旦被要求讲清原理却立刻露馅——我们习惯把别人脑子里的专业知识错当成自己的见识，而权力越大的领袖越容易被阿谀奉承形成的“权力黑洞”隔绝在真相之外。同样失灵的还有人类古老的道德雷达：采集祖先一眼看清谁偷了邻居家东西，现代人买一杯咖啡或持有一份基金，却完全看不见背后跨越大洲的“偷走河流”。',
      '因此“后真相”根本不是今天才冒出来的新病——赫拉利一语道破：1000个人信一个编造故事一个月是假新闻，10亿人信它1000年就成了神圣宗教。连《终结者》和《黑客帝国》这类科幻电影也在帮倒忙，它们把AI危机拍成“机器觉醒拿枪造反”的旧戏剧，掩盖了《头脑特工队》所揭示的真正战场：无意识算法顺着人体生化开关悄悄接管欲望。对抗洗脑机没有魔法，只能老老实实拒绝免费噪音午餐、支持独立专业新闻，并在关键议题上直接求助严谨科学文献。',
    ],
    transitionNote:
      '看穿了科技颠覆、旧政治失灵、认知盲区与虚构故事的层层迷雾，落回每一个活生生的普通个体和我们的下一代身上：在这场大变局里，我们究竟该怎么学、怎么活、怎么守住自己？',
  },
  {
    id: 'tl-step-6',
    stepNumber: '第 6 步',
    title: '教育4C、真实受苦与内观禅修：如何在算法黑进你之前先认识自己？',
    shortLabel: '教育意义与自我觉察',
    chaptersRange: '第五部分 第19—21章',
    question:
      '如果大人不懂2050年的世界、技术可能把人当人质、连所有宏大人生故事也都是人类编造的虚构剧本，普通个体在这场失速的21世纪里究竟还能抓紧什么？',
    leadJudgment:
      '把学习重心从死记硬背转向4C通用能力与终身重塑的心理韧性，用“是否会真实受苦”戳破一切虚构大故事的绑架，并赶在外部算法黑进你的大脑之前，通过持续的自我觉察与心智训练读懂自己的操作系统。',
    paragraphs: [
      '面对完全无法预测的2050年就业与生活图景，学校继续向孩子塞满过时知识无异于把他们推向淘汰边缘。教育必须转向批判性思考、沟通、合作与创意（4C），更要培养面对剧变不崩溃、能不断抛弃旧技能重新发明自我的情绪弹性。给15岁少年的生存铁律极其冷峻：别盲信懂旧世界的大人，别盲信随时可能反客为主的技术，甚至别盲信自己脑海里那个容易被广告和宣传操纵的“内心声音”。',
      '最后两章完成了全书从外部世界向内在实相的深潜：一切民族、宗教与消费大叙事都经不起逻辑追问，检验什么是“真实”而非虚构的唯一尺度是“受苦”——国家与经书不会痛，唯有活生生的血肉众生会痛，因此人生的首要问题不是演好一部宏大虚构戏，而是如实面对并减轻痛苦。赫拉利最终分享了自己从2000年4月起坚持内观（Vipassana）禅修的亲身体验：每天静下来观察呼吸与身体感受的生灭，在算法彻底摸透你的多巴胺和恐惧开关之前，亲手夺回认识自己心智的主动权。',
    ],
    transitionNote:
      '走完这二十一堂紧贴当代脉搏的思想公开课，我们同样需要拉开审视距离：赫拉利这套以“大历史视角诊断当下”的方法究竟为我们带来了哪些罕见清醒，又在哪些现实政治与实操处方上留有明显留白？',
  },
];

export const TWENTY_ONE_LESSONS_BOUNDARY_COMPARISON: BoundaryComparison = {
  id: 'tl-boundary',
  question:
    '作为“简史三部曲”里最贴近当下现实的一部，《今日简史》凭什么能把二十一个盘根错节的时代焦虑讲得条理分明，而我们在吸收它的清醒见解时又必须看清哪些局限？',
  leadJudgment:
    '全书最难得的是把七万年演化尺度与当代新闻现场无缝打通的“去噪音诊断力”，以及作者敢于自我修正和平实拆解对立立场的公共对话姿态；但它的长处在于“拆解幻觉与提出好问题”，而在具体制度设计、经济分配路径与个体处方的普适性上仍有明显边界。',
  authorMethodParagraphs: [
    '与前两部侧重历史长河和远期图景不同，《今日简史》采用了极具公共知识分子色彩的“问题拆弹法”：面对移民、恐怖主义、宗教、后真相这些最容易让人情绪上头、互相扣帽子的热点议题，赫拉利先退后一万年拿物种演化与比较历史把情绪降温，再把宏大口号拆解成具体可核查的机制（例如把移民辩论拆成三条契约条款、把恐怖主义拆成“大空瓶里的小硬币”、把宗教拆成技术/政策/身份三层）。',
    '更值得肯定的是作者在这本书里展现出的知识诚实：他在第11章主动补上了《人类简史》对战争理性算账过于乐观的短板（“永远不要低估人类的愚蠢”），在第14章直面世俗主义自身的极权阴影，并在第15章坦承包括自己在内的所有人都受困于“知识的错觉”。这种不装全知、以清晰发问对抗信息淹没的姿态，本身就是对“清晰见解就是力量”的最佳示范。',
  ],
  readerLookbackParagraphs: [
    '与此同时，读者也应清醒看到这部书的三道边界。首先，全书横跨21个庞大议题，本质上更像一部高质量的思想随笔集与公共议程总览，在具体政策落地上多止步于原则呼吁——例如反复强调必须全球合作应对AI、气候与核威胁、必须规范数据所有权，却很少深入剖析现实主权博弈、既得利益集团与国际法执行机制如何真正跨过“囚徒困境”。',
    '其次，书中部分分析带有强烈的硅谷科技叙事与欧美自由派语境底色：诸如“自由主义故事在2018年归零”或对“无用阶级”与UBI的讨论，主要映照西方后工业民主国家遭遇民粹与自动化冲击的焦虑，套用到不同发展阶段的国家与产业结构时必须重新校准现实参数。最后，全书以个人内观禅修作为最终落脚点固然真挚动人，但它终究属于个体精神防卫的“向内自救”——面对数据垄断、地缘战火与算法权力，读者绝不能把“个人保持内心清醒”当成替代公共参与和制度制衡的逃生舱。',
  ],
};

export const TWENTY_ONE_LESSONS_KEY_GROUPS: KeyGroupSection[] = [
  {
    id: 'tl-tech',
    title: '故事归零与算法霸权：就业、自由与数据归属',
    shortLabel: '01–05 科技与数据',
    rangeLabel: '01–05',
    question:
      '当旧故事在2018年归零、AI又开始凭借连通性与数据垄断重塑世界，普通人最该警惕哪五道迫在眉睫的冲击？',
    answerLead:
      '前五条直指第一部分的核心危机：信息噪音里的清晰力量、故事归零、AlphaZero掀翻的就业护城河、数字独裁以及21世纪头号资产——数据的归属权。',
  },
  {
    id: 'tl-politics',
    title: '全球文明与旧容器：社群、民族主义、宗教与移民',
    shortLabel: '06–10 政治与身份',
    rangeLabel: '06–10',
    question:
      '为什么说“文明冲突”是伪命题？面对核、生态与科技三大危机，民族主义、宗教和线上社群究竟卡在了哪一环？',
    answerLead:
      '这五条把第二部分的身份争吵一一降温拆弹：肉身社群不可替代、全球早已共享同一文明、民族国家兜不住全球危机、宗教退守身份边界，而种族主义正换装为文化主义。',
  },
  {
    id: 'tl-reason',
    title: '恐惧、愚蠢与世俗清醒：恐怖主义、战争与谦逊伦理',
    shortLabel: '11–15 恐慌与理性',
    rangeLabel: '11–15',
    question:
      '面对恐慌、傲慢与教条这三种最易引爆灾难的心理毒素，人类该怎样守住不反应过度、不自命中心的理性底线？',
    answerLead:
      '这里提炼了第三部分的五副清醒剂：拆穿恐怖主义的戏剧挑衅、警惕战争的愚蠢进行曲、戒掉文明中心自大、切分神秘之神与立法之神，以及承认不完美的世俗伦理。',
  },
  {
    id: 'tl-survival',
    title: '后真相迷雾与个体自救：无知、教育4C与认识自己',
    shortLabel: '16–20 真相与自救',
    rangeLabel: '16–20',
    question:
      '在天生无知、后真相洗脑机与虚构大故事的重重包围下，普通人和下一代究竟还能握紧哪些真正可靠的生存抓手？',
    answerLead:
      '最后五条涵盖知识错觉、后真相物种、教育4C与心理韧性、“以受苦检验真实”的现实法则，以及抢在算法之前通过自我觉察认识自己的终极忠告。',
  },
];

export const TWENTY_ONE_LESSONS_KEY_INSIGHTS: KeyInsightItem[] = [
  {
    id: 1,
    indexLabel: '01',
    groupId: 'tl-tech',
    chapterRef: '序',
    propositionZh:
      '在一个信息爆炸却多半无用的世界，清晰的见解就成了一种力量——就算你因为忙着谋生养家而缺席关于人类未来的辩论，历史也绝不会对你网开一面。',
    propositionEn:
      'In a world deluged by irrelevant information, clarity is power—even if you are too busy feeding your children to join the debate about humanity’s future, history will not spare you from its outcome. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '开篇第一句便定下全书的紧迫感：信息时代真正的贫困不再是缺少消息，而是被海量噪音遮蔽了辨认关键议题的能力。',
  },
  {
    id: 2,
    indexLabel: '02',
    groupId: 'tl-tech',
    chapterRef: '第1章',
    propositionZh:
      '1938年人类有三种全球性的故事可以选择，1968年只剩下两个，1998年似乎只有一个故事胜出，而到了2018年，这个数字骤降到了0。',
    propositionEn:
      'In 1938 humans were offered three global stories to choose from, in 1968 just two, in 1998 a single story seemed to prevail, and in 2018 we are down to zero. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '用四个相隔三十年的坐标，一针勾勒出当代全球政治失重与民粹回潮的深层背景——不是某一个政客掀翻了秩序，而是旧的宏大叙事已解释不了眼前的技术与分配裂变。',
  },
  {
    id: 3,
    indexLabel: '03',
    groupId: 'tl-tech',
    chapterRef: '第2章',
    propositionZh:
      '人工智能凭“连通性”与“可更新性”颠覆就业市场——2017年12月7日，AlphaZero零人类棋谱仅用4小时就击败了传统冠军Stockfish 8；21世纪普通人最可怕的噩梦不再是被剥削，而是变得“无足轻重”。',
    propositionEn:
      'Backed by connectivity and updateability, AI is transforming work—on December 7, 2017, AlphaZero learned chess from scratch in four hours to beat Stockfish 8; in the 21st century, the greater dread is no longer exploitation, but irrelevance. （回译）',
    conceptNote: 'AI两大非人类优势：连通性 / 可更新性',
    quoteOrigin: 'back-translation',
    analysis:
      '解释了为什么不能简单拿19世纪工业革命的“旧工作消失、新工作补上”来安慰今天：人脑无法一键升级，而算法只要迭代一次，全网节点瞬间集体进化。',
  },
  {
    id: 4,
    indexLabel: '04',
    groupId: 'tl-tech',
    chapterRef: '第3章',
    propositionZh:
      '20世纪民主击败极权是因为集中处理信息的效率低于分散市场；但21世纪人工智能反过来可能让集中式数据处理更高效，从而把“数字独裁”变成前所未有的政治威胁。',
    propositionEn:
      'In the 20th century democracy beat dictatorship because centralized data processing was inefficient; in the 21st, AI may make centralized processing far more efficient, making digital dictatorships an unprecedented threat. （回译）',
    conceptNote: '核心警报：数字独裁（digital dictatorship）',
    quoteOrigin: 'back-translation',
    analysis:
      '彻底打破了“科技发展必然自动带来自由民主”的硅谷幼稚信仰。技术架构本身就是权力架构，一旦生物监测和算力高度集中，民主制度就面临前所未有的结构性压力。',
  },
  {
    id: 5,
    indexLabel: '05',
    groupId: 'tl-tech',
    chapterRef: '第4章',
    propositionZh:
      '古代土地是最重要资产，近代机器成为最重要资产，而21世纪数据已取代一切成为核心资产——今天最紧迫的政治议题，就是规范“究竟该由谁来拥有数据”。',
    propositionEn:
      'In ancient times land was the most important asset, in the modern era machines took over, and in the 21st century data eclipses both—regulating who owns the data is now the defining political question. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '把抽象的隐私条款拉升到了人类财产史的高度。我们为了免费的便利服务交出行为与健康数据，就像当年毫无防备的土著用一整片大陆换了几串彩色玻璃珠。',
  },
  {
    id: 6,
    indexLabel: '06',
    groupId: 'tl-politics',
    chapterRef: '第5章',
    propositionZh:
      '线上互动永远无法真正替代需要肉身相处的线下社群；当科技平台以“连接人类”为名把我们的目光从身边活生生的人拽向屏幕，孤独与撕裂反而会同步加剧。',
    propositionEn:
      'Online connections can never truly replace embodied offline communities; when platforms pull our attention from living neighbors onto glowing screens in the name of connection, loneliness and polarization deepen together. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '提醒现代人重估“身体在场”的珍贵价值：算法能推送一万个志同道合的点赞，却没人能在你发烧时推开房门端来一碗热汤。',
  },
  {
    id: 7,
    indexLabel: '07',
    groupId: 'tl-politics',
    chapterRef: '第6章',
    propositionZh:
      '中世纪根本不可能举办奥运会——所谓“文明冲突”是把人类文化错误类比成不同生物物种，事实上今天全人类早已生活在共享主权、货币与现代科学的同一座全球文明里。',
    propositionEn:
      'The Middle Ages could never have held an Olympics—talk of a "clash of civilizations" falsely treats human cultures like separate biological species, when in reality all humans now inhabit one shared global civilization. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '用“中世纪办不了奥运会”和“德国人与大猩猩”两个极其俏皮又锐利的对比，一眼拆穿了借古老文明差异来煽动宿命仇恨的政治修辞。',
  },
  {
    id: 8,
    indexLabel: '08',
    groupId: 'tl-politics',
    chapterRef: '第7章',
    propositionZh:
      '核战争、生态崩溃与颠覆性科技失控这三大21世纪生死挑战全是全球性问题，没有哪一座民族国家能单凭砌高围墙独自解决——地球这艘飞船漏水时，没人能只救自己的舱室。',
    propositionEn:
      'Nuclear war, ecological collapse, and technological disruption are inherently global threats that no nation-state can solve behind higher walls—when spaceship Earth springs a leak, no cabin can save itself alone. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '划清了温和爱国与封闭排外民族主义的红线：在气候变暖与AI军备竞赛面前，拒绝全球协作不是“务实自保”，而是集体短视。',
  },
  {
    id: 9,
    indexLabel: '09',
    groupId: 'tl-politics',
    chapterRef: '第8—9章',
    propositionZh:
      '传统宗教既解决不了基因工程的技术题，也开不出金融政策处方，如今多半沦为替民族主义划分“我者与他者”边界的婢女；而在移民争论中，旧种族主义正悄然换装成“文化主义”。',
    propositionEn:
      'Unable to solve modern technological or economic policy challenges, traditional religions mostly serve as handmaids to nationalism by drawing identity lines—while old biological racism quietly rebrands itself as "culturism." （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '精准剖析了21世纪身份政治的两副面孔：把复杂的经济政策与移民契约简化成宗教红线或铁板一块的文化优劣论，只会把可协商的现实问题变成零和情绪死局。',
  },
  {
    id: 10,
    indexLabel: '10',
    groupId: 'tl-politics',
    chapterRef: '第10章',
    propositionZh:
      '恐怖主义不是靠武力取胜的军事战略，而是弱者导演的恐怖戏剧——就像扔进大空瓶里的一枚小硬币，它真正的杀伤力在于诱使现代强权反应过度、亲手毁掉自己的秩序与自由。',
    propositionEn:
      'Terrorism is not a military strategy of material destruction, but a theater of fear—like a small coin rattling inside a huge empty jar, its true weapon is provoking powerful states into self-destructive overreaction. （回译）',
    conceptNote: '核心比喻：大空瓶里的小硬币',
    quoteOrigin: 'back-translation',
    analysis:
      '拆穿恐怖袭击心理战的经典段落。正因普通公民习惯了现代国家极低暴力的安全底线，极少数惨剧就能放大成全民恐慌；保持理性比例感与拒绝盲目扩音，才是反恐的第一道防线。',
  },
  {
    id: 11,
    indexLabel: '11',
    groupId: 'tl-reason',
    chapterRef: '第11章',
    propositionZh:
      '在知识经济与核武器时代，发动大规模侵略战争在经济账上早已血本无归；但历史最重要的教训之一就是——永远不要低估人类的愚蠢。',
    propositionEn:
      'In an age of knowledge economies and nuclear weapons, large-scale wars of conquest have become unprofitable—yet one of history’s supreme lessons is never to underestimate human stupidity. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '赫拉利对自身早年“和平乐观论”最清醒的一次自我修正。理性计算可以解释为什么不该打仗，却永远拦不住被傲慢、恐惧与误判冲昏头脑的权力机器。',
  },
  {
    id: 12,
    indexLabel: '12',
    groupId: 'tl-reason',
    chapterRef: '第12章',
    propositionZh:
      '几乎每个民族和宗教都宣称自己是人类道德与宇宙真理的原点，但真实历史早已证明：伦理、同情与互助远在《圣经》和任何现存国家诞生前数万年就已存在，地球不是绕着任何族群转的。',
    propositionEn:
      'Almost every nation and creed claims to be the moral center of the universe, yet history proves that empathy and ethics predated the Bible and every modern state by tens of thousands of years—the world does not revolve around any tribe. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '一记不分东西方、连作者自己所属传统都一并点名的文化降温剂。只有戒掉“天选之子”的集体自恋，不同国家与社群之间才谈得上真正平等的对话。',
  },
  {
    id: 13,
    indexLabel: '13',
    groupId: 'tl-reason',
    chapterRef: '第13章',
    propositionZh:
      '道德并不是为了讨好某位具象神明而遵守的教条，而是出于减轻众生痛苦的自然同理心——切忌一边躲在“宇宙终极奥秘”背后逃避质疑，一边又冒用“神的名义”去压迫具体的人。',
    propositionEn:
      'Morality does not mean following divine commands to please a cosmic lawgiver, but reducing real suffering through empathy—never hide behind cosmic mystery while invoking God’s name to oppress living people. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '干净利落地解开了“没有神明就没有道德”的古老恐吓，同时把哲学上对宇宙奥秘的谦卑敬畏与现实中借神之名搞排他压迫的政治权术彻底切割。',
  },
  {
    id: 14,
    indexLabel: '14',
    groupId: 'tl-reason',
    chapterRef: '第14章',
    propositionZh:
      '真正的世俗主义不是消极的反宗教，而是以真理、同情、平等、自由、勇气与责任为支柱的积极伦理——它最宝贵的品质不是永远正确，而是敢于直面阴影并凭证据自我纠错。',
    propositionEn:
      'Secularism is not a negative rejection of religion, but a positive ethical code built on truth, compassion, equality, freedom, courage, and responsibility—its greatest strength lies in facing its own shadows and correcting mistakes with evidence. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '替被频繁污名化的“世俗主义”恢复了伦理厚度：承认人类会犯错、不宣称掌握绝对终极真理，反而正是现代科学和宪政社会能够持续自我修复的秘密。',
  },
  {
    id: 15,
    indexLabel: '15',
    groupId: 'tl-reason',
    chapterRef: '第15—16章',
    propositionZh:
      '绝大多数人连拉链的原理都讲不清，却在“知识的错觉”中以为自己无所不知；而在横跨全球的现代复杂因果链面前，为部落演化出的原始正义直觉根本看不见我们无意中参与的“偷走河流”。',
    propositionEn:
      'Most people cannot explain how a zipper works yet live under the "knowledge illusion," while our tribal moral instincts fail to trace how everyday choices connect to distant global harms like silently stealing a river. （回译）',
    conceptNote: '斯洛曼与费恩巴赫：知识的错觉（knowledge illusion）',
    quoteOrigin: 'back-translation',
    analysis:
      '用“拉链实验”和“偷走河流”直击当代人的双盲：既高估自己的独立认知，又低估现代供应链与金融体系的远距道德牵连——加上“权力的黑洞”，连高层领袖也极易在信息回声室里盲目决策。',
  },
  {
    id: 16,
    indexLabel: '16',
    groupId: 'tl-survival',
    chapterRef: '第17章',
    propositionZh:
      '如果只有1000个人相信某个编造的故事一个月，这是假新闻；如果是10亿人相信某个编造的故事1000年，这就成了宗教信仰，而且会警告别人不准说它是“假新闻”。',
    propositionEn:
      'If a thousand people believe a made-up story for one month, that is fake news; if a billion people believe it for a thousand years, that is a religion, and we are admonished not to call it fake news. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '全书传诵最广、也最具锋芒的一句话。它打破了“假新闻只是社交媒体新产物”的浅见，同时倒逼读者直面两条极其务实的自救法则：为优质独立信息付费，以及在重大议题上读科学文献。',
  },
  {
    id: 17,
    indexLabel: '17',
    groupId: 'tl-survival',
    chapterRef: '第18章',
    propositionZh:
      '流行科幻总爱把AI拍成有自我意识的叛乱机器人，这反而遮蔽了真正的风险：未来最大的母体不是关住身体的虚拟盒子，而是比你更懂人脑生化开关的外部无意识算法。',
    propositionEn:
      'Popular sci-fi obscures the real danger by casting AI as conscious rebel robots; the coming Matrix is less a virtual prison around our bodies than non-conscious algorithms mastering the biochemical switches inside our own minds. （回译）',
    quoteOrigin: 'back-translation',
    analysis:
      '对比《黑客帝国》与《头脑特工队》，一针戳破大众对AI风险的跑偏想象——我们未必会死于机械战警的激光枪，却极易在毫无反抗中沦为商业与政治精准操纵情绪的提线木偶。',
  },
  {
    id: 18,
    indexLabel: '18',
    groupId: 'tl-survival',
    chapterRef: '第19章',
    propositionZh:
      '在唯一不变的就是变化的21世纪，教育必须从灌输死知识转向“4C”通用能力与情绪韧性——不要盲信懂旧世界的大人，不要盲信技术，趁早了解自己的操作系统，免得被算法黑进人体。',
    propositionEn:
      'In a century where change is the only constant, education must shift from rote information to the 4Cs and emotional resilience—do not blindly trust adults or technology, and learn your own operating system before algorithms hack you. （回译）',
    conceptNote: '教育4C：批判性思考 / 沟通 / 合作 / 创意',
    quoteOrigin: 'back-translation',
    analysis:
      '把全书的科技预警翻译成了面向下一代最具体、最不虚浮的成长策略：当任何单一职业技能都可能十年失效，心理抗压与终身自我重塑才是真正的铁饭碗。',
  },
  {
    id: 19,
    indexLabel: '19',
    groupId: 'tl-survival',
    chapterRef: '第20章',
    propositionZh:
      '国家、品牌与神圣叙事都是人类编造的虚构故事，检验某种事物究竟是不是“真实”的终极试金石只有一个——它会感到痛苦吗？人生真正的大问题不是虚构意义，而是如何摆脱痛苦。',
    propositionEn:
      'Nations, brands, and grand ideologies are human-made stories; the ultimate test of reality is simple—can it suffer? The true question of life is not what fictional role we play, but how to liberate ourselves from suffering. （回译）',
    conceptNote: '核心标准：现实的考验（The Reality Test）',
    quoteOrigin: 'back-translation',
    analysis:
      '极具震撼力的“去虚构试金石”。任何要求活生生的人去为抽象旗帜、帝国荣耀或虚构纯洁性流血受苦的故事，在“只有有情生命会真正受苦”这一朴素实相面前瞬间现形。',
  },
  {
    id: 20,
    indexLabel: '20',
    groupId: 'tl-survival',
    chapterRef: '第21章',
    propositionZh:
      '几千年来“认识你自己”只是哲学家的劝勉，但在21世纪它成了争分夺秒的生存竞赛——在谷歌、亚马逊和政府用算法彻底黑进你的心智之前，你必须先静下来如实观察并读懂自己。',
    propositionEn:
      'For millennia "know thyself" was philosophical advice, but in the 21st century it is an urgent race for survival—you must observe and understand your own mind before corporations and governments hack it with algorithms. （回译）',
    conceptNote: '实践路径：内观禅修（Vipassana）如实观察呼吸与感受',
    quoteOrigin: 'back-translation',
    analysis:
      '全书收束的个人底牌。无论读者是否实践内观禅修，赫拉利提出的命题都直击要害：如果你自己都不清楚愤怒、焦虑与欲望是怎么在心里升起的，外部算法就会替你把人生遥控器握得死死的。',
  },
];

export const TWENTY_ONE_LESSONS_DATASET: BookReadingDataset = {
  ultimateThesis: TWENTY_ONE_LESSONS_ULTIMATE_THESIS,
  overviewIntroQa: TWENTY_ONE_LESSONS_OVERVIEW_INTRO_QA,
  chapters: TWENTY_ONE_LESSONS_CHAPTER_PROPOSITIONS,
  argumentMapSteps: TWENTY_ONE_LESSONS_ARGUMENT_MAP_STEPS,
  boundaryComparison: TWENTY_ONE_LESSONS_BOUNDARY_COMPARISON,
  keyGroups: TWENTY_ONE_LESSONS_KEY_GROUPS,
  keyInsights: TWENTY_ONE_LESSONS_KEY_INSIGHTS,
};
