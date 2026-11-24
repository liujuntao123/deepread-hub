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
      overlay: {
        chapterTag: '全书视觉精读 · 1985',
        headline: '娱乐至死',
        subtitleText: '当所有认真的事，都必须长得像娱乐',
        quoteZh: '自由社会真正该警惕的，不是老大哥强迫你闭嘴，而是没人逼你，你自己却笑着放下了书本。',
        quoteSource: '尼尔·波兹曼（Neil Postman） · 全书深读',
      },
    },
    {
      sceneId: 'scene-02',
      actId: 'act-1',
      startSegmentId: 'seg-02',
      endSegmentId: 'seg-02',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-02.png',
      imagePrompt:
        'A two-column editorial comparison PPT slide divided by a sketchy red vertical marker line. Top hand-lettered Chinese title: "两种反乌托邦预言". Left side labeled "奥威尔《一九八四》" with dark cobalt/charcoal crayon sketch of an iron boot stomping locked books and a looming surveillance eye, short hand-lettered Chinese callout: "憎恨的东西毁掉我们 / 强权禁书". Right side labeled "赫胥黎《美丽新世界》" in vivid vermilion & mustard yellow crayon showing a grinning figure reclining under glowing screens and smiling pills with untouched books tossed aside, bold red-underlined Chinese callout: "热爱的东西毁掉我们 / 无人想读".',
      overlay: {
        chapterTag: '第一幕 · 两种反乌托邦',
        headline: '奥威尔的恐惧 vs 赫胥黎的警告',
      },
    },
    {
      sceneId: 'scene-03',
      actId: 'act-1',
      startSegmentId: 'seg-03',
      endSegmentId: 'seg-04',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-03.png',
      imagePrompt:
        'An editorial infographic PPT slide depicting the 1983 ABC television panel after the nuclear-war film The Day After. Top hand-lettered Chinese title: "1983《浩劫后》80分钟无广告直播". Center illustration: five sharp adult caricatures of famous statesmen and scholars (Kissinger, McNamara, Carl Sagan, Elie Wiesel, Buckley) seated stiffly under blinding yellow-crayon studio spotlights, with crossed-out commercial icons on the margin. Hand-lettered Chinese callouts with sketchy arrows: "清空广告与配乐" and "顶级政要与学者同台".',
      overlay: {
        chapterTag: '第一幕 · 1983 现场起手',
        headline: '清空广告与配乐，顶级学者讨论核战争',
      },
    },
    {
      sceneId: 'scene-04',
      actId: 'act-1',
      startSegmentId: 'seg-05',
      endSegmentId: 'seg-06',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-04.png',
      imagePrompt:
        'A sharp satirical PPT slide showing why the 1983 panel collapsed into showbiz. Top hand-lettered Chinese title: "为何严肃辩论滑向选美秀？". Center sketch: speakers trapped inside isolated 5-minute hourglass bubbles with zero debate lines connecting them, confetti and applause bursts raining down like a beauty pageant; bottom-right mini conceptual diagram with red arrow from "技术（机器）" to "媒介（文化空气）", and a bold marker callout: "除了娱乐业，没有其他行业".',
      overlay: {
        chapterTag: '第一幕 · 技术与媒介之分',
        headline: '每人五分钟独白：除了娱乐业没有其他行业',
      },
    },

    // ==================== ACT 2 ====================
    {
      sceneId: 'scene-05',
      actId: 'act-2',
      startSegmentId: 'seg-07',
      endSegmentId: 'seg-08',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-05.png',
      imagePrompt:
        'An editorial concept PPT slide on "Media as Metaphor". Top hand-lettered Chinese title: "媒介即隐喻：形式排除内容". Left sketch: a wry philosopher crouching by a small campfire trying to send dense geometric logic symbols via rising smoke puffs that instantly scatter in the wind, Chinese tag: "烟雾发不出哲学". Right sketch: a portly 1900s president silhouette (Taft) speaking confidently into a vintage radio mic yet cropped awkwardly out of a glowing TV close-up frame, Chinese tag: "镜头先于开口否决".',
      overlay: {
        chapterTag: '第二幕 · 媒介即隐喻',
        headline: '烟雾发不出哲学，形式早已筛掉了内容',
      },
    },
    {
      sceneId: 'scene-06',
      actId: 'act-2',
      startSegmentId: 'seg-09',
      endSegmentId: 'seg-09',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-06.png',
      imagePrompt:
        'A crisp hand-drawn visual-essay PPT slide showing how tools reshape human cognition. Top hand-lettered Chinese title: "工具如何改写心智". Three sketchy editorial vignettes linked by red marker arrows: a giant mechanical clock slicing a yellow sunbeam into numbered coins ("钟表：时间变成商品"), a pair of 12th-century spectacles and a microscope lens revealing hidden worlds ("眼镜与显微镜：拓展认知边界"), and a bold bottom marker flow chain: "语言 → 媒介 → 隐喻 → 文化内容".',
      overlay: {
        chapterTag: '第二幕 · 隐喻创造文化',
        headline: '钟表、眼镜与显微镜：语言→媒介→隐喻→文化',
      },
    },
    {
      sceneId: 'scene-07',
      actId: 'act-2',
      startSegmentId: 'seg-10',
      endSegmentId: 'seg-10',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-07.png',
      imagePrompt:
        'A witty editorial PPT slide clarifying Postman’s real target. Top hand-lettered Chinese title: "危险不在低俗，而在严肃使命娱乐化". Left side in light blue & green crayon: goofy soap operas and comedy shows inside a small TV labeled with a green checkmark "纯消遣无伤大雅". Right side in sharp vermilion red & black crayon: a glowing TV wearing a judge wig, graduation cap, and news anchor tie trying to issue a giant stamped "真理通行证", marked with a bold red warning exclamation.',
      overlay: {
        chapterTag: '第二幕 · 媒介即认识论',
        headline: '电视上的消遣不可怕，可怕的是谁发“真理通行证”',
      },
    },
    {
      sceneId: 'scene-08',
      actId: 'act-2',
      startSegmentId: 'seg-11',
      endSegmentId: 'seg-12',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-08.png',
      imagePrompt:
        'A wry two-part satirical PPT slide. Top hand-lettered Chinese title: "真理必须挑外衣穿". Main left illustration: a flustered PhD candidate gesturing to spoken airwaves while four stern professors behind a towering fortress of red-stamped printed books reject his oral footnote, labeled "博士口试：只认白纸黑字". Upper-right witty vignette: ancient Greek thinker Aristotle stroking his beard beside a scroll while a grinning horse shows its teeth nearby, labeled "亚里士多德从不数牙齿".',
      overlay: {
        chapterTag: '第二幕 · 真理的外衣',
        headline: '博士口试脚注与亚里士多德的讽刺',
      },
    },
    {
      sceneId: 'scene-09',
      actId: 'act-2',
      startSegmentId: 'seg-13',
      endSegmentId: 'seg-14',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-09.png',
      imagePrompt:
        'An editorial framework PPT slide contrasting definitions of intelligence. Top hand-lettered Chinese title: "智力标尺的转移与三条防线". Upper half split comparison: left shows crowned King Solomon surrounded by floating spoken proverbs ("口语时代：3000条谚语记忆"), right shows a still reader calmly turning dense printed pages ("印刷时代：静坐思辨 · 推迟判断"). Lower band in neat marker callout strip with three small shields: "① 非相对论  ② 变的是话语而非脑容量  ③ 残余认识论".',
      overlay: {
        chapterTag: '第二幕 · 智力标尺与防线',
        headline: '从背诵谚语到“推迟判断”及三条边界防线',
      },
    },

    // ==================== ACT 3 ====================
    {
      sceneId: 'scene-10',
      actId: 'act-3',
      startSegmentId: 'seg-15',
      endSegmentId: 'seg-16',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-10.png',
      imagePrompt:
        'A punchy hand-drawn data infographic PPT slide about Colonial America’s print culture. Top hand-lettered Chinese title: "铅字共和国的硬数据". Left hand-drawn crayon bar chart showing colonial literacy in 1640-1700: tall cobalt bar "男性识字率 89%–95%" and orange bar "女性约 62%". Right sketch: Thomas Paine’s pamphlet Common Sense bursting out of a wooden press with dramatic red arrow comparing "1776年售出 30–40万册" to a stadium icon "≈ 1985年 2400万册（比肩超级碗）".',
      overlay: {
        chapterTag: '第三幕 · 铅字共和国',
        headline: '高达 95% 的识字率与《常识》狂销奇迹',
      },
    },
    {
      sceneId: 'scene-11',
      actId: 'act-3',
      startSegmentId: 'seg-17',
      endSegmentId: 'seg-18',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-11.png',
      imagePrompt:
        'An editorial storytelling PPT slide about the Lyceum Movement and print authority. Top hand-lettered Chinese title: "3000座演讲厅与铅字的威严". Center sketch: tired artisans and factory workers streaming after work into a packed wooden lecture hall labeled "1835 学园运动 · 3000+演讲厅". Side vignette: a cautious colonial sect waving hands away from a heavy printing press ("拒印教义：怕被铅字永远束缚"). Bottom-right poetic sketch of a fading classical lyre beside iron type blocks with Chinese callout: "有印刷机，还会有《伊利亚特》吗？".',
      overlay: {
        chapterTag: '第三幕 · 印刷机统治下的美国',
        headline: '3000 座“学园运动”演讲厅与铅字定论',
      },
    },
    {
      sceneId: 'scene-12',
      actId: 'act-3',
      startSegmentId: 'seg-19',
      endSegmentId: 'seg-19',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-12.png',
      imagePrompt:
        'A vibrant hand-drawn historical PPT slide of the 1854 Peoria Lincoln-Douglas debate. Top hand-lettered Chinese title: "1854 皮奥里亚：7小时户外辩论". Center illustration: tall lean Abraham Lincoln and stocky Stephen Douglas debating on a timber outdoor stage before an attentive crowd of farmers and townsfolk, with a giant sketchy yellow-to-indigo sky arc above showing the timeline in crisp Chinese callouts: "道格拉斯 3小时演说" → "回家吃晚饭" → "林肯 4小时反驳".',
      overlay: {
        chapterTag: '第三幕 · 阐释年代巅峰',
        headline: '三小时演说 + 回家吃晚饭 + 四小时反驳',
      },
    },
    {
      sceneId: 'scene-13',
      actId: 'act-3',
      startSegmentId: 'seg-20',
      endSegmentId: 'seg-21',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-13.png',
      imagePrompt:
        'A split editorial PPT slide covering print-era ads and historical sampling boundaries. Top hand-lettered Chinese title: "广告语境的断裂与史料边界". Left side: a clean 1704 text-only newspaper ad filled with calm prose ("1704 纯文字说理广告") transitioning via jagged red lightning to flashy 1890s illustrated baby-cereal & cigarette posters ("1890s 图像与口号侵入"). Right margin card framed with a dashed cobalt pen line showing silhouetted figures standing outside a 19th-century polling booth, labeled "清醒边界：当时被排除在外的女性与底层人群".',
      overlay: {
        chapterTag: '第三幕 · 广告转型与史料边界',
        headline: '从纯文字散文广告到图像侵入，兼看采样边界',
      },
    },

    // ==================== ACT 4 ====================
    {
      sceneId: 'scene-14',
      actId: 'act-4',
      startSegmentId: 'seg-22',
      endSegmentId: 'seg-24',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-14.png',
      imagePrompt:
        'An energetic editorial infographic PPT slide on the 1844 telegraph revolution. Top hand-lettered Chinese title: "1844 莫尔斯电报：信息—行动比崩溃". Illustration: frantic buzzing black telegraph wires racing far ahead of a puffing steam locomotive labeled "火车 35英里/时", shooting irrelevant trivia bubbles across the ocean with a wry Thoreau doodle asking "公主得了百日咳？". Bold red marker summary tag: "信息摆脱肉身，却与行动彻底脱节".',
      overlay: {
        chapterTag: '第四幕 · 语境爆破（一）',
        headline: '电报跑赢火车，信息—行动比第一次崩溃',
      },
    },
    {
      sceneId: 'scene-15',
      actId: 'act-4',
      startSegmentId: 'seg-25',
      endSegmentId: 'seg-25',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-15.png',
      imagePrompt:
        'A conceptual editorial PPT slide on the invention of photography. Top hand-lettered Chinese title: "图像革命：辨认 vs 理解". Left side: a vintage bellows camera snapping a framed snapshot of a single concrete oak tree ("相机只能定格此时此地的橡树"), tagged "看照片只需辨认". Right side: an open book radiating abstract scales of justice and logical links ("文字可探讨抽象与真假"), tagged "看文字需要理解".',
      overlay: {
        chapterTag: '第四幕 · 语境爆破（二）',
        headline: '看照片只需要辨认，看文字却需要理解',
      },
    },
    {
      sceneId: 'scene-16',
      actId: 'act-4',
      startSegmentId: 'seg-26',
      endSegmentId: 'seg-27',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-16.png',
      imagePrompt:
        'A clever satirical PPT slide illustrating "Pseudo-context" and the "Peek-a-boo World". Top hand-lettered Chinese title: "伪语境与“躲躲猫的世界”". Center illustration: a giant crossword puzzle and quiz-show buzzer catching dozens of tiny unrelated news snapshots popping up and vanishing midair, feeding directly into a glowing crowned retro TV labeled "电视：元媒介（决定我们怎样认识世界）". Crisp Chinese callout: "为无用信息制造问题".',
      overlay: {
        chapterTag: '第四幕 · 伪语境与元媒介',
        headline: '填字游戏与“躲躲猫的世界”：电视升格为元媒介',
      },
    },

    // ==================== ACT 5 ====================
    {
      sceneId: 'scene-17',
      actId: 'act-5',
      startSegmentId: 'seg-28',
      endSegmentId: 'seg-30',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-17.png',
      imagePrompt:
        'A biting op-ed cartoon PPT slide on TV news grammar. Top hand-lettered Chinese title: "电视新闻的万能转场：“好……现在”". Center sketch: a polished smiling TV anchor behind a desk; the screen behind is slashed diagonally by a jagged red lightning bolt—left half shows somber smoky crisis scenes ("45秒灾难新闻"), right half bursts into a cheerful juicy hamburger ad and sports trophy ("秒切汉堡广告与比分"). Small margin note: "相貌决定可信度".',
      overlay: {
        chapterTag: '第五幕 · 新闻的娱乐化',
        headline: '45 秒灾难后一句“好……现在”，瞬间切入广告',
      },
    },
    {
      sceneId: 'scene-18',
      actId: 'act-5',
      startSegmentId: 'seg-31',
      endSegmentId: 'seg-32',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-18.png',
      imagePrompt:
        'A sharp editorial PPT slide on fragmented memory and disinformation. Top hand-lettered Chinese title: "割裂的世界里，自相矛盾不存在". Center visual metaphor: two completely contradictory statements floating inside separate bubble islands labeled "昨日说法" and "今日说法" with a broken bridge between them, while an unfazed viewer shrugs ("一个在那里，一个在这里"). Bold red marker definition box: "假信息 ≠ 假话，而是让你误以为知情的碎片".',
      overlay: {
        chapterTag: '第五幕 · 假信息的本质',
        headline: '里根误述无人关注：没有语境就没有矛盾',
      },
    },
    {
      sceneId: 'scene-19',
      actId: 'act-5',
      startSegmentId: 'seg-33',
      endSegmentId: 'seg-35',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-19.png',
      imagePrompt:
        'A witty satirical PPT slide on Televangelism. Top hand-lettered Chinese title: "42小时电子教堂：当神坛搬进客厅". Illustration: over-the-shoulder view of a casual viewer slumped on a living-room sofa holding a snack bag and a TV remote ("客厅薯片 + 遥控器一秒换台"), watching a dazzling showbiz preacher bathed in neon spotlights and rising ratings arrows. Bold vermilion Chinese callout: "危险在于电视成为宗教的内容".',
      overlay: {
        chapterTag: '第五幕 · 电子教堂观察',
        headline: '手握遥控器的客厅：电视成了宗教的内容',
      },
    },

    // ==================== ACT 6 ====================
    {
      sceneId: 'scene-20',
      actId: 'act-6',
      startSegmentId: 'seg-36',
      endSegmentId: 'seg-37',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-20.png',
      imagePrompt:
        'An editorial comparison PPT slide on how TV commercials rewired capitalism. Top hand-lettered Chinese title: "30秒广告：瞬间心理疗法". Left side: Adam Smith’s calm classical market scale weighing clear product specs and price tags ("古典预设：理性货比三家"). Right side with a bold red arrow: a warm 30-second TV melodrama glowing with hearts and comforting smiles soothing a stressed viewer’s anxiety ("现代广告：不讲参数，兜售情绪慰藉").',
      overlay: {
        chapterTag: '第六幕 · 广告即心理疗法',
        headline: '从亚当·斯密的理性市场到 30 秒情绪小剧场',
      },
    },
    {
      sceneId: 'scene-21',
      actId: 'act-6',
      startSegmentId: 'seg-38',
      endSegmentId: 'seg-39',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-21.png',
      imagePrompt:
        'A biting political-cartoon PPT slide on image-driven elections. Top hand-lettered Chinese title: "政治话语舍弃了思想与历史". Left sketch: a bespectacled candidate struggling under a towering stack of heavy policy books ignored by voters ("厚重政纲惨败"). Right sketch: a charismatic rival waving inside a bright 30-second TV frame pulling a rush of flying ballots ("30秒形象广告胜出"). Corner icon of a clock with only one hand labeled "电视语法只有现在时 · 私营文化部".',
      overlay: {
        chapterTag: '第六幕 · 选票包装与现在时',
        headline: '厚重政纲输给 30 秒形象广告，历史退为灰色混沌',
      },
    },
    {
      sceneId: 'scene-22',
      actId: 'act-6',
      startSegmentId: 'seg-40',
      endSegmentId: 'seg-41',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-22.png',
      imagePrompt:
        'A clever editorial PPT slide about Dewey’s Collateral Learning and TV education. Top hand-lettered Chinese title: "电视教学的三条铁律". Left sketch: a dramatic $3.65M sailing-ship adventure TV crew filming a whale for city schoolchildren ("365万美元《咪咪见闻录》：只因最好拍"). Right hand-drawn checklist card with bold marker ticks titled "杜威·附带学习": "① 不设前提条件" / "② 不能让人困惑" / "③ 避开长篇阐述".',
      overlay: {
        chapterTag: '第六幕 · 教学的娱乐化',
        headline: '杜威“附带学习”与电视教学的三条铁律',
      },
    },
    {
      sceneId: 'scene-23',
      actId: 'act-6',
      startSegmentId: 'seg-42',
      endSegmentId: 'seg-42',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-23.png',
      imagePrompt:
        'A memorable satirical PPT slide on Sesame Street and classroom entertainment. Top hand-lettered Chinese title: "1.6万小时屏幕与《芝麻街》悖论". Center sketch: an exhausted schoolteacher balancing on a unicycle juggling glowing colored balls and rock-guitar notes in front of chalkboard letters, trying to hold bored students’ gaze. Bold hand-lettered Chinese callout: "它鼓励孩子热爱的不是学校，而是电视".',
      overlay: {
        chapterTag: '第六幕 · 教室里的马戏团',
        headline: '中学毕业前 1.6 万小时屏幕：鼓励热爱的是电视',
      },
    },

    // ==================== ACT 7 ====================
    {
      sceneId: 'scene-24',
      actId: 'act-7',
      startSegmentId: 'seg-43',
      endSegmentId: 'seg-45',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-24.png',
      imagePrompt:
        'An ironic editorial cartoon PPT slide depicting Mrs. Babcock’s 1984 paradox. Top hand-lettered Chinese title: "1984 巴布科克夫人的悖论". Center illustration: a proud suburban family standing next to a silent TV taped over with a bold red X ("一个月不看电视"), while outside their window a frantic swarm of TV news cameras and boom mics film them excitedly. Bold red-underlined Chinese punchline: "对电视的批评，最后仍依赖电视本身".',
      overlay: {
        chapterTag: '第七幕 · 赫胥黎的警告',
        headline: '抵制电视本身被拍成了电视秀',
      },
    },
    {
      sceneId: 'scene-25',
      actId: 'act-7',
      startSegmentId: 'seg-46',
      endSegmentId: 'seg-47',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-25.png',
      imagePrompt:
        'A thoughtful editorial diagram PPT slide on Media Ecology and education. Top hand-lettered Chinese title: "唯一窄路：教育与灾难的竞赛". Upper visual: a tightrope walker carrying a glowing lantern labeled "媒介意识教育" crossing a chasm between two sketchy cliffs ("追问信息的来源与形式"). Lower balanced scale sketch showing both print and TV have trade-offs, labeled "拒绝简单技术决定论 · 保持清醒尺度".',
      overlay: {
        chapterTag: '第七幕 · 窄路与方法边界',
        headline: '媒介意识教育，与媒介生态学的清醒边界',
      },
    },
    {
      sceneId: 'scene-26',
      actId: 'act-7',
      startSegmentId: 'seg-48',
      endSegmentId: 'seg-49',
      layout: 'ppt-slide',
      motion: 'static',
      imageFile: 'scene-26.png',
      imagePrompt:
        'A striking modern editorial PPT slide bridging 1985 to today’s smartphones. Top hand-lettered Chinese title: "40年后：写字台与拉斯维加斯装进同一只口袋". Left side: a chunky 1985 CRT television sending sketchy red arrows rightward into a single glowing modern smartphone screen split in two—one half showing a neon Las Vegas slot-machine short-video waterfall ("算法短视频"), the other half showing a calm desk lamp, notebook, and deep discussion ("长文写作与查证").',
      overlay: {
        chapterTag: '第七幕 · 当代回看边界',
        headline: '印刷写字台与拉斯维加斯舞台，塞进同一只手机口袋',
      },
    },
    {
      sceneId: 'scene-27',
      actId: 'act-7',
      startSegmentId: 'seg-50',
      endSegmentId: 'seg-52',
      layout: 'ppt-closing',
      motion: 'static',
      overlay: {
        chapterTag: '全书终极命题 · 完结',
        headline: '当心认真的事，也必须长得像娱乐',
        quoteZh:
          '文化灭亡不必等待强权禁书与真理部的暴政，只要公共话语心甘情愿地按娱乐业逻辑自我改写，人就会在毫无痛感的笑声中，慢慢丧失严肃思考与历史记忆的能力。',
        quoteSource: '尼尔·波兹曼《娱乐至死》 · 章艳 译 · 中信出版社 2015',
      },
    },
  ],
};

export const VIDEO_PLANS_BY_BOOK: Record<string, BookVideoPlan> = {
  [AMUSING_VIDEO_PLAN.bookSlug]: AMUSING_VIDEO_PLAN,
};
