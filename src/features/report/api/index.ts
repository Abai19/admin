import { api } from '~/shared/hooks'
import { IReport } from '../model'

class ApiReport {
    async getAllReport(token: string, direction: string, tariffSortFields: string, organizationName: string) {
        try {
            const { data } = await api({
                url: '/users/admin/tariff-report',
                headers: { Authorization: 'Bearer ' + token },
                params: { direction, tariffSortFields, organizationName: organizationName ? organizationName : null },
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async deleteDealers(token: string, dealerId: string, statusDealer: boolean): Promise<number> {
        try {
            const { status } = await api({
                url: `/users/admin/dealer/${dealerId}`,
                method: 'PATCH',
                params: { dealerId, status: statusDealer },
                headers: { Authorization: 'Bearer ' + token },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }
}

export const apiReport = new ApiReport()
