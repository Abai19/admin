import { Button, Card, Flex, Modal, Typography } from 'antd'
import { FC, useContext, useState } from 'react'
import { LayoutContent } from '~/shared/ui/layout-content'
import { ModalTemplate } from '../ModalTemplate'
import { FormProvider, useForm } from 'react-hook-form'
import { tFormTemplate } from './types'
import { useDeleteTemplate, useGetTemplatesAll } from '../../queries/indes'
import { AuthContext } from '~/app/providers/auth-provider'
import { ExclamationCircleFilled, FormOutlined } from '@ant-design/icons'

const Template: FC = () => {
    const [isShowModal, setIsShowModal] = useState(false)

    const methods = useForm<tFormTemplate>({
        defaultValues: {
            title: '',
            body: '',
            id: '',
        },
    })
    const showModal = (data?) => {
        if (data.title) {
            methods.setValue('title', data.title)
            methods.setValue('body', data.body)
            methods.setValue('id', data.id)
        } else {
            methods.reset({
                title: '',
                body: '',
                id: '',
            })
        }
        setIsShowModal(true)
    }
    const hideModal = () => setIsShowModal(false)

    const { token } = useContext(AuthContext)
    const { data, isLoading } = useGetTemplatesAll(token)
    const { mutate, isLoading: deleteLoading } = useDeleteTemplate(token, hideModal)

    const { confirm } = Modal

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Вы уверены что хотите удалить?',
            icon: <ExclamationCircleFilled />,
            okText: 'Удалить',
            cancelText: 'Отменить',
            okType: 'danger',
            onOk() {
                mutate({ id })
            },
            onCancel() {
                hideModal()
            },
        })
    }

    return (
        <FormProvider {...methods}>
            {isShowModal && <ModalTemplate hideModal={hideModal} />}

            <LayoutContent>
                <Flex justify='flex-end'>
                    <Button onClick={showModal} type='primary' size='large'>
                        Создать
                    </Button>
                </Flex>
            </LayoutContent>

            <LayoutContent>
                {data &&
                    data.map((item, index) => (
                        <Card
                            key={item.id}
                            style={index === 0 ? {} : { marginTop: '20px' }}
                            loading={isLoading}
                            title={
                                <Flex align='center' justify='space-between'>
                                    <Typography.Title level={3}>{item.title}</Typography.Title>
                                    <Flex gap={10}>
                                        <Button loading={deleteLoading} type='primary' danger onClick={() => showDeleteConfirm(item.id)}>
                                            Удалить
                                        </Button>
                                        <Button onClick={() => showModal(item)} icon={<FormOutlined style={{ fontSize: 20 }} />}>
                                            Изменить
                                        </Button>
                                    </Flex>
                                </Flex>
                            }>
                            <Flex vertical gap={12} style={{ marginTop: '8px' }}>
                                <Flex gap={8} align='center'>
                                    <Typography.Text>{item.body}</Typography.Text>
                                </Flex>
                            </Flex>

                            {/* {item?.permissions.map((i, index) => (
                            <Flex vertical gap={12} style={{ marginTop: '8px' }} key={i + index}>
                                <Flex gap={8} align='center'>
                                    <CheckCircleOutlined style={{ fontSize: '23px', color: colorPrimary }} />
                                    <Typography.Text>{i}</Typography.Text>
                                </Flex>
                            </Flex>
                        ))} */}
                        </Card>
                    ))}
            </LayoutContent>
        </FormProvider>
    )
}
export default Template
