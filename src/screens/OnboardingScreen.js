import React,{useState,useRef} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppStore} from '../store/appStore';
const {width}=Dimensions.get('window');
const SLIDES=[
  {icon:'⚡',color:'#FF3B5C',title:'Instant SOS',sub:'One tap sends emergency alerts to your trusted circle with live location in under 2 seconds.'},
  {icon:'◈',color:'#A855F7',title:'Trusted Circle',sub:'Add up to 10 trusted contacts alerted by SMS, call, and push notification simultaneously.'},
  {icon:'⟶',color:'#0EA5E9',title:'Safe Journey',sub:'Share your route live. Contacts notified if you deviate or don\'t arrive on time.'},
  {icon:'✦',color:'#10B981',title:'AI Safety Guide',sub:'Get instant guidance on safety, legal rights, nearby resources — 24/7, even offline.'},
  {icon:'🔒',color:'#F59E0B',title:'Privacy First',sub:'All data end-to-end encrypted. We never sell your data. It belongs only to you.'},
];
export default function OnboardingScreen() {
  const {setOnboarded}=useAppStore();
  const [cur,setCur]=useState(0);
  const ref=useRef(null);
  const goNext=()=>{
    if(cur<SLIDES.length-1){ref.current?.scrollTo({x:(cur+1)*width,animated:true});setCur(cur+1);}
    else setOnboarded(true);
  };
  const s=SLIDES[cur];
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#080B14'}}>
      <ScrollView ref={ref} horizontal pagingEnabled scrollEnabled={false} showsHorizontalScrollIndicator={false}>
        {SLIDES.map((sl,i)=>(
          <View key={i} style={{width,flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:32,paddingTop:60}}>
            <View style={{width:120,height:120,borderRadius:60,backgroundColor:sl.color+'20',borderWidth:1.5,borderColor:sl.color+'40',alignItems:'center',justifyContent:'center',marginBottom:32}}>
              <Text style={{fontSize:52}}>{sl.icon}</Text>
            </View>
            <Text style={{fontSize:36,fontWeight:'900',color:sl.color,letterSpacing:-1,marginBottom:16,textAlign:'center'}}>{sl.title}</Text>
            <Text style={{fontSize:15,color:'rgba(232,224,240,0.6)',textAlign:'center',lineHeight:26}}>{sl.sub}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{flexDirection:'row',justifyContent:'center',gap:8,paddingVertical:24}}>
        {SLIDES.map((_,i)=><View key={i} style={{height:8,borderRadius:4,backgroundColor:i===cur?s.color:'rgba(255,255,255,0.15)',width:i===cur?24:8}}/>)}
      </View>
      <View style={{paddingHorizontal:24,paddingBottom:32,gap:12,alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%',backgroundColor:s.color,borderRadius:999,paddingVertical:16,alignItems:'center'}} onPress={goNext}>
          <Text style={{color:'#fff',fontSize:13,fontWeight:'900',letterSpacing:2}}>{cur===SLIDES.length-1?'GET STARTED':'NEXT'}</Text>
        </TouchableOpacity>
        {cur<SLIDES.length-1&&<TouchableOpacity onPress={()=>setOnboarded(true)}><Text style={{color:'rgba(232,224,240,0.5)',fontSize:13}}>Skip</Text></TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
}
