import { FC, memo, useContext } from 'react'
import { Dropdown, Flex, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { IProps } from './types.ts'
import { StyledHeader, StyledButton, StyledTitle } from './styles.ts'
import { AuthContext } from '~/app/providers/auth-provider'
import { AntdContext } from '~/app/providers/antd-provider'
import { MAIN_ROUTERS } from '~/shared/lib'
import { itemsUser } from './consts.tsx'
import { useNavigate } from 'react-router-dom'

const AppHeaderComponent: FC<IProps> = ({ title }) => {
    const navigate = useNavigate()
    const { parcedToken } = useContext(AuthContext)
    const { collapsed, changeCollapsed } = useContext(AntdContext)
    const { colorBgContainer, colorBorder } = theme.useToken().token

    const logout = () => {
        localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY)
        navigate(MAIN_ROUTERS.auth)
    }

    return (
        <StyledHeader collapsed={collapsed ? 1 : undefined} colorbgcontainer={colorBgContainer} colorborder={colorBorder}>
            <Flex align='center' justify='space-between'>
                <Flex align='center'>
                    <StyledButton type='text' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={changeCollapsed} />

                    <StyledTitle>{title}</StyledTitle>
                </Flex>
                <Dropdown menu={{ items: itemsUser(logout), selectedKeys: [location.pathname] }} placement='bottom'>
                    <Flex style={{ cursor: 'pointer' }} align='center' gap={16}>
                        {parcedToken?.name}
                    </Flex>
                </Dropdown>
            </Flex>
        </StyledHeader>
    )
}

export const AppHeader = memo(AppHeaderComponent)
