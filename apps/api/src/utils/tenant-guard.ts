import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export function assertTenantAccess(params: {
  membershipOrganizationId: string
  resourceOrganizationId: string
}) {
  if (params.membershipOrganizationId !== params.resourceOrganizationId) {
    throw new UnauthorizedError("You're not allowed to access resources from another organization.")
  }
}
