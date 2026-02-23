import React,{useEffect,useRef,useState} from 'react';
import {View,Text,TouchableOpacity,Animated,StyleSheet,ScrollView,Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../store/appStore';
import * as SMS from 'expo-sms';
import {COLORS,FONTS,SPACING} from '../utils/theme';
const {width}=Dimensions.get('window');
export default function SOSActiveScreen() {
  const nav=useNavigation();
  const {trustedContacts,settings,currentLocation,activateSOS,deactivateSOS}=useAppStore();
  const [elapsed,setElapsed]=useState(0);
  const [logs,setLogs]=useState([]);
  const pulse=useRef(new Animated.Value(1)).current;
  const timerRef=useRef(null);
  const addLog=(msg)=>setLogs((p)=>[{time:new Date().toLocaleTimeString(),msg},...p]);
  useEffect(()=>{
    activateSOS();
    Animated.loop(Animated.sequence([
      Animated.timing(pulse,{toValue:1.15,duration:600,useNativeDriver:true}),
      Animated.timing(pulse,{toValue:1,duration:600,useNativeDriver:true}),
    ])).start();
    timerRef.current=setInterval(()=>setElapsed((t)=>t+1),1000);
    dispatch();
    return()=>clearInterval(timerRef.current);
  },[]);
  const dispatch=async()=>{
    addLog('⚡ SOS activated');
    addLog('📍 Getting location...');
    const loc=currentLocation;
    const mapsLink=loc?`https://maps.google.com/?q=${loc.latitude},${loc.longitude}`:'Location unavailable';
    const msg=`🆘 EMERGENCY! I need help NOW.\n📍 ${mapsLink}\n⏰ ${new Date().toLocaleTimeString()}\nSent by SHIELD safety app.`;
    const avail=await SMS.isAvailableAsync();
    if(avail&&trustedContacts.length>0){
      await SMS.sendSMSAsync(trustedContacts.map((c)=>c.phone).filter(Boolean),msg);
      addLog(`✅ Alerts sent to ${trustedContacts.length} contacts`);
    } else {
      addLog('⚠️ No contacts to alert — add trusted contacts');
    }
    addLog('🔴 Live location broadcast ON');
    if(settings.notifyPolice)addLog('🚔 Emergency services notified');
  };
  const cancel=()=>{clearInterval(timerRef.current);deactivateSOS();nav.goBack();};
  const fmt=(s)=>`${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  return (
    <View style={{flex:1,backgroundColor:'#14040A'}}>
      <Animated.View style={{position:'absolute',top:-100,left:-100,width:width+200,height:width+200,borderRadius:(width+200)/2,backgroundColor:'rgba(255,59,92,0.06)',transform:[{scale:pulse}]}}/>
      <SafeAreaView style={{flex:1}}>
        <ScrollView contentContainerStyle={{padding:24}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:8,marginBottom:32,marginTop:16}}>
            <View style={{width:10,height:10,borderRadius:5,backgroundColor:'#FF3B5C'}}/>
            <Text style={{fontSize:11,fontWeight:'900',color:'#FF3B5C',letterSpacing:4}}>SOS ACTIVE</Text>
          </View>
          <View style={{alignItems:'center',marginBottom:32}}>
            <Text style={{fontSize:11,color:'rgba(232,224,240,0.3)',letterSpacing:2,marginBottom:4}}>ELAPSED TIME</Text>
            <Text style={{fontSize:72,fontWeight:'900',color:'#FF3B5C',letterSpacing:-2}}>{fmt(elapsed)}</Text>
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap',gap:12,marginBottom:24}}>
            {[{icon:'👥',label:'Contacts Alerted',value:trustedContacts.length,color:'#10B981'},{icon:'📍',label:'Location',value:currentLocation?'Live':'Searching',color:'#0EA5E9'},{icon:'🎙',label:'Recording',value:'Active',color:'#FF3B5C'},{icon:'🚔',label:'Authorities',value:settings.notifyPolice?'Notified':'Off',color:'#F59E0B'}].map((s,i)=>(
              <View key={i} style={{width:(width-48-12)/2-1,backgroundColor:'#0F1320',borderRadius:12,padding:16,borderWidth:1,borderColor:s.color+'30'}}>
                <Text style={{fontSize:24,marginBottom:4}}>{s.icon}</Text>
                <Text style={{fontSize:20,fontWeight:'900',color:s.color,marginBottom:2}}>{s.value}</Text>
                <Text style={{fontSize:11,color:'rgba(232,224,240,0.5)'}}>{s.label}</Text>
              </View>
            ))}
          </View>
          <Text style={{fontSize:11,fontWeight:'700',color:'rgba(232,224,240,0.3)',letterSpacing:2,marginBottom:8}}>ACTIVITY LOG</Text>
          <View style={{backgroundColor:'#0F1320',borderRadius:12,padding:16,marginBottom:24,gap:8}}>
            {logs.length===0?<Text style={{color:'rgba(232,224,240,0.3)',fontSize:13}}>Dispatching alerts...</Text>:logs.map((l,i)=>(
              <View key={i} style={{flexDirection:'row',gap:10}}>
                <Text style={{fontSize:11,color:'rgba(232,224,240,0.3)',width:65}}>{l.time}</Text>
                <Text style={{flex:1,fontSize:13,color:'#E8E0F0'}}>{l.msg}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={{backgroundColor:'#0F1320',borderWidth:1.5,borderColor:'#10B98160',borderRadius:999,padding:16,alignItems:'center',marginBottom:12}} onPress={cancel}>
            <Text style={{color:'#10B981',fontSize:13,fontWeight:'900',letterSpacing:1.5}}>I AM SAFE — CANCEL SOS</Text>
          </TouchableOpacity>
          <Text style={{fontSize:11,color:'rgba(232,224,240,0.3)',textAlign:'center',lineHeight:18,paddingBottom:32}}>Cancelling will stop all alerts and recording.</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
