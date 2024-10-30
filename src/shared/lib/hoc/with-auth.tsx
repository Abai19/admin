import { FC, memo, useEffect } from 'react'
import { Loader } from '~/shared/ui/spinner'
import { BaseLayout } from '~/widgets/ui'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTERS } from '~/shared/lib'

export const withAuth = <P extends JSX.IntrinsicAttributes = {}>(Component: FC<P>) =>
    memo((props: P) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || ''
        const navigate = useNavigate()

        useEffect(() => {
            if (!token.length) {
                localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY)
                navigate(MAIN_ROUTERS.auth)
            }
        }, [])

        return <BaseLayout>{token.length ? <Component {...props} /> : <Loader type='container' />}</BaseLayout>
    })
