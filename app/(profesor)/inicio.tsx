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
import { router } from "expo-router";

const HomeProfesor = () => {
  const [taskType, setTaskType] = useState("task");
  const [selectedGroup, setSelectedGroup] = useState("IDYGS101");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <ScrollView className="mx-6 h-full mt-2">
          {/* Encabezado */}
          <View className="mb-6">
            <Text className="text-2xl font-semibold">Hola, Jair</Text>
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
            <Text className="text-lg font-semibold mb-4">Grupos:</Text>
            <ScrollView horizontal className="flex-row">
              {[
                {
                  name: "3A",
                  recentTask: "Tarea de matemáticas",
                  dueDate: "Mañana",
                  color: "bg-blue-500",
                },
                {
                  name: "3B",
                  recentTask: "Proyecto de ciencias",
                  dueDate: "En 2 días",
                  color: "bg-yellow-500",
                },
                {
                  name: "3C",
                  recentTask: "Tarea de historia",
                  dueDate: "Hoy",
                  color: "bg-green-500",
                },
                {
                  name: "3D",
                  recentTask: "Práctica de inglés",
                  dueDate: "La próxima semana",
                  color: "bg-red-500",
                },
                {
                  name: "3E",
                  recentTask: "Ejercicio de física",
                  dueDate: "En 3 días",
                  color: "bg-indigo-500",
                },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="rounded-lg shadow-lg p-4 mr-4 bg-white w-40"
                >
                  <View
                    className={`h-10 w-10 ${item.color} rounded-full items-center justify-center mb-4`}
                  >
                    <Text className="text-white font-semibold">
                      {item.name}
                    </Text>
                  </View>
                  <Text className="text-gray-800 font-semibold mb-1">
                    {item.recentTask}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    Fecha de entrega: {item.dueDate}
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
                {["IDYGS101", "IDYGS102", "IDYGS103", "Todos"].map(
                  (group, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedGroup(group)}
                      className={`border ${
                        selectedGroup === group
                          ? "border-orange-500"
                          : "border-gray-300"
                      } px-3 py-1 rounded-full mr-2`}
                    >
                      <Text
                        className={
                          selectedGroup === group
                            ? "text-orange-500"
                            : "text-gray-600"
                        }
                      >
                        {group}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>

            <TextInput
              className="bg-white border border-orange-300 rounded-lg p-3 mb-4 text-gray-700"
              placeholder="Descripción..."
              multiline
            />

            <View className="flex-row justify-between mb-4">
              <Ionicons name="attach" size={24} color="gray" />
              <Ionicons name="camera-outline" size={24} color="gray" />
              <Ionicons name="image-outline" size={24} color="gray" />
              <Ionicons name="document-outline" size={24} color="gray" />
              <Ionicons name="person-outline" size={24} color="gray" />
            </View>

            <TouchableOpacity className="bg-orange-500 py-3 rounded-lg">
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
