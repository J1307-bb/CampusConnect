import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Catalogs from '@/services/Catalogs';
const EncuestasView = () => {
  const [surveys, setSurveys] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [visibleModalSurvey, setVisibleModalSurvey] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [encuestasData, respuestasData] = await Promise.all([
        Catalogs.getEncuestasPendientes(),
        Catalogs.getEncuestasRespondidas(),
      ]);

      console.log(respuestasData);
      setSurveys(encuestasData);
      setAnswers(respuestasData);
    };
    fetchData();
  }, []);

  const viewSurvey = () => {
    setVisibleModalSurvey(true);
  };

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
          surveys.map(({ id, titulo, profesor = { nombre: '', apellidos: ''} }) => (
            <View key={id} className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">{titulo}</Text>
              <Text className="text-sm text-gray-400 mt-2">{profesor.nombre} {profesor.apellidos}</Text>
              <TouchableOpacity
                className="bg-blue-500 mt-4 p-3 rounded-full items-center"
                onPress={viewSurvey}
              >
                <Text className="text-white font-bold">Responder encuesta</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text className="text-3xl font-bold text-gray-800 mb-6">Encuestas</Text>

        {surveys.length <= 0 ? (
          <View className=" items-center justify-center mt-20">
            <Icon name="clipboard-text-outline" size={80} color="gray" className="mb-4" />
            <Text className="text-xl font-semibold text-gray-600">
              Aún no hay encuestas respondidas
            </Text>
          </View>
        ) : (
          (answers || []).map(({ id, titulo, profesor = { nombre: '', apellidos: ''} }) => (
            <View key={id} className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">{titulo}</Text>
              <Text className="text-sm text-gray-400 mt-2">{profesor.nombre} {profesor.apellidos}</Text>
              <TouchableOpacity
                className="bg-blue-500 mt-4 p-3 rounded-full items-center"
                onPress={viewSurvey}
              >
                <Text className="text-white font-bold">Responder encuesta</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default EncuestasView