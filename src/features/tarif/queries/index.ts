import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiTarif } from '~/features/tarif'
import { notification } from 'antd'

export const useGetTarifs = (token: string) => {
    return useQuery(
        ['tarifs'],
        () => {
            return apiTarif.getTarifs(token)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
            enabled: !!token.length,
        },
    )
}

export const useCreateTarif = (hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({
            token,
            name,
            price,
            maxUsers,
            permissions,
        }: {
            token: string
            name: string
            price: number
            maxUsers: number
            permissions: string[]
        }) => {
            return apiTarif.createTarif(token, name, price, maxUsers, permissions)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    hideModal()
                    queryClient.invalidateQueries('tarifs')
                    return notification.success({ message: 'Тариф успешно создан' })
                }
                return notification.warning({ message: 'Не удалось создать тариф' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useEditTarif = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ price, organizationId }: { price: number; organizationId: string }) => {
            return apiTarif.editTarif(token, price, organizationId)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    hideModal()
                    queryClient.invalidateQueries('tarifs')
                    return notification.success({ message: 'Успешно изменен' })
                }
                return notification.warning({ message: 'Не удалось изменить' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useChangeStatusTarif = (token: string) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ tariffId, status }: { tariffId: string; status: boolean }) => {
            return apiTarif.changeStatusTarif(token, tariffId, status)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    queryClient.invalidateQueries('tarifs')
                    return notification.success({ message: 'Статус тарифа изменен' })
                }

                return notification.warning({ message: 'Не удалось изменить статус' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}
