import { Left } from '../../../shared/either'
import { ProjectDescription } from './project-description'

test('Deve instanciar um novo project-description', () => {
  const description = 'something else'

  const projectDescription = ProjectDescription.create(description)

  expect(projectDescription).toBe(description)
})

describe('Erros de incompatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const description = 46416546

    const projectDescription = ProjectDescription.create(description as any)

    expect(projectDescription).toBeInstanceOf(Left)
    expect((projectDescription as Left<string>).value).toBe('Tipo inválido')
  })

  test('Erro por excesso de caracteres', () => {
    const description = 'a'.repeat(99999999)

    const projectDescription = ProjectDescription.create(description)

    expect(projectDescription).toBeInstanceOf(Left)
    expect((projectDescription as Left<string>).value).toBe('Muito longo')
  })
})
