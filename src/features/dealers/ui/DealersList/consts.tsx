import { Badge, Button, Dropdown, Flex, Space, TableColumnsType } from 'antd'
import { IDealer, IDealerInner } from '~/features/dealers'
import { FormOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export const getColumns = (
    isLoading: boolean,
    methods,
    showModal,
    mutate: (param: { dealerId: string; status: boolean }) => void,
): TableColumnsType<IDealer> => [
    {
        title: 'ФИО',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Должность',
        key: 'position',
        dataIndex: 'position',
    },
    {
        title: 'Номер телефона',
        key: 'phone',
        dataIndex: 'phone',
    },
    {
        title: 'E-mail',
        key: 'email',
        dataIndex: 'email',
    },
    {
        title: 'Действие',
        key: 'action',
        align: 'center',
        dataIndex: 'action',
        render: (_, record: IDealer) => {
            const changeStatus = () => mutate({ dealerId: record.id, status: !record.status })

            const editDealer = ({ email, phone, name, position, id }: IDealer) => {
                methods.setValue('email', email)
                methods.setValue('phone', phone)
                methods.setValue('name', name)
                methods.setValue('position', position)
                methods.setValue('id', id)
                showModal()
            }
            return (
                <Flex justify='space-between'>
                    <Button title='Изменить' onClick={() => editDealer(record)}>
                        <FormOutlined />
                    </Button>

                    <Button danger={!record.status} type='primary' title='Удалить' loading={isLoading} onClick={changeStatus}>
                        {record.status ? 'Заблокировать' : 'Разблокировать'}
                    </Button>
                </Flex>
            )
        },
    },
]

export const getColumnsInner = (): TableColumnsType<IDealerInner> => [
    { title: 'Компания', dataIndex: 'companyName', key: 'companyName' },
    { title: 'Телефон', dataIndex: 'telephone', key: 'telephone' },
    { title: 'Адресс', dataIndex: 'address', key: 'address' },
    {
        title: 'Дата',
        key: 'createdOn',
        render: record => <span>{dayjs.unix(record.createdOn).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
]
