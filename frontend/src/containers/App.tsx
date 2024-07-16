import { Provider as ReduxProvider } from 'react-redux';
import store from 'redux/store';
import PusherProvider from './Pusher';
import { ChakraProvider } from '@chakra-ui/react';
import UploadVideo from './UploadVideo';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <PusherProvider>
          <UploadVideo />
        </PusherProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
