import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { HomeScreen } from './src/screens/HomeScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { WatchlistScreen } from './src/screens/WatchListScreen';
import { MovieDetailsScreen } from './src/screens/MovieDetailsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { Platform, Alert } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { user } = useAuth();

  return user ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Watchlist') {
            iconName = 'time';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
    </Tab.Navigator>
  ) : (
    <LoginScreen />
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      if (Platform.OS === 'ios') {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (hasHardware && supportedAuthTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Use o Face ID para acessar',
            fallbackLabel: 'Insira sua senha',
          });

          if (!result.success) {
            Alert.alert('Autenticação falhou', 'Você não foi autenticado.');
            return;
          }
        }
      }
      setIsAuthenticated(true);
    };

    authenticate();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;