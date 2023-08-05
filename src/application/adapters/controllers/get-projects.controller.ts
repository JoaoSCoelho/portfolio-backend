import { isLeft } from '../../../shared/either'
import { IGetProjectsUC } from '../../usecases/ports/get-projects.usecase.port'
import { IController } from './ports/controller.port'

export class GetProjectsController implements IController {
  constructor(private readonly getProjectsUC: IGetProjectsUC) {}

  handle: IController['handle'] = async (_req, res) => {
    try {
      const projects = await this.getProjectsUC.execute()

      if (isLeft(projects))
        return res.status(400).send({ message: projects.value })

      res.send({ projects })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Houve um erro nosso aqui. Desculpa!' })
    }
  }
}
