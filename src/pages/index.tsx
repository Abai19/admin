import { FC } from 'react'
import { MAIN_ROUTERS } from '~/shared/lib'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '~/pages/AuthPage'
import TarifPage from '~/pages/TarifPage'
import ReportPage from '~/pages/ReportPage'
import MailingsPage from '~/pages/MailingsPage'
import DealersPage from '~/pages/DealersPage'
import TemplatePage from '~/pages/TemplatePage'

export const Routing: FC = () => {
    return (
        <Routes>
            <Route path={MAIN_ROUTERS.auth} element={<AuthPage />} />
            <Route path={MAIN_ROUTERS.mailings + '/*'} element={<MailingsPage />} />
            <Route path={MAIN_ROUTERS.report} element={<ReportPage />} />
            <Route path={MAIN_ROUTERS.tarif} element={<TarifPage />} />
            <Route path={MAIN_ROUTERS.dealers} element={<DealersPage />} />
            <Route path={MAIN_ROUTERS.template} element={<TemplatePage />} />
            <Route path='/' element={<Navigate replace to={MAIN_ROUTERS.tarif} />} />
        </Routes>
    )
}
