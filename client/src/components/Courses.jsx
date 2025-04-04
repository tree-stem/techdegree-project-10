import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Home page component rendering all the courses available
const Courses = () => {
    const [data, setData] = useState(null);

    // fetch course data when page renders
    useEffect(() => {
        // fetch data from api and respond to each status outcome
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://techdegree-project-10-production.up.railway.app/api/courses");
                if (response.status === 200) {
                    const fetchedData = await response.json();
                    setData(fetchedData);
                } else if (response.status === 400) {
                    console.log("Sorry! Page not found");
                } else {
                    throw new Error("Unexpected error occured");
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses();
    }, []);

    // return html after data is finished loading
    return (
        <main>
            <div className="wrap main--grid">
                {data ? (
                    <>
                        {data.map(course => (
                            <Link key={course.id} className="course--module course--link" to={`courses/${course.id}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        ))}
                        <Link className="course--module course--add--module" to="courses/create">
                            <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>
                                New Course
                            </span>
                        </Link>
                    </>
                )
                    : (
                        <div>Loading...</div>
                    )
                }
            </div>
        </main >
    )
}

export default Courses
