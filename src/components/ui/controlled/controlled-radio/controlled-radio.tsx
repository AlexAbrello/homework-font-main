import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Radio, RadioProps } from '@/components/ui'

export type ControlledRadioProps<T extends FieldValues> = UseControllerProps<T> & RadioProps

export const ControlledRadio = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...RadioProps
}: ControlledRadioProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  })

  return (
    <Radio
      {...{
        onChange,
        checked: value,
        id: name,
        ...RadioProps,
      }}
    />
  )
}
