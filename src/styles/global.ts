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

  margin: 3rem auto 2rem;
  padding: 0 1.25rem;

  h1 {
    ${(props) => props.theme.mixins.titleL}
    margin-bottom: 1rem;
  }
`

export const BackButton = styled.button`
  position: absolute;
  display: none;
  margin-left: -4rem;

  color: ${(props) => props.theme.colors['gray-600']};

  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
