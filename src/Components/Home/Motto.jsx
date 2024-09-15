import SectionTitle from "./DietBlog/SectionTitle";


const Motto = () => {
    return (
        <div className="bg-no-repeat bg-fixed bg-cover lg:p-24 my-10 md:my-36 max-w-6xl mx-auto" style={{ backgroundImage: 'url(https://i.postimg.cc/qqvQQqLK/medium-shot-chef-wearing-face-mask-23-2148931867.jpg)' }}>
            <div className="bg-white bg-opacity-30 px-8 pt-4 pb-12">
                <SectionTitle
                    subHeading="Motto"
                    heading="Serve The Best Quality"
                ></SectionTitle>
                <div className="md:flex gap-4 items-center">
                    <img className="md:w-1/2 h-72" src="https://i.postimg.cc/t4c06Q9D/24550476393-c95f3280eb-c-63bc36b903832-700.jpg" alt="" />
                    <div className="md:w-1/2 text-black font-display">
                        <h1 className="font-bold text-2xl mb-4">Our Commitments:</h1>
                        <ol>
                            <li> - Quality Meals, Hassle-Free Ordering</li>
                            <li> - Convenience Meets Deliciousness: Order Top-Notch Hostel Meals</li>
                            <li> - Fuel Your Adventures with Nutritious & Delicious Hostel Fare</li>
                            <li> - We Deliver the Best Hostel Meals, So You Can Focus on Your Next Adventure</li>
                            <li> - Experience the Difference: Discover Delicious & Convenient Hostel Meals</li>
                        </ol>
                        <button className="border-2 p-2 border-green-950 mt-4">Explore more</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Motto;