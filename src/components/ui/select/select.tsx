import { FC, ReactNode } from 'react'

import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

import { DownArrow } from '@/assets/icons/down-arrow.tsx'

type SelectProps = {
  children: ReactNode
  placeholder: string | number
  onChange?: (value: string) => void
  className?: string
}

export const SelectComponent: FC<SelectProps> = ({ children, placeholder, onChange, className }) => {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger className={`${s.trigger} ${className}`}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={s.icon}>
          <DownArrow />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={s.content} position="popper">
          <Select.Viewport className={s.viewPort}>
            {Array.isArray(children) &&
              children.map((child, index) => {
                return (
                  <Select.Group key={index}>
                    <Select.Item value={child.props.children}>
                      <Select.ItemText>{child}</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                )
              })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
