import { useState } from 'react'

import { updatePatientById } from '../../../api/services/patientService'
import { Input } from '../../../components/Input'
import { EditContainer } from './styles'

const formatCpf = (value: string) => {
  value = value.replace(/\D/g, '')

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return value
}

interface UpdatePatientFormProps {
  onClose: () => void

  name: string
  dateOfBirth: string
  cpf: string
  rg?: string
  gender?: string
  email?: string
  cellPhone?: string
  address?: string
  number?: string
  neighborhood?: string
  city?: string
  state?: string
  cep?: string
}

const UpdatePatientForm = ({
  onClose,

  name,
  dateOfBirth,
  cpf,
  gender,
  email,
  cellPhone,
  address,
  number,
  neighborhood,
  city,
  state,
  cep,
}: UpdatePatientFormProps) => {
  const [currentEmail, setCurrentEmail] = useState(email || '')
  const [currentCellPhone, setCurrentCellPhone] = useState(cellPhone || '')

  const [currentAddress, setCurrentAddress] = useState(address || '')
  const [currentNumber, setCurrentNumber] = useState(number || '')
  const [currentNeighborhood, setCurrentNeighborhood] = useState(
    neighborhood || '',
  )
  const [currentCity, setCurrentCity] = useState(city || '')
  const [currentState, setCurrentState] = useState(state || '')
  const [currentCep, setCurrentCep] = useState(cep || '')

  const handleEditPatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updatePatientById({
      email: currentEmail,
      celular: currentCellPhone,
      endereco: currentAddress,
      numero: currentNumber,
      bairro: currentNeighborhood,
      cidade: currentCity,
      estado: currentState,
      cep: currentCep,
    })

    window.location.reload()
  }

  return (
    <EditContainer>
      <h1>Editar dados</h1>
      <form onSubmit={handleEditPatient}>
        <h2>Dados pessoais</h2>
        <div className="personal-data">
          <Input label="Nome" disabled required value={name} />
          <Input label="CPF" disabled required value={formatCpf(cpf || '')} />
          <Input label="Sexo Biológico" disabled value={gender} />
          <Input
            label="Data de Nascimento"
            disabled
            required
            value={dateOfBirth.replace('-', '/').replace('-', '/')}
          />
        </div>
        <h2>Dados de contato</h2>
        <div>
          <Input
            id="email"
            label="E-mail"
            placeholder="email@email.com"
            onChange={(e) => setCurrentEmail(e.target.value)}
            value={currentEmail}
          />
          <Input
            id="cellPhone"
            label="Celular"
            placeholder="(99) 99999-9999"
            onChange={(e) => setCurrentCellPhone(e.target.value)}
            value={currentCellPhone}
          />
        </div>
        <h2>Endereço</h2>
        <div className="address">
          <Input
            id="address"
            label="Endereço"
            placeholder="Digite o nome da rua"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />
          <Input
            id="number"
            label="Nº"
            type="number"
            placeholder="Número do imóvel"
            value={currentNumber}
            onChange={(e) => setCurrentNumber(e.target.value)}
          />
          <Input
            id="neighborhood"
            label="Bairro"
            placeholder="Digite seu bairro"
            value={currentNeighborhood}
            onChange={(e) => setCurrentNeighborhood(e.target.value)}
          />
          <Input
            id="city"
            label="Cidade"
            placeholder="Digite sua cidade"
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
          />
          <Input
            id="state"
            label="Estado"
            placeholder="Digite seu estado"
            value={currentState}
            onChange={(e) => setCurrentState(e.target.value)}
          />
          <Input
            id="cep"
            label="CEP"
            placeholder="Ex: 00000-000"
            value={currentCep}
            onChange={(e) => setCurrentCep(e.target.value)}
          />
        </div>

        <button type="submit">Editar</button>
        <button type="button" onClick={onClose}>
          Fechar
        </button>
      </form>
    </EditContainer>
  )
}

export default UpdatePatientForm
