import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button, Form, Input, Label, Text, XStack, YStack } from 'tamagui'

export const AuthScreen = () => {
  return (
    <YStack
      fullscreen
      backgroundColor="$background"
      paddingBottom={'$10'}
      paddingHorizontal={'$4'}
      justifyContent="center"
    >
      <YStack flex={1} alignItems="flex-start" justifyContent="center">
        <Text color={'#001533'} fontSize={30} fontWeight={'700'}>
          Welcome to [[Placeholder]]
        </Text>
        <Text color={'#001533'} fontSize={17} fontWeight={'300'}>
          The bank for everyone
        </Text>
      </YStack>

      <YStack width={'100%'} gap={'$4'}>
        <Button
          backgroundColor={'$blue10'}
          pressStyle={{
            backgroundColor: '$blue11'
          }}
          color={'white'}
        >
          Create your free account
        </Button>
        <Button
          backgroundColor={'white'}
          pressStyle={{
            backgroundColor: '$backgroundPress'
          }}
          borderColor={'$blue5'}
        >
          Log into your account
        </Button>
      </YStack>
    </YStack>
  )
}

export const LoginScreen = () => {
  return (
    <YStack
      fullscreen
      backgroundColor="$background"
      paddingBottom={'$10'}
      paddingHorizontal={'$4'}
      justifyContent="center"
    >
      <YStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={'$3'}
          variant="outlined"
          pressStyle={{
            backgroundColor: '$backgroundPress'
          }}
          icon={<ChevronLeft size={24} />}
        />

        <YStack
          flex={0.5}
          gap={'$4'}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Text color={'$blue10'} fontSize={30} fontWeight={'700'}>
            Sign into your Account
          </Text>
          <Text color={'#001533'} fontSize={15} fontWeight={'300'}>
            Log into your BankMe account
          </Text>
        </YStack>
      </YStack>

      <Form
        flex={1.7}
        justifyContent="center"
        onSubmit={() => console.log('submitting')}
      >
        <YStack minWidth={300} space="$2" flex={1} justifyContent="center">
          <YStack alignItems="flex-start">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              width={'100%'}
              autoComplete="email"
              backgroundColor={'$backgroundHover'}
              clearButtonMode="unless-editing"
            />
          </YStack>

          <YStack alignItems="flex-start">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={'100%'}
              backgroundColor={'$backgroundHover'}
              clearButtonMode="unless-editing"
            />
          </YStack>

          <YStack
            paddingTop={'$4'}
            alignItems="flex-start"
            justifyContent="center"
            gap={'$2'}
          >
            <Text color={'$blue12Light'} fontSize={15} fontWeight={'300'}>
              Have you forgotten your password?
            </Text>
            <Text color={'$blue11'} fontSize={15} fontWeight={'400'}>
              Click here to reset your password
            </Text>
          </YStack>
        </YStack>

        <YStack alignItems="flex-start" justifyContent="center" gap="$4">
          <Form.Trigger asChild>
            <Button width={'100%'} backgroundColor={'$blue10'} color={'white'}>
              Sign in
            </Button>
          </Form.Trigger>

          <XStack width={'100%'} gap={'$2'} justifyContent={'center'}>
            <Text fontSize={14} fontWeight={'400'}>
              Do you not have a [[Placeholder]] account?
            </Text>
            <Text color={'$blue10'} fontSize={14} fontWeight={'400'}>
              Sign up here
            </Text>
          </XStack>
        </YStack>
      </Form>
    </YStack>
  )
}

export const RegisterScreen = () => {
  return (
    <YStack
      fullscreen
      backgroundColor="$background"
      paddingBottom={'$10'}
      paddingHorizontal={'$4'}
      justifyContent="center"
    >
      <YStack flex={0.75} alignItems="flex-start" justifyContent="flex-end">
        <Button
          size={'$3'}
          variant="outlined"
          pressStyle={{
            backgroundColor: '$backgroundPress'
          }}
          icon={<ChevronLeft size={24} />}
        />

        <YStack
          flex={0.5}
          gap={'$4'}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Text color={'$blue10'} fontSize={30} fontWeight={'700'}>
            Create Account
          </Text>
          <Text color={'#001533'} fontSize={15} fontWeight={'300'}>
            Open a BankMe account with a few details.
          </Text>
        </YStack>
      </YStack>

      <Form
        flex={1.7}
        justifyContent="center"
        onSubmit={() => console.log('submitting')}
      >
        <YStack minWidth={300} space="$2" flex={1} justifyContent="center">
          <YStack alignItems="flex-start">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              width={'100%'}
              backgroundColor={'$backgroundHover'}
              autoComplete="name"
              clearButtonMode="unless-editing"
            />
          </YStack>

          <YStack alignItems="flex-start">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@mail.com"
              width={'100%'}
              autoComplete="email"
              backgroundColor={'$backgroundHover'}
              clearButtonMode="unless-editing"
            />
          </YStack>

          <YStack alignItems="flex-start">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={'100%'}
              backgroundColor={'$backgroundHover'}
              clearButtonMode="unless-editing"
            />
          </YStack>

          <YStack alignItems="flex-start">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              textContentType="password"
              secureTextEntry
              autoComplete="password"
              placeholder="JohnDoe123"
              width={'100%'}
              backgroundColor={'$backgroundHover'}
              clearButtonMode="unless-editing"
            />
          </YStack>
        </YStack>

        <YStack alignItems="flex-start" justifyContent="center" gap="$4">
          <Form.Trigger asChild>
            <Button width={'100%'} backgroundColor={'$blue10'} color={'white'}>
              Create your account
            </Button>
          </Form.Trigger>

          <XStack width={'100%'} gap={'$2'} justifyContent={'center'}>
            <Text fontSize={14} fontWeight={'400'}>
              Do you already have a [[Placeholder]] account?
            </Text>
            <Text color={'$blue10'} fontSize={14} fontWeight={'400'}>
              Sign in here
            </Text>
          </XStack>
        </YStack>
      </Form>
    </YStack>
  )
}
