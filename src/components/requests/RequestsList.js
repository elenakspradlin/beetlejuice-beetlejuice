import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const RequestsList = () => {
    const [requests, setRequests] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])
    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/requests?&_expand=service`)
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

    return <>
        {
            beetleUserObject.staff

                ? <>

                </>
                : <>
                    <button onClick={() => navigate("/request/create")}>Create Request</button>


                </>
        }



        <h2>List of Requests</h2>
        <h3>Your Open Requests</h3>

        <article className="requests">
            {
                filteredRequests.map(
                    (request) => {
                        return <section className="request" key={`request-- ${request.id}`}>

                            <header>{request.service?.typeOfService}</header>


                        </section>
                    }
                )

            }


        </article>
    </>
}




