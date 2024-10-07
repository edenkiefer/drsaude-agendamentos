import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Appointment from './pages/Appointment'
import { AppointmentCompleted } from './pages/AppointmentCompleted'
import { Confirmation } from './pages/Confirmation'
import Patient from './pages/Patient'
import { PatientRegistration } from './pages/PatientRegistration'
import { Payment } from './pages/Payment'
import { SignIn } from './pages/SignIn'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Appointment />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/patient-registration',
        element: <PatientRegistration />,
      },
      {
        path: '/confirmation',
        element: <Confirmation />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/appointment-completed',
        element: <AppointmentCompleted />,
      },
      {
        path: '/patient',
        element: <Patient />,
      },
    ],
  },
])
