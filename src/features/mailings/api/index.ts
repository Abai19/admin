import { api } from '~/shared/hooks'
import { IDealer } from '~/features/dealers'
import { ICompanies, INotifications } from '../model'

class ApiNotify {
    async getAllCompanies(token: string, activityType: string[]): Promise<ICompanies[]> {
        try {
            const { data } = await api({
                url: '/users/admin/all-companies',
                headers: { Authorization: 'Bearer ' + token },
                params: { activityType },
            })
            return data?.map(item => ({ value: item.id, label: item.companyName }))
        } catch (e) {
            console.log(e)
        }
    }

    async getAllNotify(token: string, page: number, pageSize: number, dateFrom: string, dateTo: string): Promise<INotifications> {
        try {
            const { data } = await api({
                url: `/users/admin/notifications`,
                params: {
                    page,
                    pageSize,
                    dateFrom: dateFrom ? dateFrom : null,
                    dateTo: dateTo ? dateTo : null,
                },
                headers: { Authorization: 'Bearer ' + token },
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async createNotify(token: string, title: string, body: string, organizationId: string[]): Promise<number> {
        try {
            const { status } = await api({
                url: '/users/admin/create-notification',
                headers: { Authorization: 'Bearer ' + token },
                method: 'POST',
                data: {
                    title,
                    body,
                    organizationId,
                    userEmail: '',
                    role: 'ADMIN',
                },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }
}

export const apiNotify = new ApiNotify()
