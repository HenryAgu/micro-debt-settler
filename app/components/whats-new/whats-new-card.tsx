import { Pressable, Text, View } from "react-native";
import CircleCloseIcon from "../icons/circle-close";
import { Image } from "expo-image";
import { Payment } from "@/types/type";
import { format, parseISO } from "date-fns";

interface WhatsNewCardProps {
  payment: Payment;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function WhatsNewCard({ payment }: WhatsNewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = payment?.name ? getInitials(payment.name) : "U";
  const isDebt = payment?.status === "debt";

  return (
    <View
      className={`border-[0.2px] p-2.5 rounded-[20px] flex flex-col gap-y-3 ${
        isDebt ? "border-red-600 bg-red-100" : "border-success bg-green-100"
      }`}
    >
      <View className="flex flex-row justify-between items-center">
        {/* Dynamic initials background color */}
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            isDebt ? "bg-red-600" : "bg-primary"
          }`}
        >
          <Text className="text-white text-lg font-roboto-medium">
            {initials}
          </Text>
        </View>

        {/* Formatted date */}
        <Text className="font-normal font-roboto text-sm tracking-tight text-gray-200">
          {new Date(payment.date).toLocaleDateString("en-US", {
            weekday: "short", // Sat
            day: "2-digit", // 25
            year: "numeric", // 2025
          })}
        </Text>

        <CircleCloseIcon color={isDebt ? "#FFD9D9" : "#B7E3CB"} />
      </View>

      <View className="flex flex-row gap-x-10 justify-between">
        <View className="flex flex-col gap-y-1">
          <Text className="font-roboto text-lg tracking-tight text-black-150">
            {isDebt ? `You owe ${payment?.name} $${payment?.amount}` : `${payment?.name} owes you $${payment?.amount}`}
          </Text>
          <Text className="font-roboto text-sm text-[#797979] tracking-tight">
            For {payment?.title}
          </Text>
        </View>

        <Image
          source={require("../../assets/images/car.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          className="w-8 h-12"
        />
      </View>

      <Pressable
        className={`shadow-custom rounded-[100px] border-[0.2px] ${
          isDebt ? "border-red-600 bg-red-100" : "border-success bg-green-100"
        }`}
      >
        <Text
          className={`font-roboto p-3 w-full text-center flex items-center justify-center ${
            isDebt ? "text-red-600" : "text-primary"
          }`}
        >
          {isDebt ? "Settle Now" : "Remind"}
        </Text>
      </Pressable>
    </View>
  );
}
