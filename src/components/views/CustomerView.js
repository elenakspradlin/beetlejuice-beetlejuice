import { Outlet, Route, Routes } from "react-router-dom"
import { RequestForm } from "../requests/RequestForm"
import { UserProfiles } from "../profiles/UserProfiles"
import { RequestsList } from "../requests/RequestsList"

export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>I'm the ghost with the most, babe</h1>


                    <Outlet />
                </>
            }>

                <Route path="userprofile" element={<UserProfiles />} />
                <Route path="request/create" element={<RequestForm />} />
                <Route path="requests" element={<RequestsList />} />
            </Route>
        </Routes>
    )
}
