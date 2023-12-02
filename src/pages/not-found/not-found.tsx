import s from './not-found.module.scss'

import { NotFoundImage } from '@/assets/images/error-message.tsx'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography'

export const PageNotFound = () => {
  return (
    <div className={s.wrapper}>
      <NotFoundImage />
      <div style={{ margin: '50px 0' }}>
        <Typography.Body1>Sorry! Page not found!</Typography.Body1>
      </div>
      <Button to={'/'}>
        <Typography.Subtitle2>Back to Home Page</Typography.Subtitle2>
      </Button>
    </div>
  )
}
