export interface UploadEventData {
  message: string;
  type: 'info' | 'error';
}

export interface UploadVideoResponse {
  message: string;
  userId: string;
}
