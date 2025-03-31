import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserSignIn = () => {
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        }

        const response = await fetch("http://localhost:5000/api/users", fetchOptions);
        try {
            if (response.status === 200) {
                const user = await response.json();
                console.log(`SUCCESS! ${user.firstName} ${user.lastName} is now signed in!`);
            } else if (response.status === 401) {
                setErrors(["Sign-in was unsuccessful"]);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {errors.length ? (
                    <div>
                        <ul>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>
                ) : null}
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
                    <button className="button button-secondary">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="signup">sign up!</Link></p>

            </div>
        </main>
    )
}

export default UserSignIn
