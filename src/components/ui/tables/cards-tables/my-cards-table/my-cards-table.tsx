import { FC } from 'react'

import { Body, Button, Cell, Head, HeadCell, Root, Row } from '@/components/ui'
import { Grade } from '@/components/ui/grade/grade.tsx'
import { EditCardComponent } from '@/components/ui/modals/edit-card/edit-card.tsx'
import { Typography } from '@/components/ui/typography'
import { DeckCardsResponse } from '@/services/decks/types.ts'

import { DeleteButton } from '@/components/ui/modals/delete-button/delete-button'
import { useDeleteCardMutation } from '@/services/cards'
import { DeleteIcon } from '@/assets/icons/delete-icon'

export type CardsTableProps = {
  data?: DeckCardsResponse
}

export const MyCardsTable: FC<CardsTableProps> = ({ data }) => {

  const [deleteCard] = useDeleteCardMutation()
  const description = 'Do you really want do delete this card?'

  return (
    <Root>
      <Head>
        <Row>
          <HeadCell>
            <Typography.Subtitle2>Question</Typography.Subtitle2>
          </HeadCell>
          <HeadCell>
            <Typography.Subtitle2>Answer</Typography.Subtitle2>
          </HeadCell>
          <HeadCell>
            <Typography.Subtitle2>Last Updated</Typography.Subtitle2>
          </HeadCell>
          <HeadCell>
            <Typography.Subtitle2>Grade</Typography.Subtitle2>
          </HeadCell>
          <HeadCell />
        </Row>
      </Head>
      <Body>
        {data?.items.map(card => {
          return (
            <Row key={card.id}>
              <Cell>
                {card.questionImg
                  ? <img src={card.questionImg} style={{ width: '120px', height: '50px' }} />
                  : <Typography.Body2>{card.question}</Typography.Body2>}
              </Cell>
              <Cell>
                {card.answerImg
                  ? <img src={card.answerImg} style={{ width: '120px', height: '50px' }} />
                  : <Typography.Body2>{card.answer}</Typography.Body2>}
              </Cell>
              <Cell>
                <Typography.Body2>
                  {new Date(card.updated).toLocaleString('en-GB')}
                </Typography.Body2>
              </Cell>
              <Cell>
                <Grade grade={card.grade} />
              </Cell>
              <Cell>
                <EditCardComponent id={card.id} />
                <DeleteButton id={card.id}
                  callBack={deleteCard}
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
                  </Button>} />
              </Cell>
            </Row>
          )
        })}
      </Body>
    </Root>
  )
}
