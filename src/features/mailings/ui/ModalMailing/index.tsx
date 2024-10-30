import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Button, Divider, Form, Input, InputRef, Modal, Select, Space } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorText } from '~/shared/ui/error-text'
import { AuthContext } from '~/app/providers/auth-provider'
import { useCreateTemplate, useGetTemplatesAll } from '~/features/template/queries/indes'
import { PlusOutlined } from '@ant-design/icons'
import { activityTypeOption } from './const'
import { tFormMailing } from '../MailingsList/types.ts'
import { useCreateNotify, useGetAllCompanies } from '~/features/mailings/queries'

interface IProps {
    hideModal: () => void
}

export const ModalMailing: FC<IProps> = ({ hideModal }) => {
    const { token } = useContext(AuthContext)
    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useFormContext<tFormMailing>()
    const { mutate: getCompanies, data: companiesData } = useGetAllCompanies(token)
    const { data: templatesData } = useGetTemplatesAll(token)
    const { isLoading, mutate } = useCreateNotify(token, hideModal)
    const { mutate: createTemplate } = useCreateTemplate(token, hideModal)

    const [options, setOptions] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [isCreateTemplate, setIsCreateTemplate] = useState(false)
    const inputRef = useRef<InputRef>(null)

    const addTitle = () => {
        setValue('title', getValues('titleSelect'))
        setIsCreateTemplate(true)
    }

    const addBody = () => {
        setValue('body', getValues('bodySelect'))
    }

    const handleInputChange = event => {
        const newValue = event.target.value

        if (newValue) {
            setValue('body', newValue)
        } else {
            setValue('body', '')
            setIsEditing(false)
        }
    }

    const submitCreate = async (data: tFormMailing) => {
        if (companiesData && companiesData.length) {
            const form = {
                ...data,
                organizationId: [],
            }
            companiesData?.forEach((item: any) => {
                form.organizationId.push(item.value)
            })
            mutate(form)
        }
        if (isCreateTemplate) {
            createTemplate({ title: getValues('title'), body: getValues('body') })
        }
    }

    useEffect(() => {
        if (templatesData && templatesData.length) {
            setOptions(templatesData?.map(item => ({ label: item.body, value: item.id })))
        }
    }, [templatesData])

    useEffect(() => {
        if (getValues('organizationId')) {
            getCompanies(watch('organizationId'))
        }
    }, [watch('organizationId')])

    return (
        <Modal
            open
            cancelText='Отмена'
            onCancel={hideModal}
            okText={'Создать'}
            title={'Создание рассылки'}
            onOk={handleSubmit(submitCreate)}
            confirmLoading={isLoading}>
            <Form layout='vertical'>
                <Form.Item label='Заголовок' required>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onSelect={(_, item) => (setValue('title', item.label), setIsCreateTemplate)}
                                options={templatesData?.map(item => ({ label: item.title, value: item.id })) || []}
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Controller
                                                render={({ field: f }) => (
                                                    <Input
                                                        {...f}
                                                        placeholder='Добавить новый заголовок'
                                                        ref={inputRef}
                                                        onKeyDown={e => e.stopPropagation()}
                                                    />
                                                )}
                                                name='titleSelect'
                                            />
                                            <Button type='text' icon={<PlusOutlined />} onClick={addTitle}>
                                                Сохранить
                                            </Button>
                                        </Space>
                                    </>
                                )}
                            />
                        )}
                        name='title'
                    />
                    {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
                </Form.Item>
                <Form.Item label='Описание' required>
                    <Controller
                        control={control}
                        render={({ field }) =>
                            isEditing ? (
                                <Input
                                    allowClear
                                    {...field}
                                    maxLength={255}
                                    onChange={handleInputChange}
                                    onBlur={() => setIsEditing(false)}
                                    autoFocus
                                />
                            ) : (
                                <Select
                                    {...field}
                                    allowClear
                                    disabled={!watch('title')}
                                    onSelect={(_, item) => {
                                        setValue('body', item.label), setIsEditing(true)
                                    }}
                                    options={options}
                                    dropdownRender={menu => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Controller
                                                    render={({ field: f }) => (
                                                        <Input
                                                            {...f}
                                                            maxLength={255}
                                                            placeholder='Добавить новое описание'
                                                            ref={inputRef}
                                                            onKeyDown={e => e.stopPropagation()}
                                                        />
                                                    )}
                                                    name='bodySelect'
                                                />
                                                <Button type='text' icon={<PlusOutlined />} onClick={addBody}>
                                                    Сохранить
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                />
                            )
                        }
                        name='body'
                    />
                    {errors.body && <ErrorText>{errors.body.message}</ErrorText>}
                </Form.Item>

                <Form.Item label='Организация'>
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onSelect={(_, item) => {
                                    setValue('organizationId', item.value)
                                }}
                                allowClear
                                options={activityTypeOption || []}
                            />
                        )}
                        name='organizationId'
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
