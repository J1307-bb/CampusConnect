import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ClasesTab() {

    const [searchText, setSearchText] = useState('');

  // Datos de clases
  const classes = [
    { id: '1', name: 'Digital Thinking', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '2', name: 'Programacion Orientada a Objetos', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '3', name: 'Algebra Lineal', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '4', name: 'Tutoria', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '5', name: 'Digital Thinking', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '6', name: 'Programacion Orientada a Objetos', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '7', name: 'Algebra Lineal', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
    { id: '8', name: 'Tutoria', time: '09:00 - 11:00', location: 'Main auditorium', professor: 'Mam Mahnoor' },
  ];

  // Filtro de clases por búsqueda
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <View className="bg-white w-full mb-4 p-9 rounded-xl">
      <Text className="text-lg font-bold">{item.name}</Text>
      <View className="flex-row justify-between items-center mt-1">
        <TabBarIcon name="time" size={16} color="gray" />
        <Text className="text-gray-600">{item.time}</Text>
        <TabBarIcon name="location" size={16} color="gray" />
        <Text className="text-gray-600">{item.location}</Text>
      </View>
      <Text className="text-gray-500 mt-2">{item.professor}</Text>
    </View>
  );

    return ( 
        <Screen title={"Clases"} >
      {/* Barra de búsqueda */}
      <View className="flex-row items-center bg-white mx-4 mt-4 p-3 rounded-lg">
        <TabBarIcon name="search" size={24} color="gray" />
        <TextInput
          className="ml-2 flex-1"
          placeholder="Buscar"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de clases */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        className="mt-4 w-full px-6"
      />

    </Screen>
     );
}