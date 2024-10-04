import styled from 'styled-components'

export const SchedulesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  h1 {
    ${(props) => props.theme.mixins.titleM}
  }
`

export const DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`
