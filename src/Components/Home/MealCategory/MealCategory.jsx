import { useEffect, useRef, useState } from "react";
import SectionTitle from "../DietBlog/SectionTitle";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MealCategory = ({ searchedMealsData, value, loading }) => {
    console.log(searchedMealsData);
    console.log(loading);

    const [mealsData, setMealsData] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const axiosPublic = useAxiosPublic();
    const sectionRef = useRef(null);
    const breakfastRef = useRef(null);
    const lunchRef = useRef(null);

    useEffect(() => {
        if (loading && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });

            if (value === 'BREAKFAST') {
                const slicedBreakfast = searchedMealsData?.slice(0, 3);
                setBreakfast(slicedBreakfast);
                return;
            }

            else if (value === 'LUNCH') {
                const slicedLunch = searchedMealsData?.slice(0, 3);
                setLunch(slicedLunch);
                return;
            }

            else if (value === 'DINNER') {
                const slicedDinner = searchedMealsData?.slice(0, 3);
                setDinner(slicedDinner);
                return;
            }

        }
    }, [searchedMealsData, value, loading])

    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMeals');
            const slicedData = res.data?.slice(0, 3);
            setMealsData(slicedData);
            const tempBreakfast = res.data?.filter(meal => meal.category === 'Breakfast');
            const slicedBreakfast = tempBreakfast?.slice(0, 3);
            setBreakfast(slicedBreakfast);
            const tempLunch = res.data?.filter(meal => meal.category === 'Lunch');
            const slicedLunch = tempLunch?.slice(0, 3);
            setLunch(slicedLunch);
            const tempDinner = res.data?.filter(meal => meal.category === 'Dinner');
            const slicedDinner = tempDinner?.slice(0, 3);
            setDinner(slicedDinner);
            return res.data;
        }
    })

    const handleShowMore = () => {
        setMealsData(meals);
        const tempBreakfast = meals?.filter(meal => meal.category === 'Breakfast');
        setBreakfast(tempBreakfast);
        const tempLunch = meals?.filter(meal => meal.category === 'Lunch');
        setLunch(tempLunch);
        const tempDinner = meals?.filter(meal => meal.category === 'Dinner');
        setDinner(tempDinner);
    }

    const handleShowLess = () => {
        const slicedData = meals?.slice(0, 3);
        setMealsData(slicedData);
        const tempBreakfast = meals?.filter(meal => meal.category === 'Breakfast');
        const slicedBreakfast = tempBreakfast?.slice(0, 3);
        setBreakfast(slicedBreakfast);
        const tempLunch = meals?.filter(meal => meal.category === 'Lunch');
        const slicedLunch = tempLunch?.slice(0, 3);
        setLunch(slicedLunch);
        const tempDinner = meals?.filter(meal => meal.category === 'Dinner');
        const slicedDinner = tempDinner?.slice(0, 3);
        setDinner(slicedDinner);
    }

    return (
        <section ref={sectionRef} className="mt-28">
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
                                mealsData?.map(meal => <div key={meal._id}>
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
                        {
                            mealsData?.length <= 3 ?
                                <div className="flex justify-center">
                                    <button onClick={handleShowMore} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show More...</button>
                                </div> :
                                <div className="flex justify-center">
                                    <button onClick={handleShowLess} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show Less...</button>
                                </div>
                        }
                    </TabPanel>

                    <TabPanel >
                        <div ref={breakfastRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
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
                        {
                            breakfast?.length <= 3 ?
                                <div className="flex justify-center">
                                    <button onClick={handleShowMore} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show More...</button>
                                </div> :
                                <div className="flex justify-center">
                                    <button onClick={handleShowLess} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show Less...</button>
                                </div>
                        }
                    </TabPanel>
                    <TabPanel>
                        <div ref={lunchRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
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
                        {
                            lunch?.length <= 3 ?
                                <div className="flex justify-center">
                                    <button onClick={handleShowMore} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show More...</button>
                                </div> :
                                <div className="flex justify-center">
                                    <button onClick={handleShowLess} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show Less...</button>
                                </div>
                        }
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
                        {
                            dinner?.length <= 3 ?
                                <div className="flex justify-center">
                                    <button onClick={handleShowMore} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show More...</button>
                                </div> :
                                <div className="flex justify-center">
                                    <button onClick={handleShowLess} className="border-2 px-2 py-1 text-teal-900 border-teal-900 hover:font-bold">Show Less...</button>
                                </div>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default MealCategory;