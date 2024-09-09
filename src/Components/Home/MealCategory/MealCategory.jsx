import { useEffect, useState } from "react";
import SectionTitle from "../DietBlog/SectionTitle";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";


const MealCategory = () => {
    const [meals, setMeals] = useState([])
    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allMeals')
            .then(res => res.json())
            .then(data => {
                setMeals(data);
                const tempBreakfast = meals?.filter(meal => meal.category === 'Breakfast');
                setBreakfast(tempBreakfast);
                const tempLunch = meals?.filter(meal => meal.category === 'Lunch');
                setLunch(tempLunch);
                const tempDinner = meals?.filter(meal => meal.category === 'Dinner');
                setDinner(tempDinner);
            })
    }, [meals])

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
                                    <div className="card border-2 border-green-950 bg-green-900 bg-opacity-90 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-green-950 border-teal-900 text-gray-300">View Details</button></Link>
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
                                    <div className="card border-2 border-green-950 bg-green-900 bg-opacity-90 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-green-950 border-teal-900 text-gray-300">View Details</button></Link>
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
                                    <div className="card border-2 border-green-950 bg-green-900 bg-opacity-90 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-green-950 border-teal-900 text-gray-300">View Details</button></Link>
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
                                    <div className="card border-2 border-green-950 bg-green-900 bg-opacity-90 shadow-xl hover:border-none">
                                        <div className="card-body text-gray-300 font-display">
                                            <img className="w-96 h-48" src={meal.image} alt="" />
                                            <p>{meal.title}</p>
                                            <p>Rating: {meal.rating}</p>
                                            <p>Price: ${meal.price}</p>
                                            <div className="card-actions justify-end">
                                                <Link to={`/meal/${meal._id}`}><button className="btn bg-green-950 border-teal-900 text-gray-300">View Details</button></Link>
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