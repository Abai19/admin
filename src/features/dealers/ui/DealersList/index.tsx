import { FC, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Flex, Input, Table } from 'antd'
import { IDealer, useDealersList, useDeleteDealer, useSearchDealer } from '~/features/dealers'
import { AuthContext } from '~/app/providers/auth-provider'
import { LayoutContent } from '~/shared/ui/layout-content'
import { ModalDealer } from '../ModalDealer'
import { getColumns, getColumnsInner } from './consts.tsx'
import { tFormDealer } from './types.ts'

const CREATE = 'create'

export const DealersList: FC = () => {
    const methods = useForm<tFormDealer>({
        defaultValues: {
            email: '',
            phone: '',
            name: '',
        },
    })
    const { token } = useContext(AuthContext)
    const { data: dealerList, isLoading: isLoadingGetDealer } = useDealersList(token)
    const { mutate: searchDealer, data: searchResult, isLoading: isLoadingSearchDealer } = useSearchDealer(token)
    const { mutate, isLoading } = useDeleteDealer(token)

    const [data, setData] = useState([])
    const [isModal, setIsModal] = useState<boolean>(false)

    const showModal = (type?: string) => {
        if (type) {
            methods.reset({
                email: '',
                phone: '',
                name: '',
            })
        }
        setIsModal(true)
    }
    const hideModal = () => setIsModal(false)

    const handleChange = (e: any) => {
        searchDealer({ searchParam: e.target.value })
    }

    const columns = getColumns(isLoading, methods, showModal, mutate)

    const expandedRowRender = (record: IDealer) => {
        const columnsInner = getColumnsInner()
        return <Table rowKey='id' columns={columnsInner} dataSource={record.companyList} pagination={false} />
    }

    useEffect(() => {
        if (dealerList && dealerList.length) {
            setData(dealerList)
        }
    }, [dealerList])

    useEffect(() => {
        if (searchResult && searchResult.length) {
            setData(searchResult)
        }
    }, [searchResult])

    return (
        <FormProvider {...methods}>
            {isModal && <ModalDealer hideModal={hideModal} />}
            <LayoutContent>
                <Flex gap={20}>
                    <Input.Search onChange={handleChange} placeholder='Поиск по email, имя, номер, телефона' size='large' />

                    <Button onClick={() => showModal(CREATE)} type='primary' size='large'>
                        Создать
                    </Button>
                </Flex>
            </LayoutContent>

            <LayoutContent>
                <Table
                    rowKey='id'
                    loading={isLoadingSearchDealer || isLoadingGetDealer}
                    dataSource={data || []}
                    columns={columns}
                    expandable={{ expandedRowRender }}
                />
            </LayoutContent>
        </FormProvider>
    )
}
