import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    @media screen and (max-width: 1500px) {
      font-size: 60%;
    }
    @media screen and (max-width: 1400px) {
      font-size: 55%;
    }
    @media screen and (max-width: 1300px) {
      font-size: 52%;
    }
  }
  
  body {
    margin: 0;
    padding: 0;
    background: ${({theme}) => theme.colors.mainBG };
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;