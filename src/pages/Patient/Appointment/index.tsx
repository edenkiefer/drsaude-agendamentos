/* eslint-disable react-hooks/exhaustive-deps */
import Dialog from '@mui/material/Dialog'
import { Calendar, Trash, X } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'

import {
  BaseOption,
  PatientData,
  Procedure,
  ProfessionalData,
} from '../../../@types/models'
import { getPatientById } from '../../../api/services/patientService'
import { getProcedureById } from '../../../api/services/proceduresService'
import { getProfessional } from '../../../api/services/professionalService'
import { SchedulesByPatient } from '../../../api/services/schedulesService'
import { getUnitys } from '../../../api/services/unitysService'
import { CurrentReschedule } from '..'
import {
  ActionsContainer,
  AppointmentContainer,
  ModalContainer,
} from './styles'

interface ScheduleProps {
  schedule: SchedulesByPatient
  cancelSchedule: (scheduleId: string) => void
  enabledReschedule: (enabled: boolean, reschedule: CurrentReschedule) => void
}

function Schedule({
  schedule,
  cancelSchedule,
  enabledReschedule,
}: ScheduleProps) {
  const [patient, setPatient] = useState<PatientData>()
  const [professional, setProfessional] = useState<ProfessionalData>()
  const [procedure, setProcedure] = useState<Procedure>()
  const [unity, setUnity] = useState<BaseOption>()

  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false)

  const fetchData = useCallback(async () => {
    setPatient(await getPatientById(schedule.patientId))
    setProfessional(await getProfessional(schedule.professionalId))
    setProcedure(await getProcedureById(schedule.procedureId))
    const unitys = await getUnitys()
    setUnity(unitys[0])
  }, [])

  const openCancelModal = () => {
    setCancelModalIsOpen(true)
  }

  const closeCancelModal = () => {
    setCancelModalIsOpen(false)
  }

  const cancel = () => {
    cancelSchedule(schedule.appointmentId)
    setCancelModalIsOpen(false)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const reschedule = () => {
    if (unity) {
      enabledReschedule(true, {
        appointmentId: schedule.appointmentId,
        procedureId: schedule.procedureId,
        professionalId: schedule.professionalId,
        unityId: unity?.id,
      })
    }
  }

  return (
    <>
      <AppointmentContainer>
        <div>
          <span>
            <strong>Data e Hora:</strong>
            <p>
              {schedule.date.replace('-', '/').replace('-', '/') +
                ' ás ' +
                schedule.hour.slice(0, -3)}
            </p>
          </span>
          <span>
            <strong>Procedimento:</strong>
            <p>{procedure?.name}</p>
          </span>
          <span>
            <strong>Valor:</strong>
            <p>{schedule.value}</p>
          </span>
          <span>
            <strong>Profissional:</strong>
            <p>
              {professional?.gender === 'Feminino'
                ? 'DRA. ' + professional?.name
                : 'DR. ' + professional?.name}
            </p>
          </span>
          <span>
            <strong>Paciente:</strong>
            <p>{patient?.name}</p>
          </span>
          <span>
            <strong>Unidade:</strong>
            <p>{unity?.value}</p>
          </span>
        </div>
        <ActionsContainer>
          <button onClick={reschedule}>
            <Calendar size={28} /> Reagendar
          </button>
          <button onClick={openCancelModal}>
            <Trash size={28} /> Cancelar
          </button>
        </ActionsContainer>
      </AppointmentContainer>
      <Dialog open={cancelModalIsOpen} onClose={closeCancelModal}>
        <ModalContainer>
          <div>
            <h1>Tem certeza que deseja cancelar o agendamento ? </h1>
          </div>
          <span>
            <strong>Data e Hora:</strong>
            <p>
              {schedule.date.replace('-', '/').replace('-', '/') +
                ' ás ' +
                schedule.hour.slice(0, -3)}
            </p>
          </span>
          <span>
            <strong>Procedimento:</strong>
            <p>{procedure?.name}</p>
          </span>
          <span>
            <strong>Valor:</strong>
            <p>{schedule.value}</p>
          </span>
          <span>
            <strong>Profissional:</strong>
            <p>
              {professional?.gender === 'Feminino'
                ? 'DRA. ' + professional?.name
                : 'DR. ' + professional?.name}
            </p>
          </span>
          <span>
            <strong>Paciente:</strong>
            <p>{patient?.name}</p>
          </span>
          <span>
            <strong>Unidade:</strong>
            <p>{unity?.value}</p>
          </span>
          <button onClick={cancel}>
            <Trash size={28} /> Cancelar o agendamento
          </button>
          <button onClick={closeCancelModal}>
            <X size={28} /> Fechar
          </button>
        </ModalContainer>
      </Dialog>
    </>
  )
}

export default Schedule
