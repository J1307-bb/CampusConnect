import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AnimatedCalificacionCard } from "@/components/cards/CalificacionCard";
import { ICalificacion } from "@/interfaces/IInterfaces";
import Catalogs from "@/services/Catalogs";

const CalificacionesView = () => {

  const unidadOptions = [
    {
      key: "1", label: "Unidad 1"
    },
    {
      key: "2", label: "Unidad 2"
    },
    {
      key: "3", label: "Unidad 3"
    },
    {
      key: "4", label: "Unidad 4"
    }
  ];


  const [selectUnidad, setSelectUnidad] = useState("1");
  const [isUnidadModalVisible, setIsUnidadModalVisible] = useState(false);
  const [calificaciones, setCalificaciones] = useState<ICalificacion[]>([]);
  const [calificacionesFiltered, setCalificacionesFiltered] = useState<ICalificacion[]>([]);

  let hasNA = false;

  const toggleTurnoModal = () => {
    setIsUnidadModalVisible(!isUnidadModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calificacionesData: ICalificacion[] = await Catalogs.getCalificacionesRecibidas();
        setCalificaciones(calificacionesData);
        setCalificacionesFiltered(calificacionesData.filter((item) => item.unidad == selectUnidad));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const subjects = [
    { id: "1", title: "Aplicaciones Web", grades: 97, year: "S2020" },
    { id: "2", title: "Desarrollo Movil", grades: 87, year: "S2020" },
    {
      id: "3",
      title: "Gestion de Proyectos de Software",
      grades: 100,
      year: "S2020",
    },
    { id: "4", title: "Integradora", grades: 80, year: "S2020" },
    { id: "5", title: "Negociacion Empresarial", grades: 95, year: "S2020" },
    { id: "6", title: "Creación de Videojuegos", grades: 70, year: "S2020" },
    {
      id: "7",
      title: "Inglés XI",
      grades: 100,
      year: "S2020",
    },
    { id: "8", title: "Tutoria", grades: 79, year: "S2020" },
  ];

  const getAverage = () => {
    let total = 0;

    calificaciones.forEach(({ calificacion }) => {
      if (calificacion <= 80) hasNA = true;
      total += calificacion;
    })

    return total / calificaciones.length;
  };

  const getGrade = () => {
    if (hasNA) return "NA";
    if (getAverage() >= 80) return "DE";
    return "NA";
  }

  return (
    <>
      {/* Preliminary Data */}
      <View className=" flex-row items-center my-3">
        <View className="text-left mx-8 justify-between ">
          <Text className="text-lg font-bold">
            Promedio Preliminar: <Text className="text-gray-600">{ getAverage().toFixed(1) }</Text>
          </Text>
          <Text className="text-lg font-bold">
            Calificación Preliminar: <Text className="text-gray-600">{ getGrade() }</Text>
          </Text>
        </View>

        <View className="flex justify-between">
          <TouchableOpacity
            className="bg-white shadow-sm p-2 rounded-lg"
            onPress={toggleTurnoModal}
          >
            <Text>{unidadOptions.find((item) => item.key === selectUnidad)?.label } ▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isUnidadModalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableOpacity
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-40`}
          onPress={toggleTurnoModal}
        >
          <View className="bg-white rounded-lg w-5/6 p-4">
            <FlatList
              data={unidadOptions}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-200"
                  onPress={() => {
                    setSelectUnidad(item.key);
                    toggleTurnoModal();
                    setCalificacionesFiltered(calificaciones.filter((cal) => cal.unidad == item.key));
                  }}
                >
                  <Text className="text-lg text-gray-700">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Subjects List */}

      <FlatList
        data={calificacionesFiltered}
        keyExtractor={(subject) => subject.id}
        renderItem={({ item, index }) => (
          <AnimatedCalificacionCard materia={item} index={index} />
        )}
        className="m-4 mb-24"
      />
    </>
  );
};

export default CalificacionesView;
