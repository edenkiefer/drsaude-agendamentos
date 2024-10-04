import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ButtonContainer = styled(Link)`
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
`
