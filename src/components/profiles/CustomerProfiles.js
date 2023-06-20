import { useEffect, useState } from "react"

export const CustomerProfiles = () => {

    const [customers, setCustomers] = useState([])

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)



    return <><h2>Your Profile</h2><section className="customer">
        <header className="customer__header"> {beetleUserObject.fullName} </header>
        <div> Email: {beetleUserObject.email} </div>

    </section></>
}


