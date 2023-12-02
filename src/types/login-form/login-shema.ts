import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Введите Email' })
    .email({ message: 'Неподходящий e-mail' })
    .nonempty('Enter email'),
  password: z
    .string({ required_error: 'Введите пароль' })
    .min(3, { message: 'Пароль должен быть не менее 3х символов' })
    .max(30, { message: 'Пароль должен быть не более 30 символов' })
    .nonempty('Enter email'),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>
