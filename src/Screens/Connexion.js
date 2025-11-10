import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Connexion() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with your authentication logic (e.g., Firebase, API call)
    if (email && password) {
      // Mock authentication check
      console.log('Logging in with:', { email, password });
      // Example: Call your API
      /*
      fetch('https://your-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            navigation.navigate('MainTabs');
          } else {
            Alert.alert('Erreur', 'Email ou mot de passe incorrect');
          }
        })
        .catch(error => Alert.alert('Erreur', 'Une erreur est survenue'));
      */
      // For now, simulate successful login
      navigation.navigate('MainTabs');
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#9aa0a6"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9aa0a6"
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.primaryBtnText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CreationCompte')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0b1020',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#e8eaf6',
  },
  input: {
    borderWidth: 1,
    borderColor: '#24325e',
    backgroundColor: '#121936',
    color: '#e8eaf6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  link: {
    color: '#88a0ff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});