import { api } from './api-client'

interface UpdateProjectRequest {
  org: string
  projectId: string
  name: string
  description: string
  avatarUrl?: string | null
}

type UpdateProjectResponse = void

export async function updateProject({
  org,
  projectId,
  name,
  description,
  avatarUrl,
}: UpdateProjectRequest): Promise<UpdateProjectResponse> {
  await api.put(`organizations/${org}/projects/${projectId}`, {
    json: {
      name,
      description,
      avatarUrl,
    },
  })
}
