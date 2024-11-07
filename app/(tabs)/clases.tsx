import { AnimatedMateriaCard } from "@/components/cards/MateriaCard";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Screen from "@/components/Screen";
import { useState, useEffect } from "react";
import IMateria from "@/interfaces/IMateria";
import Catalogs from "@/services/Catalogs";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function ClasesTab() {
  const [searchText, setSearchText] = useState("");
  const [materias, setMaterias] = useState<IMateria[]>([]);

  const getData = async () => {
    const materiasData: any = await Catalogs.getMaterias();

    setMaterias(materiasData);
  }

  useEffect(() => {
    getData();
  }, []);
  // Filtro de clases por búsqueda
  const filteredClasses = materias.filter((cls) =>
    cls.materia?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Screen title={"Clases"}>
      {/* Barra de búsqueda */}
      <View className="flex-row items-center bg-white mx-4 mt-4 p-3 rounded-lg">
        <TabBarIcon name="search" size={24} color="gray" />
        <TextInput
          className="ml-2 flex-1 justify-center items-center"
          placeholderTextColor={"gray"}
          placeholder="Buscar"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Lista de clases */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AnimatedMateriaCard materia={item} index={index} />
        )}
        className="mt-4 w-full px-6"
      />
    </Screen>
  );
}
