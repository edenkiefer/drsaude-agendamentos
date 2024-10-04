import { BaseOption } from '../../@types/models'
import { api } from '../axios'

export const getUnitys = async (): Promise<BaseOption[]> => {
  const unitysResponse = await api.get('/company/list-unity')
  const unitys: BaseOption[] = transformUnityData(unitysResponse.data.content)
  return unitys
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformUnityData(data: any): BaseOption[] {
  const result: BaseOption[] = []

  if (data.matriz?.length > 0) {
    data.matriz.forEach(
      (matriz: {
        unidade_id: string
        endereco: string
        numero: string
        cidade: string
        bairro: string
      }) => {
        result.push({
          id: matriz.unidade_id,
          value:
            matriz.endereco +
            ' nº ' +
            matriz.numero +
            ', ' +
            matriz.bairro +
            ' - ' +
            matriz.cidade,
        })
      },
    )
  }

  if (data.unidades?.length > 0) {
    data.unidades.forEach(
      (unidade: {
        unidade_id: string
        endereco: string
        numero: string
        bairro: string
        cidade: string
      }) => {
        result.push({
          id: unidade.unidade_id,
          value:
            unidade.endereco +
            ' nº ' +
            unidade.numero +
            ', ' +
            unidade.bairro +
            ' - ' +
            unidade.cidade,
        })
      },
    )
  }

  return result
}
