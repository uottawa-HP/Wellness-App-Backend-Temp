import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'localstorage-polyfill';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { store, persistor } from "./src/store/reduxStore";
import CustomToast from "./src/components/Toast"

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  React.useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      await store;
    }
    loadResourcesAndDataAsync();
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PersistGate>
        <CustomToast></CustomToast>
      </Provider>
    );
  }
}

export default App;
