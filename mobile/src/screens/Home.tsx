import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import {
  ArrowDownSquare,
  ArrowUpSquare,
  ChevronRight,
  DollarSign,
  Wallet,
} from "lucide-react-native";
import { useUser } from "../lib/stores/auth";
import { HomeProps } from "../routes";
import { moneyString } from "../lib/utils";

export const HomeScreen = (_: HomeProps) => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <VStack
      flex={1}
      backgroundColor="$white"
      paddingTop={"$16"}
      paddingHorizontal={"$4"}
      gap={"$4"}
    >
      <VStack>
        <Heading color="#001533" size={"2xl"} fontWeight="$bold">
          Hello, {user.name}
        </Heading>
        <Text color="#001533" fontSize={"$sm"} fontWeight="$light">
          [[Good something]], remember to [[do something]] 💰
        </Text>
      </VStack>

      <Center bgColor="$blue700" borderRadius={"$lg"}>
        <VStack alignItems="center" paddingVertical={"$5"} gap={"$2"}>
          <Text color="$blue100" fontSize={"$md"} fontWeight="$normal">
            Total Savings
          </Text>
          <Heading color="$white" fontSize={"$2xl"} fontWeight="$bold">
            {moneyString(user.balance ?? 0)}
          </Heading>
        </VStack>
      </Center>

      <HStack width={"100%"} columnGap={"$4"}>
        <Button
          bgColor="$green300"
          $active={{
            bgColor: "$green400",
          }}
          borderRadius={"$md"}
          columnGap={"$2"}
          flex={1}
          height={"$16"}
        >
          <ButtonIcon as={ArrowUpSquare} color="#5E5E5E" />
          <ButtonText color="#5E5E5E" fontSize={"$lg"}>
            Add money
          </ButtonText>
        </Button>

        <Button
          bgColor="$orange300"
          $active={{
            bgColor: "$orange400",
          }}
          borderRadius={"$md"}
          columnGap={"$2"}
          flex={1}
          height={"$16"}
        >
          <ButtonIcon as={ArrowDownSquare} color="#5E5E5E" />
          <ButtonText color="#5E5E5E" fontSize={"$lg"}>
            Withdraw
          </ButtonText>
        </Button>
      </HStack>

      <VStack
        alignItems="flex-start"
        paddingVertical={"$5"}
        gap={"$4"}
        width={"100%"}
      >
        <Text color="#001533" size={"xl"} fontWeight="$bold">
          Get your money working for you
        </Text>

        <Pressable
          paddingVertical={"$2"}
          paddingHorizontal={"$4"}
          borderWidth={1}
          borderColor="$blueGray300"
          width={"100%"}
          borderRadius={"$md"}
          $active={{
            backgroundColor: "$blueGray100",
          }}
        >
          <HStack
            borderRadius={"$md"}
            paddingVertical={"$3"}
            paddingHorizontal={"$4"}
            columnGap={"$2"}
            width={"100%"}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" columnGap={"$4"}>
              <ButtonIcon as={Wallet} size="lg" color="$blue900" />
              <ButtonText color="#001533" fontSize={"$lg"}>
                Save for an emergency
              </ButtonText>
            </HStack>

            <ButtonIcon as={ChevronRight} color="#001533" />
          </HStack>
        </Pressable>

        <Pressable
          paddingVertical={"$2"}
          paddingHorizontal={"$4"}
          borderWidth={1}
          borderColor="$blueGray300"
          width={"100%"}
          borderRadius={"$md"}
          $active={{
            backgroundColor: "$blueGray100",
          }}
        >
          <HStack
            borderRadius={"$md"}
            paddingVertical={"$3"}
            paddingHorizontal={"$4"}
            columnGap={"$2"}
            width={"100%"}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" columnGap={"$4"}>
              <ButtonIcon as={DollarSign} size="lg" color="$blue900" />
              <ButtonText color="#001533" fontSize={"$lg"}>
                Invest your money
              </ButtonText>
            </HStack>

            <ButtonIcon as={ChevronRight} color="#001533" />
          </HStack>
        </Pressable>
      </VStack>

      <VStack
        alignItems="flex-start"
        paddingVertical={"$5"}
        gap={"$4"}
        width={"100%"}
      >
        <Text color="#001533" size={"xl"} fontWeight="$bold">
          Ways to earn more money
        </Text>

        <Pressable
          paddingVertical={"$2"}
          paddingHorizontal={"$4"}
          borderWidth={1}
          borderColor="$blueGray300"
          width={"100%"}
          borderRadius={"$md"}
          $active={{
            backgroundColor: "$blueGray100",
          }}
        >
          <HStack
            borderRadius={"$md"}
            paddingVertical={"$3"}
            paddingHorizontal={"$4"}
            columnGap={"$2"}
            width={"100%"}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center" columnGap={"$4"}>
              <ButtonIcon as={Wallet} size="lg" color="$green700" />
              <ButtonText color="#001533" fontSize={"$lg"}>
                Invite your friends
              </ButtonText>
            </HStack>

            <ButtonIcon as={ChevronRight} color="#001533" />
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
};
