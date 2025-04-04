import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from '../context/UserContext.jsx';
import ErrorsDisplay from "./ErrorsDisplay.jsx";

const CreateCourse = () => {
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const { authUser } = useContext(UserContext);

    // event handlers

    // sends course information to api to check if form was properly filled out
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create course object to handle any user inputs using useRef
        const course = {
            userId: authUser.id,
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        // variable holding necessary request information to include in the fetch request
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(course),
        }

        // make fetch request to api and navigate user to either home page or display errors
        try {
            const response = await fetch("https://techdegree-project-10-production.up.railway.app/api/courses", fetchOptions);
            if (response.status === 201) {
                console.log("course was successfully created!")
                navigate("/");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    // event handler to bring user back to home page
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }


    // render html with editable input fields
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                ref={title}
                            />

                            <p>By {`${authUser.firstName} ${authUser.lastName}`}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                ref={estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default CreateCourse
