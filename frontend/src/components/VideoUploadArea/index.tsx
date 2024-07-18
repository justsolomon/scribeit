import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FileUploader } from 'react-drag-drop-files';
import { toastErrorMessage, VIDEO_UPLOAD_SIZE_LIMIT } from 'utils';

interface VideoUploadAreaProps {
  isDisabled: boolean;
  handleVideoUpload: (file: File) => void;
}

const VideoUploadArea = ({
  isDisabled,
  handleVideoUpload,
}: VideoUploadAreaProps) => {
  return (
    <FileUploader
      label="Upload video or drag and drop here"
      handleChange={handleVideoUpload}
      name="file"
      types={['mp4']}
      maxSize={VIDEO_UPLOAD_SIZE_LIMIT}
      onTypeError={() =>
        toastErrorMessage('Only video files with .mp4 extension are allowed')
      }
      onSizeError={() =>
        toastErrorMessage(
          `File size should be less than ${VIDEO_UPLOAD_SIZE_LIMIT}MB`,
        )
      }
      disabled={isDisabled}
    >
      <VStack
        p={4}
        border="1px"
        borderRadius="8px"
        spacing={4}
        justify="center"
        fontSize="15px"
        opacity={isDisabled ? '0.5' : '1'}
      >
        <Heading as="h2" fontSize="20px">
          Select video file
        </Heading>

        <Text>{`Maximum file size ${VIDEO_UPLOAD_SIZE_LIMIT}MB. Preferred format is MP4.`}</Text>

        <HStack align="center">
          <Text>Drag and drop or</Text>
          <Button colorScheme="blue" size="sm" pointerEvents="none">
            Select a file
          </Button>
        </HStack>
      </VStack>
    </FileUploader>
  );
};

export default VideoUploadArea;
