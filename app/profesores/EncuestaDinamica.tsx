import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Catalogs from "@/services/Catalogs";
import Cache from "@/services/Cache";

const EncuestaDinamica = () => {
  const [preguntas, setPreguntas] = useState([
    {
      id: 1,
      texto: "",
      respuestas: [
        { id: 1, texto: "" },
        { id: 2, texto: "" },
      ],
    },
  ]);
  const [grupos, setGrupos] = useState<any>([{
    nombre: '',
    id: '',
  }]);
  const [destinatario, setDestinatario] = useState("todos");
  const [titulo, setTitulo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [encuestas, setEncuestas] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gruposData] = await Promise.all([
          await Cache.getData("gruposMaterias"),
        ]);

        setGrupos([{ nombre: 'Todos', id: 'todos'}, ...gruposData]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const agregarPregunta = () => {
    const nuevaPregunta = {
      id: preguntas.length + 1,
      texto: "",
      respuestas: [
        { id: 1, texto: "" },
        { id: 2, texto: "" },
      ],
    };
    setPreguntas([...preguntas, nuevaPregunta]);
  };

  const agregarRespuesta = (preguntaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: [
                ...pregunta.respuestas,
                { id: pregunta.respuestas.length + 1, texto: "" },
              ],
            }
          : pregunta
      )
    );
  };

  const eliminarRespuesta = (preguntaId: number, respuestaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.filter(
                (respuesta) => respuesta.id !== respuestaId
              ),
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

  const manejarCambioRespuesta = (
    texto: string,
    preguntaId: number,
    respuestaId: number
  ) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.map((respuesta) =>
                respuesta.id === respuestaId
                  ? { ...respuesta, texto }
                  : respuesta
              ),
            }
          : pregunta
      )
    );
  };

  const seleccionarDestinatario = (nuevoDestinatario: any) => {
    setDestinatario(nuevoDestinatario);
    setModalVisible(false);
  };

  const publicarEncuesta = () => {
    setEncuestas([...encuestas, { id: encuestas.length + 1, preguntas }]);
    setPreguntas([
      {
        id: 1,
        texto: "",
        respuestas: [
          { id: 1, texto: "" },
          { id: 2, texto: "" },
        ],
      },
    ]);

    Catalogs.createForm({
      titulo, preguntas, to: destinatario
    })
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {/* Encabezado */}
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>Encuesta</Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`bg-blue-100 rounded-full px-4 py-2 flex-row items-center`}
          >
            <Text style={tw`text-blue-800 font-semibold mr-2`}>
              {grupos.find((d: any) => d.id === destinatario)?.nombre}
            </Text>
            <Icon name="chevron-down" size={20} color="blue" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={publicarEncuesta}
            style={tw`bg-yellow-500 rounded-full p-2 px-4`}
          >
            <Text style={tw`text-white font-bold`}>Publicar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Seleccionar Destinatario */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
          >
            <View style={tw`bg-white w-4/5 rounded-lg p-4`}>
              <Text style={tw`text-lg font-bold mb-4 text-gray-900`}>
                Seleccionar destinatario
              </Text>
              {grupos.map((grupo: any) => (
                <TouchableOpacity
                  key={grupo.nombre}
                  onPress={() => seleccionarDestinatario(grupo.id)}
                  style={tw`p-2 border-b border-gray-200`}
                >
                  <Text style={tw`text-gray-700`}>{grupo.nombre}</Text>
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

        <TextInput style={tw`border border-gray-300 rounded-lg p-2 mb-4`} placeholder="Título" value={titulo} onChangeText={setTitulo} />

        {/* Formulario de Preguntas */}
        {preguntas.map((pregunta) => (
          <View key={pregunta.id} className={`mb-6 bg-[#EDF1EF] p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-2 text-gray-800`}>
              Pregunta
            </Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-2`}
              placeholder="Escribe la pregunta"
              value={pregunta.texto}
              onChangeText={(texto) =>
                manejarCambioPregunta(texto, pregunta.id)
              }
            />

            <Text style={tw`text-sm text-gray-600 mb-2`}>
              Añadir respuestas
            </Text>
            {pregunta.respuestas.map((respuesta) => (
              <View key={respuesta.id} style={tw`flex-row items-center mb-2`}>
                <TextInput
                  style={tw`flex-1 border border-gray-300 rounded-lg p-2`}
                  placeholder={`Respuesta ${respuesta.id}`}
                  value={respuesta.texto}
                  onChangeText={(texto) =>
                    manejarCambioRespuesta(texto, pregunta.id, respuesta.id)
                  }
                />
                {respuesta.id > 2 && (
                  <TouchableOpacity
                    onPress={() => eliminarRespuesta(pregunta.id, respuesta.id)}
                    style={tw`ml-2`}
                  >
                    <Icon name="delete" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
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

        {/* Listado de Encuestas */}
        <View style={tw`mt-6`}>
          {encuestas.length === 0 ? (
            <View style={tw`items-center mt-10`}>
              <Icon
                name="clipboard-outline"
                size={64}
                color="#d1d5db"
                style={tw`mb-4`}
              />
              <Text style={tw`text-lg text-gray-500`}>
                Aun no has realizado alguna encuesta
              </Text>
            </View>
          ) : (
            <View>
              <Text style={tw`text-lg font-semibold text-gray-900 mb-4`}>
                Encuestas realizadas
              </Text>
              {encuestas.map((encuesta: any) => (
                <View
                  key={encuesta.id}
                  style={tw`bg-white p-4 rounded-lg mb-4 shadow-md`}
                >
                  <Text style={tw`text-gray-800 font-bold`}>
                    Encuesta {encuesta.id}
                  </Text>
                  {encuesta.preguntas.map((pregunta: any) => (
                    <Text key={pregunta.id} style={tw`text-gray-700 mt-2`}>
                      - {pregunta.texto}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EncuestaDinamica;
