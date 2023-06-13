import { Outlet, Route, Routes } from "react-router-dom"
import { Requests } from "../requests/Requests"
import { UserProfiles } from "../profiles/UserProfiles"

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
                <Route path="requests" element={<Requests />} />
            </Route>
        </Routes>
    )
}
