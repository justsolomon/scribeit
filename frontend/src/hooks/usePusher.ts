import { PusherContext } from 'containers';
import { useContext, useEffect, useState } from 'react';
import useAuth from './useAuth';

const usePusher = () => {
  const pusherInstance = useContext(PusherContext);
  const [subscribedChannels, setSubscribedChannels] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const userId = user?.id;

    if (pusherInstance && userId) {
      subscribe(userId);
    }

    return () => {
      unsubscribe(userId);
    };
  }, [pusherInstance, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const subscribe = (channelName: string) => {
    if (pusherInstance && !pusherInstance.channel(channelName)) {
      pusherInstance.subscribe(channelName);

      bindChannelEvent(channelName, 'pusher:subscription_succeeded', () => {
        setSubscribedChannels((prev) => {
          return new Set(prev).add(channelName);
        });
      });
    }
  };

  const unsubscribe = (channelName: string) => {
    if (pusherInstance && pusherInstance.channel(channelName)) {
      pusherInstance.unsubscribe(channelName);

      setSubscribedChannels((prev) => {
        const newSubscribedChannels = new Set(prev);
        newSubscribedChannels.delete(channelName);

        return newSubscribedChannels;
      });
    }
  };

  const bindChannelEvent = (
    channelName: string,
    eventName: string,
    callback: Function,
  ) => {
    const channel = pusherInstance?.channel(channelName);

    if (channel) {
      channel.bind(eventName, callback);
    }
  };

  const unbindChannelEvent = (
    channelName: string,
    eventName: string,
    callback: Function,
  ) => {
    const channel = pusherInstance?.channel(channelName);

    if (channel) {
      channel.unbind(eventName, callback);
    }
  };

  const isChannelSubscribed = (channelName: string) => {
    return subscribedChannels.has(channelName);
  };

  return {
    isReady: Boolean(pusherInstance),
    subscribe,
    unsubscribe,
    bindChannelEvent,
    unbindChannelEvent,
    isChannelSubscribed,
  };
};

export default usePusher;
