import { initializeKakaoSDK } from '@react-native-kakao/core';
import NaverLogin from '@react-native-seoul/naver-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import StackNavigator from './navigation/StackNavigator';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 5000,
  fade: true,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'SCDream3': require('./assets/fonts/SCDream3.otf'),
    'SCDream4': require('./assets/fonts/SCDream4.otf'),
    'SCDream6': require('./assets/fonts/SCDream6.otf'),
    'DunggeunmisoB': require('./assets/fonts/DunggeunmisoB.otf'),
  });

  useEffect(() => {
    initializeKakaoSDK("9ee15697ff1bff6cb85a7e12ed3ab126");

    NaverLogin.initialize({
      consumerKey: '5hMz2fYMovVFAJ6aPwR6',
      consumerSecret: 'cyl5VqOjtv',
      appName: 'yeodam',
    });

    GoogleSignin.configure({
      webClientId: '695865731724-367u4sn10p2gkq52p61virgmrflddhfv.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}