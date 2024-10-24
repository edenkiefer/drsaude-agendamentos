import styled from 'styled-components'

export const ProfessionalContainer = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 6px;

  @media (min-width: 992px) {
    padding: 2rem;
  }
`

export const ProfessionalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  h1 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  img {
    width: 100px;
    height: auto;
    border-radius: 6px;
    object-fit: contain;
  }

  span {
    color: ${(props) => props.theme.colors['gray-400']};
  }
`

export const Schedules = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin: 0;

  border-top: 1px solid ${(props) => props.theme.colors['gray-400']};
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media (min-width: 992px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`
