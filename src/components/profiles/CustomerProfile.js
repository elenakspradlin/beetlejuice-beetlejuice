import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CustomerProfile.css"
import { RequestsList } from "../requests/RequestsList"

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


    return <>
        <main className="container--customerProfile">
            <section>
                <h2 className="customerProfile__title">Your Information</h2>

                <h3 className="customerInformation">Name: {user?.fullName}</h3>

                <h3 className="customerInformation"> Email: {user?.email} </h3>

                <button onClick={() => navigate("/customerprofile/edit")}>Edit Your Information</button>

                {beetleUserObject && (
                    <RequestsList beetleUserObject={beetleUserObject} />
                )}

            </section>
        </main>

    </>
}