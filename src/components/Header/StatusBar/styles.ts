import styled from 'styled-components'

export const StatusBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`

interface StatusBarProgressContaienrProps {
  active: boolean
}

export const StatusBarProgressContaienr = styled.div<StatusBarProgressContaienrProps>`
  width: 100%;
  height: 10px;
  background: ${(props) => (props.active === true ? '#90EE90' : '#D3D3D3')};
`
