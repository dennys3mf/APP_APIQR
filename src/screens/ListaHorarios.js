import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const [beverages, setBeverages] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#00704A" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Pedido', { selectedProducts })}
          style={{ marginRight: 15 }}
        >
          <Ionicons
            name="cart"
            size={24}
            color="#00704A"
          />
          {selectedProducts.length > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCount}>{selectedProducts.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });

    // Obtener las bebidas desde la API
    fetch('http://localhost:5000/api/bebidas')
      .then(response => response.json())
      .then(data => setBeverages(data))
      .catch(error => console.error('Error al obtener las bebidas:', error));
  }, [navigation, selectedProducts]);

  const handleToggleProduct = (product) => {
    const productIndex = selectedProducts.findIndex(item => item.name === product.name);

    if (productIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(productIndex, 1);
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }
  
  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      {beverages.map((drink, index) => (
        <TouchableOpacity key={index}>
          <View style={styles.container}>
            <Image source={{ uri: `http://localhost:5000${drink.image}` }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{drink.name}</Text>
              <Text style={styles.category}>{drink.category}</Text>
              <Text style={styles.description}>{drink.description}</Text>
              <Text style={styles.price}>{drink.price}</Text>
              <TouchableOpacity
                onPress={() => handleToggleProduct(drink)}
                style={[styles.addToCartButton, selectedProducts.some(item => item.name === drink.name) && styles.selectedProduct]}
              >
                <Text style={styles.addToCartText}>Añadir al carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    color: '#555',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cartCountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#00704A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedProduct: {
    backgroundColor: '#a8b7ba',
  },
});
