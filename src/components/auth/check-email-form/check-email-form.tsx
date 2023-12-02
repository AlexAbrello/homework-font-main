import { FC } from 'react'

import EmailImage from '@/assets/icons/email-image.tsx'
import { Button, Card } from '@/components/ui'
import { Typography } from '@/components/ui/typography'

type CheckEmailProps = {
  email: string
}

export const CheckEmail: FC<CheckEmailProps> = ({ email = 'example@mail.com' }) => {
  return (
    <Card>
      <Typography.H1>Check Email</Typography.H1>
      <EmailImage />
      <Typography.Body2 style={{ color: '#4C4C4C', textAlign: 'center' }}>
        We’ve sent an Email with instructions to {email}
      </Typography.Body2>
      <Button to={'/login'} fullWidth={true}>
        <Typography.Subtitle2>Back to Sign In</Typography.Subtitle2>
      </Button>
    </Card>
  )
}
