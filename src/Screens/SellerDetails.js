import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function SellerDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { seller } = route.params || {};

  const openLocation = () => {
    if (seller?.locationUrl) {
      Linking.openURL(seller.locationUrl);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Image
          source={{ uri: seller?.imageUrl || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1600&auto=format&fit=crop' }}
          style={styles.banner}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>{seller?.name || 'Vendeur'}</Text>
        <Text style={styles.subtitle}>{seller?.brand ? `Marque: ${seller.brand}` : ''}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informations</Text>
        <View style={styles.row}><Text style={styles.label}>Adresse</Text><Text style={styles.value}>{seller?.address || '—'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Téléphone</Text><Text style={styles.value}>{seller?.phone || '—'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{seller?.email || '—'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Horaires</Text><Text style={styles.value}>{seller?.hours || '—'}</Text></View>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={openLocation}>
        <Text style={styles.primaryBtnText}>Ouvrir la localisation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryBtnText}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  header: {
    position: 'relative',
    marginBottom: 12,
  },
  banner: {
    width: '100%',
    height: 180,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  title: {
    position: 'absolute',
    left: 12,
    bottom: 16,
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    position: 'absolute',
    left: 12,
    bottom: 4,
    color: '#e8eaf6',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#111834',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1b2750',
    padding: 14,
    marginHorizontal: 12,
    marginTop: 6,
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
  label: { color: '#a5adcb' },
  value: { color: '#e8eaf6', fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  primaryBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 14,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryBtn: {
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  secondaryBtnText: { color: '#c6ceef', fontWeight: '700', fontSize: 16 },
});
