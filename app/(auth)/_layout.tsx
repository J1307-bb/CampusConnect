import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Loader from "@/components/Loader";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="iniciar-sesion"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registrarse"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="recuperar"
          options={{
            headerTitle: "Recuperar Contraseña",
            headerBackTitle: "Atrás"
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};

export default AuthLayout;
