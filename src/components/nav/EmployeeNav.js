import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/requests">My Requests</Link>
            </li>

            {
                localStorage.getItem("beetlejuice_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("beetlejuice_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}