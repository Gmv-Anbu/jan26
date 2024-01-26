import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalstyle";
import { defaultTheme } from '../styles/themes/default'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle></GlobalStyle>
        <Story />
      </ThemeProvider>
    </>
  ),
];
