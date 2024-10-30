import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { Flex, notification, Spin } from 'antd'
import { IAuthContext, IParcedToken } from './types.ts'
import { useCheckAuth, useGetTokenFromKeyClock, useLogin } from '~/app/providers/auth-provider/hooks.ts'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTERS } from '~/shared/lib'
import { parceTokenUtil } from '~/shared/utils'

export const AuthContext = createContext<Partial<IAuthContext>>({})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>(localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || '')
    const [parcedToken, setParcedToken] = useState<IParcedToken | undefined>()
    const [message, setMessage] = useState<string>('')

    const { data, isLoading: isLoadingKeyClock } = useGetTokenFromKeyClock()
    const { mutate, isLoading } = useLogin(setParcedToken, setMessage, setToken)

    const { mutateAsync: mutateCheckAuth, isLoading: isLoadingCheckAuth } = useCheckAuth()

    const login = async (email: string, password: string) => {
        if (data?.access_token) {
            return mutate({ email, password, tokenKeyClock: data.access_token })
        }
        notification.error({ message: 'Ошибка в сервере' })
    }

    const checkAuth = async () => {
        const tokenFromLocalStorage = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || ''

        if (!tokenFromLocalStorage.length) {
            return navigate(MAIN_ROUTERS.auth)
        }

        setToken(tokenFromLocalStorage)
        const payload: IParcedToken = parceTokenUtil(tokenFromLocalStorage)

        const isSuperAdmin = payload.realm_access.roles.some(item => item === 'SUPER_ADMIN')

        if (!isSuperAdmin) {
            return navigate(MAIN_ROUTERS.auth)
        }

        setParcedToken(payload)
        await mutateCheckAuth({ token: tokenFromLocalStorage })
    }

    useEffect(() => {
        checkAuth()
    }, [])

    if (isLoadingCheckAuth || isLoadingKeyClock) {
        return (
            <Flex justify='center' align='center' style={{ height: '100vh' }}>
                <Spin size='large' />
            </Flex>
        )
    }

    return <AuthContext.Provider value={{ token, parcedToken, message, isLoading, login }}>{children}</AuthContext.Provider>
}
