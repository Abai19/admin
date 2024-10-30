import { FC, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { ImageBackground, StyledButton, StyledCard, StyledLayout, StyledTitle } from './styles.ts'
import { Form, Input, theme } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { LockTwoTone, MailTwoTone } from '@ant-design/icons'
import { ErrorText } from '~/shared/ui/error-text'
import { AuthContext } from '~/app/providers/auth-provider'
import { tAuthForm } from './types'

export const AuthPage: FC = () => {
    const { token } = theme.useToken()
    const { login, message, isLoading } = useContext(AuthContext)

    const {
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm<tAuthForm>({
        defaultValues: {
            email: 'superadmin@gmail.com',
            password: '1423c524d5fgf2cvsfa',
        },
    })

    const submit = ({ email, password }: tAuthForm) => {
        if (isValid) {
            login(email.trim(), password.trim())
        }
    }

    return (
        <>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>

            <StyledLayout>
                <StyledCard size='small'>
                    <Form>
                        <Form.Item>
                            <StyledTitle level={2}>Авторизация</StyledTitle>
                        </Form.Item>

                        <Form.Item>
                            <Controller
                                control={control}
                                name='email'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Введите корректный email',
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Введите корректный email',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        size='large'
                                        name='email'
                                        placeholder='Email'
                                        prefix={<MailTwoTone twoToneColor={token.colorPrimary} />}
                                    />
                                )}
                            />
                            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        </Form.Item>

                        <Form.Item>
                            <Controller
                                control={control}
                                name='password'
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        size='large'
                                        placeholder='Пароль'
                                        autoComplete='new-password'
                                        prefix={<LockTwoTone twoToneColor={token.colorPrimary} />}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item>
                            <StyledButton
                                onClick={handleSubmit(submit)}
                                htmlType='submit'
                                type='primary'
                                size='large'
                                disabled={!isValid}
                                loading={isLoading}>
                                Вход
                            </StyledButton>
                        </Form.Item>
                    </Form>

                    <ErrorText align='center'>{!isLoading && message}</ErrorText>
                </StyledCard>
            </StyledLayout>
        </>
    )
}
