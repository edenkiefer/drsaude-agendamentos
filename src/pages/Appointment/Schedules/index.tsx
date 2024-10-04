/* eslint-disable react-hooks/exhaustive-deps */
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback, useContext, useEffect, useState } from 'react'

import { SchedulesData } from '../../../@types/models'
import { getSchedules } from '../../../api/services/schedulesService'
import { Professional } from '../../../components/Professional'
import { AppointmentsContext } from '../../../contexts/AppointmentsContext'
import { DateContainer, SchedulesContainer } from './styles'

interface SchedulesProps {
  dataStart: string
  dataEnd: string
  checkedScheduleButtonId: string
  setCheckedScheduleButtonId: (id: string) => void
}

function Schedules({
  dataStart,
  dataEnd,
  checkedScheduleButtonId,
  setCheckedScheduleButtonId,
}: SchedulesProps) {
  const { unity, specialtie } = useContext(AppointmentsContext)

  const [schedules, setSchedules] = useState<SchedulesData[]>([])

  const fetchSchedulesData = useCallback(async () => {
    if (
      unity &&
      unity?.id !== '' &&
      specialtie &&
      specialtie.id !== '' &&
      specialtie.id !== '0'
    ) {
      const schedulesData = await getSchedules(
        unity?.id,
        specialtie?.id,
        dataStart,
        dataEnd,
      )
      setSchedules(schedulesData)
    }
  }, [dataEnd, dataStart, specialtie, unity])

  useEffect(() => {
    fetchSchedulesData()
  }, [dataEnd, dataStart, specialtie, unity])

  return (
    <>
      {schedules && schedules.length > 0 ? (
        <SchedulesContainer>
          <h1>Dias e Horários</h1>
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
                  return null
                })}
              </DateContainer>
            )
          })}
        </SchedulesContainer>
      ) : null}
    </>
  )
}

export default Schedules
