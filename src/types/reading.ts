export type AppRouteMode = 'library' | 'reader';

export type ViewMode = 'map' | 'overview' | 'key20' | 'all';

export type ChapterPart = string;

export type EpistemicFilter = 'all' | 'inference';

export interface ChapterProposition {
  id: string;
  indexLabel: string;
  chapterTitle: string;
  part: ChapterPart;
  partLabel: string;
  shortLabel?: string;
  coreProposition: string;
  /** Connected paragraph weaving the question answered, common sense overturned, and author's evidence. */
  narrative: string;
  extensionOrInference?: {
    kind: '引申' | '推断' | '保留标注';
    text: string;
  };
}

export interface ArgumentMapStep {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel?: string;
  chaptersRange: string;
  question: string;
  leadJudgment: string;
  paragraphs: string[];
  transitionNote: string;
}

export interface BoundaryComparison {
  id: string;
  question: string;
  leadJudgment: string;
  authorMethodParagraphs: string[];
  readerLookbackParagraphs: string[];
}

export type QuoteOrigin = 'original' | 'back-translation' | 'chinese-original';

export type KeyGroupId = string;

export interface KeyInsightItem {
  id: number;
  indexLabel: string;
  groupId: KeyGroupId;
  chapterRef: string;
  propositionZh: string;
  propositionEn?: string;
  conceptNote?: string;
  quoteOrigin: QuoteOrigin;
  /** Connected analysis explaining what common sense is overturned, its role, and its concrete anchor. */
  analysis: string;
}

export interface KeyGroupSection {
  id: KeyGroupId;
  title: string;
  shortLabel?: string;
  rangeLabel: string;
  question: string;
  answerLead: string;
}

export interface UltimateThesisBlock {
  question: string;
  thesis: string;
  answerParagraphs: string[];
}

export interface OverviewIntroBlock {
  question: string;
  answerLead: string;
}

export interface BookReadingDataset {
  ultimateThesis: UltimateThesisBlock;
  overviewIntroQa: OverviewIntroBlock;
  chapters: ChapterProposition[];
  argumentMapSteps: ArgumentMapStep[];
  boundaryComparison: BoundaryComparison;
  keyGroups: KeyGroupSection[];
  keyInsights: KeyInsightItem[];
}

export interface BookEntry {
  slug: string;
  title: string;
  originalTitle: string;
  author: string;
  translator?: string;
  publisherInfo: string;
  publicationYear: string;
  category: string;
  readingTimeLabel: string;
  premiseHook: string;
  dataset: BookReadingDataset;
}

export type FontScale = 'standard' | 'large';
