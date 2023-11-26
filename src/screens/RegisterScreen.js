import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registeredMessage, setRegisteredMessage] = useState('');
  const navigation = useNavigation();
  

  const handleRegister = async () => {
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setPasswordError(''); // Resetea el mensaje de error si el registro fue exitoso
      navigation.navigate(Login); // <-- Aquí estaba el problema
      setRegisteredMessage('¡Ya estás registrado, inicia sesión aquí!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setPasswordError('El correo electrónico proporcionado ya está en uso. Si ya tienes una cuenta, inicia sesión.');
      } else {
        console.error(error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/fondo2.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerText}>¡Regístrate!</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registeredText}>¡Ya estás registrado, inicia sesión aquí!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 32,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    backgroundColor: '#00704A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  registeredText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
});

export default RegisterScreen;
