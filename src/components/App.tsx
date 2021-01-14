import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import useCachedResources from '~/lib/hooks/useCachedResources';
import store from '~/stores';
import AppNavigator from '~/navigation';

const App = (): JSX.Element | null => {
  const isLoadingComplete: boolean = useCachedResources();
  const createStoreWidthMiddleware = applyMiddleware(promiseMiddlerware, reduxThunk)(createStore);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={createStoreWidthMiddleware(store)}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;