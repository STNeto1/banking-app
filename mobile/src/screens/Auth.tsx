import {
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { Input as VInput, email, minLength, object, string } from "valibot";
import { AuthProps, LoginProps, RegisterProps } from "../routes";
import { InputField } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ChevronLeft } from "lucide-react-native";

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
            Sig in into your Account
          </Heading>
          <Heading color={"#001533"} size="md" fontWeight={"300"}>
            Log into your [[placeholder]] account
          </Heading>
        </VStack>
      </VStack>

      <FormControl flex={1.7} justifyContent="center">
        <VStack minWidth={300} gap="$4" flex={1} justifyContent="center">
          <VStack alignItems="flex-start">
            <FormControl isInvalid={!!errors.email} width={"100%"}>
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
            <FormControl isInvalid={!!errors.password} width={"100%"}>
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
          <Button width={"100%"} onPress={handleSubmit(onSubmit)}>
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
            <FormControl isInvalid={!!errors.name} width={"100%"}>
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
            <FormControl isInvalid={!!errors.email} width={"100%"}>
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
            <FormControl isInvalid={!!errors.password} width={"100%"}>
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
            <FormControl isInvalid={!!errors.confirm_password} width={"100%"}>
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
          <Button width={"100%"} onPress={handleSubmit(onSubmit)}>
            <ButtonText>Create your account</ButtonText>
          </Button>

          <HStack width={"100%"} justifyContent={"center"}>
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
