import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const CalificacionCard = ({ materia: { calificacion, clase } }: any) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-orange-500";
    return "text-red-600";
  };
  
  return (
    <View className="flex-row w-full justify-between items-center border border-orange-400/50 p-4 mb-4 rounded-xl shadow-sm bg-white">
      <View className="">
        <Text className="text-lg font-bold">{clase.materia}</Text>
        {/* <Text className="text-gray-400 text-sm pl-1">
          {materia.year}
        </Text> */}
      </View>
      <View className="border-gray-400 border h-12 w-12 rounded-lg justify-center items-center">
        <Text className={`text-lg font-bold text-center ${getGradeColor(calificacion)}`}>
          {calificacion}
        </Text>
      </View>
    </View>
  );
};

export default CalificacionCard;

export function AnimatedCalificacionCard({ materia, index }: any) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CalificacionCard materia={materia} />
    </Animated.View>
  );
}
