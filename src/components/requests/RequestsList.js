import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Requests.css"

export const RequestsList = () => {
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [completedRequests, setCompletedRequests] = useState([]);
    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    useEffect(() => {
        fetch(`http://localhost:8088/requests?_expand=service&_expand=customer`)
            .then((response) => response.json())
            .then((requestsArray) => {
                setRequests(requestsArray);
                const pending = requestsArray.filter((request) => request.status === "pending");
                setPendingRequests(pending);
            });
    }, []);


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

    useEffect(() => {
        if (!beetleUserObject.staff) {
            const myCompletedRequests = requests.filter(
                (request) =>
                    request.customerId === beetleUserObject.id && request.status === "completed"
            );
            setCompletedRequests(myCompletedRequests);
        }
    }, [requests]);


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

    const completeButton = (request) => {
        if (beetleUserObject.staff && request.status === "accepted") {
            return (
                <button
                    onClick={() => {
                        const updatedRequest = { ...request, status: "completed" };
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
                            .catch((error) => console.error("Error completing request:", error));
                    }}
                    className="request__complete"
                >
                    Mark as Completed
                </button>
            );
        }
    };



    useEffect(
        () => {
            if (beetleUserObject.staff) {
                const openRequests = requests.filter(request => request.status === "accepted")
                setFilteredRequests(openRequests)
            }
            else {

                const myRequests = requests.filter(request => request.customerId === beetleUserObject.id && request.status === "accepted")
                setFilteredRequests(myRequests)
            }
        },
        [requests]
    )


    return <>
        {
            beetleUserObject.staff

                ? <>
                    <h2>Pending Requests</h2>
                    <article className="requests">
                        {pendingRequests.map((request) => {
                            const customer = users.find((user) => user.id === request.customerId);
                            return (
                                <section className="request" key={`request-- ${request.id}`}>
                                    <header>
                                        {request.service?.typeOfService}, requested by {customer?.fullName}
                                    </header>
                                    {acceptButton(request)}
                                    {denyButton(request)}
                                </section>
                            );
                        })}
                    </article>

                    <h2>Your Open Requests</h2>
                    <article className="requests">
                        {
                            filteredRequests.map(
                                (request) => {
                                    const customer = users.find((user) => user.id === request.customerId);
                                    return <section className="request" key={`request-- ${request.id}`}>

                                        <header>{request.service?.typeOfService}, requested by {customer?.fullName} </header>
                                        {request.status === "accepted" && completeButton(request)}
                                    </section>
                                }
                            )
                        }
                    </article>
                </>
                : <>
                    <h2 className="requests">Your Open Requests</h2>
                    <article>
                        {
                            filteredRequests.map(
                                (request) => {
                                    return <section className="request" key={`request-- ${request.id}`}>

                                        <h3>You have requested {request.service?.typeOfService} </h3>
                                        <section className="buttons">
                                            <div>    {deleteButton(request)} </div>
                                            <div>  <button onClick={() => navigate("/request/create")}>Create New Request</button>
                                            </div>  </section>
                                    </section>
                                }
                            )
                        }
                    </article>

                    {!beetleUserObject.staff && (
                        <>
                            <h2 className="request__history">Your Request History</h2>
                            <article className="request__history">
                                {completedRequests.map((request) => {
                                    return (
                                        <section className="request__history" key={`request-- ${request.id}`}>
                                            <h3 className="request__history">
                                                Your request, {request.service?.typeOfService}, was completed
                                            </h3>
                                        </section>
                                    );
                                })}
                            </article>
                        </>
                    )}


                </>
        }
    </>
}