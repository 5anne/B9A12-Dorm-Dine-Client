import { Helmet } from "react-helmet";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Banner from "./Banner";
import DietBlogs from "./DietBlog/DietBlogs";
import MealCategory from "./MealCategory/MealCategory";
import Motto from "./Motto";
import MemberShip from "./MemberShip/MemberShip";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Dorm Dine ~ Home Page</title>
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <MealCategory></MealCategory>
            <MemberShip></MemberShip>
            <Motto></Motto>
            <DietBlogs></DietBlogs>
            <Footer></Footer>
        </div>
    );
};

export default Home;