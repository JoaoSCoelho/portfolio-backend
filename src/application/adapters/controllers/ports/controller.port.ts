import { Request, Response } from 'express'

export abstract class IController {
  abstract handle(req: Request, res: Response): Promise<void>
}
