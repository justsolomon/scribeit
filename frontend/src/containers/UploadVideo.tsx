import { HStack } from '@chakra-ui/react';
import { UploadProgressBar, VideoUploadArea } from 'components';
import { useAuth } from 'hooks';
import useVideoUpload from 'hooks/useVideoUpload';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import {
  useLazyVideoUploadAllowedQuery,
  useUploadVideoMutation,
  videoApi,
} from 'redux/services';
import { APIErrorResponse } from 'types';
import { getAPIErrorType } from 'utils';
import { toastErrorMessage } from 'utils/toast';

const UploadVideo = () => {
  const [
    checkVideoUploadAllowed,
    {
      isSuccess: isVideoUploadAllowed,
      isLoading: isCheckingVideoUploadAllowed,
    },
  ] = useLazyVideoUploadAllowedQuery();
  const {
    videoFile,
    isVideoUploadStarted,
    handleVideoUpload,
    updateVideoUploadState,
  } = useVideoUpload(checkVideoUploadAllowed);
  const [
    uploadVideo,
    {
      data: uploadVideoData,
      isLoading: isVideoUploadingToServer,
      error: uploadVideoError,
    },
  ] = useUploadVideoMutation();
  const { updateUser } = useAuth();
  const dispatch = useAppDispatch();
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isVideoUploadAllowed) {
      dispatch(videoApi.util.resetApiState());
      uploadVideoToServer();
    }
  }, [isVideoUploadAllowed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isVideoUploadingToServer) {
      updateVideoUploadState(true);
    }
  }, [isVideoUploadingToServer]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uploadVideoData) {
      updateUser({ id: uploadVideoData.userId });
    }
  }, [uploadVideoData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isVideoUploadStarted) {
      setUploadError('');
    }
  }, [isVideoUploadStarted]);

  useEffect(() => {
    if (uploadVideoError) {
      let errorMessage;
      const errorType = getAPIErrorType(uploadVideoError as APIErrorResponse);

      switch (errorType) {
        case 'value_error':
          errorMessage = 'Please upload a valid video file';
          break;
        case 'less_than':
          errorMessage = 'File size should be less than 10MB';
          break;
      }

      if (errorMessage) {
        setUploadError(errorMessage);
        toastErrorMessage(errorMessage);
      }
    }
  }, [uploadVideoError]);

  const uploadVideoToServer = () => {
    if (videoFile) {
      const formData = new FormData();
      formData.append('video', videoFile);

      uploadVideo(formData);
    }
  };

  return (
    <HStack w="100%" justify={isVideoUploadStarted ? 'flex-start' : 'center'}>
      {isVideoUploadStarted ? (
        <UploadProgressBar
          uploadError={uploadError}
          isVideoUploadingToServer={isVideoUploadingToServer}
        />
      ) : (
        <VideoUploadArea
          isDisabled={isCheckingVideoUploadAllowed}
          handleVideoUpload={handleVideoUpload}
        />
      )}
    </HStack>
  );
};

export default UploadVideo;
