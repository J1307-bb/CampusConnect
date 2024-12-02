import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "tailwind-react-native-classnames";
import Cache from '@/services/Cache';

import Catalogs from '@/services/Catalogs';
import Http from '@/services/Http';

const EncuestasView = () => {
  const [surveys, setSurveys] = useState([]);
  const [surveysPending, setSurveysPending] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [sessionData, setSessionData] = useState({
    id: ''
  });
  const [currentSurvey, setCurrentSurvey] = useState<any>({
    titulo: '',
    preguntas: [],
  });
  const [visibleModalSurvey, setVisibleModalSurvey] = useState(false);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const [encuestasData, respuestasData, sessionData] = await Promise.all([
        Catalogs.getEncuestasPendientes(),
        Catalogs.getEncuestasRespondidas(),
        Cache.getData('sessionData'),
      ]);

      const encuestasRespondidas = new Set();
      respuestasData.forEach((respuesta: { idEncuesta: any, encuesta: any }) => {
        respuesta.encuesta = encuestasData.find((encuesta: { id: any }) => encuesta.id === respuesta.idEncuesta);
        encuestasRespondidas.add(respuesta.idEncuesta);
      });
      const encuestasPendientes = encuestasData.filter((encuesta: { id: any }) => !encuestasRespondidas.has(encuesta.id));

      console.log(respuestasData);
      setSurveys(encuestasData);
      setSurveysPending(encuestasPendientes);
      setAnswers(respuestasData);
      setSessionData(sessionData);
    };
    fetchData();
  }, []);

  const viewSurvey = (idEncuesta: any) => {
    const encuestaData = surveys.find((e: { id: any }) => e.id === idEncuesta) ?? { titulo: '', preguntas: [] };
    setCurrentSurvey(encuestaData);
    setVisibleModalSurvey(true);
  };

  const viewAnswers = (idEncuesta: any, respuestas: any) => {
    const encuestaData = surveys.find((e: { id: any }) => e.id === idEncuesta) ?? { titulo: '', preguntas: [] };
    setCurrentSurvey(encuestaData);
    console.log(idEncuesta, respuestas);
  };

  const handleRespuestaChange = (preguntaId: any, respuestaId: any, texto: any) => {
    setRespuestasSeleccionadas({ ...respuestasSeleccionadas, [preguntaId]: respuestaId, texto });
  };

  const handleSubmit = async () => {
    const payload = {
      idEncuesta: currentSurvey.id,
      idEstudiante: sessionData.id,
      respuestas: Object.entries(respuestasSeleccionadas).map(([idPregunta, idRespuesta]) => ({
        idPregunta,
        idRespuesta,
      })),
    };

    await Http.post('/respuestasencuestas', payload);
    setSurveysPending(surveysPending.filter((e: { id: any }) => e.id !== currentSurvey.id));
    setVisibleModalSurvey(false);
  };

  const closeModal = () => {
    setVisibleModalSurvey(false);
    setCurrentSurvey({ titulo: '', preguntas: [] });
    setRespuestasSeleccionadas({});
  };

  return (
    <SafeAreaView >
      <ScrollView className=" px-6 py-6">
        <Text className="text-3xl font-bold text-gray-800 mb-6">Encuestas pendientes</Text>

        {surveysPending.length <= 0 ? (
          <View className=" items-center justify-center mt-20">
            <Icon name="clipboard-text-outline" size={80} color="gray" className="mb-4" />
            <Text className="text-xl font-semibold text-gray-600">
              No tienes encuestas pendientes
            </Text>
          </View>
        ) : (
          surveysPending.map(({ id, titulo, profesor = { nombre: '', apellidos: ''} }) => (
            <View key={id} className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">{titulo}</Text>
              <Text className="text-sm text-gray-400 mt-2">{profesor.nombre} {profesor.apellidos}</Text>
              <TouchableOpacity
                className="bg-blue-500 mt-4 p-3 rounded-full items-center"
                onPress={() => {
                  viewSurvey(id);
                }}
              >
                <Text className="text-white font-bold">Responder encuesta</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* <Text className="text-3xl font-bold text-gray-800 mb-6">Respuestas</Text>

        {answers.length <= 0 ? (
          <View className=" items-center justify-center mt-20">
            <Icon name="clipboard-text-outline" size={80} color="gray" className="mb-4" />
            <Text className="text-xl font-semibold text-gray-600">
              Aún no hay encuestas respondidas
            </Text>
          </View>
        ) : (
          answers.map(({ id, idEncuesta, respuestas, encuesta: { titulo ='' , profesor = { nombre: '', apellidos: '' }}  }) => (
            <View key={id} className="bg-white p-5 mb-4 rounded-2xl shadow-md border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800">{titulo}</Text>
              <Text className="text-sm text-gray-400 mt-2">{profesor.nombre} {profesor.apellidos}</Text>
              <TouchableOpacity
                className="bg-blue-500 mt-4 p-3 rounded-full items-center"
                onPress={() => {
                  viewAnswers(idEncuesta, respuestas);
                }}
              >
                <Text className="text-white font-bold">Ver respuestas</Text>
              </TouchableOpacity>
            </View>
          ))
        )} */}
      </ScrollView>

      <Modal visible={visibleModalSurvey} animationType="slide" onRequestClose={closeModal}>
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`p-4 bg-blue-500`}>
            <Text style={tw`text-white text-lg font-bold text-center`}>
              {currentSurvey?.titulo || `Encuesta`}
            </Text>
          </View>

          <ScrollView style={tw`p-4`}>
            {currentSurvey?.preguntas.map(({ id, texto, respuestas = [] }: { id: any, texto: string, respuestas: { id: any, texto: string }[] }) => (
              <View key={id} style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-bold mb-2`}>
                  {texto}
                </Text>
                {respuestas.map(({ id: idRespuesta, texto }) => (
                  <TouchableOpacity
                    key={idRespuesta}
                    style={tw`flex-row items-center mb-2`}
                    onPress={() => handleRespuestaChange(id, idRespuesta, texto)}
                    disabled={!currentSurvey}
                  >
                    <View
                    style={tw`h-4 w-4 rounded-full border border-gray-400 mr-2 ${
                        respuestasSeleccionadas[id] === idRespuesta
                          ? 'bg-blue-500'
                          : ''
                      }`}
                  />
                    <Text>{texto}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            {currentSurvey ? null : (
              <View>
                {Object.entries(respuestasSeleccionadas).map(([preguntaId, respuestaId]) => {
                  const pregunta = currentSurvey?.preguntas.find((p: { id: any }) => p.id === preguntaId);
                  const respuesta = pregunta?.respuestas.find((r: { id: any }) => r.id === respuestaId);
                  return (
                    <View key={preguntaId} style={tw`mb-4`}>
                      <Text style={tw`text-gray-700 font-bold mb-2`}>
                        {pregunta?.texto}
                      </Text>
                      <Text>{respuesta?.texto}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={tw`flex-row justify-around p-4`}>
            <TouchableOpacity style={tw`bg-gray-300 px-4 py-2 rounded`} onPress={closeModal}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            {currentSurvey ? (
              <TouchableOpacity style={tw`bg-blue-500 px-4 py-2 rounded`} onPress={handleSubmit}>
                <Text style={tw`text-white`}>Enviar</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default EncuestasView