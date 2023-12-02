import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth-api.ts'

export const SignInPage = () => {
  const [signIn] = useLoginMutation()
  const { data } = useMeQuery()

  if (!!data) return <Navigate to={'/'} />

  return <SignIn onSubmit={signIn} />
}
