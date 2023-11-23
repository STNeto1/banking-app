import { useFonts } from "expo-font";
import { TamaguiProvider } from "tamagui";
import { OpeningScreen } from "./screens/Opening";
import config from "./tamagui.config";
import { AuthScreen, LoginScreen, RegisterScreen } from "./screens/Auth";

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
      <RegisterScreen />
    </TamaguiProvider>
  );
}
