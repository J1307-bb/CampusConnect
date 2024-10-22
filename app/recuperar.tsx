import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useRouter } from 'expo-router';

export default function Recuperar() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePasswordReset = () => {
    // lógica para enviar el correo de recuperación.
    setMessage('Se han enviado instrucciones a su correo electrónico.');
    // lógica para enviar un correo de recuperación.
  };

  return (
    <View style={tw`flex-1 bg-white justify-center items-center h-full w-full px-5`}> 
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Text style={tw`text-3xl font-bold mb-6 text-gray-900`}>Recuperar Contraseña</Text>

      <Text style={tw`text-lg font-semibold mb-2 text-gray-700 text-left w-full`}>Correo Electrónico</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
        keyboardType="email-address"
        placeholder="example@utcancun.edu.mx"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={tw`bg-yellow-500 w-full rounded-lg p-3 mb-4`}
        onPress={handlePasswordReset}
      >
        <Text style={tw`text-center text-white text-lg`}>Recuperar Contraseña</Text>
      </TouchableOpacity>

      {message !== '' && (
        <Text style={tw`text-green-500 text-sm text-center mt-4`}>{message}</Text>
      )}

      <TouchableOpacity 
        style={tw`mt-6`} 
        onPress={() => router.push('/Login')}
      >
        <Text style={tw`text-gray-700 text-sm`}>
          ¿Ya tienes cuenta?{' '}
          <Text style={tw`text-blue-500`}>Inicia sesión aquí</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
