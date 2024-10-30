import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiDealers } from '~/features/dealers'
import { notification } from 'antd'

export const useDealersList = (token: string) => {
    return useQuery(
        ['dealers'],
        () => {
            return apiDealers.getAllDealers(token)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
            enabled: !!token.length,
        },
    )
}

export const useSearchDealer = (token: string) => {
    return useMutation(
        ({ searchParam }: { searchParam: string }) => {
            return apiDealers.getAllDealers(token, searchParam)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useDeleteDealer = (token: string) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ dealerId, status }: { dealerId: string; status: boolean }) => {
            return apiDealers.deleteDealers(token, dealerId, status)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    queryClient.invalidateQueries('dealers')
                    return notification.success({ message: 'Статус диллера изменен' })
                }

                return notification.warning({ message: 'Не удалось изменить статус' })
            },
            onError: e => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useCreateDealer = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ name, phone, email }: { name: string; phone: string; email: string }) => {
            return apiDealers.createDealer(token, name, phone, email)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    hideModal()
                    queryClient.invalidateQueries('dealers')
                    return notification.success({ message: 'Диллер успешно создан' })
                }

                notification.warning({ message: 'Не удалось создать диллера' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useEditDealer = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ name, email, phone, position, id }: { name: string; position: string; email: string; phone: string; id: string }) => {
            return apiDealers.editDealer(token, name, position, email, phone, id)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    queryClient.invalidateQueries('dealers')
                    hideModal()
                    return notification.success({ message: 'Диллер успешно обновлен' })
                }

                notification.warning({ message: 'Не удалось создать диллера' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}
