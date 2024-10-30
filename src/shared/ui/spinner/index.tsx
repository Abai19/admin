import { FC } from 'react'
import { Flex, Spin } from 'antd'
import { ISpinner } from './types.ts'
import { StyledLoaderContainerAbsolut } from './styles.ts'
import { LayoutContent } from '../layout-content'

export const Loader: FC<ISpinner> = ({ type = 'default' }) => {
    if (type === 'absolute') {
        return (
            <StyledLoaderContainerAbsolut>
                <Spin />
            </StyledLoaderContainerAbsolut>
        )
    }

    if (type === 'container') {
        return (
            <LayoutContent>
                <Flex justify='center'>
                    <Spin />
                </Flex>
            </LayoutContent>
        )
    }

    return (
        <Flex justify='center'>
            <Spin />
        </Flex>
    )
}
