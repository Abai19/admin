import { FC, useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Flex, Input, Table } from 'antd'
import { AuthContext } from '~/app/providers/auth-provider'
import { useGetReportList } from '~/features/report/queries'
import { LayoutContent } from '~/shared/ui/layout-content'
import { getColumns, SELECT_OPTION, SORT_OPTIONS } from './const'
import { StyledSelect } from './styles'
import { tFormReport } from './types'

export const ReportList: FC = () => {
    const { control, watch: watchSearch } = useForm<tFormReport>({
        defaultValues: {
            organizationName: '',
            tariffSortFields: SELECT_OPTION[0].value,
            direction: SORT_OPTIONS[0].value,
        },
    })
    const organizationName = watchSearch('organizationName').trim()
    const tariffSortFields = watchSearch('tariffSortFields')
    const direction = watchSearch('direction')

    const { token } = useContext(AuthContext)
    const { mutate, data } = useGetReportList(token)

    useEffect(() => {
        if (token && direction && tariffSortFields) {
            mutate({ direction, tariffSortFields, organizationName })
        }
    }, [token, direction, tariffSortFields, organizationName])

    return (
        <>
            <LayoutContent>
                <Flex gap={20}>
                    <Controller
                        control={control}
                        name='organizationName'
                        render={({ field }) => <Input.Search {...field} size='large' placeholder='Введите название организации' />}
                    />
                </Flex>
                <Flex gap={20}>
                    <Controller
                        control={control}
                        name='tariffSortFields'
                        render={({ field }) => <StyledSelect {...field} options={SELECT_OPTION} placeholder='Поиск по' />}
                    />
                    <Controller
                        control={control}
                        name='direction'
                        render={({ field }) => <StyledSelect {...field} options={SORT_OPTIONS} placeholder='По убыванию' />}
                    />
                </Flex>
            </LayoutContent>
            <LayoutContent>
                <Table dataSource={data?.content || []} rowKey='organizationId' columns={getColumns} />
            </LayoutContent>
        </>
    )
}
