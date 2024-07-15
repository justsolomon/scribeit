import { Button } from '@chakra-ui/react';
import { UploadProgressBar } from 'components';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { useUploadVideoMutation } from 'redux/services';
import { APIErrorResponse } from 'types';
import { getAPIErrorMessage, getAPIErrorType } from 'utils';
import { toastErrorMessage } from 'utils/toast';

const UploadVideo = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [uploadVideo, { data, isLoading, error }] = useUploadVideoMutation();
  const { updateUser } = useAuth();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (error) {
      let errorMessage;
      const errorType = getAPIErrorType(error as APIErrorResponse);

      switch (errorType) {
        case 'value_error':
          errorMessage = 'Please upload a valid video file';
          break;
        case 'less_than':
          errorMessage = 'File size should be less than 10MB';
          break;
      }

      if (errorMessage) {
        toastErrorMessage(errorMessage);
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      updateUser({ id: data.userId });
    }
  }, [data]);

  return (
    <>
      <input
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handleVideoChange}
      />
      <Button
        onClick={() => {
          const formData = new FormData();
          formData.append('video', video as Blob);
          uploadVideo(formData);
        }}
        isLoading={isLoading}
      >
        Upload
      </Button>

      <UploadProgressBar />
    </>
  );
};

export default UploadVideo;
