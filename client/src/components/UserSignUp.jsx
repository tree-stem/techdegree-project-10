import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

// component to ask users for information to successfully sign up
const UserSignUp = () => {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    const { actions } = useContext(UserContext);

    const navigate = useNavigate();

    // event handlers

    // handles form submits and sends a POST request to the database to save user information
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create user object to store user inputs in their respected fields
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        // options object to send POST method, headers, and body
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user),
        }

        // fetch request to the endpoint that handles POST methods and sends the proper response
        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);
            if (response.status === 201) {
                await actions.signIn(user);
                navigate("/");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    // event handler that directs user back to home page 
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    // render html with ref properties for each field input
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        ref={firstName}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        ref={lastName}
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        ref={emailAddress}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        ref={password}
                    />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in!</Link></p>
            </div>
        </main >
    )
}

export default UserSignUp
