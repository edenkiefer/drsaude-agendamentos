import { Input } from '../../components/Input'
import { LinkButton } from '../../components/LinkButton'
import { PatientRegistrationContainer } from './styles'

export function PatientRegistration() {
  return (
    <PatientRegistrationContainer>
      <form>
        <Input
          label="Nome completo"
          id="nome_completo"
          required
          placeholder="João Silva"
        />
        <Input label="CPF" id="cpf" required placeholder="000.000.000-00" />
        <Input
          label="E-mail"
          id="email"
          required
          placeholder="email@email.com"
        />
        <Input
          label="Data de Nascimento"
          id="data_nascimento"
          required
          placeholder="00/00/0000"
        />
        <LinkButton to="/confirmation">Registrar</LinkButton>
      </form>
    </PatientRegistrationContainer>
  )
}
