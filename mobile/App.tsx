import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Stack, routes } from "./src/routes";
import { theme } from "./src/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          {routes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
