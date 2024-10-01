import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['gray-600']};
  }

  body {
    background: ${(props) => props.theme.colors['gray-100']};
    color: ${(props) => props.theme.colors['gray-600']};
  }

  body, input, textarea {
    ${(props) => props.theme.mixins.textM}
  }

`
