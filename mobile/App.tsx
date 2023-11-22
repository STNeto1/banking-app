import { useFonts } from "expo-font";
import { TamaguiProvider } from "tamagui";
import { HomeScreen } from "./screens/Home";
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
      <HomeScreen />
    </TamaguiProvider>
  );
}
