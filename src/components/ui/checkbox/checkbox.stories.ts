import { Meta, StoryObj } from '@storybook/react'

import { CheckboxComponent } from '@/components/ui/checkbox/checkbox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckboxComponent>

export default meta
type Story = StoryObj<typeof meta>

export const CheckBox: Story = {
  args: {
    variant: 'primary',
    label: 'Check-box',
    disabled: false,
  },
}
