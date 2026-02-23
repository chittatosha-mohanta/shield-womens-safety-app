import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {COLORS,FONTS} from '../utils/theme';
export default function SafetyMapScreen() {
  const nav=useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:24,paddingVertical:16}}>
        <TouchableOpacity onPress={()=>nav.goBack?.()}><Text style={{color:COLORS.textMuted,fontSize:18}}>←</Text></TouchableOpacity>
        <Text style={{fontSize:17,fontWeight:'900',color:COLORS.text}}>Safety Map</Text>
        <View style={{width:40}}/>
      </View>
      <View style={{flex:1,margin:24,backgroundColor:COLORS.bgCard,borderRadius:16,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',padding:32}}>
        <Text style={{fontSize:48,marginBottom:16}}>⬡</Text>
        <Text style={{fontSize:17,fontWeight:'700',color:COLORS.text,marginBottom:12}}>Interactive Safety Map</Text>
        <Text style={{fontSize:13,color:COLORS.textMuted,textAlign:'center',lineHeight:24}}>Live map with safe zones, incident reports, hospitals & police stations near you.{'\n\n'}Connect react-native-maps to activate.</Text>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',gap:16,paddingHorizontal:24,marginBottom:16}}>
        {[{c:COLORS.green,l:'Safe Zone'},{c:COLORS.red,l:'Incident'},{c:COLORS.blue,l:'Emergency Services'}].map((i)=>(
          <View key={i.l} style={{flexDirection:'row',alignItems:'center',gap:6}}><View style={{width:10,height:10,borderRadius:5,backgroundColor:i.c}}/><Text style={{fontSize:11,color:COLORS.textMuted}}>{i.l}</Text></View>
        ))}
      </View>
      <TouchableOpacity style={{marginHorizontal:24,marginBottom:24,backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.red+'40',borderRadius:999,padding:16,alignItems:'center'}}>
        <Text style={{color:COLORS.red,fontWeight:'700',fontSize:13,letterSpacing:1.5}}>+ REPORT UNSAFE AREA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
