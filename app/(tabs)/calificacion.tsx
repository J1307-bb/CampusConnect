import Screen from "@/components/Screen";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CalificacionTab() {
    const [selectedTab, setSelectedTab] = useState('Calificaciones');

  const tabs = ['Calificaciones', 'Encuestas'];

  return (
    <Screen>
      
          {/* Preliminary Data */}
          <View className=" flex-row  justify-between mb-4">
            <View className="flex text-left">
                <Text className="text-lg font-bold">Promedio Preliminar: <Text className="text-gray-600">97.5</Text></Text>
                <Text className="text-lg font-bold">Calificación Preliminar: <Text className="text-gray-600">DE</Text></Text>
            </View>

            <TouchableOpacity className="bg-gray-100 p-2 rounded-lg">
              <Text>Unidad 1 ▼</Text>
            </TouchableOpacity>
          </View>

          {/* Subjects List */}
          <ScrollView>
            <View className="flex-row justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl shadow-sm">
              <View>
                <Text className="text-lg font-bold">Marketing</Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-lg">
                <Text className="text-lg font-bold text-purple-600">97</Text>
                <Text className="text-gray-500 text-xs">S2020</Text>
              </View>
            </View>

            {/* Add more Subject Cards as needed */}
          </ScrollView>

    </Screen>
  );
}
