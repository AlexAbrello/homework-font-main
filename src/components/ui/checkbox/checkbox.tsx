import { FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import style from './checkbox.module.css'

import { Typography } from '@/components/ui/typography'

export type CheckboxProps = {
  variant?: 'primary'
  label?: string
  disabled?: boolean
  checked?: boolean
  required?: boolean
  id?: string
  onChange?: (checked: boolean) => void
}

export const CheckboxComponent: FC<CheckboxProps> = ({
  disabled,
  label,
  onChange,
  id,
  required,
  checked,
}) => {
  const classNames = {
    wrapper: style.checkboxWrapper,
    root: clsx(style.CheckboxRoot, disabled && style.CheckboxRootDisabled),
    indicator: clsx(style.CheckboxIndicator, disabled && style.CheckboxIndicatorDisabled),
    label: clsx(style.Label, disabled && style.LabelDisabled),
  }

  return (
    <div className={classNames.wrapper}>
      <Checkbox.Root
        className={classNames.root}
        checked={checked}
        onCheckedChange={onChange}
        required={required}
        id={id}
      >
        <Checkbox.Indicator className={classNames.indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className={classNames.label}>
        <Typography.Body2>{label}</Typography.Body2>
      </label>
    </div>
  )
}
