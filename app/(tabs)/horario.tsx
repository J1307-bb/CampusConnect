import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { IMateria } from "@/interfaces/IInterfaces";
import Catalogs from "@/services/Catalogs";

const ScheduleScreen = () => {
  const days = [
    { key: "lunes", label: "Lun" },
    { key: "martes", label: "Mar" },
    { key: "miercoles", label: "Mié" },
    { key: "jueves", label: "Jue" },
    { key: "viernes", label: "Vie" },
  ];

  // Estado para el día seleccionado y la fecha actual
  const [selectedDay, setSelectedDay] = useState<keyof typeof schedule>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [materias, setMaterias] = useState<IMateria[]>([]);
  const [materiasFiltered, setMateriaFiltered] = useState<IMateria[]>([]);
  useEffect(() => {
    const today = new Date().getDay();
    const initialDay = today === 0 || today === 6 ? "lunes" : days[today - 1].key;
    setSelectedDay(initialDay);
    setMateriaFiltered(materias.filter((item) => item.dia === initialDay));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materiasData = await Catalogs.getMaterias();
        setMaterias(materiasData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const schedule: {
    [key: string]: {
      time: string;
      course: string;
      room: string;
      teacher: string;
      color: string;
    }[];
  } = {
    M: [
      {
        time: "11:35 - 13:05",
        course: "Álgebra Lineal",
        room: "Room 2 - 124",
        teacher: "Mam Laiba Khalid",
        color: "bg-[#9c8680]"
      },
      {
        time: "13:15 - 14:45",
        course: "Tutoría",
        room: "Room 3A - Q4",
        teacher: "Mam Hira",
        color: "bg-[#eb5e7f]",
      },
      {
        time: "15:10 - 16:40",
        course: "Marketing",
        room: "Room 7B - B1",
        teacher: "Mam Laiba Khalid",
        color: "bg-[#f98f6f]",
      },
    ],
    T: [
      {
        time: "13:15 - 14:45",
        course: "Tutoría",
        room: "Room 3A - Q4",
        teacher: "Mam Hira",
        color: "bg-[#dbbf6b]",
      },
      {
        time: "11:35 - 13:05",
        course: "Álgebra Lineal",
        room: "Room 2 - 124",
        teacher: "Mam Laiba Khalid",
        color: "bg-[#c8eb6a]",
      },
      {
        time: "15:10 - 16:40",
        course: "Marketing",
        room: "Room 7B - B1",
        teacher: "Mam Laiba Khalid",
        color: "bg-blue-300",
      },
    ],
    W: [
      {
        time: "15:10 - 16:40",
        course: "Marketing",
        room: "Room 7B - B1",
        teacher: "Mam Laiba Khalid",
        color: "bg-blue-300",
      },
      {
        time: "11:35 - 13:05",
        course: "Álgebra Lineal",
        room: "Room 2 - 124",
        teacher: "Mam Laiba Khalid",
        color: "bg-green-300",
      },
      {
        time: "13:15 - 14:45",
        course: "Tutoría",
        room: "Room 3A - Q4",
        teacher: "Mam Hira",
        color: "bg-yellow-300",
      },
    ],
    Th: [
      {
        time: "11:35 - 13:05",
        course: "Álgebra Lineal",
        room: "Room 2 - 124",
        teacher: "Mam Laiba Khalid",
        color: "bg-green-300",
      },
      {
        time: "13:15 - 14:45",
        course: "Tutoría",
        room: "Room 3A - Q4",
        teacher: "Mam Hira",
        color: "bg-yellow-300",
      },
      {
        time: "15:10 - 16:40",
        course: "Marketing",
        room: "Room 7B - B1",
        teacher: "Mam Laiba Khalid",
        color: "bg-blue-300",
      },
    ],
    F: [
      {
        time: "13:15 - 14:45",
        course: "Tutoría",
        room: "Room 3A - Q4",
        teacher: "Mam Hira",
        color: "bg-yellow-300",
      },
      {
        time: "15:10 - 16:40",
        course: "Marketing",
        room: "Room 7B - B1",
        teacher: "Mam Laiba Khalid",
        color: "bg-blue-300",
      },
      {
        time: "11:35 - 13:05",
        course: "Álgebra Lineal",
        room: "Room 2 - 124",
        teacher: "Mam Laiba Khalid",
        color: "bg-green-300",
      },
    ],
  };

  const handleDayPress = (dayKey: string) => {
    setSelectedDay(dayKey);
    setMateriaFiltered(materias.filter((item) => item.dia === dayKey));
  };

  const DayButton = styled(Pressable);

  return (
    <SafeAreaView>
      <View className="flex p-4">
        <Text className="text-center text-2xl font-extralight pt-4 pb-6">Horario</Text>
        
        {/* Fecha y Día */}
        <View className="flex-row mb-4 px-1">
          <Text className="text-7xl font-bold pr-2">
            {currentDate.getDate()}
          </Text>
          <View>
            <Text className="text-lg text-gray-500">
              {currentDate.toLocaleDateString("es-ES", { weekday: "long", }).toUpperCase()}
            </Text>
            <Text className="text-lg text-gray-500">
              {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" }).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Botones de días */}
        <View className="flex-row justify-around mb-4">
          {days.map((day) => (
            <DayButton
              key={day.key}
              onPress={() => handleDayPress(day.key)}
              className={`px-4 py-2 rounded-full ${selectedDay === day.key ? "bg-secondary-100" : "bg-gray-200"}`}
            >
              <Text className={`${selectedDay === day.key ? "text-white" : "text-gray-800"} font-bold`}>
                {day.label}
              </Text>
            </DayButton>
          ))}
        </View>

        <View className="flex border-t border-gray-300 pb-4"></View>

        {/* Lista de clases */}
        <FlatList
          data={materiasFiltered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className={`p-4 rounded-lg mb-4 border border-gray-400 shadow-sm bg-[#ede6db]`}>
              <Text className="text-xl font-bold mb-2">{item.materia}</Text>
              <View className="flex-row m-1">
                <TabBarIcon name="time-outline" size={16} color="gray" />
                <Text className="text-gray-500 mx-1">{item.horario}</Text>
              </View>
              <View className="flex-row m-1">
                <TabBarIcon name="location-outline" size={16} color="gray" />
                <Text className="text-gray-500 mx-1">{item.aula}</Text>
              </View>
              <View className="flex-row m-1">
                <TabBarIcon name="person-circle-outline" size={16} color="gray" />
                <Text className="text-gray-500 mx-1">{item.profesor.nombre} {item.profesor.apellidos}</Text>
              </View>
            </View>
          )}
          className="h-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
