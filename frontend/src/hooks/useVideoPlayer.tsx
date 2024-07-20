import { useMediaState } from '@vidstack/react';
import { VideoPlayerContext } from 'containers';
import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateVideoPlayerSettings } from 'redux/slices';

const useVideoPlayer = () => {
  const mediaPlayerRef = useContext(VideoPlayerContext);
  const videoState = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();
  const currentTime = useMediaState('currentTime', mediaPlayerRef);

  const toggleVideoPlayerLayout = () => {
    dispatch(
      updateVideoPlayerSettings({
        enableDefaultLayout:
          !videoState.videoPlayerSettings.enableDefaultLayout,
      }),
    );
  };

  const seekToTime = (time: number) => {
    if (mediaPlayerRef && mediaPlayerRef.current) {
      if (mediaPlayerRef.current.paused) {
        mediaPlayerRef.current.play();
      }

      mediaPlayerRef.current.currentTime = time;
    }
  };

  return {
    ...videoState,
    mediaPlayerRef,
    currentTime,
    toggleVideoPlayerLayout,
    seekToTime,
  };
};

export default useVideoPlayer;
