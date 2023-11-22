import { FC } from "react";
import { Button, Text, YStack } from "tamagui";

export const AuthScreen: FC = () => {
  return (
    <YStack
      fullscreen
      backgroundColor="$background"
      paddingBottom={"$10"}
      paddingHorizontal={"$4"}
      alignItems="center"
      justifyContent="center"
    >
      <YStack flex={1} alignItems="flex-start" justifyContent="center">
        <Text color={"#001533"} fontSize={30} fontWeight={"700"}>
          Welcome to [[Placeholder]]
        </Text>
        <Text color={"#001533"} fontSize={17} fontWeight={"300"}>
          The bank for everyone
        </Text>
      </YStack>

      <YStack width={"100%"} gap={"$4"}>
        <Button
          backgroundColor={"$blue10"}
          pressStyle={{
            backgroundColor: "$blue11",
          }}
          color={"white"}
        >
          Create your free account
        </Button>
        <Button
          backgroundColor={"white"}
          pressStyle={{
            backgroundColor: "$backgroundPress",
          }}
          borderColor={"$blue5"}
        >
          Log into your account
        </Button>
      </YStack>
    </YStack>
  );
};
