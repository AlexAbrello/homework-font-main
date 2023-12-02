import { PaginatedEntity, PaginatedRequest } from '@/services/types.ts'

export type EditDeckRequest = {
  id: string
  request: CreateDeckRequest
}

export type CreateDeckRequest = {
  name: string
  isPrivate?: boolean
}

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type DecksResponse = {
  maxCardsCount: number
} & PaginatedEntity<Deck>

export type Author = {
  id: string
  name: string
}
export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted: boolean
  isBlocked: boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type GetDeckCardsArgs = {
  id?: string
  question?: string
  answer?: string
  orderBy?: string | null
} & PaginatedRequest

export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  grade: number
  created: string
  updated: string
}

export type GetDeckByIdResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
} & Author

export type GetDeckByIdArgs = {
  id?: string
  cover?: string
  name?: string
  isPrivate?: boolean
}

export type CreateCardArgs = {
  id?: string
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  // questionVideo?: string
  // answerVideo?: string
}

export type DeckCardsResponse = PaginatedEntity<Card>
