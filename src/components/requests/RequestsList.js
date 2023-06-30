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


            console.log("Initial state of requests", requests)
        },
        []
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
        if (!beetleUserObject.staff) {
            return (
                <button
                    onClick={() => {
                        fetch(`http://localhost:8088/requests/${request.id}`, {
                            method: "DELETE",
                        })
                            .then(() => {
                                setRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));
                            })
                            .catch((error) => console.error("Error deleting request:", error));
                    }}
                    className="request__delete"
                >
                    Cancel Request
                </button>
            );
        }
    };


    const acceptButton = (request) => {
        if (beetleUserObject.staff && request.status === "pending") {
            return (
                <button
                    onClick={() => {
                        const updatedRequest = { ...request, status: "accepted" };
                        fetch(`http://localhost:8088/requests/${request.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedRequest),
                        })
                            .then(() => {
                                fetch("http://localhost:8088/requests?_expand=service&_expand=customer")
                                    .then((response) => response.json())
                                    .then((requestsArray) => {
                                        setRequests(requestsArray);
                                    });
                            })
                            .catch((error) => console.error("Error accepting request:", error));
                    }}
                    className="request__accept"
                >
                    Accept Request
                </button>
            );
        }
    };

    const denyButton = (request) => {
        if (beetleUserObject.staff && request.status === "pending") {
            return (
                <button
                    onClick={() => {
                        const updatedRequest = { ...request, status: "denied" };
                        fetch(`http://localhost:8088/requests/${request.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedRequest),
                        })
                            .then(() => {
                                fetch(`http://localhost:8088/requests?_expand=service&_expand=customer`)
                                    .then((response) => response.json())
                                    .then((requestsArray) => {
                                        setRequests(requestsArray);
                                    });
                            })
                            .catch((error) => console.error("Error denying request:", error));
                    }}
                    className="request__deny"
                >
                    Deny Request
                </button>
            );
        }
    };


    useEffect(
        () => {
            if (beetleUserObject.staff) {

                setFilteredRequests(requests)
            }
            else {

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
                                        {request.status === "pending" && acceptButton(request)}
                                        {request.status === "pending" && denyButton(request)}
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
                                        {deleteButton(request)}

                                    </section>
                                }
                            )

                        }


                    </article>


                </>
        }






    </>
}




