import { View } from "react-native";

function Screen({ children }: any) {
  return <View className="flex-1 justify-center items-center bg-gray-200/10 pt-10 px-1">{children}</View>;
}

export default Screen;
