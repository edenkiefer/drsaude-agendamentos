import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext, useEffect } from 'react'

import { Professional } from '../../components/Professional'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { AppointmentCompletedContainer } from './styles'

export function AppointmentCompleted() {
  const { setStatusBar, professionalId, hour, date, unity, price } =
    useContext(AppointmentsContext)

  useEffect(() => {
    setStatusBar(4)
  }, [setStatusBar])
  return (
    <AppointmentCompletedContainer>
      <h1>Agendamento Concluído</h1>
      <p>O seu agendamento foi realizado, o seu médico(a) será:</p>
      <Professional id={professionalId || ''} data="" localId="" />
      <p>
        Sua consulta será às <strong>{hour}</strong> do dia{' '}
        <strong>
          {format(parseISO(date || ''), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </strong>
        .
      </p>
      <p>
        O valor da consulta será de{' '}
        <strong>
          {price &&
            (price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
        </strong>
      </p>
      <p>
        Por favor chegue com <strong>15 minutos</strong> de antecedência para
        realização do pré-atendimento.
      </p>
      <p>Localização da unidade selecionada a seguir:</p>
      {unity && <strong>{unity.value}</strong>}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.1032356078344!2d-40.3053349238751!3d-20.33735345112445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb81622348fffff%3A0x198834424b150b71!2zRHIuIFNhw7pkZSBDbMOtbmljYSBNw6lkaWNh!5e0!3m2!1spt-BR!2sbr!4v1725992877664!5m2!1spt-BR!2sbr"
        width="600"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </AppointmentCompletedContainer>
  )
}
