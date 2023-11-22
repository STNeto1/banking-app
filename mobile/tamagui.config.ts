// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { createAnimations } from "@tamagui/animations-css";
import { config } from "@tamagui/config/v2";

import { createTamagui } from "tamagui";
const tamaguiConfig = createTamagui({
	...config,
	animations: createAnimations({
		fast: "ease-in 150ms",
		medium: "ease-in 300ms",
		slow: "ease-in 450ms",
	}),
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
