CREATE TABLE "project_members" (
  "id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "project_id" TEXT NOT NULL,
  "member_id" TEXT NOT NULL,

  CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "project_members_project_id_member_id_key" ON "project_members"("project_id", "member_id");
CREATE INDEX "project_members_project_id_idx" ON "project_members"("project_id");
CREATE INDEX "project_members_member_id_idx" ON "project_members"("member_id");

ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
