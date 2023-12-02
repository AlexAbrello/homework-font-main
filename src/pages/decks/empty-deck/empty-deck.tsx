import { FC } from 'react'

import { FriendEmptyDeck } from '@/pages/decks/empty-deck/friend-empty-deck/friend-empty-deck.tsx'
import { MyEmptyDeck } from '@/pages/decks/empty-deck/my-empty-deck'
import { GetDeckByIdResponse } from '@/services/decks/types.ts'

type EmptyDeckProps = {
  deckData?: GetDeckByIdResponse
  userId: string
}

export const EmptyDeck: FC<EmptyDeckProps> = ({ deckData, userId }) => {
  return (
    <>
      {deckData?.userId === userId ? (
        <MyEmptyDeck deckData={deckData} />
      ) : (
        <FriendEmptyDeck deckData={deckData} />
      )}
    </>
  )
}
