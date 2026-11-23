import React from 'react';
import { Composition } from 'remotion';
import { PodcastVideo, type PodcastVideoProps } from './PodcastVideo';

const DEFAULT_PROPS: PodcastVideoProps = {
  bookTitle: '《娱乐至死》',
  episodeTitle: '《娱乐至死》全书深读',
  audioUrl: '',
  assetBaseUrl: '',
  fps: 30,
  width: 1920,
  height: 1080,
  totalDurationSec: 10,
  hosts: {
    A: { name: '林舟', role: '主讲' },
    B: { name: '苏晴', role: '对谈' },
  },
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
      fps={30}
      durationInFrames={300}
      defaultProps={DEFAULT_PROPS as unknown as Record<string, unknown>}
      calculateMetadata={({ props }) => {
        const p = props as unknown as PodcastVideoProps;
        const fps = p.fps || 30;
        const durationInFrames = Math.max(30, Math.ceil((p.totalDurationSec || 10) * fps));
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
