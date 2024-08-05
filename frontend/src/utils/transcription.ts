import { TranscriptionData, TranscriptionSegment } from 'types';

const padLeft = (num: number, length = 2) => {
  return num.toString().padStart(length, '0');
};

export const convertSecondToTimecode = (second: number) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = Math.floor(second % 60);
  const milliseconds = Math.floor((second % 1) * 1000);

  return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)},${padLeft(
    milliseconds,
    3,
  )}`;
};

export const convertSecondToDisplayedTime = (second: number) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = Math.floor(second % 60);

  return `${padLeft(hours)}:${padLeft(minutes)}:${padLeft(seconds)}`;
};

export const compileSegments = (data: TranscriptionData[]) => {
  const segments: TranscriptionSegment[] = [];
  let lastSegmentEnd = 0;

  data.forEach((transcription) => {
    const { segments: segmentData } = transcription;

    segmentData.forEach((segment) => {
      segments.push({
        ...segment,
        start: lastSegmentEnd + segment.start,
        end: lastSegmentEnd + segment.end,
      });
    });

    lastSegmentEnd += segmentData[segmentData.length - 1].end;
  });

  return segments;
};
