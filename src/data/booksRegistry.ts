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
];
