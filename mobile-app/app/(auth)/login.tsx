import LoginForm from "@/components/auth/login-form";
import ScreenWrapper from "@/components/screen-wrapper";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <ScreenWrapper>
      <ScrollView className="px-5 py-20">
        <View className=" flex flex-col justify-center gap-y-6">
          <View className="flex flex-col gap-y-1">
            <Text className="text-black-100 font-semibold text-2xl tracking-tight font-roboto-medium">
              Link your wallet or log in
            </Text>
            <Text className="text-base leading-[22px] font-normal text-gray-500 tracking-tight font-roboto">
              We'll remind & handle payments for you securely
            </Text>
          </View>
          <LoginForm/>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
