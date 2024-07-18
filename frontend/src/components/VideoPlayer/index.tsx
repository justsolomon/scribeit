import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useVideoUpload } from 'hooks';

const VideoPlayer = () => {
  const {
    video,
    isVideoUploadStarted,
    videoPlayerSettings: { enableDefaultLayout },
  } = useVideoUpload();

  if (!video || !isVideoUploadStarted) {
    return null;
  }

  return (
    <MediaPlayer src={{ src: video.filePath, type: 'video/mp4' }}>
      <MediaProvider />

      {enableDefaultLayout ? (
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      ) : (
        <PlyrLayout icons={plyrLayoutIcons} />
      )}
    </MediaPlayer>
  );
};

export default VideoPlayer;
