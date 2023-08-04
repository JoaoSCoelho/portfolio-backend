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

    // Cria no banco
    await this.technologiesRepository.create(technology)

    return technology
  }
}
