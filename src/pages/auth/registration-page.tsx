import { SignUp } from '@/components/auth/sign-up-form/sign-up-form.tsx'
import { useRegistrationMutation } from '@/services/auth/auth-api.ts'

export const SignUpPage = () => {
  const [signUp] = useRegistrationMutation()

  return <SignUp onSubmit={signUp} />
}
