import {
  ArrowCircleRight,
  CalendarDots,
  CaretLeft,
  UserCircle,
} from '@phosphor-icons/react'
import { List } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { StatusBar } from './StatusBar'
import { HeaderContainer, Sidebar, SidebarItem } from './styles'

export function Header() {
  const { statusBar, setStatusBar } = useContext(AppointmentsContext)

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const handleNavigate = () => {
    setStatusBar(statusBar - 1)
    navigate(-1)
  }

  useEffect(() => {
    setStatusBar(-1)
  }, [setStatusBar])

  return (
    <>
      <HeaderContainer>
        <div className="button">
          {statusBar !== 0 && statusBar !== -1 && statusBar !== 4 && (
            <button onClick={handleNavigate}>
              <CaretLeft size={40} /> Voltar
            </button>
          )}
        </div>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="sidebar">
          <button onClick={() => setIsOpen(true)}>
            <List size={40} />
          </button>
        </div>
      </HeaderContainer>
      {statusBar !== -1 && <StatusBar />}
      <Sidebar open={isOpen}>
        <span>
          <button onClick={() => setIsOpen(false)}>
            <ArrowCircleRight size={40} />
          </button>
        </span>
        <SidebarItem>
          <Link to="/">
            <CalendarDots size={32} />
            <p>Realizar agendamento</p>
          </Link>
        </SidebarItem>
        <SidebarItem>
          <Link to="/patient">
            <UserCircle size={32} />
            Área do Paciente
          </Link>
        </SidebarItem>
      </Sidebar>
    </>
  )
}
