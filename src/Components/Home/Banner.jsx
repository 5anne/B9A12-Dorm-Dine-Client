import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className="w-screen mx-auto relative">
            <Carousel>
                <div>
                    <img src="https://i.postimg.cc/hvM1DL0X/e834888f03983379a37f1be7f70caf40.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/PJ4xzcPt/R-1.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/FssxP693/R.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/Pr5rnSCw/3-dining.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/B6CsdFsp/PRIN-MADI-N31-web.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/5y7JtMXF/6efb6170d1e3c9e3be41dfe9be01ce77.jpg" />
                    <p className="legend"></p>
                </div>
            </Carousel>
            <div className="h-[262px] md:h-min bg-gray-950 bg-opacity-50 md:w-2/3 mx-auto md:p-16 absolute top-0 md:top-12 md:left-32 lg:top-48 lg:left-48">
                <div className="text-center text-white leading-relaxed">
                    <h1 className="font-bold md:text-2xl lg:text-4xl text-gray-300 font-display mt-20 md:mt-0">Dorm Dine: Manage Your Meals with Ease</h1>
                    <p className="font-display text-gray-400 text-xs md:text-base my-2 lg:my-10">Enjoy a hassle-free hostel experience with our convenient meal management system. Book your meals in advance, choose from a variety of options, and pay easily online. Connect with fellow travelers over delicious food and make the most of your hostel stay.</p>
                    <form>
                        <div className="join">
                            <input type="text" placeholder="search menu" className="input input-bordered join-item" />
                            <button className="btn bg-[#480607] border-[#480607] text-white join-item">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;