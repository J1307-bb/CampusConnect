import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function InicioTab() {
    return ( 
        <Screen>
            <ScrollView className="flex-1">
          {/* Saludo */}
          <View className="px-4 py-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold">Hola, <Text className="text-yellow-500">Abril</Text></Text>
              <TabBarIcon name="notifications" size={20} color="purple" />
            </View>
          </View>
    
          {/* Categorías */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-2"
          >
            {[
              { title: 'Computer Science', image: 'https://via.placeholder.com/100' },
              { title: 'Mathematics', image: 'https://via.placeholder.com/100' },
              { title: 'History & Geography', image: 'https://via.placeholder.com/100' },
              { title: 'Art & Culture', image: 'https://via.placeholder.com/100' },
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                className="mr-4"
              >
                <View className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <Image source={{ uri: category.image }} className="w-full h-20" />
                  <Text className="text-center mt-2 text-sm">{category.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
    
          {/* Clases de hoy */}
          <View className="px-4 py-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold">Clases de Hoy:</Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-purple-600">Ver Horario</Text>
                <TabBarIcon name="chevron-forward" size={20} color="purple" />
              </TouchableOpacity>
            </View>
            <View className="bg-gray-100 p-4 mt-4 rounded-lg">
              <Text className="text-lg font-semibold">Digital Thinking</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-gray-500">09:00 - 11:00</Text>
                <Text className="text-gray-500 ml-4">Main auditorium</Text>
              </View>
              <Text className="text-gray-700 mt-1">Mam Mahnoor</Text>
            </View>
          </View>
    
          {/* Noticias y Eventos */}
          <View className="px-4">
            <View className="flex-row mb-2">
              <Text className="text-lg font-bold underline">Avisos</Text>
              <Text className=" text-lg font-light ml-4">Eventos</Text>
            </View>
            <View className="bg-purple-100 p-4 mb-4 rounded-lg">
              <Text className="text-md font-semibold">FBISE</Text>
              <Text className="text-gray-600">The Federal Board of Intermediate...</Text>
              <Text className="text-sm text-gray-400 mt-1">May 01</Text>
            </View>
            <View className="bg-purple-100 p-4 mb-4 rounded-lg">
              <Text className="text-md font-semibold">Gaza</Text>
              <Text className="text-gray-600">The Pakistan Medical and Dental Council...</Text>
              <Text className="text-sm text-gray-400 mt-1">June 07</Text>
            </View>
            <View className="bg-purple-100 p-4 mb-4 rounded-lg">
              <Text className="text-md font-semibold">LUMS</Text>
              <Text className="text-gray-600">LUMS recently celebrated the graduation...</Text>
              <Text className="text-sm text-gray-400 mt-1">May 01</Text>
            </View>
          </View>
    
        </ScrollView>
        </Screen>
     );
}