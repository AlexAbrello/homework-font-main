import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './sign-in-form.module.scss'

import { Button, Card, ControlledCheckbox, ControlledTextField } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import { FormValues, loginSchema } from '@/types/login-form/login-shema.ts'

type SignInProps = {
  onSubmit: (data: FormValues) => void
}
export const SignIn: FC<SignInProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <Card>
        <Typography.H1>Sign In</Typography.H1>
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
          <ControlledCheckbox name={'rememberMe'} control={control} label={'Remember me'} />
          <Button to={'/forgot-password'} variant={'link'} type={'button'}>
            <Typography.Body2>Forgot Password?</Typography.Body2>
          </Button>
          <Button type={'submit'}>
            <Typography.Subtitle2>Submit</Typography.Subtitle2>
          </Button>
        </form>
        <Typography.Body2>Do not have an account?</Typography.Body2>
        <Button to={'/sign-up'} variant={'link'} type={'button'}>
          <Typography.H3>Sign Up</Typography.H3>
        </Button>
      </Card>
    </>
  )
}
