import { Provider } from 'react-redux';
import { useHomeQuery } from 'redux/services';
import store from 'redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <APITest />
    </Provider>
  );
};

export default App;

const APITest = () => {
  const { data, isLoading, isSuccess } = useHomeQuery();

  if (isLoading) return <div>Loading...</div>;

  return isSuccess ? <div>{JSON.stringify(data)}</div> : null;
};
