import { ConfigProvider } from 'antd'
import { createContext, FC, ReactNode, useCallback, useState } from 'react'

interface IAntdContext {
    collapsed: boolean
    changeCollapsed: () => void
}

export const AntdContext = createContext<Partial<IAntdContext>>({})

export const AntdProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true)

    const changeCollapsed = useCallback(() => {
        setCollapsed(!collapsed)
    }, [collapsed])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4FAE47',
                    colorLink: '#4FAE47',
                },
            }}>
            <AntdContext.Provider value={{ collapsed, changeCollapsed }}>{children}</AntdContext.Provider>
        </ConfigProvider>
    )
}
