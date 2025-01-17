export interface TranscriptionSegment {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}

export interface TranscriptionStatusEventData {
  message: string;
  type: 'info' | 'error' | 'success';
}

export interface TranscriptionData {
  text: string;
  segments: TranscriptionSegment[];
  language: string;
}

export interface TranscriptionAction {
  type: 'editText';
  payload: {
    segmentId: number;
    text: string;
  };
}

export interface TranscriptionState {
  status: TranscriptionStatusEventData | null;
  result: TranscriptionData | null;
  serverResult: TranscriptionData[] | null;
  srtFilePath: string | null;
  actionHistory: { stack: TranscriptionAction[]; checkpointIndex: number };
}
