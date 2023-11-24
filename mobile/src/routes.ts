import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import { AuthScreen, LoginScreen, RegisterScreen } from './screens/Auth'
import { OpeningScreen } from './screens/Opening'

export type RootStackParamList = {
  Opening: undefined
  Auth: undefined
  Login: undefined
  Register: undefined
}

export type OpeningProps = NativeStackScreenProps<RootStackParamList, 'Opening'>
export type AuthProps = NativeStackScreenProps<RootStackParamList, 'Auth'>

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>

export const Stack = createNativeStackNavigator<RootStackParamList>()

export type Route = {
  name: keyof RootStackParamList
  component: () => JSX.Element
  options: NativeStackNavigationOptions
}

export const routes: Route[] = [
  {
    name: 'Opening',
    component: OpeningScreen,
    options: { headerShown: false }
  },
  {
    name: 'Auth',
    component: AuthScreen,
    options: { headerShown: false }
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: { headerShown: false }
  },
  {
    name: 'Register',
    component: RegisterScreen,
    options: { headerShown: false }
  }
]
