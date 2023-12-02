import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { EmptyDeck } from '@/pages/decks/empty-deck/empty-deck.tsx'
import { FriendDeck } from '@/pages/decks/friend-deck/friend-deck.tsx'
import { MyDeck } from '@/pages/decks/my-deck'
import { useGetDeckCardsQuery } from '@/services/cards'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useGetDeckByIdQuery } from '@/services/decks'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { useMeQuery } from '@/services/auth/auth-api'

export const Deck = () => {
  const { id } = useParams()
  const { data: userIdificate } = useMeQuery()

  const dispatch = useAppDispatch()

  const itemsPerPage = useAppSelector(state => state.cardsSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.cardsSlice.currentPage)
  const searchByName = useAppSelector(state => state.cardsSlice.searchByName)
  const userId = userIdificate?.id || ''

  const setDeckId = (id: string) => dispatch(cardsSlice.actions.setDeckId(id))

  const { currentData: data, isLoading: gettingCardsLoading } = useGetDeckCardsQuery({
    id,
    itemsPerPage,
    currentPage,
    question: searchByName,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })

  useEffect(() => {
    id && setDeckId(id)
  }, [])

  if (isLoading || gettingCardsLoading) return <Loader />
  if (data?.items.length === 0) return <EmptyDeck userId={userId} deckData={deckData} />

  return (
    <>
      {deckData?.userId === userId ? (
        <MyDeck
          data={data}
          deckData={deckData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      ) : (
        <FriendDeck
          deckData={deckData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          data={data}
        />
      )}
    </>
  )
}
