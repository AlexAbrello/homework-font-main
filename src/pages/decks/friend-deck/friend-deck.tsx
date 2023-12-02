import { ChangeEvent, FC, useCallback } from 'react'

import s from './friend-deck.module.scss'

import { Button, TextField } from '@/components/ui'
import { BackButton } from '@/components/ui/back-button'
import { Loader } from '@/components/ui/loader'
import { PaginationPanel } from '@/components/ui/pagination-panel'
import { FriendCardsTable } from '@/components/ui/tables/cards-tables/friend-cards-table/friend-cards-table.tsx'
import { Typography } from '@/components/ui/typography'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { DeckCardsResponse, GetDeckByIdResponse } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { useDebounce } from '@/hooks/useDebounce'

type FriendDeckProps = {
  data?: DeckCardsResponse
  deckData?: GetDeckByIdResponse
  itemsPerPage: number
  currentPage: number
}

export const FriendDeck: FC<FriendDeckProps> = ({ deckData, data, itemsPerPage, currentPage }) => {
  const dispatch = useAppDispatch()

  const setSearchByName = (name: string) => dispatch(cardsSlice.actions.setSearchByName(name))
  const setCurrentPage = (value: number) => dispatch(cardsSlice.actions.setCurrentPage(value))
  const setItemsPerPage = (value: number) => dispatch(cardsSlice.actions.setItemsPerPage(value))

  const onSearchHandler = useCallback(useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value)
    setCurrentPage(1)
  }, 700), [dispatch])

  return (
    <div className={s.wrapper}>
      <BackButton />
      <div className={s.title}>
        {deckData && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography.H2>{deckData.name}</Typography.H2>
            <Button to={`/deck/${deckData.id}/learn`} variant={'primary'}>
              <Typography.Body2>Learn</Typography.Body2>
            </Button>
          </div>
        )}
      </div>
      {data ? (
        <>
          <TextField
            onChange={onSearchHandler}
            type={'search'}
            placeholder={'input search'}
            label={'Search by Card Name'}
          />
          <div className={s.table}>
            <FriendCardsTable data={data} />
          </div>
          <div className={s.pagination}>
            <PaginationPanel
              count={data.pagination.totalPages}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}
