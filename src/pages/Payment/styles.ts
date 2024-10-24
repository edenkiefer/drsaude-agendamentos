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

  form {
    > button {
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

      cursor: pointer;

      ${(props) => props.theme.mixins.textM}
    }
  }
`

export const PaymentTypesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

interface PaymentTypeButtonProps {
  isSelected: boolean
}

export const PaymentTypeButton = styled.button<PaymentTypeButtonProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;

  border: none;
  border-radius: 6px;

  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.white
      : props.theme.colors['gray-600']};
  background: ${(props) =>
    props.isSelected
      ? props.theme.colors['blue-300']
      : props.theme.colors.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors['blue-300']};
    color: ${(props) => props.theme.colors.white};
  }

  cursor: pointer;

  ${(props) => props.theme.mixins.textM}
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
