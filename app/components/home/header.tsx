import { Pressable, Text, View } from "react-native";
import CalenderIcon from "../icons/calender";
import { useAuth } from "@/context/auth-context";

export default function HomeHeader() {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.name?.split(" ")[0] || "User";
  const initials = user?.name ? getInitials(user.name) : "U";

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-x-2">
        <View className="w-[49px] h-[49px] rounded-full bg-blue-500 items-center justify-center">
          <Text className="text-white text-lg font-roboto-medium">
            {initials}
          </Text>
        </View>
        <View className="flex flex-col gap-y-1">
          <Text className="font-roboto-medium text-lg font-medium tracking-tight text-black-180">
            Hey, {displayName} 👋🏻
          </Text>
          <Text className="text-base leading-[22px] font-normal font-roboto text-gray-250">
            Here&apos;s what is pending today.
          </Text>
        </View>
      </View>
      <Pressable>
        <CalenderIcon />
      </Pressable>
    </View>
  );
}
