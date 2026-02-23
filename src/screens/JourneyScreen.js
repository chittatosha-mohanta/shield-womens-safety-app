import React,{useState} from 'react';
import {View,Text,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../store/appStore';
import {COLORS,FONTS,SPACING,RADIUS} from '../utils/theme';
export default function JourneyScreen() {
  const nav=useNavigation();
  const {isJourneyActive,startJourney,endJourney,journeyDestination,trustedContacts}=useAppStore();
  const [dest,setDest]=useState('');
  const [eta,setEta]=useState('');
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:24,paddingVertical:16}}>
        <TouchableOpacity onPress={()=>nav.goBack()}><Text style={{color:COLORS.textMuted,fontSize:18}}>←</Text></TouchableOpacity>
        <Text style={{fontSize:17,fontWeight:'900',color:COLORS.text}}>Safe Journey</Text>
        <View style={{width:40}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:24}}>
        {isJourneyActive?(
          <>
            <View style={{flexDirection:'row',alignItems:'center',gap:16,backgroundColor:COLORS.greenDim,borderWidth:1,borderColor:COLORS.green+'40',borderRadius:16,padding:24,marginBottom:24}}>
              <View style={{width:14,height:14,borderRadius:7,backgroundColor:COLORS.green}}/>
              <View><Text style={{fontSize:11,color:COLORS.green,letterSpacing:2,fontWeight:'700',marginBottom:4}}>JOURNEY ACTIVE</Text><Text style={{fontSize:15,color:COLORS.text,fontWeight:'600'}}>{journeyDestination?.destination}</Text></View>
            </View>
            <View style={{backgroundColor:COLORS.bgCard,borderRadius:16,padding:16,borderWidth:1,borderColor:COLORS.border,marginBottom:24}}>
              <Text style={{fontSize:15,fontWeight:'700',color:COLORS.text,marginBottom:6}}>Your circle is watching</Text>
              <Text style={{fontSize:13,color:COLORS.textMuted,lineHeight:20}}>{trustedContacts.length} contact{trustedContacts.length!==1?'s':''} are receiving your live location. They'll be alerted if you deviate from your route.</Text>
            </View>
            <TouchableOpacity style={{backgroundColor:COLORS.green,borderRadius:999,padding:16,alignItems:'center'}} onPress={endJourney}>
              <Text style={{color:'#fff',fontWeight:'900',fontSize:13,letterSpacing:1.5}}>I'VE ARRIVED SAFELY ✓</Text>
            </TouchableOpacity>
          </>
        ):(
          <>
            <Text style={{fontSize:11,fontWeight:'700',color:COLORS.textDim,letterSpacing:2,marginBottom:16}}>WHERE ARE YOU GOING?</Text>
            <TextInput style={{backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border,borderRadius:12,padding:16,color:COLORS.text,fontSize:15,marginBottom:12}} placeholder="Destination address" placeholderTextColor={COLORS.textDim} value={dest} onChangeText={setDest}/>
            <TextInput style={{backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border,borderRadius:12,padding:16,color:COLORS.text,fontSize:15,marginBottom:24}} placeholder="Expected arrival time (e.g. 9:30 PM)" placeholderTextColor={COLORS.textDim} value={eta} onChangeText={setEta}/>
            <View style={{backgroundColor:COLORS.bgCard,borderRadius:16,padding:16,gap:12,borderWidth:1,borderColor:COLORS.border,marginBottom:24}}>
              {['📍 Live location shared with your circle','⚠️ Alert if you deviate from route','⏰ Alert if you miss your ETA','✅ Safe arrival notification sent to contacts'].map((f,i)=>(
                <Text key={i} style={{fontSize:13,color:COLORS.textMuted,lineHeight:22}}>{f}</Text>
              ))}
            </View>
            <TouchableOpacity style={{backgroundColor:dest?COLORS.purple:COLORS.bgCard,borderRadius:999,padding:16,alignItems:'center'}} onPress={()=>dest&&startJourney({destination:dest,eta})} disabled={!dest}>
              <Text style={{color:dest?'#fff':COLORS.textMuted,fontWeight:'900',fontSize:13,letterSpacing:1.5}}>START SAFE JOURNEY</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
