import { FC } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import { MAILINGS_ROUTER, withAuth } from '~/shared/lib'
import { AppHeader } from '~/widgets/ui'
import { MailingsList } from '~/features/mailings'

const MailingsPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Рассылки</title>
            </Helmet>

            <AppHeader title='Рассылки' />

            <Routes>
                <Route path={MAILINGS_ROUTER.mailings} element={<MailingsList />} />
            </Routes>
        </>
    )
}

export default withAuth(MailingsPage)
