/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { SchedulesData } from '../../@types/models'
import { transformScheduleData } from '../../utils/transformData'
import { api } from '../axios'

interface getSchedulesParams {
  tipo: string
  procedimento_id: string
  unidade_id: string
  data_start: string
  data_end: string
  profissional_id?: string
}

export const getSchedules = async (
  unityId: string,
  procedureId: string,
  dataStart: string,
  dataEnd: string,
  professionalId?: string,
): Promise<SchedulesData[]> => {
  let params: getSchedulesParams = {
    tipo: 'P',
    procedimento_id: procedureId,
    unidade_id: unityId,
    data_start: dataStart,
    data_end: dataEnd,
  }

  if (professionalId) {
    params = { ...params, profissional_id: professionalId }
  }

  const schedulesResponse = await api.get(`/appoints/available-schedule`, {
    params,
  })

  const schedulesData = await transformScheduleData(
    schedulesResponse.data.content,
  )

  return schedulesData
}

export interface SchedulesByPatient {
  appointmentId: string
  date: string
  hour: string
  value: string
  patientId: string
  professionalId: string
  procedureId: string
}

export const getSchedulesByPatientId = async (): Promise<
  SchedulesByPatient[]
> => {
  const schedules: SchedulesByPatient[] = []

  const today = new Date()

  const days90 = 90 * 24 * 60 * 60 * 1000

  const ninetyDaysAgo = new Date(today.getTime() - days90)

  const ninetyDaysAhead = new Date(today.getTime() + days90)

  const schedulesResponse = await api.get('/appoints/search', {
    params: {
      data_start: format(ninetyDaysAgo, 'dd-MM-yyyy', {
        locale: ptBR,
      }),
      data_end: format(ninetyDaysAhead, 'dd-MM-yyyy', {
        locale: ptBR,
      }),
      paciente_id: localStorage.getItem('Auth:user'),
    },
  })

  schedulesResponse.data.content.forEach((item: any) => {
    if (item.status_id !== 11) {
      schedules.push({
        appointmentId: item.agendamento_id,
        date: item.data,
        hour: item.horario,
        value: item.valor,
        patientId: item.paciente_id,
        professionalId: item.profissional_id,
        procedureId: item.procedimento_id,
      })
    }
  })

  return schedules
}

export const cancelScheduleById = async (id: string): Promise<string> => {
  const cancelResponse = await api.post('/appoints/cancel-appoint', null, {
    params: {
      motivo_id: 1,
      agendamento_id: id,
    },
  })

  const response = cancelResponse.data.content

  return response
}

export const rescheduleById = async (
  appointmentId: string,
  hour: string,
  date: string,
): Promise<string> => {
  const formatedHorario = hour + ':00'
  const formatedDate = format(parseISO(date), 'dd-MM-yyyy', {
    locale: ptBR,
  })

  if (appointmentId && appointmentId && appointmentId) {
    const response = await api.post('/appoints/reschedule', null, {
      params: {
        agendamento_id: appointmentId,
        horario: formatedHorario,
        data: formatedDate,
        motivo_id: 15,
      },
    })

    return response.data.content
  }

  return ''
}
