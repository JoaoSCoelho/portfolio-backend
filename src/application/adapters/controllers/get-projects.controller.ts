import { IGetProjectsUC } from '../../usecases/ports/get-projects.port'
import { IController } from './ports/controller.port'

export class GetProjectsController implements IController {
  constructor(private readonly getProjectsUC: IGetProjectsUC) {}

  handle: IController['handle'] = async (_req, res) => {
    const projects = await this.getProjectsUC.execute()

    res.send({ projects })
  }
}
