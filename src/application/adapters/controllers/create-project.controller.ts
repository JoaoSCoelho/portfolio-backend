import { isLeft } from '../../../shared/either'
import { IAdminMiddleware } from '../../middlewares/ports/admin.middleware.port'
import { ICreateProjectUC } from '../../usecases/ports/create-project.usecase.port'
import { IController } from './ports/controller.port'

export class CreateProjectController implements IController {
  constructor(
    private readonly adminMiddleware: IAdminMiddleware,
    private readonly createProjectUC: ICreateProjectUC,
  ) {}

  handle: IController['handle'] = async (req, res) => {
    try {
      // Verifica se é um admin
      const admin = this.adminMiddleware.execute(
        req.headers.authorization as any,
      )

      if (isLeft(admin)) return res.status(401).send({ message: admin.value })

      // Chama o usecase
      const { name, description, repositoryUrl, link } = req.body

      const project = await this.createProjectUC.execute({
        name,
        description,
        repositoryUrl,
        link,
      })

      if (isLeft(project))
        return res.status(400).send({ message: project.value })

      res.status(201).send({ project })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Houve um erro nosso aqui. Desculpa!' })
    }
  }
}
