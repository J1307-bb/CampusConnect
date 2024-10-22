import Screen from "@/components/Screen";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CalificacionTab() {
  
  const [selectedTab, setSelectedTab] = useState('Calificaciones');


  return (
    <Screen title="Calificaciones" >
      
          {/* Preliminary Data */}
          <View className=" flex-row items-center mb-4">
            <View className="text-left mx-8 justify-between ">
                <Text className="text-lg font-bold">Promedio Preliminar: <Text className="text-gray-600">97.5</Text></Text>
                <Text className="text-lg font-bold">Calificación Preliminar: <Text className="text-gray-600">DE</Text></Text>
            </View>

            <View className="flex mx-8 justify-between">
              <TouchableOpacity className="bg-gray-100 p-2 rounded-lg">
                <Text>Unidad 1 ▼</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subjects List */}
          <ScrollView className="m-4">
            <View className="flex-row w-full justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Marketing</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">97</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

            <View className="flex-row w-full justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Digital Thinking</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">90</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

            <View className="flex-row w-full justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Programacion Orientada a Objetos</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">100</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

            <View className="flex-row w-full justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Tutoria</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">100</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

            <View className="flex-row w-full justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Algebra Lineal</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">95</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

          </ScrollView>

    </Screen>
  );
}
