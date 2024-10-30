import { api } from '~/shared/hooks'
import { ITarif } from '~/features/tarif'

class ApiTarif {
    async getTarifs(token: string): Promise<ITarif[]> {
        try {
            const { data } = await api({ url: '/users/admin/tariff/all', headers: { Authorization: `Bearer ${token}` } })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async createTarif(token: string, name: string, price: number, maxUsers: number, permissions: string[]): Promise<number> {
        try {
            const { status } = await api({
                url: '/users/admin/tariff',
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    name,
                    price,
                    maxUsers,
                    permissions,
                },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }

    async editTarif(token: string, price: number, organizationId: string): Promise<number> {
        try {
            const { status } = await api({
                url: '/users/admin/tariff/change-price',
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    organizationId,
                    price,
                },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }

    async changeStatusTarif(token: string, tariffId: string, status: boolean): Promise<number> {
        try {
            const res = await api({
                url: `/users/admin/tariff/${tariffId}`,
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    lock: !status,
                },
            })
            return res.status
        } catch (e) {
            console.log(e)
        }
    }
}

export const apiTarif = new ApiTarif()
