import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  resetTranscriptionState,
  setIsVideoUploadStarted,
  setVideoInfo,
} from 'redux/slices';

const useVideoUpload = (onVideoFileSelected?: () => void) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoState = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoFile && onVideoFileSelected) {
      onVideoFileSelected();
    }
  }, [videoFile, onVideoFileSelected]);

  const handleVideoUpload = (file: File) => {
    if (file) {
      setVideoFile(file);
      dispatch(
        setVideoInfo({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          filePath: URL.createObjectURL(file),
        }),
      );
    }
  };

  const clearUploadedVideo = () => {
    setVideoFile(null);
    dispatch(setVideoInfo(null));
    dispatch(setIsVideoUploadStarted(false));
    dispatch(resetTranscriptionState());
  };

  const updateVideoUploadState = (isUploadStarted: boolean) => {
    dispatch(setIsVideoUploadStarted(isUploadStarted));
  };

  return {
    ...videoState,
    videoFile,
    handleVideoUpload,
    clearUploadedVideo,
    updateVideoUploadState,
  };
};

export default useVideoUpload;
