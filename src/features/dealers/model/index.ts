export interface IDealer {
    id: string
    name: string
    position: string
    phone: string
    email: string
    status: boolean
    companyList: IDealerInner[]
}
export interface IDealerInner {
    id: string
    companyName: string
    address: string
    telephone: string
    createdOn: string
}
