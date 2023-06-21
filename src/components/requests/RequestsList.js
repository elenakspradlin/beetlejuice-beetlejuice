import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Requests.css"

export const RequestsList = () => {
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])
    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/requests?_expand=service&_expand=customer`)
                .then(response => response.json())
                .then((requestsArray) => {

                    setRequests(requestsArray)
                })


            console.log("Initial state of requests", requests) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

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

    const deleteButton = (request) => {
        if (beetleUserObject.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/requests/${request.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        fetch(`http://localhost:8088/requests?_expand=service&_expand=customer`)
                            .then((response) => response.json())
                            .then((requestsArray) => {
                                setRequests(requestsArray);
                            });
                    })
            }} className="request__delete">Request Completed</button>
        }
    }



    useEffect(
        () => {
            if (beetleUserObject.staff) {
                // For employees
                setFilteredRequests(requests)
            }
            else {
                // For customers
                const myRequests = requests.filter(request => request.customerId === beetleUserObject.id)
                setFilteredRequests(myRequests)
            }
        },
        [requests]
    )

    //

    return <>
        {
            beetleUserObject.staff

                ? <>
                    <h2>Your Open Requests</h2>
                    <article className="requests">
                        {
                            filteredRequests.map(
                                (request) => {
                                    const customer = users.find((user) => user.id === request.customerId);
                                    return <section className="request" key={`request-- ${request.id}`}>

                                        <header>{request.service?.typeOfService}, requested by {customer?.fullName} </header>
                                        {
                                            deleteButton(request)
                                        }
                                    </section>
                                }
                            )

                        }


                    </article>

                </>
                : <>
                    <button onClick={() => navigate("/request/create")}>Create Request</button>
                    <h2>Your Open Requests</h2>
                    <article className="requests">
                        {
                            filteredRequests.map(
                                (request) => {
                                    return <section className="request" key={`request-- ${request.id}`}>

                                        <header>You have requested {request.service?.typeOfService} </header>


                                    </section>
                                }
                            )

                        }


                    </article>


                </>
        }






    </>
}




