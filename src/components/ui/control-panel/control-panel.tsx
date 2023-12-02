import s from './control-panel.module.scss'

import { SliderComponent, TabsComponent } from '@/components/ui'
import { SearchComponent } from '@/components/ui/search-component/search-component.tsx'
import { Typography } from '@/components/ui/typography'
import { ClearFilterComponent } from '../clear-filter/clear-filter'

export const ControlPanel = () => {
  
  return (
    <div className={s.wrapper}>
      <SearchComponent label={'Search Deck by Name'} />
      <div style={{ display: 'flex' }}>
        <TabsComponent>
          <Typography.Body2>My Decks</Typography.Body2>
          <Typography.Body2>All Decks</Typography.Body2>
        </TabsComponent>
      </div>
      <SliderComponent />
      <ClearFilterComponent />
    </div>
  )
}
