import React from 'react';
import { View, Text, Button, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
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

export default function CarPartDetails({ route }) {
  const { part } = route.params;
  const navigation = useNavigation();

  const handleAddToCart = () => {
    // Replace with your cart logic (e.g., Context, Redux)
    console.log(`Added ${part.name} to cart`);
    // Example: Add to cart using Context (assuming CartContext from previous response)
    /*
    import { useContext } from 'react';
    import { CartContext } from '../context/CartContext';
    const { addToCart } = useContext(CartContext);
    addToCart(part);
    */
    showAlert('Succès', `${part.name} ajouté au panier !`);
    // Optionally navigate to Cart
    // navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: part.imageUrl || 'https://images.unsplash.com/photo-1553530979-7ee52e9f25c6?q=80&w=1600&auto=format&fit=crop' }} style={styles.image} />
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{`${part.price?.toLocaleString('fr-FR') ?? part.price} €`}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{part.name}</Text>
        <Text style={styles.subtitle}>{`Catégorie: ${part.category}`}</Text>
        <Text style={styles.detail}>{`Compatibilité: ${part.compatibility}`}</Text>

        <View style={styles.specs}>
          <View style={styles.specChip}><Text style={styles.specText}>{part.category}</Text></View>
          <View style={styles.specChip}><Text style={styles.specText}>{part.compatibility}</Text></View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={handleAddToCart}>
          <Text style={styles.primaryBtnText}>Ajouter au panier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: '#121936', borderWidth: 1, borderColor: '#24325e', marginTop: 10 }]}
          onPress={() => navigation.navigate('CarPartViewer', { part })}
        >
          <Text style={{ color: '#c6ceef', fontWeight: '700', fontSize: 16 }}>Voir en 360°</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: '#121936', borderWidth: 1, borderColor: '#24325e', marginTop: 10 }]}
          onPress={() => {
            const seller = {
              name: `${part.brand || 'Vendeur'} - Revendeur`,
              brand: part.brand || 'Marque',
              address: '12 Rue des Garages, Paris',
              phone: '+33 1 23 45 67 89',
              email: 'contact@revendeur.com',
              hours: 'Lun-Sam 9:00-18:00',
              imageUrl: part.imageUrl,
              locationUrl: 'https://maps.google.com/?q=Paris',
            };
            navigation.navigate('SellerDetails', { seller });
          }}
        >
          <Text style={{ color: '#c6ceef', fontWeight: '700', fontSize: 16 }}>Vendeur</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Retour</Text>
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
    height: 220,
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
    fontSize: 16,
    color: '#a5adcb',
    marginBottom: 8,
  },
  detail: {
    fontSize: 15,
    color: '#c6ceef',
    marginBottom: 12,
  },
  specs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specChip: {
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 8 : 6,
    marginRight: 8,
    marginBottom: 8,
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
    marginTop: 8,
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
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryBtnText: {
    color: '#c6ceef',
    fontWeight: '600',
    fontSize: 15,
  },
});