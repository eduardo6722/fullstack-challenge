import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    z-index: -1;
    font-family: 'Roboto', sans-serif;
  }

  body, -moz-user-input, button {
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    border-radius: 4px;
  }

  input {
    border-radius: 4px;
  }
`;
