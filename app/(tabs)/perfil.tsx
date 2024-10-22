import Screen from "@/components/Screen";
import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Container = styled(View);
const ProfileCard = styled(View);
const ProfileText = styled(Text);
const InfoCard = styled(View);
const InfoText = styled(Text);
const BottomNavigation = styled(View);

export default function PerfilTab() {
  return (
    <Screen>
      {/* Profile Section */}
      <ProfileCard className="items-center mb-4">
        {/* Profile Picture */}
        <View className="w-24 h-24 bg-gray-200 rounded-full border-4 border-yellow-400 mb-4"></View>

        {/* User Info */}
        <ProfileText className="text-2xl font-bold text-gray-700 mb-2">
          Erick Yahir Cauich Chan
        </ProfileText>
        <ProfileText className="text-lg font-bold text-gray-500 mb-2">
          21393129
        </ProfileText>

        {/* Name and Tutor */}
        <ProfileText className="text-lg text-gray-500 mb-2">
          <Text className="font-semibold text-xl text-gray-800">Tutor: </Text>
          Lic. Erendira De Jesus Aleman Zeferino
        </ProfileText>
      </ProfileCard>

      {/* Personal Info Section */}
      <View className="w-full p-4">
        <InfoCard className="bg-gray-100 p-4 rounded-3xl mb-4 shadow-md">
          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Fecha de nacimiento:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">
            15 de marzo de 1999
          </InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Tipo de sangre:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">O+</InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Género:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">Femenino</InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Número de emergencia:
          </InfoText>
          <InfoText className="text-gray-600 mb-4">+52 998 123 4567</InfoText>

          <InfoText className="text-lg font-bold text-gray-800 mb-1">
            Alergias:
          </InfoText>
          <InfoText className="text-gray-600">Polvo, lácteos</InfoText>
        </InfoCard>
      </View>
    </Screen>
  );
}
