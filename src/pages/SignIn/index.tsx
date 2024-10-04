import { useCallback, useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { getPatientById, signIn } from '../../api/services/patientService'
import { Input } from '../../components/Input'
import { LinkButton } from '../../components/LinkButton'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import { SignInContainer } from './styles'

export function SignIn() {
  const { setStatusBar, setPatient } = useContext(AppointmentsContext)
  const navigate = useNavigate()

  const [cpf, setCpf] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCpf(formatCpf(value))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBirthDate(formatDate(value))
  }

  const formatCpf = (value: string) => {
    value = value.replace(/\D/g, '')

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    return value
  }

  const formatDate = (value: string) => {
    value = value.replace(/\D/g, '')

    if (value.length <= 8) {
      value = value.replace(/(\d{2})(\d)/, '$1/$2')
      value = value.replace(/(\d{2})(\d)/, '$1/$2')
    }
    return value
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const patient = await signIn(cpf, birthDate)
    if (patient.id !== '') {
      setPatient(patient)
      navigate('/confirmation')
    } else {
      alert(
        'CPF ou Data de nascimento informados estão incorretos ou não estão presentes em nosso banco de dados',
      )
    }
  }

  const fetchPatient = useCallback(async () => {
    const patientId = localStorage.getItem('Auth:user')
    if (patientId && patientId !== '') {
      const patient = await getPatientById(patientId)
      setPatient(patient)
    }
  }, [setPatient])

  useEffect(() => {
    console.log(localStorage.getItem('Auth:user'))
    setStatusBar(1)
    fetchPatient()
  }, [setStatusBar, fetchPatient])

  return (
    <>
      {localStorage.getItem('Auth:user') === null ? (
        <SignInContainer>
          <h1>Login</h1>
          <form onSubmit={handleSignIn}>
            <Input
              label="CPF"
              id="cpf"
              value={cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
            />
            <Input
              label="Data de nascimento"
              id="date"
              value={birthDate}
              onChange={handleDateChange}
              placeholder="00/00/0000"
            />
            <div>
              <button type="submit">Login</button>
              <p>ou</p>
              <LinkButton to="/patient-registration">Registre-se</LinkButton>
            </div>
          </form>
        </SignInContainer>
      ) : (
        <Navigate to="/confirmation" />
      )}
    </>
  )
}
