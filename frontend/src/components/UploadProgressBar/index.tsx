import { Button, Progress, Text, VStack } from '@chakra-ui/react';
import { useAuth, useTranscription, useVideoUpload } from 'hooks';
import { Upload } from 'iconoir-react';
import { useEffect, useState } from 'react';
import { useLazyGetTranscriptionQuery } from 'redux/services';

interface UploadProgressBarProps {
  isVideoUploadingToServer: boolean;
  uploadError?: string;
}

const UploadProgressBar = ({
  isVideoUploadingToServer,
  uploadError,
}: UploadProgressBarProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [progressLabel, setProgressLabel] = useState('');
  const { clearUploadedVideo } = useVideoUpload();
  const { status: transcriptionStatus, updateTranscriptionServerResult } =
    useTranscription();
  const [
    fetchTranscription,
    { data: transcript, isLoading: isFetchTranscriptLoading },
  ] = useLazyGetTranscriptionQuery();
  const { user } = useAuth();

  useEffect(() => {
    if (isVideoUploadingToServer) {
      setProgressLabel('Uploading video...');
    } else if (transcriptionStatus) {
      switch (transcriptionStatus.type) {
        case 'error':
          setErrorMessage(transcriptionStatus.message);
          break;
        case 'info':
          setProgressLabel(transcriptionStatus.message);
          break;
        case 'success':
          setProgressLabel('Transcription successful!');
          if (user) {
            fetchTranscription(user.id);
          }
          break;
      }
    }
  }, [transcriptionStatus, isVideoUploadingToServer, isFetchTranscriptLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (transcript) {
      updateTranscriptionServerResult(transcript);
    }
  }, [transcript]); //eslint-disable-line react-hooks/exhaustive-deps

  const hasError =
    Boolean(errorMessage || uploadError) && !isVideoUploadingToServer;

  return (
    <VStack w="100%" align="center">
      <Progress
        w="100%"
        size="sm"
        colorScheme={hasError ? 'red' : 'blue'}
        borderRadius="full"
        hasStripe
        isIndeterminate={!hasError}
        value={hasError ? 100 : undefined}
      />
      <VStack w="100%" spacing={4}>
        <Text color={hasError ? 'red' : 'unset'}>
          {uploadError || errorMessage || progressLabel}
        </Text>

        {hasError && (
          <Button
            colorScheme="blue"
            leftIcon={<Upload fontSize="14px" />}
            fontSize="15px"
            onClick={clearUploadedVideo}
          >
            Upload new video
          </Button>
        )}
      </VStack>
    </VStack>
  );
};

export default UploadProgressBar;
