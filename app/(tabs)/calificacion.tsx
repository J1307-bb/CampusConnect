import { useState, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SegmentedButtons, useTheme } from "react-native-paper";
import CalificacionesView from "@/screens/CalificacionesView";
import EncuestasView from "@/screens/EncuestasView";
import NotificationService from "@/services/Notifications";

export default function CalificacionTab() {
  const [isUnidadModalVisible, setIsUnidadModalVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("Calificaciones");
  const theme = useTheme();

  useEffect(() => {
    NotificationService.setNotificationListener();
  }, []);

  const toggleTurnoModal = () => {
    setIsUnidadModalVisible(!isUnidadModalVisible);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const sections = ["Calificaciones", "Encuestas"];

  return (
    <SafeAreaView>
      <View className="mx-6">
        <SegmentedButtons
          style={{ margin: 10 }}
          value={currentSection}
          onValueChange={handleSectionChange}
          buttons={sections.map((section) => ({
            value: section,
            label: section,
            style: {
              backgroundColor:
                currentSection === section
                  ? "#ff9e01" // Cambia a color naranja cuando está seleccionado
                  : theme.colors.surface,
              borderColor: "#dbdbdb",
            },
            labelStyle: {
              color:
                currentSection === section
                  ? theme.colors.onPrimary
                  : theme.colors.onSurface,
            },
          }))}
        />
      </View>

      { currentSection === "Calificaciones" ? <CalificacionesView /> : <EncuestasView /> }

    </SafeAreaView>
  );
}
