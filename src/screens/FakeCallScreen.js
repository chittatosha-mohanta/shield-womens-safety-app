import React,{useState,useEffect,useRef} from 'react';
import {View,Text,TouchableOpacity,Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../utils/theme';
export default function FakeCallScreen() {
  const nav=useNavigation();
  const [accepted,setAccepted]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const ring=useRef(new Animated.Value(1)).current;
  useEffect(()=>{
    Animated.loop(Animated.sequence([Animated.timing(ring,{toValue:1.1,duration:500,useNativeDriver:true}),Animated.timing(ring,{toValue:1,duration:500,useNativeDriver:true})])).start();
  },[]);
  useEffect(()=>{
    if(accepted){const t=setInterval(()=>setElapsed(e=>e+1),1000);return()=>clearInterval(t);}
  },[accepted]);
  const fmt=(s)=>`${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  return (
    <View style={{flex:1,backgroundColor:'#0A0A1A',alignItems:'center',justifyContent:'space-between',paddingVertical:80}}>
      <View style={{alignItems:'center'}}>
        <Animated.View style={{position:'absolute',width:160,height:160,borderRadius:80,borderWidth:2,borderColor:'rgba(255,255,255,0.15)',transform:[{scale:ring}]}}/>
        <View style={{width:120,height:120,borderRadius:60,backgroundColor:'#1A1A2E',alignItems:'center',justifyContent:'center',marginBottom:20}}><Text style={{fontSize:48}}>👩</Text></View>
        <Text style={{fontSize:36,fontWeight:'900',color:'#fff',marginBottom:8}}>Mom</Text>
        <Text style={{fontSize:15,color:'rgba(255,255,255,0.5)'}}>{accepted?`Connected · ${fmt(elapsed)}`:'Incoming call...'}</Text>
      </View>
      <View style={{flexDirection:'row',gap:60}}>
        {!accepted?(
          <>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={{width:72,height:72,borderRadius:36,backgroundColor:COLORS.red,alignItems:'center',justifyContent:'center',marginBottom:8}} onPress={()=>nav.goBack()}><Text style={{fontSize:32}}>📵</Text></TouchableOpacity>
              <Text style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>Decline</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={{width:72,height:72,borderRadius:36,backgroundColor:COLORS.green,alignItems:'center',justifyContent:'center',marginBottom:8}} onPress={()=>setAccepted(true)}><Text style={{fontSize:32}}>📞</Text></TouchableOpacity>
              <Text style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>Accept</Text>
            </View>
          </>
        ):(
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{width:72,height:72,borderRadius:36,backgroundColor:COLORS.red,alignItems:'center',justifyContent:'center',marginBottom:8}} onPress={()=>nav.goBack()}><Text style={{fontSize:32}}>📵</Text></TouchableOpacity>
            <Text style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>End Call</Text>
          </View>
        )}
      </View>
    </View>
  );
}
