import {
  Alert,
  AlertIcon,
  AlertText,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  InfoIcon,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { ChevronLeft } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Input as VInput, email, minLength, object, string } from "valibot";
import {
  useAuthServicePostAuthLogin,
  useAuthServicePostAuthRegister,
} from "../lib/openapi/queries";
import { AuthService } from "../lib/openapi/requests";
import { AUTH_KEY } from "../lib/storage";
import { useSetToken, useSetUser, useToken } from "../lib/stores/auth";
import { AuthProps, LoginProps, RegisterProps } from "../routes";

export const AuthScreen = ({ navigation }: AuthProps) => {
  return (
    <VStack
      flex={1}
      paddingBottom={"$10"}
      paddingHorizontal={"$8"}
      justifyContent="center"
    >
      <VStack flex={1} alignItems="flex-start" justifyContent="center">
        <Heading color={"#001533"} size={"xl"} fontWeight={"700"}>
          Welcome to [[Placeholder]]
        </Heading>
        <Heading color={"#001533"} size="sm" fontWeight={"300"}>
          The bank for everyone
        </Heading>
      </VStack>

      <VStack width={"100%"} space={"sm"}>
        <Button
          backgroundColor={"$blue500"}
          $active={{
            backgroundColor: "$blue800",
          }}
          onPress={() => navigation.push("Register")}
        >
          <ButtonText>Create your free account</ButtonText>
        </Button>
        <Button
          variant={"outline"}
          borderWidth={1}
          borderColor={"$blue300"}
          $active={{
            backgroundColor: "$blue500",
          }}
          onPress={() => navigation.push("Login")}
        >
          <ButtonText>Log into your account</ButtonText>
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
  const setToken = useSetToken();
  const token = useToken();
  const setUser = useSetUser();

  const {
    mutate,
    isPending: pendingLogin,
    error: loginError,
  } = useAuthServicePostAuthLogin({
    onSuccess: async (data) => {
      if (!data.token) {
        // why this would happen?
        return;
      }

      await SecureStore.setItemAsync(AUTH_KEY, data.token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      setToken(data.token);
    },
  });

  const { error: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user = await AuthService.getAuthProfile(token ?? "");
      setUser(user);

      // TODO - send to a better page
      navigation.navigate("Opening");

      return true;
    },
    enabled: !!token,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const isPending = pendingLogin;
  const error = loginError ?? profileError;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: valibotResolver(loginSchema),
  });
  const onSubmit = (data: TLoginSchema) => {
    mutate({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <VStack
      flex={1}
      paddingBottom={"$10"}
      paddingHorizontal={"$4"}
      justifyContent="center"
    >
      <VStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={"xs"}
          onPress={() => navigation.goBack()}
          variant="outline"
        >
          <ButtonText as={ChevronLeft} />
        </Button>

        <VStack
          flex={0.5}
          space={"sm"}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Heading color={"$blue700"} size="2xl" fontWeight={"700"}>
            Sign in into your Account
          </Heading>
          <Heading color={"#001533"} size="md" fontWeight={"300"}>
            Log into your [[placeholder]] account
          </Heading>
        </VStack>
      </VStack>

      <FormControl flex={1.7} justifyContent="center">
        <VStack minWidth={300} gap="$4" flex={1} justifyContent="center">
          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.email}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="email"
                      placeholder="john.doe@mail.com"
                      width={"100%"}
                      backgroundColor="$white"
                      autoComplete="email"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.email && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.email.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.password}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="password"
                      textContentType="password"
                      secureTextEntry
                      autoComplete="password"
                      placeholder="JohnDoe123"
                      width={"100%"}
                      backgroundColor="$white"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.password && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="lg">
          {!!error && (
            <Alert mx="$2.5" action="error" variant="solid">
              <AlertIcon as={InfoIcon} mr="$3" />
              <AlertText>
                {error?.body?.message ?? "Something went wrong"}
              </AlertText>
            </Alert>
          )}

          <Button
            width={"100%"}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            <ButtonText>Sign in</ButtonText>
          </Button>

          <HStack width={"100%"} space={"sm"} justifyContent={"center"}>
            <Text fontSize={14} fontWeight={"400"}>
              Do you not have a [[Placeholder]] account?
            </Text>
            <Text
              color={"$blue600"}
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
  const setToken = useSetToken();
  const token = useToken();
  const setUser = useSetUser();

  const {
    mutate,
    isPending: pendingRegister,
    error: registerError,
  } = useAuthServicePostAuthRegister({
    onSuccess: async (data) => {
      if (!data.token) {
        // why this would happen?
        return;
      }

      await SecureStore.setItemAsync(AUTH_KEY, data.token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      setToken(data.token);
    },
  });

  const { error: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user = await AuthService.getAuthProfile(token ?? "");
      setUser(user);

      // TODO - send to a better page
      navigation.navigate("Opening");

      return true;
    },
    enabled: !!token,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const isPending = pendingRegister;
  const error = registerError ?? profileError;

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

    mutate({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <VStack
      flex={1}
      paddingBottom={"$10"}
      paddingHorizontal={"$4"}
      justifyContent="center"
    >
      <VStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={"md"}
          onPress={() => navigation.goBack()}
          variant="outline"
        >
          <ButtonIcon as={ChevronLeft} />
        </Button>

        <VStack flex={0.5} alignItems="flex-start" justifyContent="flex-end">
          <Heading color={"$blue700"} size="2xl" fontWeight={"700"}>
            Create Account
          </Heading>
          <Heading color={"#001533"} size="md" fontWeight={"300"}>
            Open a [[placeholder]] account with a few details.
          </Heading>
        </VStack>
      </VStack>

      <FormControl flex={1.7} justifyContent="center">
        <VStack minWidth={300} flex={1} justifyContent="center" gap={"$4"}>
          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.name}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="name"
                      placeholder="John Doe"
                      width={"100%"}
                      backgroundColor="$white"
                      autoComplete="name"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.name && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.name.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.email}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="email"
                      placeholder="john.doe@mail.com"
                      width={"100%"}
                      backgroundColor="$white"
                      autoComplete="email"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.email && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.email.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.password}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="password"
                      textContentType="password"
                      secureTextEntry
                      autoComplete="password"
                      placeholder="JohnDoe123"
                      width={"100%"}
                      backgroundColor="$white"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.password && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>

          <VStack alignItems="flex-start">
            <FormControl
              isInvalid={!!errors.confirm_password}
              isDisabled={isPending}
              width={"100%"}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      id="confirm_password"
                      textContentType="password"
                      secureTextEntry
                      autoComplete="password"
                      placeholder="JohnDoe123"
                      width={"100%"}
                      backgroundColor="$white"
                      clearButtonMode="unless-editing"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.confirm_password && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.confirm_password.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>
        </VStack>

        <VStack alignItems="flex-start" justifyContent="center" space="lg">
          {!!error && (
            <Alert mx="$2.5" action="error" variant="solid">
              <AlertIcon as={InfoIcon} mr="$3" />
              <AlertText>
                {error?.body?.message ?? "Something went wrong"}
              </AlertText>
            </Alert>
          )}

          <Button
            width={"100%"}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            <ButtonText>Create your account</ButtonText>
          </Button>

          <HStack width={"100%"} justifyContent={"center"} space={"sm"}>
            <Text fontSize={14} fontWeight={"400"}>
              Do you already have a [[Placeholder]] account?
            </Text>
            <Text
              color={"$blue800"}
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
