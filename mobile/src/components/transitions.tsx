import { useEffect, useState } from "react";
import { Animated } from "react-native";

export const FadeInOut = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        flex: 1,
      }}
    >
      {children}
    </Animated.View>
  );
};
