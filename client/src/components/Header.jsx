import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from '../context/UserContext.jsx';

const Header = () => {
    const { authUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {authUser === null ?
                        <>
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign Up</Link></li>
                                <li><Link to="/signin">Sign In</Link></li>
                            </ul>
                        </>
                        :
                        <>
                            <ul className="header--signedout">
                                <span>Welcome {authUser.firstName}</span>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
                        </>
                    }
                </nav>
            </div>
        </header >
    )
}

export default Header
