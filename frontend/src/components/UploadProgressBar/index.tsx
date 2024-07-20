import { Progress, Text, VStack } from '@chakra-ui/react';
import { useTranscription } from 'hooks';
import { useEffect, useState } from 'react';

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
  const { status: transcriptionStatus } = useTranscription();

  useEffect(() => {
    if (isVideoUploadingToServer) {
      setProgressLabel('Uploading video...');
    } else if (transcriptionStatus) {
      if (transcriptionStatus.type === 'error') {
        setErrorMessage(transcriptionStatus.message);
      } else {
        setProgressLabel(transcriptionStatus.message);
      }
    }
  }, [transcriptionStatus, isVideoUploadingToServer]);

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
      <Text color={hasError ? 'red' : 'unset'}>
        {uploadError || errorMessage || progressLabel}
      </Text>
    </VStack>
  );
};

export default UploadProgressBar;
