import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CustomerForm = () => {
    const [user, updateUser] = useState({
        fullName: "",
        email: "",
    });

    const navigate = useNavigate();

    const localBeetleUser = localStorage.getItem("beetlejuice_user");
    const beetleUserObject = JSON.parse(localBeetleUser);

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${beetleUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const customerObject = data[0];
                updateUser(customerObject);
            });
    }, []);


    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const updatedUserProfile = { ...user };

        const isProfileUpdated =
            JSON.stringify(updatedUserProfile) !== JSON.stringify(user);

        if (isProfileUpdated) {
            return fetch(`http://localhost:8088/users/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedUserProfile),
            })
                .then((response) => response.json())
                .then(() => {
                    updateUser(updatedUserProfile);
                    navigate("/customerprofile");
                });
        } else {
            navigate("/customerprofile");
        }
    };

    return (
        <form className="profile">
            <h2 className="profile__title">Your Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email address:</label>
                    <input type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}