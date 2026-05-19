import 'fastify'

import type { Member, Organization } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getAuthContext(): Promise<{
      actorUserId: string
      effectiveUserId: string
      impersonatedByUserId: string | null
    }>
    getUserMembership(
      slug: string,
    ): Promise<{ organization: Organization; membership: Member }>
  }
}
