import { isLeft } from '../../../shared/either'
import { IGetTechnologiesUC } from '../../usecases/ports/get-technologies.usecase.port'
import { IController } from './ports/controller.port'

export class GetTechnologiesController implements IController {
  constructor(private readonly getTechnologiesUC: IGetTechnologiesUC) {}

  handle: IController['handle'] = async (req, res) => {
    try {
      const technologies = await this.getTechnologiesUC.execute()

      if (isLeft(technologies))
        return res.status(400).send({ message: technologies.value })

      res.send({ technologies })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Houve um erro nosso aqui. Desculpa!' })
    }
  }
}
