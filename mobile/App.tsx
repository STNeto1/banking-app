import { H2, TamaguiProvider, Text, XStack, YStack } from "tamagui";
import { useFonts } from "expo-font";
import config from "./tamagui.config";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <XStack
        fullscreen
        backgroundColor="$background"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <H2>Hello</H2>
      </XStack>
    </TamaguiProvider>
  );
}
