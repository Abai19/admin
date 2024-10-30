import { FC } from 'react'
import { Helmet } from 'react-helmet'
import { ReportList } from '~/features/report'
import { withAuth } from '~/shared/lib'
import { AppHeader } from '~/widgets/ui'

const ReportPage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Отчеты</title>
            </Helmet>
            <AppHeader title='Отчеты' />

            <ReportList />
        </>
    )
}
export default withAuth(ReportPage)
