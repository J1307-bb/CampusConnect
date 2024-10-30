import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfesorLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="inicio"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tareas"
          options={{
            headerShown: true,
            headerBackTitle: "Atrás",
            title: "Tareas Asignadas",
          }}
        />
        <Stack.Screen
          name="calificaciones"
          options={{
            headerShown: true,
            headerBackTitle: "Atrás",
            title: "Calificaciones",
          }}
        />
        <Stack.Screen
          name="recursos"
          options={{
            headerShown: true,
            headerBackTitle: "Atrás",
            title: "Recursos Académicos",
          }}
        />
        <Stack.Screen
          name="encuestas"
          options={{
            headerShown: true,
            headerBackTitle: "Atrás",
            title: "Encuestas",
          }}
        />

      </Stack>
    </>
  )
}

export default ProfesorLayout