import { FC, useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import { rulesController } from '~/shared/data'
import { ErrorText } from '~/shared/ui/error-text'
import { AuthContext } from '~/app/providers/auth-provider'
import { ModalProp, tFormTemplate } from '../Template/types'
import { useCreateTemplate, useEditTemplate } from '../../queries/indes'

export const ModalTemplate: FC<ModalProp> = ({ hideModal }) => {
    const { token } = useContext(AuthContext)
    const {
        control,
        watch,
        formState: { errors },
        handleSubmit,
    } = useFormContext<tFormTemplate>()

    const { isLoading, mutate } = useCreateTemplate(token, hideModal)
    const { isLoading: isLoadingEdit, mutate: editDealer } = useEditTemplate(token, hideModal)

    const submitCreate = (data: tFormTemplate) => mutate(data)
    const submitEdit = (data: tFormTemplate) => {
        editDealer(data)
    }

    return (
        <Modal
            open
            cancelText='Отмена'
            onCancel={hideModal}
            okText={watch('title') ? 'Сохранить' : 'Создать'}
            title={watch('title') ? 'Изменение шаблона' : 'Создание шаблона'}
            onOk={watch('title') ? handleSubmit(submitEdit) : handleSubmit(submitCreate)}
            confirmLoading={watch('title') ? isLoadingEdit : isLoading}>
            <Form layout='vertical'>
                <Form.Item label='Заголовок'>
                    <Controller
                        rules={rulesController()}
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input {...field} />
                                {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
                            </>
                        )}
                        name='title'
                    />
                </Form.Item>

                <Form.Item label='Описание'>
                    <Controller
                        rules={rulesController()}
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input {...field} />
                                {errors.body && <ErrorText>{errors.body.message}</ErrorText>}
                            </>
                        )}
                        name='body'
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
