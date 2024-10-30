import styled from 'styled-components'
import { Button, Card, Layout, Typography } from 'antd'

export const StyledButton = styled(Button)`
    width: 100%;
`

export const StyledLayout = styled(Layout)`
    gap: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: calc(100vh - 63.94px);
`

export const StyledCard = styled(Card)`
    padding: 34px;
    width: 100%;
    height: 100%;
    max-height: 534px;
    max-width: 483px;
    border-radius: 13px;

    @media only screen and (max-width: 767px) {
        width: fit-content;
    }
`

export const StyledTitle = styled(Typography.Title)`
    text-align: center;
`

export const ImageBackground = styled.img`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 500px;

    @media (max-width: 1600px) {
        width: 300px;
    }
    @media (max-width: 768px) {
        width: 200px;
    }
`
