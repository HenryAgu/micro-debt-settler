import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import IOweForm from "./i-owe-form";
import TheyOweForm from "./they-owe-form";

export default function AddIOU() {
  const [activeTab, setActiveTab] = useState<"one" | "two">("one");
  return (
    <View className="py-2.5 px-4">
      <View className="flex flex-col gap-y-1.5">
        <Text className="text-base font-family-roboto font-normal tracking-tight text-gray-300">
          Select
        </Text>
        {/* Tabs */}
        <View className="flex flex-row items-center gap-x-1.5 w-full">
          <TouchableOpacity
            className={`basis-[50%] py-2.5 px-4 border-[0.4px] ${
              activeTab === "one" ? "border-red-600" : "border-gray-150"
            }  bg-gray-50 rounded-lg h-11 flex items-center justify-center`}
            onPress={() => setActiveTab("one")}
          >
            <Text
              className={`text-center font-family-roboto text-sm tracking-tight ${
                activeTab === "one" ? "text-black-250" : "text-gray-75"
              } `}
            >
              I owe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`basis-[50%] py-2.5 px-4 border-[0.4px] ${
              activeTab === "two" ? "border-red-600" : "border-gray-150"
            } bg-gray-50 rounded-lg h-11 flex items-center justify-center`}
            onPress={() => setActiveTab("two")}
          >
            <Text
              className={`text-center font-family-roboto text-sm tracking-tight ${
                activeTab === "two" ? "text-black-250" : "text-gray-75"
              } `}
            >
              They owe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Component Rendering */}
      {activeTab === "one" ? <IOweForm /> : <TheyOweForm />}
    </View>
  );
}
