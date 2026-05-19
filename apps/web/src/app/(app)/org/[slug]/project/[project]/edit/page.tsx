import { getCurrentOrg } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProject } from '@/http/get-project'

import { ProjectEditForm } from '../project-edit-form'

type EditProjectPageProps = {
  params: {
    project: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const currentOrg = getCurrentOrg()
  const { project } = await getProject(currentOrg!, params.project)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectEditForm
            projectSlug={project.slug}
            name={project.name}
            description={project.description}
            defaultOpen
          />
        </CardContent>
      </Card>
    </div>
  )
}
