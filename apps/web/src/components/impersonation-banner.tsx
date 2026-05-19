import { getImpersonationContext } from '@/auth/auth'

export function ImpersonationBanner() {
  const impersonation = getImpersonationContext()

  if (!impersonation) return null

  return (
    <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900">
      Impersonation Mode Active. Your actions are being audited.
    </div>
  )
}
