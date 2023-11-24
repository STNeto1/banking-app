import {
  Button,
  VStack,
  HStack,
  Text,
  Input,
  FormControl,
  ChevronLeftIcon,
} from "native-base";
import { AuthProps, LoginProps, RegisterProps } from "../routes";

export const AuthScreen = ({ navigation }: AuthProps) => {
  return (
    <VStack
      flex={1}
      paddingBottom={"10"}
      paddingX={"4"}
      justifyContent="center"
    >
      <VStack flex={1} alignItems="flex-start" justifyContent="center">
        <Text color={"#001533"} fontSize={30} fontWeight={"700"}>
          Welcome to [[Placeholder]]
        </Text>
        <Text color={"#001533"} fontSize={17} fontWeight={"300"}>
          The bank for everyone
        </Text>
      </VStack>

      <VStack width={"100%"} space={4}>
        <Button
          backgroundColor={"blue.500"}
          _pressed={{
            backgroundColor: "blue.800",
          }}
          onPress={() => navigation.push("Register")}
        >
          Create your free account
        </Button>
        <Button
          variant={"unstyled"}
          borderWidth={1}
          borderColor={"blue.300"}
          _pressed={{
            backgroundColor: "gray.200",
          }}
          onPress={() => navigation.push("Login")}
        >
          Log into your account
        </Button>
      </VStack>
    </VStack>
  );
};

export const LoginScreen = ({ navigation }: LoginProps) => {
  return (
    <VStack
      flex={1}
      paddingBottom={"10"}
      paddingX={"4"}
      justifyContent="center"
    >
      <VStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={"md"}
          variant="outlined"
          leftIcon={<ChevronLeftIcon />}
          onPress={() => navigation.goBack()}
        />

        <VStack
          flex={0.5}
          space={"4"}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Text color={"blue.700"} fontSize={30} fontWeight={"700"}>
            Sign into your Account
          </Text>
          <Text color={"#001533"} fontSize={15} fontWeight={"300"}>
            Log into your BankMe account
          </Text>
        </VStack>
      </VStack>

      <FormControl flex={1.7} justifyContent="center">
        <VStack minWidth={300} space="2" flex={1} justifyContent="center">
          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="email">Email</FormControl.Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              width={"100%"}
              autoComplete="email"
              clearButtonMode="unless-editing"
            />
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="password">Password</FormControl.Label>
            <Input
              id="password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={"100%"}
              clearButtonMode="unless-editing"
            />
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="4">
          <Button width={"100%"} backgroundColor={"blue.600"} color={"white"}>
            Sign in
          </Button>

          <HStack width={"100%"} space={"2"} justifyContent={"center"}>
            <Text fontSize={14} fontWeight={"400"}>
              Do you not have a [[Placeholder]] account?
            </Text>
            <Text
              color={"blue.600"}
              fontSize={14}
              fontWeight={"400"}
              onPress={() => navigation.push("Register")}
            >
              Sign up here
            </Text>
          </HStack>
        </VStack>
      </FormControl>
    </VStack>
  );
};

export const RegisterScreen = ({ navigation }: RegisterProps) => {
  return (
    <VStack
      flex={1}
      backgroundColor="gray.100"
      paddingBottom={"10"}
      paddingX={"4"}
      justifyContent="center"
    >
      <VStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={"md"}
          variant="outlined"
          leftIcon={<ChevronLeftIcon />}
          onPress={() => navigation.goBack()}
        />

        <VStack
          flex={0.5}
          space={"4"}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Text color={"blue.700"} fontSize={30} fontWeight={"700"}>
            Create Account
          </Text>
          <Text color={"#001533"} fontSize={15} fontWeight={"300"}>
            Open a BankMe account with a few details.
          </Text>
        </VStack>
      </VStack>

      <FormControl flex={1.7} justifyContent="center">
        <VStack minWidth={300} space="3" flex={1} justifyContent="center">
          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="name">Name</FormControl.Label>
            <Input
              id="name"
              placeholder="John Doe"
              width={"100%"}
              autoComplete="name"
              clearButtonMode="unless-editing"
            />
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="email">Email</FormControl.Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              width={"100%"}
              autoComplete="email"
              backgroundColor={"$backgroundHover"}
              clearButtonMode="unless-editing"
            />
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="password">Password</FormControl.Label>
            <Input
              id="password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={"100%"}
              backgroundColor={"$backgroundHover"}
              clearButtonMode="unless-editing"
            />
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="confirm_password">
              Confirm Password
            </FormControl.Label>
            <Input
              id="confirm_password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={"100%"}
              clearButtonMode="unless-editing"
            />
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="4">
          <Button width={"100%"} backgroundColor={"blue.500"} color={"white"}>
            Create your account
          </Button>

          <HStack width={"100%"} space={"2"} justifyContent={"center"}>
            <Text fontSize={14} fontWeight={"400"}>
              Do you already have a [[Placeholder]] account?
            </Text>
            <Text
              color={"blue.800"}
              fontSize={14}
              fontWeight={"400"}
              onPress={() => navigation.push("Login")}
            >
              Sign in here
            </Text>
          </HStack>
        </VStack>
      </FormControl>
    </VStack>
  );
};
