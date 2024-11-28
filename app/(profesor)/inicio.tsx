import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, RadioButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from "expo-router";
import { useEffect } from "react";

import { signOut } from "@/lib/appwrite";
import Session from "@/services/Session";
import Cache from "@/services/Cache";
import Utils from "@/services/Utils";
import Catalogs from "@/services/Catalogs";
import CustomButton from "@/components/CustomButton";
import NotificationsService from "@/services/Notifications";

const HomeProfesor = () => {
  const [taskType, setTaskType] = useState("task");
  const [selectedGroup, setSelectedGroup] = useState("todos");
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState<any>('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  //TODO: Agregar boton cerrar sesion

  const [grupos, setGrupos] = useState([
    {
      nombre: '',
      id: '',
    }
  ]);
  const [materias, setMaterias] = useState([{
    materia: '',
    grupo: {
      nombre: '',
    },
    tarea: {
      fechaVencimiento: '',
      titulo: '',
    },
  }]);
  const [sessionData, setSessionData] = useState({
    id: '',
    nombre: '',
    apellidos: '',
    idGrupo: {
      id:''
    },
  });

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setFechaVencimiento(selectedDate);
    handleCloseDatePicker();
  };

  const colors = ['bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500'];

  useEffect(() => {
    NotificationsService.setNotificationListener();

    const fetchData = async () => {
      await Cache.loadNotRequiredCatalogs();

      try {
        const [sessionData, gruposData, materiasData,] = await Promise.all([
          await Session.getSessionData(),
          await Cache.getData("gruposAsignados"),
          await Cache.getData("materiasAsignadas"),
        ]);

        setSessionData(sessionData);
        setGrupos(gruposData);
        setMaterias(materiasData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const sendData = async () => {
    //TODO: Agregar idMateria
    const opts = {
      titulo,
      descripcion,
      fechaVencimiento,
      to: selectedGroup,
      idProfesor: sessionData.id,
      idMateria: '',
    };

    if (taskType === 'task') {
      await Catalogs.postTareas(opts);
    } else {
      await Catalogs.postAviso(opts);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView className="mx-6 h-full mt-2">
          {/* Encabezado */}
          <View className="mb-6">
            <Text className="text-2xl font-semibold">Hola, {sessionData.nombre}</Text>
            <Text className="text-lg text-gray-500">Bienvenido</Text>
          </View>

          {/* Menú de opciones */}
          <View className="flex-row justify-between mb-8">
            {[
              {
                name: "Tareas",
                icon: "book-outline" as "book-outline",
                color: "bg-blue-600",
                textColor: "text-blue-500",
                path: "/tareas",
              },
              {
                name: "Recursos académicos",
                icon: "library-outline" as "library-outline",
                color: "bg-indigo-600",
                textColor: "text-indigo-500",
                path: "/recursos",
              },
              {
                name: "Calificaciones",
                icon: "school-outline" as "school-outline",
                color: "bg-yellow-600",
                textColor: "text-yellow-500",
                path: "/calificaciones",
              },
              {
                name: "Encuestas",
                icon: "checkbox-outline" as "checkmark-circle-outline",
                color: "bg-green-600",
                textColor: "text-green-500",
                path: "/encuestas",
              },
            ].map((item, index) => (
              <View key={index} className="items-center w-1/5 mx-1">
                <TouchableOpacity
                  className={`items-center justify-center ${item.color} rounded-3xl p-4`}
                  onPress={() => router.push(item.path as any)}
                >
                  <Ionicons name={item.icon} size={24} color="white" />
                </TouchableOpacity>
                <Text
                  className={`text-center text-xs font-semibold mt-2 ${item.textColor} `}
                >
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Grupos */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-4">Materias</Text>
            <ScrollView horizontal className="flex-row">
              {materias.map(({ materia, grupo, tarea = {} }, index) => (
                <TouchableOpacity
                  key={index}
                  className="rounded-lg shadow-lg p-4 mr-4 bg-white w-50"
                >
                  <Text className="text-gray-800 font-semibold mb-1">
                    {materia}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Grupo: {grupo.nombre}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Última tarea: {tarea.titulo || 'Sin tareas'}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Fecha de entrega: {Utils.getFormatRemainingTime(tarea.fechaVencimiento)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Crear Nueva Tarea o Aviso */}
          <View className="bg-white p-4 rounded-lg mb-8">
            <Text className="text-lg font-semibold mb-4">Crear nueva</Text>

            {/* Selección de tipo de publicación */}
            <View className="flex-row mb-4">
              <View className="flex-row items-center mr-4">
                <RadioButton
                  value="task"
                  status={taskType === "task" ? "checked" : "unchecked"}
                  onPress={() => setTaskType("task")}
                />
                <Text>Tarea</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton
                  value="notice"
                  status={taskType === "notice" ? "checked" : "unchecked"}
                  onPress={() => setTaskType("notice")}
                />
                <Text>Aviso</Text>
              </View>
            </View>

            {/* Selección de grupo */}
            <View className="mb-4">
              <Text className="font-semibold mb-2">Seleccionar grupo:</Text>
              <ScrollView horizontal className="flex-row">
                {[{ nombre: 'Todos', id: 'todos'}, ...grupos].map(
                  ({nombre, id}, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedGroup(id)}
                      className={`border ${
                        selectedGroup === id
                          ? "border-orange-500"
                          : "border-gray-300"
                      } px-3 py-1 rounded-full mr-2`}
                    >
                      <Text
                        className={
                          selectedGroup === id
                            ? "text-orange-500"
                            : "text-gray-600"
                        }
                      >
                        {nombre}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>

            <Text className="text-lg font-semibold text-left mb-2">
              Título
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg w-full p-0 mb-4 bg-gray-50"
              value={titulo}
              onChangeText={setTitulo}
            />

            {
              (taskType === 'task') && (
                <>
                  <Text className="text-lg font-semibold text-left mb-2">
                    Fecha de vencimiento
                  </Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 bg-gray-50"
                    onPress={handleOpenDatePicker}
                  >
                    <Text>{Utils.formatDate(fechaVencimiento, { format: 'dd/mm/yyyy hh:mm' })}</Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirmDate}
                    onCancel={handleCloseDatePicker}
                  />
                </>
              )
            }

              <Text className="text-lg font-semibold text-left mb-2">
                Descripcion
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg w-full px-4 p-2 mb-3 bg-gray-50"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
              />

            {/* <View className="flex-row justify-between mb-4">
              <Ionicons name="attach" size={24} color="gray" />
              <Ionicons name="camera-outline" size={24} color="gray" />
              <Ionicons name="image-outline" size={24} color="gray" />
              <Ionicons name="document-outline" size={24} color="gray" />
              <Ionicons name="person-outline" size={24} color="gray" />
            </View> */}

            <TouchableOpacity className="bg-orange-500 py-3 rounded-lg" onPress={sendData}>
              <Text className="text-white text-center font-semibold">
                {taskType === "task" ? "Subir tarea" : "Publicar aviso"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tarea reciente */}
          {/* <View className="flex-row items-center bg-white p-4 rounded-lg mb-4">
            <Text className="bg-green-100 text-green-600 px-2 py-1 rounded-full mr-3">
              New
            </Text>
            <View className="flex-1">
              <Text className="text-gray-700">
                Sint ex excepteur proident adipisicing adipisicing occaecat
                pariatur.
              </Text>
              <Text className="text-gray-400 text-xs">Today · 4 comments</Text>
            </View>
          </View> */}

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeProfesor;
