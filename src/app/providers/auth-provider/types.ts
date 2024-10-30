export interface IAuthContext {
    token: string
    message: string
    isLoading: boolean
    parcedToken: IParcedToken | undefined
    login: (email: string, password: string) => void
}

export interface IParcedToken {
    exp: number
    iat: number
    jti: string
    iss: string
    aud: string[]
    sub: string
    typ: string
    azp: string
    sid: string
    acr: string
    'allowed-origins': string[]
    realm_access: {
        roles: string[]
    }
    resource_access: {
        'realm-management': {
            roles: string[]
        }
        authenticationClientId: {
            roles: string[]
        }
        broker: {
            roles: string[]
        }
        account: {
            roles: string[]
        }
    }
    scope: string
    role: string
    orgName: string
    inn: string
    preferred_username: string
    given_name: string
    userId: string
    organizationId: string
    patronymic: string
    subjectForm: string
    surname: string
    name: string
    taxForm: string
    family_name: string
    email: string
}

export interface IResTokenKeyClock {
    access_token: string
    expires_in: number
    'not-before-policy': number
    refresh_expires_in: number
    scope: string
    token_type: string
}

export interface ILoginToken extends IResTokenKeyClock {
    refresh_token: string
    session_state: string
}
