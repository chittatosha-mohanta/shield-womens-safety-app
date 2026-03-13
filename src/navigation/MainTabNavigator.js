import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { COLORS } from '../utils/theme';
import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SafetyMapScreen from '../screens/SafetyMapScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const Icon = ({ icon, label, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8, width: 64 }}>
    <Text style={{ fontSize: 22, marginBottom: 3 }}>{icon}</Text>
    <Text numberOfLines={1} style={{
      fontSize: 9,
      color: focused ? '#FF3B5C' : 'rgba(255,255,255,0.7)',
      fontWeight: focused ? '700' : '500',
      letterSpacing: 0.8,
      textAlign: 'center',
    }}>
      {label}
    </Text>
  </View>
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0C0F1C',
          borderTopColor: 'rgba(255,255,255,0.12)',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon icon="🏠" label="HOME" focused={focused} /> }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon icon="👥" label="CIRCLE" focused={focused} /> }}
      />
      <Tab.Screen
        name="Map"
        component={SafetyMapScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon icon="🗺️" label="MAP" focused={focused} /> }}
      />
      <Tab.Screen
        name="AI"
        component={AIAssistantScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon icon="🤖" label="AI" focused={focused} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <Icon icon="👤" label="ME" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}