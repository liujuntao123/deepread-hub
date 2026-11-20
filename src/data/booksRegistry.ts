import type { BookEntry } from '../types/reading';
import {
  ARGUMENT_MAP_STEPS,
  BOUNDARY_COMPARISON,
  CHAPTER_PROPOSITIONS,
  KEY_GROUPS,
  KEY_INSIGHTS,
  OVERVIEW_INTRO_QA,
  ULTIMATE_THESIS,
} from './amusingData';
import { PUBLIC_OPINION_DATASET } from './publicOpinionData';
import { XIANGTU_DATASET } from './xiangtuData';
import { SAPIENS_DATASET } from './sapiensData';
import { HOMO_DEUS_DATASET } from './homoDeusData';
import { TWENTY_ONE_LESSONS_DATASET } from './twentyOneLessonsData';

export const BOOKS_CATALOG: BookEntry[] = [
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
    dataset: {
      ultimateThesis: ULTIMATE_THESIS,
      overviewIntroQa: OVERVIEW_INTRO_QA,
      chapters: CHAPTER_PROPOSITIONS,
      argumentMapSteps: ARGUMENT_MAP_STEPS,
      boundaryComparison: BOUNDARY_COMPARISON,
      keyGroups: KEY_GROUPS,
      keyInsights: KEY_INSIGHTS,
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
    dataset: XIANGTU_DATASET,
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
    dataset: PUBLIC_OPINION_DATASET,
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
    dataset: SAPIENS_DATASET,
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
    dataset: HOMO_DEUS_DATASET,
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
    dataset: TWENTY_ONE_LESSONS_DATASET,
  },
];
