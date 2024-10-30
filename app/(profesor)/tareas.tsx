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
import { TextInput } from "react-native-paper";

const AgregarTarea = () => {
  const [selectedGroup, setSelectedGroup] = useState("Todos");
  const [tasks, setTasks] = useState([
    {
      group: "IDYGS101",
      title: "Tarea de matemáticas",
      dueDate: "Mañana",
      status: "Pendiente",
    },
    {
      group: "IDYGS102",
      title: "Proyecto de ciencias",
      dueDate: "En 2 días",
      status: "En Progreso",
    },
    {
      group: "IDYGS103",
      title: "Tarea de historia",
      dueDate: "Hoy",
      status: "Completada",
    },
  ]);

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
              {["Todos", "IDYGS101", "IDYGS102", "IDYGS103"].map(
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

          {/* Lista de Tareas */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4">Tareas:</Text>
            {tasks
              .filter(
                (task) =>
                  selectedGroup === "Todos" || task.group === selectedGroup
              )
              .map((task, index) => (
                <View
                  key={index}
                  className="flex-row items-center bg-white p-4 rounded-lg mb-4"
                >
                  <View className="flex-1">
                    <Text className="text-gray-800 font-semibold">
                      {task.title}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      Grupo: {task.group}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      Fecha de entrega: {task.dueDate}
                    </Text>
                    <Text
                      className={`text-sm ${
                        task.status === "Pendiente"
                          ? "text-red-500"
                          : task.status === "En Progreso"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.status}
                    </Text>
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

            <TouchableOpacity className="bg-orange-500 py-3 rounded-lg">
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
