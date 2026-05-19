import { Edit3 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

type ProjectEditLinkProps = {
  orgSlug: string
  projectSlug: string
}

export function ProjectEditLink({ orgSlug, projectSlug }: ProjectEditLinkProps) {
  return (
    <Button type="button" variant="outline" size="sm" asChild>
      <Link href={`/org/${orgSlug}/project/${projectSlug}/edit`}>
        <Edit3 className="size-4" />
      </Link>
    </Button>
  )
}
