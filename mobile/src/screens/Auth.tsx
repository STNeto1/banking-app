import {
  Button,
  VStack,
  HStack,
  Text,
  Input,
  FormControl,
  ChevronLeftIcon,
  WarningOutlineIcon,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  object,
  string,
  minLength,
  endsWith,
  Input as VInput,
  email,
  custom,
} from "valibot";
import { AuthProps, LoginProps, RegisterProps } from "../routes";
import { Alert } from "react-native";

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

const loginSchema = object({
  email: string("Email is required", [
    email("Please enter a valid email address"),
  ]),

  password: string("Password is required"),
});
type TLoginSchema = VInput<typeof loginSchema>;

export const LoginScreen = ({ navigation }: LoginProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: valibotResolver(loginSchema),
  });
  const onSubmit = (data: TLoginSchema) => {
    Alert.alert("Form Data", JSON.stringify(data, null, 2), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
        style: "default",
      },
    ]);
  };

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
            Sig in into your Account
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="email"
                  placeholder="john.doe@mail.com"
                  width={"100%"}
                  autoComplete="email"
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <FormControl.HelperText>
                {errors.email.message}
              </FormControl.HelperText>
            )}
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="password">Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="password"
                  textContentType="password"
                  secureTextEntry
                  autoComplete="password"
                  placeholder="JohnDoe123"
                  width={"100%"}
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <FormControl.HelperText color={"red.100"}>
                {errors.password.message}
              </FormControl.HelperText>
            )}
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="4">
          <Button
            width={"100%"}
            backgroundColor={"blue.600"}
            _pressed={{
              backgroundColor: "blue.800",
            }}
            color={"white"}
            onPress={handleSubmit(onSubmit)}
          >
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

const registerSchema = object({
  name: string("Name is required", [
    minLength(3, "Name must be at least 3 characters"),
  ]),
  email: string("Email is required", [
    email("Please enter a valid email address"),
  ]),
  password: string("Password is required"),
  confirm_password: string("Confirm Password is required", []),
});
type TRegisterSchema = VInput<typeof registerSchema>;

export const RegisterScreen = ({ navigation }: RegisterProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<TRegisterSchema>({
    resolver: valibotResolver(registerSchema),
  });
  const onSubmit = (data: TRegisterSchema) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    Alert.alert("Form Data", JSON.stringify(data, null, 2), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
        style: "default",
      },
    ]);
  };

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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="name"
                  placeholder="John Doe"
                  width={"100%"}
                  autoComplete="name"
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <FormControl.HelperText>
                {errors.name.message}
              </FormControl.HelperText>
            )}
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="email">Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="email"
                  placeholder="john.doe@mail.com"
                  width={"100%"}
                  autoComplete="email"
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <FormControl.HelperText>
                {errors.email.message}
              </FormControl.HelperText>
            )}
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="password">Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="password"
                  textContentType="password"
                  secureTextEntry
                  autoComplete="password"
                  placeholder="JohnDoe123"
                  width={"100%"}
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <FormControl.HelperText>
                {errors.password.message}
              </FormControl.HelperText>
            )}
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl.Label htmlFor="confirm_password">
              Confirm Password
            </FormControl.Label>
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  id="confirm_password"
                  textContentType="password"
                  secureTextEntry
                  autoComplete="password"
                  placeholder="JohnDoe123"
                  width={"100%"}
                  clearButtonMode="unless-editing"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirm_password && (
              <FormControl.HelperText>
                {errors.confirm_password.message}
              </FormControl.HelperText>
            )}
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="4">
          <Button
            width={"100%"}
            backgroundColor={"blue.500"}
            _pressed={{
              backgroundColor: "blue.800",
            }}
            color={"white"}
            onPress={handleSubmit(onSubmit)}
          >
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
