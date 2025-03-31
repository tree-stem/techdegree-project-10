import { useRef } from "react";
import { Link } from "react-router-dom";


const UserSignIn = () => {
    const emailAddress = useRef(null);
    const password = useRef(null);

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
                console.log(user);
                // console.log(`SUCCESS! ${user.} is now signed in!)
            } else if (response.status === 401) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

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
