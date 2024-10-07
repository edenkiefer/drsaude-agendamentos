/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { SchedulesData } from '../../@types/models'
import { transformScheduleData } from '../../utils/transformData'
import { api } from '../axios'

export const getSchedules = async (
  unityId: string,
  specialtieId: string,
  dataStart: string,
  dataEnd: string,
): Promise<SchedulesData[]> => {
  const schedulesResponse = await api.get(`/appoints/available-schedule`, {
    params: {
      tipo: 'E',
      especialidade_id: specialtieId,
      unidade_id: unityId,
      data_start: dataStart,
      data_end: dataEnd,
    },
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
    schedules.push({
      appointmentId: item.agendamento_id,
      date: item.data,
      hour: item.horario,
      value: item.valor,
    })
  })

  return schedules
}
