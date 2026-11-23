import type { VideoStyleBible } from './types';

/**
 * Default visual style bible for deepread-hub podcast video illustrations:
 * Loose Sketchy Crayon & Marker Editorial Illustration (潦草手绘蜡笔与马克笔编辑插画).
 */
export const DEFAULT_VIDEO_STYLE_BIBLE: VideoStyleBible = {
  promptPrefix: [
    'Loose, sketchy hand-drawn editorial illustration on clean white paper, quickly scrawled with wax crayons, dry colored pencils, and broad felt markers in the spirit of sharp newspaper op-ed comics and intellectual magazine column art.',
    'Linework: fast, gestural, sketchy black ink and dark crayon strokes with uneven weight, hurried cross-hatching, loose overlapping construction lines, and raw broken contours.',
    'Color & texture: vivid direct editorial hues (red, yellow, cobalt blue, orange, violet, green) applied in rapid, grainy crayon shading and flat marker swipes that casually bleed past the contours, leaving raw paper grain and uncolored white gaps visible.',
    'Figures & objects: adult editorial caricature and witty visual shorthand—lean, expressive silhouettes, sharp understated posture, wry observant expressions, and stylized everyday objects distilled to a few confident, hurried strokes.',
    'Composition: open white-paper editorial layout with clear visual hierarchy, generous breathing space, and sparse scrawled directional arrows or crisp graphic marks that anchor the concept.',
  ].join(' '),
  promptSuffix: [
    'Texture finish: raw analog sketchbook immediacy, fast loose hand-scrawled energy, dry wax-crayon grain, and flat marker paper tooth.',
    'Clean pure white background, wordless editorial visual storytelling.',
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
    `Scene subject: ${scenePrompt.trim()}`,
    styleBible.promptSuffix,
  ].join('\n\n');
}
