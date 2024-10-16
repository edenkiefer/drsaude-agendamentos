import { useContext } from 'react'

import { AppointmentsContext } from '../../../contexts/AppointmentsContext'
import { StatusBarContainer, StatusBarProgressContaienr } from './styles'

export function StatusBar() {
  const { statusBar } = useContext(AppointmentsContext)

  return (
    <StatusBarContainer>
      <StatusBarProgressContaienr active={statusBar >= 1} />
      <StatusBarProgressContaienr active={statusBar >= 2} />
      <StatusBarProgressContaienr active={statusBar >= 3} />
      <StatusBarProgressContaienr active={statusBar >= 4} />
    </StatusBarContainer>
  )
}
