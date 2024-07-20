import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { useTranscription, useVideoPlayer, useVideoUpload } from 'hooks';

const VideoPlayer = () => {
  const {
    video,
    isVideoUploadStarted,
    videoPlayerSettings: { enableDefaultLayout },
  } = useVideoUpload();
  const { srtFilePath } = useTranscription();
  const { mediaPlayerRef } = useVideoPlayer();

  if (!video || !isVideoUploadStarted) {
    return null;
  }

  return (
    <MediaPlayer
      src={{ src: video.filePath, type: 'video/mp4' }}
      ref={mediaPlayerRef}
    >
      <MediaProvider>
        {srtFilePath ? (
          <Track
            kind="subtitles"
            src={srtFilePath}
            label="English"
            lang="en-US"
            type="srt"
            default
          />
        ) : null}
      </MediaProvider>

      {enableDefaultLayout ? (
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      ) : (
        <PlyrLayout icons={plyrLayoutIcons} />
      )}
    </MediaPlayer>
  );
};

export default VideoPlayer;
