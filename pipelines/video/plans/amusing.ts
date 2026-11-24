import type { KenBurnsMotion, VideoSceneLayout, VideoSceneOverlay } from '../types';

export interface DeclarativeVideoScene {
  sceneId: string;
  actId: string;
  startSegmentId: string;
  endSegmentId: string;
  layout: VideoSceneLayout;
  motion: KenBurnsMotion;
  imagePrompt?: string;
  imageFile?: string;
  overlay?: VideoSceneOverlay;
}

export interface BookVideoPlan {
  bookSlug: string;
  scenes: DeclarativeVideoScene[];
}

export const AMUSING_VIDEO_PLAN: BookVideoPlan = {
  bookSlug: 'amusing-ourselves-to-death',
  scenes: [
    // ==================== ACT 1 ====================
    {
      sceneId: 'scene-01',
      actId: 'act-1',
      startSegmentId: 'seg-01',
      endSegmentId: 'seg-01',
      layout: 'ppt-cover',
      motion: 'static',
      imageFile: 'scene-01.png',
      imagePrompt:
        'A flagship hand-drawn editorial magazine cover PPT slide for Neil Postman’s classic media-criticism book. Top-left small vermilion marker badge: "全书视觉精读 · 1985". Large bold expressive brush-and-crayon hand-lettered Chinese main title: "娱乐至死" with a vivid red crayon underline. Crisp hand-lettered Chinese subtitle directly below: "当所有严肃公共生活，都必须长得像娱乐". Main editorial artwork spanning center-right: a vintage glowing 1980s television set crowned with Las Vegas neon stars and smiling clown confetti swallowing stacked leather books, newspaper columns, a pulpit, and a chalkboard into bright entertaining beams. Clean hand-lettered author credit: "尼尔·波兹曼 · 媒介批评经典 · 全书深读". Keep generous pure-white breathing space across the bottom 18% strip.',
      overlay: {
        chapterTag: '全书视觉精读 · 1985',
        headline: '娱乐至死',
        subtitleText: '当所有严肃公共生活，都必须长得像娱乐',
        quoteZh:
          '当社会的主导媒介从铅字迁移到电子图像，自由文化不必等待强权禁书，只要公共话语按娱乐业逻辑自我改写，人便会在笑声中丧失严肃思考。',
        quoteSource: '尼尔·波兹曼 · 媒介批评经典 · 全书深读',
      },
    },
    {
      sceneId: 'scene-02',
      actId: 'act-1',
      startSegmentId: 'seg-02',
      endSegmentId: 'seg-04',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-02.png',
      imagePrompt:
        'An editorial storytelling PPT slide depicting the 1983 ABC television panel after the nuclear-war film The Day After. Top hand-lettered Chinese title: "1983《浩劫后》80分钟无广告直播". Center illustration: six sharp adult editorial caricatures of top statesmen and scientists (Kissinger, McNamara, Elie Wiesel, Carl Sagan, Buckley, General Scowcroft) seated formally under warm yellow-crayon studio spotlights, with crossed-out commercial TV icons and crossed-out musical notes sketched in red marker along the margins. Hand-lettered Chinese callouts with sketchy arrows: "清空广告与配乐" and "顶级政要学者同台".',
      overlay: {
        chapterTag: '第一幕 · 1983 现场起手',
        headline: '清空广告与配乐，六位顶级嘉宾严肃讨论核战',
      },
    },
    {
      sceneId: 'scene-03',
      actId: 'act-1',
      startSegmentId: 'seg-05',
      endSegmentId: 'seg-07',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-03.png',
      imagePrompt:
        'A sharp satirical editorial cartoon PPT slide showing why the 1983 serious TV panel collapsed into a pageant. Top hand-lettered Chinese title: "为何严肃讨论滑向选美秀？". Center sketch: six speakers isolated inside separate 5-minute hourglass bubbles facing cameras instead of each other, with zero dialogue lines linking them, while stage confetti and applause bursts rain down. A crossed-out thought bubble reads "让我想一想", and a bold vermilion marker callout underlined in red states: "思考不是表演艺术".',
      overlay: {
        chapterTag: '第一幕 · 形式吞噬思考',
        headline: '每人五分钟独白：思考不是表演艺术',
      },
    },
    {
      sceneId: 'scene-04',
      actId: 'act-1',
      startSegmentId: 'seg-08',
      endSegmentId: 'seg-08',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-04.png',
      imagePrompt:
        'A striking two-column editorial comparison PPT slide divided by a sketchy red vertical marker line. Top hand-lettered Chinese title: "两种反乌托邦预言". Left panel in charcoal and cobalt crayon labeled "奥威尔《一九八四》": an iron boot, chained books, and a watching Big Brother eye, Chinese callout: "憎恨的东西毁掉我们 / 强权禁书". Right panel in vivid vermilion and mustard yellow crayon labeled "赫胥黎《美丽新世界》": a laughing figure reclining under glowing screens and Las Vegas neon stars with unread books tossed aside, bold red-underlined callout: "热爱的东西毁掉我们 / 无人想读".',
      overlay: {
        chapterTag: '第一幕 · 前言双预言',
        headline: '奥威尔担心强权禁书，赫胥黎担心无人想读',
      },
    },

    // ==================== ACT 2 ====================
    {
      sceneId: 'scene-05',
      actId: 'act-2',
      startSegmentId: 'seg-09',
      endSegmentId: 'seg-11',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-05.png',
      imagePrompt:
        'A witty dual-vignette concept PPT slide explaining Media as Metaphor. Top hand-lettered Chinese title: "媒介即隐喻：形式排除内容". Left sketch: a wry philosopher crouching beside a campfire trying to send abstract geometry logic symbols in rising smoke puffs that scatter in the wind, Chinese tag: "烟雾发不出哲学". Right sketch: a heavy 300-pound 1900s president silhouette (Taft) speaking confidently into a vintage radio mic on one side yet awkwardly squeezed inside a glowing TV close-up frame on the other, Chinese tag: "镜头先于开口否决".',
      overlay: {
        chapterTag: '第二幕 · 媒介即隐喻',
        headline: '烟雾发不出哲学，媒介形式早已筛掉内容',
      },
    },
    {
      sceneId: 'scene-06',
      actId: 'act-2',
      startSegmentId: 'seg-12',
      endSegmentId: 'seg-12',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-06.png',
      imagePrompt:
        'A three-icon visual essay PPT slide showing how everyday tools reshape worldviews. Top hand-lettered Chinese title: "隐秘的工具隐喻". Left sketch in cobalt and mustard crayon: a 14th-century mechanical clock chopping a golden sun into rigid tick-tock segments, Chinese label: "钟表：制造分秒，削弱永恒". Center sketch: 12th-century spectacles illuminating blurred text, Chinese label: "眼镜：缺陷不必认命". Right sketch in dashed amber frame: stone tablets with a crossed-out golden idol, Chinese label: "十诫禁像（作者文化推断）".',
      overlay: {
        chapterTag: '第二幕 · 工具与隐喻',
        headline: '钟表切碎永恒、眼镜挑战宿命与十诫文化推断',
      },
    },
    {
      sceneId: 'scene-07',
      actId: 'act-2',
      startSegmentId: 'seg-13',
      endSegmentId: 'seg-15',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-07.png',
      imagePrompt:
        'A three-panel editorial infographic PPT slide on Media as Epistemology. Top hand-lettered Chinese title: "媒介即认识论：真理穿着文化外衣". Left vignette: four stern university professors crossing out a PhD candidate’s footnote labeled "罗斯福酒店亲耳听见" and pointing to a printed book ("出版文字权威"). Middle vignette: Socrates facing a jury holding rhetoric scrolls ("苏格拉底拒修辞被定罪"). Right vignette: Aristotle stroking his beard beside a logic diagram while ignoring a simple tooth chart ("亚里士多德没数夫人牙齿"). Bottom marker banner: "真理是一种文化偏见".',
      overlay: {
        chapterTag: '第二幕 · 媒介即认识论',
        headline: '口试脚注、苏格拉底受审与亚里士多德没数牙齿',
      },
    },
    {
      sceneId: 'scene-08',
      actId: 'act-2',
      startSegmentId: 'seg-16',
      endSegmentId: 'seg-16',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-08.png',
      imagePrompt:
        'A balanced conceptual diagram PPT slide explaining Postman’s tipping point and scholarly restraint. Top hand-lettered Chinese title: "河流临界点与三点克制声明". Left artwork: a once-clear blue river turning dark violet past a red dotted threshold labeled "临界点", with a tiny rowboat and a few surviving fish still floating on top, Chinese callout: "铅字沦为残余认识论". Right structured callout card with forest-green and cobalt marker checks: "不批纯娱乐，警惕装严肃" / "非生物变笨，是话语降级" / "承认电视慰藉与情感力量".',
      overlay: {
        chapterTag: '第二幕 · 理论边界',
        headline: '河流过了临界点，但波兹曼守住三点理论克制',
      },
    },

    // ==================== ACT 3 ====================
    {
      sceneId: 'scene-09',
      actId: 'act-3',
      startSegmentId: 'seg-17',
      endSegmentId: 'seg-19',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-09.png',
      imagePrompt:
        'A lively historical editorial illustration PPT slide of the 1854/1858 Lincoln–Douglas debates. Top hand-lettered Chinese title: "1854 林肯—道格拉斯七小时辩论". Center scene: tall Abraham Lincoln and Stephen Douglas gesturing from a wooden outdoor platform before a vast attentive crowd of farmers and townsfolk in 19th-century hats, with a sunset clock icon reading "3小时 + 回家晚饭 + 4小时" and dense flowing chains of printed text ribbons floating from their mouths. Bold cobalt marker callout: "沉默比掌声更得体 · 用理解力倾听".',
      overlay: {
        chapterTag: '第三幕 · 历史对照组',
        headline: '吃完晚饭回来接着听：七小时纯语言辩论现场',
      },
    },
    {
      sceneId: 'scene-10',
      actId: 'act-3',
      startSegmentId: 'seg-20',
      endSegmentId: 'seg-22',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-10.png',
      imagePrompt:
        'A rich data-driven hand-drawn editorial infographic PPT slide on print-dominated early America. Top hand-lettered Chinese title: "印刷机统治下的美国". Three energetic sketched stat clusters in vermilion, cobalt, and mustard crayon: (1) an open book with huge handwritten numbers "89%–95%" ("新英格兰男性识字率"); (2) Thomas Paine’s pamphlet Common Sense with "10万册 / 相当于2400万册"; (3) a packed Lyceum lecture hall marked "3000+ 演讲厅". Corner witty sketch of a faceless silhouette president wearing a top hat holding an essay: "前15位总统：识字不识脸".',
      overlay: {
        chapterTag: '第三幕 · 铅字垄断生态',
        headline: '高识字率、《常识》奇迹、演讲厅与无脸总统',
      },
    },
    {
      sceneId: 'scene-11',
      actId: 'act-3',
      startSegmentId: 'seg-23',
      endSegmentId: 'seg-23',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-11.png',
      imagePrompt:
        'A clean editorial triptych PPT slide showcasing the Age of Exposition across institutions. Top hand-lettered Chinese title: "阐释年代：宗教、法律与文字广告". Left sketch: early university towers labeled "宗教辩教义 → 办哈佛耶鲁". Center sketch: scales of justice resting on an open law book ("律师：理性脑力团体"). Right sketch: a plain 1704 newspaper text-only classified ad contrasted with a 1890s smiling baby ad sticker ("150年纯文字广告"). Bottom vermilion-underlined takeaway: "文字筑起可问真假的语境".',
      overlay: {
        chapterTag: '第三幕 · 阐释年代',
        headline: '办大学辩教义与百年纯文字广告：可问真假的语境',
      },
    },
    {
      sceneId: 'scene-12',
      actId: 'act-3',
      startSegmentId: 'seg-24',
      endSegmentId: 'seg-24',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-12.png',
      imagePrompt:
        'A thoughtful methodological boundary PPT slide examining the limits of Postman’s historical sample. Top hand-lettered Chinese title: "保留标注：铅字黄金时代的边界". Center visual: a bright spotlight illuminating a neat New England town square of literate gentlemen ("新英格兰白人清教徒样本"), while outside the spotlight beam in muted slate and ochre crayon appear silhouettes of excluded groups and partisan yellow-press flyers ("被挡在门外：黑奴、女性与底层移民 / 党派诽谤"). Bottom calm marker note: "理解理性托举，不美化为完美乌托邦".',
      overlay: {
        chapterTag: '第三幕 · 认识论保留标注',
        headline: '历史采样局限：不是全员平等的完美乌托邦',
      },
    },

    // ==================== ACT 4 ====================
    {
      sceneId: 'scene-13',
      actId: 'act-4',
      startSegmentId: 'seg-25',
      endSegmentId: 'seg-27',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-13.png',
      imagePrompt:
        'A dynamic historical turning-point PPT slide on the 1844 telegraph. Top hand-lettered Chinese title: "1844 电报：消灭距离，割裂语境". Left-to-right visual flow: a chugging 35-mph steam train left behind as jagged yellow-and-red electric telegraph lightning shoots across the American map from Maine to Texas, carrying a tiny absurd paper note labeled "阿德莱德公主得了百日咳". Beside a skeptical Henry David Thoreau caricature in forest green crayon, bold marker callout: "信息变成脱离语境的商品".',
      overlay: {
        chapterTag: '第四幕 · 电报转折',
        headline: '通讯脱离火车速度：新奇取代实用，信息商品化',
      },
    },
    {
      sceneId: 'scene-14',
      actId: 'act-4',
      startSegmentId: 'seg-28',
      endSegmentId: 'seg-29',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-14.png',
      imagePrompt:
        'A sharp conceptual diagram PPT slide illustrating the Information-Action Ratio and Pseudo-Context. Top hand-lettered Chinese title: "信息—行动比失衡与“伪语境”". Left side: a wildly tipped balance scale weighed down by an avalanche of distant crisis headlines ("中东战火 / 通胀 / 灾情") versus a tiny feather labeled "个人行动：几乎为零". Right side: a giant black-and-white crossword puzzle grid, cocktail glasses, and a trivia game buzzer colored in mustard and violet crayon, Chinese callout: "伪语境：制造问题消耗无用信息".',
      overlay: {
        chapterTag: '第四幕 · 伪语境诞生',
        headline: '海量信息无法指导行动，只能用纵横字谜消遣',
      },
    },
    {
      sceneId: 'scene-15',
      actId: 'act-4',
      startSegmentId: 'seg-30',
      endSegmentId: 'seg-31',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-15.png',
      imagePrompt:
        'An editorial visual-essay PPT slide unpacking photography’s syntax-free image revolution. Top hand-lettered Chinese title: "摄影术：没有句法的“图像革命”". Left sketch: a vintage camera snapping a photo of one specific oak tree ("只能拍一棵树"), while abstract floating Chinese words "树 / 真理 / 谬误" bounce right off the lens ("拍不出抽象概念"). Right witty vignette: a stranger handing a photo of a fictional exotic leaf ("伊利克斯植物照片") to a nodding passerby whose thought bubble instantly turns blank. Bottom marker contrast: "看照片只需辨认，看文字需要理解".',
      overlay: {
        chapterTag: '第四幕 · 图像革命',
        headline: '照片没有句法、无可辩驳：辨认取代了理解',
      },
    },
    {
      sceneId: 'scene-16',
      actId: 'act-4',
      startSegmentId: 'seg-32',
      endSegmentId: 'seg-32',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-16.png',
      imagePrompt:
        'An atmospheric conceptual PPT slide depicting the Peek-a-Boo World and TV as Myth. Top hand-lettered Chinese title: "“躲躲猫”世界与电视神话". Center artwork: a whimsical floating castle in the clouds built from flickering pop-up picture windows appearing and vanishing like peek-a-boo cards, with a cozy living-room armchair tucked right inside the TV glow. Orbiting smaller icons (book, movie reel, computer) tethered to the TV hub ("元媒介：指挥中心"). Calm cobalt marker callout: "罗兰·巴特神话：像空气一样不再追问".',
      overlay: {
        chapterTag: '第四幕 · 躲躲猫神话',
        headline: '住进瞬息闪现的空中楼阁，把电视当成自然空气',
      },
    },

    // ==================== ACT 5 ====================
    {
      sceneId: 'scene-17',
      actId: 'act-5',
      startSegmentId: 'seg-33',
      endSegmentId: 'seg-34',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-17.png',
      imagePrompt:
        'An energetic satirical collage PPT slide introducing the Age of Show Business. Top hand-lettered Chinese title: "娱乐超意识形态：除了娱乐业没有其他行业". Top-left mini diagram: "技术（机器）→ 媒介（文化环境）" with a stopwatch icon reading "3.5秒切一镜头". Center-right four witty editorial vignettes in bright vermilion, yellow, and cobalt crayon: a priest DJ spinning rock records ("摇滚布道"), a TV camera filming an open-heart surgery ("心脏手术直播"), a flight attendant playing champagne games past a glowing seatbelt warning ("航班玩游戏"), and a roaring crowd cheering a film star over Mother Teresa ("耶鲁典礼欢呼").',
      overlay: {
        chapterTag: '第五幕 · 娱乐业时代',
        headline: '3.5 秒一镜头：除了娱乐业没有其他行业',
      },
    },
    {
      sceneId: 'scene-18',
      actId: 'act-5',
      startSegmentId: 'seg-35',
      endSegmentId: 'seg-36',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-18.png',
      imagePrompt:
        'A biting editorial cartoon PPT slide dissecting TV news credibility and "Now... This". Top hand-lettered Chinese title: "“好……现在”与主播相貌可信度". Left panel: a smiling coiffed anchor holding giant red scissors labeled "好……现在", snipping a 45-second disaster tape straight into a bright burger commercial ("45秒灾难 → 巨无霸广告"). Right panel: a courtroom silhouette referencing the 1981 KMBC Christine Craft case where a mirror and glossy hairstyle outweigh a fact-check clipboard, bold Chinese callout: "镜头魅力取代事实核查".',
      overlay: {
        chapterTag: '第五幕 · “好……现在”新闻',
        headline: '45 秒悲剧接巨无霸广告，主播颜值替代事实核查',
      },
    },
    {
      sceneId: 'scene-19',
      actId: 'act-5',
      startSegmentId: 'seg-37',
      endSegmentId: 'seg-38',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-19.png',
      imagePrompt:
        'A sharp editorial infographic PPT slide on Disinformation and the death of contradiction. Top hand-lettered Chinese title: "假信息与《里根误述无人关注》". Upper left: a shattered jigsaw puzzle of news snippets over an empty head silhouette ("假信息 = 支离破碎的错觉"). Upper right: a mocked-up 1983 newspaper headline "里根误述无人关注" while TV viewers yawn holding remotes. Bottom visual: two disconnected speech islands labeled "那里（上一段）" and "这里（下一段）" with a broken bridge between them, red-underlined Chinese note: "连贯性消失，自相矛盾随之消失".',
      overlay: {
        chapterTag: '第五幕 · 假信息与失忆语境',
        headline: '把无知当成知识：语境断裂后连谎言都激不起兴趣',
      },
    },
    {
      sceneId: 'scene-20',
      actId: 'act-5',
      startSegmentId: 'seg-39',
      endSegmentId: 'seg-41',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-20.png',
      imagePrompt:
        'A vivid satirical editorial PPT slide on televangelism and the Electronic Church. Top hand-lettered Chinese title: "走向伯利恒：客厅里的电子教堂". Left side: a glamorous studio stage with fountains, spotlights, a charismatic smiling TV preacher holding a "致富资料" kit, and a golden counter "$5亿年捐款" overshadowing a faint tiny halo in the background. Right side: a viewer lounging on a living-room sofa eating snacks with a remote control aimed at the screen ("按遥控器切去球赛"). Bottom bold red-marker thesis: "电视节目反客为主成为宗教内容".',
      overlay: {
        chapterTag: '第五幕 · 电子教堂',
        headline: '客厅无法神圣化：电视节目反客为主取代宗教',
      },
    },

    // ==================== ACT 6 ====================
    {
      sceneId: 'scene-21',
      actId: 'act-6',
      startSegmentId: 'seg-42',
      endSegmentId: 'seg-44',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-21.png',
      imagePrompt:
        'A clever visual-essay PPT slide linking TV commercials to image politics. Top hand-lettered Chinese title: "30秒瞬间心理疗法与“魔镜政治”". Left panel: a glowing 30-second TV ad bottle labeled "瞬间疗法（百万条广告）" eclipsing a dusty book of Adam Smith’s rational market ("感觉取代产品品质"). Right panel: a thick policy white paper ("克拉克政见书") losing to a glossy 30-second commercial reel ("贾维茨形象广告"), beside a fairy-tale magic mirror on a TV screen reflecting what voters wish to see, Chinese callout: "把自己塑造成观众期望的形象".',
      overlay: {
        chapterTag: '第六幕 · 形象政治',
        headline: '广告作为瞬间疗法：选民对着电视魔镜投票',
      },
    },
    {
      sceneId: 'scene-22',
      actId: 'act-6',
      startSegmentId: 'seg-45',
      endSegmentId: 'seg-46',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-22.png',
      imagePrompt:
        'A poignant editorial contrast PPT slide on historical amnesia and books being displaced. Top hand-lettered Chinese title: "只有现在时的屏幕：不会记忆与取代书籍". Left sketch: a somber, unsmiling Abraham Lincoln portrait stamped "形象政治不合格", next to a clock showing only "NOW / 此刻" while past decades dissolve into grey fog ("被改造得不会记忆"). Right sketch: a locked Orwellian censor gate standing rusted and idle while giant glowing network antennas flood the room with colorful screens pushing books off the shelf, bold Chinese callout: "电视不是禁止书籍，而是取代书籍".',
      overlay: {
        chapterTag: '第六幕 · 失忆与私营文化部',
        headline: '电视语法没有过去时：它不禁止书籍，而是取代书籍',
      },
    },
    {
      sceneId: 'scene-23',
      actId: 'act-6',
      startSegmentId: 'seg-47',
      endSegmentId: 'seg-49',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-23.png',
      imagePrompt:
        'A crisp editorial framework PPT slide dissecting Sesame Street and TV’s Three Commandments of Teaching. Top hand-lettered Chinese title: "《芝麻街》与电视教学三条戒律". Left sketch: a smiling puppet popping out of a TV set pulling a child away from a quiet classroom desk, Chinese tag: "教孩子爱电视，而非爱学校". Right side: three bold sketched stone-tablet rules crossed in vermilion marker: "① 不能有前提条件（废除循序渐进）", "② 不能令人困惑（只求舒服不求成长）", "③ 像躲瘟神一样避开阐述（故事配乐取代说理）".',
      overlay: {
        chapterTag: '第六幕 · 电视课程',
        headline: '无前提、无困惑、避阐述：《芝麻街》的真正课程',
      },
    },
    {
      sceneId: 'scene-24',
      actId: 'act-6',
      startSegmentId: 'seg-50',
      endSegmentId: 'seg-50',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-24.png',
      imagePrompt:
        'A sharp data-and-satire PPT slide on The Voyage of the Mimi project. Top hand-lettered Chinese title: "365万美元《咪咪见闻录》：电视绑架课纲". Left sketch: a dramatic TV camera filming a leaping humpback whale and stormy sailboat ("镜头爱拍鲸鱼与海难") while a school textbook and classroom chalkboard are tied behind the boat like tiny dinghies. Right side: a cobalt marker research clipboard reading "2800项实证研究：电视碎片缺乏推论性" and "半数观众几分钟后忘光新闻". Bottom red arrow: "教育迁就屏幕趣味".',
      overlay: {
        chapterTag: '第六幕 · 娱乐课堂实证',
        headline: '2800 项实证泼冷水：电视趣味倒过来绑架学校课纲',
      },
    },

    // ==================== ACT 7 ====================
    {
      sceneId: 'scene-25',
      actId: 'act-7',
      startSegmentId: 'seg-51',
      endSegmentId: 'seg-53',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-25.png',
      imagePrompt:
        'A witty editorial checklist PPT slide showing why four easy escapes from television fail. Top hand-lettered Chinese title: "为何四条逃生捷径全部失效？". Center four hand-drawn icons each stamped with a bold red crayon X: (1) a hammer smashing a TV ("砸毁电视：卢德幻想"); (2) a woman smiling at a TV news crew reporting on "No-TV Month" ("看电视呼吁不看电视"); (3) a comedy clown mocking TV on TV ("讽刺综艺：笑到最后仍是电视"); (4) a shiny crown on a serious news show ("提高质量：装严肃更危险"). Bottom underlined thesis: "问题不在看什么，而在我们在看电视".',
      overlay: {
        chapterTag: '第七幕 · 逃生捷径破产',
        headline: '砸电视、戒断月与讽刺综艺：四条捷径为何全失效',
      },
    },
    {
      sceneId: 'scene-26',
      actId: 'act-7',
      startSegmentId: 'seg-54',
      endSegmentId: 'seg-55',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-26.png',
      imagePrompt:
        'An earnest, thoughtful editorial PPT slide on Postman’s slim hope: Media Ecology Education. Top hand-lettered Chinese title: "希望渺茫的退路：学校培养媒介意识". Left sketch: a classroom chalkboard with a big question mark: "字母是何时发明的？" while students look puzzled as if asked when clouds were invented ("打破自然神话"). Right sketch: a magnifying glass inspecting both a 1985 TV screen and an early desktop computer ("前瞻拷问电脑：数据不足真是病根？"), with crisp Chinese questions: "什么是信息？它怎样重塑认知？".',
      overlay: {
        chapterTag: '第七幕 · 媒介意识教育',
        headline: '打破神话的唯一退路：教年轻人学会与媒介保持疏远',
      },
    },
    {
      sceneId: 'scene-27',
      actId: 'act-7',
      startSegmentId: 'seg-56',
      endSegmentId: 'seg-57',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-27.png',
      imagePrompt:
        'A crisp contemporary reflection PPT slide bridging 1985 television to today’s algorithmic smartphones. Top hand-lettered Chinese title: "当代回看：算法时代的奥威尔与赫胥黎合流". Left-to-right evolution sketch: a 1985 one-way living-room TV morphing into a glowing vertical smartphone streaming endless short-video hearts while hidden radar eyes and data threads track the viewer ("单向电视 → 手机短视频与精准追踪"). Center Venn-like merging arrow in vermilion and cobalt crayon: "奥威尔式监控 + 赫胥黎式沉溺 = 合流运转". Bottom green-marker takeaway: "刷屏前多问一句：界面在训练我怎么思考？".',
      overlay: {
        chapterTag: '第七幕 · 当代回看边界',
        headline: '跨越 1985 边界：短视频与算法时代监控与沉溺合流',
      },
    },
    {
      sceneId: 'scene-28',
      actId: 'act-7',
      startSegmentId: 'seg-58',
      endSegmentId: 'seg-58',
      layout: 'ppt-closing',
      motion: 'static',
      imageFile: 'scene-28.png',
      imagePrompt:
        'A warm, memorable hand-drawn closing keynote PPT slide wrapping up Neil Postman’s Amusing Ourselves to Death. Top bold hand-lettered Chinese headline with vermilion crayon underline: "在笑声之外，依然知道自己为何而笑". Center poetic editorial artwork: a calm reader sitting beneath a warm golden reading lamp with an open book, while a glowing television screen and smiling confetti float peacefully at a respectful distance—neither smashed nor worshipped. Beside the illustration, two crisp hand-lettered Chinese takeaway callouts with sketchy red bullet strokes: "不拒绝娱乐与笑声，拒绝交出清醒的思考权" and "随时保有安静下来、从头读懂复杂事物的能力". Subtle hand-lettered footer credit above the white bottom margin: "尼尔·波兹曼《娱乐至死》 · 1985 · 全书深读完结". Keep generous pure-white breathing space across the bottom 18% strip.',
      overlay: {
        chapterTag: '全书终极警示 · 完结',
        headline: '在笑声之外，依然知道自己为何而笑',
        quoteZh:
          '人们感到痛苦的不是他们用笑声代替了思考，而是他们不知道自己为什么笑以及为什么不再思考。',
        quoteSource: '尼尔·波兹曼《娱乐至死》 · 1985 · 全书深读',
      },
    },
  ],
};
