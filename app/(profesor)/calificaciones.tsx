import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import NotificationService from "@/services/Notifications";
import Cache from "@/services/Cache";

const GradesView = () => {
  const [selectedClass, setSelectedClass] = useState("IDYGS-101");
  const [selectedUnit, setSelectedUnit] = useState("Unidad 1");
  const [classModalVisible, setClassModalVisible] = useState(false);
  const [unitModalVisible, setUnitModalVisible] = useState(false);
  const [gradeModalVisible, setGradeModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({ nombre: "", id: "" });
  const [newGrade, setNewGrade] = useState("");

  const [grupos, setGrupos] = useState([{ nombre: '', id: '' }]);
  const [estudiantes, setEstudiantes] = useState([{ nombre: '', id: '' }]);
  const [materias, setMaterias] = useState([{ nombre: '', id: '' }]);

  const units = ["Unidad 1", "Unidad 2", "Unidad 3"];

  useEffect(() => {
    NotificationService.setNotificationListener();

    const fetchData = async () => {
      try {
        const [gruposData, estudiantesData, materiasData] = await Promise.all([
          await Cache.getData("gruposAsignados"),
          await Cache.getData("estudiantesAsignados"),
          await Cache.getData("materiasAsignadas"),
        ]);

        setGrupos(gruposData);
        setEstudiantes(estudiantesData);
        setMaterias(materiasData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleGradeSubmit = () => {
    if (selectedStudent) {
      setEstudiantes((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, calificacion: newGrade } : student
        )
      );
      setGradeModalVisible(false);
      setNewGrade("");
    }
  };

  const selectGroup = async (idGroup: string) => {
    console.log(idGroup);
    setClassModalVisible(false);
  };

  const renderStudentItem = ({ item }: any) => (
    <TouchableOpacity
      className={`flex-row justify-between items-center bg-[#EDF1EF] p-4 mb-2 rounded-lg `}
      onPress={() => {
        setSelectedStudent(item);
        setGradeModalVisible(true);
      }}
    >
      <View>
        <Text style={tw`text-gray-800 font-semibold`}>{item.nombre}</Text>
        <Text style={tw`text-gray-500`}>{item.matricula}</Text>
      </View>
      <Text style={tw`text-gray-500`}>{item.calificacion ? `${item.calificacion} / 100` : "Sin calificación" }</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-6`}>
        {/* Seleccionar Clase */}
        <View style={tw`flex-row items-center mb-6`}>
          <Text style={tw`text-lg font-semibold mr-3`}>Seleccionar clase:</Text>
          <TouchableOpacity
            onPress={() => setClassModalVisible(true)}
            className={`flex-row items-center border border-orange-300 bg-orange-300/50 rounded-full px-4 py-2`}
          >
            <Text className={`text-black font-semibold mr-2`}>
              {selectedClass}
            </Text>
            <Icon name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Seleccionar Unidad */}
        <View style={tw`flex-row items-center mb-6`}>
          <Text style={tw`text-lg font-semibold mr-3`}>
            Seleccionar unidad:
          </Text>
          <TouchableOpacity
            onPress={() => setUnitModalVisible(true)}
            className={`flex-row items-center border border-orange-300 bg-orange-300/50 rounded-full px-4 py-2`}
          >
            <Text style={tw`text-black font-semibold mr-2`}>
              {selectedUnit}
            </Text>
            <Icon name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Listado de Alumnos */}
        <Text style={tw`text-xl font-bold mb-4 text-gray-900`}>Alumnos:</Text>
        <FlatList
          data={estudiantes}
          keyExtractor={(item) => item.id}
          renderItem={renderStudentItem}
          contentContainerStyle={tw`w-full h-full`}
        />
      </View>

      {/* Modal Seleccionar Clase */}
      <Modal
        visible={classModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4 text-gray-900`}>
              Selecciona un grupo
            </Text>
            {grupos.map(({ id, nombre}) => (
              <TouchableOpacity
                key={id}
                onPress={() => { selectGroup(id); }}
                style={tw`py-3 border-b border-gray-300`}
              >
                <Text style={tw`text-gray-800`}>{nombre}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setClassModalVisible(false)}
              style={tw`mt-6 p-3 bg-red-600 rounded-lg`}
            >
              <Text style={tw`text-white text-center font-bold`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Seleccionar Unidad */}
      <Modal
        visible={unitModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4 text-gray-900`}>
              Selecciona una unidad
            </Text>
            {units.map((unit, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedUnit(unit);
                  setUnitModalVisible(false);
                }}
                style={tw`py-3 border-b border-gray-300`}
              >
                <Text style={tw`text-gray-800`}>{unit}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setUnitModalVisible(false)}
              style={tw`mt-6 p-3 bg-red-600 rounded-lg`}
            >
              <Text style={tw`text-white text-center font-bold`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Asignar Calificación */}
      <Modal
        visible={gradeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4 text-gray-900`}>
              Asignar calificación a {selectedStudent?.nombre}
            </Text>
            <TextInput
              style={tw`border border-gray-300 p-3 rounded-lg mb-4`}
              placeholder="Ingresa la calificación"
              value={newGrade}
              onChangeText={setNewGrade}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={handleGradeSubmit}
              style={tw`p-3 bg-green-600 rounded-lg mb-4`}
            >
              <Text style={tw`text-white text-center font-bold`}>
                Asignar Calificación
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGradeModalVisible(false)}
              style={tw`p-3 bg-red-600 rounded-lg`}
            >
              <Text style={tw`text-white text-center font-bold`}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GradesView;
