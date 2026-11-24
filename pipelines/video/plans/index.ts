import { AMUSING_VIDEO_PLAN, type BookVideoPlan } from './amusing.ts';
import { XIANGTU_VIDEO_PLAN } from './xiangtuZhongguo.ts';

export { AMUSING_VIDEO_PLAN, XIANGTU_VIDEO_PLAN };
export type { BookVideoPlan, DeclarativeVideoScene } from './amusing.ts';

export const VIDEO_PLANS_BY_BOOK: Record<string, BookVideoPlan> = {
  [AMUSING_VIDEO_PLAN.bookSlug]: AMUSING_VIDEO_PLAN,
  [XIANGTU_VIDEO_PLAN.bookSlug]: XIANGTU_VIDEO_PLAN,
};
