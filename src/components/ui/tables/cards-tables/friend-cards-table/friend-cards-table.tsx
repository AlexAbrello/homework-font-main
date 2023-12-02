import { FC } from 'react'

import { Grade } from '@/components/ui/grade/grade'
import { Body, Cell, Head, HeadCell, Root, Row } from '@/components/ui/index.js'
import { CardsTableProps } from '@/components/ui/tables/cards-tables/my-cards-table/my-cards-table.tsx'
import { Typography } from '@/components/ui/typography/index.js'

export const FriendCardsTable: FC<CardsTableProps> = ({ data }) => {
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
        </Row>
      </Head>
      <Body>
        {data?.items.map(card => {
          return (
            <Row key={card.id}>
              <Cell>
                <Typography.Body2>{card.question}</Typography.Body2>
              </Cell>
              <Cell>
                <Typography.Body2>{card.answer}</Typography.Body2>
              </Cell>
              <Cell>
                <Typography.Body2>
                  {new Date(card.updated).toLocaleString('en-GB')}
                </Typography.Body2>
              </Cell>
              <Cell>
                <Grade grade={card.grade} />
              </Cell>
            </Row>
          )
        })}
      </Body>
    </Root>
  )
}
