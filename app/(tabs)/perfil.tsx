import Screen from "@/components/Screen";
import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useState } from "react";
import { signOut } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled(View);
const ProfileCard = styled(View);
const ProfileText = styled(Text);
const InfoCard = styled(View);
const InfoText = styled(Text);
const BottomNavigation = styled(View);

export default function PerfilTab() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    console.log("Cerrando sesión...");
    signOut();
    setLoading(true);
    setTimeout(() => {
      router.replace("/iniciar-sesion");
    }, 2000);
  };

  return (
    <SafeAreaView>
      {/* Profile Section */}
      <ProfileCard className="items-center mb-5 bg-white p-6 rounded-3xl shadow-md border border-gray-200 mx-5">
        {/* Profile Picture */}
        <View className="w-24 h-24 bg-gray-300 rounded-full border-4 border-yellow-400 mb-4 items-center justify-center overflow-hidden">
          <Icon name="account" size={72} color="white" />
        </View>

        {/* User Info */}
        <ProfileText className="text-3xl font-bold text-gray-800 mb-2">
          Erick Yahir Cauich Chan
        </ProfileText>
        <ProfileText className="text-lg text-gray-500 mb-1">
          Matrícula: 21393129
        </ProfileText>

        {/* Tutor Info */}
        <ProfileText className="text-lg text-gray-500 mb-2">
          <Text className="font-semibold text-xl text-gray-800">Tutor: </Text>
          Lic. Erendira De Jesus Aleman Zeferino
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
          <InfoText className="text-base text-gray-600 mb-4">15 de marzo de 1999</InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Tipo de sangre:
          </InfoText>
          <InfoText className="text-base text-gray-600 mb-4">O+</InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Género:
          </InfoText>
          <InfoText className="text-base text-gray-600 mb-4">Femenino</InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Número de emergencia:
          </InfoText>
          <InfoText className="text-base text-gray-600 mb-4">+52 998 123 4567</InfoText>

          <InfoText className="text-base font-semibold text-gray-700 mb-1">
            Alergias:
          </InfoText>
          <InfoText className="text-base text-gray-600">Polvo, lácteos</InfoText>
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
