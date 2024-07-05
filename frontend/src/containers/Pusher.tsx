import Pusher from 'pusher-js';
import { createContext, useEffect, useState } from 'react';
import { PUSHER_CLUSTER, PUSHER_KEY } from 'utils';

interface PusherProviderProps {
  defaultInstance?: Pusher | null;
  children: React.ReactNode;
}

export const PusherContext = createContext<Pusher | null>(null);

const PusherProvider = ({
  children,
  defaultInstance = null,
}: PusherProviderProps) => {
  const [pusherInstance, setPusherInstance] = useState<Pusher | null>(
    defaultInstance,
  );

  useEffect(() => {
    if (!pusherInstance) {
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
      });

      setPusherInstance(pusher);
    }

    return () => {
      if (pusherInstance) {
        pusherInstance.disconnect();
      }
    };
  }, [pusherInstance]);

  return (
    <PusherContext.Provider value={pusherInstance}>
      {children}
    </PusherContext.Provider>
  );
};

export default PusherProvider;
