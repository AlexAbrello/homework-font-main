import { useCallback } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { useDebounce } from '@/hooks/useDebounce'

export const SliderComponent = () => {

  const dispatch = useAppDispatch()

  const minCardsCount = useAppSelector(state => state.deckSlice.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.deckSlice.maxCardsCount)

  const setMinCardsCount = (value: number) => dispatch(decksSlice.actions.setMinCardsCount(value))
  const setMaxCardsCount = (value: number) => dispatch(decksSlice.actions.setMaxCardsCount(value))
  const setCurrentPage = (value: number) => dispatch(decksSlice.actions.setCurrentPage(value))

  const changeValueHandler = useCallback(useDebounce((value: number[]) => {
    setMinCardsCount(value[0])
    setMaxCardsCount(value[1])
    setCurrentPage(1)
  }, 700
  ), [minCardsCount, maxCardsCount])
  
  return (
    <div className={s.wrapper}>
      <div className={s.valueWrapper}>
        <span className={s.value}>{minCardsCount}</span>
      </div>
      <Slider.Root
        className={s.sliderRoot}
        value={[minCardsCount, maxCardsCount]}
        max={61}
        step={1}
        onValueChange={changeValueHandler}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} />
        <Slider.Thumb className={s.sliderThumb} />
      </Slider.Root>
      <div className={s.valueWrapper}>
        <span className={s.value}>{maxCardsCount}</span>
      </div>
    </div>
  )
}
