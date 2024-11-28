import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Http from '../services/Http';

interface MarkerData {
  id: number;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

interface Aula {
  aula: string;
}

const UniversityMap: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [aulas, setAulas] = useState<string[]>([]);

  const fixedRegion = {
    latitude: 21.050216137617067,
    longitude: -86.84662860283886,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

  const fetchMarkers = async () => {
    try {
      const response = await Http.get('/edificios', {});
      if (response.status !== 200) throw new Error('Error al obtener edificios');

      const markersData = response.data.map((edificio: any) => {
        const [latitude, longitude] = edificio.coordenadas
          .split(',')
          .map((coord: string) => parseFloat(coord.trim()));

        return {
          id: edificio.id,
          title: edificio.nombre,
          coordinate: {
            latitude,
            longitude,
          },
        };
      });

      setMarkers(markersData);
    } catch (error) {
      console.error('Error al obtener edificios:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos desde la API.');
    }
  };

  const fetchAulas = async (idEdificio: number) => {
    try {
      const response = await Http.get(`/aulas?idEdificio=${idEdificio}`, {});
      if (response.status !== 200) throw new Error('Error al obtener aulas');

      const aulasList = response.data.map((aula: Aula) => aula.aula);
      setAulas(aulasList);
    } catch (error) {
      console.error('Error al obtener aulas:', error);
      Alert.alert('Error', 'No se pudieron cargar las aulas del edificio.');
    }
  };

  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    fetchAulas(marker.id);
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={fixedRegion}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <View style={styles.infoBox}>
          <Text style={styles.title}>{selectedMarker.title}</Text>
          <Text style={styles.subtitle}>Aulas:</Text>
          {aulas.length > 0 ? (
            aulas.map((aula, index) => (
              <Text key={index} style={styles.tag}>
                {aula}
              </Text>
            ))
          ) : (
            <Text>No hay aulas asociadas</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  infoBox: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tag: {
    fontSize: 14,
    color: '#555',
  },
});

export default UniversityMap;
