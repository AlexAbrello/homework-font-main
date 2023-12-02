import { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderComponent: Story = {
  args: {},
}
