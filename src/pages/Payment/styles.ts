import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  button {
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

    ${(props) => props.theme.mixins.textM}
  }
`

export const PaymentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`
