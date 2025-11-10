import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Mock cart data (replace with state management)
const cartItems = [
  { id: '1', type: 'car', name: 'Toyota Corolla', price: 20000 },
  { id: '2', type: 'part', name: 'Pneu Michelin', price: 100 },
];

export default function Cart() {
  const total = cartItems.reduce((sum, it) => sum + (it.price || 0), 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type === 'car' ? 'Véhicule' : 'Pièce'}</Text>
      </View>
      <Text style={styles.itemPrice}>{`${item.price.toLocaleString('fr-FR')} €`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{`${total.toLocaleString('fr-FR')} €`}</Text>
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => console.log('Checkout')}>
          <Text style={styles.primaryBtnText}>Passer la commande</Text>
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
  list: {
    padding: 12,
  },
  item: {
    backgroundColor: '#111834',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1b2750',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'column',
    maxWidth: '70%',
  },
  itemTitle: {
    color: '#e8eaf6',
    fontSize: 16,
    fontWeight: '700',
  },
  itemType: {
    color: '#a5adcb',
    fontSize: 12,
    marginTop: 4,
  },
  itemPrice: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1b2750',
    backgroundColor: '#0b1020',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    color: '#c6ceef',
    fontSize: 16,
  },
  totalValue: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
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