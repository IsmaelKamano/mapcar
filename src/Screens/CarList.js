import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Platform, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Mock data with image URLs and source (replace with API call)
const cars = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    price: 20000,
    year: 2020,
    source: 'Toyota France',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1600&auto=format&fit=crop', // Replace with actual image URL
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Civic',
    price: 22000,
    year: 2021,
    source: 'Honda Europe',
    imageUrl: 'https://images.unsplash.com/photo-1549921296-3ecf4a1531ea?q=80&w=1600&auto=format&fit=crop', // Replace with actual image URL
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'M3',
    price: 75000,
    year: 2022,
    source: 'BMW France',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF-Binary/Suzanne.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bma-1.jpg',
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'A4',
    price: 42000,
    year: 2021,
    source: 'Audi France',
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bryce_canyon.jpg',
  },
  {
    id: '5',
    brand: 'Mercedes',
    model: 'C-Class',
    price: 48000,
    year: 2023,
    source: 'Mercedes-Benz',
    imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/warehouse.jpg',
  },
  {
    id: '6',
    brand: 'Ford',
    model: 'Mustang',
    price: 55000,
    year: 2020,
    source: 'Ford Europe',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/room.jpg',
  },
  {
    id: '7',
    brand: 'Volkswagen',
    model: 'Golf',
    price: 28000,
    year: 2021,
    source: 'VW Europe',
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF-Binary/FlightHelmet.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '8',
    brand: 'Renault',
    model: 'Clio',
    price: 19000,
    year: 2022,
    source: 'Renault',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
  },
  {
    id: '9',
    brand: 'Peugeot',
    model: '208',
    price: 21000,
    year: 2023,
    source: 'Peugeot',
    imageUrl: 'https://images.unsplash.com/photo-1598986646512-9330bcc4c2aa?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bryce_canyon.jpg',
  },
  {
    id: '10',
    brand: 'Nissan',
    model: 'Qashqai',
    price: 30000,
    year: 2021,
    source: 'Nissan',
    imageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49af?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/warehouse.jpg',
  },
  {
    id: '11',
    brand: 'Hyundai',
    model: 'i30',
    price: 24000,
    year: 2022,
    source: 'Hyundai',
    imageUrl: 'https://images.unsplash.com/photo-1533478683023-7f228a2a9d6b?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Camera/glTF-Binary/Camera.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/room.jpg',
  },
  {
    id: '12',
    brand: 'Kia',
    model: 'Sportage',
    price: 32000,
    year: 2023,
    source: 'Kia',
    imageUrl: 'https://images.unsplash.com/photo-1518065898635-98555e1168f7?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Binary/VC.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '13',
    brand: 'Tesla',
    model: 'Model 3',
    price: 45000,
    year: 2023,
    source: 'Tesla',
    imageUrl: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bma-1.jpg',
  },
  {
    id: '14',
    brand: 'Toyota',
    model: 'Camry',
    price: 27000,
    year: 2021,
    source: 'Toyota Europe',
    imageUrl: 'https://images.unsplash.com/photo-1606663304948-3a20f2f9783c?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '15',
    brand: 'Toyota',
    model: 'RAV4',
    price: 33000,
    year: 2022,
    source: 'Toyota Europe',
    imageUrl: 'https://images.unsplash.com/photo-1616788494745-3d6b6cefd876?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Binary/Corset.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/room.jpg',
  },
  {
    id: '16',
    brand: 'Honda',
    model: 'Accord',
    price: 26000,
    year: 2021,
    source: 'Honda Europe',
    imageUrl: 'https://images.unsplash.com/photo-1601924578578-9ff0b6e7f23a?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/warehouse.jpg',
  },
  {
    id: '17',
    brand: 'Honda',
    model: 'CR-V',
    price: 34000,
    year: 2023,
    source: 'Honda Europe',
    imageUrl: 'https://images.unsplash.com/photo-1549921296-3ecf4a1531ea?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Helmet/glTF-Binary/Helmet.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bryce_canyon.jpg',
  },
  {
    id: '18',
    brand: 'BMW',
    model: 'X5',
    price: 82000,
    year: 2022,
    source: 'BMW France',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ABeautifulGame/glTF-Binary/ABeautifulGame.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bma-1.jpg',
  },
  {
    id: '19',
    brand: 'BMW',
    model: 'i4',
    price: 60000,
    year: 2023,
    source: 'BMW France',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF-Binary/SciFiHelmet.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/room.jpg',
  },
  {
    id: '20',
    brand: 'Audi',
    model: 'A6',
    price: 52000,
    year: 2022,
    source: 'Audi France',
    imageUrl: 'https://images.unsplash.com/photo-1550355291-0fa4861f4fe5?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/PrimaryIonDrive/glTF-Binary/PrimaryIonDrive.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '21',
    brand: 'Audi',
    model: 'Q5',
    price: 57000,
    year: 2023,
    source: 'Audi France',
    imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a0?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF-Binary/Cube.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
  },
  {
    id: '22',
    brand: 'Mercedes',
    model: 'E-Class',
    price: 62000,
    year: 2022,
    source: 'Mercedes-Benz',
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Binary/Corset.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/warehouse.jpg',
  },
  {
    id: '23',
    brand: 'Mercedes',
    model: 'GLC',
    price: 65000,
    year: 2023,
    source: 'Mercedes-Benz',
    imageUrl: 'https://images.unsplash.com/photo-1541343672885-9be56236302d?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/bryce_canyon.jpg',
  },
  {
    id: '24',
    brand: 'Volkswagen',
    model: 'Passat',
    price: 31000,
    year: 2021,
    source: 'VW Europe',
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/alma.jpg',
  },
  {
    id: '25',
    brand: 'Peugeot',
    model: '3008',
    price: 35000,
    year: 2022,
    source: 'Peugeot',
    imageUrl: 'https://images.unsplash.com/photo-1549922986-2653f5b53579?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/room.jpg',
  },
  {
    id: '26',
    brand: 'Renault',
    model: 'Megane',
    price: 23000,
    year: 2021,
    source: 'Renault',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
  },
  {
    id: '27',
    brand: 'Ford',
    model: 'Focus',
    price: 22000,
    year: 2021,
    source: 'Ford Europe',
    imageUrl: 'https://images.unsplash.com/photo-1453491945771-a1e904948959?q=80&w=1600&auto=format&fit=crop',
    modelUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb',
    interiorPanoramaUrl: 'https://pannellum.org/images/warehouse.jpg',
  },
  // Add more cars as needed
];

