import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './forgot-password-form.module.scss'

import { Button, Card, ControlledTextField } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import { FormValues, registartionShema } from '@/types/login-form/registration-shema.ts'

type ForgotPasswordProps = {
  onSubmit: (data: FormValues) => void
}
export const ForgotPassword: FC<ForgotPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registartionShema),
  })

  return (
    <Card>
      <Typography.H1>Forgot your password?</Typography.H1>
      <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
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
          <Typography.Body2 style={{ color: '#4C4C4C' }}>
            Enter your email address and we will send you further instructions{' '}
          </Typography.Body2>
        </div>
        <Button type={'submit'}>
          <Typography.Subtitle2>Send Instruction</Typography.Subtitle2>
        </Button>
      </form>
      <Typography.Body2>Did you remember your password?</Typography.Body2>
      <Button to={'/login'} variant={'link'} type={'button'}>
        <Typography.H3>Sign In</Typography.H3>
      </Button>
    </Card>
  )
}
