import { useAuth, usePusher } from 'hooks';
import { useEffect, useState } from 'react';

const UploadProgressBar = () => {
  const pusher = usePusher();
  const { user } = useAuth();
  const [websocketData, setWebsocketData] = useState<any>(null);

  const eventHandler = (data: any) => {
    setWebsocketData(data);
  };

  useEffect(() => {
    const userId = user?.id;

    if (pusher.isReady && userId) {
      pusher.subscribe(userId);
      pusher.bindChannelEvent(userId, 'transcribe-status', eventHandler);
    }

    return () => {
      pusher.unbindChannelEvent(userId, 'transcribe-status', eventHandler);
      pusher.unsubscribe(userId);
    };
  }, [pusher.isReady, user]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{JSON.stringify(websocketData)}</>;
};

export default UploadProgressBar;
