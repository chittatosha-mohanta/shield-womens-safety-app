import React,{useState,useRef,useCallback} from 'react';
import {View,Text,TouchableOpacity,ScrollView,StyleSheet,Animated,Dimensions,Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../store/appStore';
import {useLocation} from '../hooks/useLocation';
import {COLORS,FONTS,SPACING,RADIUS} from '../utils/theme';
const {width}=Dimensions.get('window');
const SOS_SIZE=width*0.48;
export default function HomeScreen() {
  const nav=useNavigation();
  const {trustedContacts,settings,isJourneyActive,user}=useAppStore();
  const {location}=useLocation({watch:true});
  const [countdown,setCountdown]=useState(5);
  const [counting,setCounting]=useState(false);
  const pulse=useRef(new Animated.Value(1)).current;
  const pulseOp=useRef(new Animated.Value(0.6)).current;
  const timerRef=useRef(null);
  const startPulse=()=>Animated.loop(Animated.sequence([
    Animated.parallel([Animated.timing(pulse,{toValue:1.3,duration:800,useNativeDriver:true}),Animated.timing(pulseOp,{toValue:0,duration:800,useNativeDriver:true})]),
    Animated.parallel([Animated.timing(pulse,{toValue:1,duration:0,useNativeDriver:true}),Animated.timing(pulseOp,{toValue:0.6,duration:0,useNativeDriver:true})]),
  ])).start();
  const stopPulse=()=>{pulse.setValue(1);pulseOp.setValue(0.6);};
  const handleSOS=()=>{
    if(counting){clearInterval(timerRef.current);setCounting(false);setCountdown(5);stopPulse();return;}
    setCounting(true);startPulse();
    let c=5;setCountdown(c);
    timerRef.current=setInterval(()=>{
      c-=1;setCountdown(c);
      if(c<=0){clearInterval(timerRef.current);setCounting(false);setCountdown(5);stopPulse();nav.navigate('SOSActive');}
    },1000);
  };
  const actions=[
    {icon:'⟶',label:'Safe Journey',color:COLORS.purple,bg:COLORS.purpleDim,onPress:()=>nav.navigate('Journey')},
    {icon:'📞',label:'Fake Call',color:COLORS.blue,bg:COLORS.blueDim,onPress:()=>nav.navigate('FakeCall')},
    {icon:'🎙',label:'Record',color:COLORS.orange,bg:'rgba(255,122,0,0.15)',onPress:()=>nav.navigate('Evidence')},
    {icon:'⬡',label:'Safe Map',color:COLORS.green,bg:COLORS.greenDim,onPress:()=>nav.navigate('SafetyMap')},
  ];
  const hour=new Date().getHours();
  const greet=hour<12?'morning':hour<17?'afternoon':'evening';
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:32}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:24,paddingTop:16,paddingBottom:8}}>
          <View>
            <Text style={{fontSize:11,color:COLORS.textMuted,letterSpacing:1,textTransform:'uppercase'}}>Good {greet},</Text>
            <Text style={{fontSize:24,fontWeight:'900',color:COLORS.text,letterSpacing:-0.5}}>{user?.name||'Stay Safe'}</Text>
          </View>
          <TouchableOpacity style={{width:40,height:40,borderRadius:20,backgroundColor:COLORS.bgCard,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:COLORS.border}} onPress={()=>nav.navigate('Settings')}>
            <Text style={{fontSize:18}}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {isJourneyActive&&(
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10,marginHorizontal:24,marginBottom:16,backgroundColor:COLORS.greenDim,borderWidth:1,borderColor:COLORS.green+'40',borderRadius:12,padding:16}} onPress={()=>nav.navigate('Journey')}>
            <Text>🟢</Text>
            <Text style={{flex:1,color:COLORS.green,fontSize:13,fontWeight:'600'}}>Journey tracking active</Text>
            <Text style={{color:COLORS.green,fontSize:12,fontWeight:'700'}}>VIEW →</Text>
          </TouchableOpacity>
        )}

        <View style={{alignItems:'center',justifyContent:'center',paddingVertical:32}}>
          <Animated.View style={{position:'absolute',width:SOS_SIZE+60,height:SOS_SIZE+60,borderRadius:(SOS_SIZE+60)/2,borderWidth:2,borderColor:COLORS.red,transform:[{scale:pulse}],opacity:pulseOp}}/>
          <TouchableOpacity onPress={handleSOS} activeOpacity={0.9} style={{width:SOS_SIZE,height:SOS_SIZE,borderRadius:SOS_SIZE/2,backgroundColor:counting?'#CC1F3A':COLORS.red,alignItems:'center',justifyContent:'center',shadowColor:COLORS.red,shadowOffset:{width:0,height:0},shadowOpacity:0.5,shadowRadius:30,elevation:20}}>
            {counting?(
              <><Text style={{fontSize:72,fontWeight:'900',color:'#fff',lineHeight:80}}>{countdown}</Text><Text style={{fontSize:10,color:'rgba(255,255,255,0.8)',letterSpacing:1.5}}>TAP TO CANCEL</Text></>
            ):(
              <><Text style={{fontSize:48}}>⚡</Text><Text style={{fontSize:28,fontWeight:'900',color:'#fff',letterSpacing:4}}>SOS</Text><Text style={{fontSize:10,color:'rgba(255,255,255,0.7)',letterSpacing:1.5,marginTop:4}}>HOLD TO ACTIVATE</Text></>
            )}
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'center',marginBottom:32}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:8,paddingVertical:8,paddingHorizontal:16,borderRadius:999,backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border}}>
            <Text style={{fontSize:16}}>◈</Text>
            <Text style={{color:COLORS.textMuted,fontSize:13}}>{trustedContacts.length} trusted contacts ready</Text>
          </View>
        </View>

        <Text style={{fontSize:11,fontWeight:'700',color:COLORS.textDim,letterSpacing:2,marginHorizontal:24,marginBottom:16}}>QUICK ACTIONS</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:12,paddingHorizontal:24,marginBottom:32}}>
          {actions.map((a,i)=>(
            <TouchableOpacity key={i} style={{width:(width-48-12)/2-1,backgroundColor:COLORS.bgCard,borderRadius:16,padding:16,borderWidth:1,borderColor:a.color+'30',alignItems:'flex-start'}} onPress={a.onPress} activeOpacity={0.7}>
              <View style={{width:48,height:48,borderRadius:14,backgroundColor:a.bg,alignItems:'center',justifyContent:'center',marginBottom:8}}>
                <Text style={{fontSize:22}}>{a.icon}</Text>
              </View>
              <Text style={{fontSize:13,fontWeight:'700',color:a.color,letterSpacing:0.5}}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{fontSize:11,fontWeight:'700',color:COLORS.textDim,letterSpacing:2,marginHorizontal:24,marginBottom:16}}>SAFETY TIP</Text>
        <View style={{flexDirection:'row',gap:16,marginHorizontal:24,padding:16,backgroundColor:COLORS.bgCard,borderRadius:16,borderWidth:1,borderColor:COLORS.border}}>
          <Text style={{fontSize:24,marginTop:2}}>💡</Text>
          <View style={{flex:1}}>
            <Text style={{fontSize:15,fontWeight:'700',color:COLORS.text,marginBottom:4}}>Share your route</Text>
            <Text style={{fontSize:13,color:COLORS.textMuted,lineHeight:20}}>Before traveling, activate Safe Journey so your circle can track you in real time.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
