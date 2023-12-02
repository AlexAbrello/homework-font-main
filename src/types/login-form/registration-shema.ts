import { z } from 'zod'

export const registartionShema = z
  .object({
    email: z
      .string({ required_error: 'Введите Email' })
      .email({ message: 'Неподходящий e-mail' })
      .nonempty('Enter email'),
    password: z
      .string({ required_error: 'Введите пароль' })
      .min(3, { message: 'Пароль должен быть не менее 3х символов' })
      .max(30, { message: 'Пароль должен быть не более 30 символов' })
      .nonempty('Enter email'),
    confirmPassword: z.string({ required_error: 'Повторите пароль' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Введенные пароли не совпадают',
  })

export type FormValues = z.infer<typeof registartionShema>
