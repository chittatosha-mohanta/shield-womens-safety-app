import React,{useState,useRef,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform,ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS,FONTS} from '../utils/theme';
const QUICK=['What are my legal rights if harassed?','Find the nearest hospital','How do I file a police complaint?','Tips for walking home at night','Someone is following me — what do I do?'];
const INIT=[{id:'1',role:'assistant',text:"Hello! I'm your SHIELD Safety Assistant, available 24/7.\n\nI can help with safety guidance, legal information, nearby resources, and emotional support.\n\nHow can I help you right now?",time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}];
async function getAI(msg) {
  await new Promise(r=>setTimeout(r,1200));
  const l=msg.toLowerCase();
  if(l.includes('legal')||l.includes('right')||l.includes('harass'))return"Your legal rights when facing harassment:\n\n• Section 354 IPC — outraging modesty\n• Section 509 IPC — verbal/gesture harassment\n• POSH Act — workplace harassment\n• You can file an FIR at ANY police station\n\nWould you like help filing a complaint?";
  if(l.includes('hospital')||l.includes('medical'))return"Emergency resources:\n\n🚑 Dial 108 — ambulance (India)\n🚑 Dial 102 — free ambulance\n🏥 Nearest emergency: search 'hospital near me'\n\nDo you need first aid guidance while you wait?";
  if(l.includes('follow')||l.includes('scared')||l.includes('stalking'))return"If someone is following you:\n\n1. 🏪 Enter a busy public place immediately\n2. 📞 Call someone, stay on the line\n3. 🚶 Change direction 2–3 times to confirm\n4. 🏫 Find a police station or security guard\n5. ⚡ Use the SOS button if you feel unsafe\n\nTrust your instincts — you are not overreacting.";
  if(l.includes('night')||l.includes('walk')||l.includes('alone'))return"Staying safe when walking alone:\n\n🔆 Stay on well-lit streets\n📱 Share live location with a contact\n🎧 Keep one earbud out to stay aware\n⚡ Keep SOS ready on your screen\n📞 Fake a phone call if needed\n\nWant to activate Safe Journey tracking?";
  return"I understand your concern. Here are immediate steps:\n\n1. Stay calm and assess your surroundings\n2. Move to a safer, more public location\n3. Contact a trusted person\n4. Use the SOS button if in immediate danger\n\nCan you tell me more? I'm here to help.";
}
export default function AIAssistantScreen() {
  const [msgs,setMsgs]=useState(INIT);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{setTimeout(()=>ref.current?.scrollToEnd({animated:true}),100);},[msgs]);
  const send=async(text=input)=>{
    if(!text.trim()||loading)return;
    const user={id:Date.now().toString(),role:'user',text:text.trim(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})};
    setMsgs(p=>[...p,user]);setInput('');setLoading(true);
    try{const r=await getAI(text.trim());setMsgs(p=>[...p,{id:(Date.now()+1).toString(),role:'assistant',text:r,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]);}
    catch{setMsgs(p=>[...p,{id:(Date.now()+1).toString(),role:'assistant',text:"I'm temporarily offline. If this is an emergency, use the SOS button on the home screen.",time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]);}
    setLoading(false);
  };
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':'height'} keyboardVerticalOffset={Platform.OS==='ios'?0:20}>
        <View style={{flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:24,paddingVertical:16,borderBottomWidth:1,borderBottomColor:COLORS.border}}>
          <View style={{width:44,height:44,borderRadius:22,backgroundColor:COLORS.purpleDim,borderWidth:1,borderColor:COLORS.purple+'40',alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:22}}>✦</Text></View>
          <View>
            <Text style={{fontSize:15,fontWeight:'900',color:COLORS.text,letterSpacing:1}}>SHIELD AI</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:2}}>
              <View style={{width:7,height:7,borderRadius:4,backgroundColor:COLORS.green}}/>
              <Text style={{fontSize:11,color:COLORS.textMuted}}>Always available · Private</Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:52,marginVertical:8}} contentContainerStyle={{paddingHorizontal:24,gap:8,alignItems:'center'}}>
          {QUICK.map((q,i)=>(
            <TouchableOpacity key={i} style={{paddingHorizontal:14,paddingVertical:8,borderRadius:999,backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border}} onPress={()=>send(q)}>
              <Text style={{fontSize:11,color:COLORS.textMuted}}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView ref={ref} style={{flex:1}} contentContainerStyle={{padding:24,gap:12}} showsVerticalScrollIndicator={false}>
          {msgs.map((m)=>(
            <View key={m.id} style={{maxWidth:'85%',borderRadius:16,padding:16,alignSelf:m.role==='user'?'flex-end':'flex-start',backgroundColor:m.role==='user'?COLORS.red:COLORS.bgCard,borderWidth:m.role==='assistant'?1:0,borderColor:COLORS.border,[m.role==='user'?'borderBottomRightRadius':'borderBottomLeftRadius']:4}}>
              <Text style={{fontSize:15,lineHeight:22,color:m.role==='user'?'#fff':COLORS.text}}>{m.text}</Text>
              <Text style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginTop:4,alignSelf:'flex-end'}}>{m.time}</Text>
            </View>
          ))}
          {loading&&<View style={{backgroundColor:COLORS.bgCard,borderRadius:16,padding:16,alignSelf:'flex-start',borderWidth:1,borderColor:COLORS.border}}><ActivityIndicator size="small" color={COLORS.purple}/></View>}
        </ScrollView>
        <View style={{flexDirection:'row',alignItems:'flex-end',gap:8,padding:16,paddingBottom:24,borderTopWidth:1,borderTopColor:COLORS.border}}>
          <TextInput style={{flex:1,backgroundColor:COLORS.bgCard,borderWidth:1,borderColor:COLORS.border,borderRadius:16,padding:16,color:COLORS.text,fontSize:15,maxHeight:120}} value={input} onChangeText={setInput} placeholder="Ask anything about safety..." placeholderTextColor={COLORS.textDim} multiline/>
          <TouchableOpacity style={{width:44,height:44,borderRadius:22,backgroundColor:input.trim()?COLORS.purple:COLORS.bgCard,alignItems:'center',justifyContent:'center',borderWidth:input.trim()?0:1,borderColor:COLORS.border}} onPress={()=>send()} disabled={!input.trim()||loading}>
            <Text style={{fontSize:18}}>⟶</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
