import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return <>{children}</>;
}
