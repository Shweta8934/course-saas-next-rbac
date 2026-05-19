CREATE TABLE "audit_logs" (
  "id" TEXT NOT NULL,
  "event_type" TEXT NOT NULL,
  "actor_user_id" TEXT,
  "effective_user_id" TEXT,
  "organization_id" TEXT,
  "entity_type" TEXT,
  "entity_id" TEXT,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "audit_logs_event_type_created_at_idx" ON "audit_logs"("event_type", "created_at");
CREATE INDEX "audit_logs_organization_id_created_at_idx" ON "audit_logs"("organization_id", "created_at");
