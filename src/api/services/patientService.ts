import { format, parse } from 'date-fns'

import { Patient } from '../../@types/models'
import { api } from '../axios'

interface PatientResponse {
  id: number | string
  nome: string
  nascimento: string
  documentos: {
    cpf: string
  }
}

export const signIn = async (
  cpf: string,
  birthDate: string,
): Promise<Patient> => {
  cpf = cpf.replace('-', '').replace('.', '').replace('.', '')
  const patientData = await api.get('/patient/search', {
    params: {
      paciente_cpf: cpf,
    },
  })

  const patient: PatientResponse = patientData.data.content

  const birthDateFormated = format(
    parse(birthDate, 'dd/MM/yyyy', new Date()),
    'yyyy-MM-dd',
  )
  const patientBirthDateFormated = format(
    parse(patient.nascimento, 'dd-MM-yyyy', new Date()),
    'yyyy-MM-dd',
  )

  if (birthDateFormated === patientBirthDateFormated) {
    localStorage.setItem('Auth:user', patient.id.toString())

    return {
      id: patient.id.toString(),
      name: patient.nome,
      cpf: patient.documentos.cpf,
      dateOfBirth: patient.nascimento,
    }
  } else {
    return {
      id: '',
      name: '',
      cpf: '',
      dateOfBirth: '',
    }
  }
}

export const getPatientById = async (id: string): Promise<Patient> => {
  const patientData = await api.get('/patient/search', {
    params: {
      paciente_id: id,
    },
  })

  const patient: PatientResponse = patientData.data.content

  return {
    id: patient.id.toString(),
    name: patient.nome,
    cpf: patient.documentos.cpf,
    dateOfBirth: patient.nascimento,
  }
}
