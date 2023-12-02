import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './dialog.module.scss'

import { CloseIcon } from '@/assets/icons/close-icon.tsx'

type DialogProps = {
  trigger: ReactNode
  title: string
  description?: string
  children?: ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  callBack?: () => void
}

export const DialogComponent: FC<DialogProps> = ({
  trigger,
  title,
  description,
  children,
  setOpen,
  open,
  callBack,
}) => {

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={s.dialogTrigger} asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
          <Dialog.Title className={s.dialogTitle}>{title}</Dialog.Title>
          <Dialog.Description className={s.dialogDescription}>{description}</Dialog.Description>
          {children}
          <Dialog.Close onClick={callBack} asChild>
            <span className={s.iconButton} aria-label="Close">
              <CloseIcon />
            </span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
