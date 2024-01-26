import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    @media screen and (max-width: 1500px) {
      font-size: 55%;
    }
    @media screen and (max-width: 1100px) {
      font-size: 45%;
    }
    @media screen and (max-width: 900px) {
      font-size: 40%;
    }
    @media screen and (max-width: 768px) {
      font-size: 50%;
    }
  }
  
  html, body {
    margin: 0;
    padding: 0;
    /* background: ${({theme}) => theme.colors.mainBG}; */
    background-color: #FFFFFF !important;
  }

  html, body, * {
    font-family: ${({theme}) => theme.fontsFamily.primary};
    font-style: normal;
  }

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 6rem;
    /* font-size: 3.75rem; */
    line-height: 104%;
    text-transform: uppercase;
    color: #FFFFFF;
  }
  p {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }

  body .calendly-overlay {
    .calendly-popup {
      width: 100%;
      max-width: 100vw;
      height: 100%;
    }
    // .calendly-popup-close {
    //   background: url('/svgs/closeMyFavourite.svg') no-repeat;
    //   background-size: contain;
    //   transform: translate(-50%, -50%);
    //   top: 25%;
    //   left: 90%;
    //   width: 15px;
    //   height: 15px;
    // }
  }

`;

export default GlobalStyle;