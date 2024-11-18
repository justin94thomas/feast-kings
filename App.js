import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Store';
import AppNavigator from './src/Navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
