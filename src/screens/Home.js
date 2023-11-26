import React from 'react';
import { View, Text, ImageBackground, Image} from 'react-native';
import CustomButton from '../components/CustomButton';
import CoffeeImage from '../components/CoffeeImage';
import { useNavigation } from '@react-navigation/native'; 
import DrinkMenu from './Menu';

export default function Home() {
  const navigation = useNavigation(); // Obtener el objeto de navegación

  const handlePedidoPress = () => {
    navigation.navigate('DrinkMenu'); // Navegar a la pantalla Menu
  }

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>¡Bienvenido a Starbucks!</Text>
        <Text style={styles.subtitle}>Explora nuestras deliciosas bebidas</Text>
        <CustomButton text="¡Haz tu pedido!" onPress={handlePedidoPress} />
      </View>
    </ImageBackground>
  );
}

const styles = {
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
    textAlign: 'center',
  },
};

