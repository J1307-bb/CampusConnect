import Screen from "@/components/Screen";
import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import { useState, useEffect } from "react";
import { createIconSet } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Session from "@/services/Session";

const Container = styled(View);
const ProfileCard = styled(View);
const ProfileText = styled(Text);
const InfoCard = styled(View);
const InfoText = styled(Text);
const BottomNavigation = styled(View);

export default function PerfilTab() {
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState({
    nombre: '',
    apellidos: '',
    matricula: '',
    tutor: '',
    fechaNacimiento: '',
    tipoSangre: '',
    genero: '',
    numeroEmergencia: '',
    alergias: []
  });

  const handlePress = async () => {
    console.log("Cerrando sesión...");
    setLoading(true);
    await signOut();
    router.replace("/iniciar-sesion");
  };

  const getSessionData = async () => {
    const data: any = await Session.getSessionData();
    setSessionData(data);
  }

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <SafeAreaView>
      {/* Profile Section */}
      <ProfileCard className="items-center mb-5 bg-white p-6 rounded-3xl shadow-md border border-gray-200 mx-5">
        {/* Profile Picture */}
        <View className="w-24 h-24 bg-gray-300 rounded-full border-4 border-yellow-400 mb-4 items-center justify-center overflow-hidden">
          <Icon name="account" size={72} color="white" />
        </View>

        {/* User Info */}
        <ProfileText className="text-2xl font-bold text-gray-700 mb-2">
          {sessionData.nombre} {sessionData.apellidos}
        </ProfileText>
        <ProfileText className="text-lg font-bold text-gray-500 mb-2">
          {sessionData.matricula}
        </ProfileText>

        {/* Tutor Info */}
        <ProfileText className="text-lg text-gray-500 mb-2">
          <Text className="font-semibold text-xl text-gray-800">Tutor: </Text>
          {sessionData.tutor}
        </ProfileText>
      </ProfileCard>

      {/* Personal Info Section */}
      <View className="w-full px-6">
        <InfoCard className="bg-white p-6 rounded-3xl mb-6 shadow-md border border-gray-200">
          <InfoText className="text-lg font-bold text-gray-800 mb-2">
            Información Personal
          </InfoText>
          <View className="border-b border-gray-200 mb-4"></View>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Fecha de nacimiento:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.fechaNacimiento}
          </InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Tipo de sangre:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.tipoSangre}
          </InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Género:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.genero}
          </InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Número de emergencia:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.numeroEmergencia}
          </InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Alergias:
          </InfoText>
          <InfoText className="text-gray-600">
            {(sessionData.alergias || []).join(", ")}
          </InfoText>
        </InfoCard>
      </View>

      {/* Logout Button */}
      <View className="w-full items-center mb-10">
        <CustomButton
          title={"Cerrar Sesión"}
          handlePress={handlePress}
          containerStyles={"items-center w-4/5 rounded-full py-4 shadow-md"}
          textStyles={"text-white text-center font-bold text-lg"}
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
