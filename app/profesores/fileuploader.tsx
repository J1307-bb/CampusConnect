import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, ProgressBarAndroid, Alert, SafeAreaView, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'tailwind-react-native-classnames';

interface File {
  id: number;
  name: string;
  type: string;
  size: string;
  status: 'ready' | 'uploading' | 'done';
  uploader: string;
}

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedClass, setSelectedClass] = useState('IDYGS101');
  const [isModalVisible, setModalVisible] = useState(false);

  const classes = ["Todos", "IDYS101", "IDYGS", "IDYGS102"];

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      console.log("Resultado de selección:", result);

      if (result && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newFile: File = {
          id: Date.now(),
          name: file.name || 'Sin nombre',
          type: file.type?.split('/')[1]?.toUpperCase() || 'UNKNOWN',
          size: file.size ? (file.size / 1024 / 1024).toFixed(1) : '0',
          status: 'ready',
          uploader: 'Usuario Desconocido',
        };

        setFiles((prevFiles) => [...prevFiles, newFile]);
      } else if (result && result.output && result.output.length > 0) {
        const file = result.output[0];
        const newFile: File = {
          id: Date.now(),
          name: file.name || 'Sin nombre',
          type: file.type?.split('/')[1]?.toUpperCase() || 'UNKNOWN',
          size: file.size ? (file.size / 1024 / 1024).toFixed(1) : '0',
          status: 'ready',
          uploader: 'Usuario Desconocido',
        };

        setFiles((prevFiles) => [...prevFiles, newFile]);
      } else if (result.type === 'cancel') {
        Alert.alert("No seleccionaste ningún archivo");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al intentar seleccionar un archivo.");
      console.log("Error al seleccionar archivo:", error);
    }
  };

  const renderItem = ({ item }: { item: File }) => {
    let iconName;
    let iconColor;
    switch (item.type) {
      case 'XLS':
        iconName = 'file-excel';
        iconColor = '#34A853';
        break;
      case 'JPG':
      case 'JPEG':
      case 'PNG':
        iconName = 'file-image';
        iconColor = '#4285F4';
        break;
      case 'CSV':
        iconName = 'file-delimited';
        iconColor = '#FBBC05';
        break;
      case 'PDF':
        iconName = 'file-pdf-box';
        iconColor = '#EA4335';
        break;
      default:
        iconName = 'file';
        iconColor = '#666';
    }

    return (
      <View style={tw`flex-row items-center justify-between py-3 border-b border-gray-200`}>
        <View style={tw`flex-row items-center`}>
          <Icon name={iconName} size={32} color={iconColor} style={tw`mr-4`} />
          <View>
            <Text style={tw`font-semibold text-sm`}>{item.name}</Text>
            <Text style={tw`text-gray-500 text-xs`}>{item.uploader}</Text>
            <Text style={tw`text-gray-500 text-xs`}>{item.size} MB</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-6`}>
        <View style={tw`flex-row items-center mb-6`}>
          <Text style={tw`text-lg font-semibold mr-3`}>Seleccionar clase:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`flex-row items-center bg-gray-200 rounded-full px-3 py-1`}>
            <Text style={tw`text-gray-700 mr-2`}>{selectedClass}</Text>
            <Icon name="chevron-down" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={tw`text-xl font-bold mb-4`}>Subir recursos académicos</Text>

        <TouchableOpacity onPress={selectFile} style={tw`mb-6 bg-gray-200 border-dashed border border-gray-400 rounded-lg p-6 items-center`}>
          <Icon name="upload" size={32} color="#666" style={tw`mb-2`} />
          <Text style={tw`text-gray-600`}>Elige un archivo o arrástralo aquí</Text>
        </TouchableOpacity>

        <FlatList
          data={files}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={tw`w-full`}
        />
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white mx-6 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-semibold mb-4`}>Selecciona una clase</Text>
            {classes.map((cls, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedClass(cls);
                  setModalVisible(false);
                }}
                style={tw`py-2 border-b border-gray-200`}
              >
                <Text style={tw`text-gray-700`}>{cls}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} className={`mt-4 p-2 bg-orange-400 rounded-lg`}>
              <Text style={tw`text-white text-center`}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FileUploader;
