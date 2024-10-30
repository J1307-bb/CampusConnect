import React, { useState } from "react";
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

interface Student {
  id: number;
  name: string;
  grade: string;
  matricula: string;
}

const GradesView = () => {
  const [selectedClass, setSelectedClass] = useState("IDYGS-101");
  const [selectedUnit, setSelectedUnit] = useState("Unidad 1");
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [isUnitModalVisible, setUnitModalVisible] = useState(false);
  const [isGradeModalVisible, setGradeModalVisible] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Abril Adame Guzmán", matricula: "21393102", grade: "" },
    {
      id: 2,
      name: "Erick Yahir Cauich Chan",
      matricula: "21839381",
      grade: "",
    },
    {
      id: 3,
      name: "Edgar Jair Badillo Bañuelos",
      matricula: "20393142",
      grade: "",
    },
    { id: 4, name: "Hector Omar", matricula: "21393102", grade: "" },
    { id: 5, name: "José Luis Pérez", matricula: "21393102", grade: "" },
    { id: 6, name: "María Fernanda García", matricula: "21393102", grade: "" },
    { id: 7, name: "Juan Pérez", matricula: "21393102", grade: "" },
  ]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newGrade, setNewGrade] = useState("");

  const classes = ["IDYGS-101", "IDYGS-102", "IDYGS-103", "Todos"];
  const units = ["Unidad 1", "Unidad 2", "Unidad 3"];

  const handleGradeSubmit = () => {
    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, grade: newGrade }
            : student
        )
      );
      setGradeModalVisible(false);
      setNewGrade("");
    }
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      className={`flex-row justify-between items-center bg-[#EDF1EF] p-4 mb-2 rounded-lg `}
      onPress={() => {
        setSelectedStudent(item);
        setGradeModalVisible(true);
      }}
    >
      <View>
        <Text style={tw`text-gray-800 font-semibold`}>{item.name}</Text>
        <Text style={tw`text-gray-500`}>{item.matricula}</Text>
      </View>
      <Text style={tw`text-gray-500`}>{item.grade ? `${item.grade} / 100` : "Sin calificación" }</Text>
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
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudentItem}
          contentContainerStyle={tw`w-full h-full`}
        />
      </View>

      {/* Modal Seleccionar Clase */}
      <Modal
        visible={isClassModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4 text-gray-900`}>
              Selecciona una clase
            </Text>
            {classes.map((cls, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedClass(cls);
                  setClassModalVisible(false);
                }}
                style={tw`py-3 border-b border-gray-300`}
              >
                <Text style={tw`text-gray-800`}>{cls}</Text>
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
        visible={isUnitModalVisible}
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
        visible={isGradeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4 text-gray-900`}>
              Asignar calificación a {selectedStudent?.name}
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
