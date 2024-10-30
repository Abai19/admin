import { FC } from 'react'
import { withAuth } from '~/shared/lib'
import { Helmet } from 'react-helmet'
import { AppHeader } from '~/widgets/ui'
import Template from '~/features/template/ui/Template'

const TemplatePage: FC = () => {
    return (
        <>
            <Helmet>
                <title>Шаблоны</title>
            </Helmet>
            <AppHeader title='Шаблоны' />

            <Template />
        </>
    )
}

export default withAuth(TemplatePage)
