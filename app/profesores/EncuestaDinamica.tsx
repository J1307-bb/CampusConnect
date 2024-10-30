import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const EncuestaDinamica = () => {
  const [preguntas, setPreguntas] = useState([
    { id: 1, texto: '', respuestas: [{ id: 1, texto: '' }, { id: 2, texto: '' }] },
  ]);
  const [destinatario, setDestinatario] = useState("Todos");
  const [modalVisible, setModalVisible] = useState(false);

  const destinatarios = ["Todos", "IDYS101", "IDYGS", "IDYGS102"]; 

  const agregarPregunta = () => {
    const nuevaPregunta = {
      id: preguntas.length + 1,
      texto: '',
      respuestas: [{ id: 1, texto: '' }, { id: 2, texto: '' }],
    };
    setPreguntas([...preguntas, nuevaPregunta]);
  };

  const agregarRespuesta = (preguntaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: [...pregunta.respuestas, { id: pregunta.respuestas.length + 1, texto: '' }],
            }
          : pregunta
      )
    );
  };

  const manejarCambioPregunta = (texto: string, preguntaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId ? { ...pregunta, texto } : pregunta
      )
    );
  };

  const manejarCambioRespuesta = (texto: string, preguntaId: number, respuestaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.map((respuesta) =>
                respuesta.id === respuestaId ? { ...respuesta, texto } : respuesta
              ),
            }
          : pregunta
      )
    );
  };

  const seleccionarDestinatario = (nuevoDestinatario: string) => {
    setDestinatario(nuevoDestinatario);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
       
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-2xl font-bold`}>Encuesta</Text>
         
          <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`bg-gray-200 rounded-full px-4 py-2`}>
            <Text style={tw`text-gray-700`}>{destinatario}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`bg-yellow-500 rounded-full p-2`}>
            <Text style={tw`text-white font-bold`}>Publicar</Text>
          </TouchableOpacity>
        </View>

    
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white w-4/5 rounded-lg p-4`}>
              <Text style={tw`text-lg font-bold mb-4`}>Seleccionar destinatario</Text>
              {destinatarios.map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  onPress={() => seleccionarDestinatario(opcion)}
                  style={tw`p-2 border-b border-gray-200`}
                >
                  <Text style={tw`text-gray-700`}>{opcion}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`mt-4 bg-red-500 rounded-full p-2`}
              >
                <Text style={tw`text-white text-center`}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {preguntas.map((pregunta) => (
          <View key={pregunta.id} style={tw`mb-6 bg-purple-100 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-2`}>Pregunta</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
              placeholder="Escribe la pregunta"
              value={pregunta.texto}
              onChangeText={(texto) => manejarCambioPregunta(texto, pregunta.id)}
            />

            <Text style={tw`text-sm text-gray-500 mb-2`}>Añadir respuestas</Text>
            {pregunta.respuestas.map((respuesta) => (
              <TextInput
                key={respuesta.id}
                style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
                placeholder={`Respuesta ${respuesta.id}`}
                value={respuesta.texto}
                onChangeText={(texto) =>
                  manejarCambioRespuesta(texto, pregunta.id, respuesta.id)
                }
              />
            ))}

            <TouchableOpacity
              style={tw`border border-dashed border-gray-400 rounded-lg p-2 mb-2 flex justify-center items-center`}
              onPress={() => agregarRespuesta(pregunta.id)}
            >
              <Text style={tw`text-blue-500`}>+ Añadir respuesta</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={tw`bg-yellow-500 rounded-lg p-3 flex items-center mb-6`}
          onPress={agregarPregunta}
        >
          <Text style={tw`text-white font-bold`}>+ Añadir pregunta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EncuestaDinamica;
