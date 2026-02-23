import React,{useState} from 'react';
import {View,Text,TouchableOpacity,ScrollView,TextInput,Alert,Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppStore} from '../store/appStore';
import {COLORS,FONTS,SPACING} from '../utils/theme';
const {width}=Dimensions.get('window');
const AC=['#FF3B5C','#A855F7','#0EA5E9','#10B981','#FF7A00','#F59E0B'];
export default function ContactsScreen() {
  const {trustedContacts,addTrustedContact,removeTrustedContact}=useAppStore();
  const [show,setShow]=useState(false);
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [rel,setRel]=useState('');
  const add=()=>{
    if(!name.trim()||!phone.trim()){Alert.alert('Required','Enter name and phone');return;}
    addTrustedContact({id:Date.now().toString(),name:name.trim(),phone:phone.trim(),relation:rel.trim()||'Contact'});
    setName('');setPhone('');setRel('');setShow(false);
  };
  const remove=(c)=>Alert.alert('Remove',`Remove ${c.name}?`,[{text:'Cancel',style:'cancel'},{text:'Remove',style:'destructive',onPress:()=>removeTrustedContact(c.id)}]);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.bg}} edges={['top']}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:24,paddingTop:16,paddingBottom:24}}>
        <View>
          <Text style={{fontSize:11,color:COLORS.textDim,letterSpacing:2,marginBottom:4}}>SAFETY NETWORK</Text>
          <Text style={{fontSize:32,fontWeight:'900',color:COLORS.text,letterSpacing:-0.5}}>Trusted Circle</Text>
        </View>
        <TouchableOpacity style={{width:44,height:44,borderRadius:22,backgroundColor:COLORS.red,alignItems:'center',justifyContent:'center'}} onPress={()=>setShow(!show)}>
          <Text style={{color:'#fff',fontSize:24,fontWeight:'300',lineHeight:28}}>{show?'✕':'+'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'row',gap:12,marginHorizontal:24,marginBottom:16,backgroundColor:COLORS.purpleDim,borderWidth:1,borderColor:COLORS.purple+'30',borderRadius:12,padding:16,alignItems:'flex-start'}}>
          <Text style={{fontSize:18,color:COLORS.purple}}>◈</Text>
          <Text style={{flex:1,fontSize:13,color:COLORS.textMuted,lineHeight:20}}>These contacts are alerted immediately when you activate SOS. Add up to 10 trusted people.</Text>
        </View>
        {show&&(
          <View style={{marginHorizontal:24,marginBottom:16,padding:24,backgroundColor:COLORS.bgCard,borderRadius:16,borderWidth:1,borderColor:COLORS.border,gap:12}}>
            <Text style={{fontSize:11,fontWeight:'700',color:COLORS.textDim,letterSpacing:2,marginBottom:4}}>ADD TRUSTED CONTACT</Text>
            {[{val:name,set:setName,ph:'Full name'},{val:phone,set:setPhone,ph:'Phone number',type:'phone-pad'},{val:rel,set:setRel,ph:'Relation (e.g. Mom, Sister)'}].map((f,i)=>(
              <TextInput key={i} style={{backgroundColor:COLORS.bg,borderWidth:1,borderColor:COLORS.border,borderRadius:12,padding:16,color:COLORS.text,fontSize:15}} placeholder={f.ph} placeholderTextColor={COLORS.textDim} value={f.val} onChangeText={f.set} keyboardType={f.type}/>
            ))}
            <TouchableOpacity style={{backgroundColor:COLORS.red,borderRadius:999,padding:16,alignItems:'center',marginTop:4}} onPress={add}>
              <Text style={{color:'#fff',fontWeight:'900',fontSize:13,letterSpacing:1.5}}>ADD TO CIRCLE</Text>
            </TouchableOpacity>
          </View>
        )}
        {trustedContacts.length===0?(
          <View style={{alignItems:'center',paddingTop:60,paddingHorizontal:32}}>
            <Text style={{fontSize:48,marginBottom:16}}>◈</Text>
            <Text style={{fontSize:20,fontWeight:'700',color:COLORS.text,marginBottom:8}}>No contacts yet</Text>
            <Text style={{fontSize:13,color:COLORS.textMuted,textAlign:'center',lineHeight:22}}>Add people you trust. They'll be alerted in emergencies.</Text>
          </View>
        ):(
          <View style={{paddingHorizontal:24,gap:10,marginBottom:24}}>
            {trustedContacts.map((c,i)=>(
              <View key={c.id} style={{flexDirection:'row',alignItems:'center',gap:16,backgroundColor:COLORS.bgCard,borderRadius:16,padding:16,borderWidth:1,borderColor:COLORS.border}}>
                <View style={{width:48,height:48,borderRadius:24,backgroundColor:AC[i%AC.length]+'20',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:20,fontWeight:'900',color:AC[i%AC.length]}}>{c.name[0].toUpperCase()}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15,fontWeight:'700',color:COLORS.text,marginBottom:2}}>{c.name}</Text>
                  <Text style={{fontSize:13,color:COLORS.textMuted}}>{c.relation} · {c.phone}</Text>
                </View>
                <TouchableOpacity onPress={()=>remove(c)} style={{width:32,height:32,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:COLORS.textMuted,fontSize:16}}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
