import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './sign-up-form.module.scss'

import { Button, Card, ControlledTextField } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import { FormValues, registartionShema } from '@/types/login-form/registration-shema.ts'

type SignUpProps = {
  onSubmit: (data: FormValues) => void
}
export const SignUp: FC<SignUpProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registartionShema),
  })

  return (
    <Card>
      <Typography.H1>Sign Up</Typography.H1>
      <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <ControlledTextField
            name={'email'}
            control={control}
            errorMessage={errors?.email?.message}
            type="text"
            label={'Email'}
            placeholder={'Enter e-mail'}
          />
        </div>
        <div>
          <ControlledTextField
            name={'password'}
            control={control}
            errorMessage={errors?.password?.message}
            type="password"
            label={'Password'}
            placeholder={'Enter password'}
          />
        </div>
        <div>
          <ControlledTextField
            name={'confirmPassword'}
            control={control}
            errorMessage={errors?.confirmPassword?.message}
            type="password"
            label={'Confirm Password'}
            placeholder={'Confirm password'}
          />
        </div>
        <Button type="submit">
          <Typography.Subtitle2>Sign Up</Typography.Subtitle2>
        </Button>
      </form>
      <Typography.Body2>Already have an account?</Typography.Body2>
      <Button to={'/login'} variant={'link'}>
        <Typography.H3>Sign In</Typography.H3>
      </Button>
    </Card>
  )
}
