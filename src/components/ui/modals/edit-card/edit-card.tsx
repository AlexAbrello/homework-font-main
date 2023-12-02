import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Write } from '@/assets/icons/write.tsx'
import { Button, ControlledTextField, DialogComponent } from '@/components/ui'
import s from '@/components/ui/modals/create-deck/create-deck.module.scss'
import { Typography } from '@/components/ui/typography'
import { useEditCardMutation } from '@/services/cards'

const createCardSchema = z.object({
  question: z.string({ required_error: 'Введите вопрос' }).nonempty('Enter a question'),
  answer: z.string({ required_error: 'Введите ответ на вопрос' }).nonempty('Enter an answer'),
})

export type CreateCardForm = z.infer<typeof createCardSchema>

type CreateCardProps = {
  id: string | undefined
}

export const EditCardComponent: FC<CreateCardProps> = ({ id }) => {
  const [edit] = useEditCardMutation()
  const [open, setOpen] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCardForm>({
    resolver: zodResolver(createCardSchema),
  })

  const createCard = (data: CreateCardForm) => {
    edit({ id, question: data.question, answer: data.answer })
    reset()
    setOpen(false)
  }

  const closeDialogHandler = () => {
    reset()
  }

  return (
    <DialogComponent
      open={open}
      setOpen={setOpen}
      callBack={closeDialogHandler}
      trigger={
        <Button variant={'secondary'} style={{ marginRight: '5px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Write />
          </div>
        </Button>
      }
      title={'Edit Card'}
    >
      <form onSubmit={handleSubmit(createCard)}>
        <ControlledTextField
          name={'question'}
          control={control}
          label={'Question'}
          type={'text'}
          errorMessage={errors?.question?.message}
        />
        <ControlledTextField
          name={'answer'}
          control={control}
          label={'Answer'}
          type={'text'}
          errorMessage={errors?.answer?.message}
        />
        <div className={s.submitButton}>
          <Button type={'submit'}>
            <Typography.Subtitle2>Edit Card</Typography.Subtitle2>
          </Button>
        </div>
      </form>
      <DialogClose onClick={closeDialogHandler} asChild>
        <Button variant={'secondary'} type={'button'}>
          <Typography.Subtitle2>Cancel</Typography.Subtitle2>
        </Button>
      </DialogClose>
    </DialogComponent>
  )
}
