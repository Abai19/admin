import { FC, useContext, useState } from 'react'
import { LayoutContent } from '~/shared/ui/layout-content'
import { Button, DatePicker, Flex, Table } from 'antd'
import { getColumns } from './consts.tsx'
import { useGetNotify } from '../../queries/index.ts'
import { AuthContext } from '~/app/providers/auth-provider/index.tsx'
import { ModalMailing } from '../ModalMailing/index.tsx'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { tFormMailing } from './types.ts'
import dayjs, { Dayjs } from 'dayjs'

export const MailingsList: FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [pagination, setPagination] = useState({ page: 1, pageSize: 15 })

    const methods = useForm<tFormMailing>({
        defaultValues: {
            title: '',
            body: '',
            userEmail: null,
            organizationId: null,
            role: null,
            titleSelect: '',
            bodySelect: '',
            date: [dayjs().startOf('month'), dayjs().endOf('month')],
        },
    })
    const columns = getColumns()

    const { token } = useContext(AuthContext)
    console.log(methods.watch('date'))
    const { data } = useGetNotify(
        token,
        pagination.page - 1,
        pagination.pageSize,
        methods.watch('date')[0] ? dayjs(methods.watch('date')[0]).format('YYYY-MM-DD HH:mm:ss.SSSSSS') : null,
        methods.watch('date')[1] ? dayjs(methods.watch('date')[1]).format('YYYY-MM-DD HH:mm:ss.SSSSSS') : null,
    )

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPagination({ page, pageSize })
    }

    const changeDate = (value: Dayjs[]) => {
        if (value) {
            return methods.setValue('date', value)
        }
        methods.setValue('date', [])
    }

    const hideModal = () => setIsOpenModal(false)
    const showModal = (isCreate?: boolean) => {
        if (isCreate) {
            methods.reset({
                title: '',
                body: '',
                userEmail: null,
                organizationId: null,
                role: null,
                date: [dayjs().startOf('month'), dayjs().endOf('month')],
            })
        }
        setIsOpenModal(true)
    }

    return (
        <FormProvider {...methods}>
            {isOpenModal && <ModalMailing hideModal={hideModal} />}
            <LayoutContent>
                <Flex justify='flex-end' gap={20}>
                    <Controller
                        control={methods.control}
                        render={({ field }) => (
                            <DatePicker.RangePicker
                                {...field}
                                allowClear
                                value={[
                                    methods.watch('date')[0] ? dayjs(methods.watch('date')[0]) : null,
                                    methods.watch('date')[1] ? dayjs(methods.watch('date')[1]) : null,
                                ]}
                                onChange={changeDate}
                                size='middle'
                            />
                        )}
                        name='date'
                    />
                    <Button type='primary' size='large' onClick={() => showModal(true)}>
                        Создать
                    </Button>
                </Flex>
            </LayoutContent>

            <LayoutContent>
                <Table
                    dataSource={data?.content || []}
                    columns={columns}
                    rowKey={'createdAt'}
                    pagination={{
                        total: data?.totalElements || 0,
                        pageSize: pagination.pageSize,
                        showSizeChanger: true,
                        onChange: handlePaginationChange,
                        onShowSizeChange: handlePaginationChange,
                    }}
                />
            </LayoutContent>
        </FormProvider>
    )
}
