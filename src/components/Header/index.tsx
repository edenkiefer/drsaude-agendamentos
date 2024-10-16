import {
  ArrowCircleRight,
  CalendarDots,
  UserCircle,
} from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { StatusBar } from './StatusBar'
import { Sidebar, SidebarItem } from './styles'

export function Header() {
  const { statusBar } = useContext(AppointmentsContext)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* <HeaderContainer>
        <div className="button">
          {statusBar !== 0 && statusBar !== 4 && (
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
      </HeaderContainer> */}
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
