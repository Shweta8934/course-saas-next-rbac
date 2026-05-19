'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { getProject } from '@/http/get-project'
import { updateProject } from '@/http/update-project'
import { saveUpload } from '@/lib/save-upload'

const updateProjectSchema = z.object({
  projectSlug: z.string(),
  name: z.string().min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string(),
})

export async function updateProjectAction(data: FormData) {
  const result = updateProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { projectSlug, name, description } = result.data
  const org = getCurrentOrg()
  const avatarFile = data.get('avatar') as File | null

  try {
    const { project } = await getProject(org!, projectSlug)
    const avatarUrl = await saveUpload(avatarFile)

    await updateProject({
      org: org!,
      projectId: project.id,
      name,
      description,
      avatarUrl: avatarUrl ?? undefined,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Project updated successfully.',
    errors: null,
    redirectTo: `/org/${org}/project/${projectSlug}`,
  }
}
