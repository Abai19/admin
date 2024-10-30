import { FC, useState, MouseEvent, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, Divider, Flex, Form, Input, InputNumber, InputRef, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { CREATE_TARIFF, EDIT_TARIFF } from '../Tarifs/index.tsx'
import { StyledContainer } from '~/shared/ui/styled-container'
import { rulesController } from '~/shared/data'
import { IProps, tFormCreateTarif } from './types.ts'
import { ErrorText } from '~/shared/ui/error-text'

export const ModalTarif: FC<IProps> = ({ hideModal, submit, isLoadingCreateTarfif }) => {
    const inputRef = useRef<InputRef>(null)
    const [items, setItems] = useState([])
    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
    } = useFormContext<tFormCreateTarif>()

    const addItem = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()

        if (getValues('itemSelect').length) {
            const id = Date.now().toString() + String(Math.random() * 9999)
            setItems([...items, { value: id, label: getValues('itemSelect') }])
            setValue('permissions', [...getValues('permissions'), { value: id, label: getValues('itemSelect') }])
            setValue('itemSelect', '')
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }

    const handleCreateSubmit = (data: tFormCreateTarif) => submit(data, CREATE_TARIFF)
    const handleEditSubmit = (data: tFormCreateTarif) => submit(data, EDIT_TARIFF)

    return (
        <Modal
            open
            title={watch('id') ? 'Изменение суммы тарифа' : 'Создание тарифа'}
            okText='Сохранить'
            cancelText='Отмена'
            onCancel={hideModal}
            onOk={watch('id') ? handleSubmit(handleEditSubmit) : handleSubmit(handleCreateSubmit)}
            confirmLoading={isLoadingCreateTarfif}>
            {!watch('id') ? (
                <Form layout='vertical'>
                    <Flex gap={20}>
                        <StyledContainer>
                            <Form.Item label='Название' required>
                                <Controller
                                    rules={rulesController()}
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                    name='name'
                                />
                                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                            </Form.Item>
                        </StyledContainer>

                        <StyledContainer>
                            <Form.Item label='Цена' required>
                                <Controller
                                    rules={rulesController()}
                                    control={control}
                                    render={({ field }) => <InputNumber {...field} type='number' min={0} className='w-100' />}
                                    name='price'
                                />
                                {errors.price && <ErrorText>{errors.price.message}</ErrorText>}
                            </Form.Item>
                        </StyledContainer>
                    </Flex>

                    <Form.Item label='Количество пользователей' required>
                        <Controller
                            rules={rulesController()}
                            control={control}
                            render={({ field }) => <InputNumber {...field} type='number' min={0} className='w-100' />}
                            name='maxUsers'
                        />
                        {errors.maxUsers && <ErrorText>{errors.maxUsers.message}</ErrorText>}
                    </Form.Item>

                    <Form.Item label='Разрешения' required>
                        <Controller
                            rules={rulesController()}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Select
                                        {...field}
                                        mode='multiple'
                                        notFoundContent='Нет данных'
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: f }) => (
                                                            <Input
                                                                {...f}
                                                                placeholder='Добавить новое разрешения'
                                                                ref={inputRef}
                                                                onKeyDown={e => e.stopPropagation()}
                                                            />
                                                        )}
                                                        name='itemSelect'
                                                    />
                                                    <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                                                        Сохранить
                                                    </Button>
                                                </Space>
                                            </>
                                        )}
                                        options={items}
                                    />
                                    {errors.permissions && <ErrorText>{errors.permissions.message}</ErrorText>}
                                </>
                            )}
                            name='permissions'
                        />
                    </Form.Item>
                </Form>
            ) : (
                <Form layout='vertical'>
                    <StyledContainer>
                        <Form.Item label='Цена' required>
                            <Controller
                                rules={rulesController()}
                                control={control}
                                render={({ field }) => <InputNumber {...field} type='number' min={0} className='w-100' />}
                                name='price'
                            />
                            {errors.price && <ErrorText>{errors.price.message}</ErrorText>}
                        </Form.Item>
                    </StyledContainer>
                </Form>
            )}
        </Modal>
    )
}
