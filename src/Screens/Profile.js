import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://api.dicebear.com/7.x/initials/png?seed=U' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Utilisateur</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mes informations</Text>
        <View style={styles.row}><Text style={styles.label}>Téléphone</Text><Text style={styles.value}>—</Text></View>
        <View style={styles.row}><Text style={styles.label}>Adresse</Text><Text style={styles.value}>—</Text></View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    color: '#e8eaf6',
    fontSize: 20,
    fontWeight: '800',
  },
  email: {
    color: '#a5adcb',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#111834',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1b2750',
    padding: 14,
    marginTop: 8,
  },
  cardTitle: {
    color: '#c6ceef',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1b2750',
  },
  label: {
    color: '#a5adcb',
  },
  value: {
    color: '#e8eaf6',
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});