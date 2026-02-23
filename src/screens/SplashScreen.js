import React,{useEffect,useRef} from 'react';
import {View,Text,Animated,StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get('window');
export default function SplashScreen() {
  const scale=useRef(new Animated.Value(0.5)).current;
  const opacity=useRef(new Animated.Value(0)).current;
  const ring=useRef(new Animated.Value(0.8)).current;
  const ringOp=useRef(new Animated.Value(0.8)).current;
  useEffect(()=>{
    Animated.parallel([
      Animated.spring(scale,{toValue:1,tension:60,friction:8,useNativeDriver:true}),
      Animated.timing(opacity,{toValue:1,duration:600,useNativeDriver:true}),
    ]).start();
    Animated.loop(Animated.parallel([
      Animated.timing(ring,{toValue:1.8,duration:1800,useNativeDriver:true}),
      Animated.timing(ringOp,{toValue:0,duration:1800,useNativeDriver:true}),
    ])).start();
  },[]);
  return (
    <View style={s.container}>
      <View style={s.glow}/>
      <Animated.View style={[s.ring,{transform:[{scale:ring}],opacity:ringOp}]}/>
      <Animated.View style={{transform:[{scale}],opacity,alignItems:'center'}}>
        <View style={s.circle}><Text style={{fontSize:44}}>⚡</Text></View>
        <Text style={s.logo}>SHIELD</Text>
        <Text style={s.tag}>Your safety, always.</Text>
      </Animated.View>
    </View>
  );
}
const s=StyleSheet.create({
  container:{flex:1,backgroundColor:'#080B14',alignItems:'center',justifyContent:'center'},
  glow:{position:'absolute',width:400,height:400,borderRadius:200,backgroundColor:'rgba(255,59,92,0.08)',top:height/2-200,left:width/2-200},
  ring:{position:'absolute',width:160,height:160,borderRadius:80,borderWidth:2,borderColor:'rgba(255,59,92,0.4)'},
  circle:{width:100,height:100,borderRadius:50,backgroundColor:'rgba(255,59,92,0.15)',borderWidth:2,borderColor:'rgba(255,59,92,0.4)',alignItems:'center',justifyContent:'center',marginBottom:20},
  logo:{fontSize:40,fontWeight:'900',color:'#FF3B5C',letterSpacing:8,marginBottom:8},
  tag:{fontSize:14,color:'rgba(232,224,240,0.5)',letterSpacing:2},
});
