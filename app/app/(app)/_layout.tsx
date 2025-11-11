import { Stack, Redirect } from "expo-router";
import { View } from "react-native";
import FloatingNav from "@/components/ui/floating-nav";
import { useAuth } from "@/context/auth-context";

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <View className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
      <FloatingNav />
    </View>
  );
}
