import { FC } from 'react'
import { Helmet } from 'react-helmet'
import { AppHeader } from '~/widgets/ui'
import { withAuth } from '~/shared/lib'
import { DealersList } from '~/features/dealers'

const DealersPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Диллеры</title>
            </Helmet>

            <AppHeader title='Диллеры' />
            <DealersList />
        </>
    )
}

export default withAuth(DealersPage)
