import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  itemsPerPage: 10,
  currentPage: 1,
  searchByName: '',
  minCardsCount: 0,
  maxCardsCount: 61,
  authorId: '',
}

export const decksSlice = createSlice({
  initialState,
  name: 'deckSlice',
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setMinCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
    },
  },
})
