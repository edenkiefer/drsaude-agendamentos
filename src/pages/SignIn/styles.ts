import styled from 'styled-components'

export const SignInContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 2rem auto 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  form {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    width: 100%;
  }

  p {
    text-align: center;
  }

  div {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    ${(props) => props.theme.mixins.textM}
    padding: 1rem;
    border: none;
    border-radius: 50px;

    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors['gray-600']};
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${(props) => props.theme.colors['yellow-light']};
    }
  }
`
