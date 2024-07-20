import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useTranscription, useVideoPlayer, useVideoUpload } from 'hooks';
import {
  Download,
  LayoutLeft,
  LayoutRight,
  MoreHoriz,
  Upload,
} from 'iconoir-react';

const VideoPlayerActionsMenu = () => {
  const { clearUploadedVideo } = useVideoUpload();
  const {
    videoPlayerSettings: { enableDefaultLayout },
    toggleVideoPlayerLayout,
  } = useVideoPlayer();
  const { isTranscriptionComplete, downloadSRTFile } = useTranscription();

  return (
    <Menu placement="left-start">
      <MenuButton
        as={IconButton}
        icon={<MoreHoriz />}
        size="sm"
        colorScheme="blackAlpha"
        isRound
      />

      <MenuList>
        <MenuItem
          icon={enableDefaultLayout ? <LayoutRight /> : <LayoutLeft />}
          onClick={toggleVideoPlayerLayout}
        >
          {enableDefaultLayout ? 'Use Plyr layout' : 'Use default layout'}
        </MenuItem>
        <MenuItem
          icon={<Upload />}
          onClick={clearUploadedVideo}
          isDisabled={!isTranscriptionComplete}
        >
          Upload new video
        </MenuItem>
        <MenuItem
          icon={<Download />}
          onClick={downloadSRTFile}
          isDisabled={!isTranscriptionComplete}
        >
          Download subtitles (SRT)
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default VideoPlayerActionsMenu;
