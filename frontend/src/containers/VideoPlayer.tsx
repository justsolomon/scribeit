import { MediaPlayerInstance } from '@vidstack/react';
import { createContext, useRef } from 'react';

interface VideoPlayerProviderProps {
  children: React.ReactNode;
}

export const VideoPlayerContext = createContext<
  React.RefObject<MediaPlayerInstance>
>({ current: null });

const VideoPlayerProvider = ({ children }: VideoPlayerProviderProps) => {
  const mediaPlayerRef = useRef<MediaPlayerInstance>(null);

  return (
    <VideoPlayerContext.Provider value={mediaPlayerRef}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayerProvider;
