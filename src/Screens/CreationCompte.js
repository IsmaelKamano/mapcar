import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreationCompte() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Replace with your signup logic (e.g., Firebase, API call)
    console.log('Creating account with:', { name, email, password });
    // Example: Call your API
    /*
    fetch('https://your-api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Alert.alert('Succès', 'Compte créé ! Veuillez vous connecter.');
          navigation.navigate('Connexion');
        } else {
          Alert.alert('Erreur', 'Impossible de créer le compte');
        }
      })
      .catch(error => Alert.alert('Erreur', 'Une erreur est survenue'));
    */
    // For now, simulate successful signup
    Alert.alert('Succès', 'Compte créé ! Veuillez vous connecter.');
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#9aa0a6"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#9aa0a6"
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup}>
        <Text style={styles.primaryBtnText}>Créer un compte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
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