import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import s from './button.module.scss';

export type ButtonProps = {
  children: ReactNode
  to?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className, to, children, disabled, ...rest }, ref) => {
    const linkRef = ref as React.RefObject<HTMLAnchorElement> // Указываем тип ссылки (ref) как HTMLAnchorElement

    return to ? (
      <Link
        to={to}
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        ref={linkRef}
      >
        {children}
      </Link>
    ) : (
      <button
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    )
  }
)
