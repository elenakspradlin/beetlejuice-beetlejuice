import { Outlet, Route, Routes } from "react-router-dom"

export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>I'm the ghost with the most, babe</h1>


                    <Outlet />
                </>
            }></Route>
        </Routes>

    )

}