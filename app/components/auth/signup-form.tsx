import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import GoogleSignUp from "./google-signup";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth-context";
import EyesCloseIcon from "../icons/eye-close";
import EyesIcon from "../icons/eye";

type FormData = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isFormValid = name && email && password && confirmPassword;

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { valid: [], invalid: [] };

    const checks = {
      minLength: pwd.length >= 8,
      hasNumber: /\d/.test(pwd),
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };

    const requirements = [
      {
        key: "minLength",
        label: "At least 8 characters",
        met: checks.minLength,
      },
      { key: "hasUpper", label: "One uppercase letter", met: checks.hasUpper },
      { key: "hasLower", label: "One lowercase letter", met: checks.hasLower },
      { key: "hasNumber", label: "One number", met: checks.hasNumber },
      {
        key: "hasSpecial",
        label: "One special character",
        met: checks.hasSpecial,
      },
    ];

    return {
      valid: requirements.filter((r) => r.met),
      invalid: requirements.filter((r) => !r.met),
    };
  };

  const passwordStrength = getPasswordStrength(password || "");

  return (
    <View className="flex flex-col gap-y-8 ">
      {error && (
        <View className="bg-red-100 border border-red-400 rounded-md px-4 py-3">
          <Text className="text-red-700 text-sm font-roboto">{error}</Text>
        </View>
      )}

      <View className="flex flex-col gap-y-4">
        {/* Name Field */}
        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal font-roboto">
            Full Name
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
                className="border-[0.8px] border-gray-200 rounded-md px-3 py-2.5 text-sm font-normal font-roboto text-black h-12 flex items-center"
              />
            )}
          />
        </View>

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
                className="border-[0.8px] border-gray-200 rounded-md px-3 py-2.5 text-sm font-normal font-roboto text-black h-12 flex items-center"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
        </View>

        {/* Phone Number Field */}
        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal font-roboto">
            Phone number <Text className="text-gray-150">(optional)</Text>
          </Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter phone number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                className="border-[0.8px] border-gray-200 rounded-md px-3 py-2.5 text-sm font-normal font-roboto text-black h-12 flex items-center"
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
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  textContentType="password"
                  className="border-[0.8px] border-gray-200 rounded-md px-3 py-2.5 pr-12 text-sm font-normal font-roboto text-black h-12"
                />
              )}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-0 h-12 flex items-center justify-center"
            >
              {showPassword ? <EyesIcon /> : <EyesCloseIcon />}
            </Pressable>
          </View>

          {password && (
            <View className="flex flex-col gap-y-2 mt-2">
              {passwordStrength.invalid.map((req) => (
                <View
                  key={req.key}
                  className="flex flex-row items-center gap-x-2"
                >
                  <Text className="text-red-500 text-xs">✗</Text>
                  <Text className="text-gray-200 text-xs font-roboto">
                    {req.label}
                  </Text>
                </View>
              ))}
              {passwordStrength.valid.map((req) => (
                <View
                  key={req.key}
                  className="flex flex-row items-center gap-x-2"
                >
                  <Text className="text-green-600 text-xs">✓</Text>
                  <Text className="text-green-600 text-xs font-roboto">
                    {req.label}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal">
            Confirm Password
          </Text>
          <View className="relative">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Re-enter Password"
                  value={value || ""}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  textContentType="password"
                  className="border-[0.8px] border-gray-200 rounded-md px-3 py-2.5 pr-12 text-sm font-normal font-roboto text-black h-12"
                />
              )}
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-0 h-12 flex items-center justify-center"
            >
              {showConfirmPassword ? <EyesIcon /> : <EyesCloseIcon />}
            </Pressable>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={!isFormValid || loading}
        className={`w-full rounded-full py-4 flex flex-row justify-center gap-x-2 custom-shadow ${
          isFormValid && !loading ? "bg-primary" : "bg-primary/50"
        }`}
      >
        <Text className="text-white text-base font-normal font-roboto">
          {loading ? "Creating account..." : "Create account"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center w-full">
        <View className="flex-1 h-[0.8px] bg-gray-200" />
        <Text className="mx-2 text-black-150 text-xs leading-[18px] font-normal tracking-tight font-roboto">
          Or
        </Text>
        <View className="flex-1 h-[0.8px] bg-gray-200" />
      </View>

      {/* Sign Up with Google */}
      <GoogleSignUp />

      <View className="mt-20 flex-row justify-center items-center">
        <Text className="text-xs font-normal text-gray-100 tracking-tight font-roboto">
          Already have an account?{" "}
        </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-xs underline text-primary font-roboto">
            Log in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
