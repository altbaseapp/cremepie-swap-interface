import React, { useRef } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
// import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { isMobile } from 'react-device-detect'

import Home from '../../assets/svg/home_icon.svg'
import Trade from '../../assets/svg/trade_icon.svg'
import Pools from '../../assets/svg/pools_icon.svg'
import Active from '../../assets/svg/active_menu.svg'

const MenuFlyout = styled.div<{ isMobile: boolean, showMenu: boolean }>`
  background-color: ${({ theme }) => theme.bg1};
  font-size: 1rem;
  z-index: 2;
  padding-top: 2rem;
  transition: width 0.3s;
  display: ${({ isMobile, showMenu }) => isMobile && !showMenu ? 'none' : 'block'};
  width: ${({ isMobile, showMenu }) => showMenu ? '240px' : !isMobile && '56px'};
  position: ${({ isMobile, showMenu }) => isMobile && showMenu ? 'absolute' : 'unset'};
  height: ${({ isMobile, showMenu }) => isMobile && showMenu ? 'calc(100vh - 64px)' : 'auto'};
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
    display: flex;
    align-items: center;
    padding: 1rem;
    overflow: hidden;
    text-decoration: none;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    :hover {
      color: ${({ theme }) => theme.text2};
      background: #89DBC420;
      cursor: pointer;
    }
    > img {
      width: 25px;
      margin-right: 1rem;
      &.active {
        display: none;
      }
    }
    
    &.${activeClassName} {
      > img {
        &.active {
          display: block;
          position: absolute;
          left: 0;
          width: 18px;
        }
      }
    }
  `

interface MenuProps {
  showMenu: boolean
}

export default function Menu({
  showMenu
}: MenuProps) {

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  // const { t } = useTranslation()

  return (
    <MenuFlyout ref={node as any}
      showMenu={showMenu}
      isMobile={isMobile}
      className={`${isMobile ? showMenu ? 'show mobile' : 'hide' : showMenu ? 'show' : 'minimize'}`}
    >
      <StyledNavLink id={`home-nav-link`} to={'/home'}>
        <img className='active' src={Active} alt="active" />
        <img src={Home} alt="home" />
        Home
      </StyledNavLink>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
        <img className='active' src={Active} alt="active" />
        <img src={Trade} alt="trade" />
        Trade
      </StyledNavLink>
      <StyledNavLink
        id={`pool-nav-link`}
        to={'/pool'}
        isActive={(match, { pathname }) =>
          Boolean(match) ||
          pathname.startsWith('/add') ||
          pathname.startsWith('/remove') ||
          pathname.startsWith('/create') ||
          pathname.startsWith('/find')
        }
      >
        <img className='active' src={Active} alt="active" />
        <img src={Pools} alt="pools" />
        {/* {t('pool')} */}
        Pool
      </StyledNavLink>
    </MenuFlyout>
  )
}
