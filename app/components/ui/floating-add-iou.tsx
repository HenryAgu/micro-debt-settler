import { Pressable, Text, View } from "react-native";
import AddIcon from "../icons/add";

export default function FloatingAddIOU() {
  return (
    <View className="absolute bottom-30 right-10 z-50">
      <Pressable className="flex flex-col gap-y-1">
        <View className="w-12 h-12 flex items-center justify-center bg-primary rounded-full shadow-lg">
          <AddIcon />
        </View>
        <Text className="fotn-roboto text-xs font-normal text-gray-100">
          Add IOU
        </Text>
      </Pressable>
    </View>
  );
}
