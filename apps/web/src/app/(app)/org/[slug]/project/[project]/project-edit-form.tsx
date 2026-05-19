'use client'

import { AlertTriangle, Edit3, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'

import { updateProjectAction } from './actions'

type ProjectEditFormProps = {
  projectSlug: string
  name: string
  description: string
  defaultOpen?: boolean
}

export function ProjectEditForm({
  projectSlug,
  name,
  description,
  defaultOpen = false,
}: ProjectEditFormProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [{ errors, message, success }, handleSubmit, isPending] =
    useFormState(updateProjectAction)

  if (!isOpen) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="projectSlug" value={projectSlug} />

      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Update failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" defaultValue={name} />
        {errors?.name && <p className="text-xs text-red-500">{errors.name[0]}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={description} />
        {errors?.description && (
          <p className="text-xs text-red-500">{errors.description[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="avatar">Project image</Label>
        <Input id="avatar" name="avatar" type="file" accept="image/*" />
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Update Project'
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
