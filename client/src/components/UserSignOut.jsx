import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";

import UserContext from "../context/UserContext"

const UserSignOut = () => {
    const { actions } = useContext(UserContext);

    // use context to call sign out function
    useEffect(() => actions.signOut());

    return <Navigate to="/" replace />
}

export default UserSignOut
