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
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第一幕 · 前言与现场起手',
        headline: '为什么《美丽新世界》比《一九八四》更难防？',
        quoteZh: '自由社会真正该警惕的，不是老大哥强迫你闭嘴，而是没人逼你，你自己却笑着放下了书本。',
        quoteSource: '尼尔·波兹曼《娱乐至死》（1985）',
      },
    },
    {
      sceneId: 'scene-02',
      actId: 'act-1',
      startSegmentId: 'seg-02',
      endSegmentId: 'seg-02',
      layout: 'data-contrast',
      motion: 'static',
      overlay: {
        chapterTag: '前言 · 两种反乌托邦预言',
        headline: '奥威尔的恐惧 vs 赫胥黎的警告',
        statItems: [
          {
            label: '奥威尔《一九八四》',
            value: '憎恨的东西毁掉我们：强权禁书、剥夺信息、真理被强行隐藏',
          },
          {
            label: '赫胥黎《美丽新世界》',
            value: '热爱的东西毁掉我们：无人禁书却无人想读、真理淹没在无聊琐碎中',
            highlight: true,
          },
        ],
      },
    },
    {
      sceneId: 'scene-03',
      actId: 'act-1',
      startSegmentId: 'seg-03',
      endSegmentId: 'seg-06',
      layout: 'editorial-illustration',
      motion: 'zoom-in',
      imageFile: 'scene-03.png',
      imagePrompt:
        'A sharp editorial satire of a 1983 television panel show after a nuclear-war film: five suited intellectuals and statesmen sit in a stiff row under glaring studio spotlights as if on a beauty-pageant stage, each isolated under a tiny ticking hourglass with zero eye contact or debate, while floating applause bursts and showbiz confetti drift across the studio floor.',
      overlay: {
        chapterTag: '第 6 章 · 1983《浩劫后》80 分钟无广告现场',
        headline: '撤掉广告与配乐，电视讨论为何依然像一场选美？',
      },
    },

    // ==================== ACT 2 ====================
    {
      sceneId: 'scene-04',
      actId: 'act-2',
      startSegmentId: 'seg-07',
      endSegmentId: 'seg-07',
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第二幕 · 第 1–2 章',
        headline: '媒介即隐喻与认识论：工具如何决定什么是真理',
        quoteZh: '文化重心从印刷之都纽约转向娱乐之都拉斯维加斯。',
      },
    },
    {
      sceneId: 'scene-05',
      actId: 'act-2',
      startSegmentId: 'seg-08',
      endSegmentId: 'seg-09',
      layout: 'editorial-illustration',
      motion: 'pan-right',
      imageFile: 'scene-05.png',
      imagePrompt:
        'Split editorial sketch on white paper: on the left, a frustrated thinker crouches by a small campfire trying to send complex philosophical diagrams through rising black smoke puffs that immediately scatter in the wind; on the right, a giant sketchy mechanical clock slices a yellow sunbeam into rigid numbered wedges and coins.',
      overlay: {
        chapterTag: '第 1 章 · 媒介即隐喻',
        headline: '烟雾发不出哲学，钟表把时间切成了商品',
      },
    },
    {
      sceneId: 'scene-06',
      actId: 'act-2',
      startSegmentId: 'seg-10',
      endSegmentId: 'seg-13',
      layout: 'editorial-illustration',
      motion: 'zoom-out',
      imageFile: 'scene-06.png',
      imagePrompt:
        'Wry university dissertation defense sketch: a nervous graduate student gestures toward his ear while pointing to spoken airwaves, facing three stern professors behind a heavy stack of red-stamped printed books; in the upper margin, a wry sketchy horse grins showing its teeth beside an ancient Greek scroll.',
      overlay: {
        chapterTag: '第 2 章 · 媒介即认识论',
        headline: '博士口试脚注与亚里士多德数马牙：真理要挑外衣穿',
      },
    },
    {
      sceneId: 'scene-07',
      actId: 'act-2',
      startSegmentId: 'seg-14',
      endSegmentId: 'seg-14',
      layout: 'quote-spotlight',
      motion: 'static',
      overlay: {
        chapterTag: '第 1–2 章 · 核心原理与三道防线',
        quoteZh: '你根本不可能用烟雾来表现哲学，它的形式已经排除了它的内容。',
        quoteEn: 'You cannot use smoke to do philosophy. Its form excludes the content.',
        quoteSource: '《娱乐至死》第 1 章 · 媒介形式决定话语形态',
      },
    },

    // ==================== ACT 3 ====================
    {
      sceneId: 'scene-08',
      actId: 'act-3',
      startSegmentId: 'seg-15',
      endSegmentId: 'seg-15',
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第三幕 · 第 3–4 章',
        headline: '铅字共和国：1854 年皮奥里亚集市与阐释年代',
        quoteZh: '在印刷机主宰的时代，普通农夫与工匠曾能消化持续数小时的书面逻辑交锋。',
      },
    },
    {
      sceneId: 'scene-09',
      actId: 'act-3',
      startSegmentId: 'seg-16',
      endSegmentId: 'seg-18',
      layout: 'editorial-illustration',
      motion: 'pan-left',
      imageFile: 'scene-09.png',
      imagePrompt:
        'Dynamic editorial sketch of an 18th-century wooden printing press cranking out crisp pamphlets that flutter across the page into the hands of everyday artisans, dockworkers, and farmers walking down a colonial street, absorbed in dense pages, while a tiny classical lyre fades at the corner.',
      overlay: {
        chapterTag: '第 3 章 · 印刷机统治下的美国',
        headline: '《常识》狂销数十万册与 3000 座“学园运动”演讲厅',
      },
    },
    {
      sceneId: 'scene-10',
      actId: 'act-3',
      startSegmentId: 'seg-19',
      endSegmentId: 'seg-21',
      layout: 'editorial-illustration',
      motion: 'zoom-in',
      imageFile: 'scene-10.png',
      imagePrompt:
        'Loose newspaper-style sketch of the 1854 Peoria outdoor debate: tall lean Abraham Lincoln in a stovepipe silhouette and stocky Stephen Douglas stand on a timber platform exchanging sharp logical arguments across a packed crowd of attentive farmers and townsfolk, with a sketchy seven-hour clock arc sweeping overhead from afternoon sun to evening moon.',
      overlay: {
        chapterTag: '第 4 章 · 1854 皮奥里亚 7 小时辩论与史料边界',
        headline: '三小时演说 + 三小时反驳：阐释年代的理性耐力',
      },
    },

    // ==================== ACT 4 ====================
    {
      sceneId: 'scene-11',
      actId: 'act-4',
      startSegmentId: 'seg-22',
      endSegmentId: 'seg-22',
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第四幕 · 第 5 章',
        headline: '语境爆破：电报、银版照片与“躲躲猫的世界”',
        quoteZh: '早在第一台电视机诞生之前，印刷时代的理性语境已被两枚 19 世纪炸药炸碎。',
      },
    },
    {
      sceneId: 'scene-12',
      actId: 'act-4',
      startSegmentId: 'seg-23',
      endSegmentId: 'seg-24',
      layout: 'editorial-illustration',
      motion: 'pan-right',
      imageFile: 'scene-12.png',
      imagePrompt:
        'Sketchy editorial diagram of 1844 telegraph poles and frantic black wires racing far ahead of a puffing steam locomotive across continents and ocean waves, with dozens of tiny disconnected paper snippets, exclamation marks, and trivia bubbles dangling randomly along the buzzing wire.',
      overlay: {
        chapterTag: '第 5 章 · 1844 莫尔斯电报',
        headline: '信息摆脱肉身速度，却沦为与行动无关的碎片',
      },
    },
    {
      sceneId: 'scene-13',
      actId: 'act-4',
      startSegmentId: 'seg-25',
      endSegmentId: 'seg-27',
      layout: 'editorial-illustration',
      motion: 'zoom-out',
      imageFile: 'scene-13.png',
      imagePrompt:
        'Loose expressive editorial sketch of a vintage bellows camera bursting open like a jack-in-the-box, shooting out isolated monochrome photo snapshots of unrelated events that pop in and vanish midair above an open newspaper crossword puzzle, conveying a fragmented peek-a-boo world.',
      overlay: {
        chapterTag: '第 5 章 · 银版照相术与“伪语境”',
        headline: '孤立的图像没有逻辑命题，新闻退化为填字游戏的消遣',
      },
    },

    // ==================== ACT 5 ====================
    {
      sceneId: 'scene-14',
      actId: 'act-5',
      startSegmentId: 'seg-28',
      endSegmentId: 'seg-28',
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第五幕 · 第 7–8 章',
        headline: '“好……现在”与电子教堂：新闻和神坛的娱乐化改写',
        quoteZh: '当电视成为主导认识论，严肃机构不得不主动按表演逻辑改写自己。',
      },
    },
    {
      sceneId: 'scene-15',
      actId: 'act-5',
      startSegmentId: 'seg-29',
      endSegmentId: 'seg-32',
      layout: 'editorial-illustration',
      motion: 'zoom-in',
      imageFile: 'scene-15.png',
      imagePrompt:
        'Sharp op-ed cartoon sketch of a polished TV news anchor flashing a rehearsed grin behind a desk; the backdrop screen is slashed diagonally by a jagged red lightning bolt—one half shows somber smoky crisis silhouettes, the other half bursts into a cheerful yellow weather sun, sports trophy, and floating musical jingle notes.',
      overlay: {
        chapterTag: '第 7 章 · “好……现在”新闻语法',
        headline: '45 秒灾难后瞬间切入彩蛋与广告，前后矛盾不再重要',
      },
    },
    {
      sceneId: 'scene-16',
      actId: 'act-5',
      startSegmentId: 'seg-33',
      endSegmentId: 'seg-35',
      layout: 'editorial-illustration',
      motion: 'pan-left',
      imageFile: 'scene-16.png',
      imagePrompt:
        'Wry editorial sketch of a living room seen from over the shoulder: a relaxed viewer slumped on a couch holding a snack bag in one hand and a TV remote in the other, watching a charismatic television preacher standing under dazzling neon show-stage spotlights framed by rising ratings charts and coin symbols.',
      overlay: {
        chapterTag: '第 8 章 · 42 小时电子教堂观察',
        headline: '危险不在于宗教成了电视内容，而在于电视成了宗教内容',
      },
    },

    // ==================== ACT 6 ====================
    {
      sceneId: 'scene-17',
      actId: 'act-6',
      startSegmentId: 'seg-36',
      endSegmentId: 'seg-36',
      layout: 'act-title-card',
      motion: 'static',
      overlay: {
        chapterTag: '第六幕 · 第 9–10 章',
        headline: '30 秒选票疗法与《芝麻街》：政治、广告和教室',
        quoteZh: '从商业心理疗法到选票包装，再到必须逗笑学生的课堂。',
      },
    },
    {
      sceneId: 'scene-18',
      actId: 'act-6',
      startSegmentId: 'seg-37',
      endSegmentId: 'seg-39',
      layout: 'editorial-illustration',
      motion: 'pan-right',
      imageFile: 'scene-18.png',
      imagePrompt:
        'Satirical political-column sketch: on the left, a bespectacled candidate staggers under a towering stack of heavy policy books ignored by the crowd; on the right, a suave rival stands beneath stage lights waving effortlessly inside a bright 30-second frame as floating ballots rush toward him, with a clock showing only a single present-tense hand.',
      overlay: {
        chapterTag: '第 9 章 · 伸出你的手投票',
        headline: '厚重政纲输给 30 秒形象广告，电视语法只有“现在时”',
      },
    },
    {
      sceneId: 'scene-19',
      actId: 'act-6',
      startSegmentId: 'seg-40',
      endSegmentId: 'seg-42',
      layout: 'editorial-illustration',
      motion: 'zoom-in',
      imageFile: 'scene-19.png',
      imagePrompt:
        'Sharp editorial illustration of a classroom chalkboard scene: an exhausted schoolteacher in formal attire frantically balances on a unicycle juggling glowing colored balls and electric-guitar notes just to keep the gaze of bored students slouching at desks expecting nonstop entertainment.',
      overlay: {
        chapterTag: '第 10 章 · 杜威“附带学习”与 1.6 万小时屏幕',
        headline: '《芝麻街》教会了字母，却更深地教会孩子厌恶枯燥的思考',
      },
    },

    // ==================== ACT 7 ====================
    {
      sceneId: 'scene-20',
      actId: 'act-7',
      startSegmentId: 'seg-43',
      endSegmentId: 'seg-46',
      layout: 'editorial-illustration',
      motion: 'zoom-out',
      imageFile: 'scene-20.png',
      imagePrompt:
        'Ironic editorial cartoon of a suburban family standing proudly beside a silent TV set crossed out with bold red tape, while outside their living-room window a frantic swarm of TV camera crews, boom mics, and bright floodlights film their boycott as the evening headline spectacle.',
      overlay: {
        chapterTag: '第 11 章 · 1984 巴布科克夫人的悖论',
        headline: '抵制电视本身被拍成了电视秀，只剩媒介意识教育这一条窄路',
      },
    },
    {
      sceneId: 'scene-21',
      actId: 'act-7',
      startSegmentId: 'seg-47',
      endSegmentId: 'seg-49',
      layout: 'editorial-illustration',
      motion: 'pan-left',
      imageFile: 'scene-21.png',
      imagePrompt:
        'Editorial evolution sketch across white paper: a chunky 1985 CRT television box on the left shoots hurried red doodle arrows rightward, multiplying into dozens of glowing vertical smartphone screens and endless scrolling streams orbiting the silhouette of a modern commuter staring downward.',
      overlay: {
        chapterTag: '方法与当代回看边界',
        headline: '从 1985 三大广播网到今天的算法短视频瀑布流',
      },
    },
    {
      sceneId: 'scene-22',
      actId: 'act-7',
      startSegmentId: 'seg-50',
      endSegmentId: 'seg-51',
      layout: 'quote-spotlight',
      motion: 'static',
      overlay: {
        chapterTag: '全书终极核心命题',
        quoteZh:
          '文化灭亡不必等待强权禁书与真理部的暴政，只要公共话语心甘情愿地按娱乐业逻辑自我改写，人就会在毫无痛感的笑声中丧失严肃思考与历史记忆的能力。',
        quoteSource: '尼尔·波兹曼《娱乐至死》全书收束',
      },
    },
    {
      sceneId: 'scene-23',
      actId: 'act-7',
      startSegmentId: 'seg-52',
      endSegmentId: 'seg-52',
      layout: 'closing-card',
      motion: 'static',
      overlay: {
        chapterTag: '本期全书深读完结',
        headline: '《娱乐至死》· 尼尔·波兹曼',
        quoteZh: '愿我们在笑声之外，依然保有一份面向严肃问题停下来追问的清醒。',
        quoteSource: '章艳 译 · 中信出版社 2015',
      },
    },
  ],
};

export const VIDEO_PLANS_BY_BOOK: Record<string, BookVideoPlan> = {
  [AMUSING_VIDEO_PLAN.bookSlug]: AMUSING_VIDEO_PLAN,
};
