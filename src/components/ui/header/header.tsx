import { FC } from 'react'

import s from './header.module.scss'

type HeaderProps = {
  children?: React.ReactNode
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className={s.root}>
      <div className={s.childContainer}>{children}</div>
    </header>
  )
}
