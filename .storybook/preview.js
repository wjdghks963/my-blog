import "@styles/globals.css";
import { themes } from "@storybook/theming";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "dark",
        value: "#000000",
      },
      { name: "light", value: "#FFFFFF" },
    ],
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: "black" },
    // Override the default light theme
    light: { ...themes.normal, appBg: "red" },
  },
};

export const globalTypes = {
  darkMode: false,
};
