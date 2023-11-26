import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const storeLocations = [
  {
    name: 'Starbucks Real Plaza',
    address: 'Av. Ejercito  1009, Arequipa',
    distance: '1.2 km',
    image: require('../assets/store1.jpg')
  },
  {
    name: 'Starbucks Mall Plaza',
    address: 'Av. Ejercito 795, Arequipa',
    distance: '2.5 km',
    image: require('../assets/store2.jpg')
  },
  {
    name: 'Starbucks Mall Aventura Plaza',
    address: 'Av. Porongoche 500, Arequipa',
    distance: '2.1 km',
    image: require('../assets/store3.jpg')
  },
  {
    name: 'Starbucks Mercaderes',
    address: 'Calle Mercaderes 120, Arequipa',
    distance: '2.1 km',
    image: require('../assets/store4.jpg')
  },
];

export default function NearbyStores() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cafeterías Cercanas</Text>
        <Text style={styles.description}>Encuentra las tiendas de Starbucks cercanas a tu ubicación.</Text>
        {storeLocations.map((store, index) => (
          <View key={index} style={styles.storeContainer}>
            <Image source={store.image} style={styles.storeImage} />
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeAddress}>{store.address}</Text>
              <Text style={styles.storeDistance}>{store.distance}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      paddingHorizontal: 16,
      paddingTop: 32,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    description: {
      fontSize: 16,
      marginBottom: 16,
      color: '#555',
    },
    storeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    storeImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 16,
    },
    storeInfo: {
      flex: 1,
    },
    storeName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#333',
    },
    storeAddress: {
      fontSize: 14,
      marginBottom: 4,
      color: '#555',
    },
    storeDistance: {
      fontSize: 14,
      color: '#555',
    }
  });
