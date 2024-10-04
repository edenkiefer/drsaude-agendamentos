import { ProfessionalData } from '../../@types/models'
import { api } from '../axios'

export const getProfessional = async (
  id: string,
): Promise<ProfessionalData> => {
  const professionalContent = await api.get(
    `/professional/search?profissional_id=${id}`,
  )

  const professionalData = professionalContent.data.content
  const professionalInfo = professionalData.informacoes[0]

  const specialties: string[] = await professionalData.especialidades.map(
    (item: { nome_especialidade: string }) => {
      return item.nome_especialidade
    },
  )

  const professional: ProfessionalData = {
    id: professionalInfo.profissional_id,
    name: professionalInfo.nome,
    treatment: professionalInfo.tratamento,
    gender: professionalInfo.sexo,
    photo: professionalInfo.foto,
    specialties,
    rqeCode: professionalInfo.rqe,
    council: professionalInfo.conselho,
    councilUF: professionalInfo.uf_conselho,
    concilCode: professionalInfo.documento_conselho,
  }

  return professional
}
