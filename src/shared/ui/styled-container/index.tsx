import { FC, ReactNode } from 'react'
import { Container } from './styled.ts'

export const StyledContainer: FC<{ children?: ReactNode }> = ({ children }) => {
    return <Container>{children}</Container>
}
