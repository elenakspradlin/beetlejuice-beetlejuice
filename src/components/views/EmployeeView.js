import { Outlet, Route, Routes } from "react-router-dom"
import { RequestsList } from "../requests/RequestsList"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="myinformation" element={<RequestsList />} />

            </Route>
        </Routes>

    )

}