/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseOption, SchedulesData } from '../@types/models'

function isAtLeastOneHourLater(date: string, time: string): boolean {
  const now = new Date()

  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)

  const inputDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0)

  const diffInMilliseconds = inputDateTime.getTime() - now.getTime()
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60)

  return diffInHours >= 1
}

export function transformScheduleData(data: any): SchedulesData[] {
  const result: SchedulesData[] = []

  for (const professionalId in data.profissional_id) {
    const locais = data.profissional_id[professionalId].local_id

    for (const localId in locais) {
      const datas = locais[localId]
      console.log(localId)

      for (const date in datas) {
        const horarios = datas[date]

        const validHorarios = horarios.filter((horario: string) =>
          isAtLeastOneHourLater(date, horario),
        )

        const dataEncontrada = result.find((item) => item.date === date)

        if (validHorarios.length > 0) {
          if (dataEncontrada) {
            dataEncontrada.professionals.push({
              id: professionalId,
              localId, // Incluindo o localId
              schedules: validHorarios.slice(0, 5),
            })
          } else {
            result.push({
              date,
              professionals: [
                {
                  id: professionalId,
                  localId, // Incluindo o localId
                  schedules: validHorarios.slice(0, 5),
                },
              ],
            })
          }
        }
      }
    }
  }

  return result.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )
}

export function transformUnityData(data: any): BaseOption[] {
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
