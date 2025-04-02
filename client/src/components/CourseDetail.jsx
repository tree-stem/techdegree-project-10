import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import UserContext from '../context/UserContext';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    // fetch course data based off id parameter
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (response.status === 200) {
                    const fetchedData = await response.json();
                    setCourse(fetchedData);
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

    // handle DELETE request and return user to home page
    const handleDelete = async (event) => {
        event.preventDefault();
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(course),
        }

        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}`, fetchOptions);
            if (response.status === 204) {
                navigate('/');
            } else if (response.status === 404) {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    }

    return (
        <main>
            {authUser ? (
                course && course.userId === authUser.id ? (
                    <>
                        <div className="actions--bar">
                            <div className="wrap">
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <Link className="button" to="/" onClick={handleDelete}>Delete Course</Link>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </div>
                        </div>
                    </>
                ) : null
            ) : null}

            {course ? (
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>

                                <p>{course.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                {course.materialsNeeded && (
                                    <ul className="course--detail--list">
                                        {course.materialsNeeded
                                            .split("\n")
                                            .filter(material => material.trim() !== "")
                                            .map((material, index) => (
                                                <li key={index}>{material.replace(/^\* /, "")}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            ) : <div>Loading...</div>}
        </main >
    )
}

export default CourseDetail
