import styled from 'styled-components'

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const PatientInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  background: ${(props) => props.theme.colors.white};
  border-radius: 6px;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
  }

  @media (max-width: 992px) {
    div {
      justify-content: center;
    }
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    ${(props) => props.theme.mixins.titleM}
  }

  table {
    max-width: 100%;
  }

  th {
    text-align: left;
  }

  td:last-child,
  th:last-child {
    text-align: right;
  }

  td {
    padding-bottom: 0.25rem;
    ${(props) => props.theme.mixins.textS}
    button {
      padding: 0.15rem;
      margin-left: 0.25rem;
      border-radius: 6px;
      color: ${(props) => props.theme.colors.white};
      border: none;
      cursor: pointer;
    }

    button:nth-child(1) {
      background: ${(props) => props.theme.colors['blue-500']};
      border-radius: 6px;
    }
    button:nth-child(2) {
      background: ${(props) => props.theme.colors.yellow};
      border-radius: 6px;
    }
    button:nth-child(3) {
      background: ${(props) => props.theme.colors['red-700']};
      border-radius: 6px;
    }
  }
`
