import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { Outlet } from 'react-router-dom'

import { Header } from './components/Header'
import AppointmentsContextProvider from './contexts/AppointmentsContext'
import { AppContainer } from './styles/global'

function App() {
  return (
    <AppointmentsContextProvider>
      <Header />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </AppointmentsContextProvider>
  )
}

export default App
