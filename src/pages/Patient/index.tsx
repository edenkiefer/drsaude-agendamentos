/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, Note, Trash } from '@phosphor-icons/react'
import { useCallback, useContext, useEffect, useState } from 'react'

import { PatientData } from '../../@types/models'
import { getPatientById } from '../../api/services/patientService'
import {
  getSchedulesByPatientId,
  SchedulesByPatient,
} from '../../api/services/schedulesService'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { OptionsContainer, PatientContainer, PatientInfo } from './styles'

function Patient() {
  const { setStatusBar } = useContext(AppointmentsContext)

  const [patient, setPatient] = useState<PatientData>()
  const [schedules, setSchedules] = useState<SchedulesByPatient[]>()

  const fetchData = useCallback(async () => {
    setPatient(await getPatientById(localStorage.getItem('Auth:user') || ''))
    setSchedules(await getSchedulesByPatientId())
  }, [])

  useEffect(() => {
    setStatusBar(-1)

    fetchData()
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

  return (
    <PatientContainer>
      <h1>Área do Paciente</h1>
      <PatientInfo>
        <div>
          <span>
            <strong>Nome</strong>
            <p>{patient?.name}</p>
          </span>
          <span>
            <strong>CPF</strong>
            <p>{formatCpf(patient?.cpf || '')}</p>
          </span>
          <span>
            <strong>Data de Nascimento</strong>
            <p>{patient?.dateOfBirth.replace('-', '/').replace('-', '/')}</p>
          </span>
        </div>
        <OptionsContainer>
          <h1>Seus agendamentos</h1>
          {schedules && schedules.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => {
                  return (
                    <tr key={schedule.appointmentId}>
                      <td>
                        {schedule.date.replace('-', '/').replace('-', '/') +
                          ' ás ' +
                          schedule.hour.slice(0, -3)}
                      </td>
                      <td>{schedule.value}</td>
                      <td>
                        <button>
                          <Calendar size={24} />
                        </button>
                        <button>
                          <Note size={24} />
                        </button>
                        <button>
                          <Trash size={24} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </OptionsContainer>
      </PatientInfo>
    </PatientContainer>
  )
}

export default Patient
