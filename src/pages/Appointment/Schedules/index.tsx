/* eslint-disable react-hooks/exhaustive-deps */
import { addDays, format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback, useContext, useEffect, useState } from 'react'

import { SchedulesData } from '../../../@types/models'
import { getSchedules } from '../../../api/services/schedulesService'
import { Professional } from '../../../components/Professional'
import { AppointmentsContext } from '../../../contexts/AppointmentsContext'
import { DateContainer, LoadButton, SchedulesContainer } from './styles'

export interface DateRangeProps {
  startDate?: Date
  endDate?: Date
  key?: string
}

interface SchedulesProps {
  checkedScheduleButtonId: string
  setCheckedScheduleButtonId: (id: string) => void
  professionalId?: string
  unityId?: string
  procedureId?: string
}

function Schedules({
  checkedScheduleButtonId,
  setCheckedScheduleButtonId,
  professionalId,
  unityId,
  procedureId,
}: SchedulesProps) {
  const { unity, specialtie, procedure } = useContext(AppointmentsContext)

  const [schedules, setSchedules] = useState<SchedulesData[]>([])
  const [loadButtonEnabled, setLoadButtonEnabled] = useState(true)

  const fetchSchedulesData = useCallback(
    async (startDate: Date, endDate: Date) => {
      if (
        professionalId !== undefined &&
        unityId !== undefined &&
        procedureId !== undefined
      ) {
        const formatedStartDate = format(startDate, 'dd-MM-yyyy', {
          locale: ptBR,
        })
        const formatedEndDate = format(endDate, 'dd-MM-yyyy', {
          locale: ptBR,
        })

        const schedulesData = await getSchedules(
          unityId,
          procedureId,
          formatedStartDate,
          formatedEndDate,
          professionalId,
        )
        setSchedules(schedulesData)
        return
      }

      if (
        unity &&
        unity?.id !== '' &&
        specialtie &&
        specialtie.id !== '' &&
        specialtie.id !== '0' &&
        procedure &&
        procedure.id !== '' &&
        procedure.id !== '0'
      ) {
        const formatedStartDate = format(startDate, 'dd-MM-yyyy', {
          locale: ptBR,
        })
        const formatedEndDate = format(endDate, 'dd-MM-yyyy', {
          locale: ptBR,
        })

        const schedulesData = await getSchedules(
          unity.id,
          procedure.id,
          formatedStartDate,
          formatedEndDate,
        )
        setSchedules(schedulesData)
      }
    },
    [specialtie, unity, procedure],
  )

  useEffect(() => {
    fetchSchedulesData(new Date(), addDays(new Date(), 30))
    setLoadButtonEnabled(true)
  }, [specialtie, unity, procedure])

  const loadMoreSchedules = async () => {
    fetchSchedulesData(new Date(), addDays(new Date(), 60))
    setLoadButtonEnabled(false)
  }

  return (
    <>
      {procedure?.id !== '0' && schedules && schedules.length > 0 ? (
        <SchedulesContainer>
          {schedules.map((schedule) => {
            return (
              <DateContainer key={schedule.date}>
                <h1>
                  {format(parseISO(schedule.date), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </h1>
                {schedule.professionals.map((professional) => {
                  if (professional.schedules?.length > 0) {
                    return (
                      <Professional
                        key={professional.id}
                        id={professional.id}
                        data={schedule.date}
                        localId={professional.localId}
                        schedules={professional.schedules}
                        checkedScheduleButtonId={checkedScheduleButtonId}
                        setCheckedScheduleButtonId={setCheckedScheduleButtonId}
                      />
                    )
                  }
                  return 'Desculpe não possúimos horários para o procedimento selecionado'
                })}
              </DateContainer>
            )
          })}
          {loadButtonEnabled ? (
            <LoadButton onClick={loadMoreSchedules}>
              Carregar mais horários
            </LoadButton>
          ) : null}
        </SchedulesContainer>
      ) : null}
    </>
  )
}

export default Schedules
