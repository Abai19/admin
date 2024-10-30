import { NavLink } from 'react-router-dom'
import { AppstoreOutlined, BellOutlined, CopyOutlined, PicLeftOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { MAIN_ROUTERS } from '~/shared/lib'
import { MenuProps } from 'antd'

export const menuItems: MenuProps['items'] = [
    {
        key: MAIN_ROUTERS.tarif,
        title: 'Тариф',
        icon: <AppstoreOutlined />,
        label: <NavLink to={MAIN_ROUTERS.tarif}>Тариф</NavLink>,
    },
    {
        key: MAIN_ROUTERS.mailings,
        title: 'Рассылки',
        icon: <BellOutlined />,
        label: <NavLink to={MAIN_ROUTERS.mailings}>Рассылки</NavLink>,
    },
    {
        key: MAIN_ROUTERS.dealers,
        title: 'Диллеры',
        icon: <UserSwitchOutlined />,
        label: <NavLink to={MAIN_ROUTERS.dealers}>Диллеры</NavLink>,
    },
    {
        key: MAIN_ROUTERS.report,
        title: 'Отчеты',
        icon: <PicLeftOutlined />,
        label: <NavLink to={MAIN_ROUTERS.report}>Отчеты</NavLink>,
    },
    {
        key: MAIN_ROUTERS.template,
        title: 'Шаблоны',
        icon: <CopyOutlined />,
        label: <NavLink to={MAIN_ROUTERS.template}>Шаблоны</NavLink>,
    },
]
