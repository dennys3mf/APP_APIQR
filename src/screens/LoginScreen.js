import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ImageBackground 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email) {
        setEmailError('El campo de correo electrónico no puede estar vacío.');
        return;
      } else {
        setEmailError('');
      }

      if (!password) {
        setPasswordError('El campo de contraseña no puede estar vacío.');
        return;
      } else {
        setPasswordError('');
      }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setEmailError('El formato del correo electrónico es incorrecto.');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('No hay ninguna cuenta registrada con este correo electrónico.');
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError('La contraseña es incorrecta.');
      } else {
        console.error(error);
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/fondo2.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerText}>¡Bienvenido!</Text>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
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
  registerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
});

export default LoginScreen;
