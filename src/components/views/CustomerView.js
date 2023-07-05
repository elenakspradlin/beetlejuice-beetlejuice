import { Outlet, Route, Routes } from "react-router-dom"
import { RequestForm } from "../requests/RequestForm"
import { RequestsList } from "../requests/RequestsList"
import { CustomerForm } from "../profiles/CustomerProfileForm"
import { CustomerProfiles } from "../profiles/CustomerProfile"
import { HomePage } from "../home/HomePage"

export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>
                <Route path="home" element={<HomePage />} />
                <Route path="myinformation/edit" element={<CustomerForm />} />
                <Route path="myinformation" element={<CustomerProfiles />} />
                <Route path="request/create" element={<RequestForm />} />
                <Route path="requests" element={<RequestsList />} />
            </Route>
        </Routes>
    )
}
