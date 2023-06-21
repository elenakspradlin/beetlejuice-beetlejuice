import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CustomerProfiles = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    const user = users.find((user) => user.id === beetleUserObject?.id);

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((userArray) => {
                    setUsers(userArray)
                })
            console.log("Initial state of users", users)
        },
        []
    );


    return <><h2>Your Profile</h2><section className="customer">
        <header className="customer__header"> {user?.fullName} </header>
        <div> Email: {user?.email} </div>
        <button onClick={() => navigate("/customerprofile/edit")}>Edit Your Information</button>
    </section></>
}