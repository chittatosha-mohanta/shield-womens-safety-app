import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from './src/store/appStore';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import SOSActiveScreen from './src/screens/SOSActiveScreen';
import JourneyScreen from './src/screens/JourneyScreen';
import ContactPickerScreen from './src/screens/ContactPickerScreen';
import EvidenceScreen from './src/screens/EvidenceScreen';
import SafetyMapScreen from './src/screens/SafetyMapScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FakeCallScreen from './src/screens/FakeCallScreen';
const Stack = createStackNavigator();
export default function App() {
  const { isOnboarded, isAuthenticated } = useAppStore();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 2500); }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <NavigationContainer theme={{ dark: true, colors: { primary: '#FF3B5C', background: '#080B14', card: '#0F1320', text: '#E8E0F0', border: 'rgba(255,255,255,0.08)', notification: '#FF3B5C' } }}>
          <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#080B14' } }}>
            {!isReady ? (<Stack.Screen name="Splash" component={SplashScreen} />
            ) : !isOnboarded ? (<Stack.Screen name="Onboarding" component={OnboardingScreen} />
            ) : !isAuthenticated ? (<Stack.Screen name="Auth" component={AuthScreen} />
            ) : (
              <>
                <Stack.Screen name="Main" component={MainTabNavigator} />
                <Stack.Screen name="SOSActive" component={SOSActiveScreen} options={{ presentation: 'modal' }} />
                <Stack.Screen name="Journey" component={JourneyScreen} />
                <Stack.Screen name="ContactPicker" component={ContactPickerScreen} />
                <Stack.Screen name="Evidence" component={EvidenceScreen} />
                <Stack.Screen name="SafetyMap" component={SafetyMapScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="FakeCall" component={FakeCallScreen} options={{ presentation: 'fullScreenModal' }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
