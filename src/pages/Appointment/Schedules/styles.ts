import styled from 'styled-components'

export const SchedulesContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  h1 {
    ${(props) => props.theme.mixins.titleM}
  }
  padding-bottom: 3rem;
`

export const DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`

export const LoadButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 50px;

  background: ${(props) => props.theme.colors.yellow};
  color: ${(props) => props.theme.colors['gray-600']};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => props.theme.colors['yellow-light']};
  }

  cursor: pointer;

  ${(props) => props.theme.mixins.textM}
`
