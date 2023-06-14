import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RequestsList } from "./RequestsList"

export const RequestForm = () => {

    const [request, update] = useState([])

    const [serviceTypes, setServiceTypes] = useState([])

    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const requestToSendToAPI = {
            customerId: beetleUserObject.id,
            service: request.serviceId
        }

        return fetch(`http://localhost:8088/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestToSendToAPI)
        })
            .then(response => response.json)
            .then(() => {
                navigate("/requests")

            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/requests?_expand=service`)
                .then(response => response.json())
                .then((servicesArray) => {
                    setServiceTypes(servicesArray)
                })
        },
        [] //When this array is empty, you are observing inital componenet state
    );


    return (
        <form className="requestForm">
            <h2 className="requestForm__title">New Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dropdown">Type of Service:</label>


                    <select value="0">
                        {serviceTypes.map((request) => (
                            <option value={request.service?.typeOfService}>{request.service?.typeOfService}</option>
                        )

                        )}
                    </select>
                </div>
            </fieldset>
        </form>)
}