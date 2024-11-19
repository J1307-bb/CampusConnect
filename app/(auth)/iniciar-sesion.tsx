import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router, useRouter } from "expo-router";
import Images from "@/constants/Images";
import { useGlobalContext } from "@/context/GlobalProvider";
import Session from "@/services/Session";
import Cache from "@/services/Cache";
import Http from "@/services/Http";
import * as Sentry from "@sentry/react-native";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* const { setUser, setIsLogged } = useGlobalContext(); */
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    Sentry.nativeCrash();
    // const { data = {} } = await Http.post('/login', { correo: email, contrasenia: password });

    // if (data.token) {
    //     await Session.setSessionData(data.token);
    //     await Session.setAccessToken(data.token);
    //     await Cache.loadCatalogs();
    //     router.push("/(tabs)");
    // } else {
    //     console.log('Error al iniciar sesión');
    // }
  };

  /* const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Favor de llenar todos los campos");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(email, password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("¡Bienvenido!", "Inicio de sesión exitoso");
      router.replace("/(tabs)" as any);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  }; */


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View className="flex justify-center items-center h-full w-full px-5">
  
          <Image
            source={Images.logo}
            className="w-36 h-36 mb-4"
          />
  
          <Text className="text-3xl font-bold mb-6 text-gray-900">
            CAMPUSCONNECT
          </Text>
  
          <Text className="text-lg font-semibold mb-2 text-gray-700 text-left w-full">
            Correo electrónico
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            keyboardType="email-address"
            placeholder="example@utcancun.edu.mx"
            value={email}
            onChangeText={setEmail}
          />
  
          <Text className="text-lg font-semibold mb-2 text-gray-700 text-left w-full">
            Contraseña
          </Text>
          <TextInput
            className=" bg-white border border-gray-300 rounded-lg w-full px-4 py-3 mb-6"
            secureTextEntry
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
          />
  
          <TouchableOpacity
            className="bg-secondary-100 w-full rounded-lg p-3 mb-4"
            onPress={handleLogin}
            onLongPress={() => router.push("/inicio" as any)}
          >
            <Text className="text-center text-white text-lg">Ingresar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => router.push("/recuperar" as any)}>
            <Text className="text-blue-500 text-sm">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.push("/registrarse")}
          >
            <Text className="text-gray-700 text-sm">
              ¿No tienes cuenta?{" "}
              <Text className="text-blue-500">Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default IniciarSesion;
