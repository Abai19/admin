import { TableColumnsType, Tag } from 'antd'

const READED = 'READED'

export const getColumns = (): TableColumnsType => [
    {
        title: 'Статус',
        key: 'status',
        dataIndex: 'status',
        render: (_, record: any) =>
            record.status && (
                <Tag bordered={false} color={record.status === READED ? 'success' : 'error'}>
                    {record.status === READED ? 'Прочтено' : 'Не прочтено'}
                </Tag>
            ),
    },
    {
        title: 'Компания',
        key: 'company',
        dataIndex: 'company',
        render: (_, record: any) => <span>{record?.company?.companyName}</span>,
    },
    { title: 'Заголовок', key: 'title', dataIndex: 'title' },
    { title: 'Описание', key: 'body', dataIndex: 'body' },
    { title: 'Дата', key: 'createdAt', dataIndex: 'createdAt' },
]
