import '@testing-library/jest-dom';
import { Options } from 'pusher-js';

jest.mock('pusher-js', () => {
  class Pusher extends require('pusher-js-mock').PusherMock {
    constructor(app_key: string, options: Options) {
      super(app_key, options);
    }

    disconnect: jest.Mock = jest.fn();
  }

  return Pusher;
});
