import { BaseOption } from '../../@types/models'
import { api } from '../axios'

export const getSpecialties = async (): Promise<BaseOption[]> => {
  const specialties: BaseOption[] = [
    {
      id: '0',
      value: 'Selecione uma especialidade',
    },
  ]
  const specialtiesResponse = await api.get('/specialties/list')

  await specialtiesResponse.data.content.forEach(
    (specialtie: { especialidade_id: string; nome: string }) => {
      specialties.push({
        id: specialtie.especialidade_id,
        value: specialtie.nome,
      })
    },
  )

  return specialties
}
