import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("Your Email")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("beetlejuice_user", JSON.stringify({
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        staff: user.isStaff
                    }))

                    if (user.isStaff) {
                        navigate("/myinformation");
                    } else {
                        navigate("/home");
                    }
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="h1">Better Call Beetlejuice</h1>
                    <h2>The Afterlife's Leading Bio-Exorcist</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="button" type="submit">
                            It's Showtime
                        </button>
                    </fieldset>
                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </form>
            </section>
        </main>
    );
}