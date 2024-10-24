import styled from 'styled-components'

export const AppointmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  background: ${(props) => props.theme.colors.white};
  padding: 1.75rem;
  border-radius: 6px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      display: flex;
      gap: 0.25rem;
      flex-direction: column;
    }
  }
`

export const ActionsContainer = styled.span`
  display: flex;
  gap: 0.5rem;

  margin-top: 0.75rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    width: 100%;

    padding: 0.5rem;

    color: ${(props) => props.theme.colors.white};

    border: none;
    border-radius: 6px;
    cursor: pointer;

    ${(props) => props.theme.mixins.textM}
  }

  button:first-child {
    background: ${(props) => props.theme.colors.yellow};
  }

  button:last-child {
    background: ${(props) => props.theme.colors['red-400']};
  }
`

export const ModalContainer = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    width: 100%;
    ${(props) => props.theme.mixins.titleM}
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button {
      background: none;
      color: ${(props) => props.theme.colors['gray-600']};
      width: 15%;
    }
  }

  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    width: 100%;

    padding: 0.5rem;

    color: ${(props) => props.theme.colors.white};

    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: ${(props) => props.theme.colors['red-400']};

    ${(props) => props.theme.mixins.textM}
  }

  button:last-child {
    background: ${(props) => props.theme.colors['gray-400']};
  }
`
