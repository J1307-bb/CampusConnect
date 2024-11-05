import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tw from 'tailwind-react-native-classnames';
import Http from '@/services/Http';
import Utils from '@/services/Utils';
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";

function Registro() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [matricula, setMatricula] = useState("");
  const [genero, setGenero] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  const [turno, setTurno] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);
  const [isTurnoModalVisible, setIsTurnoModalVisible] = useState(false);

    /* const { setUser, setIsLogged } = useGlobalContext(); */
  
    const [isSubmitting, setSubmitting] = useState(false);
  
  
    /* const handleRegister = async () => {
      if (fullName === "" || email === "" || password === "" || phone === "" || matricula === "" || genero === "" || tipoSangre === "" || turno === "") {
        if (isChecked === false) {
          Alert.alert("Error", "Favor de aceptar los términos y condiciones");
          return;
        }
        Alert.alert("Error", "Favor de llenar todos los campos");
      }
  
      setSubmitting(true);
      try {
        const result = await createUser(email, password, fullName);
        setUser(result);
        setIsLogged(true);
  
        router.replace("/(auth)/iniciar-sesion");
      } catch (error: any) {
        Alert.alert("Error", error.message);
        
      } finally {
        setSubmitting(false);
      }
    }; */

  const handleRegister = async () => {
    const formData = {
      nombre: firstName,
      apellidos: lastName,
      correo: email,
      contrasenia: password,
      telefono: phone,
      fechaNacimiento: Utils.formatDate(String(date)),
      alergias: (allergies || "").split(","),
      genero,
      turno,
      matricula,
    }

    try {
      const { data } = await Http.post("/register", formData);

      if (data.id) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        router.replace("/(auth)/iniciar-sesion");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    handleCloseDatePicker();
  };

  const toggleGenderModal = () => {
    setIsGenderModalVisible(!isGenderModalVisible);
  };

  const toggleBloodTypeModal = () => {
    setIsBloodTypeModalVisible(!isBloodTypeModalVisible);
  };

  const toggleTurnoModal = () => {
    setIsTurnoModalVisible(!isTurnoModalVisible);
  };

  const selectGender = (gender: string) => {
    setGenero(gender);
    toggleGenderModal();
  };

  const selectBloodType = (type: React.SetStateAction<string>) => {
    setTipoSangre(type);
    toggleBloodTypeModal();
  };

  const selectTurno = (shift: string) => {
    setTurno(shift);
    toggleTurnoModal();
  };

  const genderOptions = ["Mujer", "Hombre", "Prefiero no especificarlo"];
  const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const turnoOptions = ["Matutino", "Vespertino"];

  return (
    <SafeAreaView>
      <ScrollView className="flex">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold mb-4">Regístrate</Text>
          <Text className="text-sm text-gray-500 mb-2">
            ¡Regístrate ahora y gestiona tus horarios, tareas y calificaciones!
            Explora el campus, consulta rutas de transporte y participa en
            encuestas en vivo, todo desde tu móvil.
          </Text>

          <View className="border-b border-gray-300 my-4" />

          <Text className="text-lg font-semibold text-left mb-2">
            Nombre(s)
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text className="text-lg font-semibold text-left mb-2">
            Apellido(s)
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
          />

          <Text className="text-lg font-semibold text-left mb-2">
            Correo Institucional
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Example@utcancun.edu.mx"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-lg font-semibold text-left mb-2">
            Matrícula
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Matrícula"
            value={matricula}
            onChangeText={setMatricula}
          />

          <Text className="text-lg font-semibold text-left mb-2">
            Contraseña
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text className="text-lg font-semibold text-left mb-2">
            Número de teléfono
          </Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Número de teléfono"
            value={phone}
            onChangeText={setPhone}
          />

          <Text className="text-lg font-semibold text-left mb-2">Turno</Text>
          <TouchableOpacity
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between"
            onPress={toggleTurnoModal}
          >
            <Text className="text-gray-700">
              {turno || "Selecciona tu turno"}
            </Text>
            <Text className="text-gray-700">⌵</Text>
          </TouchableOpacity>

          <Modal
            visible={isTurnoModalVisible}
            transparent={true}
            animationType="slide"
          >
            <TouchableOpacity
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
              onPress={toggleTurnoModal}
            >
              <View className="bg-white rounded-lg w-5/6 p-4">
                <FlatList
                  data={turnoOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-4 border-b border-gray-200"
                      onPress={() => selectTurno(item)}
                    >
                      <Text className="text-lg text-gray-700">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <Text className="text-lg font-semibold text-left mb-2">
            Fecha de nacimiento
          </Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 bg-gray-50"
            onPress={handleOpenDatePicker}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            maximumDate={new Date(2023, 11, 31)}
            onConfirm={handleConfirmDate}
            onCancel={handleCloseDatePicker}
          />

          <Text className="text-lg font-semibold text-left mb-2">Alergias</Text>
          <TextInput
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4"
            placeholder="Medicamentos/Alimentos separados por comas(,)"
            value={allergies}
            onChangeText={setAllergies}
          />

          <Text className="text-lg font-semibold text-left mb-2">Género</Text>
          <TouchableOpacity
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between"
            onPress={toggleGenderModal}
          >
            <Text className="text-gray-700"
            >
              {genero || "Selecciona tu género"}
            </Text>
            <Text className="text-gray-700">⌵</Text>
          </TouchableOpacity>

          <Modal
            visible={isGenderModalVisible}
            transparent={true}
            animationType="slide"
          >
            <TouchableOpacity
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
              onPress={toggleGenderModal}
            >
              <View className="bg-white rounded-lg w-5/6 p-4">
                <FlatList
                  data={genderOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-4 border-b border-gray-200"
                      onPress={() => selectGender(item)}
                    >
                      <Text className="text-lg text-gray-700">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <Text className="text-lg font-semibold text-left mb-2">
            Tipo de sangre
          </Text>
          <TouchableOpacity
            className="border bg-white border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between"
            onPress={toggleBloodTypeModal}
          >
            <Text className="text-gray-700">
              {tipoSangre || "Selecciona tu tipo de sangre"}
            </Text>
            <Text className="text-gray-700">⌵</Text>
          </TouchableOpacity>

          <Modal
            visible={isBloodTypeModalVisible}
            transparent={true}
            animationType="slide"
          >
            <TouchableOpacity
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
              onPress={toggleBloodTypeModal}
            >
              <View className="bg-white rounded-lg w-5/6 p-4">
                <FlatList
                  data={bloodTypeOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-4 border-b border-gray-200"
                      onPress={() => selectBloodType(item)}
                    >
                      <Text className="text-lg text-gray-700">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => setIsChecked(!isChecked)}
          >
            <View
              className={`w-5 h-5 rounded border border-gray-400 mr-2 my-3 mx-3 ${
                isChecked ? "bg-yellow-500" : ""
              } `}
            />
            <Text className="text-sm">
              Acepto los <Text className="text-yellow-500">Terminos y Condiciones</Text>{" "}
              de la compañia.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary-100 rounded-lg p-4"
            onPress={handleRegister}
          >
            <Text className="text-center text-white text-lg">Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Registro;
