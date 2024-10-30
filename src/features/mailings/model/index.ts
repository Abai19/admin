export interface ICompanies {
    companyName: string
    activityType: string
    address: string
    balance: number
    createdAt: string
    createdOn: number
    id: string
    ndsPayer: boolean
    saleAddress: string
    subjectForm: string
    taxForm: string
    telephone: string
    ugns: string
    updatedOn: number
}

export interface INotifications {
    content: {
        companyId: {
            company: ICompanies
            createdAt: string
            id: string
            role: string | null
        }
    }[]
    pageable: {
        pageNumber: number
        pageSize: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        paged: boolean
        unpaged: boolean
    }
    number: number
    size: number
    totalPages: number
    totalElements: number
}
