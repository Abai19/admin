import styled from 'styled-components'
import { Layout } from 'antd'

export const StyledContainer = styled(Layout)<{ colorbgcontainer: string; colorborder: string }>`
    border-radius: 8px;
    background-color: ${props => props.colorbgcontainer};
    margin: 24px 24px 0 24px;
    padding: 24px;
    flex: none;
    border: ${props => `1px solid ${props.colorborder}`};

    @media (max-width: 1300px) {
        margin: 12px 12px 0 12px;
    }
`
