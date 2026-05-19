import { z } from 'zod'

import type { FastifyInstance } from 'fastify'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { createAuditLog } from '@/lib/audit-log'
import { prisma } from '@/lib/prisma'

export async function impersonateUser(app: FastifyInstance) {
  app.register(auth).post(
    '/auth/impersonate',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Impersonate another member from the same organization',
        security: [{ bearerAuth: [] }],
        body: z.object({
          organizationSlug: z.string(),
          targetUserId: z.string().uuid(),
        }),
        response: {
          200: z.object({ token: z.string() }),
        },
      },
    },
    async (request) => {
      const { organizationSlug, targetUserId } = request.body
      const { membership, organization } =
        await request.getUserMembership(organizationSlug)

      if (membership.role !== 'ADMIN') {
        throw new UnauthorizedError("You're not allowed to impersonate users.")
      }

      const { actorUserId } = await request.getAuthContext()

      const targetMembership = await prisma.member.findFirst({
        where: {
          organizationId: organization.id,
          userId: targetUserId,
        },
      })

      if (!targetMembership) {
        throw new UnauthorizedError('Target user is not a member of this organization.')
      }

      const token = await request.jwtSign({
        sub: targetUserId,
        impersonatedBy: actorUserId,
      })

      await createAuditLog({
        eventType: 'USER_IMPERSONATION_STARTED',
        actorUserId,
        effectiveUserId: targetUserId,
        organizationId: organization.id,
        entityType: 'user',
        entityId: targetUserId,
        metadata: {
          sourceRole: membership.role,
        },
      })

      return { token }
    },
  )
}
