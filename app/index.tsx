import CustomButton from "@/components/CustomButton";
import Screen from "@/components/Screen";
import { Link, Redirect, router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Images from "@/constants/Images";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import Cache from "@/services/Cache";
function Bienvenida() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { esProfesor, id } = await Cache.getData("sessionData") || {};

        if (!id) return;

        if (esProfesor) {
          router.push("/inicio" as any);
        } else {
          router.push("/(tabs)" as any);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  /* const { loading, isLogged } = useGlobalContext(); */

  /* if (!loading && isLogged) return <Redirect href='/(tabs)' />; */

  /* useEffect(() => {
    signOut()
  }, []); */

    return ( 
        <SafeAreaView className="bg-white h-full">
        {/* <Loader isLoading={loading} /> */}
  
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center h-full px-4">
            <Image
              source={Images.logo}
              className="w-[260px] h-[200px]"
              resizeMode="center"
            />
  
            <Image
              source={Images.imagenBienvenida}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />
  
            <View className="relative mt-5">
              <Text className="text-3xl text-black font-bold text-center">
              Tu experiencia académica simplificada: Horarios, tareas,{"\n"}
                calificaciones y mucho más en{" "}
                <Text className="text-secondary-200">Campus Connect</Text>
              </Text>
  
              <Image
                source={Images.path}
                className="w-[200px] h-[15px] absolute -bottom-3 right-20"
                resizeMode="stretch"
              />
            </View>

           <CustomButton
              title="Iniciar Sesión"
              handlePress={() => router.push("/iniciar-sesion" as any)}
              containerStyles="w-full mt-10"
            />

            {/* <CustomButton
              title="Iniciar Sesión"
              handlePress={() => router.push("/inicio" as any)}
              containerStyles="w-full mt-10"
            /> */}
  
            {/* <Text className="text-sm font-pregular text-gray-400 mt-5 text-center">
            Organiza tus clases, consulta tus calificaciones y explora recursos académicos con Campus Connect.
            </Text>  */}
  
          </View>
        </ScrollView>
  
        {/* <StatusBar backgroundColor="#161622" style="light" /> */}
      </SafeAreaView>
     );
}

export default Bienvenida;