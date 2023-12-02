import { ChangeEvent, FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import { PlusIcon } from '@/assets/icons/plus.tsx'
import { Button, ControlledTextField, DialogComponent } from '@/components/ui'
import s from '@/components/ui/modals/create-deck/create-deck.module.scss'
import { Typography } from '@/components/ui/typography'
import { useCreateCardMutation } from '@/services/cards'
import { SelectComponent } from '../../select/select'
import { InputWithTypeFile } from '../../controlled/controlled-input-file/input-file'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { errorOptions, successOptions } from '../../notifications/options'

const createCardSchema = z.object({
  question: z.string().nonempty(),
  answer: z.string().nonempty(),
  questionImg: z.any(),
  answerImg: z.any(),
})

export type CreateCardForm = z.infer<typeof createCardSchema>

type CreateCardProps = {
  id: string | undefined
}

export const CreateCardComponent: FC<CreateCardProps> = ({ id }) => {

  const [create] = useCreateCardMutation()
  const [open, setOpen] = useState<boolean>(false)

  const [questionPreview, setQuestionPreview] = useState('')
  const [answerPreview, setAnswerPreview] = useState('')
  const [answerImgError, setAnswerImgError] = useState('')
  const [questionImgError, setQuestionImgError] = useState('')

  const [format, setFormat] = useState('Text')

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCardForm>({
    resolver: zodResolver(createCardSchema),
  })

  const createCard = (data: CreateCardForm) => {

    create({
      id,
      question: data.question || data.questionImg[0].name,
      answer: data.answer || data.answerImg[0].name,
      questionImg: data.questionImg && data.questionImg[0],
      answerImg: data.answerImg && data.answerImg[0],
    })
      .unwrap()
      .then(data => {
        toast.success(`Card ${data.question} is created successfully`, successOptions)
      })
      .catch(() => {
        toast.error('Something went wrong, try again', errorOptions)
      })
    closeDialogHandler()
    setOpen(false)
  }

  const closeDialogHandler = () => {
    reset()
    setQuestionPreview('')
    setAnswerPreview('')
    setFormat('Text')
  }

  const resetSelect = () => {
    reset()
    setQuestionPreview('')
    setAnswerPreview('')
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const question = event.target.name === 'questionImg'
    const answer = event.target.name === 'answerImg'
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      question && setQuestionImgError('Only JPEG and PNG images are allowed.')
      answer && setAnswerImgError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      question && setQuestionImgError('The image size should not exceed 1MB.')
      answer && setAnswerImgError('The image size should not exceed 1MB.')

      return
    }

    question && setQuestionPreview(URL.createObjectURL(file))
    answer && setAnswerPreview(URL.createObjectURL(file))
    setQuestionImgError('')
    setAnswerImgError('')

  }

  return (
    <DialogComponent
      open={open}
      setOpen={setOpen}
      callBack={closeDialogHandler}
      trigger={
        <Button variant={'primary'}>
          <div style={{ display: 'flex' }}>
            <PlusIcon />
            <div style={{ marginLeft: '10px' }}>
              <Typography.Subtitle2>Add New Card</Typography.Subtitle2>
            </div>
          </div>
        </Button>
      }
      title={'Create New Card'}
    >
      <SelectComponent
        placeholder={format}
        className={s.select}
        onChange={(value) => {
          setFormat(value)
          resetSelect()
        }}>
        <Typography.Body2>Text</Typography.Body2>
        <Typography.Body2>Image</Typography.Body2>
      </SelectComponent>
      <form onSubmit={handleSubmit(createCard)}>
        {format === 'Text'
          ? <>
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
          </>
          : <>
            <InputWithTypeFile imageSrc={questionPreview} errorMessage={questionImgError}>
              <input type='file' {...register('questionImg')} onChange={handleImageChange} />
            </InputWithTypeFile>
            <InputWithTypeFile imageSrc={answerPreview} errorMessage={answerImgError}>
              <input type='file' {...register('answerImg')} onChange={handleImageChange} />
            </InputWithTypeFile>
          </>}
        <div className={s.submitButton}>
          <Button type={'submit'}>
            <Typography.Subtitle2>Add New Card</Typography.Subtitle2>
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
