import { PiggyBank } from "lucide-react-native";
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { FC, useEffect, useMemo, useState } from "react";
import personal from "../../assets/images/personal.png";
import piggy from "../../assets/images/piggy.png";
import transfer from "../../assets/images/transfer.png";
import { FadeInOut } from "../components/transitions";
import { OpeningProps } from "../routes";

type TSteps = 1 | 2 | 3;
type TScreenState = "opening" | "steps";

export const OpeningScreen = ({ navigation }: OpeningProps) => {
  const [screenState, setScreenState] = useState<TScreenState>("opening");
  const [currentStep, setCurrentStep] = useState<TSteps>(1);

  useEffect(() => {
    if (screenState !== "opening") {
      return;
    }

    const timer = setTimeout(() => {
      setScreenState("steps");
    }, 1000);

    return () => clearTimeout(timer);
  }, [screenState]);

  if (screenState === "opening") {
    return (
      <FadeInOut>
        <Entry />
      </FadeInOut>
    );
  }

  return (
    <VStack
      paddingBottom={"$8"}
      paddingHorizontal={"$10"}
      flex={1}
      backgroundColor="$white"
    >
      {currentStep === 1 && (
        <FadeInOut>
          <FirstStep />
        </FadeInOut>
      )}
      {currentStep === 2 && (
        <FadeInOut>
          <SecondStep />
        </FadeInOut>
      )}
      {currentStep === 3 && (
        <FadeInOut>
          <ThirdStep />
        </FadeInOut>
      )}

      <HStack alignItems="center" justifyContent="space-between">
        <Steps step={currentStep} />

        <Button
          backgroundColor={"$blue500"}
          $active={{
            backgroundColor: "$blue600",
          }}
          onPress={() => {
            if (currentStep === 3) {
              // setCurrentStep(1);
              navigation.push("Auth");
              return;
            }

            setCurrentStep((currentStep + 1) as TSteps);
          }}
        >
          <ButtonText color="$white">Next</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

const Title: FC<{ title: string }> = ({ title }) => {
  return (
    <Heading size={"lg"} color={"#001533"} fontSize={30} fontWeight={"700"}>
      {title}
    </Heading>
  );
};

const Subtitle: FC<{ message: string }> = ({ message }) => {
  return (
    <Text color={"#001533"} fontSize={17} fontWeight={"300"} lineHeight={"$lg"}>
      {message}
    </Text>
  );
};

const Steps: FC<{ step: 1 | 2 | 3 }> = ({ step }) => {
  const items = useMemo(() => {
    return Array.from({ length: 3 }, (_, v) => {
      if (v + 1 === step) {
        return (
          <HStack
            key={`step-${v + 1}`}
            backgroundColor={"$blue500"}
            width={"$10"}
            height={"$4"}
            borderRadius={99}
          />
        );
      }

      return (
        <HStack
          key={`step-${v + 1}`}
          backgroundColor={"$blue300"}
          width={"$4"}
          height={"$4"}
          borderRadius={99}
        />
      );
    });
  }, [step]);

  return <HStack space={"sm"}>{items}</HStack>;
};

const Entry: FC = () => {
  return (
    <HStack
      backgroundColor="white"
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack alignItems="center">
        <PiggyBank color="black" size={150} />
        <Heading size={"lg"}>Bank [[Placeholder]]</Heading>
      </VStack>
    </HStack>
  );
};

const FirstStep: FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" flex={1} space={"xl"}>
      <Image source={piggy} width={300} height={300} alt="piggy bank" />

      <VStack space={"sm"}>
        <Title title="Save Money" />
        <Subtitle
          message="We help you meet your savings target monthly and our emergency plans
            enable you save for multiple purposes"
        />
      </VStack>
    </VStack>
  );
};

const SecondStep: FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" flex={1} space={"xl"}>
      <Image
        source={transfer}
        width={300}
        height={300}
        alt="transfering money"
      />

      <VStack space={"sm"}>
        <Title title="Withdraw your money" />
        <Subtitle message="With just your phone number, you can withdraw your funds at any point in time from any [[Placeholder]] agent close to you." />
      </VStack>
    </VStack>
  );
};

const ThirdStep: FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" flex={1} space={"xl"}>
      <Image source={personal} width={300} height={300} alt="person" />

      <VStack space={"sm"}>
        <Title title="Invest your money" />
        <Subtitle message="Get access to risk free investments that will multiply your income and pay high returns in few months" />
      </VStack>
    </VStack>
  );
};
