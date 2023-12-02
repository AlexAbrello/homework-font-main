import { ChangeEvent, FC, useCallback, } from 'react'

import { TextField } from '@/components/ui'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'
import { useDebounce } from '@/hooks/useDebounce'

type SearchComponentProps = {
  label: string
}
export const SearchComponent: FC<SearchComponentProps> = ({ label }) => {

  const dispatch = useAppDispatch()

  const setSearchByName = (name: string) => dispatch(decksSlice.actions.setSearchByName(name))
  const setCurrentPage = (value: number) => dispatch(decksSlice.actions.setCurrentPage(value))

  const onSearchHandler = useCallback(useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value)
    setCurrentPage(1)
  }, 700), [dispatch])

  return (
    <TextField
      onChange={onSearchHandler}
      type={'search'}
      placeholder={'input search'}
      style={{ width: '300px' }}
      label={label}
    />
  )
}