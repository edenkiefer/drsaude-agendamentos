/* eslint-disable react-hooks/exhaustive-deps */
import { Hospital, PixLogo } from '@phosphor-icons/react'
import { CreditCard } from 'phosphor-react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createNewAppointment } from '../../api/services/appointmentService'
import { Input } from '../../components/Input'
import { SelectInput } from '../../components/SelectInput'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import {
  Container,
  PaymentContainer,
  PaymentTypeButton,
  PaymentTypesContainer,
} from './styles'

export function Payment() {
  const {
    localId,
    professionalId,
    specialtie,
    procedure,
    date,
    hour,
    price,
    setStatusBar,
    setHeaderTitle,
    setPrice,
  } = useContext(AppointmentsContext)

  const navigate = useNavigate()

  const [paymentType, setPaymentType] = useState('')

  const [originalPrice, setOriginalPrice] = useState(0)

  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')

  useEffect(() => {
    setStatusBar(3)
    setHeaderTitle('Pagamento')
    setOriginalPrice(price || 0)
  }, [])

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(value)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
    }
    setExpiryDate(value)
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setCvv(value)
  }

  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value)
  }

  const createAppointment = useCallback(async () => {
    try {
      const patientId = localStorage.getItem('Auth:user')
      if (localId && patientId && date && hour) {
        await createNewAppointment({
          localId: Number(localId),
          pacienteId: Number(patientId),
          profissionalId: Number(professionalId),
          especialidadeId: Number(specialtie?.id),
          procedimentoId: Number(procedure?.id),
          data: date,
          horario: hour,
          valor: Number(price),
          plano: 0,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleCreateAppointment = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    await createAppointment()
    navigate('/appointment-completed')
  }

  return (
    <Container>
      <form onSubmit={handleCreateAppointment}>
        <PaymentTypesContainer>
          <PaymentTypeButton
            type="button"
            isSelected={paymentType !== '' && paymentType === '1'}
            onClick={() => setPaymentType('1')}
          >
            <PixLogo size={48} />
            PIX
          </PaymentTypeButton>
          <PaymentTypeButton
            type="button"
            isSelected={paymentType !== '' && paymentType === '2'}
            onClick={() => setPaymentType('2')}
          >
            <CreditCard size={48} />
            Cartão
          </PaymentTypeButton>
          <PaymentTypeButton
            type="button"
            isSelected={paymentType !== '' && paymentType === '3'}
            onClick={() => setPaymentType('3')}
          >
            <Hospital size={48} />
            Na unidade
          </PaymentTypeButton>
        </PaymentTypesContainer>
        {paymentType !== '0' && (
          <>
            <p>
              O valor pelo procedimento {procedure?.value} é de{' '}
              <strong>
                {price &&
                  ((originalPrice / 100) * 1.2).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
              </strong>
              em até 12x sem juros (crédito, débito ou pix) <strong>ou</strong>{' '}
              de{' '}
              <strong>
                {price &&
                  (originalPrice / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
              </strong>
              (desconto para pagamento em dinheiro somente na unidade).
            </p>
          </>
        )}
        {paymentType === '1' ? <PaymentContainer>PIX</PaymentContainer> : null}
        {paymentType === '2' ? (
          <PaymentContainer>
            <Input
              label="Número do cartão"
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <div>
              <Input
                label="Validade"
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/AA"
                maxLength={5}
                value={expiryDate}
                onChange={handleExpiryDateChange}
              />
              <Input
                label="CVV"
                type="text"
                id="cvv"
                name="cvv"
                placeholder="000"
                maxLength={3}
                value={cvv}
                onChange={handleCvvChange}
              />
            </div>
            <Input
              label="Nome Completo"
              type="text"
              id="cardName"
              name="cardName"
              placeholder="João Silva"
              value={cardName}
              onChange={handleCardNameChange}
            />
            {price && (
              <SelectInput
                label="Número de parcelas"
                data={[
                  {
                    id: '0',
                    value: `1x de R$ ${(
                      (originalPrice / 100) *
                      1.2
                    ).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}`,
                  },
                ]}
              />
            )}
          </PaymentContainer>
        ) : null}
        {paymentType !== '0' ? <button>Realizar agendamento</button> : null}
      </form>
    </Container>
  )
}
