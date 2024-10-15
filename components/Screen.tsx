import { View } from "react-native";

function Screen({ children }: any) {
  return <View className="flex-1 justify-center items-center bg-black py-4 px-2">{children}</View>;
}

export default Screen;
