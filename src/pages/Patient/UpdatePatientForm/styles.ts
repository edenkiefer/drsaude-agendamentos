import styled from 'styled-components'

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  min-width: 320px;

  h1 {
    ${(props) => props.theme.mixins.titleL}
  }

  h2 {
    ${(props) => props.theme.mixins.titleM}
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div {
    display: grid;
    gap: 1rem;
  }

  div.address,
  div.personal-data {
    grid-template-columns: 1fr 1fr;
  }

  button {
    padding: 1rem;
    border: none;
    border-radius: 6px;

    background: ${(props) => props.theme.colors['blue-300']};
    color: ${(props) => props.theme.colors.white};

    ${(props) => props.theme.mixins.textM}

    &:hover {
      background: ${(props) => props.theme.colors['blue-500']};
    }

    transition: 0.2s;
    cursor: pointer;
  }

  button:last-child {
    background: ${(props) => props.theme.colors['gray-400']};
    &:hover {
      background: ${(props) => props.theme.colors['gray-600']};
    }
  }
  @media (max-width: 992px) {
    div {
      display: flex;
      flex-direction: column;
    }

    span {
      width: 100%;
    }
  }
`
