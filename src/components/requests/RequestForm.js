import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./RequestForm.css"

export const RequestForm = () => {

    const [request, update] = useState({
        employeeId: 0,
        customerId: 0,
        serviceId: 0,
        status: "pending",
        description: ""

    })

    const [serviceTypes, setServiceTypes] = useState([])
    const [employees, setEmployees] = useState([])
    const [serviceDescription, setServiceDescription] = useState("");
    const [selectedEmployeePicture, setSelectedEmployeePicture] = useState("")

    const navigate = useNavigate()

    const localBeetleUser = localStorage.getItem("beetlejuice_user")
    const beetleUserObject = JSON.parse(localBeetleUser)

    const handleSubmitButtonClick = (event) => {
        event.preventDefault()

        const requestToSendToAPI = {
            employeeId: parseInt(request.employeeId),
            customerId: parseInt(beetleUserObject.id),
            serviceId: parseInt(request.serviceId),
            status: "pending",
            description: request.description
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
                navigate("/myinformation")

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
        []
    );

    useEffect(() => {
        const selectedService = serviceTypes.find(
            (service) => service.id === request.serviceId
        );
        if (selectedService) {
            setServiceDescription(selectedService.description);
        } else {
            setServiceDescription("");
        }
    }, [request.serviceId, serviceTypes]);



    return (
        <main className="container--requestForm">
            <section>
                <h2 className="requestForm__title">New Request</h2>
                <form className="requestForm">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="dropdown"><h3>Select A Service:</h3></label>


                            <select id="dropdown"
                                value={request.serviceId || ""}

                                onChange={(event) => {
                                    const copy = { ...request };
                                    copy.serviceId = parseInt(event.target.value);
                                    update(copy);
                                }}>
                                <option disabled value="">Select an option</option>
                                {serviceTypes.map((service => (
                                    <option value={service.id} key={service.id}>{service.typeOfService}</option>
                                )

                                ))}
                            </select>
                        </div>
                    </fieldset>
                    <div className="serviceInformation">
                        {serviceDescription && (
                            <div className="form--description">
                                <h3>Description:</h3>

                                <h4>{serviceDescription}</h4>

                            </div>
                        )}
                    </div>

                    <label htmlFor="description"><h3>Describe your issue:</h3></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control2"
                        placeholder="Brief description of problem"
                        value={request.description}
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.description = evt.target.value
                                update(copy)

                            }
                        } />
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="dropdown"><h3>Select who you'd like perform this service:</h3></label>


                            <select id="dropdown"
                                value={request.employeeId || ""}

                                onChange={(event) => {
                                    const copy = { ...request };
                                    copy.employeeId = (event.target.value);
                                    update(copy);

                                    const selectedEmployee = employees.find((employee) => employee.id === parseInt(event.target.value));
                                    if (selectedEmployee) {
                                        setSelectedEmployeePicture(selectedEmployee.employeePhoto);
                                    } else {
                                        setSelectedEmployeePicture("");
                                    }
                                }}>
                                <option disabled value="">Select an employee</option>

                                {employees.map((request) => (
                                    <option value={request.id} key={request.id}>{request.user?.fullName}</option>
                                )

                                )}
                            </select>
                        </div>
                    </fieldset>

                    {selectedEmployeePicture && (
                        <div className="employee-picture">
                            <img src={selectedEmployeePicture} alt="Selected Employee" />
                        </div>
                    )}


                    <button
                        onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                        className="button">
                        Submit Request
                    </button>
                </form>
            </section>
        </main >
    )
}