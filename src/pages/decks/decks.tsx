import s from './decks.module.scss'

import { ControlPanel } from '@/components/ui/control-panel'
import { CreateDeckComponent } from '@/components/ui/modals/create-deck'
import { DecksTable } from '@/components/ui/tables/decks-tables'
import { Typography } from '@/components/ui/typography'

export const Decks = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Typography.H2>Decks List</Typography.H2>
        <CreateDeckComponent />
      </div>
      <ControlPanel />
      <DecksTable />
    </div>
  )
}
