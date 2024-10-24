/* eslint-disable react-hooks/exhaustive-deps */
import Dialog from '@mui/material/Dialog'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { PatientData } from '../../@types/models'
import { getPatientById } from '../../api/services/patientService'
import {
  cancelScheduleById,
  getSchedulesByPatientId,
  rescheduleById,
  SchedulesByPatient,
} from '../../api/services/schedulesService'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import Schedules from '../Appointment/Schedules'
import Appointment from './Appointment'
import {
  InfoContainer,
  PatientContainer,
  RescheduleButton,
  RescheduleContainer,
  SchedulesContainer,
  Statement,
} from './styles'
import UpdatePatientForm from './UpdatePatientForm'

export interface CurrentReschedule {
  appointmentId?: string
  professionalId?: string
  unityId?: string
  procedureId?: string
}

function Patient() {
  const { setStatusBar, setHeaderTitle, hour, date, setHour, setDate } =
    useContext(AppointmentsContext)

  const [currentReschedule, setCurrentReschedule] =
    useState<CurrentReschedule>()
  const [rescheduleIsOpen, setRescheduleIsOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [checkedScheduleButtonId, setCheckedScheduleButtonId] = useState('')

  const [patient, setPatient] = useState<PatientData>()
  const [schedules, setSchedules] = useState<SchedulesByPatient[]>()

  const fetchSchedules = useCallback(async () => {
    setSchedules(await getSchedulesByPatientId())
  }, [])

  const fetchPatient = useCallback(async () => {
    setPatient(await getPatientById(localStorage.getItem('Auth:user') || ''))
  }, [])

  const cancelSchedule = async (scheduleId: string) => {
    await cancelScheduleById(scheduleId)
    setSchedules(schedules?.filter((item) => item.appointmentId !== scheduleId))
  }

  const enabledReschedule = async (
    enabled: boolean,
    reschedule: CurrentReschedule,
  ) => {
    setCurrentReschedule(reschedule)
    setRescheduleIsOpen(enabled)
  }

  const reschedule = async () => {
    await rescheduleById(
      currentReschedule?.appointmentId || '',
      hour || '',
      date || '',
    )

    await fetchSchedules()
    setHour('')
    setDate('')
    setRescheduleIsOpen(false)

    window.location.reload()
  }

  const cancelReschedule = () => {
    setHour('')
    setDate('')
    setRescheduleIsOpen(false)
  }

  useEffect(() => {
    setHeaderTitle('Área do Paciente')
    setStatusBar(-1)

    fetchPatient()
    fetchSchedules()
  }, [])

  const formatCpf = (value: string) => {
    value = value.replace(/\D/g, '')

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    return value
  }

  const closeModal = () => {
    setIsEditModalOpen(false)
  }

  return (
    <>
      {localStorage.getItem('Auth:user') ? (
        <PatientContainer>
          <Statement>
            <h1>Olá {patient?.name}</h1>
            <p>
              Bem-vindo à Área do Paciente! Aqui, você pode visualizar suas
              informações e agendamentos e realizar todas as interações de forma
              simples e rápida.
            </p>
          </Statement>
          <InfoContainer>
            <div>
              <h1>Dados pessoais</h1>
              <div>
                <span>
                  <strong>Nome:</strong>
                  <p>{patient?.name}</p>
                </span>
                <span>
                  <strong>Sexo Biológico:</strong>
                  {patient?.gender ? (
                    <p>{patient?.gender}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>CPF:</strong>
                  <p>{formatCpf(patient?.cpf || '')}</p>
                </span>
                <span>
                  <strong>Data de Nascimento:</strong>
                  <p>
                    {patient?.dateOfBirth.replace('-', '/').replace('-', '/')}
                  </p>
                </span>
              </div>
              <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
            </div>
            <div>
              <h1>Dados de contato</h1>
              <div>
                <span>
                  <strong>E-mail:</strong>
                  <p>
                    {patient?.email ? (
                      <p>{patient?.email}</p>
                    ) : (
                      <p className="nullInfo">editar para adicionar</p>
                    )}
                  </p>
                </span>
                <span>
                  <strong>Celular:</strong>
                  <p>
                    {patient?.cellPhone ? (
                      <p>{patient?.cellPhone}</p>
                    ) : (
                      <p className="nullInfo">editar para adicionar</p>
                    )}
                  </p>
                </span>
              </div>
              <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
            </div>
            <div>
              <h1>Endereço</h1>
              <div>
                <span>
                  <strong>Endereço:</strong>
                  {patient?.address ? (
                    <p>{patient?.address}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>Nº:</strong>
                  {patient?.number ? (
                    <p>{patient?.number}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>Bairro:</strong>
                  {patient?.neighborhood ? (
                    <p>{patient?.neighborhood}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>Cidade:</strong>
                  {patient?.city ? (
                    <p>{patient?.city}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>Estado:</strong>
                  {patient?.state ? (
                    <p>{patient?.state}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
                <span>
                  <strong>CEP:</strong>
                  {patient?.cep ? (
                    <p>{patient?.cep}</p>
                  ) : (
                    <p className="nullInfo">editar para adicionar</p>
                  )}
                </span>
              </div>
              <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
            </div>
            <Dialog open={isEditModalOpen} onClose={closeModal}>
              <UpdatePatientForm
                name={patient?.name || ''}
                cpf={patient?.cpf || ''}
                gender={patient?.gender || ''}
                dateOfBirth={patient?.dateOfBirth || ''}
                email={patient?.email || ''}
                cellPhone={patient?.cellPhone || ''}
                address={patient?.address || ''}
                number={patient?.number || ''}
                city={patient?.city || ''}
                neighborhood={patient?.neighborhood || ''}
                state={patient?.state || ''}
                cep={patient?.cep || ''}
                onClose={closeModal}
              />
            </Dialog>
          </InfoContainer>

          <h1>Agendamentos</h1>
          {!rescheduleIsOpen ? (
            <SchedulesContainer>
              {schedules && schedules.length > 0 ? (
                <>
                  {schedules.map((schedule) => (
                    <Appointment
                      key={schedule.appointmentId}
                      schedule={schedule}
                      cancelSchedule={cancelSchedule}
                      enabledReschedule={enabledReschedule}
                    />
                  ))}
                </>
              ) : (
                <p>Você ainda não fez nenhum agendamento.</p>
              )}
            </SchedulesContainer>
          ) : (
            <>
              <RescheduleContainer>
                <span>
                  <strong>
                    Porfavor selecione um horário para que possa ser realizado
                    seu reagendamento
                  </strong>
                  <button onClick={cancelReschedule}>Voltar</button>
                </span>
                <Schedules
                  checkedScheduleButtonId={checkedScheduleButtonId}
                  setCheckedScheduleButtonId={setCheckedScheduleButtonId}
                  procedureId={currentReschedule?.procedureId}
                  professionalId={currentReschedule?.professionalId}
                  unityId={currentReschedule?.unityId}
                />
              </RescheduleContainer>
              {checkedScheduleButtonId && (
                <RescheduleButton>
                  <button onClick={reschedule}>Reagendar</button>
                </RescheduleButton>
              )}
            </>
          )}
        </PatientContainer>
      ) : (
        <Navigate to="/sign-in" replace />
      )}
    </>
  )
}

export default Patient
