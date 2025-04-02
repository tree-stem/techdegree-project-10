import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";

import UserContext from "../context/UserContext"

// component to handle user sign outs
const UserSignOut = () => {
    // import functions from context
    const { actions } = useContext(UserContext);

    // signs user out by calling signOut function
    useEffect(() => actions.signOut());

    // directs user to homepage and protects any memory leaks
    return <Navigate to="/" replace />
}

export default UserSignOut
