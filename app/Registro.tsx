import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function Registro() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [matricula, setMatricula] = useState('');
    const [genero, setGenero] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [turno, setTurno] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
    const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);
    const [isTurnoModalVisible, setIsTurnoModalVisible] = useState(false);

    const handleRegister = () => {
        console.log('Registro completado');
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
        <ScrollView style={tw`flex-1 bg-white`}>
            <View style={tw`px-4 py-6`}>
                <Text style={tw`text-2xl font-bold mb-4`}>Regístrate</Text>
                <Text style={tw`text-sm text-gray-500 mb-4`}>
                    ¡Regístrate ahora y gestiona tus horarios, tareas y calificaciones! Explora el campus, consulta rutas de transporte y participa en encuestas en vivo, todo desde tu móvil.
                </Text>

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Nombre completo</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Nombre completo"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Correo Institucional</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Example@utcancun.edu.mx"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Contraseña</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Número de teléfono</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Número de teléfono"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Turno</Text>
                <TouchableOpacity
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between`}
                    onPress={toggleTurnoModal}
                >
                    <Text style={tw`text-gray-700`}>
                        {turno || "Selecciona tu turno"}
                    </Text>
                    <Text style={tw`text-gray-700`}>⌵</Text>
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
                        <View style={tw`bg-white rounded-lg w-5/6 p-4`}>
                            <FlatList
                                data={turnoOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={tw`p-4 border-b border-gray-200`}
                                        onPress={() => selectTurno(item)}
                                    >
                                        <Text style={tw`text-lg text-gray-700`}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Fecha de nacimiento</Text>
                <TouchableOpacity
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 bg-gray-50`}
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

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Matrícula</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Matrícula"
                    value={matricula}
                    onChangeText={setMatricula}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Alergias</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Medicamentos/Alimentos"
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Matrícula</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Matrícula"
                    value={matricula}
                    onChangeText={setMatricula}
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Alergias</Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4`}
                    placeholder="Medicamentos/Alimentos"
                />

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Género</Text>
                <TouchableOpacity
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between`}
                    onPress={toggleGenderModal}
                >
                    <Text style={tw`text-gray-700`}>
                        {genero || "Selecciona tu género"}
                    </Text>
                    <Text style={tw`text-gray-700`}>⌵</Text>
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
                        <View style={tw`bg-white rounded-lg w-5/6 p-4`}>
                            <FlatList
                                data={genderOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={tw`p-4 border-b border-gray-200`}
                                        onPress={() => selectGender(item)}
                                    >
                                        <Text style={tw`text-lg text-gray-700`}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                <Text style={tw`text-lg font-semibold text-left mb-2`}>Tipo de sangre</Text>
                <TouchableOpacity
                    style={tw`border border-gray-300 rounded-lg w-full px-4 py-3 mb-4 flex-row justify-between`}
                    onPress={toggleBloodTypeModal}
                >
                    <Text style={tw`text-gray-700`}>
                        {tipoSangre || "Selecciona tu tipo de sangre"}
                    </Text>
                    <Text style={tw`text-gray-700`}>⌵</Text>
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
                        <View style={tw`bg-white rounded-lg w-5/6 p-4`}>
                            <FlatList
                                data={bloodTypeOptions}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={tw`p-4 border-b border-gray-200`}
                                        onPress={() => selectBloodType(item)}
                                    >
                                        <Text style={tw`text-lg text-gray-700`}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                <TouchableOpacity
                    style={tw`flex-row items-center mb-4`}
                    onPress={() => setIsChecked(!isChecked)}
                >
                    <View
                        style={[
                            tw`w-5 h-5 rounded border border-gray-400 mr-2`,
                            isChecked && tw`bg-yellow-500`,
                        ]}
                    />
                    <Text style={tw`text-sm`}>
                        I hereby accept the <Text style={tw`text-yellow-500`}>T&C</Text> of the company
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`bg-yellow-500 rounded-lg p-4`}
                    onPress={handleRegister}
                >
                    <Text style={tw`text-center text-white text-lg`}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Registro;
