import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

// component that authenticates users to site comparing credentials to user information
const UserSignIn = () => {
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { actions } = useContext(UserContext);

    // event handlers

    // handles form submits and directs users to respested site or displays errors
    const handleSubmit = async (event) => {
        event.preventDefault();
        let from = '/';

        // store location information in state and store it in a variable
        if (location.state) {
            from = location.state.from;
        }

        // object that holds user input for authentication purposes
        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        // async/await function that uses context functions to authenticate user by passing user credentials
        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    // cancel function redirecting user to home page
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    // render html and ErrorDisplay component to display any errors first
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
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
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up!</Link></p>

            </div>
        </main>
    )
}

export default UserSignIn
