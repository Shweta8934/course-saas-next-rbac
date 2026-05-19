import { getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProject } from '@/http/get-project'
import { ProjectEditLink } from './project-edit-link'

type ProjectDetailsPageProps = {
  params: {
    project: string
  }
}

export default async function Projects({ params }: ProjectDetailsPageProps) {
  const currentOrg = getCurrentOrg()
  const { project } = await getProject(currentOrg!, params.project)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Project Details</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{project.name}</CardTitle>
          <ProjectEditLink orgSlug={currentOrg!} projectSlug={project.slug} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm">{project.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Project Slug</p>
            <p className="text-sm">{project.slug}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Project ID</p>
            <p className="text-sm">{project.id}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Owner</p>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                {project.owner.avatarUrl && (
                  <AvatarImage src={project.owner.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {project.owner.name ?? 'Unknown'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Owner ID: {project.owner.id}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {project.members.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No members assigned to this project yet.
            </p>
          )}

          {project.members.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar className="size-8">
                {member.user.avatarUrl && (
                  <AvatarImage src={member.user.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {member.user.name ?? 'Unknown'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.user.email} · {member.role}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
