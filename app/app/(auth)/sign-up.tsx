import SignUpForm from "@/components/auth/signup-form";
import ScreenWrapper from "@/components/screen-wrapper";
import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScrollView className="px-5 py-12">
        <View className=" flex flex-col justify-center gap-y-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start"
          >
            <Text className="text-primary text-base font-roboto">← Back</Text>
          </TouchableOpacity>
          <View className="flex flex-col gap-y-1">
            <Text className="text-black-100 font-semibold text-2xl tracking-tight font-roboto-medium">
              Let&apos;s get you started 🎉
            </Text>
            <Text className="text-base leading-[22px] font-normal text-gray-500 tracking-tight font-roboto">
              Join <Text className="font-bold">Settle</Text>, to track and
              settle small debts with friends
            </Text>
          </View>
          <SignUpForm />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
