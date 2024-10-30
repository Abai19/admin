import { Dayjs } from 'dayjs'

export interface tFormMailing {
    title: string
    body: string
    organizationId: string[]
    role: string
    userEmail: string
    titleSelect: string
    bodySelect: string
    date: Dayjs[]
}
