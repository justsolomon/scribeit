import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from 'redux/store';
import PusherProvider from './Pusher';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import AppContent from './AppContent';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <PusherProvider>
          <AppContent />
        </PusherProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default App;
