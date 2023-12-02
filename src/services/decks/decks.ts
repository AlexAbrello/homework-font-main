import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckRequest,
  Deck,
  DecksResponse,
  EditDeckRequest,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
  GetDecksArgs,
} from '@/services/decks/types.ts'
import { RootState } from '@/services/store.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, CreateDeckRequest>({
        query: body => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body,
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          try {
            const response = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                {
                  currentPage: state.deckSlice.currentPage,
                  itemsPerPage: state.deckSlice.itemsPerPage,
                  name: state.deckSlice.searchByName,
                  minCardsCount: state.deckSlice.minCardsCount,
                  maxCardsCount: state.deckSlice.maxCardsCount,
                  authorId: state.deckSlice.authorId,
                },
                draft => {
                  draft.items.unshift(response?.data)
                }
              )
            )
          } catch (error) {
            console.log(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                currentPage: state.deckSlice.currentPage,
                itemsPerPage: state.deckSlice.itemsPerPage,
                name: state.deckSlice.searchByName,
                minCardsCount: state.deckSlice.minCardsCount,
                maxCardsCount: state.deckSlice.maxCardsCount,
                authorId: state.deckSlice.authorId,
              },
              draft => {
                draft.items = draft.items.filter(el => el.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      editDeck: builder.mutation<Deck, EditDeckRequest>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'PATCH',
          body: data.request,
        }),
        async onQueryStarted({ id, request }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              {
                currentPage: state.deckSlice.currentPage,
                itemsPerPage: state.deckSlice.itemsPerPage,
                name: state.deckSlice.searchByName,
                minCardsCount: state.deckSlice.minCardsCount,
                maxCardsCount: state.deckSlice.maxCardsCount,
                authorId: state.deckSlice.authorId,
              },
              draft => {
                draft.items = draft.items.map(el =>
                  el.id === id ? { ...el, name: request.name } : el
                )
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        query: ({ id, ...args }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'GET',
            params: { ...args },
          }
        },
        providesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useEditDeckMutation,
  useGetDeckByIdQuery,
} = decksApi
