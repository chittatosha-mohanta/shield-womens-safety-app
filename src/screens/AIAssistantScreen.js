import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../utils/theme';
const QUICK = ['What are my legal rights if harassed?', 'Find the nearest hospital', 'How do I file a police complaint?', 'Tips for walking home at night', 'Someone is following me — what do I do?'];
const INIT = [{ id: '1', role: 'assistant', text: "Hello! I'm your SHIELD Safety Assistant, available 24/7.\n\nI can help with safety guidance, legal information, nearby resources, and emotional support.\n\nHow can I help you right now?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
async function getAI(userMessage, history) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB4AoljR8wzPsaJ42MdVd80SOmv0Vy6VH4`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{
                text: `You are SHIELD AI, a personal safety assistant for women.
You help with emergency safety guidance, legal rights when facing harassment,
finding nearby hospitals and police stations, emotional support, and safety tips.
Always be calm, supportive and practical. Keep responses concise and actionable.
If someone is in immediate danger, always tell them to use the SOS button first.

User message: ${userMessage}`
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    const data = await response.json();
    console.log('Gemini Response:', JSON.stringify(data));

    if (data.candidates && data.candidates[0]) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      return `Error: ${data.error.message}`;
    }
    return "Sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error('AI Error:', error);
    return "I'm temporarily offline. If this is an emergency, please use the SOS button immediately.";
  }
}
export default function AIAssistantScreen() {
  const [msgs, setMsgs] = useState(INIT);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 100); }, [msgs]);
  const send = async (text = input) => {
    if (!text.trim() || loading) return;
    const user = { id: Date.now().toString(), role: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMsgs(p => [...p, user]); setInput(''); setLoading(true);
    try { const r = await getAI(text.trim(), msgs); setMsgs(p => [...p, { id: (Date.now() + 1).toString(), role: 'assistant', text: r, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); }
    catch { setMsgs(p => [...p, { id: (Date.now() + 1).toString(), role: 'assistant', text: "I'm temporarily offline. If this is an emergency, use the SOS button on the home screen.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); }
    setLoading(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.purpleDim, borderWidth: 1, borderColor: COLORS.purple + '40', alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 22 }}>✦</Text></View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: '900', color: COLORS.text, letterSpacing: 1 }}>SHIELD AI</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.green }} />
              <Text style={{ fontSize: 11, color: COLORS.textMuted }}>Always available · Private</Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 52, marginVertical: 8 }} contentContainerStyle={{ paddingHorizontal: 24, gap: 8, alignItems: 'center' }}>
          {QUICK.map((q, i) => (
            <TouchableOpacity key={i} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border }} onPress={() => send(q)}>
              <Text style={{ fontSize: 11, color: COLORS.textMuted }}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView ref={ref} style={{ flex: 1 }} contentContainerStyle={{ padding: 24, gap: 12 }} showsVerticalScrollIndicator={false}>
          {msgs.map((m) => (
            <View key={m.id} style={{ maxWidth: '85%', borderRadius: 16, padding: 16, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.role === 'user' ? COLORS.red : COLORS.bgCard, borderWidth: m.role === 'assistant' ? 1 : 0, borderColor: COLORS.border, [m.role === 'user' ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: 4 }}>
              <Text style={{ fontSize: 15, lineHeight: 22, color: m.role === 'user' ? '#fff' : COLORS.text }}>{m.text}</Text>
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, alignSelf: 'flex-end' }}>{m.time}</Text>
            </View>
          ))}
          {loading && <View style={{ backgroundColor: COLORS.bgCard, borderRadius: 16, padding: 16, alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border }}><ActivityIndicator size="small" color={COLORS.purple} /></View>}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, padding: 16, paddingBottom: 24, borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <TextInput style={{ flex: 1, backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 16, color: COLORS.text, fontSize: 15, maxHeight: 120 }} value={input} onChangeText={setInput} placeholder="Ask anything about safety..." placeholderTextColor={COLORS.textDim} multiline />
          <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: input.trim() ? COLORS.purple : COLORS.bgCard, alignItems: 'center', justifyContent: 'center', borderWidth: input.trim() ? 0 : 1, borderColor: COLORS.border }} onPress={() => send()} disabled={!input.trim() || loading}>
            <Text style={{ fontSize: 18 }}>⟶</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
