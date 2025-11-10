import { Pressable, Text, View } from "react-native";
import BankIcon from "../icons/bank-icon";

export default function ConnectBank() {
  return (
    <View>
      <Pressable className="flex flex-row items-center justify-center gap-x-2 border-[0.5px] border-gray-150 h-12 py-4 rounded-xl">
        <BankIcon />
        <Text className="font-roboto text-lg font-normal leading-[120%] text-black-150">
          Connect with Bank
        </Text>
      </Pressable>
    </View>
  );
}
