/// <reference types="vite/client" />

//Типы для env файлов
interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_TOKEN_KEY: string
    readonly VITE_BASE_URL_AUTH: string
    readonly VITE_CLIENT_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
