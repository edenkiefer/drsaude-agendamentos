/* {
  "local_id": 0,
	"paciente_id": 5,
	"profissional_id": 10,
	"especialidade_id": 95,
	"procedimento_id": 5,
	"data": "08-08-2018",
	"horario": "15:00:00",
	"valor": 550,
  "plano": 0,
} */

import { format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '../axios'

interface Appointment {
  localId: number
  pacienteId: number
  profissionalId: number
  especialidadeId: number
  procedimentoId: number
  data: string
  horario: string
  valor: number
  plano: number
}

export const createNewAppointment = async (
  newAppointment: Appointment,
): Promise<string> => {
  const {
    localId,
    pacienteId,
    profissionalId,
    especialidadeId,
    procedimentoId,
    data,
    horario,
    valor,
    plano,
  } = newAppointment

  const formatedHorario = horario + ':00'
  const formatedDate = format(formatISO(data), 'dd-MM-yyyy', {
    locale: ptBR,
  })

  console.log({
    local_id: localId,
    paciente_id: pacienteId,
    profissional_id: profissionalId,
    especialidade_id: especialidadeId,
    procedimento_id: procedimentoId,
    data: formatedDate,
    horario: formatedHorario,
    valor,
    plano,
  })
  const appointment = await api.post('/appoints/new-appoint', {
    local_id: localId,
    paciente_id: pacienteId,
    profissional_id: profissionalId,
    especialidade_id: especialidadeId,
    procedimento_id: procedimentoId,
    data: formatedDate,
    horario: formatedHorario,
    valor,
    plano,
  })

  return appointment.data.content.agendamento_id
}
