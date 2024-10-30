import { FC } from 'react'
import { Routing } from '~/pages'
import { AuthProvider } from '~/app/providers/auth-provider'
import { AntdProvider } from '~/app/providers/antd-provider'
import './styles/index.css'

const App: FC = () => {
    return (
        <AuthProvider>
            <AntdProvider>
                <Routing />
            </AntdProvider>
        </AuthProvider>
    )
}

export default App
