import { ITechnologiesRepository } from '../../external/repositories/ports/technologies-repository.port'
import { IGetTechnologiesUC } from './ports/get-technologies.usecase.port'

export class GetTechnologiesUC implements IGetTechnologiesUC {
  constructor(
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  execute: IGetTechnologiesUC['execute'] = async () => {
    const technologies = await this.technologiesRepository.all()

    return technologies
  }
}
