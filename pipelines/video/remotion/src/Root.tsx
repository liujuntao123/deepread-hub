import React from 'react';
import { Composition } from 'remotion';
import { PodcastVideo, type PodcastVideoProps } from './PodcastVideo';

const DEFAULT_PROPS: PodcastVideoProps = {
  bookTitle: '《娱乐至死》',
  episodeTitle: '《娱乐至死》全书深读',
  audioUrl: '',
  assetBaseUrl: '',
  fps: 24,
  width: 1920,
  height: 1080,
  totalDurationSec: 10,
  acts: [],
  scenes: [],
  subtitles: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PodcastVideo"
      component={PodcastVideo as unknown as React.FC<Record<string, unknown>>}
      width={1920}
      height={1080}
      fps={24}
      durationInFrames={240}
      defaultProps={DEFAULT_PROPS as unknown as Record<string, unknown>}
      calculateMetadata={({ props }) => {
        const p = props as unknown as PodcastVideoProps;
        const fps = p.fps || 24;
        const durationInFrames = Math.max(24, Math.ceil((p.totalDurationSec || 10) * fps));
        return {
          durationInFrames,
          fps,
          width: p.width || 1920,
          height: p.height || 1080,
        };
      }}
    />
  );
};
