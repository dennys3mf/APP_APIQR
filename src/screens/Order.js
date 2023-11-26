import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Order({ route }) {
  const { selectedProducts } = route.params || [];
  const navigation = useNavigation();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrinkMenu', { selectedProducts })}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="#00704A" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrinkMenu', { selectedProducts })}
          style={styles.headerButton}
        >
          <Ionicons name="cart" size={24} color="#00704A" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedProducts]);

  const getTotalPrice = () => {
    if (!Array.isArray(selectedProducts)) {
      return 0;
    }

    return selectedProducts.reduce((total, product) => {
      return total + parseFloat(product.price.replace('S/', '').trim());
    }, 0).toFixed(2);
  }

  const handlePlaceOrder = async () => {
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        products: selectedProducts,
        total: getTotalPrice(),
        status: 'pending'
      });
      setOrderId(orderRef.id);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Realizar Pedido</Text>
      </View>
      <Text style={styles.description}>Selecciona tus productos y procede al pago.</Text>
      <FlatList
        data={selectedProducts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>S/ {getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Hacer Pedido</Text>
      </TouchableOpacity>
      {orderId && (
  <View style={styles.orderConfirmation}>
    <Text style={styles.orderConfirmationTitle}>
      ¡Pedido Registrado!
    </Text>
    <Text style={styles.orderConfirmationText}>
      Tu pedido ha sido registrado exitosamente.
    </Text>
    <Text style={styles.orderIdText}>
      ID del Pedido: {orderId}
    </Text>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderButton: {
    backgroundColor: '#C4251A',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderConfirmation: {
    marginTop: 16,
    backgroundColor: '#E5F9E0',
    padding: 12,
    borderRadius: 10,
  },
  orderConfirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00704A',
    marginBottom: 8,
    textAlign: 'center',
  },
  orderConfirmationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  }
  
});
