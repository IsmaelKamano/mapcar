import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Web-compatible alert (for react-native-web)
const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
  } else {
    import('react-native').then(({ Alert }) => {
      Alert.alert(title, message);
    });
  }
};

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Basic validation
    if (!email) {
      showAlert('Erreur', 'Veuillez entrer votre email');
      return;
    }

    // Replace with your password reset logic (e.g., Firebase, API call)
    console.log('Sending password reset email to:', email);
    // Example: Firebase Auth
    /*
    import auth from '@react-native-firebase/auth';
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        showAlert('Succès', 'Un email de réinitialisation a été envoyé.');
        navigation.navigate('Connexion');
      })
      .catch(error => showAlert('Erreur', error.message));
    */
    // Example: Custom API
    /*
    fetch('https://your-api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showAlert('Succès', 'Un email de réinitialisation a été envoyé.');
          navigation.navigate('Connexion');
        } else {
          showAlert('Erreur', 'Impossible d\'envoyer l\'email.');
        }
      })
      .catch(error => showAlert('Erreur', 'Une erreur est survenue'));
    */
    // For now, simulate successful reset
    showAlert('Succès', 'Un email de réinitialisation a été envoyé.');
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.subtitle}>
        Entrez votre email pour recevoir un lien de réinitialisation.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#9aa0a6"
      />
      <TouchableOpacity style={styles.primaryBtn} onPress={handleResetPassword}>
        <Text style={styles.primaryBtnText}>Envoyer le lien</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.link}>Retour à la connexion</Text>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#e8eaf6',
  },
  subtitle: {
    fontSize: 16,
    color: '#a5adcb',
    marginBottom: 20,
    textAlign: 'center',
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