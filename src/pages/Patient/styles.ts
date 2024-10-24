import styled from 'styled-components'

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const Statement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 1.75rem;
  background: ${(props) => props.theme.colors.white};
  border-radius: 6px;

  h1 {
    ${(props) => props.theme.mixins.titleM}
  }

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    padding: 1.75rem;
    border-radius: 6px;
    background: ${(props) => props.theme.colors.white};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    h1 {
      ${(props) => props.theme.mixins.titleM}
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    span {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    button {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 6px;

      background: ${(props) => props.theme.colors['blue-300']};
      color: ${(props) => props.theme.colors.white};
      ${(props) => props.theme.mixins.textM}
      cursor: pointer;

      &:hover {
        background: ${(props) => props.theme.colors['blue-500']};
      }
    }

    p.nullInfo {
      color: ${(props) => props.theme.colors['gray-400']};
    }
  }

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`

export const SchedulesContainer = styled.div`
  margin-top: -0.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`

export const RescheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: ${(props) => props.theme.colors.yellow};
      color: ${(props) => props.theme.colors.white};
      border: none;
      border-radius: 6px;
      ${(props) => props.theme.mixins.textM}
      cursor: pointer;

      &:hover {
        background: ${(props) => props.theme.colors['yellow-light']};
      }
    }
  }
`

export const RescheduleButton = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 720px;

  padding: 0.5rem;

  align-self: center;

  button {
    width: 100%;
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

    ${(props) => props.theme.mixins.textM}
  }
`

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
