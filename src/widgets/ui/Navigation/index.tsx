import { FC, memo, useContext } from 'react'
import { theme } from 'antd'
import { StyledSider, StyledMenu, StyledLink, StyledDiv } from './styles.ts'
import { IProps } from './types.ts'
import { MAIN_ROUTERS } from '~/shared/lib'
import { menuItems } from '~/widgets/ui/Navigation/consts.tsx'
import { useLocation } from 'react-router-dom'
import { AntdContext } from '~/app/providers/antd-provider'

const NavigationComponent: FC<IProps> = () => {
    const { collapsed } = useContext(AntdContext)
    const {
        token: { colorBgContainer, colorBorder },
    } = theme.useToken()

    const { pathname } = useLocation()

    return (
        <StyledSider trigger={null} collapsible collapsed={collapsed}>
            <StyledDiv colorbgcontainer={colorBgContainer} colorborder={colorBorder} collapsed={collapsed ? 1 : 0}>
                <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                    <StyledLink to={MAIN_ROUTERS.tarif}>
                        {collapsed ? <img src='/logo-small.svg' alt='logo' /> : <img src='/logo.svg' alt='logo' />}
                    </StyledLink>
                    <StyledMenu mode='inline' items={menuItems} selectedKeys={[pathname]} />
                </div>
            </StyledDiv>
        </StyledSider>
    )
}

export const Navigation = memo(NavigationComponent)
