import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/Psychedelic.otf'),
    DMMedium: require('../assets/fonts/Everyday.otf'),
    DMRegularold: require('../assets/fonts/MANWARDS.otf'),
  });
  const onLayoutRootView = useCallback( async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  //TODO test ap without code above

    if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView}/>;
  }