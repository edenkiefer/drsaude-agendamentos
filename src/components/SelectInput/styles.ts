import styled from 'styled-components'

export const SelectInputContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    ${(props) => props.theme.mixins.textM}
    strong {
      color: ${(props) => props.theme.colors['red-700']};
    }
  }

  select {
    width: 100%;
    padding: 0.75rem;

    color: ${(props) => props.theme.colors['gray-600']};

    border: 1px solid ${(props) => props.theme.colors['gray-400']};
    border-radius: 6px;

    ${(props) => props.theme.mixins.textM};
  }
`
