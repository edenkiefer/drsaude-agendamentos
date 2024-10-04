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
