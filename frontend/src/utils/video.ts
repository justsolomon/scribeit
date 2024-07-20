import { VideoState } from 'types';

export const getVideoName = (video: VideoState['video']) => {
  if (!video) {
    return '';
  }

  return video.name.replace(`.mp4`, '');
};
