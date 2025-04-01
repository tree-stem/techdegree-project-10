import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

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


    return (
        <main>
            {course ? (
                <>
                    <div className="actions--bar">
                        <div className="wrap">
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <Link className="button" to="#">Delete Course</Link>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>

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
                </>
            )
                :
                (
                    <div>
                        Loading...
                    </div>
                )}
        </main>
    )
}

export default CourseDetail
