export interface IProps {
    hideModal: () => void
    isLoadingCreateTarfif: boolean
    submit: (data: tFormCreateTarif, type: string) => void
}

export type tFormCreateTarif = {
    name: string
    price: number
    maxUsers: number
    itemSelect: string
    permissions: Array<{ value: string; label: string }>
    id: string
}
