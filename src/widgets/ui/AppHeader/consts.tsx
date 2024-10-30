import { LogoutOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

export const itemsUser = (logout: () => void): MenuProps['items'] => [
    {
        label: 'Выйти',
        key: 'logout',
        icon: <LogoutOutlined />,
        title: 'Выйти',
        onClick: logout,
    },
]
