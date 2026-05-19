import { api } from './api-client'

interface UpdateOrganizationRequest {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  avatarUrl?: string | null
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
  avatarUrl,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
      avatarUrl,
    },
  })
}
