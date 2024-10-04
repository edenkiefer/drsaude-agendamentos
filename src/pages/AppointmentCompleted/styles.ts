import styled from 'styled-components'

export const AppointmentCompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    ${(props) => props.theme.mixins.titleL}
  }

  iframe {
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors['gray-400']};
    border-radius: 6px;
    height: 320px;
  }

  span.preparo {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors['gray-400']};
    background: ${(props) => props.theme.colors.white};
    border-radius: 6px;
  }
`
