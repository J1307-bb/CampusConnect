import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, G } from "react-native-svg";

const UniversityMap = () => {
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView>
      <ScrollView className="mx-6 mt-4">
        {/* Encabezado */}
        <View className="mb-6">
          <Text className="text-2xl font-semibold">Mapa de la Universidad</Text>
          <Text className="text-lg text-gray-500">
            Ubica los diferentes edificios en el campus.
          </Text>
        </View>

        {/* Mapa de la Universidad */}
        <View className="items-center mb-8">
          <Svg
            height={width * 0.8}
            width={width * 0.8}
            viewBox="0 0 500 500"
          >
            <G>
              {/* Edificio A */}
              <Path
                d="M50 50 L150 50 L150 150 L50 150 Z"
                fill="#4A90E2"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <Text
                x="100"
                y="45"
                textAnchor="middle"
                fontSize="12"
                fill="#4A90E2"
              >
                Edificio A
              </Text>

              {/* Edificio B */}
              <Path
                d="M200 50 L300 50 L300 150 L200 150 Z"
                fill="#E94E77"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <Text
                x="250"
                y="45"
                textAnchor="middle"
                fontSize="12"
                fill="#E94E77"
              >
                Edificio B
              </Text>

              {/* Edificio C */}
              <Path
                d="M50 200 L150 200 L150 300 L50 300 Z"
                fill="#50E3C2"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <Text
                x="100"
                y="195"
                textAnchor="middle"
                fontSize="12"
                fill="#50E3C2"
              >
                Edificio C
              </Text>

              {/* Edificio D */}
              <Path
                d="M200 200 L300 200 L300 300 L200 300 Z"
                fill="#F5A623"
                stroke="#ffffff"
                strokeWidth="3"
              />
              <Text
                x="250"
                y="195"
                textAnchor="middle"
                fontSize="12"
                fill="#F5A623"
              >
                Edificio D
              </Text>
            </G>
          </Svg>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UniversityMap;
