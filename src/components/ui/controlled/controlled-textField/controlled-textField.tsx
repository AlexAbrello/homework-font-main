import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

export type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> & TextFieldProps

export const ControlledTextField = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...TextFieldProps
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <TextField
      {...{
        onChange,
        id: name,
        defaultValue,
        ...TextFieldProps,
      }}
      errorMessage={error?.message}
    />
  )
}
