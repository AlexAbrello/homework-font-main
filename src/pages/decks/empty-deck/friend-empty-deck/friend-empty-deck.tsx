import { FC } from 'react'

import s from './friend-empty-deck.module.scss'

import { BackButton } from '@/components/ui/back-button'
import { Typography } from '@/components/ui/typography'
import { GetDeckByIdResponse } from '@/services/decks/types.ts'

type FriendEmptyDeckProps = {
  deckData?: GetDeckByIdResponse
}

export const FriendEmptyDeck: FC<FriendEmptyDeckProps> = ({ deckData }) => {
  return (
    <div className={s.root}>
      <BackButton />
      <div className={s.title}>
        <Typography.H2>{deckData?.name}</Typography.H2>
      </div>
      <div className={s.body}>
        <Typography.Body1 className={s.text}>
          This deck is empty. Try come back later.
        </Typography.Body1>
      </div>
    </div>
  )
}
