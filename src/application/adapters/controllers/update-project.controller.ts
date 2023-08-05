import { isLeft } from '../../../shared/either'
import { IAdminMiddleware } from '../../middlewares/ports/admin.middleware.port'
import { IUpdateProjectUC } from '../../usecases/ports/update-project.usecase.port'
import { IController } from './ports/controller.port'

export class UpdateProjectController implements IController {
  constructor(
    private readonly adminMiddleware: IAdminMiddleware,
    private readonly updateProjectUC: IUpdateProjectUC,
  ) {}

  handle: IController['handle'] = async (req, res) => {
    try {
      const admin = this.adminMiddleware.execute(req.headers.authorization!)

      if (isLeft(admin))
        return res
          .status(401)
          .send({ message: 'Tu não é administrador colega' })

      const project = await this.updateProjectUC.execute(req.params.id, {
        bannerUrl: req.body.bannerUrl,
        description: req.body.description,
        features: req.body.features,
        keywords: req.body.keywords,
        link: req.body.link,
        name: req.body.name,
        previewImageUrl: req.body.previewImageUrl,
        repositoryUrl: req.body.repositoryUrl,
        slug: req.body.slug,
        usedTechnologies: req.body.usedTechnologies,
      })

      if (isLeft(project))
        return res.status(400).send({ message: project.value })

      res.send({ project })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Houve um erro nosso aqui. Desculpa!' })
    }
  }
}
