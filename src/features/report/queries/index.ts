import { notification } from 'antd'
import { useMutation } from 'react-query'
import { apiReport } from '../api'
import { tFormReport } from '~/features/report/ui/types.ts'

export const useGetReportList = (token: string) => {
    return useMutation(
        ({ direction, tariffSortFields, organizationName }: tFormReport) => {
            return apiReport.getAllReport(token, direction, tariffSortFields, organizationName)
        },
        {
            onError: () => {
                notification.error({ message: 'Ошибка в сервере' })
            },
        },
    )
}
