import React from 'react'
import styled from 'styled-components'
import swap_background from '../assets/svg/swap_background.svg'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: url(${swap_background}) no-repeat;
  background-size: contain;
  min-height: 660px;
  padding: 1rem;
  
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-height: 600px;
  `};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
