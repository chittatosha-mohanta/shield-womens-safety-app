import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/theme';
export default function ContactPickerScreen() {
  const nav=useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:24,paddingVertical:16}}>
        <TouchableOpacity onPress={()=>nav.goBack()}><Text style={{color:COLORS.textMuted,fontSize:18}}>←</Text></TouchableOpacity>
        <Text style={{fontSize:17,fontWeight:'900',color:COLORS.text}}>Pick Contact</Text>
        <View style={{width:40}}/>
      </View>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:32,marginBottom:12}}>📞</Text>
        <Text style={{color:COLORS.textMuted,fontSize:13}}>Uses expo-contacts in production</Text>
      </View>
    </SafeAreaView>
  );
}
