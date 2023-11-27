import {
  NativeStackNavigationOptions,
  NativeStackScreenProps as StackProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AuthScreen, LoginScreen, RegisterScreen } from "./screens/Auth";
import { OpeningScreen } from "./screens/Opening";
import { HomeScreen } from "./screens/Home";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp as TabProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  ArrowLeftRightIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react-native";

export type RootStackParamList = {
  Opening: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Tab: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
export type OpeningProps = StackProps<RootStackParamList, "Opening">;
export type AuthProps = StackProps<RootStackParamList, "Auth">;
export type LoginProps = StackProps<RootStackParamList, "Login">;
export type RegisterProps = StackProps<RootStackParamList, "Register">;

type RootTabParamList = {
  Home: undefined;
  Friends: undefined;
  Operations: undefined;
  Settings: undefined;
};

export type HomeProps = TabProps<RootTabParamList, "Home">;
export const Tab = createBottomTabNavigator<RootTabParamList>();

export type StackRoute = {
  name: keyof RootStackParamList;
  // @ts-ignore
  component: any;
  options: NativeStackNavigationOptions;
};

export type TabRoute = {
  name: keyof RootTabParamList;
  // @ts-ignore
  component: any;
  options: BottomTabNavigationOptions;
};

const tabRoutes: TabRoute[] = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      headerShown: false,
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }) => (
        <HomeIcon color={focused ? "#0066F6" : "#90A0C1"} size={24} />
      ),
    },
  },
  {
    name: "Friends",
    component: HomeScreen,
    options: {
      headerShown: false,
      tabBarLabel: "Friends",
      tabBarIcon: ({ focused }) => (
        <UsersIcon color={focused ? "#0066F6" : "#90A0C1"} size={24} />
      ),
    },
  },
  {
    name: "Operations",
    component: HomeScreen,
    options: {
      headerShown: false,
      tabBarLabel: "Operations",
      tabBarIcon: ({ focused }) => (
        <ArrowLeftRightIcon color={focused ? "#0066F6" : "#90A0C1"} size={24} />
      ),
    },
  },
  {
    name: "Settings",
    component: HomeScreen,
    options: {
      headerShown: false,
      tabBarLabel: "Settings",
      tabBarIcon: ({ focused }) => (
        <CogIcon color={focused ? "#0066F6" : "#90A0C1"} size={24} />
      ),
    },
  },
];

export const routes: StackRoute[] = [
  {
    name: "Opening",
    component: OpeningScreen,
    options: { headerShown: false },
  },
  {
    name: "Auth",
    component: AuthScreen,
    options: { headerShown: false },
  },
  {
    name: "Login",
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: "Register",
    component: RegisterScreen,
    options: { headerShown: false },
  },
  {
    name: "Tab",
    component: () => (
      <Tab.Navigator initialRouteName="Home">
        {tabRoutes.map((route) => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))}
      </Tab.Navigator>
    ),
    options: { headerShown: false },
  },
];
