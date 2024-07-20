import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  setActionHistoryCheckpoint,
  setActionHistoryData,
  setSRTFilePath,
} from 'redux/slices';
import { TranscriptionAction, TranscriptionSegment } from 'types';
import { convertSecondToTimecode, getVideoName } from 'utils';

const useTranscription = () => {
  const transcriptionState = useAppSelector((state) => state.transcription);
  const { video } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transcriptionState.result) {
      dispatch(setSRTFilePath(getSRTFilePath()));
    }
  }, [transcriptionState.result]); // eslint-disable-line react-hooks/exhaustive-deps

  //   useEffect(() => {
  //     if (transcriptionState.serverResult) {
  //       const updatedTranscription: TranscriptionResultEventData = JSON.parse(
  //         JSON.stringify(transcriptionState.serverResult),
  //       );

  //       for (
  //         let i = 0;
  //         i < transcriptionState.actionHistory.checkpointIndex;
  //         i++
  //       ) {
  //         const action = transcriptionState.actionHistory.stack[i];

  //         switch (action.type) {
  //           case 'editText':
  //             const { segmentId, text } = action.payload;

  //             const segmentToUpdate = updatedTranscription.segments.find(
  //               ({ id }) => id === segmentId,
  //             );

  //             if (segmentToUpdate) {
  //               segmentToUpdate.text = text;
  //             }
  //             break;
  //           default:
  //             break;
  //         }
  //       }

  //       dispatch(setTranscriptionResult(updatedTranscription));
  //     }
  //   }, [
  //     transcriptionState.serverResult,
  //     transcriptionState.actionHistory,
  //     dispatch,
  //   ]);

  const convertTranscriptJSONToSRT = (
    transcriptSegments: TranscriptionSegment[],
  ) => {
    if (!transcriptionState.result) {
      return '';
    }

    const srtArr: string[] = [];

    transcriptSegments.forEach((segment, index) => {
      const startTime = convertSecondToTimecode(segment.start);
      const endTime = convertSecondToTimecode(segment.end);

      srtArr.push(
        `${index + 1}\n`,
        `${startTime} --> ${endTime}\n`,
        `${segment.text}\n\n`,
      );
    });

    return srtArr.join('');
  };

  const getSRTFile = () => {
    if (!transcriptionState.result) {
      return null;
    }

    const srtContents = convertTranscriptJSONToSRT(
      transcriptionState.result.segments,
    );

    return new Blob([srtContents], { type: 'text/plain' });
  };

  const getSRTFilePath = () => {
    const srtFile = getSRTFile();

    if (!srtFile) {
      return null;
    }

    if (transcriptionState.srtFilePath) {
      URL.revokeObjectURL(transcriptionState.srtFilePath);
    }

    return URL.createObjectURL(srtFile);
  };

  const downloadSRTFile = () => {
    if (!transcriptionState.srtFilePath) {
      return;
    }

    const a = document.createElement('a');
    a.href = transcriptionState.srtFilePath;
    a.download = `${video ? `${getVideoName(video)}-` : ''}subtitles.srt`;
    a.click();
  };

  const addAction = (action: TranscriptionAction) => {
    const { actionHistory } = transcriptionState;

    const updatedActionHistoryStack = actionHistory.stack.slice(
      0,
      actionHistory.checkpointIndex + 1,
    );

    dispatch(setActionHistoryData([...updatedActionHistoryStack, action]));
  };

  const undoAction = () => {
    const {
      actionHistory: { checkpointIndex },
    } = transcriptionState;

    if (checkpointIndex === 0) {
      return;
    }

    dispatch(setActionHistoryCheckpoint(checkpointIndex - 1));
  };

  const redoAction = () => {
    const {
      actionHistory: { stack, checkpointIndex },
    } = transcriptionState;

    if (checkpointIndex === stack.length - 1) {
      return;
    }

    dispatch(setActionHistoryCheckpoint(checkpointIndex + 1));
  };

  const updateSegmentText = (segmentId: number, newText: string) => {
    if (!newText) {
      return;
    }

    addAction({ type: 'editText', payload: { segmentId, text: newText } });
  };

  return {
    ...transcriptionState,
    isTranscriptionComplete: Boolean(transcriptionState.result),
    getSRTFilePath,
    downloadSRTFile,
    updateSegmentText,
    undoAction,
    redoAction,
  };
};

export default useTranscription;
