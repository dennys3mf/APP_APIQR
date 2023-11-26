import React from 'react';
import { Image } from 'react-native';

export default function CoffeeImage() {
  return (
    <Image
      source={require('../assets/coffee-cup.png')}
      style={{ width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' }}
    />
  );
}
