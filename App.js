import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';

import Home from './src/screens/Home';
import DrinkMenu from './src/screens/Menu';
import Order from './src/screens/Order';
import NearbyStores from './src/screens/NearbyStores';
import Settings from './src/screens/Settings';
import AcercaDe from './src/screens/AcercaDe';
import Login from './src/screens/LoginScreen';
import Register from './src/screens/RegisterScreen';
import firebaseConfig from './firebase';

initializeApp(firebaseConfig);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setModalVisible(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  const confirmSignOut = () => {
    return new Promise((resolve) => {
      setModalVisible(true);
      resolve(false);
    });
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Inicio') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'DrinkMenu') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'Pedido') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Tiendas') {
                iconName = focused ? 'location' : 'location-outline';
              } else if (route.name === 'Configuraciones') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'AcercaDe') {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              } else if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} style={[styles.tabIcon, { color: focused ? '#00704A' : 'gray' }]} />;
            },
            tabBarLabel: ({ focused }) => {
              let label;
              if (route.name === 'Inicio') {
                label = 'Inicio';
              } else if (route.name === 'DrinkMenu') {
                label = 'Menú';
              } else if (route.name === 'Pedido') {
                label = 'Pedido';
              } else if (route.name === 'Tiendas') {
                label = 'Tiendas';
              } else if (route.name === 'Configuraciones') {
                label = 'Configuraciones';
              } else if (route.name === 'AcercaDe') {
                label = 'Acerca De';
              } else if (route.name === 'Login') {
                label = 'Iniciar Sesión';
              }
              return (
                <Text style={[styles.tabLabel, { color: focused ? '#00704A' : 'gray', marginBottom: 5, marginHorizontal: 18 }]}>
                  {label}
                </Text>
              );
            },
          })}
          tabBarActiveTintColor="#00704A"
          tabBarInactiveTintColor="gray"
          tabBarStyle={[
            {
              display: 'flex',
            },
            null,
          ]}
        >
          <Tab.Screen name="Inicio" component={Home} options={{ tabBarBadge: 3, headerShown: false }} />
          <Tab.Screen name="DrinkMenu" component={DrinkMenu} />
          <Tab.Screen name="Pedido" component={Order} />
          <Tab.Screen name="Tiendas" component={NearbyStores} />
          <Tab.Screen
            name="Configuraciones"
            options={{
              headerRight: () => (
                <Ionicons
                  name="log-out-outline"
                  size={30}
                  color="#00704A"
                  style={{ marginRight: 15 }}
                  onPress={handleSignOut} // Cambia esta línea
                />
              ),
            }}
          >
            {props => <Settings {...props} handleSignOut={handleSignOut} navigation={props.navigation} toggleModal={() => setModalVisible(!isModalVisible)} />}
          </Tab.Screen>
          <Tab.Screen name="AcercaDe" component={AcercaDe} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}

      {/* Modal */}
      <Modal isVisible={isModalVisible} style={styles.modalContainer}>
        <Text style={styles.modalText}>¿Cerrar Sesión?</Text>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={async () => {
            setModalVisible(false);
            await handleSignOut();
          }}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  tabIcon: {
    marginBottom: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.1em',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#00704A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    margin: 10,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
