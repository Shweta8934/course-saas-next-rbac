import { api } from './api-client'

interface GetProjectResponse {
  project: {
    id: string
    description: string
    name: string
    slug: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
    members: {
      id: string
      role: string
      userId: string
      user: {
        id: string
        name: string | null
        email: string
        avatarUrl: string | null
      }
    }[]
  }
}

export async function getProject(org: string, project: string) {
  const result = await api
    .get(`organizations/${org}/projects/${project}`)
    .json<GetProjectResponse>()

  return result
}
