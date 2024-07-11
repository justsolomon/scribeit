import { usePusher } from 'hooks';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useLazyHomeQuery } from 'redux/services';
import store from 'redux/store';
import PusherProvider from './Pusher';
import { ChakraProvider } from '@chakra-ui/react';
import UploadVideo from './UploadVideo';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <PusherProvider>
          <APITest />
        </PusherProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;

const APITest = () => {
  const [fetchData, { data, isLoading, isSuccess, error }] = useLazyHomeQuery();

  return (
    <>
      {isLoading ? <div>Loading...</div> : null}
      {isSuccess ? <div>{JSON.stringify(data)}</div> : null}
      <WebsocketTest fetchData={fetchData} />
      <UploadVideo />
    </>
  );
};

const WebsocketTest = ({ fetchData }: any) => {
  const [websocketData, setWebsocketData] = useState<any>(null);
  const pusher = usePusher();

  const eventHandler = (data: any) => {
    setWebsocketData(data);
  };

  const isTestSubscribed = pusher.isChannelSubscribed('test');

  useEffect(() => {
    if (isTestSubscribed) {
      fetchData();
    }
  }, [isTestSubscribed, fetchData]);

  useEffect(() => {
    if (pusher.isReady) {
      pusher.subscribe('test');
      pusher.bindChannelEvent('test', 'test-event', eventHandler);
    }

    return () => {
      pusher.unbindChannelEvent('test', 'test-event', eventHandler);
      pusher.unsubscribe('test');
    };
  }, [pusher.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>{JSON.stringify(websocketData)}</div>;
};
