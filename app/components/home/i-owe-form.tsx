import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface FormData {
  whoYouOwe: string;
  amount: number;
  description?: string;
}

export default function IOweForm() {
  const refRBSheet = useRef<any>(null);
  const { control } = useForm<FormData>({
    defaultValues: {
      whoYouOwe: "",
      amount: 0,
      description: "",
    },
  });

  return (
    <View className="py-5 flex flex-col gap-y-5">
      <View className="border-[0.4px] border-gray-80 rounded-lg p-4 flex flex-col gap-y-5">
        {/* Who do you owe? */}
        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal font-family-roboto tracking-tight">
            Who Do You Owe?
          </Text>

          <Controller
            control={control}
            name="whoYouOwe"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter name"
                value={value}
                onChangeText={onChange}
                className="border-[0.4px] border-gray-150 text-[#777777] rounded-md px-3 py-2.5 text-sm font-normal font-family-roboto h-12 bg-gray-50"
              />
            )}
          />
        </View>

        {/* Amount */}
        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal font-family-roboto tracking-tight">
            Enter Amount
          </Text>

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="$0.00"
                value={value !== undefined ? String(value) : ""}
                onChangeText={(text) => {
                  const numericValue = Number(text.replace(/[^0-9.]/g, ""));
                  onChange(isNaN(numericValue) ? 0 : numericValue);
                }}
                keyboardType="numeric"
                className="border-[0.4px] border-gray-150 focus:border-gray-150 text-[#777777] rounded-md px-3 py-2.5 text-sm font-normal font-family-roboto h-12 bg-gray-50"
              />
            )}
          />
        </View>

        {/* Add description */}
        <View className="flex flex-col gap-y-1.5">
          <Text className="text-black-200 text-base leading-[22px] font-normal font-family-roboto tracking-tight">
            Add Description
          </Text>

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="What this is for?"
                value={value}
                onChangeText={onChange}
                className="border-[0.4px] border-gray-150 text-[#777777] rounded-md px-3 py-2.5 text-sm font-normal font-family-roboto h-22.5 bg-gray-50"
              />
            )}
          />
        </View>
      </View>
      <View className="flex flex-col gap-y-1.5">
        <TouchableOpacity
          className={`bg-primary w-full rounded-full h-12 flex flex-row items-center justify-center shadow-custom`}
        >
          <Text className="font-family-roboto text-white-150 text-base tracking-tight">
            Add IOU
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" flex flex-row items-center justify-center h-12 w-full shadow-custom"
          onPress={() => refRBSheet.current?.open()}
        >
          <Text className="font-family-roboto text-black-120 text-base tracking-tight">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
