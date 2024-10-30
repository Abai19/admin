import { FC, ReactNode } from 'react'
import { theme } from 'antd'

export const ErrorText: FC<{ children: ReactNode; align?: 'center' | 'right' | 'left' }> = ({ children, align = 'left' }) => {
    const { colorError } = theme.useToken().token

    return <div style={{ color: colorError, textAlign: align }}>{children}</div>
}
