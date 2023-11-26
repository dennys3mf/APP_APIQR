import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AboutUs() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/starbucks_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Acerca de Starbucks</Text>
      <Text style={styles.description}>
        En Starbucks, no solo servimos café, servimos experiencias memorables. 
        Cada taza es una oportunidad para crear un espacio donde las personas se 
        conectan, se relajan y encuentran inspiración. 
      </Text>
      <Text style={styles.mission}>
        Nuestra Misión: Inspirar y nutrir el espíritu humano; 
        un individuo, una taza y una comunidad a la vez.
      </Text>
      <Text style={styles.values}>
        Nuestros Valores: Pasión por el café, compromiso con la excelencia, 
        respeto por las personas y el entorno, y contribución a nuestras comunidades 
        y nuestro medio ambiente.
      </Text>
      <Text style={styles.additionalText}>
        Desde nuestros comienzos en 1971, hemos perseguido la excelencia en cada 
        taza de café que servimos. Nuestros granos son seleccionados con cuidado 
        de las mejores regiones cafetaleras del mundo, y nuestro equipo está dedicado 
        a brindarte la mejor experiencia posible.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  mission: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  values: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
