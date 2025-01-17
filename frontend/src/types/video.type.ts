import { APIDefaultResponse } from './global.type';

export interface UploadVideoResponse extends APIDefaultResponse {
  message: string;
  userId: string;
}

export interface VideoState {
  video: {
    name: string;
    filePath: string;
    lastModified: number;
    size: number;
    type: string;
  } | null;
  isVideoUploadStarted: boolean;
  videoPlayerSettings: {
    enableDefaultLayout: boolean;
  };
}
