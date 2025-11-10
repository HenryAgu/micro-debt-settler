import { Text, View } from "react-native";

export default function FormSeparator() {
  return (
    <View className="flex-row items-center w-full">
      <View className="flex-1 h-[0.8px] bg-gray-200" />
      <Text className="mx-2 text-black-150 text-xs leaidng-[18px] font-normal tracking-tight font-roboto">
        Or
      </Text>
      <View className="flex-1 h-[0.8px] bg-gray-200" />
    </View>
  );
}
