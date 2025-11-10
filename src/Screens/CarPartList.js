import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, Image, TextInput, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data for car parts (replace with API call)
const carParts = [
  { id: '1', brand: 'Michelin', name: 'Pneu Michelin', category: 'Pneus', price: 100, compatibility: 'Toyota, Honda', imageUrl: 'https://images.unsplash.com/photo-1553530979-7ee52e9f25c6?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Tire/glTF-Binary/Tire.glb' },
  { id: '2', brand: 'Bosch', name: 'Batterie Bosch', category: 'Batteries', price: 150, compatibility: 'BMW, Audi', imageUrl: 'https://images.unsplash.com/photo-1617952403746-0f39a59b6c31?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb' },
  { id: '3', brand: 'Purflux', name: 'Filtre à huile', category: 'Filtres', price: 20, compatibility: 'Universel', imageUrl: 'https://images.unsplash.com/photo-1621939914629-6e19bc19b0d2?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb' },
  { id: '4', brand: 'Brembo', name: 'Plaquettes de frein', category: 'Freinage', price: 45, compatibility: 'Toyota Corolla, Honda Civic', imageUrl: 'https://images.unsplash.com/photo-1610375308539-5a8affb577a1?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF-Binary/Cube.glb' },
  { id: '5', brand: 'Brembo', name: 'Disque de frein', category: 'Freinage', price: 80, compatibility: 'BMW M3, Audi A4', imageUrl: 'https://images.unsplash.com/photo-1614154731320-4f78f6c1f49e?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb' },
  { id: '6', brand: 'NGK', name: 'Bougies d’allumage', category: 'Allumage', price: 25, compatibility: 'Renault Clio, Peugeot 208', imageUrl: 'https://images.unsplash.com/photo-1621939878141-6ff1a596a35a?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb' },
  { id: '7', brand: 'Mann-Filter', name: 'Filtre à air', category: 'Filtres', price: 18, compatibility: 'Nissan Qashqai, Kia Sportage', imageUrl: 'https://images.unsplash.com/photo-1617952345059-3f9dc6f42d8a?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF-Binary/BoxTextured.glb' },
  { id: '8', brand: 'Valeo', name: 'Alternateur', category: 'Électricité', price: 220, compatibility: 'Mercedes C-Class, VW Golf', imageUrl: 'https://images.unsplash.com/photo-1580742941462-6a0eef89441d?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ABeautifulGame/glTF-Binary/ABeautifulGame.glb' },
  { id: '9', brand: 'Monroe', name: 'Amortisseur', category: 'Suspension', price: 120, compatibility: 'Audi Q5, BMW X5', imageUrl: 'https://images.unsplash.com/photo-1617038260899-0d24f2f07b1a?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF-Binary/FlightHelmet.glb' },
  { id: '10', brand: 'Hella', name: 'Phare avant', category: 'Éclairage', price: 160, compatibility: 'Ford Focus, Renault Megane', imageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49af?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb' },
  { id: '11', brand: 'Bosch', name: 'Balais d’essuie-glace', category: 'Carrosserie', price: 15, compatibility: 'Universel', imageUrl: 'https://images.unsplash.com/photo-1525362081669-2b476bb628f4?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb' },
  { id: '12', brand: 'Sachs', name: 'Kit embrayage', category: 'Transmission', price: 350, compatibility: 'Peugeot 3008, VW Passat', imageUrl: 'https://images.unsplash.com/photo-1617952422625-38fc71e98f50?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Binary/VC.glb' },
  { id: '13', brand: 'Garrett', name: 'Turbocompresseur', category: 'Moteur', price: 780, compatibility: 'BMW i4, Mercedes GLC', imageUrl: 'https://images.unsplash.com/photo-1606663304948-3a20f2f9783c?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Binary/Corset.glb' },
  { id: '14', brand: 'Valeo', name: 'Radiateur', category: 'Refroidissement', price: 210, compatibility: 'Toyota Camry, Honda Accord', imageUrl: 'https://images.unsplash.com/photo-1597769909526-3cd9a0578d3e?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb' },
  { id: '15', brand: 'Dayco', name: 'Courroie de distribution', category: 'Moteur', price: 95, compatibility: 'Renault Clio, Peugeot 208', imageUrl: 'https://images.unsplash.com/photo-1620954630811-a8c40a7a7878?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/PrimaryIonDrive/glTF-Binary/PrimaryIonDrive.glb' },
  { id: '16', brand: 'Varta', name: 'Batterie Varta', category: 'Batteries', price: 170, compatibility: 'Universel', imageUrl: 'https://images.unsplash.com/photo-1617952403746-0f39a59b6c31?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb' },
  { id: '17', brand: 'OZ Racing', name: 'Jante aluminium 18"', category: 'Roues', price: 260, compatibility: 'Audi, BMW, Mercedes', imageUrl: 'https://images.unsplash.com/photo-1597007043420-bf22b1fefa90?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF-Binary/Cube.glb' },
  { id: '18', brand: 'Walker', name: 'Silencieux échappement', category: 'Échappement', price: 185, compatibility: 'VW Golf, Ford Focus', imageUrl: 'https://images.unsplash.com/photo-1494937414232-9e454645b1c5?q=80&w=1600&auto=format&fit=crop', modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb' },
  // Add more car parts as needed
];

export default function CarPartList() {
  const navigation = useNavigation();

  // State for car parts (for API integration)
  const [parts, setParts] = useState(carParts);
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [partName, setPartName] = useState('');
  const [carModel, setCarModel] = useState('');
  // Animation disabled for stability on Android
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { width } = Dimensions.get('window');
  const numColumns = Platform.OS === 'web' ? (width >= 1024 ? 3 : 2) : (width >= 768 ? 3 : 2);

  // Example: Fetch car parts from API (uncomment and adjust for your backend)
  /*
  useEffect(() => {
    fetch('https://your-api/car-parts')
      .then(response => response.json())
      .then(data => setParts(data))
      .catch(error => console.error('Error fetching car parts:', error));
  }, []);
  */

  const filteredParts = parts
    .filter((p) => `${p.name} ${p.category} ${p.compatibility}`.toLowerCase().includes(query.toLowerCase()))
    .filter((p) =>
      (!partName || p.name.toLowerCase().includes(partName.toLowerCase())) &&
      (!carModel || `${p.compatibility} ${p.name} ${p.category}`.toLowerCase().includes(carModel.toLowerCase()))
    );

  const brands = Array.from(
    parts.reduce((map, it) => {
      if (!map.has(it.brand)) {
        map.set(it.brand, { id: it.brand, brand: it.brand, imageUrl: it.imageUrl });
      }
      return map;
    }, new Map())
  ).map(([, v]) => v);

  const filteredBrands = brands.filter(b => b.brand.toLowerCase().includes(query.toLowerCase()))

  const partsOfBrand = selectedBrand
    ? filteredParts.filter(p => p.brand === selectedBrand)
    : [];

  // Animation effect removed

  const renderPart = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CarPartDetails', { part: item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{`${item.price} €`}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{`${item.category} • ${item.compatibility}`}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarPartDetails', { part: item })}
          style={{ alignSelf: 'flex-start', backgroundColor: '#4c6fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, marginTop: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Détails</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderBrand = ({ item }) => (
    <TouchableOpacity
      style={[styles.tile, styles.mb12, { width: (width - 24 - (numColumns - 1) * 12) / numColumns }]}
      onPress={() => setSelectedBrand(item.brand)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.tileImage} />
      <View style={styles.tileOverlay} />
      <Text style={styles.tileText}>{item.brand}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedBrand ? `Pièces • ${selectedBrand}` : 'Marques de pièces'}</Text>
      <TextInput
        placeholder={selectedBrand ? 'Rechercher une pièce' : 'Rechercher une marque de pièce'}
        value={query}
        onChangeText={setQuery}
        style={styles.search}
        placeholderTextColor="#9aa0a6"
      />
      {selectedBrand ? (
        <>
          <TouchableOpacity style={styles.backBtn} onPress={() => { setSelectedBrand(null); setQuery(''); }}>
            <Text style={styles.backBtnText}>← Retour aux marques</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
            <Text style={styles.filterBtnText}>Recherche avancée</Text>
          </TouchableOpacity>
          <FlatList
            data={partsOfBrand}
            renderItem={renderPart}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <FlatList
          data={filteredBrands}
          renderItem={renderBrand}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
          contentContainerStyle={[styles.list]}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal visible={showFilter} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Recherche de pièce</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nom de la pièce (ex: Pneu)"
              value={partName}
              onChangeText={setPartName}
              placeholderTextColor="#9aa0a6"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Modèle de voiture (ex: Corolla)"
              value={carModel}
              onChangeText={setCarModel}
              placeholderTextColor="#9aa0a6"
            />
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.primaryBtn, styles.actionBtn]} onPress={() => setShowFilter(false)}>
                <Text style={styles.primaryBtnText}>Rechercher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.secondaryBtn, styles.actionBtn, styles.ml8]}
                onPress={() => {
                  setPartName('');
                  setCarModel('');
                  setShowFilter(false);
                }}
              >
                <Text style={styles.secondaryBtnText}>Réinitialiser</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 6,
    color: '#e8eaf6',
  },
  list: {
    paddingBottom: 20,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  backBtnText: { color: '#c6ceef', fontWeight: '700' },
  search: {
    backgroundColor: '#121936',
    borderWidth: 1,
    borderColor: '#24325e',
    color: '#e8eaf6',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 12 : 10,
    borderRadius: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  filterBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#4c6fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  filterBtnText: { color: '#fff', fontWeight: '700' },
  tile: {
    aspectRatio: 1.3,
    backgroundColor: '#111834',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1b2750',
    overflow: 'hidden',
  },
  tileImage: { width: '100%', height: '100%' },
  tileOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  tileText: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  mb12: { marginBottom: 12 },
  card: {
    backgroundColor: '#111834',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1b2750',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'web' ? 0.18 : 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  imageWrap: {
    width: '100%',
    height: 160,
    backgroundColor: '#0f162e',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e8eaf6',
  },
  subtitle: {
    fontSize: 14,
    color: '#a5adcb',
  },
  price: {
    fontSize: 16,
    color: '#4c6fff',
    marginTop: 5,
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
  },
  secondaryBtnText: {
    color: '#c6ceef',
    fontWeight: '700',
    fontSize: 16,
  },
});