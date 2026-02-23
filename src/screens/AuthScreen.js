import React,{useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppStore} from '../store/appStore';
export default function AuthScreen() {
  const {setAuthenticated,setUser}=useAppStore();
  const [mode,setMode]=useState('signup');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [pin,setPin]=useState('');
  const submit=()=>{
    if(!phone.trim()||!pin.trim()){Alert.alert('Required','Enter phone and PIN');return;}
    if(pin.length<4){Alert.alert('Too short','PIN must be 4+ digits');return;}
    setUser({name:name||'User',phone});setAuthenticated(true);
  };
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#080B14',paddingHorizontal:24}}>
      <View style={{alignItems:'center',paddingTop:60,paddingBottom:40}}>
        <View style={{width:80,height:80,borderRadius:40,backgroundColor:'rgba(255,59,92,0.15)',borderWidth:1.5,borderColor:'rgba(255,59,92,0.4)',alignItems:'center',justifyContent:'center',marginBottom:16}}>
          <Text style={{fontSize:32}}>⚡</Text>
        </View>
        <Text style={{fontSize:32,fontWeight:'900',color:'#FF3B5C',letterSpacing:8}}>SHIELD</Text>
      </View>
      <View style={{flexDirection:'row',backgroundColor:'#0F1320',borderRadius:999,padding:4,marginBottom:24}}>
        {['signup','login'].map((m)=>(
          <TouchableOpacity key={m} style={{flex:1,paddingVertical:10,borderRadius:999,alignItems:'center',backgroundColor:mode===m?'#FF3B5C':'transparent'}} onPress={()=>setMode(m)}>
            <Text style={{fontSize:11,fontWeight:'900',color:mode===m?'#fff':'rgba(232,224,240,0.5)',letterSpacing:1.5}}>{m==='signup'?'SIGN UP':'LOG IN'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{gap:12}}>
        {mode==='signup'&&<TextInput style={inp} placeholder="Your name" placeholderTextColor="rgba(232,224,240,0.3)" value={name} onChangeText={setName}/>}
        <TextInput style={inp} placeholder="Phone number" placeholderTextColor="rgba(232,224,240,0.3)" value={phone} onChangeText={setPhone} keyboardType="phone-pad"/>
        <TextInput style={inp} placeholder="4-digit PIN" placeholderTextColor="rgba(232,224,240,0.3)" value={pin} onChangeText={setPin} secureTextEntry keyboardType="numeric" maxLength={6}/>
        <TouchableOpacity style={{backgroundColor:'#FF3B5C',borderRadius:999,paddingVertical:16,alignItems:'center',marginTop:8}} onPress={submit}>
          <Text style={{color:'#fff',fontWeight:'900',fontSize:13,letterSpacing:2}}>{mode==='signup'?'CREATE ACCOUNT':'LOG IN'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize:11,color:'rgba(232,224,240,0.3)',textAlign:'center',marginTop:24,lineHeight:18}}>Your data is end-to-end encrypted. We never share your information.</Text>
    </SafeAreaView>
  );
}
const inp={backgroundColor:'#0F1320',borderWidth:1,borderColor:'rgba(255,255,255,0.07)',borderRadius:12,padding:16,color:'#E8E0F0',fontSize:15};
