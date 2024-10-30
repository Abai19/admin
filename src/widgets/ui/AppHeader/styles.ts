import styled from 'styled-components'
import { Button, Layout, Typography } from 'antd'
import { BellOutlined } from '@ant-design/icons'

export const StyledHeader = styled(Layout.Header)<{ colorbgcontainer: string; collapsed?: number; colorborder: string }>`
    padding: 0 24px 0 0;
    background: ${props => props.colorbgcontainer};
    width: ${props => (props.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)')};
    transition:
        all 0.2s,
        background 0s;
    position: fixed;
    z-index: 2;
    left: ${props => (props.collapsed ? '80px' : '200px')};
    top: 0;
    border-bottom: ${props => `1px solid ${props.colorborder}`};
`

export const StyledButton = styled(Button)`
    font-size: 16px !important;
    width: 64px !important;
    height: 64px !important;
`

export const StyledTitle = styled(Typography.Title)`
    margin-bottom: 0;
    font-size: 20px !important;
    font-weight: 500;
`
