import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const RequestForm = () => {

    const [request, update] = useState({
        employeeId: 0,
        customerId: 0,
        serviceId: 0
    })

    const [serviceTypes, setServiceTypes] = useState([])
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const requestToSendToAPI = {
            employeeId: request.employeeId,
            customerId: beetleUserObject.id,
            serviceId: parseInt(request.serviceId)
        }

        return fetch(`http://localhost:8088/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/requests")

            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    );


    useEffect(
        () => {
            fetch(`http://localhost:8088/services`)
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


                    <select id="dropdown"
                        value={request.serviceId || ""}

                        onChange={(event) => {
                            const copy = { ...request };
                            copy.serviceId = event.target.value;
                            update(copy);
                        }}>
                        <option disabled value="">Select an option</option>
                        {serviceTypes.map((request) => (
                            <option value={request.id} key={request.id}>{request.typeOfService}</option>
                        )

                        )}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="dropdown">Select who you'd like perform this service:</label>


                    <select id="dropdown"
                        value={request.employeeId || ""}

                        onChange={(event) => {
                            const copy = { ...request };
                            copy.employeeId = (event.target.value);
                            update(copy);
                        }}>
                        <option disabled value="">Select an employee</option>

                        {employees.map((request) => (
                            <option value={request.id} key={request.id}>{request.user?.fullName}</option>
                        )

                        )}
                    </select>
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Request
            </button>
        </form >)
}