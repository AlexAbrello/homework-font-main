import { FC } from 'react'

import s from './my-empty-deck.module.scss'

import { BackButton } from '@/components/ui/back-button'
import { CreateCardComponent } from '@/components/ui/modals/create-card/create-card.tsx'
import { Typography } from '@/components/ui/typography'
import { GetDeckByIdResponse } from '@/services/decks/types.ts'

type MyEmptyDeckProps = {
  deckData?: GetDeckByIdResponse
}

export const MyEmptyDeck: FC<MyEmptyDeckProps> = ({ deckData }) => {
  return (
    <div className={s.root}>
      <BackButton />
      <div className={s.title}>
        <Typography.H2>{deckData?.name}</Typography.H2>
      </div>
      <div className={s.body}>
        <Typography.Body1 className={s.text}>
          This deck is empty. Click add new card to fill this deck
        </Typography.Body1>
        <CreateCardComponent id={deckData?.id} />
      </div>
    </div>
  )
}
