import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Authentication screens (reused as-is)
import Connexion from './src/Screens/Connexion';
import CreationCompte from './src/Screens/CreationCompte';
import ForgotPassword from './src/Screens/ForgotPassword';

// New screens for cars and car parts
import CarList from './src/Screens/CarList'; // New: List of cars
import CarDetails from './src/components/CarDetails'; // New: Car details
import CarPartList from './src/Screens/CarPartList'; // New: List of car parts
import CarPartDetails from './src/components/CarPartDetails'; // New: Car part details
import Cart from './src/Screens/Cart'; // New: Shopping cart
import Profile from './src/Screens/Profile'; // New: User profile (replacing MenuLateral)
import CarViewer from './src/Screens/CarViewer'; // 360° viewer
import CarPartViewer from './src/Screens/CarPartViewer'; // 360° part viewer
import SellerDetails from './src/Screens/SellerDetails'; // Seller info
import Messaging from './src/Screens/Messaging'; // Messaging screen

// Stack navigators
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CarStack = createNativeStackNavigator();
const CarPartStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Stack for Cars (list + details)
function CarStackNavigator() {
  return (
    <CarStack.Navigator screenOptions={{ headerShown: true }}>
      <CarStack.Screen
        name="CarList"
        component={CarList}
        options={{ title: 'Voitures' }}
      />
      <CarStack.Screen
        name="CarDetails"
        component={CarDetails}
        options={({ navigation }) => ({
          title: 'Détails de la Voiture',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Messaging')} style={{ marginRight: 8, backgroundColor: '#4c6fff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Contacter</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <CarStack.Screen
        name="CarViewer"
        component={CarViewer}
        options={{ title: 'Vue 360°' }}
      />
      <CarStack.Screen
        name="SellerDetails"
        component={SellerDetails}
        options={{ title: 'Vendeur' }}
      />
      <CarStack.Screen
        name="Messaging"
        component={Messaging}
        options={{ title: 'Messagerie' }}
      />
    </CarStack.Navigator>
  );
}

// Stack for Car Parts (list + details)
function CarPartStackNavigator() {
  return (
    <CarPartStack.Navigator screenOptions={{ headerShown: true }}>
      <CarPartStack.Screen
        name="CarPartList"
        component={CarPartList}
        options={{ title: 'Pièces de Voiture' }}
      />
      <CarPartStack.Screen
        name="CarPartDetails"
        component={CarPartDetails}
        options={({ navigation }) => ({
          title: 'Détails de la Pièce',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Messaging')} style={{ marginRight: 8, backgroundColor: '#4c6fff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Contacter</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <CarPartStack.Screen
        name="CarPartViewer"
        component={CarPartViewer}
        options={{ title: 'Vue 360° Pièce' }}
      />
      <CarPartStack.Screen
        name="SellerDetails"
        component={SellerDetails}
        options={{ title: 'Vendeur' }}
      />
      <CarPartStack.Screen
        name="Messaging"
        component={Messaging}
        options={{ title: 'Messagerie' }}
      />
    </CarPartStack.Navigator>
  );
}

// Stack for Cart
function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: true }}>
      <CartStack.Screen
        name="Cart"
        component={Cart}
        options={{ title: 'Panier' }}
      />
    </CartStack.Navigator>
  );
}

// Stack for Profile (replacing MenuLateral)
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profil' }}
      />
    </ProfileStack.Navigator>
  );
}

// Main tabs (after login)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen
        name="Cars"
        component={CarStackNavigator}
        options={{
          tabBarLabel: 'Voitures',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CarParts"
        component={CarPartStackNavigator}
        options={{
          tabBarLabel: 'Pièces',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-cog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main app with authentication stack
export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Connexion">
        <MainStack.Screen
          name="Connexion"
          component={Connexion}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="CreationCompte"
          component={CreationCompte}
          options={{ title: 'Créer un compte' }}
        />
        <MainStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: 'Mot de passe oublié' }}
        />
        <MainStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
});