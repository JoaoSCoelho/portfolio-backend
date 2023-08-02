import { Left } from '../../../shared/either'
import { ProjectName } from './project-name'

test('Deve instanciar um novo project-name', () => {
  const name = 'something else'

  const projectName = ProjectName.create(name)

  expect(projectName).toBe(name)
})

describe('Erros de incompatibilidade', () => {
  test('Erro por O tipo disso aí não tem nada a ver', () => {
    const name = 46416546

    const projectName = ProjectName.create(name as any)

    expect(projectName).toBeInstanceOf(Left)
    expect((projectName as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por excesso de caracteres', () => {
    const name = 'a'.repeat(99999999)

    const projectName = ProjectName.create(name)

    expect(projectName).toBeInstanceOf(Left)
    expect((projectName as Left<string>).value).toBe(
      'Ta exagerado bro, caractere demais',
    )
  })
})
