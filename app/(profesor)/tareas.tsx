import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";

import Cache from "@/services/Cache";
import Catalogs from "@/services/Catalogs";
import NotificationService from "@/services/Notifications";
import Utils from "@/services/Utils";

const AgregarTarea = () => {
  const [selectedGroup, setSelectedGroup] = useState("todos");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [tareas, setTareas] = useState([
    {
      id: '',
      idGrupo: "",
      grupo: {
        nombre: "",
      },
      titulo: "",
      fechaVencimiento: "",
    },
  ]);
  const [grupos, setGrupos] = useState([
    {
      nombre: '',
      id: '',
    }
  ]);
  const [sessionData, setSessionData] = useState({
    id: '',
  });

  useEffect(() => {
    NotificationService.setNotificationListener();

    const fetchData = async () => {
      try {
        const [gruposData, tareasData, sessionData] = await Promise.all([
          await Cache.getData("gruposAsignados"),
          await Catalogs.getTareasCreadas(),
          await Cache.getData("sessionData"),
        ]);

        setGrupos([{ nombre: 'Todos', id: 'todos' }, ...gruposData]);
        setTareas(tareasData);
        setSessionData(sessionData);
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

    await Catalogs.postTareas(opts);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView className="mx-6">

          {/* Filtro de Grupos */}
          <View className="mb-6">
            <Text className="font-semibold mb-2">Seleccionar grupo:</Text>
            <ScrollView horizontal className="flex-row">
              {grupos.map(({ id, nombre }) => (
                  <TouchableOpacity
                    key={id}
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

          {/* Lista de Tareas */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">Tareas:</Text>
            {tareas
              .filter((tarea) => selectedGroup === "todos" || tarea.idGrupo === selectedGroup)
              .map(({ id, titulo, fechaVencimiento, grupo = {}}) => (
                <View
                  key={id}
                  className="flex-row items-center bg-white p-4 rounded-lg mb-4"
                >
                  <View className="flex-1">
                    <Text className="text-gray-800 font-semibold">
                      {titulo}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      Grupo: {grupo.nombre}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      Fecha de entrega: {Utils.getFormatRemainingTime(fechaVencimiento)}
                    </Text>
                    {/* <Text
                      className={`text-sm ${
                        task.status === "Pendiente"
                          ? "text-red-500"
                          : task.status === "En Progreso"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.status}
                    </Text> */}
                  </View>
                </View>
              ))}
          </View>

          {/* Crear Nueva Tarea */}
          <View className="bg-white p-4 rounded-lg mb-8">
            <Text className="text-lg font-semibold mb-4">
              Crear nueva tarea
            </Text>

            {/* Selección de grupo */}
            <View className="mb-4">
              <Text className="font-semibold mb-2">Seleccionar grupo:</Text>
              <ScrollView horizontal className="flex-row">
                {grupos.map(
                  ({ id, nombre }) => (
                    <TouchableOpacity
                      key={id}
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

            <TextInput
              className="bg-white border border-orange-300 rounded-lg  mb-2 text-gray-700"
              placeholder="Título de la tarea..."
              numberOfLines={1}
              activeUnderlineColor="orange"
            />

            <TextInput
              className="bg-white border border-orange-300 rounded-lg p-1 mb-4 text-gray-700"
              placeholder="Descripción..."
              multiline
              activeUnderlineColor="orange"
            />

            <TouchableOpacity className="bg-orange-500 py-3 rounded-lg" onPress={sendData}>
              <Text className="text-white text-center font-semibold">
                Crear Tarea
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AgregarTarea;
