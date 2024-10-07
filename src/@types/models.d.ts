export interface BaseOption {
  id: string
  value: string
}

export interface Appointment {
  id?: string

  localId?: string
  professionalId?: string
  patientId?: string

  unity?: BaseOption
  specialtie?: BaseOption

  procedure?: BaseOption

  date?: string
  hour?: string
  price?: number
}

export interface PatientData {
  id: string
  name: string
  cpf: string
  dateOfBirth: string
  gender?: 'M' | 'F'
  email?: string
  cellPhone?: string
}

export interface ProfessionalData {
  id: string
  name: string
  treatment: string
  gender: 'Feminino' | 'Masculino'
  photo?: string
  specialties: string[]
  rqeCode?: string
  council?: string
  councilUF?: string
  concilCode?: string
}

export interface SchedulesData {
  date: string
  professionals: {
    id: string
    localId: string
    schedules: string[]
  }[]
}

export interface Procedure {
  id: string
  value: number
  name: string
}
