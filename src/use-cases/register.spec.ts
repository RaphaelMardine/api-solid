import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let registerUseCase: RegisterUseCase
let usersRepository: InMemoryUsersRepository

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })
})

describe('register use case', () => {
  it('should hash user password upon register a user', async () => {
    const { user } = await registerUseCase.register({
      name: 'John Doe',
      email: 'aa@aa.com',
      password: '12345678',
    })

    const isPasswordCorrect = await compare('12345678', user.password_hash)

    expect(isPasswordCorrect).toBe(true)
  })
})

it('should throw an error if user already exists', async () => {
  const email = 'johndoe@gmail.com'

  await registerUseCase.register({
    name: 'John Doe',
    email,
    password: '12345678',
  })

  expect(() =>
    registerUseCase.register({
      name: 'John Doe',
      email,
      password: '12345678',
    }),
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)
})

it('should return the user created', async () => {
  const { user } = await registerUseCase.register({
    name: 'John Doe',
    email: 'teste@teste.com',
    password: '12345678',
  })

  expect(user.id).toEqual(expect.any(String))
})
