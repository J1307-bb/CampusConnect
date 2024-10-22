import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useRouter } from 'expo-router'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter(); 

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={tw`flex-1 bg-white justify-center items-center h-full w-full px-5`}> 
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <Image
                source={require('../assets/images/icon.png')} 
                style={tw`w-36 h-36 mb-4`} 
            />

            <Text style={tw`text-3xl font-bold mb-6 text-gray-900`}>CAMPUSCONNECT</Text>

            <Text style={tw`text-lg font-semibold mb-2 text-gray-700 text-left w-full`}>Correo electrónico</Text>
            <TextInput
                style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                keyboardType="email-address"
                placeholder="example@utcancun.edu.mx"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={tw`text-lg font-semibold mb-2 text-gray-700 text-left w-full`}>Contraseña</Text>
            <TextInput
                style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-6`}
                secureTextEntry
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={tw`bg-yellow-500 w-full rounded-lg p-3 mb-4`}
                onPress={handleLogin}
            >
                <Text style={tw`text-center text-white text-lg`}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/recuperar')} >
                <Text style={tw`text-blue-500 text-sm`}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={tw`mt-6`} 
                onPress={() => router.push('/Registro')} 
            >
                <Text style={tw`text-gray-700 text-sm`}>
                    ¿No tienes cuenta?{' '}
                    <Text style={tw`text-blue-500`}>Regístrate aquí</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
