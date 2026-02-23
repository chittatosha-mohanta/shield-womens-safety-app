import React from 'react';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../store/appStore';
import {COLORS} from '../utils/theme';
const TOGGLES=[
  {key:'shakeToSOS',label:'Shake to Activate SOS',desc:'Shake phone rapidly to trigger SOS',icon:'📳'},
  {key:'autoRecord',label:'Auto-Record on SOS',desc:'Start audio recording when SOS activates',icon:'🎙'},
  {key:'silentSOS',label:'Silent SOS Mode',desc:'No sounds or visual alerts on your device',icon:'🔇'},
  {key:'notifyPolice',label:'Notify Emergency Services',desc:'Auto-dial 112 when SOS is activated',icon:'🚔'},
  {key:'disguiseMode',label:'Calculator Disguise',desc:'App appears as a calculator on home screen',icon:'🔢'},
];
export default function SettingsScreen() {
  const nav=useNavigation();
  const {settings,updateSettings}=useAppStore();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:24,paddingVertical:16}}>
        <TouchableOpacity onPress={()=>nav.goBack()}><Text style={{color:COLORS.textMuted,fontSize:18}}>←</Text></TouchableOpacity>
        <Text style={{fontSize:17,fontWeight:'900',color:COLORS.text}}>Settings</Text>
        <View style={{width:40}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:24,gap:10}}>
        <Text style={{fontSize:11,fontWeight:'700',color:COLORS.textDim,letterSpacing:2,marginBottom:4}}>SOS PREFERENCES</Text>
        {TOGGLES.map((t)=>(
          <TouchableOpacity key={t.key} style={{flexDirection:'row',alignItems:'center',gap:16,backgroundColor:COLORS.bgCard,borderRadius:12,padding:16,borderWidth:1,borderColor:COLORS.border}} onPress={()=>updateSettings({[t.key]:!settings[t.key]})}>
            <Text style={{fontSize:22}}>{t.icon}</Text>
            <View style={{flex:1}}>
              <Text style={{fontSize:15,fontWeight:'700',color:COLORS.text,marginBottom:2}}>{t.label}</Text>
              <Text style={{fontSize:11,color:COLORS.textMuted}}>{t.desc}</Text>
            </View>
            <View style={{width:48,height:28,borderRadius:14,backgroundColor:settings[t.key]?COLORS.green:'rgba(255,255,255,0.1)',padding:3,justifyContent:'center'}}>
              <View style={{width:22,height:22,borderRadius:11,backgroundColor:settings[t.key]?'#fff':COLORS.textMuted,alignSelf:settings[t.key]?'flex-end':'flex-start'}}/>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
