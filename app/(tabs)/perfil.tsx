import Screen from "@/components/Screen";
import { Link, router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import { useState, useEffect } from "react";
import { createIconSet } from "react-native-vector-icons";
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

  const handlePress = () => {
    console.log("Cerrando sesión...");
    signOut();
    setLoading(true);
    setTimeout(() => {
      router.replace("/iniciar-sesion");
    }, 2000);
    
  }

  const getSessionData = async () => {
    const data: any = await Session.getSessionData();
    setSessionData(data);
  }

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <Screen>
      {/* Profile Section */}
      <ProfileCard className="items-center mb-4">
        {/* Profile Picture */}
        <View className="w-24 h-24 bg-gray-200 rounded-full border-4 border-yellow-400 mb-4"></View>

        {/* User Info */}
        <ProfileText className="text-2xl font-bold text-gray-700 mb-2">
          {sessionData.nombre} {sessionData.apellidos}
        </ProfileText>
        <ProfileText className="text-lg font-bold text-gray-500 mb-2">
          {sessionData.matricula}
        </ProfileText>

        {/* Name and Tutor */}
        <ProfileText className="text-lg text-gray-500 mb-2">
          <Text className="font-semibold text-xl text-gray-800">Tutor: </Text>
          {sessionData.tutor}
        </ProfileText>
      </ProfileCard>

      {/* Personal Info Section */}
      <View className="w-full p-4">
        <InfoCard className="bg-white p-6 rounded-3xl mb-4 shadow-md border-gray-200">
          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Fecha de nacimiento:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.fechaNacimiento}
          </InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Tipo de sangre:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.tipoSangre}
          </InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Género:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.genero}
          </InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Número de emergencia:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            {sessionData.numeroEmergencia}
          </InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Alergias:
          </InfoText>
          <InfoText className="text-gray-600">
            {(sessionData.alergias || []).join(", ")}
          </InfoText>
        </InfoCard>
      </View>

      <View>
        <CustomButton title={"Cerrar Sesión"} handlePress={handlePress} containerStyles={"items-center"} textStyles={"text-center font-bold mx-10 text-xl"} isLoading={loading} />
      </View>
    </Screen>
  );
}
