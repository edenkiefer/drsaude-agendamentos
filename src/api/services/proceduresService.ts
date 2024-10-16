import { BaseOption, Procedure } from '../../@types/models'
import { api } from '../axios'

export const getProcedures = async (
  unityId: string,
  specialtieId: string,
): Promise<BaseOption[]> => {
  const procedures: BaseOption[] = [
    {
      id: '0',
      value: 'Selecione um procedimento',
    },
  ]

  const proceduresResponse = await api.get('/procedures/list', {
    params: {
      unidade_id: unityId,
      especialidade_id: specialtieId,
    },
  })

  await proceduresResponse.data.content.forEach(
    (procedure: {
      procedimento_id: string
      nome: string
      especialidade_id: number[]
    }) => {
      if (
        procedure.especialidade_id &&
        procedure.especialidade_id.length > 0 &&
        procedure.especialidade_id.includes(Number(specialtieId))
      ) {
        procedures.push({
          id: procedure.procedimento_id,
          value: procedure.nome,
        })
      }
    },
  )

  return procedures
}

export const getProcedureById = async (id: string): Promise<Procedure> => {
  const procedureResponse = await api.get('/procedures/list', {
    params: {
      procedimento_id: id,
    },
  })
  const procedureData = procedureResponse.data.content[0]

  return {
    id: procedureData.id,
    value: procedureData.valor,
    name: procedureData.nome,
  }
}
