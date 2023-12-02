import { FC } from 'react'

import { Play } from '@/assets/icons/play.tsx'
import { Body, Button, Cell, Row } from '@/components/ui'
import { EditDeckComponent } from '@/components/ui/modals/edit-deck'
import s from '@/components/ui/tables/decks-tables/decks-table.module.scss'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services/decks'
import { Deck } from '@/services/decks/types.ts'
import { DeleteButton } from '../modals/delete-button/delete-button'
import { useMeQuery } from '@/services/auth/auth-api'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { Write } from '@/assets/icons/write'

type DecksProps = {
  data: Deck[]
}

export const TableBody: FC<DecksProps> = ({ data }) => {

  const [deleteDeck] = useDeleteDeckMutation()
  const { data: userIndificator } = useMeQuery()

  const userId = userIndificator?.id

  const description = 'Do you really want to delete this deck and all cards into?'

  return (
    <Body>
      {data.map(deck => {
        return (
          <Row key={deck.id}>
            <Cell>
              <Button to={`/deck/${deck.id}`} variant={'link'} className={s.link}>
                <Typography.Body2>{deck.name}</Typography.Body2>
              </Button>
            </Cell>
            <Cell>
              <Typography.Body2>{deck.cardsCount}</Typography.Body2>
            </Cell>
            <Cell>
              <Typography.Body2>{new Date(deck.updated).toLocaleString('en-GB')}</Typography.Body2>
            </Cell>
            <Cell>
              <Typography.Body2>{deck.author.name}</Typography.Body2>
            </Cell>
            <Cell>
              <div style={{ display: 'flex' }}>
                <Button to={`/deck/${deck.id}/learn`} variant={'secondary'}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play />
                  </div>
                </Button>
                {deck.author.id === userId && (
                  <>
                    <EditDeckComponent id={deck.id}
                      trigger={<Button variant={'secondary'} style={{ marginLeft: '5px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Write />
                        </div>
                      </Button>
                      } />
                    <DeleteButton id={deck.id}
                      callBack={deleteDeck}
                      description={description}
                      trigger={<Button variant={'secondary'} style={{ marginLeft: '5px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <DeleteIcon />
                        </div>
                      </Button>
                      } />
                  </>
                )}
              </div>
            </Cell>
          </Row>
        )
      })}
    </Body>
  )
}
