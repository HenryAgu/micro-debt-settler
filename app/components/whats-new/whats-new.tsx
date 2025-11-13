import { Text, View } from "react-native";
import WhatsNewCard from "./whats-new-card";
import payments from "../data/payment.json";
import { Payment } from "@/types/type";

export default function WhatsNew() {
  const paymentData = payments as Payment[];
  return (
    <View className="py-14">
      <Text className="font-roboto-medium text-lg font-medium tracking-tight text-black-100">
        Look what's new!
      </Text>
      <View className="py-2 flex flex-col gap-y-4">
        {paymentData.map((payment, index) => (
          <WhatsNewCard payment={payment} key={index}/>
        ))}
      </View>
    </View>
  );
}
