import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function Messaging() {
  const [messages, setMessages] = useState([
    { id: '1', from: 'seller', text: 'Bonjour, comment puis-je vous aider ?' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;
    const myMsg = { id: Date.now().toString(), from: 'me', text: input.trim() };
    setMessages((prev) => [...prev, myMsg]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.from === 'me' ? styles.bubbleMe : styles.bubbleSeller]}>
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Votre message..."
          placeholderTextColor="#9aa0a6"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020' },
  list: { padding: 12 },
  bubble: {
    maxWidth: '80%',
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: '#4c6fff' },
  bubbleSeller: { alignSelf: 'flex-start', backgroundColor: '#111834', borderWidth: 1, borderColor: '#1b2750' },
  bubbleText: { color: '#fff' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#1b2750',
    backgroundColor: '#0b1020',
  },
  input: {
    flex: 1,
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    color: '#e8eaf6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 10 : 8,
    marginRight: 8,
  },
  sendBtn: { backgroundColor: '#4c6fff', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 },
  sendText: { color: '#fff', fontWeight: '700' },
});
