import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public Items: User[] = []
  async findByEmail(email: string) {
    const user = this.Items.find((user) => user.email === email)
    if (!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.Items.push(user)
    return user
  }
}
