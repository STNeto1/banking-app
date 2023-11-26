import { Heading, VStack } from "@gluestack-ui/themed";
import { useUser } from "../lib/stores/auth";
import { HomeProps } from "../routes";

export const HomeScreen = ({}: HomeProps) => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$white"
    >
      <Heading size="2xl">Hi {user.name}!</Heading>
    </VStack>
  );
};
