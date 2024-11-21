import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EncuestasView = () => {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    console.log(surveys.length);
    
  }, []);

  return (
    <SafeAreaView >
      <ScrollView className=" px-6 py-6">
        <Text className="text-3xl font-bold text-gray-800 mb-6">Encuestas</Text>

        {surveys.length <= 0 ? (
          <View className=" items-center justify-center mt-20">
            <Icon name="clipboard-text-outline" size={80} color="gray" className="mb-4" />
            <Text className="text-xl font-semibold text-gray-600">
              Aún no hay encuestas realizadas
            </Text>
          </View>
        ) : (
          surveys.map((survey: any, index) => (
            <View key={index} className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">{survey.title}</Text>
              <Text className="text-gray-600 mt-1">{survey.description}</Text>
              <Text className="text-sm text-gray-400 mt-2">{survey.date}</Text>
              <TouchableOpacity
                className="bg-blue-500 mt-4 p-3 rounded-full items-center"
                onPress={() => console.log("Ver resultados de la encuesta")}
              >
                <Text className="text-white font-bold">Ver Resultados</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default EncuestasView