import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Http from '../services/Http';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';

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
  const [searchText, setSearchText] = useState('');
  const [searchDelay, setSearchDelay] = useState<NodeJS.Timeout | null>(null);
  const [defaultMarkers, setDefaultMarkers] = useState<MarkerData[]>([]);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [aulas, setAulas] = useState<string[]>([]);
  const [aulasData, setAulasData] = useState([]);


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
      setDefaultMarkers(markersData);
    } catch (error) {
      console.error('Error al obtener edificios:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos desde la API.');
    }
  };

  const SearchBar = () => {
    if (searchDelay) {
      clearTimeout(searchDelay);
      setSearchDelay(null);
    }

    setSearchDelay(
      setTimeout(() => {
        fetchAulas('', searchText);
      }, 500)
    );
  };

  const fetchAulas = async (idEdificio: string, etiquetas?: string) => {
    try {
      const payload: { [key: string]: string } = {};

      if (etiquetas && etiquetas.length >= 3) {
        payload['etiquetas'] = etiquetas;
      } else if (idEdificio) {
        payload['idEdificio'] = idEdificio;
      } else {
        setMarkers(defaultMarkers);
        return;
      }

      const { status, data = [] } = await Http.get(`/aulas`, payload);
      if (status !== 200) throw new Error('Error al obtener aulas');

      if (etiquetas) {
        const filteredBuilds = new Set();

        data.forEach((aula: any) => {
          filteredBuilds.add(aula.idEdificio);
        });
        const availableMarkers = defaultMarkers.filter((marker) => filteredBuilds.has(marker.id));
        setMarkers(availableMarkers);
      }

      const aulasList = data.map((aula: Aula) => aula.aula);

      setAulasData(data);
      setAulas(aulasList);
    } catch (error) {
      console.error('Error al obtener aulas:', error);
      Alert.alert('Error', 'No se pudieron cargar las aulas del edificio.');
    }
  };

  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    fetchAulas(marker.id.toString());
  };

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Es necesario aceptar los permisos de ubicación');
    }
  };

  useEffect(() => {
    fetchMarkers();
    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#888" 
          onChange={SearchBar}
        />
      </View>
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
          <View style={styles.card}>
            <View className="bg-gray-300" style={styles.header}>
              <Text style={styles.headerText}>{selectedMarker.title}</Text> 
            </View>
            <View style={styles.body}>
              <Text style={styles.price}>Aulas:</Text>
              {aulas.length > 0 ? (
                aulas.map((aula, index) => (
                  <Text key={index} style={styles.tag}>
                    {aula}
                  </Text>
                ))
              ) : (
                <Text style={styles.tag}>No hay aulas asociadas</Text>
              )}
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}></Text>
              <Text style={styles.footerText}></Text>
              <Text style={styles.footerText}></Text>
            </View>
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
    paddingLeft: 10,
  },


  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingHorizontal: 15,
    paddingVertical: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333', 
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  header: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    padding: 10,
    marginBottom: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    display: 'none',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default UniversityMap;
