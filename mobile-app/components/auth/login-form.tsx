import { FormData } from "@/types/form-data";
import { useRouter } from "expo-router";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FormSeparator from "../ui/separator";
import GoogleSignup from "./google-signup";
import ConnectBank from "./connect-bank";

export default function LoginForm() {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
  };

  // Watch required fields
  const email = watch("email");
  const password = watch("password");

  // Button enabled only if all required fields are filled
  const isFormValid = email && password;
  return (
    <View className="flex flex-col gap-y-4">
      {/* Email Field */}
      <View className="flex flex-col gap-y-[6px]">
        <Text className="text-black-200 text-base leading-[22px] font-normal font-roboto">
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              className="border-[0.8px] border-gray-200 rounded-md px-[12px] py-2.5 text-sm font-normal font-roboto text-gray-150 h-12 flex items-center"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      {/* Password Field */}
      <View className="flex flex-col gap-y-[6px]">
        <Text className="text-black-200 text-base leading-[22px] font-normal">
          Password
        </Text>
    
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
              className="border-[0.8px] border-gray-200 rounded-md px-[12px] py-2.5 text-sm font-normal font-roboto text-gray-150 h-12 flex items-center"
            />
          )}
        />
      </View>

      {/* Remember me & Forgot Password */}
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-x-2">
          <Checkbox
            value={checked}
            onValueChange={setChecked}
            className="h-4 w-4 text-gray-150"
          />
          <Text className="font-roboto text-base leading-[22px] tracking-tight font-normal text-gray-700">
            Remember me
          </Text>
        </View>
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-primary font-roboto text-base leading-[22px] tracking-tight font-normal">
            Forgot password
          </Text>
        </Pressable>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={!isFormValid}
        className={`w-full rounded-full h-12 flex flex-row items-center justify-center gap-x-2 custom-shadow ${
          isFormValid ? "bg-primary" : "bg-primary/50"
        }`}
      >
        <Text className="text-white text-base font-normal font-roboto">
          Login
        </Text>
      </TouchableOpacity>

      {/* Separator */}
      <FormSeparator />

      {/* Google Sign up */}
      <GoogleSignup />

      {/* Connect Bank */}
      <ConnectBank />

      <View className="mt-20">
        <Text className="text-xs font-normal text-gray-100 tracking-tight text-center font-roboto">
          Already have an account?{" "}
          <Pressable onPress={() => router.push("/sign-up")}>
            <Text className="underline text-primary">Sign Up</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}
