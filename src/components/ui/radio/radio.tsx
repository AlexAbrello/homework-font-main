import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio.module.scss'

export type RadioProps = {
  options?: string[]
  label?: string
  disabled?: boolean
  onChange?: (checked: string) => void
}

export const Radio: FC<RadioProps> = ({ options, disabled, onChange }) => {
  const classNames = {
    root: s.radioGroupRoot,
    wrapper: s.wrapper,
    item: s.radioGroupItem,
    indicator: clsx(s.radioGroupIndicator, disabled && s.radioGroupIndicatorDisabled),
    label: clsx(s.label, disabled && s.labelDisabled),
  }

  return (
    <RadioGroup.Root className={classNames.root} onValueChange={onChange} disabled={disabled}>
      {options?.map((option, index) => (
        <div className={classNames.wrapper} key={index}>
          <RadioGroup.Item value={(index + 1).toString()} className={classNames.item}>
            <RadioGroup.Indicator className={classNames.indicator} />
          </RadioGroup.Item>
          <label className={classNames.label}>{option}</label>
        </div>
      ))}
    </RadioGroup.Root>
  )
}
