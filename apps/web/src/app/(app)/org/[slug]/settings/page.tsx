import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { Billing } from './billing'
import { OrganizationEditLink } from './organization-edit-link'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function Settings() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Organization settings</CardTitle>
              <OrganizationEditLink orgSlug={currentOrg!} />
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Organization name</p>
                <p className="text-sm font-medium">{organization.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-mail domain</p>
                <p className="text-sm font-medium">
                  {organization.domain ?? 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-join members</p>
                <p className="text-sm font-medium">
                  {organization.shouldAttachUsersByDomain ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {canGetBilling && <Billing />}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
