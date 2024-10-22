import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const IniciarSesiom = () => {
  return (
    <SafeAreaView>
      <View className='flex justify-center items-center bg-gradient-to-r from-teal-400 to-blue-500 w-full h-full '> 
        <Text className='text-2xl text-black'>Iniciar Sesion</Text>

        <CustomButton
              title="Inicio"
              handlePress={() => router.push("/(tabs)")}
              containerStyles="w-full mt-10"
            />
      </View>
    </SafeAreaView>
  )
}

export default IniciarSesiom