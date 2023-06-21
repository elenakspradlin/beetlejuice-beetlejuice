import "./NavBar.css"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"

export const NavBar = () => {


    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    if (beetleUserObject.staff) {
        return <EmployeeNav />

    }

    else {

        return <CustomerNav />
    }


}

