import { useNavigate } from 'react-router-dom'

import s from './back-button.module.scss'

import { ArrowBack } from '@/assets/icons/arrow-back.tsx'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(-1)} variant={'link'} className={s.button}>
      <div className={s.wrapper}>
        <div style={{ marginRight: '10px' }}>
          <ArrowBack />
        </div>
        <Typography.Body2>Back to Previous Page</Typography.Body2>
      </div>
    </Button>
  )
}
