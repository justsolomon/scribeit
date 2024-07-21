import {
  Layout,
  TranscriptionSegmentList,
  VideoPlayer,
  VideoPlayerActionsMenu,
} from 'components';
import { getVideoName } from 'utils';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { usePusher, useTranscription, useVideoUpload } from 'hooks';
import UploadVideo from './UploadVideo';

const AppContent = () => {
  usePusher();
  const { video, isVideoUploadStarted } = useVideoUpload();
  const { result, updateSegmentText } = useTranscription();

  return (
    <Layout>
      <HStack w="100%" mt={4} align="flex-start" justify="space-between">
        {isVideoUploadStarted ? (
          <VStack w="50%">
            <VideoPlayer />

            <HStack w="100%" justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="18px">
                {getVideoName(video)}
              </Text>
              <VideoPlayerActionsMenu />
            </HStack>
          </VStack>
        ) : null}

        <VStack w={isVideoUploadStarted ? '40%' : '100%'} align="flex-start">
          {result ? (
            <TranscriptionSegmentList
              segments={result.segments}
              updateSegmentText={updateSegmentText}
            />
          ) : (
            <UploadVideo />
          )}
        </VStack>
      </HStack>
    </Layout>
  );
};

export default AppContent;
