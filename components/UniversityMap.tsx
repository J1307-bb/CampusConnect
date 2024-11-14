import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const UniversityMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  // Datos de ejemplo: edificios con nombre y coordenadas
  const buildings = [
    {
      id: 1,
      name: 'Edificio de Ciencias',
      description: 'Laboratorios de física, química y biología.',
      latitude: 1000,
      longitude: 1000
    },
    {
      id: 2,
      name: 'Edificio de Humanidades',
      description: 'Biblioteca central y salones de historia y literatura.',
      latitude: 100,
      longitude: 100,
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        
        initialRegion={{
          latitude: 21.0495167,
          longitude: -86.8469238,
          latitudeDelta: 0.003,
          longitudeDelta: 0.004,
        }}
      >
        {buildings.map((building) => (
          <Marker
            key={building.id}
            coordinate={{ latitude: building.latitude, longitude: building.longitude }}
            title={building.name}
            onPress={() => setSelectedBuilding(building)}
          />
        ))}
      </MapView>

      {/* Modal para mostrar información sobre el edificio seleccionado */}
      {selectedBuilding && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedBuilding}
          onRequestClose={() => setSelectedBuilding(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{selectedBuilding.name}</Text>
              <Text>{selectedBuilding.description}</Text>
              <Button title="Cerrar" onPress={() => setSelectedBuilding(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UniversityMap;
