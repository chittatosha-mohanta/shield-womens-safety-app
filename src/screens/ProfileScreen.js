import React from 'react';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../store/appStore';
import {COLORS} from '../utils/theme';
export default function ProfileScreen() {
  const nav=useNavigation();
  const {user,trustedContacts,setAuthenticated}=useAppStore();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <ScrollView contentContainerStyle={{padding:24}}>
        <Text style={{fontSize:11,color:COLORS.textDim,letterSpacing:2,marginBottom:16}}>YOUR PROFILE</Text>
        <View style={{alignItems:'center',paddingVertical:32,marginBottom:24}}>
          <View style={{width:90,height:90,borderRadius:45,backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center',marginBottom:16}}><Text style={{fontSize:40}}>👤</Text></View>
          <Text style={{fontSize:24,fontWeight:'900',color:COLORS.text,marginBottom:4}}>{user?.name||'User'}</Text>
          <Text style={{fontSize:13,color:COLORS.textMuted}}>{user?.phone||''}</Text>
        </View>
        <View style={{flexDirection:'row',gap:10,marginBottom:24}}>
          {[{val:trustedContacts.length,label:'Contacts'},{val:0,label:'SOS Used'},{val:0,label:'Journeys'}].map((s)=>(
            <View key={s.label} style={{flex:1,backgroundColor:COLORS.bgCard,borderRadius:12,padding:16,alignItems:'center',borderWidth:1,borderColor:COLORS.border}}>
              <Text style={{fontSize:24,fontWeight:'900',color:COLORS.text,marginBottom:4}}>{s.val}</Text>
              <Text style={{fontSize:11,color:COLORS.textMuted,textAlign:'center'}}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={{backgroundColor:COLORS.bgCard,borderRadius:16,borderWidth:1,borderColor:COLORS.border,overflow:'hidden',marginBottom:24}}>
          {[{icon:'⚙️',label:'Settings',fn:()=>nav.navigate('Settings')},{icon:'◈',label:'Trusted Circle',fn:()=>nav.navigate('Contacts')},{icon:'🔒',label:'Privacy & Security',fn:()=>{}},{icon:'❓',label:'Help & Support',fn:()=>{}}].map((item,i,arr)=>(
            <TouchableOpacity key={item.label} style={{flexDirection:'row',alignItems:'center',gap:16,padding:16,borderBottomWidth:i<arr.length-1?1:0,borderBottomColor:COLORS.border}} onPress={item.fn}>
              <Text style={{fontSize:20}}>{item.icon}</Text>
              <Text style={{flex:1,fontSize:15,color:COLORS.text}}>{item.label}</Text>
              <Text style={{color:COLORS.textDim}}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={{borderWidth:1,borderColor:COLORS.red+'40',borderRadius:999,padding:16,alignItems:'center'}} onPress={()=>setAuthenticated(false)}>
          <Text style={{color:COLORS.red,fontWeight:'700',fontSize:13,letterSpacing:1.5}}>LOG OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
