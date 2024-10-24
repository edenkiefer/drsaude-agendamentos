import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './components/Header'
import { AppointmentsContext } from './contexts/AppointmentsContext'
import { AppContainer } from './styles/global'

function App() {
  const { headerTitle } = useContext(AppointmentsContext)

  return (
    <>
      <Header />
      <AppContainer>
        <h1>{headerTitle}</h1>
        <Outlet />
      </AppContainer>
    </>
  )
}

export default App
