import type { BookCatalogMeta } from './types';

/**
 * Single source of truth for lightweight catalog metadata shared by:
 * - `catalog.ts` (public Web lazy-loading catalog)
 * - `registry.ts` (full reading registry for workbench, pipelines, and tests)
 */
export const BOOK_CATALOG_METAS: BookCatalogMeta[] = [
  {
    slug: 'amusing-ourselves-to-death',
    title: '《娱乐至死》',
    originalTitle: 'Amusing Ourselves to Death: Public Discourse in the Age of Show Business',
    author: '尼尔·波兹曼',
    translator: '章艳 译',
    publisherInfo: '中信出版社 2015',
    publicationYear: '1985',
    category: '媒介与文化批评',
    readingTimeLabel: '约 25 分钟通读',
    premiseHook:
      '如果把商业广告与煽情配乐全部撤掉，请来基辛格、卡尔·萨根严肃聊上 80 分钟核战争危机，电视上的公共讨论就能逃离娱乐化吗？波兹曼借 1983 年《浩劫后》播毕现场的真实僵局，拆解媒介形式如何重塑一个社会的“真理通行证”。',
    ultimateThesisText:
      '当一个社会的主导媒介从铅字转向以电视为代表的电子图像，决定什么是真理、自由与公共价值的“认识论标尺”便从理性阐述滑向了感官娱乐；文化灭亡不必等待强权禁书与真理部的暴政，只要公共话语心甘情愿地按娱乐业逻辑自我改写，人就会在毫无痛感的笑声中丧失严肃思考与历史记忆的能力。',
    stats: {
      mapStepCount: 6,
      chapterCount: 12,
      originCounts: { total: 20, original: 2, backTranslation: 18, chineseOriginal: 0 },
    },
  },
  {
    slug: 'xiangtu-zhongguo',
    title: '《乡土中国》',
    originalTitle: 'From the Soil: The Foundations of Chinese Society（1947–1948 原刊结集）',
    author: '费孝通',
    publisherInfo: '北京大学出版社 2012',
    publicationYear: '1948',
    category: '中国乡土社会学',
    readingTimeLabel: '约 28 分钟通读',
    premiseHook:
      '乡下老头听见汽车喇叭不仅不躲反而冲车大骂，苏州几户人家合住院子却谁也不扫共用厕所，甚至县司法处一判案反倒把村里好人坑得抬不起头——费孝通从这些城里人最容易贴上“愚昧自私”标签的日常切片出发，还原“靠泥土不流动的熟人社会”到底如何运转。',
    ultimateThesisText:
      '中国传统基层社会的全部制度、道德、权力与变迁困境，都生长在“靠土地安土重迁、世代在熟人面对面社群里共同生活”这一结构地基上；因为不流动，一切秩序依赖“己”为中心推出去的差序伦理与内化为良心的“礼”去维持，所以任何脱离这套地基、直接空降现代契约与法治条款的方案，都会先拆毁旧秩序的约束，却接不住新秩序的根。',
    stats: {
      mapStepCount: 6,
      chapterCount: 16,
      originCounts: { total: 20, original: 0, backTranslation: 0, chineseOriginal: 20 },
    },
  },
  {
    slug: 'public-opinion',
    title: '《舆论》',
    originalTitle: 'Public Opinion（1922 原版）',
    author: '沃尔特·李普曼',
    translator: '常江、肖寒 译',
    publisherInfo: '北京大学出版社 2018',
    publicationYear: '1922',
    category: '政治传播与民主理论',
    readingTimeLabel: '约 35 分钟通读',
    premiseHook:
      '1914 年 9 月，太平洋一座孤岛上的英、法、德侨民直到英国邮轮靠岸，才得知祖国早在一个半月前已经互相宣战——过去六周里仇敌还在和平共饮下午茶。李普曼从这场迟到六周的新闻错位起手，追问只能靠“拟态环境”认识世界的大众，究竟凭什么支撑现代民主。',
    ultimateThesisText:
      '现代人并不生活在直接感知的真实世界里，而是根据信息通路筛拣和头脑中先入为主的“刻板印象”拼出的“拟态环境”采取行动；因此，把民主寄托于“全能公民”自动看清真相并自发形成公意，本身就是把与世隔绝的小城镇神话硬套在复杂的现代大社会上，唯有把独立于执行权的专业情报与记录审计体系楔入决策之前，大众治理才不会在偏见与煽动间反复失控。',
    stats: {
      mapStepCount: 6,
      chapterCount: 28,
      originCounts: { total: 20, original: 0, backTranslation: 20, chineseOriginal: 0 },
    },
  },
  {
    slug: 'sapiens',
    title: '《人类简史》',
    originalTitle: 'Sapiens: A Brief History of Humankind（从动物到上帝）',
    author: '尤瓦尔·赫拉利',
    translator: '林俊宏 译',
    publisherInfo: '中信出版社 2014',
    publicationYear: '2012',
    category: '人类史与未来议题',
    readingTimeLabel: '约 32 分钟通读',
    premiseHook:
      '约 10 万年前智人第一次走出非洲，竟被体格更壮、脑容量更大的尼安德特人赶回了老家；可约 7 万年前再次出击，智人却横扫全球。赫拉利从这场逆转与“拆光厂房员工依然存在的标致汽车”切入，追问靠“虚构故事”跃居食物链顶端的动物，如何一步步握有神力却连自己想要什么都答不上来。',
    ultimateThesisText:
      '智人之所以从食物链中游的平庸动物跃升为统治地球的物种，靠的既不是更强壮的体魄，也不是个体大脑的绝对聪明，而是凭借“认知革命”获得了编造并共同相信“虚构故事”的能力——国家、金钱、帝国、宗教与信贷皆是彼此信任的想象秩序，它们把人类推上了掌控物理与生命法则的神坛，却从未自动换来个体幸福，反而把我们带到了“拥有神力却连自己希望想要什么都不知道”的物种终点。',
    stats: {
      mapStepCount: 6,
      chapterCount: 21,
      originCounts: { total: 20, original: 0, backTranslation: 20, chineseOriginal: 0 },
    },
  },
  {
    slug: 'homo-deus',
    title: '《未来简史》',
    originalTitle: 'Homo Deus: A Brief History of Tomorrow（从智人到智神）',
    author: '尤瓦尔·赫拉利',
    translator: '林俊宏 译',
    publisherInfo: '中信出版社 2017',
    publicationYear: '2016',
    category: '人类史与未来议题',
    readingTimeLabel: '约 26 分钟通读',
    premiseHook:
      '2012 年全球死于战争与犯罪者合计约 62 万人，而自杀者有 80 万、死于糖尿病的更高达 150 万——今天，糖比火药更致命。赫拉利从旧天敌退场后的新议程起笔，追问当实验室拆穿自由意志、智能与意识彻底大分离，人类是否正把权威拱手让给“数据主义”。',
    ultimateThesisText:
      '当人类在21世纪初基本遏制了饥荒、瘟疫与战争这三大古老天敌，转而把长生不死、幸福快乐与化身为“神人”写进新议程时，支撑过去三百年现代秩序的“人文主义”——相信每个人都拥有不可分割的自由意志与至高体验权威——却正被生命科学与计算机算法联手拆毁：智能正在与意识大分离，一旦无意识却高度精准的外部算法比我们更了解自己，人类就可能从世界的主人退化为“无用阶级”，并将宇宙最高权威拱手让给“数据主义”。',
    stats: {
      mapStepCount: 6,
      chapterCount: 11,
      originCounts: { total: 20, original: 0, backTranslation: 20, chineseOriginal: 0 },
    },
  },
  {
    slug: '21-lessons-for-the-21st-century',
    title: '《今日简史》',
    originalTitle: '21 Lessons for the 21st Century（人类命运大议题）',
    author: '尤瓦尔·赫拉利',
    translator: '林俊宏 译',
    publisherInfo: '中信出版社 2018',
    publicationYear: '2018',
    category: '人类史与未来议题',
    readingTimeLabel: '约 34 分钟通读',
    premiseHook:
      '1938 年人类还有三种全球大故事可选，1968 年剩两个，1998 年剩一个，到 2018 年竟骤降为 0；而 2017 年底 AlphaZero 仅靠 4 小时零棋谱自学就击溃了世界冠军程序。赫拉利直面信息噪音时代的 21 堂现实急课，追问普通人如何在算法黑进人体之前保持清醒、守住自己。',
    ultimateThesisText:
      '当自由主义故事在2018年陷入幻灭、生物技术与信息技术的双重革命又开始具备“非法攻击人类”与重塑就业的能力时，退回狭隘的民族主义、复古宗教或后真相泡泡都无法解决核战争、生态崩溃与科技颠覆三大全球危机；在信息爆炸却多半无用的时代，清晰的见解本身就是力量——个人与社会唯有承认自身无知、拒绝盲从任何虚构大故事，并以心理韧性与深度自我觉察抢在算法之前读懂自己的心智操作系统，才不至于沦为数字独裁与历史愚蠢的牺牲品。',
    stats: {
      mapStepCount: 6,
      chapterCount: 22,
      originCounts: { total: 20, original: 0, backTranslation: 20, chineseOriginal: 0 },
    },
  },
];
