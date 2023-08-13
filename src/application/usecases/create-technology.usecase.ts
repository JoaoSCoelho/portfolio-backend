import { Technology } from '../../domain/entities/technology'
import { ITechnologiesRepository } from '../../external/repositories/ports/technologies-repository.port'
import { isLeft, left } from '../../shared/either'
import { ICreateTechnologyUC } from './ports/create-technology.usecase.port'

export class CreateTechnologyUC implements ICreateTechnologyUC {
  constructor(
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  execute: ICreateTechnologyUC['execute'] = async (data) => {
    const technology = Technology.create(data)

    if (isLeft(technology))
      return left(
        'Deu merda aqui instanciando o technology: >> ' + technology.value,
      )

    // Verificar se já existe com o mesmo name
    const existsWithThisName =
      await this.technologiesRepository.existsWithThisName(technology.name)

    if (existsWithThisName)
      return left('Já existe uma tecnologia com este nome')

    // Cria no banco
    await this.technologiesRepository.create(technology)

    return technology
  }
}
