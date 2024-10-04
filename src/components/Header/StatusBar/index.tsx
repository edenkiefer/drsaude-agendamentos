import { useContext } from 'react'

import { AppointmentsContext } from '../../../contexts/AppointmentsContext'
import { StatusBarContainer, StatusBarProgressContaienr } from './styles'

export function StatusBar() {
  const { statusBar } = useContext(AppointmentsContext)

  return (
    <StatusBarContainer>
      <StatusBarProgressContaienr active={statusBar >= 1 && true} />
      <StatusBarProgressContaienr active={statusBar >= 2 && true} />
      <StatusBarProgressContaienr active={statusBar >= 3 && true} />
      <StatusBarProgressContaienr active={statusBar >= 4 && true} />
    </StatusBarContainer>
  )
}
