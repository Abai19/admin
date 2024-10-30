import { FC, useContext } from 'react'
import { IProps } from './types.ts'
import { StyledLayout } from './styles.ts'
import { Flex, Typography } from 'antd'
import { Navigation } from '~/widgets/ui'
import { AntdContext } from '~/app/providers/antd-provider'

export const BaseLayout: FC<IProps> = ({ children }) => {
    const { collapsed } = useContext(AntdContext)

    return (
        <>
            <Navigation collapsed={collapsed} />
            <StyledLayout collapsed={collapsed ? 1 : undefined}>
                {children}
                <Flex
                    justify='space-between'
                    align='center'
                    className='custom_container'
                    style={{ marginTop: 0, margin: '24px 24px 0 24px', padding: '24px' }}>
                    <Typography.Text>© ОсОО «Бизнес Смарт» 2024 Лицензия 196009-3301-ООО</Typography.Text>
                </Flex>
            </StyledLayout>
        </>
    )
}
