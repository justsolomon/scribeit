import { Layout, VideoPlayer, VideoPlayerActionsMenu } from 'components';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { useVideoUpload } from 'hooks';
import UploadVideo from './UploadVideo';

const AppContent = () => {
  const { video, isVideoUploadStarted } = useVideoUpload();

  return (
    <Layout>
      <HStack w="100%" align="flex-start" justify="space-between">
        {isVideoUploadStarted ? (
          <VStack w="50%">
            <VideoPlayer />

            <HStack w="100%" justify="space-between" align="center">
              <Text fontWeight="bold">{video?.name.replace(`.mp4`, '')}</Text>
              <VideoPlayerActionsMenu />
            </HStack>
          </VStack>
        ) : null}

        <VStack w={isVideoUploadStarted ? '45%' : '100%'} align="flex-start">
          <UploadVideo />
        </VStack>
      </HStack>
    </Layout>
  );
};

export default AppContent;
