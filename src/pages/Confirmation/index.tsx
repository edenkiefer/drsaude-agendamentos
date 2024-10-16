/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarDots,
  Hospital,
  Stethoscope,
  User,
} from '@phosphor-icons/react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Note } from 'phosphor-react'
import { useContext, useEffect } from 'react'

import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { ConfirmationContainer, ContinueButton, DataContainer } from './styles'

export function Confirmation() {
  const {
    setStatusBar,
    setHeaderTitle,
    professionalName,
    date,
    hour,
    unity,
    specialtie,
    procedure,
    patient,
  } = useContext(AppointmentsContext)

  useEffect(() => {
    setStatusBar(2)
    setHeaderTitle('Confirme os dados da consulta, por favor')
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
    <ConfirmationContainer>
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
            <p>
              {specialtie?.value} • {procedure?.value}{' '}
            </p>
          </div>
        </span>
        <span>
          <CalendarDots size={32} />
          <div>
            <strong>Data</strong>
            <p>
              {format(parseISO(date || ''), 'dd/MM/yyyy', {
                locale: ptBR,
              })}{' '}
              às {hour}
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
            <p>{formatCpf(patient.cpf)}</p>
          </div>
        </span>
      </DataContainer>
      <ContinueButton to="/payment">Continuar para o pagamento</ContinueButton>
      <ContinueButton to="/">
        Deseja alterar os dados do agendamento ?
      </ContinueButton>
    </ConfirmationContainer>
  )
}
