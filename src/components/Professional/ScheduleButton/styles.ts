import styled from 'styled-components'

interface ScheduleButtonContainerProps {
  checked?: boolean
}

export const ScheduleButtonContainer = styled.button<ScheduleButtonContainerProps>`
  padding: 0.75rem 1rem;

  border: none;
  border-radius: 6px;
  border: 2px solid ${(props) => props.theme.colors['blue-500']};

  background-color: ${(props) =>
    props.checked ? props.theme.colors['blue-500'] : '#fff'};
  color: ${(props) =>
    props.checked ? '#fff' : props.theme.colors['blue-500']};

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors['blue-500']};
    color: #fff;
  }

  &:focus {
    box-shadow: none;
  }

  ${(props) => props.theme.mixins.textM}
`
