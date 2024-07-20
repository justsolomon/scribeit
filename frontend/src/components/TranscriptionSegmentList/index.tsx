import { HStack, Text, VStack } from '@chakra-ui/react';
import { useVideoPlayer } from 'hooks';
import { TranscriptionSegment } from 'types';
import { convertSecondToDisplayedTime } from 'utils';

interface TranscriptionSegmentListProps {
  segments: TranscriptionSegment[];
  updateSegmentText: (id: number, text: string) => void;
}

const TranscriptionSegmentList = ({
  segments,
  updateSegmentText,
}: TranscriptionSegmentListProps) => {
  const { currentTime, seekToTime } = useVideoPlayer();

  return (
    <VStack
      w="100%"
      align="center"
      spacing={0}
      h="calc(100vh - 300px)"
      overflow="auto"
      borderTop="1px"
      borderBottom="1px"
      borderColor="gray.200"
    >
      {segments.map((segment, index) => (
        <TranscriptionSegmentItem
          currentTime={currentTime}
          seekToTime={seekToTime}
          updateSegmentText={(text) => updateSegmentText(segment.id, text)}
          {...segment}
          key={index}
        />
      ))}
    </VStack>
  );
};

export default TranscriptionSegmentList;

interface TranscriptionSegmentItemProps extends TranscriptionSegment {
  currentTime: number;
  updateSegmentText: (text: string) => void;
  seekToTime: (time: number) => void;
}

const TranscriptionSegmentItem = ({
  start,
  end,
  text,
  currentTime,
  // updateSegmentText,
  seekToTime,
}: TranscriptionSegmentItemProps) => {
  const isActive = currentTime >= start && currentTime <= end;

  return (
    <HStack
      w="100%"
      minH="100px"
      pl={3}
      pr={4}
      py={2}
      align="flex-start"
      onClick={() => seekToTime(start)}
      borderLeft="4px"
      borderTop="1px"
      borderBottom="1px"
      borderColor="gray.100"
      borderLeftColor={isActive ? 'blue.500' : 'transparent'}
      transition="all 0.2s"
      cursor="pointer"
    >
      <VStack w="20%" align="flex-start" fontSize="15px" color="gray.500">
        <Text>{convertSecondToDisplayedTime(start)}</Text>
        <Text>{convertSecondToDisplayedTime(end)}</Text>
      </VStack>
      <Text
        w="70%"
        color="gray.800"
        // contentEditable
        // suppressContentEditableWarning
        // onBlur={(e) => updateSegmentText(e.target.textContent || '')}
      >
        {text}
      </Text>
    </HStack>
  );
};
