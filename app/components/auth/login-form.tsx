import { FormData } from "@/types/form-data";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Checkbox } from "expo-checkbox";
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
import EyesCloseIcon from "../icons/eye-close";
import EyesIcon from "../icons/eye";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");
    setLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Watch required fields
  const email = watch("email");
  const password = watch("password");

  // Button enabled only if all required fields are filled
  const isFormValid = email && password;
  return (
    <View className="flex flex-col gap-y-4">
      {error && (
        <View className="bg-red-100 border border-red-400 rounded-md px-4 py-3">
          <Text className="text-red-700 text-sm font-roboto">{error}</Text>
        </View>
      )}

      {/* Email Field */}
      <View className="flex flex-col gap-y-1.5">
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
              className="border-[0.8px] border-gray-200 rounded-lg px-3 py-2.5 text-sm font-normal font-roboto text-black h-12 flex items-center"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      {/* Password Field */}
      <View className="flex flex-col gap-y-1.5">
        <Text className="text-black-200 text-base leading-[22px] font-normal">
          Password
        </Text>

        <View className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter Password"
                value={value || ""}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                textContentType="password"
                className="border-[0.8px] border-gray-200 rounded-lg px-3 py-2.5 pr-12 text-sm font-normal font-roboto text-black h-12"
              />
            )}
          />
          <Pressable
            onPress={handleShowPassword}
            className="absolute right-3 top-0 h-12 flex items-center justify-center"
          >
            {showPassword ? <EyesIcon /> : <EyesCloseIcon />}
          </Pressable>
        </View>
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
        disabled={!isFormValid || loading}
        className={`w-full rounded-full h-12 flex flex-row items-center justify-center gap-x-2 shadow-custom ${
          isFormValid && !loading ? "bg-primary" : "bg-primary/50"
        }`}
      >
        <Text className="text-white text-base font-normal font-roboto">
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Separator */}
      <FormSeparator />

      {/* Google Sign up */}
      <GoogleSignup />

      <View className="mt-20 flex-row justify-center items-center">
        <Text className="text-xs font-normal text-gray-100 tracking-tight font-roboto">
          Don&apos;t have an account?{" "}
        </Text>
        <Pressable onPress={() => router.push("/sign-up")}>
          <Text className="text-xs underline text-primary font-roboto">
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
