import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function Settings({ handleSignOut, navigation, toggleModal }) {
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <View style={styles.option}>
        <Text style={styles.optionText}>Recibir Notificaciones</Text>
        <Switch
          value={receiveNotifications}
          onValueChange={(value) => setReceiveNotifications(value)}
        />
      </View>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Cambiar idioma')}>
        <Text style={styles.optionText}>Idioma</Text>
        <Text style={styles.optionValue}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Cambiar tema')}>
        <Text style={styles.optionText}>Tema Oscuro</Text>
        <Switch value={false} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Notificaciones por SMS')}>
        <Text style={styles.optionText}>Notificaciones por SMS</Text>
        <Switch value={true} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => console.log('Cambiar contraseña')}>
        <Text style={styles.optionText}>Cambiar Contraseña</Text>
        <Text style={styles.optionValue}>********</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cerrar Sesión</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => {
                toggleModal();
                handleSignOut();
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionValue: {
    fontSize: 16,
    color: '#555',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 10, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#00704A',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
