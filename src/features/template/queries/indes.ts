import { notification } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiTemplate } from '../api'

export const useGetTemplatesAll = (token: string) => {
    return useQuery(
        ['template'],
        () => {
            return apiTemplate.getAllTemplate(token)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
            enabled: !!token.length,
        },
    )
}

export const useCreateTemplate = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ title, body }: { title: string; body: string }) => {
            return apiTemplate.createTemplate(token, title, body)
        },
        {
            onSuccess: status => {
                if (status === 200) {
                    hideModal()
                    queryClient.invalidateQueries('template')
                    notification.success({ message: 'Успешно создано' })
                }
            },
            onError: e => {
                notification.error({ message: `${e}` })
            },
        },
    )
}

export const useEditTemplate = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ title, body, id }: { title: string; body: string; id: string }) => {
            return apiTemplate.editTemplate(token, id, title, body)
        },
        {
            onSuccess: () => {
                hideModal()
                queryClient.invalidateQueries('template')
                notification.success({ message: 'Успешно обновлено' })
            },
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}

export const useDeleteTemplate = (token: string, hideModal: () => void) => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ id }: { id: string }) => {
            return apiTemplate.deleteTemplateById(token, id)
        },
        {
            onSuccess: () => {
                hideModal()
                queryClient.invalidateQueries('template')
            },
            onError: e => {
                notification.error({ message: `${e}` })
            },
        },
    )
}
