import { FC } from 'react'

import { Head, HeadCell, Row } from '@/components/ui'
import { Typography } from '@/components/ui/typography'

type TableHeaderProps = {
  headers: string[]
}

export const TableHeader: FC<TableHeaderProps> = ({ headers }) => {
  return (
    <Head>
      <Row>
        {headers.map(header => (
          <HeadCell key={header}>
            <Typography.Subtitle2>{header}</Typography.Subtitle2>
          </HeadCell>
        ))}
        <HeadCell />
      </Row>
    </Head>
  )
}
