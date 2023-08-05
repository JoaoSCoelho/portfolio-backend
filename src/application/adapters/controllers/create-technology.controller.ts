import { isLeft } from '../../../shared/either'
import { IAdminMiddleware } from '../../middlewares/ports/admin.middleware.port'
import { ICreateTechnologyUC } from '../../usecases/ports/create-technology.usecase.port'
import { IController } from './ports/controller.port'

export class CreateTechnologyController implements IController {
  constructor(
    private readonly adminMiddleware: IAdminMiddleware,
    private readonly createTechnologyUC: ICreateTechnologyUC,
  ) {}

  handle: IController['handle'] = async (req, res) => {
    try {
      // Verifica se é um admin
      const admin = this.adminMiddleware.execute(
        req.headers.authorization as any,
      )

      if (isLeft(admin))
        return res.status(401).send({ message: 'Tu não é admin colega!' })

      // Chama o usecase

      const { name, logoUrl, aliases, keywords } = req.body
      const technology = await this.createTechnologyUC.execute({
        name,
        keywords,
        aliases,
        logoUrl,
      })

      if (isLeft(technology))
        return res.status(400).send({ message: technology.value })

      res.status(201).send({ technology })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Houve um erro nosso aqui. Desculpa!' })
    }
  }
}
