import { act, renderHook } from '@testing-library/react';
import { PusherProvider } from 'containers';
import usePusher from 'hooks/usePusher';
import Pusher from 'pusher-js';

describe('usePusher', () => {
  const pusher = new Pusher('test', {
    cluster: 'test',
  });

  const renderPusherHook = () => {
    return renderHook(() => usePusher(), {
      wrapper: ({ children }) => (
        <PusherProvider defaultInstance={pusher}>{children} </PusherProvider>
      ),
    });
  };

  it('should bind and unbind channel events ', () => {
    const { result } = renderPusherHook();
    const eventHandler = jest.fn();

    act(() => {
      result.current.bindChannelEvent('test', 'test-event', eventHandler);
    });

    pusher.channel('test').trigger('test-event', { test: 'data' });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith({ test: 'data' });

    act(() => {
      result.current.unbindChannelEvent('test', 'test-event', eventHandler);
    });

    pusher.channel('test').trigger('test-event', { test: 'data2' });

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).not.toHaveBeenCalledWith({ test: 'data2' });
  });
});
