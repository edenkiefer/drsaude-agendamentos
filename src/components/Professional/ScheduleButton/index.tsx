import { useContext, useEffect, useState } from 'react'

import { AppointmentsContext } from '../../../contexts/AppointmentsContext'
import { ScheduleButtonContainer } from './styles'

interface ScheduleButtonProps {
  id: string
  date: string
  professionalId: string
  professionalName: string
  localId: string
  children: string
  checkedId?: string
  setCheckedId: (id: string) => void
}

export function ScheduleButton({
  id,
  date,
  professionalId,
  professionalName,
  localId,
  children,
  checkedId,
  setCheckedId,
}: ScheduleButtonProps) {
  const {
    setProfessionalName,
    setProfessionalId,
    setLocalId,
    setHour,
    setDate,
  } = useContext(AppointmentsContext)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checkedId === id) {
      setChecked(true)
      return
    }
    setChecked(false)
  }, [id, checkedId])

  function checkButton() {
    setCheckedId(id)
    setProfessionalId(professionalId)
    setProfessionalName(professionalName)
    setLocalId(localId)
    setHour(children)
    setDate(date)
  }

  return (
    <ScheduleButtonContainer
      type="button"
      checked={checked}
      onClick={checkButton}
    >
      {children}
    </ScheduleButtonContainer>
  )
}
