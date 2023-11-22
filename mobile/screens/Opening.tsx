import { PiggyBank } from "@tamagui/lucide-icons";
import { FC, useEffect, useMemo, useState } from "react";
import { Button, H2, Image, Text, XStack, YStack } from "tamagui";
import personal from "../assets/images/personal.png";
import piggy from "../assets/images/piggy.png";
import transfer from "../assets/images/transfer.png";
import { FadeInOut } from "../components/transitions";

type TSteps = 1 | 2 | 3;
type TScreenState = "opening" | "steps";

export const OpeningScreen = () => {
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
    <YStack
      fullscreen
      backgroundColor="$background"
      paddingBottom={"$10"}
      paddingHorizontal={"$4"}
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

      <XStack alignItems="center" justifyContent="space-between">
        <Steps step={currentStep} />

        <Button
          backgroundColor={"$blue10"}
          color={"white"}
          width={"$12"}
          pressStyle={{
            backgroundColor: "$blue12",
          }}
          onPress={() => {
            if (currentStep === 3) {
              setCurrentStep(1);
              return;
            }

            setCurrentStep((currentStep + 1) as TSteps);
          }}
        >
          Next
        </Button>
      </XStack>
    </YStack>
  );
};

const Title: FC<{ title: string }> = ({ title }) => {
  return (
    <H2 color={"#001533"} fontSize={30} fontWeight={"700"}>
      {title}
    </H2>
  );
};

const Subtitle: FC<{ message: string }> = ({ message }) => {
  return (
    <Text color={"#001533"} fontSize={17} fontWeight={"300"} lineHeight={"$4"}>
      {message}
    </Text>
  );
};

const Steps: FC<{ step: 1 | 2 | 3 }> = ({ step }) => {
  const items = useMemo(() => {
    return Array.from({ length: 3 }, (_, v) => {
      if (v + 1 === step) {
        return (
          <XStack
            key={`step-${v + 1}`}
            backgroundColor={"$blue10"}
            width={30}
            height={10}
            borderRadius={99}
          />
        );
      }

      return (
        <XStack
          key={`step-${v + 1}`}
          backgroundColor={"$blue4"}
          width={10}
          height={10}
          borderRadius={99}
        />
      );
    });
  }, [step]);

  return <XStack gap={4}>{items}</XStack>;
};

const Entry: FC = () => {
  return (
    <XStack
      fullscreen
      backgroundColor="$background"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <YStack alignItems="center">
        <PiggyBank size={64} />
        <H2>Bank Placeholder</H2>
      </YStack>
    </XStack>
  );
};

const FirstStep: FC = () => {
  return (
    <YStack alignItems="center" justifyContent="center" flex={1} gap={"$8"}>
      <Image source={piggy} width={300} height={300} />

      <YStack gap={2}>
        <Title title="Save Money" />
        <Subtitle
          message="We help you meet your savings target monthly and our emergency plans
            enable you save for multiple purposes"
        />
      </YStack>
    </YStack>
  );
};

const SecondStep: FC = () => {
  return (
    <YStack alignItems="center" justifyContent="center" flex={1} gap={"$8"}>
      <Image source={transfer} width={300} height={300} />

      <YStack gap={2}>
        <Title title="Withdraw your money" />
        <Subtitle message="With just your phone number, you can withdraw your funds at any point in time from any BankMe agent close to you." />
      </YStack>
    </YStack>
  );
};

const ThirdStep: FC = () => {
  return (
    <YStack alignItems="center" justifyContent="center" flex={1} gap={"$8"}>
      <Image source={personal} width={300} height={300} />

      <YStack gap={2}>
        <Title title="Invest your money" />
        <Subtitle message="Get access to risk free investments that will multiply your income and pay high returns in few months" />
      </YStack>
    </YStack>
  );
};
