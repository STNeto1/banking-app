import { extendTheme } from "native-base";

export const theme = extendTheme({});

type CustomThemeType = typeof theme;

declare module "native-base" {
	interface ICustomTheme extends CustomThemeType {}
}
