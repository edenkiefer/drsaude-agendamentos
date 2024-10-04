import { useCallback, useEffect, useState } from 'react'

import { ProfessionalData } from '../../@types/models'
import { getProfessional } from '../../api/services/professionalService'
import femaleAvatar from '../../assets/female-avatar-circle.svg'
import maleAvatar from '../../assets/male-avatar-circle.svg'
import { ScheduleButton } from './ScheduleButton'
import { ProfessionalContainer, ProfessionalInfo, Schedules } from './styles'

interface ProfessionalProps {
  id: string
  schedules?: string[]
  data: string
  localId: string
  checkedScheduleButtonId?: string
  setCheckedScheduleButtonId?: (id: string) => void
}

export function Professional({
  id,
  schedules,
  data,
  localId,
  checkedScheduleButtonId,
  setCheckedScheduleButtonId,
}: ProfessionalProps) {
  const [professionalInfo, setProfessionalInfo] = useState<ProfessionalData>()

  const fetchProfessionalData = useCallback(async () => {
    try {
      const professional = await getProfessional(id)
      setProfessionalInfo(professional)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    fetchProfessionalData()
  }, [fetchProfessionalData])

  return (
    <ProfessionalContainer>
      {professionalInfo ? (
        <ProfessionalInfo>
          <div>
            <h1>
              {professionalInfo.gender === 'Feminino'
                ? 'DRA. ' + professionalInfo.name
                : 'DR. ' + professionalInfo.name}
            </h1>
            <p>
              {professionalInfo.specialties
                ? professionalInfo.specialties.map((specialtie, index) => {
                    if (
                      professionalInfo.specialties &&
                      index === professionalInfo.specialties.length - 1
                    ) {
                      return specialtie
                    } else {
                      return specialtie + ', '
                    }
                  })
                : null}
            </p>
            <span>
              {professionalInfo.council &&
              professionalInfo.councilUF &&
              professionalInfo.concilCode ? (
                <>
                  {professionalInfo.council + '-'}
                  {professionalInfo.councilUF + ' '}
                  <strong>{professionalInfo.concilCode}</strong>
                </>
              ) : null}

              {professionalInfo.rqeCode && (
                <>
                  {' • '}
                  RQE - <strong>{professionalInfo.rqeCode}</strong>
                </>
              )}
            </span>
          </div>
          {professionalInfo.photo ? (
            <img src={professionalInfo.photo} alt={professionalInfo.name} />
          ) : (
            <img
              src={
                professionalInfo.gender === 'Feminino'
                  ? femaleAvatar
                  : maleAvatar
              }
              alt={professionalInfo.name}
            />
          )}
        </ProfessionalInfo>
      ) : null}

      {schedules && setCheckedScheduleButtonId ? (
        <Schedules>
          {schedules.map((schedule) => {
            return (
              <ScheduleButton
                key={id + schedule + data}
                id={id + schedule + data}
                professionalId={id}
                professionalName={
                  professionalInfo?.gender === 'Feminino'
                    ? 'DRA. ' + professionalInfo?.name
                    : 'DR. ' + professionalInfo?.name
                }
                localId={localId}
                date={data}
                checkedId={checkedScheduleButtonId}
                setCheckedId={setCheckedScheduleButtonId}
              >
                {schedule.slice(0, -3)}
              </ScheduleButton>
            )
          })}
        </Schedules>
      ) : null}
    </ProfessionalContainer>
  )
}
