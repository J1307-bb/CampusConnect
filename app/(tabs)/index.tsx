import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import { Link, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SegmentedButtons, useTheme } from "react-native-paper";
import Session from "@/services/Session";
import Catalogs from "@/services/Catalogs";
import Cache from "@/services/Cache";
import Utils from "@/services/Utils";
import { IMateria, IAviso } from "@/interfaces/IInterfaces";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styled } from "nativewind";
import NotificationService from "@/services/Notifications";

const CategoryCard = styled(View);
const NoticeCard = styled(View);

export default function InicioTab() {
  const [currentSection, setCurrentSection] = useState("Avisos");
  const [materias, setMaterias] = useState<IMateria[]>([]);
  const [avisos, setAvisos] = useState<IAviso[]>([]);
  const [sessionData, setSessionData] = useState({
    nombre: '',
    idGrupo: {
      id:''
    },
  });
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const theme = useTheme();

  useEffect(() => {
    NotificationService.setNotificationListener();
    const fetchData = async () => {
      await Cache.loadNotRequiredCatalogs();

      try {
        const [sessionData, materiasData, avisosData] = await Promise.all([
          Session.getSessionData(),
          Cache.getData("materias"),
          Catalogs.getAvisos(),
        ]);

        setSessionData(sessionData);
        setMaterias(materiasData);
        setAvisos(avisosData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Screen className="bg-gray-100">
      <ScrollView className="flex-1">
        {/* Saludo */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-800">
              Hola, <Text className="text-yellow-500">{sessionData.nombre}</Text>
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
          {materias.map(({ materia, id, imagen }) => (
            <TouchableOpacity key={id} className="mr-4">
              <View className="w-24 h-36 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  source={{ uri: imagen || "https://via.placeholder.com/100" }}
                  className="w-full h-20"
                />
                <Text className="text-center justify-center items-center m-2 text-sm font-semibold">
                  {materia}
                </Text>
              </View>
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
          {materias.filter((item) => item.dia === Utils.getToday().toLowerCase()).map(({ id, materia, horario, aula, profesor }) => (
              <View className="bg-white p-5 rounded-2xl shadow-md border border-gray-200" key={id}>
                <Text className="text-lg font-semibold">{materia}</Text>
                <View className="flex-row items-center mt-1">
                  <Icon name="clock-outline" size={16} color="gray" />
                  <Text className="text-gray-500 ml-2">{horario}</Text>
                  <Icon
                    name="map-marker-outline"
                    size={16}
                    color="gray"
                    className="ml-4"
                  />
                  <Text className="text-gray-500 ml-2">{aula}</Text>
                </View>
                <Text className="text-gray-700 mt-1">{profesor.nombre} {profesor.apellidos}</Text>
              </View>
          ))}
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
              {avisos.filter((item) => item.tipo === 1).map(({ id, titulo, descripcion, fechaPublicacion }) => (
                <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400" key={id}>
                  <Text className="text-lg font-semibold text-gray-800">
                    {titulo}
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    {descripcion}
                  </Text>
                  <Text className="text-sm text-gray-400 mt-2">
                    {Utils.formatFirebaseDate(fechaPublicacion)}
                  </Text>
                </NoticeCard>
              ))}
            </>
          )}

          {currentSection === "Eventos" && (
            <>
              {avisos.filter((item) => item.tipo === 2).map(({ id, titulo, descripcion, fechaPublicacion }) => (
                <NoticeCard className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-orange-400" key={id}>
                  <Text className="text-lg font-semibold text-gray-800">
                    {titulo}
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    {descripcion}
                  </Text>
                  <Text className="text-sm text-gray-400 mt-2">
                    {Utils.formatFirebaseDate(fechaPublicacion)}
                  </Text>
                </NoticeCard>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
