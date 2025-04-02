// not found page when there's an internal server error
const NotFound = () => {
    // render html dislaying a friendly message
    return (
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
    )
}

export default NotFound
