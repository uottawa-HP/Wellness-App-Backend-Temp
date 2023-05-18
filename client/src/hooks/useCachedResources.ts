import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
          "CoolIcons": require('../../assets/fonts/coolicons.ttf'),
          "BarlowCondensed_400Regular": require('../../assets/fonts/BarlowCondensed-Regular.ttf'),
          "BarlowCondensed_500Medium": require('../../assets/fonts/BarlowCondensed-Medium.ttf'),
          "BarlowCondensed_600SemiBold":require('../../assets/fonts/BarlowCondensed-SemiBold.ttf'),
          'barlow-condensed-bold': require('../../assets/fonts/BarlowCondensed-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