export default function CarList() {
  const navigation = useNavigation();
  const [carsData, setCarsData] = useState(cars);
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { width } = Dimensions.get('window');
  const numColumns = Platform.OS === 'web' ? (width >= 1024 ? 3 : 2) : (width >= 768 ? 3 : 2);

  // Fetch cars from API (uncomment and adjust for your backend)
  /*
  useEffect(() => {
    fetch('https://your-api/cars', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setCarsData(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);
  */

  const brands = Array.from(
    carsData.reduce((map, c) => {
      if (!map.has(c.brand)) {
        map.set(c.brand, { id: c.brand, brand: c.brand, imageUrl: c.imageUrl });
      }
      return map;
    }, new Map())
  ).map(([, v]) => v);

  const filteredBrands = brands.filter(b => b.brand.toLowerCase().includes(query.toLowerCase()));

  const modelsOfBrand = selectedBrand
    ? carsData.filter(c => c.brand === selectedBrand && `${c.model}`.toLowerCase().includes(query.toLowerCase()))
    : [];

  const renderBrand = ({ item }) => (
    <TouchableOpacity style={[styles.tile, { flex: 1 / numColumns }]} onPress={() => setSelectedBrand(item.brand)} activeOpacity={0.9}>
      <Image source={{ uri: item.imageUrl }} style={styles.tileImage} />
      <View style={styles.tileOverlay} />
      <Text style={styles.tileText}>{item.brand}</Text>
    </TouchableOpacity>
  );

  const renderModel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{`${item.price.toLocaleString('fr-FR')} €`}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.model}</Text>
        <Text style={styles.subtitle}>{`${item.brand} • ${item.year} • ${item.source}`}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('CarDetails', { car: item })}>
            <Text style={styles.primaryBtnText}>Voir détails</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedBrand ? `Modèles • ${selectedBrand}` : 'Marques de voitures'}</Text>
      <TextInput
        placeholder={selectedBrand ? 'Rechercher un modèle' : 'Rechercher une marque'}
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
          <FlatList
            data={modelsOfBrand}
            renderItem={renderModel}
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
          columnWrapperStyle={numColumns > 1 ? { gap: 12 } : undefined}
          contentContainerStyle={[styles.list, { gap: 12 }]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020', // Dark, modern background
    padding: 12,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e8eaf6',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 6,
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
    height: 180,
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
  cardContent: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e8eaf6',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#a5adcb',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});