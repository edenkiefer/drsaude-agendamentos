/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarDots,
  Hospital,
  Stethoscope,
  User,
} from '@phosphor-icons/react'
import { format } from 'date-fns'
import { Note } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { ConfirmationContainer, ContinueButton, DataContainer } from './styles'

export function Confirmation() {
  const {
    setStatusBar,
    professionalName,
    date,
    hour,
    unity,
    specialtie,
    patient,
  } = useContext(AppointmentsContext)

  useEffect(() => {
    setStatusBar(2)
  }, [])

  return (
    <ConfirmationContainer>
      <h1>Confirme os dados da consulta, por favor</h1>
      <DataContainer>
        <span>
          <Stethoscope size={32} />
          <div>
            <strong>Profissional</strong>
            <p>{professionalName}</p>
          </div>
        </span>
        <span>
          <Note size={32} />
          <div>
            <strong>Procedimento</strong>
            <p>{specialtie?.value}</p>
          </div>
        </span>
        <span>
          <CalendarDots size={32} />
          <div>
            <strong>Data</strong>
            <p>
              {format(new Date(date || new Date()), 'dd/MM/yyyy')} às {hour}
            </p>
          </div>
        </span>
        <span>
          <Hospital size={32} />
          <div>
            <strong>Unidade</strong>
            <p>{unity?.value}</p>
          </div>
        </span>
        <span>
          <User size={32} />
          <div>
            <strong>Paciente</strong>
            <p>{patient.name}</p>
            <p>{patient.cpf}</p>
          </div>
        </span>
        <strong>
          Se estiver tudo de acordo continue para o pagamento. Caso queira
          alterar o horário, unidade ou especialidade por favor refaça o
          agendamento, pois essas informações estão totalmente atreladas.{' '}
          <Link to="/">Clique aqui</Link> caso queira refazer o agendamento.
        </strong>
      </DataContainer>
      <ContinueButton to="/payment">Continuar para o pagamento</ContinueButton>
    </ConfirmationContainer>
  )
}
