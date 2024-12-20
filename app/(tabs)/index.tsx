import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import materias from "@/data/materias.json";

export default function InicioTab() {

  const sections = ["Avisos", "Eventos"];

  const [currentSection, setCurrentSection] = useState("Avisos");
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const theme = useTheme();

  return (
    <Screen>
      <ScrollView className="flex-1">
        {/* Saludo */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">
              Hola, <Text className="text-yellow-500">Abril</Text>
            </Text>
            <TabBarIcon name="notifications" size={20} color="purple" />
          </View>
        </View>

        {/* Categorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2"
        >
          {materias.map((category, index) => (
            <TouchableOpacity key={index} className="mr-4">
              <View className="w-24 h-36 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  className="w-full h-20"
                />
                <Text className="text-center justify-center items-center m-2 text-sm font-semibold">
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Clases de hoy */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Clases de Hoy:</Text>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => router.push("/horario" as any)}
            >
              <Text className="text-orange-500 ">Ver Horario</Text>
              <TabBarIcon name="chevron-forward" size={20} color="orange" />
            </TouchableOpacity>
          </View>
          <View className="bg-[#ede6db] p-4 mt-4 rounded-lg border border-gray-400">
            <Text className="text-lg font-semibold">Digital Thinking</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500">09:00 - 11:00</Text>
              <Text className="text-gray-500 ml-4">Main auditorium</Text>
            </View>
            <Text className="text-gray-700 mt-1">Mam Mahnoor</Text>
          </View>
        </View>


        {/* Noticias y Eventos */}
        <View className="px-4 ">
          <View className="flex-row mb-3">

            <TouchableOpacity
              className={`border-b-2 ${currentSection === "Avisos" ? "border-purple-500" : "border-transparent"}`}
              onPress={() => handleSectionChange("Avisos")}
            >
              <Text className={`text-xl ${currentSection === "Avisos" ? "text-purple-500 font-bold" : "text-gray-500"}`}>Avisos</Text>
            </TouchableOpacity>
              
            <TouchableOpacity
              className={`ml-4 border-b-2 ${currentSection === "Eventos" ? "border-purple-500" : "border-transparent"}`}
              onPress={() => handleSectionChange("Eventos")}
            >
              <Text className={`text-xl ${currentSection === "Eventos" ? "text-purple-500 font-bold" : "text-gray-500"}`}>Eventos</Text>
            </TouchableOpacity>

          </View>

          <View className="bg-[#ffe2a9] p-4 mb-4 rounded-lg border border-gray-400">
            <Text className="text-md font-semibold">FBISE</Text>
            <Text className="text-gray-600">
              The Federal Board of Intermediate...
            </Text>
            <Text className="text-sm text-gray-400 mt-1">May 01</Text>
          </View>

          <View className="bg-[#fbc489] p-4 mb-4 rounded-lg border border-gray-400">
            <Text className="text-md font-semibold">Gaza</Text>
            <Text className="text-gray-600">
              The Pakistan Medical and Dental Council...
            </Text>
            <Text className="text-sm text-gray-400 mt-1">June 07</Text>
          </View>

          <View className="bg-[#f6a76a] p-4 mb-4 rounded-lg border border-gray-400">
            <Text className="text-md font-semibold">LUMS</Text>
            <Text className="text-gray-600">
              LUMS recently celebrated the graduation...
            </Text>
            <Text className="text-sm text-gray-400 mt-1">May 01</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
