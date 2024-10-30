import { api } from '~/shared/hooks'
import { IDealer } from '~/features/dealers'

class ApiDealer {
    async getAllDealers(token: string, searchParam?: string): Promise<IDealer[]> {
        try {
            const { data } = await api({
                url: '/users/admin/dealers',
                headers: { Authorization: 'Bearer ' + token },
                params: { searchParam: searchParam },
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

    async createDealer(token: string, name: string, phone: string, email: string): Promise<number> {
        try {
            const { status } = await api({
                url: '/users/admin/dealer',
                method: 'POST',
                data: {
                    phone,
                    position: 'MANAGER',
                    id: null,
                    status: true,
                    email: email?.trim(),
                    name: name?.trim(),
                },
                headers: { Authorization: 'Bearer ' + token },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }

    async editDealer(token: string, name: string, position: string, email: string, phone: string, dealerId: string): Promise<number> {
        try {
            const { status } = await api({
                url: '/users/admin/dealer',
                method: 'PATCH',
                data: {
                    phone,
                    position: position.toString(),
                    id: null,
                    status: true,
                    email: email?.trim(),
                    name: name?.trim(),
                },
                params: { dealerId },
                headers: { Authorization: 'Bearer ' + token },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }
}

export const apiDealers = new ApiDealer()
