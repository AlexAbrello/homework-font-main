export type getRandomCardsArgs = {
  id: string | undefined
  previousId?: string
}

export type sendAnswerArgs = {
  id: string | undefined
  cardId: string | undefined
  grade: number
}
