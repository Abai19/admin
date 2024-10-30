import { ColumnsType } from 'antd/es/table'
import { IReport } from '~/features/report'

export const SELECT_OPTION = [
    {
        value: 'EXPIRE_DATE',
        label: 'По дате',
    },
    {
        value: 'NAME',
        label: 'По организации',
    },
    {
        value: 'BALANCE',
        label: 'По балансу',
    },
    {
        value: 'TARIFF_SUM',
        label: 'По сумме тарифа',
    },
]

export const SORT_OPTIONS = [
    {
        label: 'По убыванию',
        value: 'ASC',
    },
    {
        label: 'По возрастанию',
        value: 'DESC',
    },
]

export const getColumns: ColumnsType<IReport> = [
    {
        title: 'Дата',
        key: 'expireDate',
        dataIndex: 'expireDate',
    },
    {
        title: 'Организация',
        key: 'organizationName',
        dataIndex: 'organizationName',
    },
    {
        title: 'Общая сумма тарифа',
        key: 'tariffSum',
        dataIndex: 'tariffSum',
    },
    {
        title: 'Баланс',
        key: 'balance',
        dataIndex: 'balance',
    },
    {
        title: 'Дебит',
        key: 'debit',
        dataIndex: 'debit',
    },
    {
        title: 'Кредит',
        key: 'credit',
        dataIndex: 'credit',
    },
    {
        title: 'Остаток',
        key: 'postBalance',
        dataIndex: 'postBalance',
    },
    // {
    //     title: 'Действие',
    //     key: 'action',
    //     align: 'center',
    //     dataIndex: 'action',
    //     render: (_, record: IDealer) => {
    //         const changeStatus = () => mutate({dealerId: record.id, status: !record.status});

    //         return (
    //             <Flex justify='space-between'>
    //                 <Button title='Изменить'>
    //                     <FormOutlined />
    //                 </Button>

    //                 <Button danger={!record.status} type='primary' title='Удалить' loading={isLoading} onClick={changeStatus}>
    //                     {record.status ? 'Заблокировать' : 'Разблокировать'}
    //                 </Button>
    //             </Flex>
    //         );
    //     },
    // },
]
