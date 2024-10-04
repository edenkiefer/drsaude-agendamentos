import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 1rem 2rem;

  width: 100%;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  a {
    display: none;
    font-size: 1.2rem;
    text-decoration: none;

    cursor: pointer;
    align-self: flex-end;
  }

  img {
    width: 120px;
    height: auto;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.button {
    justify-content: flex-start;
    padding-left: 1rem;
  }

  div.sidebar {
    justify-content: flex-end;
    padding-right: 1rem;
  }
`

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar = styled.div<SidebarProps>`
  height: 100vh;
  background-color: ${(props) => props.theme.colors['gray-100']};
  border-left: 1px solid ${(props) => props.theme.colors['gray-200']};
  color: white;
  transition: all 1s ease;
  position: fixed;
  top: 0;
  right: 0;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  span {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
`

export const SidebarItem = styled.div`
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;

    text-decoration: none;
    color: ${(props) => props.theme.colors['gray-800']};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors['gray-200']};
  }
`
