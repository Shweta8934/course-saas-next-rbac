import { prisma } from './prisma'

type CreateAuditLogInput = {
  eventType: string
  actorUserId?: string | null
  effectiveUserId?: string | null
  organizationId?: string | null
  entityType?: string | null
  entityId?: string | null
  metadata?: Record<string, unknown> | null
}

export async function createAuditLog(input: CreateAuditLogInput) {
  await prisma.auditLog.create({
    data: {
      eventType: input.eventType,
      actorUserId: input.actorUserId ?? null,
      effectiveUserId: input.effectiveUserId ?? null,
      organizationId: input.organizationId ?? null,
      entityType: input.entityType ?? null,
      entityId: input.entityId ?? null,
      metadata: input.metadata ?? undefined,
    },
  })
}
