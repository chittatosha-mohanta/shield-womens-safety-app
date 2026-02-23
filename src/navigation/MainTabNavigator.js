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
const Icon = ({icon,label,focused}) => (
  <View style={{alignItems:'center',paddingTop:6}}>
    <Text style={{fontSize:20,marginBottom:2}}>{icon}</Text>
    <Text style={{fontSize:10,color:focused?COLORS.red:COLORS.textMuted,fontWeight:focused?'700':'400',letterSpacing:0.5}}>{label}</Text>
  </View>
);
export default function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'#0C0F1C',borderTopColor:'rgba(255,255,255,0.06)',borderTopWidth:1,height:Platform.OS==='ios'?85:65,paddingBottom:Platform.OS==='ios'?20:8},tabBarShowLabel:false}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({focused})=><Icon icon="◎" label="HOME" focused={focused}/>}}/>
      <Tab.Screen name="Contacts" component={ContactsScreen} options={{tabBarIcon:({focused})=><Icon icon="◈" label="CIRCLE" focused={focused}/>}}/>
      <Tab.Screen name="Map" component={SafetyMapScreen} options={{tabBarIcon:({focused})=><Icon icon="⬡" label="MAP" focused={focused}/>}}/>
      <Tab.Screen name="AI" component={AIAssistantScreen} options={{tabBarIcon:({focused})=><Icon icon="✦" label="AI" focused={focused}/>}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon:({focused})=><Icon icon="⊕" label="ME" focused={focused}/>}}/>
    </Tab.Navigator>
  );
}
