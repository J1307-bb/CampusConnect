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
      </Stack>
    </>
  )
}

export default ProfesorLayout