import { notification } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiNotify } from '../api'

export const useGetNotify = (token: string, page: number, pageSize: number, dateFrom: string, dateTo: string) => {
    return useQuery(
        ['notify', page, pageSize, dateFrom, dateTo],
        () => {
            return apiNotify.getAllNotify(token, page, pageSize, dateFrom, dateTo)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
            enabled: !!token.length,
        },
    )
}

export const useGetAllCompanies = (token: string) => {
    return useMutation(
        (activityType: string[]) => {
            return apiNotify.getAllCompanies(token, activityType)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useCreateNotify = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ title, body, organizationId }: { title: string; body: string; organizationId: string[] }) => {
            return apiNotify.createNotify(token, title, body, organizationId)
        },
        {
            onSuccess: (status: number) => {
                if (status === 200) {
                    queryClient.invalidateQueries('notify')
                    hideModal()
                    notification.success({ message: 'Успешно создано' })
                }
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}
