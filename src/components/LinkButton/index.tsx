import React from 'react'
import { LinkProps } from 'react-router-dom'

import { ButtonContainer } from './styles'

interface ButtonProps extends LinkProps {
  children: React.ReactNode
  to: string
}

export function LinkButton({ children, to, ...rest }: ButtonProps) {
  return (
    <ButtonContainer to={to} {...rest}>
      {children}
    </ButtonContainer>
  )
}
