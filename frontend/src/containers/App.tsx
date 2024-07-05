import { usePusher } from 'hooks';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useLazyHomeQuery } from 'redux/services';
import store from 'redux/store';
import PusherProvider from './Pusher';

const App = () => {
  return (
    <Provider store={store}>
      <PusherProvider>
        <APITest />
      </PusherProvider>
    </Provider>
  );
};

export default App;

const APITest = () => {
  const [fetchData, { data, isLoading, isSuccess }] = useLazyHomeQuery();

  return (
    <>
      {isLoading ? <div>Loading...</div> : null}
      {isSuccess ? <div>{JSON.stringify(data)}</div> : null}
      <WebsocketTest fetchData={fetchData} />
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
