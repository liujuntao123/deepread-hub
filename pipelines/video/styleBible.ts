import type { VideoStyleBible } from './types';

/**
 * Default visual style bible for deepread-hub podcast video PPT slides:
 * Loose Sketchy Crayon & Marker Editorial Infographic PPT Slide (手绘蜡笔与马克笔编辑信息图 PPT).
 */
export const DEFAULT_VIDEO_STYLE_BIBLE: VideoStyleBible = {
  promptPrefix: [
    'Widescreen 16:9 hand-drawn editorial presentation slide on clean pure-white paper, quickly sketched with wax crayons, dry colored pencils, and broad felt markers in the spirit of sharp newspaper op-ed infographics and intellectual visual essays.',
    'Linework: fast, gestural, sketchy black ink and dark crayon strokes with uneven weight, hurried cross-hatching, loose overlapping construction lines, and expressive broken contours.',
    'Color & texture: vivid direct editorial hues (vermilion red, mustard yellow, cobalt blue, burnt orange, violet, forest green) applied in rapid grainy crayon shading and flat marker swipes that casually bleed past contours, leaving raw paper grain and clean white breathing space.',
    'Figures & objects: sharp adult editorial caricature and witty visual shorthand—lean expressive silhouettes, understated ironic posture, and distilled iconic objects rendered in confident hurried strokes.',
    'Slide layout & Chinese hand-lettering: structured like a high-craft hand-sketched keynote PPT page with clear visual hierarchy, sketchy directional arrows, marker underlines, and concise, crisp, accurately written hand-lettered Simplified Chinese title and 2-3 short keyword callouts integrated organically into the white space.',
  ].join(' '),
  promptSuffix: [
    'Keep every Simplified Chinese character clean, legible, bold, and accurately spelled in natural dark-ink or marker hand-lettering.',
    'Reserve the bottom 15% strip of the canvas as clean pure-white paper breathing space for subtitles.',
    'Texture finish: raw analog sketchbook immediacy, dry wax-crayon grain, flat marker tooth, pure white background (#FFFFFF).',
  ].join(' '),
  palette: {
    paperBg: '#FFFFFF',
    inkPrimary: '#1C1917',
    accent: '#E11D48',
  },
};

export function composeStyledImagePrompt(
  scenePrompt: string,
  styleBible: VideoStyleBible = DEFAULT_VIDEO_STYLE_BIBLE
): string {
  return [
    styleBible.promptPrefix,
    `Slide content & Chinese annotations: ${scenePrompt.trim()}`,
    styleBible.promptSuffix,
  ].join('\n\n');
}
