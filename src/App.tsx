import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { CaretLeft } from 'phosphor-react'
import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from './components/Header'
import { AppointmentsContext } from './contexts/AppointmentsContext'
import { AppContainer, BackButton } from './styles/global'

function App() {
  const { headerTitle, statusBar, setStatusBar } =
    useContext(AppointmentsContext)

  const navigate = useNavigate()

  const handleNavigate = () => {
    setStatusBar(statusBar - 1)
    navigate(-1)
  }
  return (
    <>
      <Header />

      <AppContainer>
        <span>
          {statusBar !== 0 && statusBar !== 4 && (
            <BackButton onClick={handleNavigate}>
              <CaretLeft size={40} />
            </BackButton>
          )}
          <h1>{headerTitle}</h1>
        </span>
        <Outlet />
      </AppContainer>
    </>
  )
}

export default App
