import styled, { createGlobalStyle } from 'styled-components'

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

export const AppContainer = styled.div`
  width: 100%;
  max-width: 920px;

  margin: 4rem auto 2rem;
  padding: 0 1.25rem;
`
