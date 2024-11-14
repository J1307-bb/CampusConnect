import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import materias from "@/data/materias.json";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryCard = styled(View);
const NoticeCard = styled(View);

export default function InicioTab() {
  const [currentSection, setCurrentSection] = useState("Avisos");
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <Screen className="bg-gray-100">
      <ScrollView className="flex-1">
        {/* Saludo */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-800">
              Hola, <Text className="text-yellow-500">Abril</Text>
            </Text>
            <TouchableOpacity>
              <TabBarIcon name="notifications" size={24} color="orange" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 py-2 mb-6"
        >
          {materias.map((category, index) => (
            <TouchableOpacity key={index} className="mr-3">
              <CategoryCard className="w-28 h-40 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  className="w-full h-20 rounded-t-2xl"
                />
                <View className="p-2 items-center justify-center">
                  <Text className="text-center  text-sm font-semibold text-gray-800">
                    {category.title}
                  </Text>
                </View>
              </CategoryCard>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Clases de Hoy */}
        <View className="px-6 mb-7">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              Clases de Hoy:
            </Text>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => router.push("/horario")}
            >
              <Text className="text-orange-500 font-semibold mr-1">
                Ver Horario
              </Text>
              <TabBarIcon name="chevron-forward" size={20} color="orange" />
            </TouchableOpacity>
          </View>
          <View className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">
            <Text className="text-lg font-semibold text-gray-800">
              Desarrollo Móvil
            </Text>
            <View className="flex-row items-center mt-1">
              <Icon name="clock-outline" size={16} color="gray" />
              <Text className="text-gray-500 ml-2">09:00 - 11:00</Text>
              <Icon
                name="map-marker-outline"
                size={16}
                color="gray"
                className="ml-4"
              />
              <Text className="text-gray-500 ml-2">Auditorio Principal</Text>
            </View>
            <Text className="text-gray-700 mt-2">Mam Mahnoor</Text>
          </View>
        </View>

        {/* Mapa Interactivo */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              Mapa Interactivo:
            </Text>
          </View>
          <View >
          <TouchableOpacity
            onPress={() => router.push("/mapa" as any)}
            className="bg-white p-5 rounded-2xl shadow-md border border-yellow-500/50 flex-row items-center"
          >
            <Icon name="map-marker" size={30} color="orange" />
            <View >
              <Text className="text-lg font-semibold text-gray-800">Mapa Interactivo del Campus</Text>
              <Text className="text-gray-600 mt-1">Explora el campus con nuestro mapa interactivo y encuentra fácilmente los edificios y salones.</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>



        {/* Noticias y Eventos */}
        <View className="px-6">
          <View className="flex-row mb-4">
            <TouchableOpacity
              className={`border-b-2  ${
                currentSection === "Avisos"
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
              onPress={() => handleSectionChange("Avisos")}
            >
              <Text
                className={`text-xl ${
                  currentSection === "Avisos"
                    ? "text-orange-500 font-bold"
                    : "text-gray-500"
                }`}
              >
                Avisos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`ml-6 border-b-2  ${
                currentSection === "Eventos"
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
              onPress={() => handleSectionChange("Eventos")}
            >
              <Text
                className={`text-xl ${
                  currentSection === "Eventos"
                    ? "text-orange-500 font-bold"
                    : "text-gray-500"
                }`}
              >
                Eventos
              </Text>
            </TouchableOpacity>
          </View>

          {currentSection === "Avisos" && (
            <>
              <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400">
                <Text className="text-lg font-semibold text-gray-800">
                  Inscripciones para Talleres Extracurriculares
                </Text>
                <Text className="text-gray-600 mt-1">
                  Las inscripciones para los talleres extracurriculares del
                  semestre estarán abiertas del 15 al 25 de noviembre...
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  15 de noviembre de 2024
                </Text>
              </NoticeCard>

              <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400">
                <Text className="text-lg font-semibold text-gray-800">
                  Cambio en el Horario de Clases
                </Text>
                <Text className="text-gray-600 mt-1">
                  Debido a una actividad especial, el horario de clases del día
                  5 de diciembre será modificado...
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  5 de diciembre de 2024
                </Text>
              </NoticeCard>
            </>
          )}

          {currentSection === "Eventos" && (
            <>
              <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400">
                <Text className="text-lg font-semibold text-gray-800">
                  Reunión de Padres de Familia
                </Text>
                <Text className="text-gray-600 mt-1">
                  Reunión informativa para discutir el rendimiento académico de
                  los estudiantes..
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  10 de noviembre de 2024
                </Text>
              </NoticeCard>

              <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400">
                <Text className="text-lg font-semibold text-gray-800">
                  Feria de Ciencias
                </Text>
                <Text className="text-gray-600 mt-1">
                  Exhibición de proyectos científicos realizados por los
                  estudiantes de secundaria y preparatoria...
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  20 de noviembre de 2024
                </Text>
              </NoticeCard>

              <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400">
                <Text className="text-lg font-semibold text-gray-800">
                  Celebración de Fin de Año Escolar
                </Text>
                <Text className="text-gray-600 mt-1">
                  Ceremonia de clausura con actividades artísticas y entrega de
                  reconocimientos a estudiantes destacados...
                </Text>
                <Text className="text-sm text-gray-400 mt-2">
                  15 de diciembre de 2024
                </Text>
              </NoticeCard>
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
