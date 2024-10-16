import { createContext, ReactNode, useState } from 'react'

import { Appointment, BaseOption, PatientData } from '../@types/models'

interface AppointmentsContextType extends Appointment {
  statusBar: number
  professionalName: string
  patient: PatientData
  headerTitle: string

  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>
  setUnity: React.Dispatch<React.SetStateAction<BaseOption>>
  setProfessionalName: React.Dispatch<React.SetStateAction<string>>
  setSpecialtie: React.Dispatch<React.SetStateAction<BaseOption>>
  setProcedure: React.Dispatch<React.SetStateAction<BaseOption>>
  setProfessionalId: React.Dispatch<React.SetStateAction<string>>
  setLocalId: React.Dispatch<React.SetStateAction<string>>
  setDate: React.Dispatch<React.SetStateAction<string>>
  setHour: React.Dispatch<React.SetStateAction<string>>
  setPatient: React.Dispatch<React.SetStateAction<PatientData>>
  setPrice: React.Dispatch<React.SetStateAction<number>>

  setStatusBar: React.Dispatch<React.SetStateAction<number>>
}

export const AppointmentsContext = createContext({} as AppointmentsContextType)

interface AppointmentsContextProviderProps {
  children: ReactNode
}

function AppointmentsContextProvider({
  children,
}: AppointmentsContextProviderProps) {
  const [unity, setUnity] = useState<BaseOption>({
    id: '',
    value: '',
  })

  const [specialtie, setSpecialtie] = useState<BaseOption>({
    id: '',
    value: '',
  })

  const [procedure, setProcedure] = useState<BaseOption>({
    id: '',
    value: '',
  })

  const [patient, setPatient] = useState<PatientData>({
    id: '',
    cpf: '',
    name: '',
    dateOfBirth: '',
  })

  const [professionalId, setProfessionalId] = useState('')
  const [professionalName, setProfessionalName] = useState('')
  const [localId, setLocalId] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [price, setPrice] = useState(0)

  const [statusBar, setStatusBar] = useState(0)

  const [headerTitle, setHeaderTitle] = useState('')

  return (
    <AppointmentsContext.Provider
      value={{
        specialtie,
        unity,
        procedure,
        headerTitle,
        date,
        hour,
        professionalId,
        localId,
        setDate,
        setHour,
        statusBar,
        professionalName,
        patient,
        price,

        setHeaderTitle,
        setLocalId,
        setProfessionalId,
        setProfessionalName,
        setStatusBar,
        setUnity,
        setSpecialtie,
        setProcedure,
        setPatient,
        setPrice,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  )
}

export default AppointmentsContextProvider
