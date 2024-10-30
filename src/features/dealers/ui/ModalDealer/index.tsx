import { FC, useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { IProps } from './types.ts'
import { Controller, useFormContext } from 'react-hook-form'
import { tFormDealer } from '../DealersList/types.ts'
import { CustomIMask } from '~/shared/ui/styled-imask'
import { rulesController } from '~/shared/data'
import { ErrorText } from '~/shared/ui/error-text'
import { useCreateDealer, useDealersList, useEditDealer } from '~/features/dealers'
import { AuthContext } from '~/app/providers/auth-provider'

export const ModalDealer: FC<IProps> = ({ hideModal }) => {
    const { token } = useContext(AuthContext)
    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
    } = useFormContext<tFormDealer>()
    const { isLoading, mutate } = useCreateDealer(token, hideModal)
    const { isLoading: isLoadingEdit, mutate: editDealer } = useEditDealer(token, hideModal)

    const submit = (data: tFormDealer) => {
        if (watch('id')) {
            editDealer(data)
        } else {
            mutate(data)
        }
    }

    return (
        <Modal
            open
            cancelText='Отмена'
            onCancel={hideModal}
            okText={watch('id') ? 'Сохранить' : 'Создать'}
            title={watch('id') ? 'Изменение диллера' : 'Создание диллера'}
            onOk={handleSubmit(submit)}
            confirmLoading={watch('id') ? isLoadingEdit : isLoading}>
            <Form layout='vertical'>
                <Form.Item label='Имя'>
                    <Controller rules={rulesController()} control={control} render={({ field }) => <Input {...field} />} name='name' />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </Form.Item>

                <Form.Item label='Номер телефона'>
                    <Controller
                        rules={rulesController()}
                        control={control}
                        render={({ field }) => <CustomIMask name='telephone' {...field} />}
                        name='phone'
                    />
                    {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
                </Form.Item>

                <Form.Item label='Email'>
                    <Controller
                        control={control}
                        rules={{
                            ...rulesController(),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Введите корректный email',
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                        name='email'
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                </Form.Item>
            </Form>
        </Modal>
    )
}
