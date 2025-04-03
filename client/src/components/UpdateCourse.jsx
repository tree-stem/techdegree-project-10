import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";

// component to allow users to edit course details (only available to course creator)
const UpdateCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [materialsNeeded, setMaterialsNeeded] = useState(null);
    const navigate = useNavigate();

    // fetch course data based off id paramater and set properties to changed values
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`https://techdegree-project-10-production.up.railway.app/api/courses/${id}`);
                if (response.status === 200) {
                    const fetchedData = await response.json();
                    setCourse(fetchedData)
                    setTitle(fetchedData.title);
                    setDescription(fetchedData.description);
                    setEstimatedTime(fetchedData.estimatedTime);
                    setMaterialsNeeded(fetchedData.materialsNeeded);
                } else if (response.status === 400) {
                    console.log("Sorry! Page not found");
                } else {
                    throw new Error("Unexpected error occured");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourseData();
    }, [id]);

    // event handlers

    // sends fetch request with course data and necessary headers
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create course object to pass to the api
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        // object to pass PUT method, headers, and body
        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(course),
        }

        // fetch request to api endpoint to handle put methods
        try {
            const response = await fetch(`https://techdegree-project-10-production.up.railway.app/api/courses/${id}`, fetchOptions);
            if (response.status === 204) {
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                response.status === 404;
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    // event handler to navigate user back to course detail page
    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/courses/${id}`)
    }

    // handlers for each course property to store any changes
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleEstimatedTimeChange = (event) => {
        setEstimatedTime(event.target.value);
    }

    const handleMaterialsNeededChange = (event) => {
        setMaterialsNeeded(event.target.value);
    }

    // render html and include after course data has loaded and pass event handlers
    return (
        <main>
            {course ? (
                <>
                    <div className="wrap">
                        <h2>Update Course</h2>
                        <ErrorsDisplay errors={errors} />
                        <form onSubmit={handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        onChange={handleTitleChange}
                                        value={title}
                                    />

                                    <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea id="courseDescription" name="courseDescription" onChange={handleDescriptionChange} value={description}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        onChange={handleEstimatedTimeChange}
                                        value={estimatedTime}
                                    />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleMaterialsNeededChange} value={materialsNeeded}></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                </>
            )
                :
                (
                    <div>Loading...</div>
                )
            }
        </main >
    )
}

export default UpdateCourse
