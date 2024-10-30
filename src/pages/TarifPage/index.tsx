import { FC } from 'react'
import { withAuth } from '~/shared/lib'
import { Helmet } from 'react-helmet'
import { AppHeader } from '~/widgets/ui'
import { Tarifs } from '~/features/tarif'

const TarifPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Тарифы</title>
            </Helmet>
            <AppHeader title='Тарифы' />

            <Tarifs />
        </>
    )
}

export default withAuth(TarifPage)
