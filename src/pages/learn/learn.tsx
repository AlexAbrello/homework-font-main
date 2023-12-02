import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './learn.module.scss'

import { Button, Card, ControlledRadio } from '@/components/ui'
import { BackButton } from '@/components/ui/back-button'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useGetRandomCardsQuery, useSendAnswerMutation } from '@/services/cards'
import { useGetDeckByIdQuery } from '@/services/decks'

const options = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']
const numbers = options.map((_, index) => (index + 1).toString())

const radioSchema = z.object({
  radioValue: z.enum([...numbers] as [string, ...string[]], { required_error: 'Выберите ответ' }),
})

type radioForm = z.infer<typeof radioSchema>

export const Learn = () => {
  const { id } = useParams()
  const [show, setShow] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<radioForm>({
    resolver: zodResolver(radioSchema),
  })

  const { data, isLoading } = useGetRandomCardsQuery({ id })
  const { data: deckData, isLoading: gettingDeckData } = useGetDeckByIdQuery({ id })
  const [sendAnswer, { isLoading: sending }] = useSendAnswerMutation()

  const onSubmit = (dataFrom: radioForm) => {
    sendAnswer({ id: data?.deckId, grade: +dataFrom.radioValue, cardId: data?.id })
    reset()
    setShow(false)
  }

  if (isLoading || gettingDeckData) return <Loader />

  return (
    <div className={s.wrapper}>
      <BackButton />
      {data && deckData && (
        <Card>
          <div className={s.root}>
            <Typography.H2>Learn {deckData.name}</Typography.H2>
          </div>
          <div className={s.questionTitle}>
            <Typography.Subtitle1>Question:</Typography.Subtitle1>
            <div className={s.title}>
              {sending ? (
                <Typography.Subtitle2>Just a sec...</Typography.Subtitle2>
              ) : (
                <Typography.Subtitle2>{data.question}</Typography.Subtitle2>
              )}
            </div>
          </div>
          {show ? (
            <div>
              <div className={s.questionTitle}>
                <Typography.Subtitle1>Answer:</Typography.Subtitle1>
              </div>
              <div className={s.title}>
                <Typography.Subtitle2>{data.answer}</Typography.Subtitle2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.questionTitle}>
                  <ControlledRadio options={options} control={control} name={'radioValue'} />
                  {errors && <div style={{ color: 'red' }}>{errors?.radioValue?.message}</div>}
                </div>
                <div className={s.title}>
                  <Button type={'submit'}>
                    <Typography.Body1>Next Question</Typography.Body1>
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className={s.title}>
              <Button onClick={() => setShow(true)}>
                <Typography.Body1>Show answer</Typography.Body1>
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
