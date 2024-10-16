import styled from 'styled-components'

export const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div.rdrDateRangeWrapper {
    border: 1px solid ${(props) => props.theme.colors['gray-400']};
    border-radius: 6px;
    ${(props) => props.theme.mixins.textS}
  }
`

export const DateRangeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`

export const ContinueButtonContainer = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 720px;

  padding: 0.5rem;

  align-self: center;
`

export const DatePicker = styled.div`
  display: flex;

  button {
    padding: 1.5rem 1rem;
    width: 100%;
  }
`
