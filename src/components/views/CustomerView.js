import { Outlet, Route, Routes } from "react-router-dom"
import { RequestForm } from "../requests/RequestForm"
import { RequestsList } from "../requests/RequestsList"
import { CustomerProfiles } from "../profiles/CustomerProfiles"

export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>I'm the ghost with the most, babe</h1>


                    <Outlet />
                </>
            }>

                <Route path="customerprofile" element={<CustomerProfiles />} />
                <Route path="request/create" element={<RequestForm />} />
                <Route path="requests" element={<RequestsList />} />
            </Route>
        </Routes>
    )
}
