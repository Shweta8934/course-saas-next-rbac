import { Edit3 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

type OrganizationEditLinkProps = {
  orgSlug: string
}

export function OrganizationEditLink({ orgSlug }: OrganizationEditLinkProps) {
  return (
    <Button type="button" variant="outline" size="sm" asChild>
      <Link href={`/org/${orgSlug}/settings/edit`}>
        <Edit3 className="size-4" />
      </Link>
    </Button>
  )
}
