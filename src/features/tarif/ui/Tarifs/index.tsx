import { FC, useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Card, Flex, theme, Typography } from 'antd'
import { CheckCircleOutlined, FormOutlined } from '@ant-design/icons'
import { ModalTarif, tFormCreateTarif, useChangeStatusTarif, useCreateTarif, useEditTarif, useGetTarifs } from '~/features/tarif'
import { AuthContext } from '~/app/providers/auth-provider'
import { LayoutContent } from '~/shared/ui/layout-content'

export const EDIT_TARIFF = 'edit'
export const CREATE_TARIFF = 'create'

export const Tarifs: FC = () => {
    const { token, parcedToken } = useContext(AuthContext)
    const { colorPrimary } = theme.useToken().token
    const [currentTarif, setCurrentTarif] = useState<boolean>(false)
    const methods = useForm<tFormCreateTarif>({
        defaultValues: {
            name: '',
            maxUsers: 1,
            price: null,
            itemSelect: '',
            permissions: [],
            id: '',
        },
    })
    const { data, isLoading } = useGetTarifs(token)

    const showModal = (type: string, data?) => {
        if (type === CREATE_TARIFF) {
            methods.reset({
                name: '',
                maxUsers: 1,
                price: null,
                itemSelect: '',
                permissions: [],
                id: '',
            })
        } else if (type === EDIT_TARIFF) {
            methods.setValue('id', data.id)
            methods.setValue('name', data.name)
            methods.setValue('price', data.price)
            methods.setValue('maxUsers', data.maxUsers)
            methods.setValue('itemSelect', data.itemSelect)
            methods.setValue('permissions', data.permissions)
        }
        setCurrentTarif(true)
    }
    const hideModal = () => setCurrentTarif(false)

    const { mutate, isLoading: isLoadingCreateTarfif } = useCreateTarif(hideModal)
    const { mutate: editTarif, isLoading: isLoadingEdit } = useEditTarif(token, hideModal)
    const { mutate: changeStatus, isLoading: isLoadingChangeStatus } = useChangeStatusTarif(token)

    const changeTariffStatus = (tariffId: string, status: boolean) => {
        changeStatus({ tariffId, status })
    }

    const submit = (data: tFormCreateTarif, type: string) => {
        const { name, maxUsers, price, permissions } = data

        if (type === CREATE_TARIFF) {
            mutate({ price, maxUsers, name, token, permissions: permissions.map(item => item.label) })
        } else if (type === EDIT_TARIFF) {
            editTarif({ price, organizationId: parcedToken.organizationId })
        }
    }

    return (
        <FormProvider {...methods}>
            {currentTarif && <ModalTarif isLoadingCreateTarfif={isLoadingCreateTarfif} submit={submit} hideModal={hideModal} />}
            <LayoutContent>
                <Flex justify='flex-end'>
                    <Button onClick={() => showModal(CREATE_TARIFF)} type='primary' size='large'>
                        Создать
                    </Button>
                </Flex>
            </LayoutContent>

            <LayoutContent>
                {data?.map((item, index) => (
                    <Card
                        key={item.id}
                        style={index === 0 ? {} : { marginTop: '20px' }}
                        loading={isLoading}
                        title={
                            <Flex align='center' justify='space-between'>
                                <Typography.Title level={3}>{item.name}</Typography.Title>

                                <Flex gap={10}>
                                    <Button
                                        type='primary'
                                        danger={!item.isActive}
                                        onClick={() => changeTariffStatus(item.id, item.isActive)}>
                                        {item.isActive ? 'Заблокировать' : 'Разблокировать'}
                                    </Button>

                                    <Button onClick={() => showModal(EDIT_TARIFF, item)} icon={<FormOutlined style={{ fontSize: 20 }} />}>
                                        Изменить
                                    </Button>
                                </Flex>
                            </Flex>
                        }>
                        <Typography.Title level={5}>{item.price} KGS/месяц</Typography.Title>
                        <Flex vertical gap={12} style={{ marginTop: '8px' }}>
                            <Flex gap={8} align='center'>
                                <CheckCircleOutlined style={{ fontSize: '23px', color: colorPrimary }} />
                                <Typography.Text>До {item.maxUsers} пользователей</Typography.Text>
                            </Flex>
                        </Flex>

                        {item?.permissions.map((i, index) => (
                            <Flex vertical gap={12} style={{ marginTop: '8px' }} key={i + index}>
                                <Flex gap={8} align='center'>
                                    <CheckCircleOutlined style={{ fontSize: '23px', color: colorPrimary }} />
                                    <Typography.Text>{i}</Typography.Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Card>
                ))}
            </LayoutContent>
        </FormProvider>
    )
}
