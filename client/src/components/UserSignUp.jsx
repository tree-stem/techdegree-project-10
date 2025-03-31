import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    // event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user),
        }

        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up and authenticated!`);
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

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {errors.length ? (
                    <div>
                        <ul>Validation Errors
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>
                ) : null}
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
                    <button className="button button-secondary">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in!</Link></p>
            </div>
        </main >
    )
}

export default UserSignUp
