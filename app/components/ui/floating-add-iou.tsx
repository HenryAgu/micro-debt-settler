import { Pressable, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import AddIcon from "../icons/add";
import { useRef } from "react";

export default function FloatingAddIOU() {
  const refRBSheet = useRef<any>(null);

  return (
    <View className="absolute bottom-30 right-10 z-50">
      {/* Button to open bottom sheet */}
      <TouchableOpacity
        className="flex flex-col gap-y-1"
        onPress={() => refRBSheet.current?.open()}
      >
        <View className="w-12 h-12 flex items-center justify-center bg-primary rounded-full shadow-lg">
          <AddIcon />
        </View>
        <Text className="font-roboto text-xs font-normal text-gray-100">
          Add IOU
        </Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        draggable={true}
        height={600}
        openDuration={250}
        useNativeDriver={true}
        customStyles={{
          wrapper: { backgroundColor: "rgba(0,0,0,0.4)" },
          draggableIcon: { backgroundColor: "#aaa", width: 60 },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 20,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
      >
        <View className="p-6">
          <Text className="text-lg font-semibold">Your content here</Text>
        </View>
      </RBSheet>
    </View>
  );
}
