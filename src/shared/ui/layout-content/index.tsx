import { CSSProperties, FC, ReactNode } from 'react'
import { StyledContainer } from './styles.ts'
import { theme } from 'antd'

export const LayoutContent: FC<{ children: ReactNode; styles?: CSSProperties }> = ({ children, styles }) => {
    const { token } = theme.useToken()

    return (
        <StyledContainer colorborder={token.colorBorder} colorbgcontainer={token.colorBgContainer} style={styles}>
            {children}
        </StyledContainer>
    )
}
