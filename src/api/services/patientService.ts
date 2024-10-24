import { format, parse } from 'date-fns'

import { PatientData } from '../../@types/models'
import { api } from '../axios'

interface PatientResponse {
  id: number | string
  nome: string
  nascimento: string
  documentos: {
    cpf: string
    rg: string
  }
  sexo: string
  email: string[]
  celulares: string[]
  bairro: string
  cep: string
  cidade: string
  endereco: string
  estado: string
  numero: string
}

export const signIn = async (
  cpf: string,
  birthDate: string,
): Promise<PatientData> => {
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

export const getPatientById = async (id: string): Promise<PatientData> => {
  const patientData = await api.get('/patient/search', {
    params: {
      paciente_id: id,
    },
  })

  const patient: PatientResponse = patientData.data.content

  const cellPhone =
    patient.celulares[0] && patient.celulares[0].length > 12
      ? patient.celulares[0]
      : ''

  const email =
    patient.email[0] && patient.email[0].length > 11 ? patient.email[0] : ''

  return {
    id: patient.id.toString(),
    name: patient.nome,
    cpf: patient.documentos.cpf,
    rg: patient.documentos.rg,
    cellPhone,
    email,
    dateOfBirth: patient.nascimento,
    gender: patient.sexo,
    address: patient.endereco,
    city: patient.cidade,
    cep: patient.cep,
    neighborhood: patient.bairro,
    number: patient.numero,
    state: patient.estado,
  }
}

interface UpdatePatientData {
  email?: string
  celular?: string
  endereco?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
}

export const updatePatientById = async (
  updatePatientData: UpdatePatientData,
): Promise<string> => {
  const patientData = await api.post('/patient/edit', null, {
    params: {
      ...updatePatientData,
      paciente_id: localStorage.getItem('Auth:user'),
    },
  })

  return patientData.data.content
}
