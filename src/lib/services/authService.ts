// src/lib/services/authService.ts

import type { LoginData, User } from '@/lib/definitions'

const API_URL = 'http://localhost:3001/users'

export async function login(data: LoginData): Promise<User> {
  const response = await fetch(`${API_URL}?email=${data.email}`)

  if (!response.ok) {
    throw new Error('Falha na comunicação com o servidor.')
  }

  const foundUsers: (User & { password?: string })[] = await response.json()

  if (foundUsers.length === 0) {
    throw new Error('E-mail não encontrado.')
  }

  const user = foundUsers[0]

  if (!user.password || user.password !== data.password) {
    throw new Error('Senha inválida.')
  }

  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
