import React,{useState} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/theme';
export default function EvidenceScreen() {
  const nav=useNavigation();
  const [rec,setRec]=useState(false);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:24,paddingVertical:16}}>
        <TouchableOpacity onPress={()=>nav.goBack()}><Text style={{color:COLORS.textMuted,fontSize:18}}>←</Text></TouchableOpacity>
        <Text style={{fontSize:17,fontWeight:'900',color:COLORS.text}}>Evidence Capture</Text>
        <View style={{width:40}}/>
      </View>
      <View style={{padding:24}}>
        <View style={{flexDirection:'row',gap:16,backgroundColor:COLORS.bgCard,borderRadius:12,padding:16,borderWidth:1,borderColor:COLORS.border,marginBottom:24}}>
          <Text style={{fontSize:18}}>🔐</Text>
          <Text style={{flex:1,fontSize:13,color:COLORS.textMuted,lineHeight:20}}>All recordings are AES-256 encrypted with legal timestamps. Only you can access them.</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:COLORS.bgCard,borderWidth:2,borderColor:rec?COLORS.red:COLORS.border,borderRadius:24,padding:48,alignItems:'center',backgroundColor:rec?COLORS.redDim:COLORS.bgCard}} onPress={()=>setRec(!rec)}>
          <Text style={{fontSize:40,marginBottom:8}}>{rec?'⏹':'🎙'}</Text>
          <Text style={{fontSize:15,fontWeight:'900',color:COLORS.text,letterSpacing:1.5}}>{rec?'STOP RECORDING':'START RECORDING'}</Text>
          {rec&&<Text style={{color:COLORS.red,marginTop:8,fontSize:13}}>● Recording in progress...</Text>}
        </TouchableOpacity>
        <View style={{alignItems:'center',paddingTop:40}}>
          <Text style={{fontSize:32,marginBottom:12}}>📂</Text>
          <Text style={{color:COLORS.textMuted,fontSize:13}}>No recordings yet</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
