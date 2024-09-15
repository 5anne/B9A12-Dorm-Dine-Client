import { useState } from "react";
import SectionTitle from "../DietBlog/SectionTitle";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const MealCategory = () => {

    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])
    const axiosPublic = useAxiosPublic();

    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMeals');
            const tempBreakfast = res.data?.filter(meal => meal.category === 'Breakfast');
            setBreakfast(tempBreakfast);
            const tempLunch = res.data?.filter(meal => meal.category === 'Lunch');
            setLunch(tempLunch);
            const tempDinner = res.data?.filter(meal => meal.category === 'Dinner');
            setDinner(tempDinner);
            return res.data;
        }
    })

    return (
        <section className="mt-28">
            <SectionTitle
                subHeading="Category"
                heading="Signature Food Items"
            ></SectionTitle>
            <div className="my-16 mx-12">
                <Tabs>
                    <TabList>
                        <Tab>All Meals</Tab>
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
                            {
                                meals?.map(meal => <div key={meal._id}>
                                    <div className="card border-2 border-green-950 bg-[#592720] bg-opacity-70 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-100 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-[#a67b5b] border-none text-gray-300">View Details</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
                            {
                                breakfast?.map(meal => <div key={meal._id}>
                                    <div className="card border-2 border-green-950 bg-[#592720] bg-opacity-70 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-[#a67b5b] border-none text-gray-300">View Details</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
                            {
                                lunch?.map(meal => <div key={meal._id}>
                                    <div className="card border-2 border-green-950 bg-[#592720] bg-opacity-70 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-[#a67b5b] border-none text-gray-300">View Details</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
                            {
                                dinner?.map(meal => <div key={meal._id}>
                                    <div className="card border-2 border-green-950 bg-[#592720] bg-opacity-70 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-[#a67b5b] border-none text-gray-300">View Details</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default MealCategory;