import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CarDetails({ route }) {
  const { car } = route.params;
  const navigation = useNavigation();

  // Function to handle adding to cart (implement with state management, e.g., Redux or Context)
  const addToCart = () => {
    console.log(`Added ${car.brand} ${car.model} to cart`);
    // Add logic to update cart (e.g., via global state)
  };

  const openSeller = () => {
    const seller = {
      name: car.source || `Concession ${car.brand}`,
      brand: car.brand,
      address: '12 Avenue des Champs-Élysées, 75008 Paris',
      phone: '+33 1 23 45 67 89',
      email: `${car.brand?.toLowerCase() || 'contact'}@dealer.com`,
      locationUrl: 'https://maps.google.com/?q=Champs+Elysees+Paris',
      imageUrl: 'https://images.unsplash.com/photo-1549921296-3ecf4a1531ea?q=80&w=1600&auto=format&fit=crop',
      hours: 'Lun-Sam: 9h-18h',
    };
    navigation.navigate('SellerDetails', { seller });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: car.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{`${car.price.toLocaleString('fr-FR')} €`}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{`${car.brand} ${car.model}`}</Text>
        <Text style={styles.subtitle}>{`Année ${car.year} • ${car.source}`}</Text>

        <View style={styles.specs}>
          <View style={styles.specChip}><Text style={styles.specText}>Essence</Text></View>
          <View style={styles.specChip}><Text style={styles.specText}>Manuelle</Text></View>
          <View style={styles.specChip}><Text style={styles.specText}>5 portes</Text></View>
        </View>

        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#121936', borderWidth: 1, borderColor: '#24325e', marginTop: 10 }]} onPress={() => navigation.navigate('CarViewer', { car })}>
          <Text style={{ color: '#c6ceef', fontWeight: '700', fontSize: 16 }}>Voir en 360°</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={addToCart}>
          <Text style={styles.primaryBtnText}>Ajouter au panier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={openSeller}>
          <Text style={styles.secondaryBtnText}>Vendeur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  imageWrap: {
    width: '100%',
    height: 240,
    backgroundColor: '#0f162e',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#4c6fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#88a0ff',
  },
  priceText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e8eaf6',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#a5adcb',
    marginBottom: 16,
  },
  specs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  specChip: {
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 8 : 6,
  },
  specText: {
    color: '#c6ceef',
    fontSize: 13,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryBtnText: {
    color: '#c6ceef',
    fontWeight: '700',
    fontSize: 16,
  },
});