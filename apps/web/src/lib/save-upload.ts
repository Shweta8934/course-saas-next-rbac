'use server'

import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])

export async function saveUpload(file: File | null) {
  if (!file || file.size === 0) return null

  if (!allowedTypes.has(file.type)) {
    throw new Error('Only PNG, JPG, JPEG, and WEBP images are allowed.')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'png'
  const fileName = `${Date.now()}-${randomUUID()}.${ext}`

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  const fullPath = path.join(uploadDir, fileName)
  await writeFile(fullPath, buffer)

  return `/uploads/${fileName}`
}
