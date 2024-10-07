import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 2rem;

  background: ${(props) => props.theme.colors.white};

  border: 1px solid ${(props) => props.theme.colors['gray-400']};
  border-radius: 6px;

  span {
    display: flex;
    align-items: center;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }
  }

  p {
    color: ${(props) => props.theme.colors['gray-400']};
  }
`

export const ContinueButton = styled(Link)`
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
