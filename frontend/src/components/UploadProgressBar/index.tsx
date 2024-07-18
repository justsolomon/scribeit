import { Progress, Text, VStack } from '@chakra-ui/react';
import { useAuth, usePusher } from 'hooks';
import { useEffect, useState } from 'react';
import { UploadEventData } from 'types';

interface UploadProgressBarProps {
  isVideoUploadingToServer: boolean;
  uploadError?: string;
}

const UploadProgressBar = ({
  isVideoUploadingToServer,
  uploadError,
}: UploadProgressBarProps) => {
  const pusher = usePusher();
  const { user } = useAuth();
  const [websocketData, setWebsocketData] = useState<UploadEventData | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [progressLabel, setProgressLabel] = useState('');

  useEffect(() => {
    if (isVideoUploadingToServer) {
      setProgressLabel('Uploading video...');
    } else if (websocketData) {
      if (websocketData.type === 'error') {
        setErrorMessage(websocketData.message);
      } else {
        setProgressLabel(websocketData.message);
      }
    }
  }, [websocketData, isVideoUploadingToServer]);

  const eventHandler = (data: UploadEventData) => {
    setWebsocketData(data);
  };

  const isUserChannelSubscribed =
    user?.id && pusher.isChannelSubscribed(user.id);

  useEffect(() => {
    if (isUserChannelSubscribed) {
      pusher.bindChannelEvent(user.id, 'transcribe-status', eventHandler);
    }

    return () => {
      pusher.unbindChannelEvent(user.id, 'transcribe-status', eventHandler);
    };
  }, [isUserChannelSubscribed]); // eslint-disable-line react-hooks/exhaustive-deps

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
