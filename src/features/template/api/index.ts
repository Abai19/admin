import { api } from '~/shared/hooks'
import { ITemplate } from '../model'

class ApiTemplate {
    async getAllTemplate(token: string): Promise<ITemplate[]> {
        try {
            const { data } = await api({ url: '/users/admin/all-templates', headers: { Authorization: 'Bearer ' + token } })
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async createTemplate(token: string, title: string, body: string): Promise<number> {
        try {
            const { status } = await api({
                url: `/users/admin/notification-template`,
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token },
                data: {
                    title,
                    body,
                },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }

    async editTemplate(token: string, id: string, title: string, body: string): Promise<number> {
        try {
            const { status } = await api({
                url: `/users/admin/notification-template`,
                method: 'PUT',
                headers: { Authorization: 'Bearer ' + token },
                data: { id, title, body },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }

    async deleteTemplateById(token: string, notificationTemplateId: string): Promise<number> {
        try {
            const { status } = await api({
                url: `/users/admin/notification-template`,
                method: 'DELETE',
                params: { notificationTemplateId },
                headers: { Authorization: 'Bearer ' + token },
            })
            return status
        } catch (e) {
            console.log(e)
        }
    }
}

export const apiTemplate = new ApiTemplate()
