import { useMutation, useQuery } from 'react-query'
import { api } from '~/shared/hooks'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ILoginToken, IParcedToken, IResTokenKeyClock } from './types.ts'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTERS } from '~/shared/lib'
import { parceTokenUtil } from '~/shared/utils'

export const useGetTokenFromKeyClock = () => {
    return useQuery<IResTokenKeyClock>('token-from-key-clock', async () => {
        try {
            const { data } = await axios({
                url: import.meta.env.VITE_BASE_URL_AUTH + '/realms/bsmart/protocol/openid-connect/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: {
                    client_secret: import.meta.env.VITE_CLIENT_SECRET,
                    client_id: 'bsmart-rest-api',
                    grant_type: 'client_credentials',
                },
            })
            return data
        } catch (e) {
            console.log(e)
        }
    })
}

export const useLogin = (
    setParcedToken: Dispatch<SetStateAction<IParcedToken | undefined>>,
    setMessage: Dispatch<SetStateAction<string>>,
    setToken: Dispatch<SetStateAction<string>>,
) => {
    const navigate = useNavigate()

    return useMutation<AxiosResponse<ILoginToken>, AxiosError, { email: string; password: string; tokenKeyClock: string }>(
        async ({ email, password, tokenKeyClock }) => {
            try {
                return await api({
                    url: '/users/auth',
                    method: 'POST',
                    data: { email, password },
                    headers: { Authorization: `Bearer ${tokenKeyClock}` },
                })
            } catch (e) {
                console.error(e)
                throw new Error(e)
            }
        },
        {
            onSuccess: ({ status, data }) => {
                if (status === 200) {
                    const payload: IParcedToken = parceTokenUtil(data.access_token)

                    const isSuperAdmin = payload.role === 'SUPER_ADMIN';

                    if (!isSuperAdmin) {
                        return setMessage('Недостаточно прав, обратитесь к администратору!')
                    }

                    setToken(data.access_token)
                    setParcedToken(payload)
                    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.access_token)
                    return navigate(MAIN_ROUTERS.tarif)
                }

                setMessage('Неправильный логин или пароль')
            },
            onError: () => {
                setMessage('Ошибка в сервере')
            },
        },
    )
}

export const useCheckAuth = () => {
    return useMutation<void, AxiosError, { token: string }>(async ({ token }) => {
        try {
            await api({
                url: '/users/session',
                headers: { Authorization: `Bearer ${token}` },
            })
        } catch (e) {
            console.error(e)
        }
    })
}
