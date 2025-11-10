import ScreenWrapper from "@/components/screen-wrapper";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function HomeScreen() {
const router = useRouter();
  useEffect(() => {
    router.replace("/onboarding");
  }, []);
return(
  <ScreenWrapper>
    <View>
      re
    </View>
  </ScreenWrapper>
)
}
