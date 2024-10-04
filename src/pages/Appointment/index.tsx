/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react'

import { BaseOption } from '../../@types/models'
import {
  getProcedureById,
  getProcedures,
} from '../../api/services/proceduresService'
import { getSpecialties } from '../../api/services/specialtiesService'
import { getUnitys } from '../../api/services/unitysService'
import { LinkButton } from '../../components/LinkButton'
import { SelectInput } from '../../components/SelectInput'
import { AppointmentsContext } from '../../contexts/AppointmentsContext'
import Schedules from './Schedules'
import { AppointmentContainer, ContinueButtonContainer } from './styles'

function Appointment() {
  const {
    unity,
    specialtie,
    procedure,
    setUnity,
    setSpecialtie,
    setProcedure,
    setStatusBar,
    setPrice,
  } = useContext(AppointmentsContext)

  const [checkedScheduleButtonId, setCheckedScheduleButtonId] = useState('')

  const [unitys, setUnitys] = useState<BaseOption[]>([])
  const [specialties, setSpecialties] = useState<BaseOption[]>([])
  const [procedures, setProcedures] = useState<BaseOption[]>([])

  const fetchUnitys = useCallback(async () => {
    try {
      const unitysData = await getUnitys()
      setUnity(unitysData[0])
      setUnitys(unitysData)
    } catch (error) {
      console.log(error)
    }
  }, [setUnity])

  const fetchSpecialties = useCallback(async () => {
    try {
      const specialtiesData = await getSpecialties()
      setSpecialties(specialtiesData)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchProcedures = useCallback(async () => {
    try {
      if (
        unity &&
        unity?.id !== '' &&
        specialtie &&
        specialtie.id !== '' &&
        specialtie.id !== '0'
      ) {
        const proceduresData = await getProcedures(unity.id, specialtie.id)
        setProcedures(proceduresData)
      }
    } catch (error) {
      console.log(error)
    }
  }, [unity, specialtie])

  const setProcedurePrice = useCallback(async (procedureId: string) => {
    console.log(procedureId)
    if (procedureId !== '') {
      const procedureData = await getProcedureById(procedureId)
      setPrice(procedureData.value)
    }
  }, [])

  const handleUnity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnity = e.target.selectedOptions[0]

    if (selectedUnity.value !== '0') {
      setUnity({
        id: selectedUnity.value,
        value: selectedUnity.text,
      })
      setCheckedScheduleButtonId('')
    }
  }

  const handleSpecialtie = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecialtie = e.target.selectedOptions[0]

    if (selectedSpecialtie.value !== '0') {
      setSpecialtie({
        id: selectedSpecialtie.value,
        value: selectedSpecialtie.text,
      })
      setCheckedScheduleButtonId('')
      fetchProcedures()
    }
  }

  const handleProcedure = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProcedure = e.target.selectedOptions[0]

    if (selectedProcedure.value !== '0') {
      setProcedure({
        id: selectedProcedure.value,
        value: selectedProcedure.text,
      })
      setCheckedScheduleButtonId('')
      setProcedurePrice(selectedProcedure.value)
    }
  }

  useEffect(() => {
    fetchUnitys()
    setStatusBar(0)
  }, [])

  useEffect(() => {
    fetchSpecialties()
  }, [unity])

  useEffect(() => {
    fetchProcedures()
  }, [specialtie])

  return (
    <AppointmentContainer>
      <h1>Agendamentos</h1>
      <form>
        <SelectInput
          label="Unidade"
          id="unity"
          value={unity?.id}
          required
          onChange={handleUnity}
          data={unitys}
        />
        {specialties && specialties.length > 0 ? (
          <SelectInput
            label="Especialidade"
            id="specialtie"
            value={specialtie?.id}
            required
            onChange={handleSpecialtie}
            data={specialties}
          />
        ) : null}
        {procedures && procedures.length > 0 ? (
          <SelectInput
            label="Procedimento"
            id="procedure"
            value={procedure?.id}
            required
            onChange={handleProcedure}
            data={procedures}
          />
        ) : null}
      </form>

      <Schedules
        dataStart="02-11-2024"
        dataEnd="10-11-2024"
        checkedScheduleButtonId={checkedScheduleButtonId}
        setCheckedScheduleButtonId={setCheckedScheduleButtonId}
      />

      {checkedScheduleButtonId && (
        <ContinueButtonContainer>
          <LinkButton to="/sign-in">Continuar</LinkButton>
        </ContinueButtonContainer>
      )}
    </AppointmentContainer>
  )
}

export default Appointment
