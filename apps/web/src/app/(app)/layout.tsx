import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { ImpersonationBanner } from '@/components/impersonation-banner'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      <ImpersonationBanner />
      {children}
      {sheet}
    </>
  )
}
