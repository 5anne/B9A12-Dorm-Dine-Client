import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SectionTitle from './SectionTitle';

const DietBlogs = () => {
    return (
        <section className='max-w-6xl mx-auto'>
            <SectionTitle subHeading={"Blogs"} heading={"All Latest Blogs"}></SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/FRb0syxj/OIP-1.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Tame Your Cravings: Strategies to Conquer Unhealthy Snacking</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post offers practical strategies to curb unhealthy snacking habits. It provides helpful tips and alternative snack options to satisfy your cravings in a healthy way...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/7hx0C5Bj/Pages-from-spot-and-avoid-fad-diets.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Beyond Fad Diets: Sustainable Eating Habits for Long-Term Health</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post explores long-lasting approaches to healthy eating. It moves beyond trendy diets and focuses on establishing healthy habits you can maintain for life...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/ZRmyg9h0/15-Easy-Roasted-Veggies-Meal-Prep-Bowls-jpg.webp)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Unlocking Your Energy: Simple Swaps for a Healthier Plate</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post provides easy-to-implement substitutions for everyday ingredients. It suggests alternatives that boost the nutritional value of your meals while maintaining...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/m2nwQ6M3/A-beginners-guide-to-the-PLANT-BASED-DIET-735-1100-px-2.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">The Power of Plants: Plant-Based Recipes for a Balanced Diet</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post delves into the world of plant-based eating. It offers a collection of delicious plant-based recipes, suitable for vegetarians, vegans, or those seeking to incorporate...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/BQbPd9R5/OIP-2.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Spicing Up Your Health: Creative Ways to Make Healthy Food Fun</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post tackles the challenge of making healthy food interesting. It offers creative strategies and tips for adding variety and excitement to your healthy meals...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/vHKxy2dJ/Nutrition-Myths-898.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Debunking Diet Myths: Separating Fact from Fiction</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post tackles common misconceptions surrounding diets and weight loss. It provides clear and accurate information, helping you avoid falling prey to misinformation...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/vBGLYRFy/skin-1.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Eat Your Way to Glowing Skin: Foods for a Radiant You</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post explores the link between food and healthy skin. It highlights specific foods that contribute to a radiant complexion, promoting a beauty-focused yet...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[450px] w-96 bg-no-repeat" style={{ backgroundImage: 'url(https://i.postimg.cc/FzRySjHn/OIP-3.jpg)' }}>
                        <div className=""></div>
                        <div className="hero-content bg-gray-500 bg-opacity-70 mx-8 text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 font-bold text-2xl font-display text-black text-center hover:underline">Budget-Friendly Feasts: Delicious and Nutritious Meals on a Dime</h1>
                                <p className="mb-5 text-lg font-display text-[#1a1110] text-center hover:text-white">This post caters to those who want to eat healthily without breaking the bank. It provides budget-conscious recipes and grocery shopping strategies for preparing delicious...</p>
                                <div className='flex justify-center'><button className='border-2 px-4 py-2 border-black text-black hover:border-white'>visit</button></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default DietBlogs;