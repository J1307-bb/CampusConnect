import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { AnimatedCalificacionCard } from "@/components/cards/CalificacionCard";

const CalificacionesView = () => {

  const unidadOptions = ["Unidad 1", "Unidad 2", "Unidad 3", "Unidad 4"];


  const [selectUnidad, setSelectUnidad] = useState("Unidad 1");
  const [isUnidadModalVisible, setIsUnidadModalVisible] = useState(false);

  const toggleTurnoModal = () => {
    setIsUnidadModalVisible(!isUnidadModalVisible);
  };


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

  return (
    <>
      {/* Preliminary Data */}
      <View className=" flex-row items-center my-3">
        <View className="text-left mx-8 justify-between ">
          <Text className="text-lg font-bold">
            Promedio Preliminar: <Text className="text-gray-600">97.5</Text>
          </Text>
          <Text className="text-lg font-bold">
            Calificación Preliminar: <Text className="text-gray-600">DE</Text>
          </Text>
        </View>

        <View className="flex mx-8 justify-between">
          <TouchableOpacity
            className="bg-white shadow-sm p-2 rounded-lg"
            onPress={toggleTurnoModal}
          >
            <Text>{selectUnidad} ▼</Text>
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
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-200"
                  onPress={() => {
                    setSelectUnidad(item), toggleTurnoModal();
                  }}
                >
                  <Text className="text-lg text-gray-700">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Subjects List */}

      <FlatList
        data={subjects}
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
