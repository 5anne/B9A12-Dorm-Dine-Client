import { Helmet } from "react-helmet";
import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ 404_not_found</title>
            </Helmet>
            <div className="flex justify-center mt-8">
                <img src="https://i.postimg.cc/T3GzMhNN/flat-concept-404-error-page-file-found-web-page-banner-presentation-social-media-documents-website-m.jpg" alt="" />
            </div>
            <div className="flex justify-center mt-2">
                <p>Go Back to <Link to="/"><button className="p-1 hover:bg-gray-200">Home</button></Link></p>
            </div>
        </div>
    );
};

export default ErrorPage;