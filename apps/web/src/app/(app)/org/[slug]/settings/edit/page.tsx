import { getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { OrganizationForm } from '../../../organization-form'

export default async function EditOrganizationPage() {
  const currentOrg = getCurrentOrg()
  const { organization } = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit organization</h1>

      <Card>
        <CardHeader>
          <CardTitle>Organization settings</CardTitle>
          <CardDescription>Update your organization details</CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationForm
            isUpdating
            initialData={{
              name: organization.name,
              domain: organization.domain,
              shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
