import { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/components/ui/textField/textField.tsx'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const TextFieldComponent: Story = {
  args: {
    disabled: false,
    placeholder: 'Input',
    label: 'Some input text',
    errorMessage: '',
  },
}
