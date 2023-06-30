import { Outlet, Route, Routes } from "react-router-dom"
import { RequestForm } from "../requests/RequestForm"
import { RequestsList } from "../requests/RequestsList"
import { CustomerForm } from "../profiles/CustomerProfileForm"
import { CustomerProfiles } from "../profiles/CustomerProfile"
import { HomePage } from "../home/HomePage"
import "./CustomerView.css"

export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>I'm the ghost with the most, babe</h1>


                    <Outlet />
                </>
            }>
                <Route path="home" element={<HomePage />} />
                <Route path="customerprofile/edit" element={<CustomerForm />} />
                <Route path="customerprofile" element={<CustomerProfiles />} />
                <Route path="request/create" element={<RequestForm />} />
                <Route path="requests" element={<RequestsList />} />
            </Route>
        </Routes>
    )
}
