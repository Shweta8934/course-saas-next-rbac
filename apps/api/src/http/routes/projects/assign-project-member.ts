import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function assignProjectMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects/:projectId/members',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Assign member to project',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectId: z.string().uuid(),
          }),
          body: z.object({
            memberId: z.string().uuid(),
          }),
          response: {
            201: z.object({ assignmentId: z.string().uuid() }),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params
        const { memberId } = request.body

        const userId = await request.getCurrentUserId()
        const { organization, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', 'Project')) {
          throw new UnauthorizedError("You're not allowed to assign members to this project.")
        }

        const [project, member] = await Promise.all([
          prisma.project.findUnique({
            where: { id: projectId, organizationId: organization.id },
          }),
          prisma.member.findUnique({
            where: { id: memberId, organizationId: organization.id },
          }),
        ])

        if (!project) {
          throw new BadRequestError('Project not found.')
        }

        if (!member) {
          throw new BadRequestError('Member not found in this organization.')
        }

        const assignment = await prisma.projectMember.upsert({
          where: {
            projectId_memberId: {
              projectId,
              memberId,
            },
          },
          create: { projectId, memberId },
          update: {},
        })

        return reply.status(201).send({ assignmentId: assignment.id })
      },
    )
}
