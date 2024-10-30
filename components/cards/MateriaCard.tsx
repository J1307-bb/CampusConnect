import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { TabBarIcon } from '../navigation/TabBarIcon'
import { FadeIn } from 'react-native-reanimated';

export function AnimatedMateriaCard({ materia, index }: any) {
    const opacity = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, [opacity, index]);
  
    return (
      <Animated.View style={{ opacity }}>
        <MateriaCard materia={materia} />
      </Animated.View>
    );
  }

const MateriaCard = ({ materia }: any) => {
  return (
    <View className="bg-white w-full mb-4 p-9 rounded-xl border border-gray-300 shadow-md">
      <Text className="text-lg font-bold ">{materia.title}</Text>
      <Text className="text-gray-400 font-semibold">{materia.professor}</Text>

      <View className="flex-row justify-between materias-center mt-2">
        <View className="flex-row ">
          <TabBarIcon name="location" size={16} color="gray" />
          <Text className="text-gray-800 mx-1">{materia.location}</Text>
        </View>
      </View>

    </View>
  )
}

export default MateriaCard