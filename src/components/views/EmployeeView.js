import { Outlet, Route, Routes } from "react-router-dom"
import { RequestsList } from "../requests/RequestsList"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>I'm the ghost with the most, babe</h1>


                    <Outlet />
                </>
            }>
                <Route path="requests" element={<RequestsList />} />

            </Route>
        </Routes>

    )

}