import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Banner from "./Banner";
import DietBlogs from "./DietBlog/DietBlogs";


const Home = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Banner></Banner>
            <DietBlogs></DietBlogs>
            <Footer></Footer>
        </div>
    );
};

export default Home;