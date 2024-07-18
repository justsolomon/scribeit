import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useVideoUpload } from 'hooks';
import { LayoutLeft, LayoutRight, MoreHoriz, Upload } from 'iconoir-react';

const VideoPlayerActionsMenu = () => {
  const {
    videoPlayerSettings: { enableDefaultLayout },
    toggleVideoPlayerLayout,
    clearUploadedVideo,
  } = useVideoUpload();

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
        <MenuItem icon={<Upload />} onClick={clearUploadedVideo}>
          Upload new video
        </MenuItem>
        <MenuItem
          icon={enableDefaultLayout ? <LayoutRight /> : <LayoutLeft />}
          onClick={toggleVideoPlayerLayout}
        >
          {enableDefaultLayout ? 'Use Plyr layout' : 'Use default layout'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default VideoPlayerActionsMenu;
