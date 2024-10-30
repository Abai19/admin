import styled from 'styled-components'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'

export const StyledSider = styled(Layout.Sider)`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
`
export const StyledLink = styled(NavLink)`
    display: flex;
    justify-content: center;
    padding: 10px;
`
export const StyledDiv = styled.div<{ colorbgcontainer: string; collapsed?: number; colorborder: string }>`
    height: 100vh;
    width: ${props => (props.collapsed ? '80px' : '200px')};
    background-color: ${props => props.colorbgcontainer};
    border-right: ${props => `1px solid ${props.colorborder}`};
`

export const StyledMenu = styled(Menu)`
    border-right: 0;
    border-inline-end: none !important;
`
