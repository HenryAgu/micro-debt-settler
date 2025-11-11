import { Image } from "expo-image";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ArrowRightIcon from "@/components/icons/arrow-right";
import ScreenWrapper from "@/components/screen-wrapper";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <ScrollView className="px-5 py-12">
        <View className=" flex flex-col items-center justify-center gap-y-[38px]">
          <Image
            source={require("../../assets/images/home.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={{ width: "100%", height: 452, borderRadius: 20 }}
          />
          <View className="flex flex-col gap-y-7 items-center">
            <View className="flex flex-col gap-y-1 items-center">
              <Text className="text-black-100 font-semibold text-xl tracking-tight font-roboto-medium">
                No more awkward IOU&apos;s
              </Text>
              <Text className="text-base text-gray-100 tracking-tight font-normal text-center mx-5 font-roboto">
                <Text className="font-bold">Settle</Text> keeps things even
                automatically without chase.
              </Text>
            </View>
            <View className="flex flex-col gap-y-3 items-center w-full">
              <TouchableOpacity
                onPress={() => router.push("/login")}
                className="bg-primary w-full rounded-full py-4 flex flex-row items-center justify-center gap-x-2 custom-shadow"
              >
                <Text className="text-white text-base font-normal font-roboto">
                  Get Started
                </Text>
                <ArrowRightIcon width={22} height={22} fill="#FFFFFF" />
              </TouchableOpacity>
              <Text className="text-xs font-normal text-gray-100 tracking-tight font-roboto">
                Takes less than a few minutes
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
