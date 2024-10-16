import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import AppointmentsContextProvider from './contexts/AppointmentsContext.tsx'
import { router } from './routes.tsx'
import { GlobalStyle } from './styles/global.ts'
import { defaultTheme } from './styles/themes/defaultTheme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppointmentsContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppointmentsContextProvider>
  </StrictMode>,
)
