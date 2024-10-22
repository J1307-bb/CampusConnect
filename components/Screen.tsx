import { View, Text } from "react-native";

function Screen({ title, children }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-gray-200/10 pt-12 px-1">
      { title ? 
        <Text className="text-2xl font-extralight py-4">{ title }</Text> 
        : 
        <></> 
      }
      {children}
    </View>
  );
}

export default Screen;
