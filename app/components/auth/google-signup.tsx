import { Pressable, Text, View } from "react-native";
import GoogleIcon from "../icons/google-icon";

export default function GoogleSignup() {
  return (
    <View>
      <Pressable className="flex flex-row items-center justify-center gap-x-2 border-[0.5px] border-gray-150 h-12 py-4 rounded-full">
        <GoogleIcon />
        <Text className="font-roboto text-lg font-normal leading-[120%] text-black-150">
          Sign up with Google
        </Text>
      </Pressable>
    </View>
  );
}
