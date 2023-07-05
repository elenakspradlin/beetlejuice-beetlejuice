import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {


    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myinformation">My Information</Link>
            </li>

            {
                localStorage.getItem("beetlejuice_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("beetlejuice_user")
                            navigate("/", { replace: true })
                        }}>Rest In Peace</Link>
                    </li>
                    : ""
            }
        </ul>
    )


}